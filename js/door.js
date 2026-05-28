window.addEventListener("DOMContentLoaded", () => {
  const windSound = document.querySelector("#windSound");
  const player = document.querySelector("#rig");
  const trigger = document.querySelector("#doorTrigger");
  const doorPivot = document.querySelector("#doorPivot");
  const doorSound = document.querySelector("#doorSound");

  let ambienceStarted = false;
  let nearDoor = false;
  let isOpen = false;

  function checkDistance() {
    if (!player || !trigger) return;

    const playerPos = player.object3D.position;
    const triggerPos = trigger.object3D.position;

    const distance = playerPos.distanceTo(triggerPos);

    nearDoor = distance < 7;

    console.log("distance:", distance);
  }

  setInterval(checkDistance, 100);

  function startAmbience() {
    if (ambienceStarted) return;

    windSound.volume = 0.4;

    windSound
      .play()
      .then(() => {
        console.log("Ambience started");
        ambienceStarted = true;
      })
      .catch((err) => console.log(err));
  }

  document.addEventListener("click", startAmbience);

  document.addEventListener("keydown", startAmbience);

  document.addEventListener("keydown", (e) => {
    console.log("KEY:", e.key);

    if (e.code === "KeyE" && nearDoor) {
      console.log("OPENING");

      toggleDoor();
    }
  });

  function toggleDoor() {
    isOpen = !isOpen;

    doorPivot.setAttribute("animation", {
      property: "rotation",
      to: isOpen ? "0 90 0" : "0 0 0",
      dur: 800,
      easing: "easeOutQuad",
    });

    if (doorSound) {
      doorSound.currentTime = 0;

      doorSound
        .play()
        .then(() => console.log("door sound"))
        .catch((err) => console.log(err));
    }

    if (isOpen && window.enterHouse) {
      setTimeout(() => {
        window.enterHouse();
      }, 800);
    }

    console.log(isOpen ? "Door Opened" : "Door Closed");
  }
});

console.log("door.js loaded");
