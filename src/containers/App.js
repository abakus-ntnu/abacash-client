import React from 'react';
import { connect } from 'react-redux';
import Notifications from '../components/Notifications';

type Props = {
  notification?: Object,
  children: any
};

class App extends React.Component {

  props: Props;

  render() {
    return (
      <div>
        <Notifications notifcation={this.props.notification} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
});

export default connect(mapStateToProps)(App);
