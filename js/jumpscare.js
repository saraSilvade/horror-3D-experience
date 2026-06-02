window.enterBathroom = function () {
  const rig = document.querySelector("#rig");

  const corridor = document.querySelector("#inside-world");
  const bathroom = document.querySelector("#bathroom-world");

  const spawn = document.querySelector("#bathroom-spawn");

  const scaryWoman = document.querySelector("#scary-women");
  const scream = document.querySelector("#jumpScareSound");

  // switch world
  corridor.setAttribute("visible", "false");
  bathroom.setAttribute("visible", "true");

  setTimeout(() => {
    const pos = spawn.object3D.getWorldPosition(new THREE.Vector3());
    rig.object3D.position.copy(pos);
  }, 100);

  startBathroomHorror();
};

function startBathroomHorror() {
  const scaryWoman = document.querySelector("#scary-women");
  const scream = document.querySelector("#jumpScareSound");

  setTimeout(() => {
    scaryWoman.setAttribute("visible", "true");

    scream.currentTime = 0;
    scream.play().catch(() => {});
  }, 5000);

  setTimeout(() => {
    const scaryWoman = document.querySelector("#scary-women");
    const scream = document.querySelector("#jumpScareSound");
    const light = document.querySelector("#woman-light");

    scaryWoman.setAttribute("visible", "true");

    light.setAttribute("intensity", "2");

    scream.currentTime = 0;
    scream.play().catch(() => {});
  }, 5000);
}
