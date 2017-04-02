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


class NullError extends Error {
  constructor(message: string) {
    super(message);
    this.name = NULL_ERROR;
  }
}

class DivZeroError extends Error {
  constructor(message: string) {
    super(message);
    this.name = DIV_ZERO_ERROR;
  }
}

class ValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = VALUE_ERROR;
  }
}

class RefError extends Error {
  constructor(message: string) {
    super(message);
    this.name = REF_ERROR;
  }
}

class NameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = NAME_ERROR;
  }
}

class NumError extends Error {
  constructor(message: string) {
    super(message);
    this.name = NUM_ERROR;
  }
}

class NAError extends Error {
  constructor(message: string) {
    super(message);
    this.name = NA_ERROR;
  }
}

export {
  Errors,
  DIV_ZERO_ERROR,
  NULL_ERROR,
  VALUE_ERROR,
  REF_ERROR,
  NAME_ERROR,
  NUM_ERROR,
  NA_ERROR,
  DivZeroError,
  NullError,
  ValueError,
  RefError,
  NameError,
  NumError,
  NAError
}