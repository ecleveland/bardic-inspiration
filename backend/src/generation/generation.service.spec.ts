import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerationService } from './generation.service';
import { Generation } from './generation.schema';
import { SpellsService } from '../spells/spells.service';
import { GenresService } from '../genres/genres.service';
import { TemplatesService } from '../templates/templates.service';

jest.mock('@anthropic-ai/sdk', () => {
  const mockCreate = jest.fn();
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      messages: { create: mockCreate },
    })),
    _mockCreate: mockCreate,
  };
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { default: MockAnthropic, _mockCreate: mockCreate } = require('@anthropic-ai/sdk');

describe('GenerationService', () => {
  let service: GenerationService;
  let generationModel: jest.Mock & Record<string, jest.Mock>;
  let spellsService: Record<string, jest.Mock>;
  let genresService: Record<string, jest.Mock>;
  let templatesService: Record<string, jest.Mock>;
  let configService: Record<string, jest.Mock>;

  const mockSpell = {
    _id: 'spell-id-1',
    name: 'Vicious Mockery',
    description: 'You unleash a string of insults',
    level: 0,
    school: 'enchantment',
    type: 'cantrip',
  };

  const mockGenre = {
    _id: 'genre-id-1',
    name: 'Power Metal',
    slug: 'power-metal',
    styleGuide: 'Epic and uplifting',
  };

  const mockTemplate = {
    title: 'Song of Mockery',
    verses: ['Verse 1 text', 'Verse 2 text'],
    chorus: 'Chorus text',
    bridge: 'Bridge text',
  };

  const mockSavedGeneration = {
    _id: 'gen-id-1',
    spellId: 'spell-id-1',
    genreId: 'genre-id-1',
    title: 'Song of Mockery',
    lyrics: 'some lyrics',
    model: 'template',
  };

  const populateChain = (resolved: any) => ({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(resolved),
      }),
    }),
  });

  beforeEach(async () => {
    // Constructor-callable model mock
    const modelFn = jest.fn().mockImplementation(function (this: any, data: any) {
      Object.assign(this, data);
      this.save = jest.fn().mockResolvedValue({ ...data, _id: 'gen-id-new' });
    }) as any;
    modelFn.findOne = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    modelFn.findById = jest.fn().mockReturnValue(populateChain(mockSavedGeneration));
    modelFn.findByIdAndUpdate = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedGeneration) });
    generationModel = modelFn;

    spellsService = { findOne: jest.fn().mockResolvedValue(mockSpell) };
    genresService = { findOne: jest.fn().mockResolvedValue(mockGenre) };
    templatesService = { findBySpellAndGenre: jest.fn().mockResolvedValue(null) };
    configService = { get: jest.fn().mockReturnValue('test-api-key') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerationService,
        { provide: getModelToken(Generation.name), useValue: generationModel },
        { provide: SpellsService, useValue: spellsService },
        { provide: GenresService, useValue: genresService },
        { provide: TemplatesService, useValue: templatesService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<GenerationService>(GenerationService);
    jest.clearAllMocks();

    // Reset defaults after clearAllMocks
    spellsService.findOne.mockResolvedValue(mockSpell);
    genresService.findOne.mockResolvedValue(mockGenre);
    templatesService.findBySpellAndGenre.mockResolvedValue(null);
    configService.get.mockReturnValue('test-api-key');
    generationModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
  });

  describe('generate', () => {
    it('should throw NotFoundException when spell not found', async () => {
      spellsService.findOne.mockResolvedValue(null);
      await expect(
        service.generate({ spellId: 'bad-id', genreId: 'genre-id-1' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when genre not found', async () => {
      genresService.findOne.mockResolvedValue(null);
      await expect(
        service.generate({ spellId: 'spell-id-1', genreId: 'bad-id' }),
      ).rejects.toThrow(NotFoundException);
    });

    describe('template path', () => {
      it('should use template when exists and no customPrompt', async () => {
        templatesService.findBySpellAndGenre.mockResolvedValue(mockTemplate);
        generationModel.mockImplementation(function (this: any, data: any) {
          Object.assign(this, data);
          this.save = jest.fn().mockResolvedValue({ ...data, _id: 'gen-id-new' });
        });

        const result = await service.generate({
          spellId: 'spell-id-1',
          genreId: 'genre-id-1',
        });

        expect(generationModel).toHaveBeenCalledWith(
          expect.objectContaining({ model: 'template' }),
        );
        expect(result).toBeDefined();
        expect(mockCreate).not.toHaveBeenCalled();
      });

      it('should skip template when customPrompt is provided', async () => {
        templatesService.findBySpellAndGenre.mockResolvedValue(mockTemplate);
        generationModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
        mockCreate.mockResolvedValue({
          content: [{ type: 'text', text: 'TITLE: Custom Song\n\nLyrics here' }],
        });
        generationModel.mockImplementation(function (this: any, data: any) {
          Object.assign(this, data);
          this.save = jest.fn().mockResolvedValue({ ...data, _id: 'gen-id-new' });
        });

        await service.generate({
          spellId: 'spell-id-1',
          genreId: 'genre-id-1',
          customPrompt: 'Make it funny',
        });

        expect(mockCreate).toHaveBeenCalled();
      });
    });

    describe('cache path', () => {
      it('should return cached generation when found', async () => {
        const cached = { ...mockSavedGeneration, model: 'claude-sonnet-4-20250514' };
        generationModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(cached) });

        const result = await service.generate({
          spellId: 'spell-id-1',
          genreId: 'genre-id-1',
        });

        expect(result).toEqual(cached);
        expect(mockCreate).not.toHaveBeenCalled();
      });

      it('should use $exists:false when no customPrompt', async () => {
        generationModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
        mockCreate.mockResolvedValue({
          content: [{ type: 'text', text: 'TITLE: Test\n\nLyrics' }],
        });
        generationModel.mockImplementation(function (this: any, data: any) {
          Object.assign(this, data);
          this.save = jest.fn().mockResolvedValue({ ...data, _id: 'gen-id-new' });
        });

        await service.generate({
          spellId: 'spell-id-1',
          genreId: 'genre-id-1',
        });

        expect(generationModel.findOne).toHaveBeenCalledWith(
          expect.objectContaining({
            customPrompt: { $exists: false },
          }),
        );
      });
    });

    describe('AI path', () => {
      beforeEach(() => {
        generationModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
        generationModel.mockImplementation(function (this: any, data: any) {
          Object.assign(this, data);
          this.save = jest.fn().mockResolvedValue({ ...data, _id: 'gen-id-new' });
        });
      });

      it('should throw BadRequestException when no API key', async () => {
        configService.get.mockReturnValue(undefined);
        await expect(
          service.generate({ spellId: 'spell-id-1', genreId: 'genre-id-1' }),
        ).rejects.toThrow(BadRequestException);
      });

      it('should call Claude API and parse title from response', async () => {
        mockCreate.mockResolvedValue({
          content: [
            {
              type: 'text',
              text: 'TITLE: Wicked Words of Power\n\nVERSE 1:\nLyrics here',
            },
          ],
        });

        const result = await service.generate({
          spellId: 'spell-id-1',
          genreId: 'genre-id-1',
        });

        expect(MockAnthropic).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
        expect(mockCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
          }),
        );
        expect(generationModel).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Wicked Words of Power',
            model: 'claude-sonnet-4-20250514',
          }),
        );
        expect(result).toBeDefined();
      });

      it('should fall back to spell-genre title when TITLE not in response', async () => {
        mockCreate.mockResolvedValue({
          content: [{ type: 'text', text: 'Just some lyrics without a title line' }],
        });

        await service.generate({
          spellId: 'spell-id-1',
          genreId: 'genre-id-1',
        });

        expect(generationModel).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Vicious Mockery - Power Metal',
          }),
        );
      });

      it('should include customPrompt in saved generation', async () => {
        mockCreate.mockResolvedValue({
          content: [{ type: 'text', text: 'TITLE: Custom\n\nLyrics' }],
        });

        await service.generate({
          spellId: 'spell-id-1',
          genreId: 'genre-id-1',
          customPrompt: 'Make it silly',
        });

        expect(generationModel).toHaveBeenCalledWith(
          expect.objectContaining({
            customPrompt: 'Make it silly',
          }),
        );
      });
    });
  });

  describe('findOne', () => {
    it('should return a populated generation', async () => {
      generationModel.findById.mockReturnValue(populateChain(mockSavedGeneration));
      const result = await service.findOne('gen-id-1');
      expect(generationModel.findById).toHaveBeenCalledWith('gen-id-1');
      expect(result).toEqual(mockSavedGeneration);
    });

    it('should return null when not found', async () => {
      generationModel.findById.mockReturnValue(populateChain(null));
      const result = await service.findOne('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('rate', () => {
    it('should update rating and return updated generation', async () => {
      const rated = { ...mockSavedGeneration, rating: 5 };
      generationModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(rated),
      });

      const result = await service.rate('gen-id-1', 5);
      expect(generationModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'gen-id-1',
        { rating: 5 },
        { new: true },
      );
      expect(result).toEqual(rated);
    });

    it('should return null when generation not found', async () => {
      generationModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      const result = await service.rate('nonexistent', 3);
      expect(result).toBeNull();
    });
  });
});
