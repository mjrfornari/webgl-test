import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import moonTextureMap from './2k_mercury.jpg'
import sunTextureMap from './2k_sun.jpg'
import space from './space.jpg'
import earthTextureMap from './2_no_clouds_4k.jpg'
import waterTextureMap from './water_4k.png'
import elevTextureMap from './elev_bump_4k.jpg'
import cloudsTextureMap from './2k_earth_clouds.png'
import './App.css'

function App() {

  useEffect(() => {
    const scene = new THREE.Scene()
    const scene2 = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
  
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg')
    })

  
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30)
    camera.lookAt(scene.position);
  
    renderer.render(scene, camera)
    renderer.render(scene2, camera)

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(10, -10, -20)
    scene.add(pointLight)


    // const lightHelper = new THREE.PointLightHelper(pointLight, 1, 'red')
    // scene.add(lightHelper)
    
    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene2.add(ambientLight)

    const spaceTexture = new THREE.TextureLoader().load(space)
    scene.background = spaceTexture

    const earthTexture = new THREE.TextureLoader().load(earthTextureMap)
    const elevTexture = new THREE.TextureLoader().load(elevTextureMap)
    const waterTexture = new THREE.TextureLoader().load(waterTextureMap)
    const cloudsTexture = new THREE.TextureLoader().load(cloudsTextureMap)

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(5, 16, 16),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        bumpMap: elevTexture,
        bumpScale:   0.005,
        specularMap: waterTexture,
        specular: new THREE.Color('grey')
      })
    )
    earth.position.set(-10, -10, -20)
    scene.add(earth)

    const moonTexture = new THREE.TextureLoader().load(moonTextureMap)

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 8, 8),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
      })
    )
    moon.position.set(-35, -10, -20)
    scene.add(moon)

    const sunTexture = new THREE.TextureLoader().load(sunTextureMap)

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshStandardMaterial({
        map: sunTexture,
      })
    )
    sun.position.set(10, -10, -20)
    scene2.add(sun)
    
    const controls = new OrbitControls(camera, renderer.domElement)

    var r = 20;
    var theta = 0;
    var dTheta = 2 * Math.PI / 1000;

    var rEarth = 80;
    var thetaEarth = 0;
    var dThetaEarth =  Math.PI / 1000;
  
    function animate () {
      requestAnimationFrame(animate)
      earth.rotation.y += 0.012
      moon.rotation.y += 0.008


      theta += dTheta;
      moon.position.x = -(r * Math.cos(theta)) + earth.position.x;
      moon.position.z = r * Math.sin(theta) + earth.position.z;

      thetaEarth += dThetaEarth;
      earth.position.x = -(rEarth * Math.cos(thetaEarth)) + sun.position.x;
      earth.position.z = rEarth * Math.sin(thetaEarth) + sun.position.z;

      renderer.autoClear = false;
      
      renderer.render(scene, camera)
      renderer.render(scene2, camera)
    }
    
    animate()

  }, [])

  return (
    <canvas id="bg">

    </canvas>
  )
}

export default App
