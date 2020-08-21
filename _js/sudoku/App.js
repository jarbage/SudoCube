import Board from './Board.js';
import Cube from './Cube.js';

import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';
import { GUI } from '../three.js/examples/jsm/libs/dat.gui.module.js';
var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;

var raycaster, mouse;
var orthoCamera, persCamera;
var scene, renderer;
var colorPalette = [0x00ff00,0x800000,0xfabebe,0xf032e6,0xf58231,0x4363d8,0x3cb44b,0xffe119,0xe6194b];

var gameWindow = document.getElementById("gameWindow");

var sodokuBoard;
var controls;

//[2, 3, 9, 8, 4, 1, 5, 6, 7,
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
]

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );

    scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
	var light = new THREE.PointLight(0xebe8d6, 2.8, 100);
	light.position.set( 50, 50, 50 );
	scene.add( light );
	
	// sodokuBoard = new Board(scene, solvedBoard)
	sodokuBoard = new Cube(scene, solvedBoard, colorPalette)
	sodokuBoard.loadScene();

	persCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
	// persCamera =  new THREE.OrthographicCamera( WINDOW_WIDTH / - 2, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, WINDOW_HEIGHT / - 2, 1, 400 );	
	//camera.position.set(8.5, 8.5, -20);
	persCamera.position.set(75, 75, 75);
	persCamera.layers.enable( 0 ); // enabled by default
	// persCamera.layers.enable( 1 );
	// persCamera.layers.enable( 2 );

	controls = new OrbitControls( persCamera, renderer.domElement );
	controls.target = new THREE.Vector3(9, 9, 9);

	controls.update();
	
	var layers = {

		'toggle z': function() {

			persCamera.layers.toggle( 0 );

		},

		'enable all': function() {

			persCamera.layers.enableAll();

		},

		'disable all': function() {

			persCamera.layers.disableAll();

		}

	};

	//
	// Init gui
	var gui = new GUI();
	gui.add( layers, 'toggle z' );
	gui.add( layers, 'enable all' );
	gui.add( layers, 'disable all' );

    gameWindow.appendChild(renderer.domElement);
}



function animate(time) {
    requestAnimationFrame(animate);
    controls.update();
	renderer.render(scene, persCamera);

}

init();
animate();
