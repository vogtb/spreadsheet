declare let Formulas: {
    exists: (fn: string) => boolean;
    get: (fn: string) => any;
    isTryCatchFormula: (fn: string) => boolean;
};
export { Formulas };
