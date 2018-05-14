const React = require('react');
const AddForm = require('add-form/add-form.jsx');
const Room = require('room/room.jsx');
const Direction = require('controls/direction-button.jsx');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');

class BookEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], days: [1525626000000, 1525712400000, 1525798800000, 1525885200000, 1525971600000, 1526058000000, 1526144400000] };
    this.addRoom = this.addRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.moveWeek = this.moveWeek.bind(this);
  }

  componentDidMount() {
    createRequest('fetchRooms').then((response) => {
      this.setState({ rooms: response.data || [] });
    });
  }

  addRoom(obj) {
    const { rooms } = this.state;

    createRequest('addRoom', {}, obj).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.push(response.data);
        this.setState({ rooms });
      }
    });
  }

  deleteRoom(id) {
    const { rooms } = this.state;
    const indexToDelete = rooms.findIndex((room) => room.id === id);
    createRequest('deleteRoom', { id }).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.splice(indexToDelete, 1);
        this.setState({ rooms });
      }
    });
  }

  updateRoom(id, newParams) {
    const { rooms } = this.state;
    const roomToUpdate = rooms.find((room) => room.id === id);
    createRequest('updateRoom', { id }, newParams).then((response) => {
      if (response.status === responseStatuses.OK) {
        Object.keys(roomToUpdate).forEach((key) => {
          if (!newParams[key]) return;
          if (typeof roomToUpdate[key] === 'object' && roomToUpdate[key] !== null) {
            Object.assign(roomToUpdate[key], newParams[key]);
          } else {
            roomToUpdate[key] = newParams[key];
          }
        });

        this.setState({ rooms });
      }
    });
  }

  parseDate(ms) {
    const date = new Date(ms);
    const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  moveWeek(direction) {
    const weekMs = 86400000 * 7;
    if (direction === 'prev') {
      const days = this.state.days.map((day) => day - weekMs);
      this.setState({ days });
    } else if (direction === 'next') {
      const days = this.state.days.map((day) => day + weekMs);
      this.setState({ days });
    }
  }

  render() {
    return (
      <div>
        <AddForm addRoom={this.addRoom} />
        <Direction moveWeek={this.moveWeek} dir={'prev'} />
        <Direction moveWeek={this.moveWeek} dir={'next'} />
        <table className='book-entries'>
          <thead>
            <tr>
              <th className='book-entries__header'>КОМНАТА</th>
              <th className='book-entries__header'>
                <div>ПОНЕДЕЛЬНИК</div>
                <div>{this.parseDate(this.state.days[0])}</div>
              </th>
              <th className='book-entries__header'>
                <div>ВТОРНИК</div>
                <div>{this.parseDate(this.state.days[1])}</div>
              </th>
              <th className='book-entries__header'>
                <div>СРЕДА</div>
                <div>{this.parseDate(this.state.days[2])}</div>
              </th>
              <th className='book-entries__header'>
                <div>ЧЕТВЕРГ</div>
                <div>{this.parseDate(this.state.days[3])}</div>
              </th>
              <th className='book-entries__header'>
                <div>ПЯТНИЦА</div>
                <div>{this.parseDate(this.state.days[4])}</div>
              </th>
              <th className='book-entries__header'>
                <div>СУББОТА</div>
                <div>{this.parseDate(this.state.days[5])}</div>
              </th>
              <th className='book-entries__header'>
                <div>ВОСКРЕСЕНЬЕ</div>
                <div>{this.parseDate(this.state.days[6])}</div>
              </th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.rooms.length > 0
            && this.state.rooms
              .map((room) => <Room updateRoom={this.updateRoom} deleteRoom={this.deleteRoom} days={this.state.days} info = {room} key={room.id} />)
          }
          </tbody>
        </table>
      </div>
    );
  }
}


module.exports = BookEntries;
