window.enterHouse = function () {
  console.log("ENTERING HOUSE...");

  const rig = document.querySelector("#rig");

  const inside = document.querySelector("#inside-env");
  const outside = document.querySelector("#haunted-house");

  const windSound = document.querySelector("#windSound");
  const insideSound = document.querySelector("#insideSound");

  rig.setAttribute("position", "0 0 -3");

  outside.setAttribute("visible", "false");
  inside.setAttribute("visible", "true");

  windSound.pause();
  insideSound.volume = 0.5;

  insideSound.play().catch(() => {});

  setTimeout(() => {
    const scareLight = document.querySelector("#scare-light");
    scareLight.setAttribute("intensity", "3");

    setTimeout(() => {
      scareLight.setAttribute("intensity", "0");
    }, 800);
  }, 500);
};
