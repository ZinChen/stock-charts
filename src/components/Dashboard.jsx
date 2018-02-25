import React, { Component } from 'react';
import alpha from '../alphavantage';
import SymbolList from './SymbolList'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSymbols, addSymbol, updating } from '../actions';
import { getSymbolNames, isSymbolAdded } from '../helpers';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSymbols: '',
      errorMessage: '',
      secondsToUpdate: 10
    }
  }

  componentDidMount() {
    this.updateSymbols();
    setInterval(() => {
      let left = this.state.secondsToUpdate;
      if (left) {
        this.setState({secondsToUpdate: left - 1});
      } else if (!this.props.isUpdating) {
        this.updateSymbols();
      }
    }, 1000);
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
        this.setState({secondsToUpdate: 10});
      });
    }
  }

  addSymbol() {
    this.setState({errorMessage: ''});
    let newSymbols = this.state.newSymbols.split(',').map(item => item.trim());
    if (newSymbols && newSymbols.length) {
      alpha.data.batch(this.state.newSymbols)
        .then(data => {
          data['Stock Quotes'].forEach(symbol => {
            if (!isSymbolAdded(this.props.symbols, symbol)) {
              this.props.addSymbol(symbol);
            } else {
              this.setState({errorMessage: 'Symbols already added'});
            }
          });
          if (data['Stock Quotes'].length !== newSymbols.length) {
            this.setState({errorMessage: 'Some of symbols does not exists'});
          }
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
    let updateButtonText = 'Update'
    if (this.props.isUpdating) {
      updateButtonText = <span><i className='fa fa-spinner spin'></i> Updating</span>
    }

    return (
      <div className='container symbols-container col-md-6'>
        <h1 className="text-center">Stock Charts</h1>
        <div className='form-inline add-symbols-form'>
          <label>Add symbols: </label>
          <input
            className='form-control'
            type='text'
            placeholder='MSFT, AAPL'
            title="GOOG, AMZN, MSFT, AAPL, SFB"
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
        <div className="update-panel">
          <span>Will be updated in {this.state.secondsToUpdate} seconds</span>
          <button
            className='btn btn-primary pull-right'
            type='button'
            onClick={() => this.updateSymbols()}
            disabled={this.props.isUpdating}
          >{updateButtonText}</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { isUpdating } = state;
  let { symbols } = state;
  return {
    isUpdating,
    symbols
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateSymbols, addSymbol, updating}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
