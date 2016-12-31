/**
 * A1-notation style cell id. Used to index the cells.
 * */
class A1CellKey {
  private x: number;
  private y: number;
  private key: string;

  constructor(key: string) {
    this.key = key;
    var row = parseInt(key.match(/\d+$/)[0], 10);
    this.x = lettersToNumber(key.replace(row.toString(), ''));
    this.y = row - 1;
  }
  static of(x: number, y: number): A1CellKey {
    return new A1CellKey(numberToLetters(x+1) + (y+1).toString());
  }
  toString(): string {
    return this.key;
  }
  getX(): number {
    return this.x;
  }
  getY(): number {
    return this.y;
  }
}

function lettersToNumber(letters: string): number {
  return letters.toLowerCase().charCodeAt(0) - 97;
}

function numberToLetters(num: number): string {
  let mod = num % 26,
    pow = num / 26 | 0,
    out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
  return pow ? numberToLetters(pow) + out : out;
}

export {
  A1CellKey
}