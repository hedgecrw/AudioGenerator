function playC4() { window.c4 = window.audioGenerator.startNote('defaultTrack', Note.C4); }
function playDb4() { window.d4b = window.audioGenerator.startNote('defaultTrack', Note.D4b); }
function playD4() { window.d4 = window.audioGenerator.startNote('defaultTrack', Note.D4); }
function playEb4() { window.e4b = window.audioGenerator.startNote('defaultTrack', Note.E4b); }
function playE4() { window.e4 = window.audioGenerator.startNote('defaultTrack', Note.E4); }
function playF4() { window.f4 = window.audioGenerator.startNote('defaultTrack', Note.F4); }
function playGb4() { window.g4b = window.audioGenerator.startNote('defaultTrack', Note.G4b); }
function playG4() { window.g4 = window.audioGenerator.startNote('defaultTrack', Note.G4); }
function playAb4() { window.a4b = window.audioGenerator.startNote('defaultTrack', Note.A4b); }
function playA4() { window.a4 = window.audioGenerator.startNote('defaultTrack', Note.A4); }
function playBb4() { window.b4b = window.audioGenerator.startNote('defaultTrack', Note.B4b); }
function playB4() { window.b4 = window.audioGenerator.startNote('defaultTrack', Note.B4); }
function playC5() { window.c5 = window.audioGenerator.startNote('defaultTrack', Note.C5); }

function releaseC4() { window.audioGenerator.stopNote('defaultTrack', window.c4); delete window.c4; }
function releaseDb4() { window.audioGenerator.stopNote('defaultTrack', window.d4b); delete window.d4b; }
function releaseD4() { window.audioGenerator.stopNote('defaultTrack', window.d4); delete window.d4; }
function releaseEb4() { window.audioGenerator.stopNote('defaultTrack', window.e4b); delete window.e4b; }
function releaseE4() { window.audioGenerator.stopNote('defaultTrack', window.e4); delete window.e4; }
function releaseF4() { window.audioGenerator.stopNote('defaultTrack', window.f4); delete window.f4; }
function releaseGb4() { window.audioGenerator.stopNote('defaultTrack', window.g4b); delete window.g4b; }
function releaseG4() { window.audioGenerator.stopNote('defaultTrack', window.g4); delete window.g4; }
function releaseAb4() { window.audioGenerator.stopNote('defaultTrack', window.a4b); delete window.a4b; }
function releaseA4() { window.audioGenerator.stopNote('defaultTrack', window.a4); delete window.a4; }
function releaseBb4() { window.audioGenerator.stopNote('defaultTrack', window.b4b); delete window.b4b; }
function releaseB4() { window.audioGenerator.stopNote('defaultTrack', window.b4); delete window.b4; }
function releaseC5() { window.audioGenerator.stopNote('defaultTrack', window.c5); delete window.c5; }

function pressNote(event) {
   if (!event.repeat) {
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
}

function releaseNote(event) {
   if (event.keyCode === 65) releaseC4();
   if (event.keyCode === 87) releaseDb4();
   if (event.keyCode === 83) releaseD4();
   if (event.keyCode === 69) releaseEb4();
   if (event.keyCode === 68) releaseE4();
   if (event.keyCode === 70) releaseF4();
   if (event.keyCode === 84) releaseGb4();
   if (event.keyCode === 71) releaseG4();
   if (event.keyCode === 89) releaseAb4();
   if (event.keyCode === 72) releaseA4();
   if (event.keyCode === 85) releaseBb4();
   if (event.keyCode === 74) releaseB4();
   if (event.keyCode === 75) releaseC5();
}

async function changeInstrument() {
   instrumentSelector = document.getElementById('instrument');
   const instrumentSelection = instrumentSelector.options[instrumentSelector.selectedIndex].value;
   if (instrumentSelector.selectedIndex > 0) {
      document.getElementById("status").textContent = 'Loading...';
      window.audioGenerator.start();
      const instrument = await window.audioGenerator.retrieveInstrument(instrumentSelection);
      window.audioGenerator.setTrackInstrument('defaultTrack', instrument);
      document.getElementById("piano").classList.remove("disabled");
      document.getElementById("status").textContent = 'Ready';
      console.log('Instrument loading complete!');
   }
}

window.addEventListener('keydown', pressNote);
window.addEventListener('keyup', releaseNote);

window.onload = (event) => {
   window.audioGenerator = new AudioGenerator();
   window.audioGenerator.createTrack('defaultTrack', null);
   instrumentSelector = document.getElementById('instrument');
   instrumentSelector.add(new Option('Choose an instrument'));
   window.audioGenerator.availableInstruments.forEach(d => instrumentSelector.add(new Option(d)));
};
