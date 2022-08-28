'use strict';

const NoteOrder = ['C0', 'C0s', 'D0', 'D0s', 'E0', 'F0', 'F0s', 'G0', 'G0s', 'A0', 'A0s', 'B0',
                   'C1', 'C1s', 'D1', 'D1s', 'E1', 'F1', 'F1s', 'G1', 'G1s', 'A1', 'A1s', 'B1',
                   'C2', 'C2s', 'D2', 'D2s', 'E2', 'F2', 'F2s', 'G2', 'G2s', 'A2', 'A2s', 'B2',
                   'C3', 'C3s', 'D3', 'D3s', 'E3', 'F3', 'F3s', 'G3', 'G3s', 'A3', 'A3s', 'B3',
                   'C4', 'C4s', 'D4', 'D4s', 'E4', 'F4', 'F4s', 'G4', 'G4s', 'A4', 'A4s', 'B4',
                   'C5', 'C5s', 'D5', 'D5s', 'E5', 'F5', 'F5s', 'G5', 'G5s', 'A5', 'A5s', 'B5',
                   'C6', 'C6s', 'D6', 'D6s', 'E6', 'F6', 'F6s', 'G6', 'G6s', 'A6', 'A6s', 'B6',
                   'C7', 'C7s', 'D7', 'D7s', 'E7', 'F7', 'F7s', 'G7', 'G7s', 'A7', 'A7s', 'B7',
                   'C8', 'C8s', 'D8', 'D8s', 'E8', 'F8', 'F8s', 'G8', 'G8s', 'A8', 'A8s', 'B8',
                   'C9', 'C9s', 'D9', 'D9s', 'E9', 'F9', 'F9s', 'G9', 'G9s', 'A9', 'A9s', 'B9'];

const Note = {  'C0': 0,                'D0bb': 0,   'C0s': 1,                 'D0b': 1,    'D0': 2,   'C0ss': 2,   'E0bb': 2,
               'D0s': 3,    'E0b': 3,   'F0bb': 3,    'E0': 4,   'D0ss': 4,    'F0b': 4,    'F0': 5,    'E0s': 5,   'G0bb': 5,
               'F0s': 6,   'E0ss': 6,    'G0b': 6,    'G0': 7,   'F0ss': 7,   'A0bb': 7,   'G0s': 8,    'A0b': 8,
                'A0': 9,   'G0ss': 9,   'B0bb': 9,   'A0s': 10,   'B0b': 10,  'C1bb': 10,   'B0': 11,  'A0ss': 11,   'C1b': 11,
                'C1': 12,   'B0s': 12,  'D1bb': 12,  'C1s': 13,  'B0ss': 13,   'D1b': 13,   'D1': 14,  'C1ss': 14,  'E1bb': 14,
               'D1s': 15,   'E1b': 15,  'F1bb': 15,   'E1': 16,  'D1ss': 16,   'F1b': 16,   'F1': 17,   'E1s': 17,  'G1bb': 17,
               'F1s': 18,  'E1ss': 18,   'G1b': 18,   'G1': 19,  'F1ss': 19,  'A1bb': 19,  'G1s': 20,   'A1b': 20,
                'A1': 21,  'G1ss': 21,  'B1bb': 21,  'A1s': 22,   'B1b': 22,  'C2bb': 22,   'B1': 23,  'A1ss': 23,   'C2b': 23,
                'C2': 24,   'B1s': 24,  'D2bb': 24,  'C2s': 25,  'B1ss': 25,   'D2b': 25,   'D2': 26,  'C2ss': 26,  'E2bb': 26,
               'D2s': 27,   'E2b': 27,  'F2bb': 27,   'E2': 28,  'D2ss': 28,   'F2b': 28,   'F2': 29,   'E2s': 29,  'G2bb': 29,
               'F2s': 30,  'E2ss': 30,   'G2b': 30,   'G2': 31,  'F2ss': 31,  'A2bb': 31,  'G2s': 32,   'A2b': 32,
                'A2': 33,  'G2ss': 33,  'B2bb': 33,  'A2s': 34,   'B2b': 34,  'C3bb': 34,   'B2': 35,  'A2ss': 35,   'C3b': 35,
                'C3': 36,   'B2s': 36,  'D3bb': 36,  'C3s': 37,  'B2ss': 37,   'D3b': 37,   'D3': 38,  'C3ss': 38,  'E3bb': 38,
               'D3s': 39,   'E3b': 39,  'F3bb': 39,   'E3': 40,  'D3ss': 40,   'F3b': 40,   'F3': 41,   'E3s': 41,  'G3bb': 41,
               'F3s': 42,  'E3ss': 42,   'G3b': 42,   'G3': 43,  'F3ss': 43,  'A3bb': 43,  'G3s': 44,   'A3b': 44,
                'A3': 45,  'G3ss': 45,  'B3bb': 45,  'A3s': 46,   'B3b': 46,  'C4bb': 46,   'B3': 47,  'A3ss': 47,   'C4b': 47,
                'C4': 48,   'B3s': 48,  'D4bb': 48,  'C4s': 49,  'B3ss': 49,   'D4b': 49,   'D4': 50,  'C4ss': 50,  'E4bb': 50,
               'D4s': 51,   'E4b': 51,  'F4bb': 51,   'E4': 52,  'D4ss': 52,   'F4b': 52,   'F4': 53,   'E4s': 53,  'G4bb': 53,
               'F4s': 54,  'E4ss': 54,   'G4b': 54,   'G4': 55,  'F4ss': 55,  'A4bb': 55,  'G4s': 56,   'A4b': 56,
                'A4': 57,  'G4ss': 57,  'B4bb': 57,  'A4s': 58,   'B4b': 58,  'C5bb': 58,   'B4': 59,  'A4ss': 59,   'C5b': 59,
                'C5': 60,   'B4s': 60,  'D5bb': 60,  'C5s': 61,  'B4ss': 61,   'D5b': 61,   'D5': 62,  'C5ss': 62,  'E5bb': 62,
               'D5s': 63,   'E5b': 63,  'F5bb': 63,   'E5': 64,  'D5ss': 64,   'F5b': 64,   'F5': 65,   'E5s': 65,  'G5bb': 65,
               'F5s': 66,  'E5ss': 66,   'G5b': 66,   'G5': 67,  'F5ss': 67,  'A5bb': 67,  'G5s': 68,   'A5b': 68,
                'A5': 69,  'G5ss': 69,  'B5bb': 69,  'A5s': 70,   'B5b': 70,  'C6bb': 70,   'B5': 71,  'A5ss': 71,   'C6b': 71,
                'C6': 72,   'B5s': 72,  'D6bb': 72,  'C6s': 73,  'B5ss': 73,   'D6b': 73,   'D6': 74,  'C6ss': 74,  'E6bb': 74,
               'D6s': 75,   'E6b': 75,  'F6bb': 75,   'E6': 76,  'D6ss': 76,   'F6b': 76,   'F6': 77,   'E6s': 77,  'G6bb': 77,
               'F6s': 78,  'E6ss': 78,   'G6b': 78,   'G6': 79,  'F6ss': 79,  'A6bb': 79,  'G6s': 80,   'A6b': 80,
                'A6': 81,  'G6ss': 81,  'B6bb': 81,  'A6s': 82,   'B6b': 82,  'C7bb': 82,   'B6': 83,  'A6ss': 83,   'C7b': 83,
                'C7': 84,   'B6s': 84,  'D7bb': 84,  'C7s': 85,  'B6ss': 85,   'D7b': 85,   'D7': 86,  'C7ss': 86,  'E7bb': 86,
               'D7s': 87,   'E7b': 87,  'F7bb': 87,   'E7': 88,  'D7ss': 88,   'F7b': 88,   'F7': 89,   'E7s': 89,  'G7bb': 89,
               'F7s': 90,  'E7ss': 90,   'G7b': 90,   'G7': 91,  'F7ss': 91,  'A7bb': 91,  'G7s': 92,   'A7b': 92,
                'A7': 93,  'G7ss': 93,  'B7bb': 93,  'A7s': 94,   'B7b': 94,  'C8bb': 94,   'B7': 95,  'A7ss': 95,   'C8b': 95,
                'C8': 96,   'B7s': 96,  'D8bb': 96,  'C8s': 97,  'B7ss': 97,   'D8b': 97,   'D8': 98,  'C8ss': 98,  'E8bb': 98,
               'D8s': 99,   'E8b': 99,  'F8bb': 99,   'E8': 100, 'D8ss': 100,  'F8b': 100,  'F8': 101,  'E8s': 101, 'G8bb': 101,
               'F8s': 102, 'E8ss': 102,  'G8b': 102,  'G8': 103, 'F8ss': 103, 'A8bb': 103, 'G8s': 104,  'A8b': 104,
                'A8': 105, 'G8ss': 105, 'B8bb': 105, 'A8s': 106,  'B8b': 106, 'C9bb': 106,  'B8': 107, 'A8ss': 107,  'C9b': 107,
                'C9': 108,  'B8s': 108, 'D9bb': 108, 'C9s': 109, 'B8ss': 109,  'D9b': 109,  'D9': 110, 'C9ss': 110, 'E9bb': 110,
               'D9s': 111,  'E9b': 111, 'F9bb': 111,  'E9': 112, 'D9ss': 112,  'F9b': 112,  'F9': 113,  'E9s': 113, 'G9bb': 113,
               'F9s': 114, 'E9ss': 114,  'G9b': 114,  'G9': 115, 'F9ss': 115, 'A9bb': 115, 'G9s': 116,  'A9b': 116,
                'A9': 117, 'G9ss': 117, 'B9bb': 117, 'A9s': 118,  'B9b': 118,   'B9': 119,             'A9ss': 119 };

const Frequency = [  16.35,   17.32,   18.35,   19.45,    20.60,    21.83,    23.12,    24.50,    25.96,    27.50,    29.14,    30.87,
                     32.70,   34.65,   36.71,   38.89,    41.20,    43.65,    46.25,    49.00,    51.91,    55.00,    58.27,    61.74,
                     65.41,   69.30,   73.42,   77.78,    82.41,    87.31,    92.50,    98.00,   103.83,   110.00,   116.54,   123.47,
                    130.81,  138.59,  146.83,  155.56,   164.81,   174.61,   185.00,   196.00,   207.65,   220.00,   233.08,   246.94,
                    261.63,  277.18,  293.66,  311.13,   329.63,   349.23,   369.99,   392.00,   415.30,   440.00,   466.16,   493.88,
                    523.25,  554.37,  587.33,  622.25,   659.26,   698.46,   739.99,   783.99,   830.61,   880.00,   932.33,   987.77,
                   1046.50, 1108.73, 1174.66, 1244.51,  1318.51,  1396.91,  1479.98,  1567.98,  1661.22,  1760.00,  1864.66,  1975.53,
                   2093.00, 2217.46, 2349.32, 2489.02,  2637.02,  2793.83,  2959.96,  3135.96,  3322.44,  3520.00,  3729.31,  3951.07,
                   4186.01, 4434.92, 4698.64, 4978.03,  5274.04,  5587.65,  5919.91,  6271.93,  6644.88,  7040.00,  7458.62,  7902.13,
                   8372.02, 8869.84, 9397.27, 9956.06, 10548.08, 11175.30, 11839.82, 12534.86, 13289.75, 14080.00, 14917.24, 15804.26
];

const Duration = {         'Whole': 1.0,         'DottedWhole': 2.0 / 3.0,        'DottedDottedWhole': 4.0 / 7.0,
                            'Half': 2.0,          'DottedHalf': 4.0 / 3.0,         'DottedDottedHalf': 8.0 / 7.0,
                         'Quarter': 4.0,       'DottedQuarter': 8.0 / 3.0,      'DottedDottedQuarter': 16.0 / 7.0,
                          'Eighth': 8.0,       'DottedEighth': 16.0 / 3.0,       'DottedDottedEighth': 32.0 / 7.0,
                      'Sixteenth': 16.0,    'DottedSixteenth': 32.0 / 3.0,    'DottedDottedSixteenth': 64.0 / 7.0,
                   'ThirtySecond': 32.0, 'DottedThirtySecond': 64.0 / 3.0, 'DottedDottedThirtySecond': 128.0 / 7.0,
                    'SixtyFourth': 64.0, 'DottedSixtyFourth': 128.0 / 3.0,  'DottedDottedSixtyFourth': 256.0 / 7.0 };

export { NoteOrder, Note, Frequency, Duration };