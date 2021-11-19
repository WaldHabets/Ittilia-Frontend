export default class MonData {
  cr = 0;
  hp = "";
  hpAvg = 0;
  pb = 0;
  ac = 0;

  str = 0;
  get strMod(): number {
    return this.mod(this.str);
  }
  dex = 0;
  get dexMod(): number {
    return this.mod(this.dex);
  }
  con = 0;
  get conMod(): number {
    return this.mod(this.con);
  }
  int = 0;
  get intMod(): number {
    return this.mod(this.int);
  }
  wis = 0;
  get wisMod(): number {
    return this.mod(this.wis);
  }
  cha = 0;
  get chaMod(): number {
    return this.mod(this.cha);
  }

  damageDice = 1;
  attackDice = 1;
  attacks = 1;
  get maxDamageDiceAttack(): number {
    return this.attackDice + this.attacks;
  }
  get maxDamageDiceAction(): number {
    return this.attackDice;
  }

  saves = {
    fort: 0,
    refl: 0,
    will: 0,
  };

  private mod(value: number): number {
    return Math.floor(value / 2) - 5;
  }
}
