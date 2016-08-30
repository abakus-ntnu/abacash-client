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
      nerd: user,
      step: 'REVIEW'
    }, () => fetchCustomer(user.username, 'rfid'));
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

NewCardContainer.propTypes = {
  params: PropTypes.object.isRequired
};

export default connect()(NewCardContainer);
