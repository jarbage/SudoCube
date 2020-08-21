

export default class Unit {
    
    constructor(value, x, y, z, scene, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.value = value;
        this.scene = scene;
        this.color = color;

        this.cubeSize = 1;

        this.metaCube = this.createCube();
    }

    /* Returns cube index */
    static getIndex(x, y, z) {
        return (x % 9) + (y * 9) + (z * 81)
    }

    /* Creates metaCube for the Unit */
    createCube() {
        let metaCube = this.cubeBuilder()
        return metaCube;
    }

    /* Constructs a generic cube */
    cubeBuilder(){
        let metaMaterial =  new THREE.MeshToonMaterial({color: this.color});
        let metaGeometry = new THREE.BoxBufferGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
        let metaCube = new THREE.Mesh(metaGeometry, metaMaterial);
        return metaCube;
    }

    //Loads metacubes into the scene
    loadScene() {
        this.scene.add(this.metaCube);
    }


}