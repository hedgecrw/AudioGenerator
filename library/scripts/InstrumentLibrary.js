'use strict';

import { Instrument } from './Instrument.js';
import { InstrumentList } from '../instruments/InstrumentList.js';

function getAvailableInstruments() {
   return Object.keys(InstrumentList);
}

async function loadInstrument(audioContext, instrument) {
   const info = InstrumentList[instrument];
   return await Instrument.loadInstrument(audioContext, info.path, info.minNote, info.maxNote);
}

export { getAvailableInstruments, loadInstrument };
