import React, { Component, PropTypes } from 'react';
import Style from './NewCard.css';

class ReviewComponent extends Component {
  render() {
    return (
      <div>
        {!this.props.customer &&
          <p className={Style.searchBody}>
            Hei <span className={Style.userName}>
              {`${this.props.nerd.get('name')} ${this.props.nerd.get('surname')}`}
            </span>!
            Er du sikker på at du vil opprette en ny bruker?
          </p>
        }

        {this.props.customer &&
          <p className={Style.searchBody}>
            Hei <span className={Style.userName}>{this.props.customer.get('displayName')}</span>!
            Vi fant en tidligere bruker på ditt brukernavn,
            har du lyst til å overføre infoen til dette kortet?
          </p>
        }
        {this.props.customer &&
          <p className={Style.searchBody}>
            <span>Saldo: <span className={Style.userName}>
              {this.props.customer.get('balance')} Kr
            </span></span>
            <span>Brukernavn: <span className={Style.userName}>
              {this.props.customer.get('username')}
            </span></span>
          </p>
        }
      </div>
    );
  }
}

ReviewComponent.propTypes = {
  user: PropTypes.object,
  customer: PropTypes.object,
  nerd: PropTypes.object
};

export default ReviewComponent;
