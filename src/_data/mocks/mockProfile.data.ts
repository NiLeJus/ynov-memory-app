import { eContentType, eMemcardType } from 'src/_models/enums/app.enums';
import { MemcardContentObj, MemcardPrototype } from 'src/_models/memcard.model';

export const _MOCK_MEMCARD_TERRYPRATCHET: MemcardPrototype[] = [
  new MemcardPrototype(
    'What carries the Discworld through space?',
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'What carries the Discworld through space?',
        eContentType.Text,
        'A question about the structure of the Discworld.',
      ),
    ],
    [
      new MemcardContentObj(
        "A giant turtle named Great A'Tuin",
        eContentType.Text,
        "The Discworld is carried by Great A'Tuin.",
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    'What directions replace cardinal points on the Discworld?',
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'What directions replace cardinal points on the Discworld?',
        eContentType.Text,
        'A question about navigation in the Discworld.',
      ),
    ],
    [
      new MemcardContentObj(
        'Hubward, Rimward, Turnwise, and Widdershins',
        eContentType.Text,
        'These directions are based on the rotation and structure of the Disc.',
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    'Where do the gods of the Discworld live?',
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'Where do the gods of the Discworld live?',
        eContentType.Text,
        'A question about divine geography.',
      ),
    ],
    [
      new MemcardContentObj(
        'Dunmanifestin at Cori Celesti',
        eContentType.Text,
        'The gods reside at the peak of Cori Celesti.',
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    'What happens when enough people believe in something on the Discworld?',
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'What happens when enough people believe in something on the Discworld?',
        eContentType.Text,
        'A question about belief and reality.',
      ),
    ],
    [
      new MemcardContentObj(
        'It becomes real',
        eContentType.Text,
        'Belief shapes reality on the Discworld.',
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    'What races populate the Discworld?',
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'What races populate the Discworld?',
        eContentType.Text,
        'A question about inhabitants of the Disc.',
      ),
    ],
    [
      new MemcardContentObj(
        'Humans, dwarves, trolls, and fantastical creatures like dragons and elves',
        eContentType.Text,
        'The Discworld is home to a diverse array of beings.',
      ),
    ],
    0,
  ),
];

export const _MOCK_MEMCARD_KARLMARX: MemcardPrototype[] = [
  new MemcardPrototype(
    'Une question sur les origines de Karl Marx.',
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'Quand et où est né Karl Marx ?',
        eContentType.Text,
      ),
    ],
    [
      new MemcardContentObj(
        'Le 5 mai 1818 à Trèves, en Prusse',
        eContentType.Text,
        "Marx est né dans une famille d'origine juive convertie au protestantisme.",
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    "Une question sur l'œuvre principale de Marx.",
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        "Quel est le titre de l'ouvrage majeur de Karl Marx ?",
        eContentType.Text,
      ),
    ],
    [
      new MemcardContentObj(
        'Le Capital',
        eContentType.Text,
        'Le premier volume est paru en 1867, les suivants ont été publiés à titre posthume.',
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    'Avec qui Karl Marx a-t-il co-écrit le Manifeste du parti communiste ?',
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'Avec qui Karl Marx a-t-il co-écrit le Manifeste du parti communiste ?',
        eContentType.Text,
      ),
    ],
    [
      new MemcardContentObj(
        'Friedrich Engels',
        eContentType.Text,
        'Le Manifeste du parti communiste a été publié en 1848.',
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    "Une question sur la philosophie de l'histoire selon Marx.",
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        "Quelle théorie Karl Marx a-t-il développée concernant l'histoire ?",
        eContentType.Text,
      ),
    ],
    [
      new MemcardContentObj(
        "Marx considérait que l'histoire était mue par les conflits entre classes sociales.",
        eContentType.Text,
        "La lutte des classes comme moteur de l'histoire",
      ),
    ],
    0,
  ),
  new MemcardPrototype(
    "Une question sur l'exil de Marx.",
    eMemcardType.Classic,
    [
      new MemcardContentObj(
        'Où Karl Marx a-t-il passé la dernière partie de sa vie ?',
        eContentType.Text,
      ),
    ],
    [
      new MemcardContentObj(
        'À Londres',
        eContentType.Text,
        "Marx s'est exilé à Londres en 1849 et y est resté jusqu'à sa mort en 1883.",
      ),
    ],
    0,
  ),
];
