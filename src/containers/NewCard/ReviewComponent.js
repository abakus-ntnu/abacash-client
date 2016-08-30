import React, { Component, PropTypes } from 'react';
import Style from './NewCard.css';

class ReviewComponent extends Component {
  render() {
    return (
      <div>
        {!this.props.customer &&
          <p className={Style.searchBody}>
            Hei <span className={Style.userName}>{this.props.user.displayName}</span>!
            Er du sikker på at du vil opprette en ny bruker?
          </p>
        }

        {this.props.customer &&
          <p className={Style.searchBody}>
            Hei <span className={Style.userName}>{this.props.customer.displayName}</span>!
            Vi fant en tidligere bruker på ditt brukernavn,
            har du lyst til å overføre infoen til dette kortet?
          </p>
        }
        {this.props.customer &&
          <p className={Style.searchBody}>
            <span>Saldo: <span className={Style.userName}>
              {this.props.customer.balance} Kr
            </span></span>
            <span>Brukernavn: <span className={Style.userName}>
              {this.props.customer.username}
            </span></span>
          </p>
        }
      </div>
    );
  }
}

ReviewComponent.propTypes = {
  user: PropTypes.obj,
  customer: PropTypes.obj,
  nerd: PropTypes.obj
};

export default ReviewComponent;
