function spreadArgs(fn: Function) {
  return function spread(args: any) {
    return fn(...args);
  };
}

function unspreadArgs(fn: Function) {
  return function unspread(...args: any) {
    return fn(args);
  };
}
