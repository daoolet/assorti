// 
var view = {
    displayMsg: function(msg) {
        var msgArea = document.querySelector('#messageArea');
        msgArea.innerHTML = msg;
    },

    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },

    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    },
};

// Модель поведения игры
var model = {
    boardSize: 7,
    numShips: 3,
    shipLen: 3,
    shipSunk: 0,

    // Координты кораблей
    ships: [
        ship1 = {
            location: ['0','0','0'],
            hits: ['','','']
        },
        ship2 = {
            location: ['0','0','0'],
            hits: ['','','']
        },
        ship3 = {
            location: ['0','0','0'],
            hits: ['','','']
        }
    ],

    // Координаты выстрела
    fire: function(guess)
    {
        for (var i=0; i<this.numShips; i++) 
        {
            var ship = this.ships[i];
            var loc = ship.location;
            var index = loc.indexOf(guess);

            if (index >= 0) 
            {
                // Есть попадание
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMsg('HIT!!!');

                if (this.isSunk(ship)) 
                {
                    view.displayMsg('You sank a battleship');
                    this.shipSunk++;
                }

                return true;
            }
        }

        // Есть промах
        view.displayMiss(guess);
        view.displayMsg('You missed!');
        
        return false;
    },

    // Проверка на утопленность
    isSunk: function(ship)
    {
        for (var i=0; i<this.shipLen; i++) {
            if (ship.hits[i] !== 'hit')
                return false;
        }

        return true;
    },

    // Генерация кораблей
    generateShipsLocation: function() {
        var location;

        for (var i = 0; i < this.numShips; i++)
        {
            do {
                location = this.generateShip();
            } while (this.collision(location));

            this.ships[i].location = location;
        }
    },

    generateShip: function() {
        var dir = Math.floor(Math.random()*2);
        var row, col;

        if (dir === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLen));
        } else {
            col = Math.floor(Math.random() * this.boardSize);
            row = Math.floor(Math.random() * (this.boardSize - this.shipLen));
        }

        var newShipLocation = [];

        for (var i = 0; i < this.shipLen; i++)
        {
            if (dir === 1) 
                newShipLocation.push(row + '' + (col + i));
            else
                newShipLocation.push((row + i) + '' + col);
        }

        return newShipLocation;
    },

    collision: function(location) {

        for (var i = 0; i < this.shipLen; i++)
        {
            var  ship = model.ships[i];

            for (var j = 0; j < location.length; j++) 
                if (ship.location.indexOf(location[j]) >= 0)
                    return true;
        }

        return false;
    }
};

// Управление игрой
var controller = {
    shots: 0,

    shotProcess: function(shots) {
        var coordinates = parseShots(shots);

        if (location) {
            this.shots++;
            var hit = model.fire(coordinates);

            if (hit && model.shipSunk === model.numShips) {
                view.displayMsg('You Won!!! You have shot ' + this.shots 
                + ' times to sunk all ships');
            }
        }
    }
};

function parseShots(shots)
{
    var alphabet = ['A','B','C','D','E','F','G'];

    if (shots === null || shots.length !== 2) {
        alert('You entered incorrect data');
    }
    else {
        firstChar = shots.charAt(0);       // Извлекаем первый символ
        
        var row = alphabet.indexOf(firstChar);
        var coloumn = shots.charAt(1);

        if (isNaN(row) || isNaN(coloumn))
            alert('You entered incorrect data');
        else if (row < 0 || row >= model.boardSize ||
                coloumn < 0 || coloumn >= model.boardSize) 
            alert('You entered incorrect data');
        else 
            return row + coloumn;
    }   

    return null;
}

function init() {
    var fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;

    // Enter click
    var guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;

    model.generateShipsLocation();
}

function handleFireButton() {
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value;

    controller.shotProcess(guess);
    guessInput.value = '';
}

function handleKeyPress(e) {
    var fireButton = document.getElementById('fireButton');

    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;
