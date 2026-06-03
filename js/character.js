window.addEventListener('DOMContentLoaded', () => {
  console.log("Character.js audio-chain system online.");

  const inside = document.querySelector('#inside-world');
  const phantom = document.querySelector('#corridor-phantom');
  const playerRig = document.querySelector('#rig');

  let cryTimeout = null; 
  let doorTimeout = null;
  let ghostTimeout = null;
  let sequenceStarted = false;

  // Safety function: Ensures player is physically inside the corridor zone
  function isPlayerPhysicallyInside() {
    if (!playerRig) return false;
    const playerPos = playerRig.getAttribute('position');
    if (!playerPos) return false;
    return playerPos.z < 2; // Returns true if inside the house structure
  }

  function playAudioElement(selector, volume = 0.8) {
    if (!isPlayerPhysicallyInside()) return;
    const audio = document.querySelector(selector);
    if (audio) {
      try {
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch((err) => console.log(`${selector} play blocked:`, err));
        console.log(`Playing audio: ${selector}`);
      } catch (err) {
        console.log(`Error playing ${selector}:`, err);
      }
    }
  }

  function revealGhost() {
    if (!phantom || !isPlayerPhysicallyInside()) return;
    
    phantom.setAttribute('visible', 'true');
    phantom.setAttribute('animation__reveal', 'property: scale; from: 0.1 0.1 0.1; to: 3 3 3; dur: 1800; easing: easeOutQuad');
    
    console.log('JUMPSCARE: Ghost expanded into the corridor.');
  }

  function startHorrorSequence() {
    if (sequenceStarted || !isPlayerPhysicallyInside()) return;
    sequenceStarted = true;

    console.log("Player inside! Initialized horror sequence timeline...");

    // Wait 4 seconds  after entering, THEN play the crying sound
    cryTimeout = setTimeout(() => {
      console.log("3 seconds of silence over. Playing crying sound...");
      playAudioElement('#crySound', 0.9);

      //  Wait 2 seconds after the crying starts, then creak the door open
      doorTimeout = setTimeout(() => {
        console.log("10 seconds of crying finished. Triggering door creak...");
        playAudioElement('#doorOpenSound', 0.8);

        // Exactly 4 seconds after the door creaks, launch the ghost
        ghostTimeout = setTimeout(() => {
          console.log("3 seconds of creaking finished. Executing ghost jumpscare!");
          revealGhost();
        }, 4000);

      }, 20000); 

    }, 4000); 
  }

  function cancelHorrorSequence() {
    if (cryTimeout) clearTimeout(cryTimeout);
    if (doorTimeout) clearTimeout(doorTimeout);
    if (ghostTimeout) clearTimeout(ghostTimeout);
    sequenceStarted = false;
    console.log('Sequence cleared. Safety lock re-engaged.');
  }

  // Constantly monitor player tracking coordinates to manage the scene loop safely
  setInterval(() => {
    const insideVisible = inside && (inside.getAttribute('visible') === 'true' || inside.getAttribute('visible') === true);
    
    if (insideVisible && isPlayerPhysicallyInside()) {
      if (!sequenceStarted) {
        startHorrorSequence();
      }
    } else {
      if (sequenceStarted) {
        cancelHorrorSequence();
      }
    }
  }, 500);
});