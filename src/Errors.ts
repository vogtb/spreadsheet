let NULL_ERROR = "#NULL!";
let DIV_ZERO_ERROR = "#DIV/0!";
let VALUE_ERROR = "#VALUE!";
let REF_ERROR = "#REF!";
let NAME_ERROR = "#NAME!";
let NUM_ERROR = "#NUM!";
let NA_ERROR = "#N/A";
let PARSE_ERROR = "#ERROR";

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

class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = PARSE_ERROR;
  }
}

/**
 * Constructs an error by error name.
 * @param {string} name - Name of error. If not one of DIV_ZERO_ERROR, NULL_ERROR, VALUE_ERROR, REF_ERROR, NAME_ERROR,
 * NUM_ERROR,NA_ERROR, or PARSE_ERROR, will default to ParseError.
 * @param {string} msg - Message for error, will default to empty string.
 * @returns {Error}
 */
function constructErrorByName(name : string, msg? : string) : Error {
  msg = msg || "";
  switch (name) {
    case DIV_ZERO_ERROR:
      return new DivZeroError(msg);
    case NULL_ERROR:
      return new NullError(msg);
    case VALUE_ERROR:
      return new ValueError(msg);
    case REF_ERROR:
      return new RefError(msg);
    case NAME_ERROR:
      return new NameError(msg);
    case NA_ERROR:
      return new NAError(msg);
    case NUM_ERROR:
      return new NumError(msg);
    default:
      return new ParseError(msg);
  }
}

export {
  DIV_ZERO_ERROR,
  NULL_ERROR,
  VALUE_ERROR,
  REF_ERROR,
  NAME_ERROR,
  NUM_ERROR,
  NA_ERROR,
  PARSE_ERROR,
  DivZeroError,
  NullError,
  ValueError,
  RefError,
  NameError,
  NumError,
  NAError,
  ParseError,
  constructErrorByName
}