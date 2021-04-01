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

//créa du joueur et des monstres
class Player{
	constructor(hp, atk, exp, nextLevel, currentLevel){this.hp = hp;this.atk = atk;this.exp = exp;this.nextLevel = nextLevel;this.currentLevel = currentLevel;}
	}


class Monster {
    constructor (monsterHp, monsterAtk, exp){this.monsterHp = monsterHp;this.monsterAtk = monsterAtk;this.exp = expPerMonster;}
    }

var myPlayer = new Player (200, 30, 0, 100, 0);


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

//Objets Orcs, du plus faible au plus puissant
var orc1 = new Monster(Randomizer(100), Randomizer(20), Randomizer(15));
var orc2 = new Monster(Randomizer(300), Randomizer(40), 25 + Randomizer(25));            
var orc3 = new Monster(Randomizer(400), Randomizer(90), 45 + Randomizer(45));
var orc4 = new Monster(Randomizer(1800), Randomizer(140), 95 + Randomizer(85));
var dragon1 = new Monster(1400 + Randomizer(4800),200 + Randomizer(200), 0);

function Randomizer(x){
   var r = Math.floor(x * Math.random());
   return r; 
}

//Système de Combat
attack.addEventListener("click", function attack(){
    monsterHp =  monsterHp - myPlayer.atk;
    compteur++;
    var dex = Math.random();
    if(dex<0.8){
        myPlayer.hp -= monsterAtk;
        hp.innerHTML = "Vous avez " +myPlayer.hp+ " Points de vie!";
    }
    if (myPlayer.hp <= 0){
            gameOver();
        }

    if (monsterHp < 0){
        log.value = "";
        log.value = "Vous avez vaincu l'ennemi, bravo! \nMais en voici un autre! ";
        expGained();
            if ( compteur < 50){nouveauMonstre(orc1); orcsKilled++;
                log.value = "Un orc apparaît, prenez garde!";                
            }
            else if ( compteur < 70){nouveauMonstre(orc2); commandantsOrcs++;                
                log.value = "Un commandant orc apparaît, prenez garde!";                
            }
            else if (compteur < 100){nouveauMonstre(orc3); championsOrcs++;                
                log.value = "Un champion orc apparaît, prenez garde!";                
            }
            else if (compteur < 150){nouveauMonstre(orc4); lordsOrcs++;                
                log.value = "Un lord orc apparaît, prenez garde!";                
            }
            else if (compteur >= 150){switchTo(dragonImg);nouveauMonstre(dragon1); dragonsKilled++;    
                log.value = "Voici Glaurung, le maître des lieux, fuyez ou combattez!";
                if (dragonsKilled = 1){
                    victory();
                }
            }
    }
});

function nouveauMonstre(x){
        monsterAtk = x.monsterAtk;
        monsterHp = x.monsterHp;
        expPerMonster = x.exp;
}


//changing monster displayed

function switchTo(x){
    var r = x.style.visibility="visible";
    return r;
}


//XP
function expGained(){
        myPlayer.exp += expPerMonster;
        myPlayer.nextLevel -= myPlayer.exp;
        exp.innerHTML = myPlayer.exp+ " Exp, " +myPlayer.nextLevel+ " pour le prochain niveau!"
        if(myPlayer.nextLevel < 0){
            if(myPlayer.nextLevel < 0){myPlayer.nextLevel = 0;}
            up();
            myPlayer.level++;
            hp.innerHTML = "Vous avez " +myPlayer.hp+ " Points de vie!";
            myPlayer.nextLevel += 200 + compteur;
            myPlayer.exp = 0;
            exp.innerHTML = myPlayer.exp+ " Exp, " +myPlayer.nextLevel+ " pour le prochain niveau!"
        }
}

//Up
function up(){
    alert("Vous avez gagné un niveau! GG! \n Appuyez sur le bouton 1 pour vous soigner! \n Appuyez sur le bouton 2 pour augmenter votre attaque! \n Appuyez sur le bouton 3 pour recevoir une bénédiction!");
    unninja(menu);
    one.addEventListener("click", function onefunction(){
    	myPlayer.hp += 100;
    	ninja();        
        hp.innerHTML = "Vous avez " +myPlayer.hp+ " Points de vie!";        
    });
    two.addEventListener("click", function twofunction(){
    	myPlayer.atk *= 2;
    	ninja();
    });
    three.addEventListener("click", function threefunction(){
    	buff++;
    	buffed(3);
    	ninja();        
    });
    timer();
}

//Buff pour 3 tours
function buffed(){
    var y = compteur + 3;
    for (var n= compteur; n < y; n++){
    monsterAtk = 0;
    hp.innerHTML = "Vous avez " +myPlayer.hp+ " Points de vie!";    
}

//Btn Menu
function ninja(){menu.style.visibility="hidden";};

function unninja(){menu.style.visibility="visible";};
    
//Timer
function timer(){
    setInterval(function(){
        log.value = "";
    }, 10000);
}




//mort
function gameOver(){
    alert("Vous avez succombé à la multitude d'ennemis, votre cadavre sera sûrement souillé, violé et démembré. Pas nécessairement dans cet ordre.");
    clear();
}

//victoire
function victory(){
   var fin = confirm("Vous avez réussi à vaincre Glaurung, aventurier, félicitations! Voulez-vous continuer?");
   if (fin) {
     alert("D'autres monstres sont à venir, promis!")   
    }else {
    clear();
    }
}

function clear(){
    compteur = 0;
    var futurePlayer = new Player (200, 30, 0, 100, 0);
    log.value = "";
    hp.innerHTML = "Vous avez " +futurePlayer.hp+ " Points de vie!";
    exp.innerHTML = futurePlayer.exp+ " Exp, " +futurePlayer.nextLevel+ " pour le prochain niveau!"
    switchTo(orcImg);
}

//Log de jeu
result.addEventListener("click", function display(){
   save[0] = "Niveau max atteint: " +myPlayer.level;
   save[1] = "\nNombre d'orcs tués: " +orcsKilled;
   save[2] = "\nBuffs obtenus: " +buff;
   save[3] = "\nTours joués: " +compteur;
   save[4] = "\nNombre de commandants orcs tués: " +commandantsOrcs;
   save[5] = "\nNombre de champions orcs tués: " +championsOrcs;
   save[6] = "\nNombre de seigneurs orcs tués: " +lordsOrcs;
   alert(save);
})