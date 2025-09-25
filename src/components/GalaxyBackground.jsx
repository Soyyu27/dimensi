import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function GalaxyBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-2";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // 🌫 Fog biar lebih dalam
    scene.fog = new THREE.FogExp2(0x000010, 0.0006);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 4000);
    camera.position.z = 1;

    // ⭐ Stars
    const starCount = 2500;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2500;
      positions[i3 + 1] = (Math.random() - 0.5) * 2500;
      positions[i3 + 2] = -Math.random() * 2500;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Warna random
    const starColors = [0xffffff, 0xffaaff, 0xaaccff, 0xffddaa];
    const material = new THREE.PointsMaterial({
      vertexColors: false,
      size: 1.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
    });
    material.color.set(starColors[Math.floor(Math.random() * starColors.length)]);

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 🌌 Nebulas (warna-warni)
    const loader = new THREE.TextureLoader();
    const sprite = loader.load("/assets/soft-circle.png");
    const nebulaColors = [0x220033, 0x331144, 0x003366, 0x440022];
    for (let i = 0; i < 8; i++) {
      const nebMat = new THREE.SpriteMaterial({
        map: sprite,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        opacity: 0.25,
      });
      const s = new THREE.Sprite(nebMat);
      s.position.set(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 1200,
        -500 - Math.random() * 1200
      );
      const scale = 1000 + Math.random() * 1500;
      s.scale.set(scale, scale * 0.6, 1);
      scene.add(s);
    }

    // 🌟 Big stars (flare)
    const flareTexture = loader.load("/assets/soft-circle.png");
    for (let i = 0; i < 20; i++) {
      const flareMat = new THREE.SpriteMaterial({
        map: flareTexture,
        color: 0xfff6d5,
        opacity: 0.9,
      });
      const star = new THREE.Sprite(flareMat);
      star.position.set(
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1200,
        -500 - Math.random() * 1800
      );
      const size = 20 + Math.random() * 60;
      star.scale.set(size, size, 1);
      scene.add(star);
    }

    // 🎥 Mouse & camera parallax
    let mouseX = 0,
      mouseY = 0;
    function onMove(e) {
      mouseX = (e.clientX - width / 2) / width;
      mouseY = (e.clientY - height / 2) / height;
    }
    window.addEventListener("pointermove", onMove);

    // 🚀 Animate
    let frame = 0;
    const animate = () => {
      frame += 1;
      points.rotation.y += 0.0005;
      points.rotation.x = Math.sin(frame * 0.0003) * 0.02;

      camera.position.x += (mouseX * 15 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 10 - camera.position.y) * 0.02;
      camera.position.z = 1 + Math.sin(frame * 0.0002) * 0.6; // slow drift maju-mundur

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      try {
        mount.removeChild(renderer.domElement);
      } catch (e) {}
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} />;
}
