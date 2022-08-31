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
      return loadInstrument(this.audioContext, instrument);
   }

   createTrack(track, instrument) {
      this.#tracks[track] = new Track(this.audioContext, track, instrument, this.volumeControl);
   }

   setTrackInstrument(track, instrument) {
      this.#tracks[track].changeInstrument(instrument);
   }

   setGlobalVolume(volume) {
      this.globalVolume = volume;
      this.volumeControl.gain.setTargetAtTime(volume, this.audioContext.currentTime, 0.01);
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

   playNotes(track, notes, durations) {
      let minimumDuration = 1000.0;
      if (this.audioContext.currentTime > this.globalTime)
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
      return this.#tracks[track].playNoteAsync(note, this.audioContext.currentTime);
   }

   stopNote(track, note) {
      this.#tracks[track].stopNoteAsync(note, true);
   }

   start() {
      this.volumeControl.gain.setTargetAtTime(this.globalVolume, this.audioContext.currentTime, 0.02);
      this.audioContext.resume();
   }

   pause() {
      this.volumeControl.gain.setTargetAtTime(0.0, this.audioContext.currentTime, 0.01);
      setTimeout((function() { this.audioContext.suspend(); }).bind(this), 60);
   }

   stop() {
      this.volumeControl.gain.setTargetAtTime(0.0, this.audioContext.currentTime, 0.01);
      setTimeout((function() {
         this.audioContext.suspend();
         for (const track in this.#tracks)
            this.#tracks[track].stop();
         this.audioContext.resume();
         this.volumeControl.gain.setValueAtTime(this.globalVolume, 0.0);
      }).bind(this), 60);
      this.globalTime = 0.0;
   }
}

window.Note = Note;
window.Duration = Duration;
window.AudioGenerator = AudioGenerator;
