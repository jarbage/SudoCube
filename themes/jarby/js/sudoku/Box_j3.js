import { TrackballControls } from '../three.js/examples/jsm/controls/TrackballControls.js';

var camera, scene, renderer;
var controls;
var lineMaterial, lineGeometry, line;
var mesh1, mesh2;
var time = 30;
var mouseX = 0, mouseY = 0;

var cubeSize;
var cubeArray = new Array();

var colorPalette = [0x00ff00,0x800000,0xfabebe,0xf032e6,0xf58231,0x4363d8,0x3cb44b,0xffe119,0xe6194b];

var gameWindow = document.getElementById("gameWindow");
var layerArray = new Array();

var frustumSize = 100;

var amountofCubes;
var amountofMaterials;
var isClicked = false;

var metaCube;
var metaMaterial;
var metaGeometry;
var metaIndex = 1;


function init() {
    amountofCubes = 729;
    cubeSize = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 200 );
    camera.position.set(25, 25, 50);
    
    var light = new THREE.PointLight( 0xffffff, 3, 100,);
    light.position.set( 35, 35, 35 );
    scene.add( light );

    cubeInit(amountofCubes);
    cubePos(cubeArray);

    renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    gameWindow.appendChild(renderer.domElement);

    createControls(camera);
}

function cubeInit(cubeAmount){
    var metaCube;
    for(var i = 1; i <= cubeAmount; i++){
        metaCube = cubeBuilder(Math.floor(Math.random() * 9));
        scene.add(metaCube);
        cubeArray[i - 1] = metaCube;
    }
}
/*--Builds a Generic Cube--*/
function cubeBuilder(colorIndex){
    metaMaterial =  new THREE.MeshToonMaterial({color: colorPalette[colorIndex]});
    metaGeometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    metaCube = new THREE.Mesh(metaGeometry, metaMaterial);
    return metaCube;
}

function cubePos(cubeArray){
    var gutter = cubeSize;
    var x = 0; var y = 0; var z = 0;

    for(var i in cubeArray){
        cubeArray[i].position.set(x,y,z);
		
		//Increment x first
		x += (cubeSize + gutter);
		if((i) % 9 == 8) {
			y += (cubeSize + gutter);
			x = 0; 
			}
			
		if((i) % 81 == 80) {
			z += (cubeSize + gutter);
			y = 0;
		}
			
    }
}
function createControls( camera ) {
    controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 2.6;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 2.8;
    controls.keys = [ 65, 83, 68 ];
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();camera.lookAt(15,15,15);
    
    renderer.render(scene, camera);
}

init();
animate();
