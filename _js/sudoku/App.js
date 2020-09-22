import Cube from './Cube.js';

import { TrackballControls } from '../three.js/examples/jsm/controls/TrackballControls.js';

var mouse = new THREE.Vector2(), INTERSECTED;

var raycaster, mouse;
var camera;
var scene, renderer;
var colorPalette = [0x00ff00,0x800000,0xfabebe,0xf032e6,0xf58231,0x4363d8,0x3cb44b,0xffe119,0xe6194b];

var selectorMaterial = new THREE.MeshToonMaterial({wireframe: true});
var selectorGeometry = new THREE.BoxBufferGeometry(1.2,1.2,1.2);
var cubeSelector = new THREE.Mesh(selectorGeometry, selectorMaterial);


var gamewindow = document.getElementById("gameWindow");

var sodokuBoard;
var controls;

let solvedBoard = 
   [2, 3, 9, 8, 4, 1, 5, 6, 7,
	1, 5, 4, 7, 9, 6, 8, 2, 3,
	7, 8, 6, 2, 3, 5, 9, 1, 4,
	6, 1, 8, 9, 7, 2, 4, 3, 5,
	4, 7, 2, 5, 1, 3, 6, 8, 9,
	5, 9, 3, 4, 6, 8, 2, 7, 1,
	3, 4, 1, 6, 8, 9, 7, 5, 2, 
	9, 6, 5, 3, 2, 7, 1, 4, 8,
	8, 2, 7, 1, 5, 4, 3, 9, 6,
];

function init() {
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio( window.devicePixelRatio );

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	
	var light = new THREE.PointLight(0xebe8d6, 2.5, 100);
	light.position.set( 50, 50, 50 );
	scene.add( light );

	var light2 = new THREE.PointLight(0xebe8d6, 0.3, 100);
	light2.position.set( 0, 0, 0 );
	scene.add( light2 );
	
	sodokuBoard = new Cube(scene, solvedBoard, colorPalette)
	sodokuBoard.loadScene();

	cubeSelector.visible = false;
	scene.add(cubeSelector);
	
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.01, 200 );
	camera.position.set(55, 55, 55);

	controls = new TrackballControls( camera, gamewindow );
	controls.target = new THREE.Vector3(9, 9, 9);
	
	controls.update();

	raycaster = new THREE.Raycaster();

	gamewindow.appendChild(renderer.domElement);
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}


function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate(time) {
    requestAnimationFrame(animate);
	controls.update();
	camera.updateMatrixWorld();

	checkIntersect();
	
	raycaster.setFromCamera( mouse, camera );
	renderer.render(scene, camera);

}

function checkIntersect(){
	let intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0x3c3c3c );
		}

	} else {
		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	}
}

function selectCube(){
	checkIntersect();
}

init();
animate();
