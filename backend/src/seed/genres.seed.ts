export const GENRES_SEED = [
  // ===== FANTASY GENRES =====
  {
    name: 'Medieval Ballad',
    slug: 'medieval-ballad',
    category: 'fantasy',
    description:
      'A traditional narrative song form telling stories of heroes, love, and legend through structured verses with a repeating refrain.',
    styleGuide:
      'Use archaic but accessible language with words like "hark," "ere," "forsooth," and "thee." Structure the song as a narrative that tells a complete story across verses, with each verse advancing the plot. The chorus should serve as a moral or emotional anchor. Favor iambic tetrameter or pentameter for a natural storytelling cadence.',
    meterPattern: 'Iambic tetrameter (da-DUM da-DUM da-DUM da-DUM)',
    rhymeScheme: 'ABAB or ABCB',
    exampleLines: [
      'Hark now the tale of a wandering knight,',
      'Who rode through the vale by pale moonlight,',
      'His sword sang a song both fierce and bright.',
    ],
  },
  {
    name: 'Tavern Song',
    slug: 'tavern-song',
    category: 'fantasy',
    description:
      'A rowdy, communal drinking song meant to be sung loudly in a tavern with friends, ale in hand and spirits high.',
    styleGuide:
      'Keep the language simple, fun, and slightly bawdy. The chorus must be extremely catchy and easy for a crowd to pick up after one listen. Use call-and-response patterns where possible. Reference ale, mead, wenches, coin, and the adventuring life. Humor is welcome.',
    meterPattern: 'Strong stress pattern, 4 beats per line',
    rhymeScheme: 'AABB (couplets)',
    exampleLines: [
      'Oh fill my cup and fill it high!',
      "We'll drink until the well runs dry!",
      'Another round for you and me!',
    ],
  },
  {
    name: 'War Chant',
    slug: 'war-chant',
    category: 'fantasy',
    description:
      'A rhythmic battle cry designed to steel the nerves and fire the blood of warriors charging into combat.',
    styleGuide:
      'Use short, punchy lines with strong rhythmic beats. Build intensity across verses. Use repetition and escalation. Reference steel, shields, blood, glory, ancestors, and honor. The chorus should be something soldiers could actually shout while marching or charging.',
    meterPattern: 'Trochaic (DUM-da DUM-da), heavy stress',
    rhymeScheme: 'AABB or free verse with strong rhythm',
    exampleLines: [
      'Steel and thunder! Blood and fire!',
      'Push them back and never tire!',
      'For glory! For honor! For home!',
    ],
  },
  {
    name: 'Sea Shanty',
    slug: 'sea-shanty',
    category: 'fantasy',
    description:
      'A work song born on the decks of ships, with a strong rhythm for hauling ropes and a chorus the whole crew joins.',
    styleGuide:
      'Use a strong call-and-response structure with a leader singing verses and the crew joining on the chorus. Reference the sea, wind, waves, ships, ports, and sailors life. The rhythm should feel like the push-pull of hauling rope or rowing. Keep language salty and nautical.',
    meterPattern: 'Strong duple meter, work-song rhythm',
    rhymeScheme: 'Varies — often ABAB with call-and-response',
    exampleLines: [
      "Way-hey and up she rises!",
      "We'll sail the seas till fortune finds us!",
      'Heave ho, me hearties, pull together!',
    ],
  },
  {
    name: 'Elven Hymn',
    slug: 'elven-hymn',
    category: 'fantasy',
    description:
      'An ethereal, flowing song of the elves — timeless, beautiful, and suffused with the magic of starlight and ancient forests.',
    styleGuide:
      'Use flowing, elegant language with long vowels and soft consonants. Reference starlight, moonrise, ancient trees, silver streams, and the passage of centuries. Avoid harsh or guttural sounds. The tone should be serene, wise, and slightly melancholic. Free verse with occasional internal rhyme works best.',
    meterPattern: 'Free verse with flowing cadence',
    rhymeScheme: 'Free verse with internal rhyme',
    exampleLines: [
      'Beneath the silver arch of stars we sing,',
      'A melody as old as waking spring,',
      'And in the leaves, the ancient echoes ring.',
    ],
  },
  {
    name: 'Dwarven Dirge',
    slug: 'dwarven-dirge',
    category: 'fantasy',
    description:
      'A deep, solemn song of the dwarves — rumbling through stone halls, honoring the fallen and the ancient deeps.',
    styleGuide:
      'Use heavy, percussive language with hard consonants and deep vowels. Reference stone, iron, mithril, deep halls, ancestral vaults, forge-fire, and mountain roots. The rhythm should feel like hammers striking anvils or boots marching through tunnels. Solemn but proud.',
    meterPattern: 'Heavy spondaic beats (DUM-DUM DUM-DUM)',
    rhymeScheme: 'ABAB or AABB',
    exampleLines: [
      'Deep in the stone where the old kings sleep,',
      'We strike the iron, our oaths to keep,',
      'The mountain mourns in the endless deep.',
    ],
  },
  {
    name: 'Fey Reel',
    slug: 'fey-reel',
    category: 'fantasy',
    description:
      'A quick, playful, and mischievous dance-song of the fey — full of tricks, riddles, and enchanting rhythms.',
    styleGuide:
      'Use light, quick language that dances and skips. Include wordplay, double meanings, riddles, and tricks. Reference mushroom rings, moonlit dances, glamour, fey bargains, and shape-shifting. The rhythm should be fast and infectious, making listeners want to dance.',
    meterPattern: 'Quick anapestic or dactylic (da-da-DUM or DUM-da-da)',
    rhymeScheme: 'AABB with internal rhymes',
    exampleLines: [
      'Come and dance in the ring of the moon!',
      "The fiddler plays a bewildering tune!",
      "And if you step in, you won't leave too soon!",
    ],
  },
  {
    name: 'Dragon Song',
    slug: 'dragon-song',
    category: 'fantasy',
    description:
      'A grand, majestic song worthy of the ancient wyrms — powerful, sweeping, and imbued with the weight of eons.',
    styleGuide:
      'Use sweeping, dramatic language that feels ancient and powerful. Reference hoards of gold, fire and flame, vast wings, eons of slumber, and world-shaping power. The tone should be simultaneously beautiful and terrifying, majestic and primal. Build verses that feel like a dragon unfurling its wings.',
    meterPattern: 'Varied — sweeping and dramatic',
    rhymeScheme: 'ABAB or free verse',
    exampleLines: [
      'I am the fire that forged the world,',
      'My wings are storms, my breath unfurled,',
      'Before the gods, my scales were pearled.',
    ],
  },
  {
    name: 'Requiem',
    slug: 'requiem',
    category: 'fantasy',
    description:
      'A solemn, mournful song of remembrance for the fallen — ceremonial, dignified, and deeply moving.',
    styleGuide:
      'Use formal, measured language with a slow, dignified cadence. Reference the journey beyond, memories of the departed, legacy, rest, and peace. Avoid casualness — this is a ceremony. The tone should be grief tempered by respect and love. Build from sorrow to acceptance.',
    meterPattern: 'Slow, measured iambic',
    rhymeScheme: 'ABAB or ABCB',
    exampleLines: [
      'Lay down your sword, your watch is done,',
      'The final battle fought and won,',
      'Now rest beneath the setting sun.',
    ],
  },
  {
    name: 'Lullaby',
    slug: 'lullaby',
    category: 'fantasy',
    description:
      'A gentle, soothing song to calm and comfort — whether sung to a child, a wounded ally, or a restless spirit.',
    styleGuide:
      'Use soft, soothing language with gentle imagery. Reference moonlight, stars, warm blankets, safe harbors, and peaceful dreams. Keep the rhythm gentle and rocking, like a cradle. Repetition is key — repeat key phrases and sounds to create a hypnotic, calming effect.',
    meterPattern: 'Gentle trochaic (DUM-da DUM-da), rocking rhythm',
    rhymeScheme: 'AABB or ABAB',
    exampleLines: [
      'Close your eyes, the stars are gleaming,',
      'Soft and low, the moon is beaming,',
      'Safe and warm, begin your dreaming.',
    ],
  },
  {
    name: 'Epic Saga',
    slug: 'epic-saga',
    category: 'fantasy',
    description:
      'A sweeping narrative of legendary deeds — the kind of song that fills great halls and makes heroes weep.',
    styleGuide:
      'Use grand, heroic language with kennings and epithets (e.g., "whale-road" for sea, "ring-giver" for king). Build a narrative across verses that tells of legendary deeds, impossible odds, and triumphant victories. The pacing should build from quiet beginnings to thunderous climaxes. This is the song that bards dream of performing.',
    meterPattern: 'Heroic verse — iambic pentameter or alliterative long line',
    rhymeScheme: 'ABAB or alliterative verse',
    exampleLines: [
      'In days of old when dragons held dominion,',
      'A hero rose from humble hearth and home,',
      'To challenge fate and claim the golden pinion.',
    ],
  },

  // ===== MODERN GENRES =====
  {
    name: 'Pop',
    slug: 'pop',
    category: 'modern',
    description:
      'Catchy, accessible, and emotionally resonant — the kind of song that gets stuck in your head and makes you feel things.',
    styleGuide:
      'Focus on a killer hook and an incredibly catchy chorus. Use contemporary language that is relatable and emotionally direct. Structure: verse-prechorus-chorus-verse-prechorus-chorus-bridge-chorus. Keep lyrics simple but emotionally resonant. The chorus should be singable by anyone after hearing it once.',
    meterPattern: 'Varied — emphasis on catchiness',
    rhymeScheme: 'ABAB or AABB',
    exampleLines: [
      "You light me up like a spell in the dark,",
      "Every word you say leaves a magical mark,",
      "Can't get you out of my head, you're my spark.",
    ],
  },
  {
    name: 'Rock',
    slug: 'rock',
    category: 'modern',
    description:
      'Raw emotional power driven by intensity and passion — from quiet vulnerability to explosive energy.',
    styleGuide:
      'Use emotionally intense language with dynamic contrasts — soft verses building to powerful choruses. Bold declarations, visceral imagery, and driving rhythm. The lyrics should feel like they demand to be performed with a band behind them. Mix vulnerability in verses with power in choruses.',
    meterPattern: 'Strong 4/4 rhythm with syncopation',
    rhymeScheme: 'ABAB or free with strong rhythm',
    exampleLines: [
      "I've got thunder in my veins tonight,",
      "Gonna burn these walls down with the light,",
      "Stand up, stand tall, we're ready for the fight.",
    ],
  },
  {
    name: 'Hip-Hop',
    slug: 'hip-hop',
    category: 'modern',
    description:
      'Rhythmic wordcraft at its finest — dense rhymes, clever wordplay, and lyrical dexterity that demands respect.',
    styleGuide:
      'Pack the bars with internal rhymes, multisyllabic rhymes, wordplay, double entendres, and clever metaphors. Maintain a strong rhythmic flow throughout. Braggadocio is welcome — this is a bard, after all. Use contemporary hip-hop conventions: bars of roughly equal length, strategic pauses, and punchlines. Make it sound like it could go hard over a beat.',
    meterPattern: '4/4 time, 4 bars per section, emphasis on flow',
    rhymeScheme: 'AABB with dense internal rhymes',
    exampleLines: [
      "I spit enchantments, they can't handle the bars,",
      'My Bardic Inspiration hitting hard, leaving scars,',
      'Level twenty flow, I been destined for the stars.',
    ],
  },
  {
    name: 'Metal',
    slug: 'metal',
    category: 'modern',
    description:
      'Aggressive, dramatic, and relentlessly powerful — channeling primal energy into sonic devastation.',
    styleGuide:
      'Use aggressive, dramatic language with dark and epic imagery. Reference destruction, power, darkness, and overwhelming force. The rhythm should be driving and relentless with occasional breakdowns. Mix guttural intensity with melodic hooks. Think power metal meets D&D — this should sound like it could be performed by a band of orcs.',
    meterPattern: 'Driving, aggressive rhythm with breakdowns',
    rhymeScheme: 'ABAB or free with heavy emphasis',
    exampleLines: [
      'DESCEND INTO THE FIRE AND THE FLAME!',
      'NO MORTAL FORCE CAN BREAK MY NAME!',
      'I AM THE STORM THAT BURNS THE SHAME!',
    ],
  },
  {
    name: 'Blues',
    slug: 'blues',
    category: 'modern',
    description:
      'Soulful, raw, and honest — born from struggle and transformed into art through the alchemy of feeling.',
    styleGuide:
      'Use the classic AAB blues pattern: state a line, repeat it with slight variation, then resolve with a new third line. Keep language conversational, raw, and deeply emotional. Reference struggle, longing, hard times, and perseverance. Use call-and-response where possible. The blues tells the truth, even when it hurts.',
    meterPattern: '12-bar blues pattern, shuffle rhythm',
    rhymeScheme: 'AAB (first line repeats, third line resolves)',
    exampleLines: [
      'Woke up this morning with a hex upon my soul,',
      "I said I woke up this morning, hex heavy on my soul,",
      "Gonna find me a cleric, make this broken body whole.",
    ],
  },
  {
    name: 'Jazz',
    slug: 'jazz',
    category: 'modern',
    description:
      'Sophisticated, cool, and effortlessly smooth — the sound of a smoky lounge where every note means something.',
    styleGuide:
      'Use sophisticated, urbane language with unexpected word choices and smooth phrasing. The rhythm should feel syncopated and conversational — like someone talking in musical phrases. Reference moonlight, city nights, smoke, and mystery. The tone should be cool and detached with hidden depths of emotion.',
    meterPattern: 'Syncopated, conversational rhythm',
    rhymeScheme: 'ABAB with internal variation',
    exampleLines: [
      'The night spills ink across the city lights,',
      "And in the haze, your spell takes hold, that's right,",
      'A cool enchantment wrapped in velvet nights.',
    ],
  },
  {
    name: 'Country',
    slug: 'country',
    category: 'modern',
    description:
      'Honest storytelling from the heart — simple words carrying heavy truths about love, loss, and the road home.',
    styleGuide:
      'Use honest, straightforward language with concrete imagery. Tell a story with heart and sincerity. Reference home, dusty roads, open skies, hard work, love, and loss. Keep the language simple but deeply felt. The chorus should hit you right in the feelings. A touch of twang in the word choices helps.',
    meterPattern: 'Steady 4/4, storytelling rhythm',
    rhymeScheme: 'ABAB or AABB',
    exampleLines: [
      'Down a long dirt road where the wild things grow,',
      'I learned my magic where the river runs slow,',
      "Some things a bard just naturally knows.",
    ],
  },
  {
    name: 'Folk',
    slug: 'folk',
    category: 'modern',
    description:
      'Timeless storytelling passed down through generations — acoustic, authentic, and carrying the weight of tradition.',
    styleGuide:
      'Use language that feels timeless and traditional. Tell a story that could be passed down through generations. Use traditional song structures with a narrative arc. Reference the common people, the road, nature, and enduring truths. The feel should be acoustic and intimate, as if performed by a single voice with a simple instrument.',
    meterPattern: 'Varied — traditional ballad meter common',
    rhymeScheme: 'ABCB or ABAB',
    exampleLines: [
      "Come gather 'round and hear my tale,",
      'Of magic cast on moonlit dale,',
      'Where ancient words shall never fail.',
    ],
  },
  {
    name: 'Punk',
    slug: 'punk',
    category: 'modern',
    description:
      'Short, fast, loud, and unapologetically rebellious — three chords and the truth, delivered at maximum velocity.',
    styleGuide:
      'Keep it short, fast, and raw. Use unpolished, direct language with anti-establishment energy. Verses should be brief. The chorus should be shoutable. Reference rebellion, breaking rules, defying authority, and doing things your own way. No pretension — just energy and attitude. Bards are the original punks.',
    meterPattern: 'Fast 4/4, minimal variation',
    rhymeScheme: 'AABB, simple and direct',
    exampleLines: [
      "I don't need your rules, I've got my own spell!",
      'Kings and queens can go straight to hell!',
      "Three chords and the truth is all I need to tell!",
    ],
  },
  {
    name: 'Reggae',
    slug: 'reggae',
    category: 'modern',
    description:
      'Laid-back grooves carrying messages of unity, peace, and resistance — island rhythms with universal truths.',
    styleGuide:
      'Use a relaxed, laid-back flow with positive energy. Reference unity, peace, nature, resistance to oppression, and spiritual connection. The rhythm should feel like a gentle sway — offbeat emphasis in the language. Include Jamaican-influenced phrasing where natural. The overall tone should be warm, wise, and uplifting.',
    meterPattern: 'Offbeat emphasis, relaxed groove',
    rhymeScheme: 'ABAB or AABB with flowing rhythm',
    exampleLines: [
      'Feel the rhythm of the magic flow,',
      'Every creature reaping what we sow,',
      'One love, one light, let the healing grow.',
    ],
  },
  {
    name: 'Electronic',
    slug: 'electronic',
    category: 'modern',
    description:
      'Hypnotic, repetitive, and transcendent — minimal words creating maximum atmosphere through pulsing rhythm.',
    styleGuide:
      'Use short, repetitive phrases that work as loops. Build through repetition with slight variations — add or change one word each time. Keep lyrics minimal and hypnotic. Reference light, energy, frequency, connection, and transcendence. The words should feel like they pulse and throb, creating a trance-like state.',
    meterPattern: '4/4, repetitive, building',
    rhymeScheme: 'Repetitive with variation',
    exampleLines: [
      'Feel the pulse, feel the light,',
      'Feel the pulse, feel the might,',
      'Feel the pulse through the night.',
    ],
  },
  {
    name: 'R&B',
    slug: 'rnb',
    category: 'modern',
    description:
      'Smooth, soulful, and emotionally rich — velvet vocals carrying deep feeling over silky grooves.',
    styleGuide:
      'Use smooth, emotionally rich language with a sensual edge. Phrasing should suggest melodic vocal runs and ad-libs. Reference love, desire, connection, and emotional vulnerability. The rhythm should flow and undulate. Mix confident swagger with tender vulnerability. This is the sound of a bard who knows the power of their voice.',
    meterPattern: 'Flowing, syncopated, groove-based',
    rhymeScheme: 'ABAB with melismatic phrasing',
    exampleLines: [
      "Baby, let me cast my spell on you tonight,",
      "Every word I sing gonna make it feel right,",
      "Wrapped up in this magic, hold on tight.",
    ],
  },
];
