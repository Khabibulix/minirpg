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
var dragon = document.getElementById("dragon");
var orc = document.getElementById("orc");

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
var monsterHp = Randomizer(100);
var monsterAtk = Randomizer(15);
var expPerMonster = Randomizer(45);

class Monster {
    constructor (monsterHp, monsterAtk, exp){
        this.monsterHp = monsterHp;
        this.monsterAtk = monsterAtk;
        this.exp = expPerMonster;
    }
}

//Sys Combat
attack.addEventListener("click", function attack(){
        monsterHp =  monsterHp - playerAtk;
        compteur++;
        var dex = Math.random();
        if(dex<0.5){
            playerHp -= monsterAtk;
            hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
        }
        if (monsterHp < 0){
            log.value = "Vous avez tué un orc, bravo! \nMais un autre apparait! ";
            var orc = new Monster(Randomizer(200), Randomizer(40), Randomizer(45));
            expGained();
            orcsKilled++;
        }
        if (playerHp <= 0){
            gameOver();
        }
        if (compteur > 15){
            var orc = new Monster(Randomizer(300), Randomizer(80), 25 + Randomizer(45));
            log.value = "Un commandant orc apparaît, prenez garde!";
            expGained();
            commandantsOrcs++;
        }
        if (compteur > 50){
            var orc = new Monster(Randomizer(700), Randomizer(160), 45 + Randomizer(45));
            log.value = "Un champion orc apparaît, prenez garde!";
            expGained();
            championsOrcs++;
        }
        if (compteur > 70){
            var orc = new Monster(Randomizer(1500), Randomizer(180), 95 + Randomizer(45));
            log.value = "Un seigneur orc apparaît, prenez garde!";
            lordsOrcs++;
        }
        if (compteur >= 100){
            switchTo(dragon);
            var dragonM = new Monster(1400 + Randomizer(2800),200 + Randomizer(200), 145 + Randomizer(60));
            log.value = "Voici Glaurung, le maître de ces lieux!";
            if (dragonM.monsterHp <= 0){
                Victory();
            }
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
        playerExp += expPerMonster;
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

//victoire
function Victory(){
    alert("Vous avez réussi à vaincre Glaurung, aventurier, félicitations!");
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
    unninja(menu);
    one.addEventListener("click", function onefunction(){
        playerHp += 200;
        hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
        ninja();
        clear(two);
        clear(three);
        });
    two.addEventListener("click", function twofunction(){
        playerAtk += Randomizer(10);
        alert("Votre attaque a augmenté de : " +Randomizer(10))
        ninja();
        clear(one);
        clear(three);
        });
    three.addEventListener("click", function threefunction(){
        bisou++;
        alert("Voici un bisou rien que pour vous!");
        ninja();
        clear(two);
        clear(one);
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

//clear

function clear(x){
    x.removeEventListener("click");
}

//changing monster

function switchTo(x){
    var r = x.style.visibility="visible";
    var r2 = x.style.position="absolute";
    return r, r2;
}

