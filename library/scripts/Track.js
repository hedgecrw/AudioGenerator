export class Track {
   #scheduledNotes = [];
   #asyncNotes = [];

   constructor(audioContext, name, instrument, audioSink) {
      this.trackName = name;
      this.instrument = instrument;
      this.audioContext = audioContext;
      this.volumeControl = this.audioContext.createGain();
      this.volumeControl.connect(audioSink);
      this.setVolume(1.0);
   }

   setVolume(volume) {
      this.volumeControl.gain.setValueAtTime(volume, 0.0);
   }

   changeInstrument(instrument) {
      this.instrument = instrument;
   }

   playNote(note, durationSeconds, startTime) {
      const noteSource = this.instrument.getNote(this.audioContext, note);
      const noteVolume = this.audioContext.createGain();
      noteSource.connect(noteVolume).connect(this.volumeControl);
      noteVolume.gain.setValueAtTime(1.0, 0.0);
      noteVolume.gain.setTargetAtTime(0.0, startTime + durationSeconds - 0.1, 0.1);
      noteSource.onended = this.#noteEnded.bind(this, noteSource, noteVolume);
      this.#scheduledNotes.push(noteSource);
      noteSource.start(startTime);
      noteSource.stop(startTime + durationSeconds + 0.2);
   }

   playNoteAsync(note, startTime) {
      const noteSource = this.instrument.getNote(this.audioContext, note);
      const noteVolume = this.audioContext.createGain();
      noteSource.connect(noteVolume).connect(this.volumeControl);
      noteVolume.gain.setValueAtTime(1.0, 0.0);
      noteVolume.gain.setTargetAtTime(0.0, startTime + 5.0, 0.1);
      noteSource.onended = this.stopNoteAsync.bind(this, noteVolume, false);
      this.#asyncNotes.push(noteVolume);
      noteSource.start(startTime);
      noteSource.stop(startTime + 5.0);
      return noteVolume;
   }

   stopNoteAsync(note, stoppedEarly) {
      const noteIndex = this.#asyncNotes.indexOf(note);
      if (noteIndex >= 0) {
         if (stoppedEarly)
            this.#asyncNotes[noteIndex].gain.setTargetAtTime(0.0, this.audioContext.currentTime, 0.1);
         else {
            this.#asyncNotes[noteIndex].disconnect();
            this.#asyncNotes.splice(noteIndex, 1);
         }
      }
   }

   #noteEnded(note, volume) {
      this.#scheduledNotes.splice(this.#scheduledNotes.indexOf(note), 1);
      volume.disconnect();
      if (this.#scheduledNotes.length === 0)
         window.dispatchEvent(new CustomEvent('trackdone', { detail: this.trackName }));
   }

   stop() {
      for (const volume of this.#asyncNotes)
         volume.gain.setValueAtTime(0.0, 0.0);
      for (const note of this.#scheduledNotes)
         note.stop(0.0);
   }
}
