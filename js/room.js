window.addEventListener("DOMContentLoaded", () => {
  const rig = document.querySelector("#rig");
  const bathroomDoor = document.querySelector("#bathroomDoor");

  let nearBathroomDoor = false;

  function checkBathroomDistance() {
    const playerPos = rig.object3D.position;
    const doorPos = bathroomDoor.object3D.position;

    const distance = playerPos.distanceTo(doorPos);

    nearBathroomDoor = distance < 20;
    console.log(distance);
  }

  setInterval(checkBathroomDistance, 100);

  document.addEventListener("keydown", (e) => {
    console.log("KEY:", e.code);

    if (e.code === "KeyE") {
      console.log("E DETECTED");
    }

    if (e.code === "KeyE" && nearBathroomDoor) {
      console.log("ENTERING BATHROOM");
      enterBathroom();
    }
  });
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
