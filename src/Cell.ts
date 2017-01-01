class Cell {
  private formula: string;
  private value: string;
  private dependencies: Array<string>;
  private error: any;
  private id: string;
  private row: number;
  private col: number;
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
  getDependencies() : Array<string> {
    return this.dependencies;
  }
  getColumn() : number {
    return this.col;
  }
  getRow() : number {
    return this.row;
  }
  getId() : string {
    return this.id;
  }
  setFormula(formula: string) {
    this.formula = formula;
  }
  getFormula() : string {
    return this.formula;
  }
  setValue(value: string) {
    this.value = value;
  }
  getValue() : string {
    return this.value;
  }
  setError(error: any) {
    this.error = error;
  }
  getError() : any {
    return this.error;
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