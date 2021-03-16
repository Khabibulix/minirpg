//DOM GET
var attack = document.getElementById("atk-btn");
var hp = document.getElementById("hp");
var exp = document.getElementById("exp");
var log = document.getElementById("log");
var result = document.getElementById("results");
var one = document.getElementById("oneBtn");
var two = document.getElementById("twoBtn");
var three = document.getElementById("threeBtn");
var menu = document.getElementById("menu");



//Var Player
var playerHp = 200;
var playerAtk = 30;
var playerExp = 0;
var nextLevel = 100;
var level = 0;


//Var Game
var compteur = 0;
var orcsKilled = 0;
var commandantsOrcs = 0;
var championsOrcs = 0;
var lordsOrcs = 0;
var save = [];
var bisou = 0;

//Random Orc
var orcHp = Randomizer(100);
var orcAtk = Randomizer(15);
var expPerOrc = Randomizer(45);

class Orc {
    constructor (orcHp, orcAtk, expPerOrc){
        this.orcHp = orcHp;
        this.orcAtk = orcAtk;
        this.exp = expPerOrc;
    }
}





//Sys Combat
attack.addEventListener("click", function attack(){
        orcHp =  orcHp - playerAtk;
        compteur++;
        var dex = Math.random();
        if(dex<0.3){
            playerHp -= orcAtk;
            hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
        }
        if (orcHp < 0){
            log.value = "Vous avez tué un orc, bravo! \nMais un autre apparait! ";
            var orc2 = new Orc(Randomizer(200), Randomizer(40), Randomizer(45));
            expGained();
            orcsKilled++;
            timer();
        }
        if (playerHp <= 0){
            gameOver();
        }
        if (compteur > 15){
            var orc2 = new Orc(Randomizer(300), Randomizer(80), 25 + Randomizer(45));
            log.value = "Un commandant orc apparaît, prenez garde!";
            expGained();
            commandantsOrcs++;
            timer();
        }
        if (compteur > 40){
            var orc2 = new Orc(Randomizer(700), Randomizer(160), 45 + Randomizer(45));
            log.value = "Un champion orc apparaît, prenez garde!";
            expGained();
            championsOrcs++;
            timer();
        }
        if (compteur > 75){
            var orc2 = new Orc(Randomizer(1500), Randomizer(180), 95 + Randomizer(45));
            log.value = "Un seigneur orc apparaît, prenez garde!";
            expPerOrc += 95;
            championsOrcs++;
            timer();
        }
});

//Log de jeu
result.addEventListener("click", function display(){
   save[0] = "Niveau max atteint: " +level;
   save[1] = "\nNombre d'orcs tués: " +orcsKilled;
   save[2] = "\nBisous obtenus: " +bisou;
   save[3] = "\nTours joués: " +compteur;
   save[4] = "\nNombre de commandants orcs tués: " +commandantsOrcs;
   save[5] = "\nNombre de champions orcs tués: " +championsOrcs;
   save[6] = "\nNombre de seigneurs orcs tués: " +lordsOrcs;
   alert(save);
})

//XP
function expGained(){
        playerExp += expPerOrc;
        nextLevel -= playerExp;
        exp.innerHTML = playerExp+ " Exp, " +nextLevel+ " pour le prochain niveau!"
        if(nextLevel < 0){
            init();
            up();
            level++;
            hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
            nextLevel += 200;
            playerExp = 0;
            exp.innerHTML = playerExp+ " Exp, " +nextLevel+ " pour le prochain niveau!"
        }
}

//mort
function gameOver(){
    alert("Vous avez succombé à la multitude d'orcs, votre cadavre sera sûrement souillé, violé et démembré. Pas nécessairement dans cet ordre.");
}

//Niv Config
function init(){
    if(nextLevel < 0){
        nextLevel = 0;
    }
}

//Up
function up(){
    log.value = "Vous avez gagné un niveau! GG! \n Appuyez sur le bouton 1 pour vous soigner! \n Appuyez sur le bouton2 pour augmenter votre attaque! \n Appuyez sur le bouton 3 pour recevoir un bisou!" ;
    unninja();
    one.addEventListener("click", function onefunction(){
        playerHp = 200;
        hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
        ninja();
    });
    two.addEventListener("click", function twofunction(){
        playerAtk += Randomizer(10);
        ninja();
    });
    three.addEventListener("click", function threefunction(){
        bisou++;
        alert("Voici un bisou rien que pour vous!");
        ninja();
    });
    timer();
}

//Btn Menu
function ninja(){
    menu.style.visibility="hidden";
};

function unninja(){
    menu.style.visibility="visible";
};
    
//Timer

function timer(){
    setInterval(function(){
        log.value = "";
    }, 10000);
}

function Randomizer(x){
   var r = Math.floor(x * Math.random());
   return r; 
}




