export default class Unit {
    
    constructor(value, x, y, z, scene) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.value = value;
        this.scene = scene;

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
        this.scene.add(metaCube);
        return metaCube
    }

    /* Constructs a generic cube */
    cubeBuilder(/*--color--*/){
        let metaMaterial =  new THREE.MeshBasicMaterial({color: 0xC0C0C0, wireframe: false });
        let metaGeometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
        let metaCube = new THREE.Mesh(metaGeometry, metaMaterial);
        return metaCube;
    }


}