var Errors = {
  errors: [
    {type: 'NULL', output: '#NULL'},
    {type: 'DIV_ZERO', output: '#DIV/0!'},
    {type: 'VALUE', output: '#VALUE!'},
    {type: 'REF', output: '#REF!'},
    {type: 'NAME', output: '#NAME?'},
    {type: 'NUM', output: '#NUM!'},
    {type: 'NOT_AVAILABLE', output: '#N/A!'},
    {type: 'ERROR', output: '#ERROR'}
  ],
  get: function (type) {
    var error = Errors.errors.filter(function (item) {
      return item.type === type || item.output === type;
    })[0];

    return error ? error.output : null;
  }
};

export {
  Errors
}