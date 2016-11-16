import SerialPort from 'serialport';
import { EventEmitter } from 'events';

export default class Device extends EventEmitter {
  constructor(port) {
    super();
    this.port = port;
    const Delimiter = SerialPort.parsers.Delimiter;
    this.parser = this.port.pipe(new Delimiter({ delimiter: [0xBB] }));
    this.parser.on('data', this.onData);
    this.scan();
  }

  commands = {
    BUZZER: 0x89,
    MIFARE: {
      GET_SNR: 0x25
    }
  };

  replies = {
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

  calculateChecksum = (command, data) => {
    const payload = [data.length + 1, command, ...data];
    const checksum = payload.reduce((previousValue, currentValue) => previousValue ^ currentValue);
    return [...payload, checksum];
  }

  validate = (data, checksum) => {
    const dataDecimal = data.map((item) => parseInt(item, 16));
    const calculatedChecksum = dataDecimal
      .reduce((previousValue, currentValue) => previousValue ^ currentValue);
    return Math.abs(calculatedChecksum % 255) === parseInt(checksum, 16);
  }

  onData = (response) => {
    const hexValues = [];
    for (let i = 0; i < response.length; i += 1) {
      hexValues.push(response[i].toString(16));
    }
    const stationId = hexValues[1];
    const length = hexValues[2];
    const status = hexValues[3];
    const flag = hexValues[4];
    const data = hexValues.slice(5, hexValues.length - 1);
    const checksum = hexValues[hexValues.length - 1];
    const valid = this.validate([stationId, length, status, flag, ...data], checksum);
    if (this.replies[status] === 'OK' && this.replies[flag] !== 'NO CARD' && valid) {
      this.emit('rfid', data.join(':'));
    }
  }

  createMessage = (command, data) => {
    const payload = this.calculateChecksum(command, data);
    return new Buffer([0xAA, 0x00, ...payload, 0xBB]);
  }

  close = () => {
    this.port.close();
  }

  scan = () => {
    const command = this.createMessage(this.commands.MIFARE.GET_SNR, [0x26, 0x00]);
    this.writeAndDrain(command, this.scan);
  }

  writeAndDrain = (data, callback) => {
    this.port.write(data, () => {
      this.port.drain(callback);
    });
  }
}
