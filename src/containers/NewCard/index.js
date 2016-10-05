import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { clearCustomer, fetchCustomer } from '../../actions/customer';
import Style from './NewCard.css';
import TabMenu, { TabItem } from '../../components/TabMenu';
import Button, { Buttons } from '../../components/Button';
import SearchComponent from './SearchComponent';
import ReviewComponent from './ReviewComponent';

class NewCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'SEARCH',
      rfid: '3ijd3ijkd3'
    };
  }

  handleSelect(user) {
    this.setState({
      nerd: user
    }, () => this.props.fetchCustomer(user.get('username'), 'username')
      .then(() => this.setState({ customer: this.props.customer, step: 'REVIEW' }))
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ step: 'REVIEW' });
        }
      })
    );
  }

  handleCancel() {
    this.props.clearCustomer();
    this.props.push('/sales');
  }

  render() {
    return (
      <div className={Style.newCardContainer}>
        <TabMenu>
          <TabItem name='Search' />
          <TabItem name='Review' />
        </TabMenu>

        {this.state.step === 'SEARCH' &&
          <SearchComponent
            handleSelect={user => this.handleSelect(user)}
          />
        }
        {this.state.step === 'REVIEW' &&
          <ReviewComponent
            user={this.state.user}
            customer={this.state.customer}
            nerd={this.state.nerd}
          />
        }
        <Buttons>
          <Button onClick={() => this.handleCancel()} cancel label='Avbryt' />
          <Button confirm disabled={this.state.step !== 'REVIEW'} label='OK' />
        </Buttons>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  customer: store.customer.get('customer')
});

const mapDispatchToProps = {
  clearCustomer,
  fetchCustomer,
  push
};

NewCardContainer.propTypes = {
  customer: PropTypes.object.isRequired,
  clearCustomer: PropTypes.func.isRequired,
  fetchCustomer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardContainer);
