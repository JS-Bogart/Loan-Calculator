import React from 'react';
import './reset.css';
import './calculator.css';

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      principle: 5000,
      years: 5,
      months: 60,
      interestRate: 4.5,
      monthly: 93.22,
      interest: 592.91,
      total: 5592.91
    }
    this.calculate = this.calculate.bind(this);
  }

  calculate(){
    const rate = this.state.interestRate / 100;
    const monthlyRate = rate / 12;
    const principle = this.state.principle;
    const months = this.state.months;
    const numerator = monthlyRate * (1 + monthlyRate) ** months;
    const denominator = ((1 + monthlyRate) ** months) - 1;
    const monthly = principle * (numerator / denominator);
    const interest = this.amortizedInterest(principle, months, monthlyRate, monthly);
    const total = Number(principle) + Number(interest);

    this.setState({
      total: total,
      interest: interest,
      monthly: monthly
    })
  }

  amortizedInterest(principle, months, monthlyRate, monthly){
    let balance = principle;
    let interestSum = 0;
    for (let i = 0; i < months; i++) {
      const interest = balance * monthlyRate;
      interestSum += interest;
      balance -= (monthly - interest);
    }
    return (interestSum);
  }

  handleInput(input) {
    if (input === 'years') {
      return (e) => {
        if (isNaN(e.currentTarget.value)) {
          this.setState({
            [input]: e.currentTarget.value
          });
        } else {
          this.setState({ 
            [input]: e.currentTarget.value,
            months: e.currentTarget.value * 12
          });
        }
      }
    } else if (input === 'months') {
      return (e) => {
        if (isNaN(e.currentTarget.value)) {
          this.setState({
            [input]: e.currentTarget.value
          });
        } else {
          this.setState({
            [input]: e.currentTarget.value,
            years: e.currentTarget.value / 12
          });
        }
      }
    } else {
      return (e) => {
        this.setState({ [input]: e.currentTarget.value });
      }
    }
  }

  renderErrors(field){
    if (isNaN(field)) {
      return(
        <div className="input-error">
          <p>Please enter a valid number.</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="page">
        <h1>Loan Calculator</h1>
        <div className="calculator">
          <div className="input-fields">
            <div className="amount-input">
              <h2>Loan Amount</h2>
              <input 
                type="text"
                value={this.state.principle}
                onChange={this.handleInput('principle')}
              />
              {this.renderErrors(this.state.principle)}
            </div>
            <div className="rate-input">
              <h2>Interest Rate Per Year</h2>
              <input 
                type="text" 
                value={this.state.interestRate}
                onChange={this.handleInput('interestRate')}
              />
              {this.renderErrors(this.state.interestRate)}
            </div>
            <div className="loan-term">
              <h2>Loan Term</h2>
              <div className="years-input">
                <h3>Years</h3>
                <input 
                  type="text"
                  value={this.state.years}
                  onChange={this.handleInput('years')}
                />
                {this.renderErrors(this.state.years)}
              </div>
              <div className="months-input">
                <h3>Months</h3>
                <input 
                  type="text"
                  value={this.state.months}
                  onChange={this.handleInput('months')}
                />
                {this.renderErrors(this.state.months)}
              </div>
            </div>
            <button onClick={this.calculate}>
              Calculate
            </button>
          </div>
          <div className="output-fields">
            <div className="monthly-output">
              <h2>Monthly Payments</h2>
              <p>{this.state.monthly.toFixed(2)}</p>
            </div>
            <div className="output-totals">
              <div className="interest-output">
                <h3>Total Interest Paid</h3>
                <p>{this.state.interest.toFixed(2)}</p>
              </div>
              <div className="total-output">
                <h3>Total Paid</h3>
                <p>{Number(this.state.total).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Calculator;