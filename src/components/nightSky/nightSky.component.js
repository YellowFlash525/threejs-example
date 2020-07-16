import React, { Component } from 'react';
import * as THREE from "three";

class NightSky extends Component { 
	constructor(props) {
		super(props);

		this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.moonLight = new THREE.PointLight(0x451C23, 60, 600, 2);
		this.cam = new THREE.PerspectiveCamera(80, window.innerWidth/ window.innerHeight, 1, 10000);
		this.renderer = new THREE.WebGLRenderer();

		this.cloudParticles = [];
		this.animationID = '';
		this.mountRef = React.createRef();
	}

	componentDidMount() {
		this.sceneLight.position.set(0,0,1);
        this.scene.add(this.sceneLight);
        
        this.moonLight.position.set(0, 0, 100);
		this.scene.add(this.moonLight);

		this.cam.position.z = 1500;
		this.scene.add(this.cam);

		this.renderer.setClearColor(0x0A0B0D,1);
		this.renderer.setSize(window.innerWidth , window.innerHeight);

        this.mountRef.current.appendChild(this.renderer.domElement);
        
        this.loadCloudParticles();
        this.loadMoonParticles();
    };

    loadCloudParticles() {
        let loader = new THREE.TextureLoader();
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
                    this.cloudParticles.push(particle);
                } else {
                    particle.position.set(
                        valueY * Math.random() * i,
                        valueX * Math.random() * i,
                        10 * Math.random() * i
                    );
                    this.cloudParticles.push(particle);
                }

                this.scene.add(particle);

                valueY = -valueY;
                valueX = -valueX;
            }

			this.renderer.render(this.scene, this.cam);
		}, (xhr) => {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},  () => {
			console.log( 'An error happened' );
        });
    }

    loadMoonParticles() {
        let loader = new THREE.TextureLoader();
        loader.load('./assets/moon2.png', (texture) => {
			const moonGeometry = new THREE.PlaneBufferGeometry(1000,1000);
			const portalMaterial = new THREE.MeshStandardMaterial({
				map:texture,
				transparent: true
            });

            let particle = new THREE.Mesh(moonGeometry, portalMaterial);
            particle.position.set(10, 50, 2);
            this.scene.add(particle);
			this.renderer.render(this.scene, this.cam);
		}, (xhr) => {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},  () => {
			console.log( 'An error happened' );
		});
    }

    cloudAnimation(animationFlag) {
		if (animationFlag) {
			this.cloudParticles.forEach(particle => {
				particle.position.x += 0.5 * 1.5;
			});

			this.renderer.render(this.scene, this.cam);
			this.animationID = requestAnimationFrame(this.cloudAnimation.bind(this));
		} else {
			cancelAnimationFrame(this.animationID);
		}
	}

	render() {
		return (
			<div
				style={{ width: '100%', height: '100%' }}
                ref={ this.mountRef }
                onMouseEnter={ () => this.cloudAnimation(true) }
				onMouseLeave={ () => this.cloudAnimation(false) }
			/>
		);
	}
}

export default NightSky;