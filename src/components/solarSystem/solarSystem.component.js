import React, { Component } from 'react';
import * as THREE from "three";
import { OBJLoader } from "three-obj-mtl-loader"

class SolarSystem extends Component {
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

		this.cam.position.z = 20;
		this.scene.add(this.cam);

		this.renderer.setClearColor(0x000000,1);
		this.renderer.setSize(window.innerWidth , window.innerHeight);

		this.mountRef.current.appendChild( this.renderer.domElement );

		this.loadEarthModel();
	}

	loadEarthModel() {
		var loader = new OBJLoader();
		loader.load( './assets/Globe.obj', (obj) => {
			console.log('dupa');
			this.scene.add(obj);
			this.renderer.render(this.scene, this.cam);
		}, undefined, (error) => {
			console.error( error );
		});
	}

	render(){
		return (
			<div
				style={{ width: '100%', height: '100%' }}
				ref={ this.mountRef }
			/>
		);
	}
};

export default SolarSystem;