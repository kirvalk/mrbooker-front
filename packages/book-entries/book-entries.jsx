const React = require('react');
const AddForm = require('add-form/add-form.jsx');
const Room = require('room/room.jsx');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');

class BookEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], days: [1, 1525885200000, 3, 4, 5, 6, 7] };
    this.addRoom = this.addRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
  }

  componentDidMount() {
    createRequest('fetchRooms').then((response) => {
      this.setState({ rooms: response.data || [] });
    });
    // createRequest('fetchRoom', { id: 'bf2bc8cd71bc4' }).then((response) => {
    //   // this.setState({ tasks: response.data || [] });
    // });
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

  render() {
    return (
      <div>
        <AddForm addRoom={this.addRoom} />
        <table className='book-entries'>
          <thead>
            <tr>
              <th className='book-entries__header'>КОМНАТА</th>
              <th className='book-entries__header'>ПОНЕДЕЛЬНИК</th>
              <th className='book-entries__header'>ВТОРНИК</th>
              <th className='book-entries__header'>СРЕДА</th>
              <th className='book-entries__header'>ЧЕТВЕРГ</th>
              <th className='book-entries__header'>ПЯТНИЦА</th>
              <th className='book-entries__header'>СУББОТА</th>
              <th className='book-entries__header'>ВОСКРЕСЕНЬЕ</th>
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

      // <div className='book-entries'>
      //   {
      //     this.state.rooms.length > 0
      //     && this.state.rooms
      //       .map((room) => <Room deleteRoom={this.deleteRoom} info = {room} key={room.id} />)
      //   }
      //

      // </div>

    );
  }
}


module.exports = BookEntries;
