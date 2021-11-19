export default class DiceHelper {
  /**
   * Checks if an expression is a valid dice expression
   * @param expr The expression that needs to be evaluated
   * @returns True if valid
   */
  evaluate(expr: string): boolean {
    const regex = /[0-9]*(d[1-9]+)?(\+[0-9]*)*/gm;
    return regex.test(expr);
  }

  /**
   * Calculates the result for a dice expression
   * @param expr The expression that we want to parse
   * @returns The result or 0 if the expression is invalid
   */
  parse(expr: string): number {
    if (!this.evaluate(expr)) {
      return 0;
    }

    let total = 0;
    const additions = expr.split("+");
    additions.forEach((addition) => {
      total += this.parseSubstractionHelper(addition);
    });
    return total;
  }

  private parseSubstractionHelper(expr: string) {
    const substractions = expr.split("-");

    if (substractions.length === 1) {
      // There is no minus sign
      // Just parse the dice or number
      return this.parseDiceHelper(expr);
    }

    // There is at list one minus sign
    let first = true;
    let total = 0;
    substractions.forEach((substraction) => {
      if (first) {
        total = this.parseDiceHelper(substraction);
        first = false;
      } else {
        total -= this.parseDiceHelper(substraction);
      }
    });
    return total;
  }

  private parseDiceHelper(expr: string) {
    let result = 0;
    if (expr.indexOf("d") === -1) {
      result = +expr;
    } else {
      const dice = expr.split("d");
      let count = 0;
      let sides = 0;
      if (dice[0] === "") {
        count = 1;
        sides = +dice[1];
      } else {
        count = +dice[0];
        sides = +dice[1];
      }
      for (let i = 0; i < count; i++) {
        result += DiceHelper.roll(sides);
      }
    }
    return result;
  }

  /**
   * Roll a dice
   * @param max The sides of the dice
   * @returns The result of the roll
   */
  static roll(sides: number): number {
    return Math.floor(Math.random() * sides + 1);
  }

  /**
   * Rolls multiple dice with the same amount of sides
   * @param sides The sides of the dice
   * @param numberOfDice How many dice should be rolled
   * @returns The result of the roll
   */
  static rollMultiple(sides: number, numberOfDice: number): number {
    const max = sides * numberOfDice;
    const min = numberOfDice;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
