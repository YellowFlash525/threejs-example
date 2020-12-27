import React, { useRef, useEffect } from 'react';
import * as THREE from "three";

const NightSky = () => {
	const scene = new THREE.Scene();
	const sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
	const moonLight = new THREE.PointLight(0x451C23, 60, 600, 2);
	const cam = new THREE.PerspectiveCamera(80, window.innerWidth/ window.innerHeight, 1, 10000);
	const renderer = new THREE.WebGLRenderer();
	const cloudParticles = [];
	const mountRef = useRef();

	useEffect(() => {
		sceneLight.position.set(0,0,1);
        scene.add(sceneLight);
        
        moonLight.position.set(0, 0, 100);
		scene.add(moonLight);

		cam.position.z = 1500;
		scene.add(cam);

		renderer.setClearColor(0x0A0B0D,1);
		renderer.setSize(window.innerWidth , window.innerHeight);

        mountRef.current.appendChild(renderer.domElement);
        
        loadCloudParticles();
		loadMoonParticles();
		cloudAnimation();
	}, [])

    const loadCloudParticles = () => {
        const loader = new THREE.TextureLoader();
		loader.load('./assets/cloud2.png', (texture) => {
			const cloudGeometry = new THREE.PlaneBufferGeometry(700,500);
			const cloudMaterial = new THREE.MeshStandardMaterial({
				map:texture,
				transparent: true
            });

            for (let i = 0; i < 800; i++) {
                let particle = new THREE.Mesh(cloudGeometry, cloudMaterial);
                let valueX = -50;
                let valueY = 60;

                if (i % 2 === 0)  {
                    particle.position.set(
                        valueX * Math.random() * i,
                        valueY * Math.random() * i,
                        10 * Math.random() * i
					);
					cloudParticles.push(particle);
                } else {
                    particle.position.set(
                        valueY * Math.random() * i,
                        valueX * Math.random() * i,
                        10 * Math.random() * i
                    );
					cloudParticles.push(particle);
                }

                scene.add(particle);

                valueY = -valueY;
                valueX = -valueX;
            }

			renderer.render(scene, cam);
		}, (xhr) => {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},  () => {
			console.log( 'An error happened' );
        });
    }

    const loadMoonParticles = () => {
        let loader = new THREE.TextureLoader();
        loader.load('./assets/moon2.png', (texture) => {
			const moonGeometry = new THREE.PlaneBufferGeometry(1000,1000);
			const portalMaterial = new THREE.MeshStandardMaterial({
				map:texture,
				transparent: true
            });

            const particle = new THREE.Mesh(moonGeometry, portalMaterial);
            particle.position.set(10, 50, 2);
            scene.add(particle);
			renderer.render(scene, cam);
		}, (xhr) => {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},  () => {
			console.log( 'An error happened' );
		});
    }

    const cloudAnimation = () => {
		cloudParticles.forEach(particle => {
			particle.position.x += 0.5 * 1.5;
		});

		renderer.render(scene, cam);
		requestAnimationFrame(cloudAnimation.bind(this));
	}

	return (
		<div
			style={{ width: '100%', height: '100%' }}
			ref={ mountRef }
		/>
	);
}

export default NightSky;