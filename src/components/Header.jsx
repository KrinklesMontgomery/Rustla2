/* global DONATE_PAYPAL_URL */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import '../css/Header';

import HeaderForm from './HeaderForm';


// TODO - give this component `toggleSettings` dispatch-wrapped action that toggles the settings dropdown
const Header = ({ toggleSettings, rustlerCount, isLoggedIn }) => {
  let rustlers = null;
  let viewers = null;
  if (rustlerCount) {
    const [ rCount, vCount ] = rustlerCount;
    if (rCount) {
      rustlers = <li><a>{rCount} Rustlers</a></li>;
    }
    if (vCount) {
      viewers = <li><a>{vCount} Viewers</a></li>;
    }
  }
  return (
    <nav
      className='header navbar navbar-default navbar-inverse'
      role='navigation'
    >
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link className='navbar-brand' to='/'>OverRustle</Link>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav'>
            {rustlers}
            {viewers}
            <li>
              <a target='_blank' rel='noopener noreferrer' href={DONATE_PAYPAL_URL} />
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <HeaderForm />
            </li>
            <li>
              <div className='btn-group'>
                {
                  isLoggedIn ?
                  <Link className='btn btn-default navbar-btn' to='/profile' title='Profile'>
                    <span className='glyphicon glyphicon-user' />
                  </Link>
                  : null
                }
                <a
                  className='btn btn-default navbar-btn'
                  rel='noopener noreferrer'
                  href={isLoggedIn ? '/logout' : '/login'}
                  title={isLoggedIn ? 'Log Out' : 'Log In'}>
                  <span
                    className={
                      `glyphicon glyphicon-log-${isLoggedIn ? 'out' : 'in'}`
                    }
                    />
                </a>
                <button
                  className='btn btn-default navbar-btn'
                  title='Settings'
                  type='button'
                  onClick={toggleSettings}>
                  <span className='glyphicon glyphicon-cog' />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
  rustlerCount: PropTypes.arrayOf(PropTypes.number), // [rustlers, viewers] tuple
  isLoggedIn: PropTypes.bool.isRequired,
};

export default compose(
  connect(
    state => ({
      isLoggedIn: state.self.isLoggedIn,
    }),
  ),
)(Header);
