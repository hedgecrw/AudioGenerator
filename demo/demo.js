function playC4() { window.audioGenerator.playNotes('default', [Note.C4], [Duration.Quarter], true); }
function playDb4() { window.audioGenerator.playNotes('default', [Note.D4b], [Duration.Quarter], true); }
function playD4() { window.audioGenerator.playNotes('default', [Note.D4], [Duration.Quarter], true); }
function playEb4() { window.audioGenerator.playNotes('default', [Note.E4b], [Duration.Quarter], true); }
function playE4() { window.audioGenerator.playNotes('default', [Note.E4], [Duration.Quarter], true); }
function playF4() { window.audioGenerator.playNotes('default', [Note.F4], [Duration.Quarter], true); }
function playGb4() { window.audioGenerator.playNotes('default', [Note.G4b], [Duration.Quarter], true); }
function playG4() { window.audioGenerator.playNotes('default', [Note.G4], [Duration.Quarter], true); }
function playAb4() { window.audioGenerator.playNotes('default', [Note.A4b], [Duration.Quarter], true); }
function playA4() { window.audioGenerator.playNotes('default', [Note.A4], [Duration.Quarter], true); }
function playBb4() { window.audioGenerator.playNotes('default', [Note.B4b], [Duration.Quarter], true); }
function playB4() { window.audioGenerator.playNotes('default', [Note.B4], [Duration.Quarter], true); }
function playC5() { window.audioGenerator.playNotes('default', [Note.C5], [Duration.Quarter], true); }

function playNote(event) {
   if (event.keyCode === 65) playC4();
   if (event.keyCode === 87) playDb4();
   if (event.keyCode === 83) playD4();
   if (event.keyCode === 69) playEb4();
   if (event.keyCode === 68) playE4();
   if (event.keyCode === 70) playF4();
   if (event.keyCode === 84) playGb4();
   if (event.keyCode === 71) playG4();
   if (event.keyCode === 89) playAb4();
   if (event.keyCode === 72) playA4();
   if (event.keyCode === 85) playBb4();
   if (event.keyCode === 74) playB4();
   if (event.keyCode === 75) playC5();
}

async function changeInstrument() {
   instrumentSelector = document.getElementById('instrument');
   const instrumentSelection = instrumentSelector.options[instrumentSelector.selectedIndex].value;
   if (instrumentSelector.selectedIndex > 0) {
      document.getElementById("status").textContent = 'Loading...';
      window.audioGenerator.start();
      const instrument = await window.audioGenerator.retrieveInstrument(instrumentSelection);
      window.audioGenerator.setTrackInstrument('default', instrument);
      document.getElementById("piano").classList.remove("disabled");
      document.getElementById("status").textContent = 'Ready';
   }
}

window.addEventListener('keydown', playNote);

window.onload = (event) => {
   window.audioGenerator = new AudioGenerator();
   window.audioGenerator.createTrack('default', null);
   instrumentSelector = document.getElementById('instrument');
   instrumentSelector.add(new Option('Choose an instrument'));
   window.audioGenerator.availableInstruments.forEach(d => instrumentSelector.add(new Option(d)));
};
