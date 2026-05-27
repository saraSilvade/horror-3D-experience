window.addEventListener('DOMContentLoaded', () => {
  const doorTrigger = document.querySelector('#door-trigger');
  const scareLight = document.querySelector('#scare-light');
  const playerRig = document.querySelector('#rig');

  // Listen for the user to click the invisible door box
  doorTrigger.addEventListener('click', () => {
    console.log("Door clicked! Moving inside...");

    // 1. Teleport the player inside the house coordinates
    // You will need to tweak these numbers based on where the inside of your model is!
    playerRig.setAttribute('position', '0 0 -3');

    // 2. Start the haunting events inside the house
    triggerHaunting();
  });

  function triggerHaunting() {
    // Wait 4 seconds after entering, then blink a scary light
    setTimeout(() => {
      scareLight.setAttribute('intensity', '3');
      
      // Make it flash off after 1 second
      setTimeout(() => {
        scareLight.setAttribute('intensity', '0');
      }, 1000);
    }, 4000);
  }
});