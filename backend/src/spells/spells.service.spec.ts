import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SpellsService } from './spells.service';
import { Spell } from './spell.schema';

describe('SpellsService', () => {
  let service: SpellsService;
  let model: Record<string, jest.Mock>;

  const mockSpell = {
    _id: 'spell-id-1',
    name: 'Vicious Mockery',
    level: 0,
    school: 'enchantment',
    type: 'cantrip',
    subclass: null,
    description: 'You unleash a string of insults',
  };

  beforeEach(async () => {
    model = {
      find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockSpell]) }),
      findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSpell) }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpellsService,
        { provide: getModelToken(Spell.name), useValue: model },
      ],
    }).compile();

    service = module.get<SpellsService>(SpellsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call find with empty filter when no query params', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockSpell]) });
      const result = await service.findAll({});
      expect(model.find).toHaveBeenCalledWith({});
      expect(result).toEqual([mockSpell]);
    });

    it('should filter by level', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockSpell]) });
      await service.findAll({ level: 0 });
      expect(model.find).toHaveBeenCalledWith({ level: 0 });
    });

    it('should filter by type', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockSpell]) });
      await service.findAll({ type: 'cantrip' });
      expect(model.find).toHaveBeenCalledWith({ type: 'cantrip' });
    });

    it('should filter by subclass', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockSpell]) });
      await service.findAll({ subclass: 'lore' });
      expect(model.find).toHaveBeenCalledWith({ subclass: 'lore' });
    });

    it('should combine multiple filters', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockSpell]) });
      await service.findAll({ level: 1, type: 'spell', subclass: 'lore' });
      expect(model.find).toHaveBeenCalledWith({ level: 1, type: 'spell', subclass: 'lore' });
    });

    it('should use text search when search is provided', async () => {
      model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([mockSpell]) });
      const result = await service.findAll({ search: 'mockery' });
      expect(model.find).toHaveBeenCalledWith({ $text: { $search: 'mockery' } });
      expect(result).toEqual([mockSpell]);
    });

    it('should fall back to regex when text search fails', async () => {
      const textExec = jest.fn().mockRejectedValue(new Error('text index not found'));
      const regexExec = jest.fn().mockResolvedValue([mockSpell]);
      model.find
        .mockReturnValueOnce({ exec: textExec })
        .mockReturnValueOnce({ exec: regexExec });

      const result = await service.findAll({ search: 'mockery' });
      expect(model.find).toHaveBeenCalledTimes(2);
      expect(model.find).toHaveBeenNthCalledWith(1, { $text: { $search: 'mockery' } });
      expect(model.find).toHaveBeenNthCalledWith(2, {
        name: { $regex: 'mockery', $options: 'i' },
      });
      expect(result).toEqual([mockSpell]);
    });

    it('should combine search regex fallback with other filters', async () => {
      const textExec = jest.fn().mockRejectedValue(new Error('text index not found'));
      const regexExec = jest.fn().mockResolvedValue([mockSpell]);
      model.find
        .mockReturnValueOnce({ exec: textExec })
        .mockReturnValueOnce({ exec: regexExec });

      await service.findAll({ level: 0, search: 'mockery' });
      expect(model.find).toHaveBeenNthCalledWith(1, {
        level: 0,
        $text: { $search: 'mockery' },
      });
      expect(model.find).toHaveBeenNthCalledWith(2, {
        level: 0,
        name: { $regex: 'mockery', $options: 'i' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a spell by id', async () => {
      model.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSpell) });
      const result = await service.findOne('spell-id-1');
      expect(model.findById).toHaveBeenCalledWith('spell-id-1');
      expect(result).toEqual(mockSpell);
    });

    it('should return null when id not found', async () => {
      model.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      const result = await service.findOne('nonexistent');
      expect(result).toBeNull();
    });
  });
});
