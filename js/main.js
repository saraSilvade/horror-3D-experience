window.addEventListener("DOMContentLoaded", () => {
  const doorTrigger = document.querySelector("#doorTrigger");
  const scareLight = document.querySelector("#scare-light");
  const playerRig = document.querySelector("#rig");

  function triggerHaunting() {
    // Wait 4 seconds after entering, then blink a scary light
    setTimeout(() => {
      scareLight.setAttribute("intensity", "3");

      // Make it flash off after 1 second
      setTimeout(() => {
        scareLight.setAttribute("intensity", "0");
      }, 1000);
    }, 4000);
  }
});
