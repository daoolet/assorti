// 
var view = {
    displayMsg: function(msg){
        var msgArea = document.querySelector('#messageArea');
        msgArea.innerHTML = msg;
    },

    displayHit: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },

    displayMiss: function(location){
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
            location: ['10','20','30'],
            hits: ['','','']
        },
        ship2 = {
            location: ['32','33','34'],
            hits: ['','','']
        },
        ship3 = {
            location: ['41','42','43'],
            hits: ['','','']
        }
    ],

    // Координаты выстрела
    fire: function(guess){
        for (var i=0; i<this.numShips; i++) 
        {
            var ship = this.ships[i];
            var loc = ship.location;
            var index = loc.indexOf(guess)

            if (index >= 0) {
                // Есть попадание
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMsg('HIT!!!');

                if (this.isSunk(ship)) {
                    view.displayMsg('You sank a battleship');
                    this.shipSunk++;
                }
                return true;
            }
        }
        
        view.displayMiss(guess);
        view.displayMsg('You missed!');
        return false;
    },

    isSunk: function(ship){
        for (var i=0; i<this.shipLen; i++) {
            if (ship.hits[i] !== 'hit')
                return false;
        }
        return true;
    }
};
