import DiceHelper from "@/helpers/DiceHelper";

interface Combination {
  difficulty: number;
  combination: string;
  dc: number;
}

const options: string[] = ["T", "D", "K"];

function generateCombination(difficulty: number): Combination {
  const steps: string[] = [];
  for (let i = 0; i < difficulty; ++i) {
    steps.push(options[DiceHelper.roll(3) - 1]);
  }

  return {
    difficulty: difficulty,
    combination: steps.join("."),
    dc: 10 + 2 * difficulty,
  };
}

export { Combination, generateCombination };
