import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeSymbol } from '../actions';

class SymbolList extends Component {

  removeSymbol(symbolName) {
    this.props.removeSymbol(symbolName);
  }

  render() {
    return (
      <div className='symbol-list'>
        {
          this.props.symbols.map((symbol, index) => {
            return (
              <div className='symbol-list-item row' key={index}>
                <div className='col-sm-6'> {symbol['1. symbol']} </div>
                <div className='col-sm-5'> {symbol['2. price']} USD</div>
                <div className='col-sm-1'>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={() => this.removeSymbol(symbol['1. symbol'])}
                  ><i className='fa fa-trash'></i></button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { symbols } = state;
  console.log('state IN LIST', state);
  return {
    symbols
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeSymbol}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SymbolList)
