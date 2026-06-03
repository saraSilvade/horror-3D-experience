window.addEventListener("DOMContentLoaded", () => {
  const windSound = document.querySelector("#windSound");
  const player = document.querySelector("#rig");
  const trigger = document.querySelector("#doorTrigger");
  const doorPivot = document.querySelector("#doorPivot");
  const doorSound = document.querySelector("#doorSound");
  const rightHand = document.querySelector("#rightHand");

  let ambienceStarted = false;
  let nearDoor = false;
  let isOpen = false;

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
      doorSound.play().catch(() => {});
    }

    if (isOpen && window.enterHouse) {
      setTimeout(() => window.enterHouse(), 800);
    }
  }

  function vrOpenDoor() {
    if (nearDoor) toggleDoor();
  }

  // ✅ VR CONTROLLER (SAFE)
  if (rightHand) {
    rightHand.addEventListener("triggerdown", vrOpenDoor);
    rightHand.addEventListener("gripdown", vrOpenDoor);
    rightHand.addEventListener("abuttondown", vrOpenDoor);

    console.log("VR controller connected");
  }

  // distance check
  setInterval(() => {
    if (!player || !trigger) return;

    const d = player.object3D.position.distanceTo(trigger.object3D.position);
    nearDoor = d < 7;
  }, 100);

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (e.code === "KeyE" && nearDoor) {
      toggleDoor();
    }
  });

  // ambience
  function startAmbience() {
    if (ambienceStarted) return;
    windSound?.play().then(() => (ambienceStarted = true));
  }

  document.addEventListener("click", startAmbience);
  document.addEventListener("keydown", startAmbience);
});

console.log("door.js loaded");
