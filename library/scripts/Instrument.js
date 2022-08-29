import { NoteOrder, Note } from './Constants.js'

export class Instrument {
   #minNoteIndex = 0;
   #maxNoteIndex = 120;
   #noteAudioBuffers = [];

   constructor(path, minNote, maxNote) {
      this.pathBase = '';
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; ++i)
         if (scripts[i].src.includes('audioGenerator.js')) {
            this.pathBase = scripts[i].src.replace(/^https?:\/\/[a-z\:0-9.]+/, '').split('?')[0];
            this.pathBase = this.pathBase.split('/').slice(0, -1).join('/');
         }
      path = path[0] == '/' ? path.substr(1) : path;
      path = path.substr(-1) == '/' ? path : (path + '/');
      const path_components = path.slice(0, -1).split('/');
      for (let i = 0; i < path_components.length; ++i)
         path_components[i] = path_components[i].split(' ').map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(' ');
      this.path = this.pathBase + '/instruments/' + path;
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
      let numResourceDownloaders = 16;
      let noteIndex = this.#minNoteIndex;

      function runWorker(worker) {
         const thisNoteIndex = noteIndex;
         async function processResource(message) {
            if (noteIndex <= this.#maxNoteIndex)
               runWorker.bind(this)(worker);
            else {
               --numResourceDownloaders;
               worker.terminate();
            }
            this.#noteAudioBuffers[Note[NoteOrder[thisNoteIndex]]] = await audioContext.decodeAudioData(message.data);
         };
         worker.onmessage = processResource.bind(this);
         worker.postMessage(this.path + NoteOrder[noteIndex++] + '.wav');
      }

      for (let i = 0; i < numResourceDownloaders; ++i)
         runWorker.bind(this)(new Worker(this.pathBase + '/scripts/ResourceDownloader.js'));
      const resultPromise = resolve => { (numResourceDownloaders === 0) ? resolve(this) : setTimeout(() => resultPromise(resolve), 100); };
      return new Promise(resultPromise);
   }

   static async loadInstrument(audioContext, path, minNote, maxNote) {
      const instrument = new Instrument(path, minNote, maxNote);
      return instrument.load(audioContext);
   }

   getNote(audioContext, note) {
      return new AudioBufferSourceNode(audioContext, { buffer: this.#noteAudioBuffers[note] });
   }
}
