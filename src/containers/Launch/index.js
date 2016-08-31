import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchSystem } from '../../actions/system';
import Style from './Launch.css';
import Button, { Buttons } from '../../components/Button';

class LaunchContainer extends Component {

  componentDidMount() {
    if (!this.props.system) {
      this.props.fetchSystem()
        .catch(() => {
          this.props.push('/');
        });
    }
  }

  handleStart() {
    this.props.push('/sales');
  }

  render() {
    return (
      <div className={Style.launchContainer}>
        <h1 className={Style.header}>AbaCash</h1>
        {this.props.system && <h6 className={Style.subHeader}>{this.props.system.get('name')}</h6>}

        <Buttons>
          <Button cancel onClick={() => { this.props.push('/?presist=true'); }} label='Tilbake' />
          <Button confirm onClick={() => this.handleStart()} label='Start' />
        </Buttons>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  system: store.system.get('system')
});

const mapDispatchToProps = {
  fetchSystem,
  push
};

LaunchContainer.propTypes = {
  system: PropTypes.object,
  push: PropTypes.func.isRequired,
  fetchSystem: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer);
