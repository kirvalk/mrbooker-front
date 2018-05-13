const React = require('react');
const AddForm = require('add-form/add-form.jsx');
const Room = require('room/room.jsx');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');

class BookEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };
    this.addRoom = this.addRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
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

  render() {
    return (
      <div className='book-entries'>
        {
          this.state.rooms.length > 0
          && this.state.rooms.map((room) => <Room deleteRoom={this.deleteRoom} info = {room} key={room.id} />)
        }
        <AddForm addRoom={this.addRoom} />

      </div>

    );
  }
}


module.exports = BookEntries;
