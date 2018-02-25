import { ADD_SYMBOL, UPDATE_SYMBOLS, UPDATING, REMOVE_SYMBOL } from '../constants';

function getSymbolsFromLocalStorage() {
  let symbols = localStorage.getItem('symbols')
  return JSON.parse(symbols) || [];
}

function deleteSymbol(symbols = [], symbolName) {
  return symbols.filter(symbol =>
    symbol["1. symbol"].toLowerCase() !== symbolName.toLowerCase()
  );
}

let symbols = getSymbolsFromLocalStorage();
let alphaStore = {
  isUpdating: false,
  nextUpdate: new Date(),
  symbols
}

export default (state = alphaStore, action) => {
  let result = Object.assign({}, {
    isUpdating: state.isUpdating,
    symbols: state.symbols
  });
  switch (action.type) {
    case ADD_SYMBOL:
      let { symbol } = action;
      result.symbols = [...state.symbols, symbol];
      break;
    case UPDATE_SYMBOLS:
      result.symbols = action.symbols;
      break;
    case UPDATING:
      result.isUpdating = action.status;
      break;
    case REMOVE_SYMBOL:
      result.symbols = deleteSymbol(state.symbols, action.symbolName);
      break;
    default:
      break;
  }
  console.log('updating state', state, action);
  localStorage.setItem('symbols', JSON.stringify(result.symbols));
  return result;
}