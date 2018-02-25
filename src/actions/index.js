import { ADD_SYMBOL, UPDATE_SYMBOLS, UPDATING, REMOVE_SYMBOL } from '../constants';

export function addSymbol(symbol) {
  return {
    type: ADD_SYMBOL,
    symbol
  }
}

export function updateSymbols(symbols) {
  return {
    type: UPDATE_SYMBOLS,
    symbols
  }
}

export function updating(status) {
  return {
    type: UPDATING,
    status
  }
}

export function removeSymbol(symbolName) {
  return {
    type: REMOVE_SYMBOL,
    symbolName
  }
}