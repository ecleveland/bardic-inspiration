import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TemplatesService } from './templates.service';
import { Template } from './template.schema';

describe('TemplatesService', () => {
  let service: TemplatesService;
  let model: Record<string, jest.Mock>;

  const mockTemplate = {
    _id: 'template-id-1',
    spellId: 'spell-id-1',
    genreId: 'genre-id-1',
    title: 'Song of Mockery',
    verses: ['Verse 1 text'],
    chorus: 'Chorus text',
    bridge: null,
    isFeatured: true,
  };

  const populateChain = (resolved: any) => ({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(resolved),
      }),
    }),
  });

  beforeEach(async () => {
    model = {
      find: jest.fn().mockReturnValue(populateChain([mockTemplate])),
      findById: jest.fn().mockReturnValue(populateChain(mockTemplate)),
      findOne: jest.fn().mockReturnValue(populateChain(mockTemplate)),
      aggregate: jest.fn().mockResolvedValue([{ _id: 'template-id-1' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        { provide: getModelToken(Template.name), useValue: model },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call find with empty filter when no query params', async () => {
      model.find.mockReturnValue(populateChain([mockTemplate]));
      const result = await service.findAll({});
      expect(model.find).toHaveBeenCalledWith({});
      expect(result).toEqual([mockTemplate]);
    });

    it('should filter by spellId', async () => {
      model.find.mockReturnValue(populateChain([mockTemplate]));
      await service.findAll({ spellId: 'spell-id-1' });
      expect(model.find).toHaveBeenCalledWith({ spellId: 'spell-id-1' });
    });

    it('should filter by genreId', async () => {
      model.find.mockReturnValue(populateChain([mockTemplate]));
      await service.findAll({ genreId: 'genre-id-1' });
      expect(model.find).toHaveBeenCalledWith({ genreId: 'genre-id-1' });
    });

    it('should filter by featured', async () => {
      model.find.mockReturnValue(populateChain([mockTemplate]));
      await service.findAll({ featured: true });
      expect(model.find).toHaveBeenCalledWith({ isFeatured: true });
    });
  });

  describe('findRandom', () => {
    it('should return a random template via aggregate + findById', async () => {
      model.aggregate.mockResolvedValue([{ _id: 'template-id-1' }]);
      model.findById.mockReturnValue(populateChain(mockTemplate));

      const result = await service.findRandom();
      expect(model.aggregate).toHaveBeenCalledWith([{ $sample: { size: 1 } }]);
      expect(model.findById).toHaveBeenCalledWith('template-id-1');
      expect(result).toEqual(mockTemplate);
    });

    it('should return null when no templates exist', async () => {
      model.aggregate.mockResolvedValue([]);
      const result = await service.findRandom();
      expect(result).toBeNull();
      expect(model.findById).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a template with populated refs', async () => {
      model.findById.mockReturnValue(populateChain(mockTemplate));
      const result = await service.findOne('template-id-1');
      expect(model.findById).toHaveBeenCalledWith('template-id-1');
      expect(result).toEqual(mockTemplate);
    });

    it('should return null when id not found', async () => {
      model.findById.mockReturnValue(populateChain(null));
      const result = await service.findOne('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('findBySpellAndGenre', () => {
    it('should find template matching spell and genre', async () => {
      model.findOne.mockReturnValue(populateChain(mockTemplate));
      const result = await service.findBySpellAndGenre('spell-id-1', 'genre-id-1');
      expect(model.findOne).toHaveBeenCalledWith({
        spellId: 'spell-id-1',
        genreId: 'genre-id-1',
      });
      expect(result).toEqual(mockTemplate);
    });

    it('should return null when no match', async () => {
      model.findOne.mockReturnValue(populateChain(null));
      const result = await service.findBySpellAndGenre('spell-id-1', 'genre-id-2');
      expect(result).toBeNull();
    });
  });
});
