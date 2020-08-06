import Unit from './Unit.js';

export default class Board {

    constructor(scene, board) {
        this.scene = scene;
        this.units = this.createUnits(board);
        this.setUnitsPositions(1);
        if(!this.isCorrect())
            console.log("Broken lol");
    }

    //Creates all 81 units for the board
    createUnits(board) {
        let units = new Array();
        for(let i = 0; i < 81; i++) {
            let x = i % 9;
            let y = parseInt(i / 9, 0);

            let value = 0 //CHANGE LATER
            if(board != null) {
                value = board[i]
            }

            let unit = new Unit(value, x, y, i, this.scene);
            units[i] = unit;
        }
        return units;
    }

    //Sets positions of all cubes
    setUnitsPositions(cubeSize){
        let gutter = cubeSize;
        let x = 0; let y = 0;;
        for(let i = 0; i < 81; i++){
            //Place cube
            let unit = this.units[i];
            unit.metaCube.position.set(x, y, 0);
            
            //Increment x first
            x += (cubeSize + gutter);
            
            //If 9 x-row cubes have been placed, increment y
            if((i) % 9 == 8) {
                    y += (cubeSize + gutter);
                    x = 0; 
                }      
        }
    }


    //Returns true if board is correct
    isCorrect() {
        let numbers;

        //Check all y-vectors for mistakes
        for(let x = 0; x < 9; x++) {
            //Clear numbers array for every use
            numbers = new Array(9).fill(0);
            for(let y = 0; y < 9; y++) {
                let index = Unit.getIndex(x, y);
                let unit = this.units[index];
                numbers[unit.value - 1] = 1;
            }

            //Check that each 1-9 value is in the vector
            let correct = numbers.every(function (val) {
                return val > 0;
            });
            //If not all values are in the row
            if(!correct) 
                return false
        }

        //Check all x-vectors for mistakes
        for(let y = 0; y < 9; y++) {
            //Clear numbers array for every use
            numbers = new Array(9).fill(0);
            for(let x = 0; x < 9; x++) {
                let index = Unit.getIndex(x, y);
                let unit = this.units[index];
                numbers[unit.value - 1] = 1;
            }

            //Check that each 1-9 value is in the vector
            let correct = numbers.every(function (val) {
                return val > 0;
            });
            //If not all values are in the row
            if(!correct) 
                return false
        }

       //Return true if no mistakes are found
        return true;
    }
}