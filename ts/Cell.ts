class Cell {
  public formula: string;
  public value: string;
  public dependencies: Array<string>;
  public error: any;
  public id: string;
  public row: number;
  public col: number;
  constructor(formula: string, id: string) {
    this.formula = formula;
    this.value = "";
    this.dependencies = [];
    this.error = null;
    this.id = id;
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
}

export {
  Cell
}