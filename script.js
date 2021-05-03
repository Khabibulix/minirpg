
/*----------------------------------------------------------------
 *                       DOM GETTERS                              |
-----------------------------------------------------------------*/

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


/*----------------------------------------------------------------
 *                       Variables Joueur                         |
-----------------------------------------------------------------*/

var playerHp = 200;
var playerAtk = 30;
var playerExp = 0;
var nextLevel = 100;
var level = 0;


/*----------------------------------------------------------------
 *                       Variables Jeu                           |
-----------------------------------------------------------------*/

var compteur = 0;
var orcsKilled = 0;
var save = [];
var buff = 0;


/*----------------------------------------------------------------
 *                       Orc making                               |
-----------------------------------------------------------------*/

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


/*----------------------------------------------------------------
 *                       Objet orc                               |
-----------------------------------------------------------------*/

var orc1 = new Monster(monsterHp, monsterAtk, exp);
                      

/*----------------------------------------------------------------
 *                          COMBAT                               |
-----------------------------------------------------------------*/

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
                nouveauMonstre();
                log.value = "Un orc apparaît, prenez garde!";
                orcsKilled++;

            if (compteur >= 150){
                log.value = "Bien joué, André";
                victory();
            }

    }
        if (playerHp <= 0){
            gameOver();
        }
    
});

/*----------------------------------------------------------------
 *                           //Getters                            |
-----------------------------------------------------------------*/

function getplayerHp(){
    return playerHp;
}

function getplayerAtk(){
    return playerAtk;
}

function getplayerExp(){
    return playerExp;
}

function getnextLevel(){
    return nextLevel;
}

function monsterHp(){
    return monsterHp;
}

function monsterHpMax(){
    return monsterHpMax;
}

function monsterAtk(){
    return monsterAtk;
}


/*----------------------------------------------------------------
 *                       Print results                            |
-----------------------------------------------------------------*/

result.addEventListener("click", function display(){
   save[0] = "Niveau max atteint: " +level;
   save[1] = "\nNombre d'orcs tués: " +orcsKilled;
   save[2] = "\nBuffs obtenus: " +buff;
   save[3] = "\nTours joués: " +compteur;
   alert(save);
})


/*----------------------------------------------------------------
 *                              XP                               |
-----------------------------------------------------------------*/

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


/*----------------------------------------------------------------
 *                               MORT                             |
-----------------------------------------------------------------*/

function gameOver(){
    alert("Vous avez succombé à la multitude d'ennemis, votre cadavre sera sûrement souillé, violé et démembré. Pas nécessairement dans cet ordre.");
    clear();
}


/*----------------------------------------------------------------
 *                          VICTOIRE                              |
-----------------------------------------------------------------*/

function victory(){
    if (fin == true) {alert("D'autres monstres sont à venir, promis!")}
    else {clear();}
}


/*----------------------------------------------------------------
 *                          NIV CONFIG                             |
-----------------------------------------------------------------*/

function init(){
    if(nextLevel < 0){nextLevel = 0;}
}


/*----------------------------------------------------------------
 *                                UP                             |
-----------------------------------------------------------------*/

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


/*----------------------------------------------------------------
 *                              BTN MENU                          |
-----------------------------------------------------------------*/

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
    

/*----------------------------------------------------------------
 *                              TIMER                             |
-----------------------------------------------------------------*/

function timer(){
    setInterval(function(){
        log.value = "";
    }, 10000);
}


/*----------------------------------------------------------------
 *                       CHANGING MONSTER                         |
-----------------------------------------------------------------*/


function nouveauMonstre(){
        monsterAtk = orc1.monsterAtk;
        monsterHp = orc1.monsterHp;
		monsterHpMax = orc1.monsterHp;
        exp = orc1.exp;
		enemyHP.max = monsterHpMax;
		enemyHP.value = monsterHp;
}


/*----------------------------------------------------------------
 *                               BUFF                            |
-----------------------------------------------------------------*/

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
    hp.innerHTML = "Vous avez " +getplayerHp()+ " Points de vie!";
    expLog.innerHTML = playerExp+ " Exp, " +getnextLevel()+ " pour le prochain niveau!"
}