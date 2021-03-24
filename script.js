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
var dragonImg = document.getElementById("dragon");
var orcImg = document.getElementById("orc");

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
var dragonsKilled = 0;
var save = [];
var buff = 0;

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

var orc1 = new Monster(Randomizer(100), Randomizer(20), Randomizer(15));
var orc2 = new Monster(Randomizer(300), Randomizer(40), 25 + Randomizer(25));            
var orc3 = new Monster(Randomizer(400), Randomizer(90), 45 + Randomizer(45));
var orc4 = new Monster(Randomizer(1800), Randomizer(140), 95 + Randomizer(85));
var dragon1 = new Monster(1400 + Randomizer(4800),200 + Randomizer(200), 0);
                      
//Sys Combat
attack.addEventListener("click", function attack(){
    monsterHp =  monsterHp - playerAtk;
    compteur++;
    var dex = Math.random();
    if(dex<0.8){
        playerHp -= monsterAtk;
        hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
    }
    if (monsterHp < 0){
        log.value = "";
        log.value = "Vous avez vaincu l'ennemi, bravo! \nMais en voici un autre! ";
        expGained();
            if ( compteur < 50){
                nouveauMonstre(orc1);
                log.value = "Un orc apparaît, prenez garde!";
                switchTo(orcImg);
                orcsKilled++;
            }else if ( compteur < 70){
                nouveauMonstre(orc2);
                log.value = "Un commandant orc apparaît, prenez garde!";
                switchTo(orcImg);
                commandantsOrcs++;
            }else if (compteur < 100){
                nouveauMonstre(orc3);
                log.value = "Un champion orc apparaît, prenez garde!";
                championsOrcs++;
            }else if (compteur < 150){
                nouveauMonstre(orc4);
                log.value = "Un lord orc apparaît, prenez garde!";
                lordsOrcs++;
            } else if (compteur >= 150){
                switchTo(dragonImg);
                nouveauMonstre(dragon1);
                log.value = "Voici Glaurung, le maître des lieux, fuyez ou combattez!";
                dragonsKilled++
                if (dragonsKilled = 1){
                    victory();
                }
            }

                }
        if (playerHp <= 0){
            gameOver();
        }
    
});


//Log de jeu
result.addEventListener("click", function display(){
   save[0] = "Niveau max atteint: " +level;
   save[1] = "\nNombre d'orcs tués: " +orcsKilled;
   save[2] = "\nBuffs obtenus: " +buff;
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
    alert("Vous avez succombé à la multitude d'ennemis, votre cadavre sera sûrement souillé, violé et démembré. Pas nécessairement dans cet ordre.");
    clear();
}

//victoire
function victory(){
   var fin = confirm("Vous avez réussi à vaincre Glaurung, aventurier, félicitations! Voulez-vous continuer?");
   if (fin == true) {
     alert("D'autres monstres sont à venir, promis!")   
    }else {
    clear();
    }
}

//Niv Config
function init(){
    if(nextLevel < 0){
        nextLevel = 0;
    }
}

//Up
function up(){
    alert("Vous avez gagné un niveau! GG! \n Appuyez sur le bouton 1 pour vous soigner! \n Appuyez sur le bouton 2 pour augmenter votre attaque! \n Appuyez sur le bouton 3 pour recevoir une bénédiction!");
    unninja(menu);
    one.addEventListener("click", function onefunction(){
        playerHp += 100;
        hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
        ninja();
    });
    two.addEventListener("click", function twofunction(){
        playerAtk *= 2;
        ninja();
    });
    three.addEventListener("click", function threefunction(){
        buff++;
        buffed(3);
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

//Random
function Randomizer(x){
   var r = Math.floor(x * Math.random());
   return r; 
}

//changing monster

function switchTo(x){
    var r = x.style.visibility="visible";
    return r;
}

function nouveauMonstre(x){
        monsterAtk = x.monsterAtk;
        monsterHp = x.monsterHp;
        expPerMonster = x.exp;
}

function buffed(){
    var y = compteur + 3;
    for (var n= compteur; n < y; n++ )
    monsterAtk = 0;
    hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";    
}

function clear(){
    compteur = 0;
    playerHp = 200;
    playerAtk = 30;
    playerExp = 0;
    nextLevel = 100;
    level = 0;
    log.value = "";
    hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
    exp.innerHTML = playerExp+ " Exp, " +nextLevel+ " pour le prochain niveau!"
    switchTo(orcImg);
}