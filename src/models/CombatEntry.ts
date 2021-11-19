export default class CombatEntry {
  name = "";
  initiative = 0;
  ac = 0;
  mr = 0;
  xp = 0;
  pp = 0;
  moraleFails = 0;
  maximum_hp = 0;
  curent_hp = 0;
  notes = "";
  dead = false;
  isturn = false;
  isplayer = false;
  isFleeing = false;
  allegiance = "enemy";

  static create(): CombatEntry {
    const entry = new CombatEntry();

    entry.name = "";
    entry.initiative = 0;
    entry.ac = 0;
    entry.mr = 0;
    entry.xp = 0;
    entry.pp = 0;
    entry.moraleFails = 0;
    entry.maximum_hp = 0;
    entry.curent_hp = 0;
    entry.notes = "";
    entry.dead = false;
    entry.isturn = false;
    entry.isplayer = false;
    entry.isFleeing = false;
    entry.allegiance = "enemy";

    return entry;
  }
}
