import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Style from './NewCard.css';
import { fetchCustomer } from '../../actions/customer';
import TabMenu, { TabItem } from '../../components/TabMenu';
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

  navigate(step) {
    console.log(step);
  }

  render() {
    return (
      <div className={Style.newCardContainer}>
        <TabMenu>
          <TabItem name='Search' onClick={() => this.navigate('SEARCH')} />
          <TabItem name='Review' onClick={() => this.navigate('REVIEW')} />
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
      </div>
    );
  }
}

const mapStateToProps = store => ({
  customer: store.customer.get('customer')
});

const mapDispatchToProps = {
  fetchCustomer
};

NewCardContainer.propTypes = {
  customer: PropTypes.object.isRequired,
  fetchCustomer: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardContainer);
