import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { DataServiceService } from '../data-service.service';

// TO DO Send hexcode to alter colour of lighting via front end.

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})

export class ModelComponent implements OnInit, AfterViewInit {

  model: string = 'keyboard';
  data: string;
  counter: boolean = false;
  lighting: string = '#FFFFFF';
  constructor(private dataService : DataServiceService) {
    this.dataService.getData().subscribe((data) => {
      
      if(data !== ''){
        
        if(this.counter === false){
          this.counter = true;
        } 
        this.data = data
        this.model = this.data.substring(0, this.data.indexOf( ','))
        this.lighting = this.data.substring(this.data.indexOf( ',')+2)
        
        if (this.counter === true) {
          localStorage.setItem('assetNameForReload', this.data)
          window.location.reload()
        }

        this.testing()
      }
    })
   }
  ngOnInit(): void { // TO DO What if we don't need to reload the asset to change the colour - Look into this (forget for now focus on colour picker)

       this.data = localStorage.getItem('assetNameForReload') ?? ''
    if(this.data !== ''){
      localStorage.removeItem('assetNameForReload')
      this.counter = true;
      this.model = this.data.substring(0, this.data.indexOf( ','))
      this.lighting = this.data.substring(this.data.indexOf( ',')+2)
      this.testing()
    }
  }

  ngAfterViewInit() {

  }

testing(){
  //Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object: THREE.Object3D<THREE.Object3DEventMap>;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = this.model;

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `/assets/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D")!.appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === this.model ? 30: 25;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(this.lighting, 75); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(this.lighting, objToRender === this.model ? 5 : 40);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender != "eye") {
  controls = new OrbitControls(camera, renderer.domElement);
}
var self = this
function changeColour(){ // TO DO
  const topLight = new THREE.DirectionalLight('#0000FF', 75);
  topLight.position.set(500, 500, 500) //top-left-ish
  topLight.castShadow = true;
  const ambientLight = new THREE.AmbientLight('#0000FF', objToRender === self.model ? 5 : 40);
  scene.add(topLight);
  scene.add(ambientLight);
  console.log('change colour function')
}

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the eye move
  if (object && objToRender === "eye") {
    //I've played with the constants here until it looked good 
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}
//Start the 3D rendering
animate();
}
}