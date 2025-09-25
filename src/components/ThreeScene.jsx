import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const w = mount.clientWidth || window.innerWidth;
    const h = 360;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 6;

    // controls (mouse drag)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.6;

    // rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0x004466,
      emissiveIntensity: 0.08,
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.12, 32, 120),
      ringMat
    );
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const inner = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.12, 32, 120),
      ringMat
    );
    inner.rotation.x = Math.PI / 2;
    scene.add(inner);

    // blades
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.15,
    });
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 0.06), bladeMat);
    b1.position.x = -0.5;
    b1.rotation.z = 0.35;
    const b2 = b1.clone();
    b2.position.x = 0.5;
    b2.rotation.z = -0.35;
    scene.add(b1, b2);

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // group batu
    const asteroidGroup = new THREE.Group();
    const asteroidGeo = new THREE.IcosahedronGeometry(0.08, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      roughness: 0.9,
      metalness: 0.2,
    });

    const asteroidCount = 80;
    for (let i = 0; i < asteroidCount; i++) {
      const mesh = new THREE.Mesh(asteroidGeo, asteroidMat);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        -Math.random() * 30 - 2
      );
      asteroidGroup.add(mesh);
    }
    scene.add(asteroidGroup);

    // animate
    let mounted = true;
    const animate = () => {
      if (!mounted) return;

      // ring & blades
      ring.rotation.z += 0.004;
      inner.rotation.z -= 0.006;
      b1.rotation.y += 0.01;
      b2.rotation.y -= 0.01;

      // move asteroids ke depan kamera
      asteroidGroup.children.forEach((m) => {
        m.position.z += 0.05;
        m.rotation.x += 0.01;
        m.rotation.y += 0.01;
        if (m.position.z > camera.position.z) {
          // reset jauh ke belakang
          m.position.z = -30 - Math.random() * 10;
          m.position.x = (Math.random() - 0.5) * 8;
          m.position.y = (Math.random() - 0.5) * 4;
        }
      });

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // resize
    const onResize = () => {
      const w2 = mount.clientWidth || window.innerWidth;
      renderer.setSize(w2, h);
      camera.aspect = w2 / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", onResize);
      try {
        mount.removeChild(renderer.domElement);
      } catch (e) {}
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: 360 }} />;
}
