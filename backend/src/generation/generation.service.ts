import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import Anthropic from '@anthropic-ai/sdk';
import { Generation, GenerationDocument } from './generation.schema';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { SpellsService } from '../spells/spells.service';
import { GenresService } from '../genres/genres.service';
import { TemplatesService } from '../templates/templates.service';
import { SYSTEM_PROMPT } from './prompts/system-prompt';
import { GENRE_PROMPTS } from './prompts/genre-prompts';
import { getSpellContext } from './prompts/spell-prompts';

function buildPrompt(
  spell: { name: string; description: string; level: number; school: string },
  genre: { slug: string; name: string; styleGuide: string },
  customPrompt?: string,
): string {
  const spellContext = getSpellContext(spell);
  const genreStyle =
    GENRE_PROMPTS[genre.slug] ||
    `Write in the style of ${genre.name}. ${genre.styleGuide}`;

  let prompt = `Compose a song for the bard spell/ability "${spell.name}" in the "${genre.name}" genre.

${spellContext}

${genreStyle}`;

  if (customPrompt) {
    prompt += `\n\nAdditional creative direction: ${customPrompt}`;
  }

  return prompt;
}

@Injectable()
export class GenerationService {
  constructor(
    @InjectModel(Generation.name)
    private generationModel: Model<GenerationDocument>,
    private readonly spellsService: SpellsService,
    private readonly genresService: GenresService,
    private readonly templatesService: TemplatesService,
    private readonly configService: ConfigService,
  ) {}

  async generate(dto: CreateGenerationDto): Promise<Generation> {
    const spell = await this.spellsService.findOne(dto.spellId);
    if (!spell) {
      throw new NotFoundException(`Spell with id ${dto.spellId} not found`);
    }

    const genre = await this.genresService.findOne(dto.genreId);
    if (!genre) {
      throw new NotFoundException(`Genre with id ${dto.genreId} not found`);
    }

    // Check for existing template
    const template = await this.templatesService.findBySpellAndGenre(
      dto.spellId,
      dto.genreId,
    );
    if (template && !dto.customPrompt) {
      const lyrics = [
        `TITLE: ${template.title}`,
        ...template.verses.map(
          (v: string, i: number) => `\nVERSE ${i + 1}:\n${v}`,
        ),
        template.chorus ? `\nCHORUS:\n${template.chorus}` : '',
        template.bridge ? `\nBRIDGE:\n${template.bridge}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const generation = new this.generationModel({
        spellId: dto.spellId,
        genreId: dto.genreId,
        title: template.title,
        lyrics,
        model: 'template',
      });
      return generation.save();
    }

    // Check for cached generation
    const cached = await this.generationModel
      .findOne({
        spellId: dto.spellId,
        genreId: dto.genreId,
        customPrompt: dto.customPrompt || { $exists: false },
      })
      .exec();
    if (cached) {
      return cached;
    }

    // Call Claude API
    const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');
    if (!apiKey) {
      throw new BadRequestException('ANTHROPIC_API_KEY is not configured');
    }

    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildPrompt(
            spell as { name: string; description: string; level: number; school: string },
            genre as { slug: string; name: string; styleGuide: string },
            dto.customPrompt,
          ),
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const fullText = textBlock && 'text' in textBlock ? textBlock.text : '';

    // Parse title from response
    const titleMatch = fullText.match(/TITLE:\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : `${spell.name} - ${genre.name}`;

    const generation = new this.generationModel({
      spellId: dto.spellId,
      genreId: dto.genreId,
      customPrompt: dto.customPrompt,
      title,
      lyrics: fullText,
      model: 'claude-sonnet-4-20250514',
    });

    return generation.save();
  }

  async findOne(id: string): Promise<Generation | null> {
    return this.generationModel
      .findById(id)
      .populate('spellId')
      .populate('genreId')
      .exec();
  }

  async rate(id: string, rating: number): Promise<Generation | null> {
    return this.generationModel
      .findByIdAndUpdate(id, { rating }, { new: true })
      .exec();
  }
}
