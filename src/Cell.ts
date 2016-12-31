class Cell {
  public formula: string;
  public value: string;
  public dependencies: Array<string>;
  public error: any;
  public id: string;
  public row: number;
  public col: number;
  constructor(id: string) {
    var key = parseKey(id);

    this.formula = null;
    this.value = "";
    this.dependencies = [];
    this.error = null;
    this.id = id;
    this.row = key.y;
    this.col = key.x;
  }
  updateDependencies(dependencies: Array<string>) {
    for (var index in dependencies) {
      if (this.dependencies.indexOf(dependencies[index]) === -1) {
        this.dependencies.push(dependencies[index]);
      }
    }
  }
  setFormula(formula: string) {
    this.formula = formula;
  }
  setValue(value: string) {
    this.value = value;
  }
  setError(error: any) {
    this.error = error;
  }
  getRenderedValue() : string {
    if (this.error !== null) {
      return this.value;
    }
    return this.error.toString()
  }
  toString() : string {
    return "id=" + this.id + ", value=" + this.value + ", formula=" + this.formula + ", error=" + this.error;
  }
}

function toNum(chr) {
  chr = chr.replace(/\$/g, '');
  var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

  for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
    result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
  }

  if (result) {
    --result;
  }

  return result;
}

function parseKey(cell) {
  var num = cell.match(/\d+$/),
    alpha = cell.replace(num, '');

  return {
    x: toNum(alpha),
    y: parseInt(num[0], 10) - 1
  };
}

export {
  Cell
}