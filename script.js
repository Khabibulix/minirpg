//DOM GETTERS
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
	var enemyHP = document.getElementById("enemyHP");

//Variables Player
	var playerHp = 100;
	var playerAtk = 15;
	var playerExp = 0;
	var nextLevel = 100;
	var level = 0;

//Variables Game
	var compteur = 0;
	var orcsKilled = 0;
	var commandantsOrcs = 0;
	var championsOrcs = 0;
	var lordsOrcs = 0;
	var dragonsKilled = 0;
	var save = [];
	var buff = 0;

//Variables Monster
	var monsterHp = 100;
	var monsterHpMax = 100;
	var monsterAtk = 1;
	var expPerMonster = 100;

class Monster { // Generate a new monster based on the defined stats.
    constructor (monsterHp, monsterAtk, exp, monsterHpMax){
        this.monsterHp = monsterHp;
		this.monsterHpMax = monsterHp;
        this.monsterAtk = monsterAtk;
        this.exp = expPerMonster;    
    }
}

function Randomizer(x){ //Generate a random value.
   var r = Math.floor(x * Math.random());
   return r; 
}

//Objets Orcs, du plus faible au plus puissant
var orc = new Monster(100, 15, 15);
                      
//Système de Combat
attack.addEventListener("click", function attack(){
    monsterHp =  monsterHp - playerAtk;
	enemyHP.max = monsterHpMax;
	enemyHP.value = monsterHp;
    compteur++;
	playerHp -= monsterAtk;
	hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
    if (monsterHp < 0){
        log.value = "";
        log.value = "Vous avez vaincu l'ennemi, bravo! \nMais en voici un autre! ";
        expGained();
		nouveauMonstre(orc);
        log.value = "Un orc apparaît, prenez garde!";
		orcsKilled++;
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
            nextLevel += 200 + compteur;
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

function nouveauMonstre(x){
        monsterAtk = x.monsterAtk;
        monsterHp = x.monsterHp;
		monsterHpMax = x.monsterHp;
        expPerMonster = x.exp;
		enemyHP.max = x.monsterHpMax;
		enemyHP.value = x.monsterHp;
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
    playerHp = 100;
    playerAtk = 15;
    playerExp = 0;
    nextLevel = 100;
    level = 0;
    log.value = "";
    hp.innerHTML = "Vous avez " +playerHp+ " Points de vie!";
    exp.innerHTML = playerExp+ " Exp, " +nextLevel+ " pour le prochain niveau!"
    switchTo(orcImg);
}