import Unit from './Unit.js';
import Board from './Board.js';


export default class Cube {

    constructor(scene, solvedBoard, colorPalette, cube) {
        this.scene = scene;
        this.solvedBoard = solvedBoard;
        this.colorPalette = colorPalette
        this.units = this.createUnits(cube);
        this.setUnitsPositions(1);
        this.createTestValues();
        this.addLayer();
    }

    //Creates all 729 units for the board
    createUnits(cube) {
        let units = new Array();
        for(let i = 0; i < 729; i++) {
            let x = i % 9;
            let y = parseInt((i % 81) / 9, 0);
            let z = parseInt(i / 81, 0);

            //If a cube is passed in, load that cube
            let value = 0 //CHANGE LATER
            if(cube != null) {
                value = cube[i]
            }
            let color = Math.floor(Math.random() * 9);
            let unit = new Unit(value, x, y, z, this.scene, this.colorPalette[y]);
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

    loadScene() {
        for(let i in this.units) {
            this.units[i].loadScene();
        }
    }

    isCorrect() {

    }

    convertCubeToBoards() {
        let boards = new Array();
        x2 = 81;
        for(let x1 = 0; x1 < 729; x1 = x1 + 81 )
            cubeSlice = this.units.slice(x1, x2);
            let board = new Board(scene, cubeSlice);
            boards.push(board);

            x2 += 81;
    }


    createTestValues() {
        let values = new Array();
        for(let i = 0; i < 729; i++) {
            values[i] = i;
        }
        this.createUnits(values);
    }
    
    //Can only have 32 layers
    addLayer() {
        for(let i = 0; i < this.units.length; i++){
            // this.units[i].metaCube.layers.set(i);
        }
    }


}