
export function getSymbolNames(symbols) {
  let names = [];
  symbols.forEach(element => {
    names.push(element["1. symbol"]);
  });
  return names;
}

export function isSymbolAdded(symbols, symbol) {
  let found = false
  symbols.forEach(element => {
    if (element["1. symbol"].toLowerCase() === symbol["1. symbol"].toLowerCase()) {
      found = true;
    }
  });
  return found;
}

export function deleteSymbol(symbols = [], symbolName) {
  return symbols.filter(symbol =>
    symbol["1. symbol"].toLowerCase() !== symbolName.toLowerCase()
  );
}