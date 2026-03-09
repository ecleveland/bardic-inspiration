import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from './genre.schema';
import { QueryGenresDto } from './dto/query-genres.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  async findAll(query: QueryGenresDto): Promise<Genre[]> {
    const filter: Record<string, any> = {};

    if (query.category) {
      filter.category = query.category;
    }

    return this.genreModel.find(filter).exec();
  }

  async findOneBySlug(slug: string): Promise<Genre | null> {
    return this.genreModel.findOne({ slug }).exec();
  }

  async findOne(id: string): Promise<Genre | null> {
    return this.genreModel.findById(id).exec();
  }
}
