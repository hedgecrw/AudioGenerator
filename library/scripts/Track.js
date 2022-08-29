'use strict';

class Track {
   #asyncNotes = {};

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

   playNoteAsync(note) {
      const startTime = this.audioContext.currentTime;
      const noteID = note.toString() + Math.floor(Math.random() * 100000000).toString();
      const noteSource = this.instrument.getNote(this.audioContext, note);
      this.#asyncNotes[noteID] = this.audioContext.createGain();
      noteSource.connect(this.#asyncNotes[noteID]).connect(this.volumeControl);
      this.#asyncNotes[noteID].gain.setValueAtTime(1.0, 0);
      this.#asyncNotes[noteID].gain.setTargetAtTime(0.0, startTime + 5.0, 0.1);
      noteSource.onended = this.stopNoteAsync.bind(this, noteID, false);
      noteSource.start(startTime);
      noteSource.stop(startTime + 5.0);
      return noteID;
   }

   stopNoteAsync(noteID, stoppedEarly) {
      if (this.#asyncNotes.hasOwnProperty(noteID)) {
         if (stoppedEarly)
            this.#asyncNotes[noteID].gain.setTargetAtTime(0.0, this.audioContext.currentTime, 0.1);
         else {
            this.#asyncNotes[noteID].disconnect();
            delete this.#asyncNotes[noteID];
         }
      }
   }
}

export { Track };
