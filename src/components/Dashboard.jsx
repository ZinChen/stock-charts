import React, { Component } from 'react';
import alpha from '../alphavantage';
import SymbolList from './SymbolList'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSymbols, addSymbol, updating } from '../actions';
import { getSymbolNames } from '../helpers';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSymbols: '',
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.updateSymbols();
  }

  updateSymbols() {
    if (!this.props.isUpdating) {
      let symbolNames = [`msft`, `aapl`];
      let symbols = this.props.symbols;
      if (symbols && symbols.length) {
        symbolNames = getSymbolNames(this.props.symbols);
      }

      this.props.updating(true);
      alpha.data.batch(symbolNames).then(data => {
        this.props.updateSymbols(data['Stock Quotes']);
      });
    }
  }

  addSymbol() {
    console.log('state', this.state);
    let newSymbols = this.state.newSymbols.split(',').map(item => item.trim());
    if (newSymbols && newSymbols.length) {
      alpha.data.batch(this.state.newSymbols)
        .then(data => {
          data['Stock Quotes'].forEach(symbol => {
            this.props.addSymbol(symbol);
          });
        })
        .catch(error => {
          this.setState({errorMessage: 'Some of symbols does not exists'});
        })
    } else {
      this.setState({errorMessage: 'Wrong input syntax'});
    }

    this.setState({newSymbols: ''})
  }

  render() {
    return (
      <div>
        <div className='form-inline'>
          <input
            className='form-control'
            type='text'
            placeholder='MSFT, AAPL'
            value={this.state.newSymbols}
            onChange={event => this.setState({newSymbols: event.target.value.toUpperCase()})}
            onKeyPress={e => e.key === 'Enter' ? this.addSymbol() : null }
          />
          <button
            className='btn btn-primary'
            type='button'
            onClick={() => this.addSymbol()}
          >Add</button>
        </div>
        {this.state.errorMessage}
        <SymbolList />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateSymbols, addSymbol, updating}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
