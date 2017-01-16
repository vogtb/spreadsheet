class CellError extends Error {
  public message: string;
  public text: string;
  constructor(message: string, text: string) {
    super(message);
    this.message = message;
    this.text = text;
  }
}

var NULL_ERROR = "#NULL!";
var DIV_ZERO_ERROR = "#DIV/0!";
var VALUE_ERROR = "#VALUE!";
var REF_ERROR = "#REF!";
var NAME_ERROR = "#NAME!";
var NUM_ERROR = "#NUM!";
var NA_ERROR = "#N/A";

var Errors = {
  errors: {
    'NULL': '#NULL',
    '#NULL': '#NULL',
    'DIV_ZERO': '#DIV/0!',
    '#DIV/0!': '#DIV/0!',
    'VALUE': '#VALUE!',
    '#VALUE!': '#VALUE!',
    'REF': '#REF!',
    '#REF!': '#REF!',
    'NAME': '#NAME?',
    '#NAME?': '#NAME?',
    'NUM': '#NUM!',
    '#NUM!': '#NUM!',
    'NOT_AVAILABLE': '#N/A!',
    '#N/A!': '#N/A!',
    '#N/A': '#N/A',
    'ERROR': '#ERROR',
    '#ERROR': '#ERROR'
  },
  get: function (type) {
    if (type in Errors.errors) {
      return Errors.errors[type];
    }
    return null;
  }
};

export {
  Errors,
  CellError,
  DIV_ZERO_ERROR,
  NULL_ERROR,
  VALUE_ERROR,
  REF_ERROR,
  NAME_ERROR,
  NUM_ERROR,
  NA_ERROR
}