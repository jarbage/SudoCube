import Unit from './Unit.js';


export default class Cube {

    constructor(scene) {
        this.scene = scene;
        this.units = this.createUnits();
        this.setUnitsPositions(1);
    }

    //Creates all 729 units for the board
    createUnits(board) {
        let units = new Array();
        for(let i = 0; i < 729; i++) {
            let x = i % 9;
            let y = parseInt((i % 81) / 9, 0);
            let z = parseInt(i / 81, 0);

            //If a board is passed in, load that board
            let value = 0 //CHANGE LATER
            if(board != null) {
                value = board[i]
            }

            let unit = new Unit(value, x, y, z, this.scene);
            units[i] = unit;
        }
        return units;
    }

    //Sets positions of all cubes
    setUnitsPositions(cubeSize){
        let gutter = cubeSize;
        let x = 0; let y = 0; let z = 0;
        for(let i = 0; i < 729; i++){
            //Place cube
            let unit = this.units[i];
            unit.metaCube.position.set(x, y, z);
            
            //Increment x first
            x += (cubeSize + gutter);
            
            //If 9 x-row cubes have been placed, increment y
            if((i) % 9 == 8) {
                    y += (cubeSize + gutter);
                    x = 0; 
                }      

                //If 81 y-row cubes have been placed, increment z
            if((i) % 81 == 80) {
                z += (cubeSize + gutter);
                y = 0; 
            }   
        }
    }

}