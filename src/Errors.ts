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
  Errors
}