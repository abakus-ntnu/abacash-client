import SerialPort from 'serialport';
import Device from './device';

export function connect(device) {
  return new Promise((resolve, reject) => {
    const port = new SerialPort(device, { autoOpen: false });
    port.open((err) => {
      if (err) reject(err);
      resolve(new Device(port));
    });
  });
}

export function list() {
  return new Promise((resolve, reject) => {
    SerialPort.list((err, ports) => {
      if (err) reject(err);
      resolve(ports);
    });
  });
}
