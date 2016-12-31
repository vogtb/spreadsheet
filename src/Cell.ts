import {A1CellKey} from "./A1CellKey";

class Cell {
  public formula: string;
  public value: string;
  public dependencies: Array<string>;
  public error: any;
  public id: string;
  public row: number;
  public col: number;
  constructor(formula: string, id: string) {
    var key = new A1CellKey(id);

    this.formula = formula;
    this.value = "";
    this.dependencies = [];
    this.error = null;
    this.id = id;
    this.row = key.getY();
    this.col = key.getX();
  }
  updateDependencies(dependencies: Array<string>) {
    for (var index in dependencies) {
      if (this.dependencies.indexOf(dependencies[index]) === -1) {
        this.dependencies.push(dependencies[index]);
      }
    }
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
}

export {
  Cell
}