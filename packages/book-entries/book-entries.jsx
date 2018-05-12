const React = require('react');
const AddForm = require('add-form/add-form.jsx');
const Room = require('room/room.jsx');
const createRequest = require('core/create-request');

class BookEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };
  }

  componentDidMount() {
    createRequest('fetchRooms').then((response) => {
      this.setState({ rooms: response.data || [] });
    });
    // createRequest('fetchRoom', { id: 'bf2bc8cd71bc4' }).then((response) => {
    //   // this.setState({ tasks: response.data || [] });
    // });
  }


  render() {
    return (
      <div>
        <AddForm />
        {
          this.state.rooms.length > 0
          && this.state.rooms.map((room) => <Room info = {room} key={room.id} />)
        }

      </div>

    );
  }
}


module.exports = BookEntries;
