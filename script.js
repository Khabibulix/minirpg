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
var orcHp = Math.floor(100 * Math.random());
var orcAtk = Math.floor(15 * Math.random());
var expPerOrc = Math.floor(45 * Math.random());



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
            orcHp = Math.floor(200 * Math.random());
            orcAtk = Math.floor(40 * Math.random());
            expGained();
            orcsKilled++;
            timer();
        }
        if (playerHp <= 0){
            gameOver();
        }
        if (compteur > 15){
            orcHp = Math.floor(300 * Math.random());
            orcAtk = Math.floor(80 * Math.random());
            log.value = "Un commandant orc apparaît, prenez garde!";
            expPerOrc += 25;
            expGained();
            commandantsOrcs++;
            timer();
        }
        if (compteur > 40){
            orcHp = Math.floor(700 * Math.random());
            orcAtk = Math.floor(160 * Math.random());
            log.value = "Un champion orc apparaît, prenez garde!";
            expPerOrc += 45;
            expGained();
            championsOrcs++;
            timer();
        }
        if (compteur > 75){
            orcHp = Math.floor(1400 * Math.random());
            orcAtk = Math.floor(180 * Math.random());
            log.value = "Un seigneur orc apparaît, prenez garde!";
            expPerOrc += 95;
            expGained();
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
        playerAtk += Math.floor( 10 * Math.random());
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




