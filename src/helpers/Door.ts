import { Combination, generateCombination } from "@/helpers/Combination";
import DiceHelper from "@/helpers/DiceHelper";

interface Door {
  material: string;
  ac: number;
  hp: number;
  locked: boolean;
  stuck: boolean;
  reinforced: boolean;
  secret: boolean;
  secretDC: number;
  large: boolean;
  lockCombination: Combination;
}

interface Material {
  name: string;
  ac: number;
}

const lockDifficulty: number[] = [3, 5, 7, 9, 11];
const secretDC: number[] = [5, 10, 15, 20, 25];
const materials: Material[] = [
  {
    name: "door-wood",
    ac: 15,
  },
  {
    name: "door-stone",
    ac: 17,
  },
  {
    name: "door-iron",
    ac: 19,
  },
  {
    name: "door-portcullis",
    ac: 19,
  },
];

function generateDoor(): Door {
  const locked = DiceHelper.roll(2) == 1;
  const stuck = DiceHelper.roll(8) == 1;
  const reinforced = DiceHelper.roll(4) == 1;
  const secret = DiceHelper.roll(8) == 1;
  const large = DiceHelper.roll(4) == 1;

  const material = materials[DiceHelper.roll(materials.length) - 1];
  const materialName = material.name;
  const ac = reinforced ? material.ac + 2 : material.ac;
  const hp = large
    ? DiceHelper.rollMultiple(10, 5)
    : DiceHelper.rollMultiple(8, 4);

  return {
    material: materialName,
    ac,
    hp,
    locked,
    stuck,
    reinforced,
    secret,
    secretDC: secretDC[DiceHelper.roll(secretDC.length) - 1],
    large,
    lockCombination: generateCombination(
      lockDifficulty[DiceHelper.roll(lockDifficulty.length) - 1]
    ),
  };
}

export { Door, generateDoor };
