import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Style from './Sidebar.css';
import AbakusLogo from '../../assets/abakus_logo_dark.png';
import { clearCustomer } from '../../actions/customer';

type Props ={
  customer?: Object,
  clearCustomer: () => void,
  findUser: () => void
};

class Sidebar extends React.Component {

  props: Props;

  render() {
    const loggedIn = !!this.props.customer;

    return (
      <div className={Style.sidebar}>

        <div className={`${Style.sidebarRow} ${Style.sidebarBox} ${Style.brand}`}>
          <img src={AbakusLogo} alt='logo' />
        </div>

        {loggedIn ?
          <div
            className={`${Style.sidebarRow} ${Style.sidebarBox} ${Style.person}`}
            onClick={this.props.clearCustomer}
          >
            <h3 className={Style.personName}>{this.props.customer.get('displayName')}</h3>
            <div className={Style.personActions}>
              <h4>
                <i className='fa fa-eject' /> Logg ut
              </h4>
              <div>
                <h4 className={Style.balance}>
                  <i className='fa fa-credit-card' />
                  {this.props.customer.get('balance')} kr
                </h4>
              </div>
            </div>
          </div>
        :
          <div
            className={classNames(Style.sidebarRow, Style.sidebarBox, Style.hoverable)}
            onClick={this.props.findUser}
          >
            <i className='fa fa-user' />
            <h3>Finn bruker</h3>
          </div>
        }

        <div className={`${Style.transactions}`}>
          <div className={`${Style.sidebarRow} ${Style.transaction}`}>
            <div className={Style.transactionLeft}>
              <div className={Style.transactionAmount}>10</div>
              <div className={Style.transactionProduct}>Cola</div>
            </div>
            <div>
              <div className={Style.transactionPrice}>40 kr</div>
            </div>
          </div>
        </div>

        <div className={Style.actions}>
          <div className={Style.sidebarRow}>
            <i className='fa fa-times' />
            Tøm handlekurv
          </div>
          <div className={Style.sidebarRow}>
            <i className='fa fa-spin fa-circle-o-notch' />
            <span>Belaster kortet</span>
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = {
  clearCustomer
};

export default connect(null, mapDispatchToProps)(Sidebar);
