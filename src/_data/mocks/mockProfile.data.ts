// export const MockProfileData: iProfile[] = [
//   {
//     id: 1,
//     name: 'Bernard',
//     nextSession: 188875,
//     themes: [
//       {
//         id: 1,
//         name: 'Mathématiques',
//         cardFW: [101, 102, 103],
//         cards: [
//           {
//             id: '101',
//             valLevel: 3,
//             lastValidationDate: 1708400000000,
//             nextValidationDate: 1709000000000,
//             recto: ['Quelle est la racine carrée de 64 ?'],
//             verso: ['8'],
//           },
//           {
//             id: '102',
//             valLevel: 1,
//             lastValidationDate: 1707000000000,
//             nextValidationDate: 1707500000000,
//             recto: ['Combien font 7 × 8 ?'],
//             verso: ['56'],
//           },
//         ],
//       },
//       {
//         id: 2,
//         name: 'Histoire',
//         cardFW: [201, 202],
//         cards: [
//           {
//             id: '201',
//             valLevel: 2,
//             lastValidationDate: 1706000000000,
//             nextValidationDate: 1706500000000,
//             recto: ['En quelle année a eu lieu la Révolution française ?'],
//             verso: ['1789'],
//           },
//           {
//             id: '202',
//             valLevel: 4,
//             lastValidationDate: 1708000000000,
//             nextValidationDate: 1708600000000,
//             recto: [
//               'Quel événement a marqué la fin du Moyen Âge ?',
//               {
//                 path: 'battle_hastings.jpg',
//                 mediaType: 'img',
//                 description: 'Bataille de Hastings',
//               },
//             ],
//             verso: ['La chute de Constantinople en 1453'],
//           },
//         ],
//       },
//       {
//         id: 0,
//         name: 'No Thèmes',
//         cardFW: [201, 202],
//         cards: [
//           {
//             id: '201',
//             valLevel: 2,
//             lastValidationDate: 1706000000000,
//             nextValidationDate: 1706500000000,
//             recto: ['En quelle année a eu lieu la Révolution française ?'],
//             verso: ['1789'],
//           },
//         ],
//       },
//     ],
//     statistics: {
//       runsDone: 15,
//       scoreAllTime: 150,
//       scoreNow: 55,
//     },
//   },
//   {
//     id: 2,
//     name: 'Sophie',
//     nextSession: 188900,
//     themes: [
//       {
//         id: 3,
//         name: 'Sciences',
//         cardFW: [301, 302],
//         cards: [
//           {
//             id: '301',
//             valLevel: 2,
//             lastValidationDate: 1707500000000,
//             nextValidationDate: 1708100000000,
//             recto: ["Quelle est la formule chimique de l'eau ?"],
//             verso: ['H₂O'],
//           },
//           {
//             id: '302',
//             valLevel: 1,
//             lastValidationDate: 1707200000000,
//             nextValidationDate: 1707800000000,
//             recto: [
//               "À quelle température l'eau bout-elle au niveau de la mer ?",
//             ],
//             verso: ['100°C'],
//           },
//         ],
//       },
//       {
//         id: 4,
//         name: 'Littérature',
//         cardFW: [401, 402],
//         cards: [
//           {
//             id: '401',
//             valLevel: 3,
//             lastValidationDate: 1708000000000,
//             nextValidationDate: 1708600000000,
//             recto: ['Qui a écrit *Les Misérables* ?'],
//             verso: ['Victor Hugo'],
//           },
//           {
//             id: '402',
//             valLevel: 4,
//             lastValidationDate: 1708500000000,
//             nextValidationDate: 1709100000000,
//             recto: [
//               '*Roméo et Juliette* est une œuvre de quel auteur ?',
//               {
//                 path: 'shakespeare_portrait.jpg',
//                 mediaType: 'img',
//                 description: 'Portrait de William Shakespeare',
//               },
//             ],
//             verso: ['William Shakespeare'],
//           },
//         ],
//       },
//     ],
//     statistics: {
//       runsDone: 20,
//       scoreAllTime: 200,
//       scoreNow: 80,
//     },
//   },
// ];

import {
  eContentType,
  eMemcardStatus,
  eMemcardType,
} from 'src/_models/enums/app.enums';
import { MemcardContentObj, MemcardObj } from 'src/_models/memcard.model';

export const _MOCK_Memcard = new MemcardObj(
  '1',
  'What is the capital of France?',
  eMemcardType.Classic,
  [
    new MemcardContentObj(
      'What is the capital of France?',
      eContentType.Text,
      'A simple geography question.',
    ),
  ],
  [new MemcardContentObj('Paris', eContentType.Text, 'The capital of France.')],
  3,
  [
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 3,
      date: '2025-03-22T00:00:00.000+01:00',
    },
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 2,
      date: '2025-03-18T00:00:00.000+01:00',
    },
    {
      statusAt: eMemcardStatus.NotValidated,
      valLevel: 1,
      date: '2025-03-16T00:00:00.000+01:00',
    },
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 2,

      date: '2025-03-12T00:00:00.000+01:00',
    },
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 1,
      date: '2025-03-10T00:00:00.000+01:00',
    },
    {
      statusAt: eMemcardStatus.Creation,
      valLevel: 0,
      date: '2025-03-10T00:00:00.000+01:00',
    },
  ],
);

const exampleMemorycard2 = new MemcardObj(
  '2',
  'What is the largest planet in our solar system?',
  eMemcardType.Classic,

  [
    new MemcardContentObj(
      'What is the largest planet in our solar system?',
      eContentType.Text,
      'A simple astronomy question.',
    ),
  ],
  [
    new MemcardContentObj(
      'Jupiter',
      eContentType.Text,
      'The largest planet in our solar system.',
    ),
  ],
  2,
  [
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 2,
      date: '2025-07-20',
    },
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 1,
      date: '2025-07-15',
    },
    {
      statusAt: eMemcardStatus.NotValidated,
      valLevel: 0,
      date: '2025-07-10',
    },
  ],
  {
    validationTotal: 3,
    devaluationTotal: 1,
    maxLevelReached: 2,
    totalPoints: 100,
  },
);

const exampleMemorycard3 = new MemcardObj(
  '3',
  'Who wrote "Romeo and Juliet"?',
  eMemcardType.Classic,
  [
    new MemcardContentObj(
      'Who wrote "Romeo and Juliet"?',
      eContentType.Text,
      'A literature question.',
    ),
  ],
  [
    new MemcardContentObj(
      'William Shakespeare',
      eContentType.Text,
      'Famous playwright.',
    ),
  ],
  4,
  [
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 4,

      date: '2025-06-25',
    },
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 3,

      date: '2025-06-20',
    },
    {
      statusAt: eMemcardStatus.Validated,
      valLevel: 2,

      date: '2025-06-15',
    },
  ],
  {
    validationTotal: 5,
    devaluationTotal: 0,
    maxLevelReached: 4,
    totalPoints: 150,
  },
);
