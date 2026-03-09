export const SPELLS_SEED = [
  // ===== CANTRIPS (Level 0) =====
  {
    name: 'Blade Ward',
    level: 0,
    school: 'Abjuration',
    type: 'cantrip',
    description:
      'You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.',
    tags: ['defense', 'warding', 'somatic'],
  },
  {
    name: 'Dancing Lights',
    level: 0,
    school: 'Evocation',
    type: 'cantrip',
    description:
      'You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air.',
    tags: ['light', 'utility', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Friends',
    level: 0,
    school: 'Enchantment',
    type: 'cantrip',
    description:
      'For the duration, you have advantage on all Charisma checks directed at one creature of your choice that is not hostile toward you. When the spell ends, the creature realizes you used magic to influence its mood.',
    tags: ['social', 'enchantment', 'concentration', 'somatic', 'material'],
  },
  {
    name: 'Light',
    level: 0,
    school: 'Evocation',
    type: 'cantrip',
    description:
      'You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet.',
    tags: ['light', 'utility', 'verbal', 'material'],
  },
  {
    name: 'Mage Hand',
    level: 0,
    school: 'Conjuration',
    type: 'cantrip',
    description:
      'A spectral, floating hand appears at a point you choose within range. The hand can manipulate objects, open unlocked doors, or stow and retrieve items from containers.',
    tags: ['utility', 'conjuration', 'verbal', 'somatic'],
  },
  {
    name: 'Mending',
    level: 0,
    school: 'Transmutation',
    type: 'cantrip',
    description:
      'This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, or a torn cloak.',
    tags: ['utility', 'repair', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Message',
    level: 0,
    school: 'Transmutation',
    type: 'cantrip',
    description:
      'You point your finger toward a creature within range and whisper a message. The target hears the message and can reply in a whisper that only you can hear.',
    tags: ['communication', 'utility', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Minor Illusion',
    level: 0,
    school: 'Illusion',
    type: 'cantrip',
    description:
      'You create a sound or an image of an object within range that lasts for the duration. The illusion ends if you dismiss it or cast this spell again.',
    tags: ['illusion', 'utility', 'somatic', 'material'],
  },
  {
    name: 'Prestidigitation',
    level: 0,
    school: 'Transmutation',
    type: 'cantrip',
    description:
      'This spell is a minor magical trick that novice spellcasters use for practice. You create one of several minor magical effects including sensory effects, lighting, cleaning, or warming.',
    tags: ['utility', 'versatile', 'verbal', 'somatic'],
  },
  {
    name: 'Thunderclap',
    level: 0,
    school: 'Evocation',
    type: 'cantrip',
    description:
      'You create a burst of thunderous sound that can be heard 100 feet away. Each creature within 5 feet of you must succeed on a Constitution saving throw or take thunder damage.',
    tags: ['damage', 'thunder', 'area', 'somatic'],
  },
  {
    name: 'True Strike',
    level: 0,
    school: 'Divination',
    type: 'cantrip',
    description:
      'You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target\'s defenses, granting you advantage on your first attack roll against the target.',
    tags: ['combat', 'divination', 'concentration', 'somatic'],
  },
  {
    name: 'Vicious Mockery',
    level: 0,
    school: 'Enchantment',
    type: 'cantrip',
    description:
      'You unleash a string of insults laced with subtle enchantments at a creature you can see within range. The target must succeed on a Wisdom saving throw or take psychic damage and have disadvantage on its next attack roll.',
    tags: ['damage', 'psychic', 'debuff', 'verbal'],
  },

  // ===== 1ST LEVEL =====
  {
    name: 'Animal Friendship',
    level: 1,
    school: 'Enchantment',
    type: 'spell',
    description:
      'This spell lets you convince a beast that you mean it no harm. A beast that you can see within range must succeed on a Wisdom saving throw or be charmed by you for the duration.',
    tags: ['charm', 'beast', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Bane',
    level: 1,
    school: 'Enchantment',
    type: 'spell',
    description:
      'Up to three creatures of your choice within range must make Charisma saving throws. Targets that fail subtract 1d4 from all attack rolls and saving throws.',
    tags: ['debuff', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Charm Person',
    level: 1,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, with advantage if you or your companions are fighting it. If it fails, it is charmed by you.',
    tags: ['charm', 'social', 'verbal', 'somatic'],
  },
  {
    name: 'Comprehend Languages',
    level: 1,
    school: 'Divination',
    type: 'spell',
    description:
      'For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, reading about one page per minute.',
    tags: ['utility', 'language', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Cure Wounds',
    level: 1,
    school: 'Evocation',
    type: 'spell',
    description:
      'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
    tags: ['healing', 'touch', 'verbal', 'somatic'],
  },
  {
    name: 'Detect Magic',
    level: 1,
    school: 'Divination',
    type: 'spell',
    description:
      'For the duration, you sense the presence of magic within 30 feet of you. You can see a faint aura around any visible creature or object that bears magic and learn its school of magic.',
    tags: ['detection', 'utility', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Disguise Self',
    level: 1,
    school: 'Illusion',
    type: 'spell',
    description:
      'You make yourself, including clothing, armor, weapons, and other belongings, look different until the spell ends. You can change your appearance including height, weight, and body type.',
    tags: ['illusion', 'social', 'verbal', 'somatic'],
  },
  {
    name: 'Dissonant Whispers',
    level: 1,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You whisper a discordant melody that only one creature of your choice within range can hear, wracking it with terrible pain. The target takes 3d6 psychic damage and must use its reaction to move away.',
    tags: ['damage', 'psychic', 'fear', 'verbal'],
  },
  {
    name: 'Earth Tremor',
    level: 1,
    school: 'Evocation',
    type: 'spell',
    description:
      'You cause a tremor in the ground within range. Each creature other than you in that area must make a Dexterity saving throw or take 1d6 bludgeoning damage and be knocked prone.',
    tags: ['damage', 'bludgeoning', 'area', 'control', 'verbal', 'somatic'],
  },
  {
    name: 'Faerie Fire',
    level: 1,
    school: 'Evocation',
    type: 'spell',
    description:
      'Each object in a 20-foot cube is outlined in blue, green, or violet light. Any creature in the area is also outlined if it fails a Dexterity saving throw. Attack rolls against affected creatures have advantage.',
    tags: ['utility', 'detection', 'concentration', 'verbal'],
  },
  {
    name: 'Feather Fall',
    level: 1,
    school: 'Transmutation',
    type: 'spell',
    description:
      'Choose up to five falling creatures within range. A falling creature\'s rate of descent slows to 60 feet per round and takes no falling damage.',
    tags: ['utility', 'protection', 'reaction', 'verbal', 'material'],
  },
  {
    name: 'Healing Word',
    level: 1,
    school: 'Evocation',
    type: 'spell',
    description:
      'A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
    tags: ['healing', 'ranged', 'bonus action', 'verbal'],
  },
  {
    name: 'Heroism',
    level: 1,
    school: 'Enchantment',
    type: 'spell',
    description:
      'A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points at the start of each of its turns.',
    tags: ['buff', 'courage', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Identify',
    level: 1,
    school: 'Divination',
    type: 'spell',
    description:
      'You choose one object that you must touch. If it is a magic item or magical object, you learn its properties and how to use them, and any attunement requirements.',
    tags: ['utility', 'detection', 'ritual', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Illusory Script',
    level: 1,
    school: 'Illusion',
    type: 'spell',
    description:
      'You write on parchment or other surface and imbue it with a potent illusion. To you and designated creatures, the writing appears normal. To all others, it appears as an unknown script or different message.',
    tags: ['illusion', 'utility', 'ritual', 'somatic', 'material'],
  },
  {
    name: 'Longstrider',
    level: 1,
    school: 'Transmutation',
    type: 'spell',
    description:
      'You touch a creature. The target\'s speed increases by 10 feet until the spell ends.',
    tags: ['buff', 'movement', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Silent Image',
    level: 1,
    school: 'Illusion',
    type: 'spell',
    description:
      'You create the image of an object, creature, or other visible phenomenon that is no larger than a 15-foot cube. The image is purely visual and has no sound, smell, or other sensory effect.',
    tags: ['illusion', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Sleep',
    level: 1,
    school: 'Enchantment',
    type: 'spell',
    description:
      'This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect, starting with the creature with the lowest current hit points.',
    tags: ['control', 'enchantment', 'area', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Speak with Animals',
    level: 1,
    school: 'Divination',
    type: 'spell',
    description:
      'You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence.',
    tags: ['communication', 'beast', 'ritual', 'verbal', 'somatic'],
  },
  {
    name: "Tasha's Hideous Laughter",
    level: 1,
    school: 'Enchantment',
    type: 'spell',
    description:
      'A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter. The target falls prone and becomes incapacitated.',
    tags: ['control', 'incapacitate', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Thunderwave',
    level: 1,
    school: 'Evocation',
    type: 'spell',
    description:
      'A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube takes 2d8 thunder damage and is pushed 10 feet away from you on a failed Constitution save.',
    tags: ['damage', 'thunder', 'area', 'push', 'verbal', 'somatic'],
  },
  {
    name: 'Unseen Servant',
    level: 1,
    school: 'Conjuration',
    type: 'spell',
    description:
      'This spell creates an invisible, mindless, shapeless force that performs simple tasks at your command. The servant can perform tasks that a human servant could do.',
    tags: ['utility', 'conjuration', 'ritual', 'verbal', 'somatic', 'material'],
  },

  // ===== 2ND LEVEL =====
  {
    name: 'Animal Messenger',
    level: 2,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You use a Tiny beast to deliver a message. You specify a location and a recipient, and the beast travels to that location for the duration of the spell.',
    tags: ['communication', 'beast', 'ritual', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Blindness/Deafness',
    level: 2,
    school: 'Necromancy',
    type: 'spell',
    description:
      'You can blind or deafen a foe. Choose one creature within range to make a Constitution saving throw. If it fails, the target is either blinded or deafened for the duration.',
    tags: ['debuff', 'condition', 'verbal'],
  },
  {
    name: 'Calm Emotions',
    level: 2,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You attempt to suppress strong emotions in a group of people. Each humanoid in a 20-foot sphere must make a Charisma save or be calmed, suppressing charm/fright effects or hostile feelings.',
    tags: ['control', 'social', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Cloud of Daggers',
    level: 2,
    school: 'Conjuration',
    type: 'spell',
    description:
      'You fill the air with spinning daggers in a 5-foot cube. A creature takes 4d4 slashing damage when it enters the spell\'s area for the first time on a turn or starts its turn there.',
    tags: ['damage', 'slashing', 'area', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Crown of Madness',
    level: 2,
    school: 'Enchantment',
    type: 'spell',
    description:
      'One humanoid of your choice must succeed on a Wisdom saving throw or become charmed. A twisted crown of jagged iron appears on its head, and madness glows in its eyes.',
    tags: ['charm', 'control', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Detect Thoughts',
    level: 2,
    school: 'Divination',
    type: 'spell',
    description:
      'For the duration, you can read the thoughts of certain creatures. You can focus your mind on any one creature within 30 feet and learn its surface thoughts.',
    tags: ['detection', 'telepathy', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Enhance Ability',
    level: 2,
    school: 'Transmutation',
    type: 'spell',
    description:
      'You touch a creature and bestow upon it a magical enhancement. Choose one ability — the target has advantage on ability checks with that ability for the duration.',
    tags: ['buff', 'utility', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Enthrall',
    level: 2,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You weave a distracting string of words, causing creatures of your choice to make a Wisdom saving throw. Those that fail have disadvantage on Perception checks to notice anyone other than you.',
    tags: ['charm', 'social', 'verbal', 'somatic'],
  },
  {
    name: 'Heat Metal',
    level: 2,
    school: 'Transmutation',
    type: 'spell',
    description:
      'Choose a manufactured metal object you can see within range. You cause the object to glow red-hot. A creature in contact with it takes 2d8 fire damage.',
    tags: ['damage', 'fire', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Hold Person',
    level: 2,
    school: 'Enchantment',
    type: 'spell',
    description:
      'Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration.',
    tags: ['control', 'paralysis', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Invisibility',
    level: 2,
    school: 'Illusion',
    type: 'spell',
    description:
      'A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target\'s person.',
    tags: ['illusion', 'stealth', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Knock',
    level: 2,
    school: 'Transmutation',
    type: 'spell',
    description:
      'Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access. The target is unlocked.',
    tags: ['utility', 'verbal'],
  },
  {
    name: 'Lesser Restoration',
    level: 2,
    school: 'Abjuration',
    type: 'spell',
    description:
      'You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned.',
    tags: ['healing', 'restoration', 'verbal', 'somatic'],
  },
  {
    name: 'Locate Animals or Plants',
    level: 2,
    school: 'Divination',
    type: 'spell',
    description:
      'Describe or name a specific kind of beast or plant. You learn the direction and distance to the closest creature or plant of that kind within 5 miles.',
    tags: ['detection', 'nature', 'ritual', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Locate Object',
    level: 2,
    school: 'Divination',
    type: 'spell',
    description:
      'Describe or name an object that is familiar to you. You sense the direction to the object\'s location, as long as that object is within 1,000 feet of you.',
    tags: ['detection', 'utility', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Magic Mouth',
    level: 2,
    school: 'Illusion',
    type: 'spell',
    description:
      'You implant a message within an object in range, a message that is uttered when a trigger condition is met. The message can be up to 25 words long.',
    tags: ['utility', 'illusion', 'ritual', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Phantasmal Force',
    level: 2,
    school: 'Illusion',
    type: 'spell',
    description:
      'You craft an illusion that takes root in the mind of a creature you can see within range. The target perceives the phantasm as real and rationalizes any illogical outcomes.',
    tags: ['illusion', 'damage', 'psychic', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'See Invisibility',
    level: 2,
    school: 'Divination',
    type: 'spell',
    description:
      'For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane.',
    tags: ['detection', 'utility', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Shatter',
    level: 2,
    school: 'Evocation',
    type: 'spell',
    description:
      'A sudden loud ringing noise painfully intense erupts from a point of your choice within range. Each creature in a 10-foot sphere takes 3d8 thunder damage.',
    tags: ['damage', 'thunder', 'area', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Silence',
    level: 2,
    school: 'Illusion',
    type: 'spell',
    description:
      'For the duration, no sound can be created within or pass through a 20-foot-radius sphere. Any creature entirely inside is immune to thunder damage and is deafened.',
    tags: ['control', 'area', 'concentration', 'ritual', 'verbal', 'somatic'],
  },
  {
    name: 'Skywrite',
    level: 2,
    school: 'Transmutation',
    type: 'spell',
    description:
      'You cause up to ten words to form in a part of the sky you can see. The words appear to be made of cloud and remain for the duration before dispersing.',
    tags: ['communication', 'utility', 'concentration', 'ritual', 'verbal', 'somatic'],
  },
  {
    name: 'Suggestion',
    level: 2,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You suggest a course of activity to a creature you can see within range that can hear and understand you. The suggestion must be worded to sound reasonable.',
    tags: ['charm', 'control', 'concentration', 'verbal', 'material'],
  },
  {
    name: 'Zone of Truth',
    level: 2,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You create a magical zone that guards against deception in a 15-foot sphere. A creature that enters must make a Charisma saving throw or be unable to speak a deliberate lie.',
    tags: ['social', 'control', 'verbal', 'somatic'],
  },

  // ===== 3RD LEVEL =====
  {
    name: 'Bestow Curse',
    level: 3,
    school: 'Necromancy',
    type: 'spell',
    description:
      'You touch a creature, and that creature must succeed on a Wisdom saving throw or become cursed with a debilitating effect of your choice for the duration.',
    tags: ['debuff', 'curse', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Clairvoyance',
    level: 3,
    school: 'Divination',
    type: 'spell',
    description:
      'You create an invisible sensor within range in a location familiar to you. You can see or hear through the sensor as if you were there.',
    tags: ['detection', 'scrying', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Dispel Magic',
    level: 3,
    school: 'Abjuration',
    type: 'spell',
    description:
      'Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For higher-level spells, make an ability check.',
    tags: ['utility', 'counter', 'verbal', 'somatic'],
  },
  {
    name: 'Fear',
    level: 3,
    school: 'Illusion',
    type: 'spell',
    description:
      'You project a phantasmal image of a creature\'s worst fears. Each creature in a 30-foot cone must succeed on a Wisdom saving throw or drop what it is holding and become frightened.',
    tags: ['control', 'fear', 'area', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Feign Death',
    level: 3,
    school: 'Necromancy',
    type: 'spell',
    description:
      'You touch a willing creature and put it into a cataleptic state that is indistinguishable from death. The target appears dead to all outward inspection and to spells used to determine status.',
    tags: ['utility', 'deception', 'ritual', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Glyph of Warding',
    level: 3,
    school: 'Abjuration',
    type: 'spell',
    description:
      'You inscribe a glyph that harms other creatures on a surface or within an object that can be closed. The glyph is nearly invisible and triggers when specific conditions are met.',
    tags: ['damage', 'trap', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Hypnotic Pattern',
    level: 3,
    school: 'Illusion',
    type: 'spell',
    description:
      'You create a twisting pattern of colors that weaves through the air in a 30-foot cube. Each creature that sees it must make a Wisdom save or become charmed, incapacitated, and have speed reduced to 0.',
    tags: ['control', 'charm', 'incapacitate', 'area', 'concentration', 'somatic', 'material'],
  },
  {
    name: "Leomund's Tiny Hut",
    level: 3,
    school: 'Evocation',
    type: 'spell',
    description:
      'A 10-foot-radius immobile dome of force springs into existence around and above you. The spell ends if you leave its area. Nine creatures of Medium size or smaller can fit inside.',
    tags: ['utility', 'shelter', 'ritual', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Major Image',
    level: 3,
    school: 'Illusion',
    type: 'spell',
    description:
      'You create the image of an object, creature, or visible phenomenon no larger than a 20-foot cube. It seems completely real, including sounds, smells, and temperature.',
    tags: ['illusion', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Nondetection',
    level: 3,
    school: 'Abjuration',
    type: 'spell',
    description:
      'For the duration, you hide a target from divination magic. The target can be a creature, place, or object no larger than 10 feet in any dimension.',
    tags: ['protection', 'stealth', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Plant Growth',
    level: 3,
    school: 'Transmutation',
    type: 'spell',
    description:
      'This spell channels vitality into plants within a specific area. All normal plants in a 100-foot radius grow thick and overgrown, or plants in a half-mile radius become enriched for a year.',
    tags: ['nature', 'utility', 'area', 'verbal', 'somatic'],
  },
  {
    name: 'Sending',
    level: 3,
    school: 'Evocation',
    type: 'spell',
    description:
      'You send a short message of twenty-five words or fewer to a creature with which you are familiar. The creature hears the message and can reply immediately.',
    tags: ['communication', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Speak with Dead',
    level: 3,
    school: 'Necromancy',
    type: 'spell',
    description:
      'You grant the semblance of life and intelligence to a corpse, allowing it to answer up to five questions. The corpse\'s knowledge is limited to what it knew in life.',
    tags: ['communication', 'necromancy', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Speak with Plants',
    level: 3,
    school: 'Transmutation',
    type: 'spell',
    description:
      'You imbue plants within 30 feet with limited sentience and animation, giving them the ability to communicate with you and follow simple commands.',
    tags: ['communication', 'nature', 'verbal', 'somatic'],
  },
  {
    name: 'Stinking Cloud',
    level: 3,
    school: 'Conjuration',
    type: 'spell',
    description:
      'You create a 20-foot-radius sphere of yellow, nauseating gas. Each creature inside must succeed on a Constitution saving throw or spend its action retching and reeling.',
    tags: ['control', 'area', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Tongues',
    level: 3,
    school: 'Divination',
    type: 'spell',
    description:
      'This spell grants the creature you touch the ability to understand any spoken language it hears. When the target speaks, any creature that knows at least one language can understand it.',
    tags: ['communication', 'language', 'verbal', 'material'],
  },

  // ===== 4TH LEVEL =====
  {
    name: 'Compulsion',
    level: 4,
    school: 'Enchantment',
    type: 'spell',
    description:
      'Creatures of your choice that you can see within range must make a Wisdom saving throw. On a failed save, a target is compelled to move in a direction you choose on each of its turns.',
    tags: ['control', 'movement', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Confusion',
    level: 4,
    school: 'Enchantment',
    type: 'spell',
    description:
      'This spell assaults and twists creatures\' minds, spawning delusions and provoking uncontrolled actions. Each creature in a 10-foot sphere must succeed on a Wisdom saving throw or be affected.',
    tags: ['control', 'area', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Dimension Door',
    level: 4,
    school: 'Conjuration',
    type: 'spell',
    description:
      'You teleport yourself from your current location to any other spot within range. You can also bring along one willing creature of your size or smaller.',
    tags: ['teleportation', 'utility', 'verbal'],
  },
  {
    name: 'Freedom of Movement',
    level: 4,
    school: 'Abjuration',
    type: 'spell',
    description:
      'You touch a willing creature. For the duration, the target\'s movement is unaffected by difficult terrain, and spells and effects can neither reduce its speed nor cause it to be paralyzed or restrained.',
    tags: ['buff', 'movement', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Greater Invisibility',
    level: 4,
    school: 'Illusion',
    type: 'spell',
    description:
      'You or a creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible. The target remains invisible even when attacking or casting spells.',
    tags: ['illusion', 'stealth', 'combat', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Hallucinatory Terrain',
    level: 4,
    school: 'Illusion',
    type: 'spell',
    description:
      'You make natural terrain in a 150-foot cube look, sound, and smell like some other sort of natural terrain. Open fields or roads can appear as swamps, hills, or crevasses.',
    tags: ['illusion', 'area', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Locate Creature',
    level: 4,
    school: 'Divination',
    type: 'spell',
    description:
      'Describe or name a creature that is familiar to you. You sense the direction to the creature\'s location, as long as that creature is within 1,000 feet of you.',
    tags: ['detection', 'tracking', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Polymorph',
    level: 4,
    school: 'Transmutation',
    type: 'spell',
    description:
      'This spell transforms a creature that you can see within range into a new beast form. An unwilling creature must make a Wisdom saving throw to avoid the effect.',
    tags: ['transmutation', 'control', 'concentration', 'verbal', 'somatic', 'material'],
  },

  // ===== 5TH LEVEL =====
  {
    name: 'Animate Objects',
    level: 5,
    school: 'Transmutation',
    type: 'spell',
    description:
      'Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. They become animated and can attack or perform tasks.',
    tags: ['conjuration', 'combat', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Awaken',
    level: 5,
    school: 'Transmutation',
    type: 'spell',
    description:
      'After spending the casting time tracing magical pathways within a precious gemstone, you touch a Huge or smaller beast or plant. The target gains an Intelligence of 10 and the ability to speak.',
    tags: ['transmutation', 'nature', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Dominate Person',
    level: 5,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You attempt to beguile a humanoid that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration, and you can issue telepathic commands.',
    tags: ['charm', 'control', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Dream',
    level: 5,
    school: 'Illusion',
    type: 'spell',
    description:
      'This spell shapes a creature\'s dreams. You can make the messenger appear in the target\'s dreams and converse with the target, or turn the dream into a nightmare dealing psychic damage.',
    tags: ['communication', 'psychic', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Geas',
    level: 5,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You place a magical command on a creature that you can see within range, forcing it to carry out some service or refrain from some action. It takes 5d10 psychic damage if it acts against the command.',
    tags: ['charm', 'control', 'verbal'],
  },
  {
    name: 'Greater Restoration',
    level: 5,
    school: 'Abjuration',
    type: 'spell',
    description:
      'You imbue a creature you touch with positive energy to undo a debilitating effect. You can reduce exhaustion, end a charm or petrification, remove a curse, fix ability score reduction, or restore max HP.',
    tags: ['healing', 'restoration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Hold Monster',
    level: 5,
    school: 'Enchantment',
    type: 'spell',
    description:
      'Choose a creature that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. This spell works on any creature type.',
    tags: ['control', 'paralysis', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Legend Lore',
    level: 5,
    school: 'Divination',
    type: 'spell',
    description:
      'Name or describe a person, place, or object. The spell brings to your mind a brief summary of significant lore about the thing you named.',
    tags: ['knowledge', 'utility', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Mass Cure Wounds',
    level: 5,
    school: 'Evocation',
    type: 'spell',
    description:
      'A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot sphere. Each target regains hit points equal to 3d8 + your spellcasting modifier.',
    tags: ['healing', 'area', 'verbal', 'somatic'],
  },
  {
    name: 'Mislead',
    level: 5,
    school: 'Illusion',
    type: 'spell',
    description:
      'You become invisible at the same time that an illusory double of you appears where you are standing. You can see and hear through the double.',
    tags: ['illusion', 'stealth', 'concentration', 'somatic'],
  },
  {
    name: 'Modify Memory',
    level: 5,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You attempt to reshape another creature\'s memories. One creature that you can see must make a Wisdom saving throw. On a failure, you can modify its memories of an event within the last 24 hours.',
    tags: ['charm', 'control', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Planar Binding',
    level: 5,
    school: 'Abjuration',
    type: 'spell',
    description:
      'You attempt to bind a celestial, elemental, fey, or fiend to your service. The creature must be within range for the entire casting, and it must make a Charisma saving throw.',
    tags: ['control', 'conjuration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Raise Dead',
    level: 5,
    school: 'Necromancy',
    type: 'spell',
    description:
      'You return a dead creature you touch to life, provided that it has been dead no longer than 10 days. The creature returns with 1 hit point and all poisons and nonmagical diseases are neutralized.',
    tags: ['healing', 'resurrection', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Scrying',
    level: 5,
    school: 'Divination',
    type: 'spell',
    description:
      'You can see and hear a particular creature you choose that is on the same plane of existence as you. The target must make a Wisdom saving throw, modified by how well you know it.',
    tags: ['detection', 'scrying', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Seeming',
    level: 5,
    school: 'Illusion',
    type: 'spell',
    description:
      'This spell allows you to change the appearance of any number of creatures that you can see within range. Each target you choose takes on a new appearance.',
    tags: ['illusion', 'social', 'verbal', 'somatic'],
  },
  {
    name: 'Teleportation Circle',
    level: 5,
    school: 'Conjuration',
    type: 'spell',
    description:
      'As you cast the spell, you draw a 10-foot-diameter circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice.',
    tags: ['teleportation', 'verbal', 'material'],
  },

  // ===== 6TH LEVEL =====
  {
    name: 'Eyebite',
    level: 6,
    school: 'Necromancy',
    type: 'spell',
    description:
      'For the duration, your eyes become an inky void imbued with dread power. One creature of your choice within 60 feet must succeed on a Wisdom save or be affected by asleep, panicked, or sickened.',
    tags: ['control', 'debuff', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Find the Path',
    level: 6,
    school: 'Divination',
    type: 'spell',
    description:
      'This spell allows you to find the shortest, most direct physical route to a specific fixed location that you are familiar with on the same plane of existence.',
    tags: ['utility', 'navigation', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Guards and Wards',
    level: 6,
    school: 'Abjuration',
    type: 'spell',
    description:
      'You create a ward that protects up to 2,500 square feet of floor space. The warded area can be up to 20 feet tall, shaped as you desire with multiple magical effects.',
    tags: ['protection', 'area', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Mass Suggestion',
    level: 6,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You suggest a course of activity to up to twelve creatures of your choice that can hear and understand you. The suggestion must be worded to sound reasonable.',
    tags: ['charm', 'control', 'verbal', 'material'],
  },
  {
    name: "Otto's Irresistible Dance",
    level: 6,
    school: 'Enchantment',
    type: 'spell',
    description:
      'Choose one creature that you can see within range. The target begins a comic dance in place: shuffling, tapping its feet, and capering. It must use all its movement to dance.',
    tags: ['control', 'debuff', 'concentration', 'verbal'],
  },
  {
    name: 'Programmed Illusion',
    level: 6,
    school: 'Illusion',
    type: 'spell',
    description:
      'You create an illusion of an object, creature, or other visible phenomenon within range that activates when a specific condition occurs. It seems completely real.',
    tags: ['illusion', 'utility', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'True Seeing',
    level: 6,
    school: 'Divination',
    type: 'spell',
    description:
      'You give a willing creature you touch the ability to see things as they actually are. The creature has truesight to a range of 120 feet, seeing through illusions and into the Ethereal Plane.',
    tags: ['detection', 'utility', 'verbal', 'somatic', 'material'],
  },

  // ===== 7TH LEVEL =====
  {
    name: 'Dream of the Blue Veil',
    level: 7,
    school: 'Conjuration',
    type: 'spell',
    description:
      'You and up to eight willing creatures within range fall unconscious and are transported to another world or plane of existence through a shared dream.',
    tags: ['teleportation', 'planar', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Etherealness',
    level: 7,
    school: 'Transmutation',
    type: 'spell',
    description:
      'You step into the border regions of the Ethereal Plane, in the area where it overlaps with your current plane. You remain in the Border Ethereal for the duration.',
    tags: ['planar', 'stealth', 'verbal', 'somatic'],
  },
  {
    name: 'Forcecage',
    level: 7,
    school: 'Evocation',
    type: 'spell',
    description:
      'An immobile, invisible, cube-shaped prison composed of magical force springs into existence around an area you choose within range. It can be a cage or a solid box.',
    tags: ['control', 'prison', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Mirage Arcane',
    level: 7,
    school: 'Illusion',
    type: 'spell',
    description:
      'You make terrain in an area up to one mile square look, sound, smell, and even feel like some other sort of terrain. The illusion includes tactile elements so it can fool creatures.',
    tags: ['illusion', 'area', 'verbal', 'somatic'],
  },
  {
    name: "Mordenkainen's Magnificent Mansion",
    level: 7,
    school: 'Conjuration',
    type: 'spell',
    description:
      'You conjure an extradimensional dwelling in range that lasts for the duration. It has a magnificent entrance and contains a series of furnished rooms with food, servants, and comfort.',
    tags: ['utility', 'conjuration', 'shelter', 'verbal', 'somatic', 'material'],
  },
  {
    name: "Mordenkainen's Sword",
    level: 7,
    school: 'Evocation',
    type: 'spell',
    description:
      'You create a sword-shaped plane of force that hovers within range. When the sword appears, you make a melee spell attack against a target. On a hit, the target takes 3d10 force damage.',
    tags: ['damage', 'force', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Project Image',
    level: 7,
    school: 'Illusion',
    type: 'spell',
    description:
      'You create an illusory copy of yourself that lasts for the duration. The copy can appear at any location within range that you have seen before, and it looks and sounds like you.',
    tags: ['illusion', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Regenerate',
    level: 7,
    school: 'Transmutation',
    type: 'spell',
    description:
      'You touch a creature and stimulate its natural healing ability. The target regains 4d8 + 15 hit points and regains 1 hit point at the start of each of its turns for the duration.',
    tags: ['healing', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Resurrection',
    level: 7,
    school: 'Necromancy',
    type: 'spell',
    description:
      'You touch a dead creature that has been dead for no more than a century. If its soul is free and willing, the creature is restored to life with all its hit points.',
    tags: ['healing', 'resurrection', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Symbol',
    level: 7,
    school: 'Abjuration',
    type: 'spell',
    description:
      'When you inscribe this glyph, you choose from several effects including death, discord, fear, hopelessness, insanity, pain, sleep, and stunning that trigger when a creature enters the area.',
    tags: ['control', 'trap', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Teleport',
    level: 7,
    school: 'Conjuration',
    type: 'spell',
    description:
      'This spell instantly transports you and up to eight willing creatures, or a single object, to a destination you select. The accuracy depends on your familiarity with the destination.',
    tags: ['teleportation', 'verbal'],
  },

  // ===== 8TH LEVEL =====
  {
    name: 'Antipathy/Sympathy',
    level: 8,
    school: 'Enchantment',
    type: 'spell',
    description:
      'This spell attracts or repels creatures of your choice. You target an object or area and specify a kind of creature. Affected creatures are drawn to or repelled from the target.',
    tags: ['control', 'charm', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Dominate Monster',
    level: 8,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You attempt to beguile a creature that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration, obeying your telepathic commands.',
    tags: ['charm', 'control', 'concentration', 'verbal', 'somatic'],
  },
  {
    name: 'Feeblemind',
    level: 8,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You blast the mind of a creature you can see within range, attempting to shatter its intellect and personality. The target takes 4d6 psychic damage and must make an Intelligence saving throw.',
    tags: ['damage', 'psychic', 'debuff', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Glibness',
    level: 8,
    school: 'Transmutation',
    type: 'spell',
    description:
      'Until the spell ends, when you make a Charisma check, you can replace the number you roll with a 15. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates you are being truthful.',
    tags: ['social', 'buff', 'verbal'],
  },
  {
    name: 'Mind Blank',
    level: 8,
    school: 'Abjuration',
    type: 'spell',
    description:
      'Until the spell ends, one willing creature you touch is immune to psychic damage, any effect that would sense its emotions or read its thoughts, divination spells, and the charmed condition.',
    tags: ['protection', 'psychic', 'verbal', 'somatic'],
  },
  {
    name: 'Power Word Stun',
    level: 8,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You speak a word of power that can overwhelm the mind of one creature you can see within range, leaving it dumbfounded. If the target has 150 hit points or fewer, it is stunned.',
    tags: ['control', 'stun', 'verbal'],
  },

  // ===== 9TH LEVEL =====
  {
    name: 'Foresight',
    level: 9,
    school: 'Divination',
    type: 'spell',
    description:
      'You touch a willing creature and bestow a limited ability to see into the immediate future. The target can\'t be surprised, has advantage on attack rolls, ability checks, and saving throws.',
    tags: ['buff', 'divination', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Mass Polymorph',
    level: 9,
    school: 'Transmutation',
    type: 'spell',
    description:
      'You transform up to ten creatures that you can see within range. Each target is transformed into a new beast form of your choice, following the same rules as polymorph.',
    tags: ['transmutation', 'control', 'concentration', 'verbal', 'somatic', 'material'],
  },
  {
    name: 'Power Word Heal',
    level: 9,
    school: 'Evocation',
    type: 'spell',
    description:
      'A wave of healing energy washes over the creature you touch. The target regains all its hit points. If the creature is charmed, frightened, paralyzed, or stunned, the condition ends.',
    tags: ['healing', 'verbal', 'somatic'],
  },
  {
    name: 'Power Word Kill',
    level: 9,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You utter a word of power that can compel one creature you can see within range to die instantly. If the creature has 100 hit points or fewer, it dies. Otherwise, the spell has no effect.',
    tags: ['damage', 'death', 'verbal'],
  },
  {
    name: 'Psychic Scream',
    level: 9,
    school: 'Enchantment',
    type: 'spell',
    description:
      'You unleash the power of your mind to blast the intellect of up to ten creatures of your choice within 90 feet. Each target takes 14d6 psychic damage and must make an Intelligence saving throw or be stunned.',
    tags: ['damage', 'psychic', 'stun', 'somatic'],
  },
  {
    name: 'True Polymorph',
    level: 9,
    school: 'Transmutation',
    type: 'spell',
    description:
      'Choose one creature or nonmagical object that you can see within range. You transform the creature into a different creature, the creature into a nonmagical object, or the object into a creature.',
    tags: ['transmutation', 'concentration', 'verbal', 'somatic', 'material'],
  },

  // ===== CLASS FEATURES =====
  {
    name: 'Bardic Inspiration',
    level: 1,
    school: 'Class Feature',
    type: 'class_feature',
    description:
      'You can inspire others through stirring words or music. A creature that has a Bardic Inspiration die can roll it and add the number rolled to one ability check, attack roll, or saving throw.',
    tags: ['buff', 'inspiration', 'bonus action'],
  },
  {
    name: 'Jack of All Trades',
    level: 2,
    school: 'Class Feature',
    type: 'class_feature',
    description:
      'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn\'t already include your proficiency bonus.',
    tags: ['utility', 'passive', 'proficiency'],
  },
  {
    name: 'Song of Rest',
    level: 2,
    school: 'Class Feature',
    type: 'class_feature',
    description:
      'You can use soothing music or oration to help revitalize your wounded allies during a short rest. An ally who regains hit points at the end of the short rest regains an extra 1d6 hit points.',
    tags: ['healing', 'rest', 'passive'],
  },
  {
    name: 'Countercharm',
    level: 6,
    school: 'Class Feature',
    type: 'class_feature',
    description:
      'You gain the ability to use musical notes or words of power to disrupt mind-influencing effects. You and friendly creatures within 30 feet have advantage on saving throws against being frightened or charmed.',
    tags: ['protection', 'charm', 'fear', 'verbal'],
  },
  {
    name: 'Magical Secrets',
    level: 10,
    school: 'Class Feature',
    type: 'class_feature',
    description:
      'You have plundered magical knowledge from a wide spectrum of disciplines. Choose two spells from any class, including this one. The chosen spells count as bard spells for you.',
    tags: ['utility', 'versatile', 'passive'],
  },
  {
    name: 'Superior Inspiration',
    level: 20,
    school: 'Class Feature',
    type: 'class_feature',
    description:
      'When you roll initiative and have no uses of Bardic Inspiration left, you regain one use. Your bardic talent is so refined it never fully runs dry.',
    tags: ['buff', 'inspiration', 'passive'],
  },

  // ===== SUBCLASS FEATURES =====
  {
    name: 'Cutting Words',
    level: 3,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Lore',
    description:
      'You learn how to use your wit to distract, confuse, and otherwise sap the confidence of others. When a creature makes an attack roll, ability check, or damage roll, you can use your reaction to subtract your Bardic Inspiration die.',
    tags: ['debuff', 'reaction', 'verbal'],
  },
  {
    name: 'Additional Magical Secrets',
    level: 6,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Lore',
    description:
      'You learn two spells of your choice from any class. A spell you choose must be of a level you can cast. The chosen spells count as bard spells for you.',
    tags: ['utility', 'versatile', 'passive'],
  },
  {
    name: 'Combat Inspiration',
    level: 3,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Valor',
    description:
      'A creature that has a Bardic Inspiration die from you can roll that die and add the number rolled to a weapon damage roll it just made, or add it to its AC against one attack.',
    tags: ['buff', 'combat', 'reaction'],
  },
  {
    name: 'Battle Magic',
    level: 14,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Valor',
    description:
      'You have mastered the art of weaving spellcasting and weapon use into a single harmonious act. When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.',
    tags: ['combat', 'bonus action'],
  },
  {
    name: 'Mantle of Inspiration',
    level: 3,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Glamour',
    description:
      'You can weave a song of fey magic that imbues your allies with vigor and speed. As a bonus action, you grant temporary hit points and allow allies to immediately move without provoking opportunity attacks.',
    tags: ['buff', 'movement', 'bonus action', 'fey'],
  },
  {
    name: 'Unbreakable Majesty',
    level: 14,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Glamour',
    description:
      'Your appearance takes on an otherworldly aspect that makes you look almost too beautiful for the mortal realm. Creatures that attack you must make a Charisma saving throw or choose a different target.',
    tags: ['defense', 'charm', 'fey', 'bonus action'],
  },
  {
    name: 'Psychic Blades',
    level: 3,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Whispers',
    description:
      'You gain the ability to make your weapon attacks magically toxic to a creature\'s mind. When you hit with a weapon attack, you can expend one Bardic Inspiration die to deal extra psychic damage.',
    tags: ['damage', 'psychic', 'combat'],
  },
  {
    name: 'Mantle of Whispers',
    level: 6,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Whispers',
    description:
      'You gain the ability to adopt a humanoid\'s persona. When a humanoid dies within 30 feet of you, you can capture its shadow, later using it to perfectly disguise yourself as that person.',
    tags: ['stealth', 'social', 'deception'],
  },
  {
    name: 'Shadow Lore',
    level: 14,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Whispers',
    description:
      'You gain the ability to weave dark magic into your words and tap into a creature\'s deepest fears. The creature is magically charmed and obeys you as if you know its darkest secret.',
    tags: ['charm', 'control', 'fear'],
  },
  {
    name: 'Mote of Potential',
    level: 3,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Creation',
    description:
      'Whenever you give a creature a Bardic Inspiration die, a mote of potential appears nearby. When the die is used, the mote provides an additional effect based on whether it was for an ability check, attack, or save.',
    tags: ['buff', 'creation', 'inspiration'],
  },
  {
    name: 'Performance of Creation',
    level: 6,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Creation',
    description:
      'As an action, you can channel the magic of the Song of Creation to create one nonmagical item of your choice in an unoccupied space within 10 feet of you.',
    tags: ['creation', 'utility', 'conjuration'],
  },
  {
    name: 'Animating Performance',
    level: 14,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Creation',
    description:
      'As an action, you can animate one Large or smaller nonmagical item within 30 feet of you. The animated item uses the Dancing Item stat block and is friendly to you and your companions.',
    tags: ['creation', 'combat', 'conjuration'],
  },
  {
    name: 'Silver Tongue',
    level: 3,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Eloquence',
    description:
      'You are a master at saying the right thing at the right time. When you make a Charisma (Deception) or Charisma (Persuasion) check, you can treat a d20 roll of 9 or lower as a 10.',
    tags: ['social', 'passive', 'charisma'],
  },
  {
    name: 'Unfailing Inspiration',
    level: 6,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Eloquence',
    description:
      'Your inspiring words are so persuasive that others feel driven to succeed. When a creature adds your Bardic Inspiration die to a roll and fails, the creature keeps the die.',
    tags: ['buff', 'inspiration', 'passive'],
  },
  {
    name: 'Universal Speech',
    level: 14,
    school: 'College Feature',
    type: 'subclass_feature',
    subclass: 'College of Eloquence',
    description:
      'You gain the ability to make your speech intelligible to any creature. As an action, choose up to a number of creatures equal to your Charisma modifier. They magically understand you for one hour.',
    tags: ['communication', 'social', 'charisma'],
  },
];
