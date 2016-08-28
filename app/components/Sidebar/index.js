import React from 'react';
import Style from './Sidebar.css';
import AbakusLogo from '../../assets/abakus_logo_dark.png';

class Sidebar extends React.Component {

  render() {
    return (
      <div className={Style.sidebar}>

        <div className={`${Style.sidebarRow} ${Style.sidebarBox} ${Style.brand}`}>
          <img src={AbakusLogo} alt='logo' />
        </div>

        <div className={`${Style.sidebarRow} ${Style.sidebarBox} ${Style.person}`}>
          <h3 className={Style.personName}>Eirik Martiniussen Sylliaas</h3>
          <div className={Style.personActions}>
            <h4>
              <i className='fa fa-eject' /> Bytt bruker
            </h4>
            <div>
              <h4 className={Style.balance}>
                <i className='fa fa-credit-card' />
                1937 kr
              </h4>
            </div>
          </div>
        </div>

        <div className={`${Style.sidebarRow} ${Style.sidebarBox}`}>
          <i className='fa fa-credit-card' />
          <h3>Scan et kort</h3>
        </div>

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

export default Sidebar;
