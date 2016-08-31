import React from 'react';
import NotificationSystem from 'react-notification-system';

class Notifications extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    const event = nextProps.notifcation;
    if (event) {
      this.addNotification(event);
    }
  }

  addNotification = (event) => {
    this.notificationSystem.addNotification(event);
  }

  render() {
    return (
      <NotificationSystem
        ref={ref => (this.notificationSystem = ref)}
        style={style}
      />
    );
  }

}

export default Notifications;

const colours = {
  success: '97, 184, 50',
  error: '203, 2, 12',
  warning: '251, 140, 27',
  info: '45, 92, 137'
};

const style = {
  Containers: {
    DefaultStyle: {
      padding: '0px',
      width: '100vw'
    },
    bc: {
      top: 'auto',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }
  },
  NotificationItem: {
    DefaultStyle: {
      borderRadius: '0px',
      fontSize: '18px',
      margin: '0px',
      padding: '40px 20px',
      opacity: '0.95',
      minHeight: '63px'
    },
    success: {
      borderTop: 'none',
      backgroundColor: `rgb(${colours.success})`,
      color: '#ffffff',
      WebkitBoxShadow: `0 0 1px rgba(${colours.success}, 0.9)`,
      MozBoxShadow: `0 0 1px rgba(${colours.success}, 0.9)`,
      boxShadow: `0 0 1px rgba(${colours.success}, 0.9)`
    },
    error: {
      borderTop: 'none',
      backgroundColor: `rgb(${colours.error})`,
      color: '#ffffff',
      WebkitBoxShadow: `0 0 1px rgba(${colours.error}, 0.9)`,
      MozBoxShadow: `0 0 1px rgba(${colours.error}, 0.9)`,
      boxShadow: `0 0 1px rgba(${colours.error}, 0.9)`
    },
    warning: {
      borderTop: 'none',
      backgroundColor: `rgb(${colours.warning})`,
      color: '#ffffff',
      WebkitBoxShadow: `0 0 1px rgba(${colours.warning}, 0.9)`,
      MozBoxShadow: `0 0 1px rgba(${colours.warning}, 0.9)`,
      boxShadow: `0 0 1px rgba(${colours.warning}, 0.9)`
    },
    info: {
      borderTop: 'none',
      backgroundColor: `rgb(${colours.info})`,
      color: '#ffffff',
      WebkitBoxShadow: `0 0 1px rgba(${colours.info}, 0.9)`,
      MozBoxShadow: `0 0 1px rgba(${colours.info}, 0.9)`,
      boxShadow: `0 0 1px rgba(${colours.info}, 0.9)`
    }
  },
  Title: {
    DefaultStyle: {
      fontSize: '14px',
      margin: '0 0 5px 0',
      padding: 0,
      fontWeight: 'bold'
    },
    success: {
      color: '#ffffff'
    },
    error: {
      color: '#ffffff'
    },
    warning: {
      color: '#ffffff'
    },
    info: {
      color: '#ffffff'
    }
  },
  Dismiss: {
    DefaultStyle: {
      display: 'none',
    }
  }
};
