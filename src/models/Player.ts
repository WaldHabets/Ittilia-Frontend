export default class Player {
  name = "";
  ac = 0; // armor class
  hp = 0; // hit points
  pp = 0; // passive perception
  lvl = 1; // level
  spd = 30; // speed
  str = 0; // strength
  dex = 0; // dexterity
  con = 0; // consitution
  int = 0; // intelligence
  wis = 0; // wisdom
  cha = 0; // charisma

  /*
  constructor(obj: Record<string, any>) {
    if (typeof obj === "object") {
      this.name = obj.name;
      this.ac = obj.ac;
      this.hp = obj.hp;
      this.pp = obj.pp;
      this.lvl = obj.lvl;
      this.spd = obj.spd;
      this.str = obj.str;
      this.dex = obj.dex;
      this.con = obj.con;
      this.int = obj.int;
      this.wis = obj.wis;
      this.cha = obj.cha;
    }
  }
  */
}
