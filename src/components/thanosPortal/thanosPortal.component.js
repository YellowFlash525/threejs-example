import React, { Component } from 'react';
import * as THREE from "three";

class ThanosPortal extends Component {
	constructor(props) {
		super(props);

		this.scene = new THREE.Scene();
		this.clock = new THREE.Clock();
		this.sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
		this.portalLight = new THREE.PointLight(0x062d89, 30, 600, 1.7);
		this.cam = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);
		this.renderer = new THREE.WebGLRenderer();

		this.portalParticles = [];
		this.smokeParticles = [];
		this.animationID = '';
		this.mountRef = React.createRef();
	}

	componentDidMount() {
		this.sceneLight.position.set(0, 0, 1);
		this.scene.add(this.sceneLight);
		
		this.portalLight.position.set(0, 0, 250);
		this.scene.add(this.portalLight);

		this.cam.position.z = 1000;
		this.scene.add(this.cam);

		this.renderer.setClearColor(0x000000,1);
		this.renderer.setSize(window.innerWidth , window.innerHeight);

		this.mountRef.current.appendChild( this.renderer.domElement );

		this.loadPortalParticles();
		this.portalAnimation();
	};

	loadPortalParticles() {
		let loader = new THREE.TextureLoader();
		loader.load("./assets/smoke.png", (texture) => {
			const portalGeometry = new THREE.PlaneBufferGeometry(350,350);
			const portalMaterial = new THREE.MeshStandardMaterial({
				map:texture,
				transparent: true
			});

			const smokeGeometry = new THREE.PlaneBufferGeometry(1000,1000);
			const smokeMaterial = new THREE.MeshStandardMaterial({
				map:texture,
				transparent: true
			});
	
			for (let p = 880; p > 250; p--) {
				let particle = new THREE.Mesh(portalGeometry, portalMaterial);
				particle.position.set(
					0.5 * p * Math.cos((4 * p * Math.PI) / 180),
					0.5 * p * Math.sin((4 * p * Math.PI) / 180),
					0.1 * p
				);
				particle.rotation.z = Math.random() * 360;
				this.portalParticles.push(particle);
				this.scene.add(particle);
			}
	
			for (let p = 0; p < 40; p++) {
				let particle = new THREE.Mesh(smokeGeometry, smokeMaterial);
				particle.position.set(
					Math.random() * 1000 - 500,
					Math.random() * 400 - 200,
					25
				);
				particle.rotation.z = Math.random() * 360;
				particle.material.opacity = 0.6;
				this.portalParticles.push(particle);
				this.scene.add(particle);
			}

			this.renderer.render(this.scene, this.cam);
		}, ( xhr ) => {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},  () => {
			console.log( 'An error happened' );
		});
	}

	portalAnimation() {
		let delta = this.clock.getDelta();

		this.portalParticles.forEach(particles => {
			particles.rotation.z -= delta * 1.5;
		});
		this.smokeParticles.forEach(particles => {
			particles.rotation.z -= delta * 0.2;
		});

		if (Math.random() > 0.9) {
			this.portalLight.power = 350 + Math.random() * 500;
		}

		this.renderer.render(this.scene, this.cam);
		this.animationID = requestAnimationFrame(this.portalAnimation.bind(this));
	}

	render() {
		return (
			<div
				style={{ width: '100%', height: '100%' }}
				ref={ this.mountRef }
			/>
		);
	}
}

export default ThanosPortal;