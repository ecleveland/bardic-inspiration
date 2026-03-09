import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { GenresService } from './genres.service';
import { Genre } from './genre.schema';

describe('GenresService', () => {
  let service: GenresService;
  let model: Record<string, jest.Mock>;

  const mockGenre = {
    _id: 'genre-id-1',
    name: 'Power Metal',
    slug: 'power-metal',
    category: 'fantasy',
    styleGuide: 'Epic and uplifting',
  };

  beforeEach(async () => {
    model = {
      find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockGenre]) }),
      findOne: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGenre) }),
      findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGenre) }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        { provide: getModelToken(Genre.name), useValue: model },
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call find with empty filter when no query params', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockGenre]) });
      const result = await service.findAll({});
      expect(model.find).toHaveBeenCalledWith({});
      expect(result).toEqual([mockGenre]);
    });

    it('should filter by category when provided', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockGenre]) });
      await service.findAll({ category: 'fantasy' });
      expect(model.find).toHaveBeenCalledWith({ category: 'fantasy' });
    });
  });

  describe('findOneBySlug', () => {
    it('should return a genre by slug', async () => {
      model.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGenre) });
      const result = await service.findOneBySlug('power-metal');
      expect(model.findOne).toHaveBeenCalledWith({ slug: 'power-metal' });
      expect(result).toEqual(mockGenre);
    });

    it('should return null when slug not found', async () => {
      model.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      const result = await service.findOneBySlug('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should return a genre by id', async () => {
      model.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGenre) });
      const result = await service.findOne('genre-id-1');
      expect(model.findById).toHaveBeenCalledWith('genre-id-1');
      expect(result).toEqual(mockGenre);
    });

    it('should return null when id not found', async () => {
      model.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      const result = await service.findOne('nonexistent');
      expect(result).toBeNull();
    });
  });
});
