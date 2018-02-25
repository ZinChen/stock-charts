
export function getSymbolNames(symbols) {
  let names = [];
  symbols.forEach(element => {
    names.push(element["1. symbol"]);
  });
  console.log(names);
  return names;
}
