(function () {
  const root = document.getElementById('clinagent-station');
  const stage = root.querySelector('.stage');
  const canvas = stage.querySelector('canvas');
  const fallback = stage.querySelector('.poster');
  const actions = root.querySelector('.object-actions');

  function addGroundContact(THREE, scene) {
    const layer = document.createElement('canvas');
    layer.width = 192;
    layer.height = 192;
    const context = layer.getContext('2d');
    const gradient = context.createRadialGradient(96, 96, 9, 96, 96, 96);
    gradient.addColorStop(0, 'rgba(41, 50, 47, .18)');
    gradient.addColorStop(.42, 'rgba(41, 50, 47, .13)');
    gradient.addColorStop(.78, 'rgba(41, 50, 47, .062)');
    gradient.addColorStop(1, 'rgba(41, 50, 47, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 192, 192);
    const texture = new THREE.CanvasTexture(layer);
    texture.colorSpace = THREE.SRGBColorSpace;
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(3.7, 2.7),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false })
    );
    contact.position.set(.10, .005, .10);
    contact.rotation.x = -Math.PI / 2;
    scene.add(contact);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.ShadowMaterial({opacity:.075}));
    floor.rotation.x = -Math.PI/2;
    floor.position.y = .008;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  async function showStation() {
    const [THREE, { GLTFLoader }, { OrbitControls }] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/three@0.169.0/+esm'),
      import('https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/loaders/GLTFLoader.js/+esm'),
      import('https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/controls/OrbitControls.js/+esm')
    ]);
    const { scene: sculpture, animations } = await new GLTFLoader().loadAsync(root.dataset.model);
    const mixer = new THREE.AnimationMixer(sculpture);
    mixer.clipAction(animations[0]).play();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .91;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;

    const scene = new THREE.Scene();
    sculpture.traverse(part => {
      if (!part.isMesh || part.material.isMeshBasicMaterial) return;
      part.castShadow = !part.name.startsWith('Stone_base');
      part.receiveShadow = true;
    });
    scene.add(sculpture);
    addGroundContact(THREE, scene);
    scene.add(new THREE.HemisphereLight(0xf7fbff, 0xa59a8f, 1.10));
    const fill = new THREE.DirectionalLight(0xf9f8f5, .65);
    fill.position.set(4, 2.5, 4.5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xe3f0ff, .70);
    rim.position.set(2.2, 4, -4);
    scene.add(rim);
    const key = new THREE.DirectionalLight(0xfff1dd, 3.0);
    key.position.set(-3.7, 8.5, 4.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -3.3;
    key.shadow.camera.right = 3.3;
    key.shadow.camera.top = 3.3;
    key.shadow.camera.bottom = -3.3;
    key.shadow.camera.near = 2;
    key.shadow.camera.far = 15;
    key.shadow.normalBias = .008;
    key.shadow.radius = 10;
    key.shadow.blurSamples = 20;
    scene.add(key);

    const camera = new THREE.PerspectiveCamera(54, 1.18, .1, 25);
    const controls = new OrbitControls(camera, canvas);
    // Horizontal touch drags rotate; vertical swipes retain native page scrolling.
    canvas.style.touchAction = 'pan-y';
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const vertical = new THREE.Vector3(0, 1, 0);
    controls.target.set(.005, 1.03, .02);
    camera.position.setFromSpherical(new THREE.Spherical(3.6, 1.19, 2.68));
    camera.position.add(controls.target);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = !reducedMotion.matches;
    controls.dampingFactor = .14;
    controls.minPolarAngle = .74;
    controls.maxPolarAngle = 1.44;
    controls.rotateSpeed = .57;
    controls.update();

    let nextFrame = 0;
    let aspect = 1.18;
    let lastTypingFrame = 0;
    let inView = false;
    function queueDraw() {
      if (!nextFrame) nextFrame = requestAnimationFrame(draw);
    }
    function draw(time) {
      nextFrame = 0;
      controls.update();
      const typing = inView && !canvas.hidden && !document.hidden && !reducedMotion.matches;
      if (typing) {
        const elapsed = lastTypingFrame ? (time - lastTypingFrame) / 1000 : 0;
        mixer.update(Math.min(elapsed, .08));
        lastTypingFrame = time;
      } else {
        lastTypingFrame = 0;
      }
      const yaw = controls.getAzimuthalAngle();
      const elevation = Math.PI / 2 - controls.getPolarAngle();
      const groundReach = 1.79 * Math.abs(Math.sin(yaw)) + 1.08 * Math.abs(Math.cos(yaw));
      const projectedFloor = groundReach * Math.sin(elevation) + controls.target.y * Math.cos(elevation);
      const halfHeight = Math.max(1.80 / aspect, projectedFloor + .12);
      camera.aspect = aspect;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(halfHeight / camera.position.distanceTo(controls.target)));
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      if (typing) queueDraw();
    }
    const resize = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      aspect = width / height;
      renderer.setSize(width, height, false);
      queueDraw();
    };

    controls.addEventListener('change', queueDraw);
    controls.addEventListener('start', () => { stage.dataset.mode = 'dragging'; });
    controls.addEventListener('end', () => { stage.dataset.mode = 'live'; });
    for (const button of actions.querySelectorAll('button')) {
      button.addEventListener('click', () => {
        const step = Number(button.dataset.angle) * Math.PI / 9;
        camera.position.sub(controls.target).applyAxisAngle(vertical, step).add(controls.target);
        queueDraw();
      });
    }
    reducedMotion.addEventListener('change', () => {
      controls.enableDamping = !reducedMotion.matches;
      queueDraw();
    });
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      if (fallback) fallback.hidden = false;
      canvas.hidden = true;
      actions.hidden = true;
      stage.dataset.mode = 'static';
    });
    canvas.addEventListener('webglcontextrestored', () => {
      renderer.shadowMap.needsUpdate = true;
      if (fallback) fallback.hidden = true;
      canvas.hidden = false;
      actions.hidden = false;
      stage.dataset.mode = 'live';
      queueDraw();
    });
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      queueDraw();
    });
    visibility.observe(stage);
    document.addEventListener('visibilitychange', queueDraw);
    window.addEventListener('pagehide', event => {
      if (event.persisted) return;
      if (nextFrame) cancelAnimationFrame(nextFrame);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', queueDraw);
      mixer.stopAllAction();
      controls.dispose();
      renderer.dispose();
    });
    if (fallback) fallback.hidden = true;
    canvas.hidden = false;
    actions.hidden = false;
    stage.dataset.mode = 'live';
    resize();
  }

  showStation().catch(error => console.warn('Showing the still image of the ClinAgent station.', error));

})();
