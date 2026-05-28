window.enterHouse = function () {
  console.log("ENTERING HOUSE...");

  const rig = document.querySelector("#rig");

  const outside = document.querySelector("#outside-world");
  const inside = document.querySelector("#inside-world");

  const windSound = document.querySelector("#windSound");
  const insideSound = document.querySelector("#insideSound");

  const outsideLights = document.querySelector("#outside-lights");

  const scene = document.querySelector("a-scene");

  const spawn = document.querySelector("#spawn-point");

  // 🌍 ورود به دنیای داخل
  outside.setAttribute("visible", "false");
  inside.setAttribute("visible", "true");

  // 🌫 حذف fog فقط هنگام ورود
  scene.removeAttribute("fog");

  // 💡 خاموش کردن نور بیرون
  outsideLights.setAttribute("visible", "false");

  // 🔊 قطع صدای بیرون
  windSound.pause();
  windSound.currentTime = 0;

  // 🔊 صدای داخل
  insideSound.volume = 0.6;

  insideSound.play().catch((err) => {
    console.log(err);
  });

  // 🚶 انتقال بازیکن
  setTimeout(() => {
    const worldPos = spawn.object3D.getWorldPosition(new THREE.Vector3());

    rig.object3D.position.copy(worldPos);
  }, 100);
};
