// Demli character sheet:
// Class: Fighter
// Power: 40
// Armour: 9
// Speed: 1

// Character Constructor: name of character
// ### Demli constructor and prototypes ###
const Demli = function(power, armour, attackSpeed, name, characterClass){
  Character.call(this, power, armour, attackSpeed, name, characterClass);
  this.shieldColor = "Red";
  
}

// have to reassign the prototype methods BEFORE you add new methods to the Demli prototype.
Demli.prototype = Object.create(Character.prototype);
Demli.prototype.constructor = Demli;

Demli.prototype.attack = function(opponentObject){
  /*
    attack - a function that accepts 1 argument, the opponent object. Inside this method, you must call the getDamage method on your objects prototype. You inherit this method from the character prototype. The getDamage method will tell you how much potential damage you can deal your opponent on this attack. Your attack method must return the potential damage amount.
    Prints out some interesting information - Which 2 characters are battling, who attacked whom and for how much potential damage.
  */
  let demliAttackDamage = this.getDamage();

  // blah character is battling blah! I place this console log in the assignment3battle script so it only displays once.
  // blah attacked blah! for blah damage!
  console.log(`${this.name} attacked ${opponentObject.name} for ${demliAttackDamage} damage`);

  // return potential damage amount
  return demliAttackDamage;
}

Demli.prototype.defend = function(totalDamage){
  /*
    defend - a function that accepts 1 argument, the damage amount. Inside this method, you must call the blockDamage method on your objects prototype. blockDamage accepts 1 argument, the damage amount. You inherit this method from the character prototype. The blockDamage method will determine how much of the potential damage you block with your armour, and will return the actual total damage your character will take in the battle. Your defend method must return this total damage amount.
    It should also print out your characters name and how much damage was attempted, and how much was blocked. Print this out to the console.
  */
  let demliBlockedDamage = this.blockDamage(totalDamage);
  let blockedDamage = totalDamage - demliBlockedDamage;
  
  console.log(`${this.name} blocked ${blockedDamage} damage, taking only ${demliBlockedDamage} damage.`);
  
  // returns the amount of damage my character took
  return demliBlockedDamage;
}

Demli.prototype.loseLife = function(demliBlockedDamage){
  // Just using DemliBlockedDamage for clarity, otherwise it'd be totalDamage
  let lifeLost = this.life;
  this.life -= demliBlockedDamage;
  lifeLost = lifeLost - this.life;
  
  // check if life is less then 0, if so he's dead and there's no need to display a negative life. Else continue battling.
  if(this.life <= 0){
    console.log(`${this.name}'s HP is less than 0. ${this.name} has been defeated!`); 
  } else {
    console.log(`${this.name} lost ${lifeLost} HP and has ${this.life} HP left.`);
  }
}
//########################################

// Character Object 
// Finally, create your object using your constructor, distribute your 50 points as you see fit, max 25 per trait.
//               Power, armour, speed
let demli = new Demli(23, 2, 25, "Demli", "fighter");

// ###### USAGE i.e. run match ########
battle(grandius, demli);







