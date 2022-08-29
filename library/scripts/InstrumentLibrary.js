import { Instrument } from './Instrument.js';
import { InstrumentList } from '../instruments/InstrumentList.js';

export function getAvailableInstruments() {
   return Object.keys(InstrumentList);
}

export async function loadInstrument(audioContext, instrument) {
   const info = InstrumentList[instrument];
   return await Instrument.loadInstrument(audioContext, info.path, info.minNote, info.maxNote);
}
