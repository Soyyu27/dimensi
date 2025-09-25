import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeLogo({ size = 64 }){
  const mountRef = useRef(null)
  useEffect(()=>{
    const mount = mountRef.current
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 3

    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00c4ff,
      emissiveIntensity: 0.9,
      metalness: 0.25,
      roughness: 0.2
    })
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), mat)
    scene.add(sphere)

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.06, 16, 60), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.7, roughness: 0.3 }))
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    const light = new THREE.PointLight(0xffffff, 1.2)
    light.position.set(3,3,3)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))

    let raf = null
    const animate = ()=>{
      sphere.rotation.y += 0.014
      ring.rotation.z += 0.008
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return ()=>{
      cancelAnimationFrame(raf)
      try{ mount.removeChild(renderer.domElement) }catch(e){}
      scene.clear()
    }
  },[size])
  return <div ref={mountRef} style={{ width: size, height: size }} />
}
