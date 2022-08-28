'use strict';

class Track {

   constructor(audioContext, instrument, audioSink) {
      this.instrument = instrument;
      this.audioContext = audioContext;
      this.volumeControl = this.audioContext.createGain();
      this.volumeControl.connect(audioSink);
      this.setVolume(1.0);
   }

   setVolume(volume) {
      this.volumeControl.gain.setValueAtTime(volume, 0);
   }

   changeInstrument(instrument) {
      this.instrument = instrument;
   }

   playNote(note, durationSeconds, startTime) {
      const noteSource = this.instrument.getNote(this.audioContext, note);
      const noteVolume = this.audioContext.createGain();
      noteSource.connect(noteVolume).connect(this.volumeControl);
      noteVolume.gain.setValueAtTime(1.0, 0);
      noteVolume.gain.linearRampToValueAtTime(0.0, startTime + durationSeconds);
      noteSource.onended = function() { noteVolume.disconnect(); };
      noteSource.start(startTime);
      noteSource.stop(startTime + durationSeconds);
   }
}

export { Track };
