function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function calcInterval(speed) {
  return randomInt(25, 100) - randomInt(0, speed);
}

function attack(attacker, defender) {
  defender.loseLife(defender.defend(attacker.attack(defender)));
}

const Character = function (power, armour, attackSpeed, name, characterClass) {
  const lifeList = {assassin: 60, mage: 80, fighter: 120, cleric: 100};

  this.characterClass = characterClass
  this.life = lifeList[this.characterClass];
  this.power = power;
  this.armour = armour;
  this.attackSpeed = attackSpeed;
  this.name = name;
}

Character.prototype.getDamage = function () {
  let damage = randomInt(0, this.power);

  // Fighter specialty
  if (this.characterClass === 'fighter') {
    damage = Math.floor(damage * 1.25);
  }

  // Knight Specialty
  // ##################################

  // Assassin Specialty
  if (this.characterClass === 'assassin' && Math.random() < 0.25) {
    damage += randomInt(0, this.power);
    console.log(`${this.name} gets a DOUBLE ATTACK!`);
  }

  return damage;
}

Character.prototype.blockDamage = function (damage) {
  let actualDamage = damage - randomInt(0, this.armour);

  // mage specialty
  if (this.characterClass === 'mage' && Math.random() < 0.25) {
    console.log(`${this.name} DODGED!`);

    return 0;
  }
    
  // cleric specialty
  if (this.characterClass === 'cleric') {
    actualDamage = Math.floor(damage / 1.25); 
  }

  return actualDamage > 0 ? actualDamage : 0;
}

function battle(char0, char1) {
  const chars = [char0, char1];
  const priorities = [calcInterval(chars[0].attackSpeed), calcInterval(chars[1].attackSpeed)];
  let keyAtt;
  let keyDef;
  
  // Moved the blah is battling blah here, it works for every match so it works better here imo.
  console.log(`${char0.name} is battling ${char1.name}!`);
  while (chars[0].life > 0 && chars[1].life > 0) {
    /**
    * If 2 chars have the same priority, the result must be determined randomly;
    * otherwise one of them will have slightly higher chance to win.
    */
    if (priorities[0] < priorities[1]) {
      [keyAtt, keyDef] = [0, 1];
    } else if (priorities[0] > priorities[1]) {
      [keyAtt, keyDef] = [1, 0];
    } else {
      keyAtt = Math.random() < 0.5 ? 0 : 1;
      keyDef = keyAtt === 0 ? 1 : 0;
    }

    attack(chars[keyAtt], chars[keyDef]);
    priorities[keyAtt] += calcInterval(chars[keyAtt].attackSpeed);
  }

  const winner = char0.life > 0 ? char0 : char1;

  console.log(`${winner.name} wins the Battle!`);
}

// An arena function eh? 
function test(charA, charB, repeatTimes) {
  const startTime = Date.now();
  const maxLifeA = charA.life;
  const maxLifeB = charB.life;

  let aWins = 0;
  let bWins = 0;

  for (let i = 0; i < repeatTimes; i++) {
    battle(charA, charB) === charA ? aWins++ : bWins++;

    charA.life = maxLifeA;
    charB.life = maxLifeB;
  }

  console.log(`${charA.name} wins ${aWins} : ${charB.name} wins ${bWins}. Time spent: ${(Date.now() - startTime)}ms`);
}