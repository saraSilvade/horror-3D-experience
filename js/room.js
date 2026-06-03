// window.addEventListener("DOMContentLoaded", () => {
//   const rig = document.querySelector("#rig");
//   const bathroomDoor = document.querySelector("#bathroomDoor");

//   let nearBathroomDoor = false;

//   function checkBathroomDistance() {
//     const playerPos = rig.object3D.position;
//     const doorPos = bathroomDoor.object3D.position;

//     const distance = playerPos.distanceTo(doorPos);

//     nearBathroomDoor = distance < 20;
//     console.log(distance);
//   }

//   setInterval(checkBathroomDistance, 100);

//   document.addEventListener("keydown", (e) => {
//     console.log("KEY:", e.code);

//     if (e.code === "KeyE") {
//       console.log("E DETECTED");
//     }

//     if (e.code === "KeyE" && nearBathroomDoor) {
//       console.log("ENTERING BATHROOM");
//       enterBathroom();
//     }
//   });
// });

// function enterBathroom() {
//   const rig = document.querySelector("#rig");

//   const corridor = document.querySelector("#inside-world");
//   const bathroom = document.querySelector("#bathroom-world");

//   const spawn = document.querySelector("#bathroom-spawn");

//   corridor.setAttribute("visible", "false");
//   bathroom.setAttribute("visible", "true");

//   setTimeout(() => {
//     const pos = spawn.object3D.getWorldPosition(new THREE.Vector3());

//     rig.object3D.position.copy(pos);
//   }, 100);
// }

window.addEventListener("DOMContentLoaded", () => {
  const rig = document.querySelector("#rig");
  const bathroomDoor = document.querySelector("#bathroomDoor");
  const rightHand = document.querySelector("#rightHand");

  let nearBathroomDoor = false;

  function checkBathroomDistance() {
    if (!rig || !bathroomDoor) return;

    const playerPos = rig.object3D.position;
    const doorPos = bathroomDoor.object3D.position;

    const distance = playerPos.distanceTo(doorPos);

    nearBathroomDoor = distance < 20;
  }

  setInterval(checkBathroomDistance, 100);

  function tryBathroomDoor() {
    if (nearBathroomDoor) {
      console.log("ENTERING BATHROOM");
      enterBathroom();
    }
  }

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.code === "KeyE") {
      tryBathroomDoor();
    }
  });

  // VR Controller
  if (rightHand) {
    rightHand.addEventListener("abuttondown", () => {
      console.log("A BUTTON PRESSED");
      tryBathroomDoor();
    });

    rightHand.addEventListener("triggerdown", () => {
      console.log("TRIGGER PRESSED");
      tryBathroomDoor();
    });

    rightHand.addEventListener("gripdown", () => {
      console.log("GRIP PRESSED");
      tryBathroomDoor();
    });

    console.log("VR controller connected");
  }
});

function enterBathroom() {
  const rig = document.querySelector("#rig");

  const corridor = document.querySelector("#inside-world");
  const bathroom = document.querySelector("#bathroom-world");

  const spawn = document.querySelector("#bathroom-spawn");

  corridor.setAttribute("visible", "false");
  bathroom.setAttribute("visible", "true");

  setTimeout(() => {
    const pos = spawn.object3D.getWorldPosition(new THREE.Vector3());

    rig.object3D.position.copy(pos);
  }, 100);
}
