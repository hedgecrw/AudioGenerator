import { Track } from './scripts/Track.js';
import { Duration, Note } from './scripts/Constants.js';
import { getAvailableInstruments, loadInstrument } from './scripts/InstrumentLibrary.js'

class AudioGenerator {
   #tracks = {};

   constructor() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.volumeControl = this.audioContext.createGain();
      this.compressor = this.audioContext.createDynamicsCompressor();
      this.volumeControl.connect(this.compressor).connect(this.audioContext.destination);
      this.measureLengthSeconds = (60 / 100) * 4;
      this.beatsPerMinute = 100;
      this.globalTime = 0.0;
      this.beatBase = 4;
      this.setGlobalVolume(0.5);
   }

   get availableInstruments() {
      return getAvailableInstruments();
   }

   async retrieveInstrument(instrument) {
      return await loadInstrument(this.audioContext, instrument);
   }

   createTrack(track, instrument) {
      this.#tracks[track] = new Track(this.audioContext, instrument, this.volumeControl);
   }

   setTrackInstrument(track, instrument) {
      this.#tracks[track].changeInstrument(instrument);
   }

   setGlobalVolume(volume) {
      this.volumeControl.gain.setValueAtTime(volume, 0);
   }

   setTrackVolume(track, volume) {
      this.#tracks[track].setVolume(volume);
   }

   setTempo(timeSigNumerator, timeSigDenominator, beatBase, beatsPerMinute) {
      this.measureLengthSeconds = (60 / beatsPerMinute) * beatBase * timeSigNumerator / timeSigDenominator;
      this.beatsPerMinute = beatsPerMinute;
      this.beatBase = beatBase;
   }

   #getNoteLength(duration) {
      return 60.0 / ((duration / this.beatBase) * this.beatsPerMinute);
   }

   playNotes(track, notes, durations, immediate) {
      let minimumDuration = 1000.0;
      if (immediate)
         this.globalTime = this.audioContext.currentTime;
      for (let i = 0; i < notes.length; ++i) {
         const duration = this.#getNoteLength(durations[i]);
         this.#tracks[track].playNote(notes[i], duration, this.globalTime);
         if (duration < minimumDuration)
            minimumDuration = duration;
      }
      this.globalTime += minimumDuration;
   }

   startNote(track, note) {
      return this.#tracks[track].playNoteAsync(note);
   }

   stopNote(track, noteDescriptor) {
      this.#tracks[track].stopNoteAsync(noteDescriptor, true);
   }

   start() {
      this.audioContext.resume();
   }

   stop() {
   }
}

window.Note = Note;
window.Duration = Duration;
window.AudioGenerator = AudioGenerator;
