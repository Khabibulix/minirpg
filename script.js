//DOM GETTERS
var attack = document.getElementById("atk-btn");
var hp = document.getElementById("hp");
var expLog = document.getElementById("exp");
var log = document.getElementById("log");
var result = document.getElementById("results");
var one = document.getElementById("oneBtn");
var two = document.getElementById("twoBtn");
var three = document.getElementById("threeBtn");
var menu = document.getElementById("menu");
var dragonImg = document.getElementById("dragon");
var orcImg = document.getElementById("orc");
var enemyHP = document.getElementById("enemyHP");

//Variables Player
var playerHp = 200;
var playerAtk = 30;
var playerExp = 0;
var nextLevel = 100;
var level = 0;

//Variables Game
var compteur = 0;
var orcsKilled = 0;
var save = [];
var buff = 0;

//Orc-making
var monsterHp = Randomizer(100);
var monsterHpMax = monsterHp;
var monsterAtk = 11;
var exp = 40;

class Monster {
    constructor (monsterHp, monsterAtk, exp){
        this.monsterHp = monsterHp;
		this.monsterAtk = monsterAtk;
        this.exp = exp;
        
    }
}

function Randomizer(x){
   var r = Math.floor(x * Math.random());
   return r; 
}

//Objets Orcs, du plus faible au plus puissant
var orc1 = new Monster(monsterHp, monsterAtk, exp);
                      
//Système de Combat
attack.addEventListener("click", function attack(){
    monsterHp =  monsterHp - playerAtk;
	enemyHP.max = monsterHpMax;
	enemyHP.value = monsterHp;
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
                nouveauMonstre();
                log.value = "Un orc apparaît, prenez garde!";
                orcsKilled++;
            }
            else if ( compteur < 70){
                nouveauMonstre();
                log.value = "Un commandant orc apparaît, prenez garde!";
                commandantsOrcs++;
            }
            else if (compteur < 100){
                nouveauMonstre();
                log.value = "Un champion orc apparaît, prenez garde!";
                championsOrcs++;
            }
            else if (compteur < 150){
                nouveauMonstre();
                log.value = "Un lord orc apparaît, prenez garde!";
                lordsOrcs++;
            }
            else if (compteur >= 150){
                log.value = "Bien joué, André";
                victory();
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
   alert(save);
})

//XP
function expGained(){
        playerExp += exp;
        nextLevel -= playerExp;
        expLog.innerHTML = playerExp+ " Exp, " +nextLevel+ " pour le prochain niveau!"
        if(nextLevel < 0){
            init();
            up();
            level++;
            hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
            nextLevel += 200 + compteur;
            playerExp = 0;
            expLog.innerHTML = playerExp+ " Exp, " +nextLevel+ " pour le prochain niveau!"
        }
}

//mort
function gameOver(){
    alert("Vous avez succombé à la multitude d'ennemis, votre cadavre sera sûrement souillé, violé et démembré. Pas nécessairement dans cet ordre.");
    clear();
}

//victoire
function victory(){
    if (fin == true) {alert("D'autres monstres sont à venir, promis!")}
    else {clear();}
}

//Niv Config
function init(){
    if(nextLevel < 0){nextLevel = 0;}
}

//Up
function up(){
    alert("Vous avez gagné un niveau! GG! \n Appuyez sur le bouton 1 pour vous soigner! \n Appuyez sur le bouton 2 pour augmenter votre attaque! \n Appuyez sur le bouton 3 pour recevoir une bénédiction!");
    unbuttonninja()
    one.addEventListener("click", function onefunction(){
        playerHp += 100;
        hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
       	buttonninja()
    });
    two.addEventListener("click", function twofunction(){
		playerAtk *= 2;
		buttonninja()
		});
    three.addEventListener("click", function threefunction(){
        buff++;
        buffed(3);
        buttonninja()
    });
    timer();
}

//Btn Menu
function buttonninja(){
	attack.removeAttribute("disabled");
	one.disabled = true;
	two.disabled = true;
	three.disabled = true;
};
function unbuttonninja(){
	attack.disabled = true;
	one.removeAttribute("disabled");
	two.removeAttribute("disabled");
	three.removeAttribute("disabled");
};
    
//Timer
function timer(){
    setInterval(function(){
        log.value = "";
    }, 10000);
}

//changing monster
function switchTo(x){
    var r = x.style.visibility="visible";
    return r;
}

function nouveauMonstre(){
        monsterAtk = orc1.monsterAtk;
        monsterHp = orc1.monsterHp;
		monsterHpMax = orc1.monsterHp;
        exp = orc1.exp;
		enemyHP.max = monsterHpMax;
		enemyHP.value = monsterHp;
}

//Buff pour 3 tours
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
    expLog.innerHTML = playerExp+ " Exp, " +nextLevel+ " pour le prochain niveau!"
    switchTo(orcImg);
}