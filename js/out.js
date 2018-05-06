function Furry (){

    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

function Coin (){

    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}

function Game (){

    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;
    this.speed = 400;
    this.levelUp = 0;
    this.lives = 3;
    this.level = 1;

    this.index = function(x,y){
        return x + (y * 10);
    };

    this.showFurry = function(){

        this.hideVisibleFurry();

        if ((this.furry.y >= 0) && (this.furry.y <= 9) && (this.furry.x <= 9) && (this.furry.x >= 0)) {
            this.board[ this.index(this.furry.x, this.furry.y) ].classList.add('furry');
        }


        this.coinCollisionCheck();

        this.wallCollisionCheck();

        this.showScore();

        this.increaseSpeed();

        this.gameOverScore();
    };

    this.showCoin = function(){

        this.board[ this.index(this.coin.x, this.coin.y) ].classList.add('coin');
    };

    this.startGame = function (){
        this.idSetInterval = setInterval(function (){
            self.moveFurry();                             //słówko kluczowe this 'nie działa' w SetInterval! wskazuje na event!
        }, this.speed)
    };

    this.moveFurry = function (){


        if (this.furry.direction === 'right'){
            // this.board[ this.index(this.furry.x, this.furry.y) ].classList.remove('furry');
            this.furry.x = this.furry.x +1;                 //nie trzeba dodać innej zmiennej, ale zmodyfikować zmienną furry.x (PAMIĘTAJ O MODYFKOWANIU ZMIENNYCH GLOBALNYCH, które służą różnym funkcjom!!!)
            this.showFurry();

        }

        else if (this.furry.direction === 'left'){
            // this.board[ this.index(this.furry.x, this.furry.y) ].classList.remove('furry');
            this.furry.x = this.furry.x - 1;
            this.showFurry();
        }

        else if (this.furry.direction === 'down'){
            // this.board[ this.index(this.furry.x, this.furry.y) ].classList.remove('furry');
            this.furry.y = this.furry.y + 1;
            this.showFurry();
        }

        else if (this.furry.direction === 'up'){
            // this.board[ this.index(this.furry.x, this.furry.y) ].classList.remove('furry');   //alternatywa zamiast this.hideVisibleFurry()
            this.furry.y = this.furry.y - 1;
            this.showFurry();
        }
    };

    this.hideVisibleFurry = function (){
        if (document.querySelector('.furry')){                          //bez warunku chciał w this.showFurry() usunąć klasę zanim dodał
            document.querySelector('.furry').classList.remove('furry')
        }

    };

    this.changeDirection = function(event){

        if (event.which === 37){
            self.furry.direction = 'left'
        }
        else if (event.which === 38){
            self.furry.direction = 'up'
        }
        else if (event.which === 39){
            self.furry.direction = 'right'
        }
        else if (event.which === 40){
            self.furry.direction = 'down'
        }


    };

    document.addEventListener('keydown',this.changeDirection);    // bez '()', bo inaczej by uruchomił i chciał czytać event.which bez przyciśniętego klawisza (error)

    this.coinCollisionCheck = function(){

        if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)){

            document.querySelector('.coin').classList.remove('coin');

            this.coin.x = Math.floor(Math.random()*10);
            this.coin.y = Math.floor(Math.random()*10);
            this.showCoin();
            this.score++;
            this.levelUp++;

        }
    };

    this.wallCollisionCheck = function(){


        if (this.furry.x > 9 || this.furry.x < 0 || this.furry.y > 9 || this.furry.y < 0){


            document.querySelector('#score div').style.setProperty('background-color', 'rgba(255, 0, 0, 1)');


            setTimeout(function(){
                document.querySelector('section#score div').style.setProperty('background-color', 'rgba(211,211,211, 0.75)')
            },1000);

            this.lives--;
            this.showLives();


            if (this.furry.x > 9){
                this.furry.direction = 'left'
            }
            else if (this.furry.x < 0){
                this.furry.direction = 'right'
            }
            else if (this.furry.y > 9){
                this.furry.direction = 'up'
            }
            else if (this.furry.y < 0){
                this.furry.direction = 'down'
            }

        }
    };

    this.showScore = function(){

        document.querySelector('#scoreNum').innerText = this.score;
    };

    this.increaseSpeed = function (){

        if (this.levelUp === 3){
            this.speed = this.speed -50;
            this.levelUp = 4;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('MUSISZ JEŚĆ SZYBCIEJ!',1000)

        }
        else if (this.levelUp === 7){

            this.speed = this.speed -50;
            this.levelUp = 8;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('JESZCZE SZYBCIEJ!',1000)
        }
        else if (this.levelUp === 11){
            this.speed = this.speed -50;
            this.levelUp = 12;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('SZAMKAJ, SZAMKAJ!',1000)
        }
        else if (this.levelUp === 15){
            this.speed = this.speed -50;
            this.levelUp = 16;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('WCINAJ PIELUCHO, WCINAJ!',1000)
        }

        else if (this.levelUp === 19){
            this.speed = this.speed -50;
            this.levelUp = 20;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('TURBO ŻARŁO!',1000)
        }

        else if (this.levelUp === 23){
            this.speed = this.speed -50;
            this.levelUp = 24;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('CHLEWISZON NA POTĘGĘ!',1000)
        }

        else if (this.levelUp === 27){
            this.speed = this.speed -50;
            this.levelUp = 28;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('MAŁY PROSIAK MODE ON!',1000)
        }

        else if (this.levelUp === 31){
            this.speed = this.speed -50;
            this.levelUp = 32;
            this.level++;
            this.showLevel();
            clearInterval(this.idSetInterval);
            this.startGame();

            this.showAlert('CHRUUUUUUUUUMMM!',1000)
        }
    };

    this.showAlert = function(text,time){

        var levelUpAlert = document.createElement('div');
        levelUpAlert.id = 'alert';
        levelUpAlert.innerText = text;
        document.querySelector('#score').appendChild(levelUpAlert);

        setTimeout(function(){
            document.querySelector('#score').removeChild(levelUpAlert)
        },time);
    };

    this.gameOverScore = function (){
        if (this.score < -20 || this.lives === 0){
            clearInterval(this.idSetInterval);
            this.showAlert("GAME OVER, OINK OINK",5000)

        }
    };

    this.showLives = function(){
        document.querySelector('#lives').innerText = this.lives;

    };

    this.showLevel = function(){
        document.querySelector('#level').innerText = this.level;
    }

}





var game = new Game();

game.showFurry();
game.showCoin();
game.startGame();
