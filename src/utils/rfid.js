import SerialPort from 'serialport';
import Promise from 'bluebird';


Promise.promisifyAll(SerialPort);
let PORT = null;
let SCANNING = false;

const commands = {
  BUZZER: 0x89,
  MIFARE: {
    GET_SNR: 0x25
  }
};

const replies = {
  '0': 'OK', // eslint-disable-line
  '1': 'ERROR', // eslint-disable-line
  '83': 'NO CARD', // eslint-disable-line
  '87': 'UNKNOWN INTERNAL ERROR', // eslint-disable-line
  '85': 'UNKNOWN COMMAND', // eslint-disable-line
  '84': 'RESPONSE ERROR', // eslint-disable-line
  '82': 'READER TIMEOUTE', // eslint-disable-line
  '90': 'CARD DOES NOT SUPPORT THIS COMMAND', // eslint-disable-line
  '8f': 'UNNSUPPORTED CARD IN NFC WRITE MODE' // eslint-disable-line
};

function validate(data, checksum) {
  const dataDecimal = data.map(item => parseInt(item, 16));
  const calculatedChecksum = dataDecimal
  .reduce((previousValue, currentValue) => previousValue ^ currentValue);
  return Math.abs(calculatedChecksum % 255) === parseInt(checksum, 16);
}

function calculateChecksum(command, data) {
  const payload = [data.length + 1, command, ...data];
  const checksum = payload.reduce((previousValue, currentValue) => previousValue ^ currentValue);
  return [...payload, checksum];
}

function createMessage(command, data) {
  const payload = calculateChecksum(command, data);
  return new Buffer([0xAA, 0x00, ...payload, 0xBB]);
}

function write(data) {
  return PORT.writeAsync(data)
  .then(() => PORT.drainAsync());
}

function scan(predicate, data) {
  const scanWhile = () => {
    if (!predicate) return;
    return Promise.resolve(write(data)).then(scanWhile);
  };
  return Promise.resolve().then(scanWhile);
}

export function connect(device) {
  return new Promise(resolve => {
    PORT = new SerialPort(device, {
      parser: SerialPort.parsers.byteDelimiter(0xBB)
    }, resolve);
    Promise.promisifyAll(PORT);
  });
}

export function list() {
  return SerialPort.listAsync();
}

export function mifareUID() {
  SCANNING = true;
  return new Promise((resolve) => {
    PORT.on('data', (response) => {
      const hexValues = response.map(decimal => decimal.toString(16));
      const stationId = hexValues[1];
      const length = hexValues[2];
      const status = hexValues[3];
      const flag = hexValues[4];
      const data = hexValues.slice(5, parseInt(length, 16) + 3);
      const checksum = hexValues[hexValues.length - 2];
      const valid = validate([stationId, length, status, flag, ...data], checksum);

      if (replies[status] === 'OK' && valid) {
        SCANNING = false;
        PORT.removeAllListeners();
        const mifareUidString = data.map(value => value.toString(16));
        resolve(mifareUidString.join(':'));
      }
    });

    scan(SCANNING, createMessage(commands.MIFARE.GET_SNR, [0x26, 0x00]));
  });
}
