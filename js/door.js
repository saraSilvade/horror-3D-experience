// window.addEventListener("DOMContentLoaded", () => {
//   const windSound = document.querySelector("#windSound");
//   const player = document.querySelector("#rig");
//   const trigger = document.querySelector("#doorTrigger");
//   const doorPivot = document.querySelector("#doorPivot");
//   const doorSound = document.querySelector("#doorSound");

//   const rightHand = document.querySelector("#rightHand");

//   let ambienceStarted = false;
//   let nearDoor = false;
//   let isOpen = false;

//   function vrOpenDoor() {
//     if (nearDoor) {
//       toggleDoor();
//     }
//   }

//   if (rightHand) {
//     rightHand.addEventListener("triggerdown", vrOpenDoor);

//     rightHand.addEventListener("gripdown", vrOpenDoor);
//   }

//   function checkDistance() {
//     if (!player || !trigger) return;

//     const playerPos = player.object3D.position;
//     const triggerPos = trigger.object3D.position;

//     const distance = playerPos.distanceTo(triggerPos);

//     nearDoor = distance < 7;

//     console.log("distance:", distance);
//   }

//   setInterval(checkDistance, 100);

//   function startAmbience() {
//     if (ambienceStarted) return;

//     windSound.volume = 0.4;

//     windSound
//       .play()
//       .then(() => {
//         console.log("Ambience started");
//         ambienceStarted = true;
//       })
//       .catch((err) => console.log(err));
//   }

//   document.addEventListener("click", startAmbience);

//   document.addEventListener("keydown", startAmbience);

//   document.addEventListener("keydown", (e) => {
//     console.log("KEY:", e.key);

//     if (e.code === "KeyE" && nearDoor) {
//       console.log("OPENING");

//       toggleDoor();
//     }
//   });

//   function toggleDoor() {
//     isOpen = !isOpen;

//     doorPivot.setAttribute("animation", {
//       property: "rotation",
//       to: isOpen ? "0 90 0" : "0 0 0",
//       dur: 800,
//       easing: "easeOutQuad",
//     });

//     if (doorSound) {
//       doorSound.currentTime = 0;

//       doorSound
//         .play()
//         .then(() => console.log("door sound"))
//         .catch((err) => console.log(err));
//     }

//     if (isOpen && window.enterHouse) {
//       setTimeout(() => {
//         window.enterHouse();
//       }, 800);
//     }

//     console.log(isOpen ? "Door Opened" : "Door Closed");
//   }
// });

// console.log("door.js loaded");

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
