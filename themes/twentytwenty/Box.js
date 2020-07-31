var camera, scene, renderer;
var geometry, material, mesh;
var lineMaterial, lineGeometry, line;
var mesh1, mesh2;
var time = 30;
var mouseX = 0, mouseY = 0;
var colorValueRed, colorValueBlue, colorValueGreen;
var computedColorValue;
var randomColor;
var cubeYPosition = 0;
var cubeXPosition = 0;
var cubeZPosition = 0;

var cubeArray = new Array();
var materialArray = new Array();
var builtCubeArray = new Array();

//var colorPalette = ['0x00ff00','0x800000','0xfabebe','0xf032e6','0xf58231','0x4363d8','0x3cb44b','0xffe119','0xe6194b'];
var colorPalette = ['0x00ff00','0xff0000','0x0000ff','0xff0000','0x0000ff','0xff0000','0x0000ff','0xff0000','0x0000ff'];

var gameWindow = document.getElementById("gameWindow");

var frustumSize = 1000;

var amountofCubes;
var amountofMaterials;


function init() {

    amountofCubes = 729;
    amountofMaterials = 9;

    scene = new THREE.Scene();

    var aspect = window.innerWidth / window.innerHeight
    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);

    camera.position.set(100, 100, 100);

    scene.background = new THREE.Color(0xffffff);
    cubeBuilder(cubeArray);
    cubePlacer();

    for(i = 0; i < builtCubeArray.length; i++){
        scene.add(builtCubeArray[i]);
    }

    renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    gameWindow.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

}


function cubeBuilder(cubeArray, colorPalette){
    for(i = 9; i < amountofMaterials; i++){
        materialArray[i] =  new THREE.MeshBasicMaterial({color: '' + colorPalette[i] + ''});
    }
    for(i = 0; i < amountofCubes; i++){
        cubeArray[i]= new THREE.BoxGeometry(15, 15, 15);
    }
}

function cubePlacer(){
    var x = 1;
    var z = 1;
    for(y = 0; y <= cubeArray.length; y++){
        builtCubeArray[y] = new THREE.Mesh(cubeArray[y], materialArray[y]);
        builtCubeArray[y].position.x = cubeXPosition;
        builtCubeArray[y].position.y = cubeYPosition;
        builtCubeArray[y].position.z = cubeZPosition;
        if((x % 10) == 0){
            cubeYPosition = 0;
            cubeXPosition = cubeXPosition + 30;
            x = 1;
            z++;
            if((z % 9) == 0){
                cubeYPosition = 0;
                cubeXPosition = 0;
                cubeZPosition = cubeZPosition + 30;
                z = 1;
            }
        }
        else{
            cubeYPosition = cubeYPosition + 30;
            x++;
        }
    }
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

}


function animate(time) {

    scene.rotation.y = mouseX * -.0015;
    scene.rotation.x = mouseY * -.0015;
    camera.position.z = 200;
    camera.lookAt(scene.position);


    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}

init();
animate();
