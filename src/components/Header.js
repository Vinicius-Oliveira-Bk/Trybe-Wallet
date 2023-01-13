import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <>
        <h3
          data-testid="email-field"
        >
          { email }
        </h3>
        <div
          data-testid="total-field"
        >
          { totalValue.toFixed(2) }
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  totalValue: PropTypes.number.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Header);
