import { NoteOrder, Note } from './Constants.js'

export class Instrument {
   #minNoteIndex = 0;
   #maxNoteIndex = 120;
   #noteAudioBuffers = [];

   constructor(path, minNote, maxNote) {
      let relativePath = '';
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; ++i)
         if (scripts[i].src.includes('audioGenerator.js')) {
            relativePath = scripts[i].src.replace(/^https?:\/\/[a-z\:0-9.]+/, '').split('?')[0];
            relativePath = relativePath.split('/').slice(0, -1).join('/');
         }
      path = path[0] == '/' ? path.substr(1) : path;
      path = path.substr(-1) == '/' ? path : (path + '/');
      const path_components = path.slice(0, -1).split('/');
      for (let i = 0; i < path_components.length; ++i)
         path_components[i] = path_components[i].split(' ').map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(' ');
      this.path = relativePath + '/instruments/' + path;
      this.type = path_components[0];
      this.subtype = (path_components.length == 3) ? path_components[1] : null;
      this.name = (path_components.length == 3) ? path_components[2] : path_components[1];
      this.#minNoteIndex = NoteOrder.findIndex((note) => note == minNote);
      this.#maxNoteIndex = NoteOrder.findIndex((note) => note == maxNote);
   }

   async #loadNoteSamples(audioContext, filePath) {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      return await audioContext.decodeAudioData(arrayBuffer);
   }

   async load(audioContext) {
      console.log('Loading instrument: ', this.name, '(' + ((this.subtype == null) ? '' : this.subtype + ' ') + this.type + ')...');
      for (let i = this.#minNoteIndex; i <= this.#maxNoteIndex; ++i)
         for (let tryIdx = 0; tryIdx < 3; ++tryIdx)
            try {
               let extension = ((tryIdx == 0) ? '.wav' : ((tryIdx == 1) ? '.mp3' : '.ogg'));
               this.#noteAudioBuffers[Note[NoteOrder[i]]] = await this.#loadNoteSamples(audioContext, this.path + NoteOrder[i] + extension);
               tryIdx = 3;
            } catch (error) {}
      console.log('Instrument loading complete!');
   }

   static async loadInstrument(audioContext, path, minNote, maxNote) {
      const instrument = new Instrument(path, minNote, maxNote);
      await instrument.load(audioContext);
      return instrument;
   }

   getNote(audioContext, note) {
      return new AudioBufferSourceNode(audioContext, { buffer: this.#noteAudioBuffers[note] });
   }
}
