import { Instrument } from './Instrument.js';

const instrumentList = {
   'Grand Piano': 'instruments/piano/grand_piano.inst',
   'Electric Bass': 'instruments/bass/electric_bass.inst',
   'Bassoon': 'instruments/bassoon/bassoon.inst',
   'Cello': 'instruments/cello/cello.inst',
   'Acoustic Guitar': 'instruments/guitar/acoustic_guitar.inst',
   'Electric Guitar': 'instruments/guitar/electric_guitar.inst',
   'Nylon Guitar': 'instruments/guitar/nylon_guitar.inst',
   'Harp': 'instruments/harp/harp.inst',
   'Pipe Organ': 'instruments/organ/pipe_organ.inst',
   'Violin': 'instruments/violin/violin.inst'
}

export function getAvailableInstruments() { return Object.keys(instrumentList); }
export async function loadInstrument(audioContext, instrument) { return Instrument.loadInstrument(audioContext, instrument, instrumentList[instrument]); }
