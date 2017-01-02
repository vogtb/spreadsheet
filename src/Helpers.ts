var Helpers = {
  number: function (num) {
    var reg = new RegExp('(^[-+]?([0-9]+)(\.[0-9]+)?)$');
    switch (typeof num) {
      case 'number':
        return num;
      case 'string':
        var t = num.trim();
        if (!isNaN(t)) {
          if (reg.test(t.trim())) {
            if (t.indexOf('.') > -1) {
              return parseFloat(t);
            } else {
              return parseInt(t, 10);
            }
          } else {
            return 0;
          }
        }
    }
    return num;
  }
};

export {
  Helpers
}