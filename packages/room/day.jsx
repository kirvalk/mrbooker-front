const React = require('react');
const PropTypes = require('prop-types');
const UserInput = require('room/user-input');

class Day extends React.Component {
  constructor(props) {
    super(props);
    const isBooked = Object.keys(this.props.entry).length !== 0;
    this.state = { isBooking: false, isBooked };
    this.bookRoom = this.bookRoom.bind(this);
    this.showUserInput = this.showUserInput.bind(this);
  }

  showUserInput() {
    if (!this.state.isBooked) {
      const isBooking = !this.state.isBooking;
      this.setState({ isBooking });
    } else {
      this.bookRoom();
    }
  }

  bookRoom(userName) {
    this.props.bookRoom(this.props.day, userName);
    if (!userName) {
      const isBooked = !this.state.isBooked;
      this.setState({ isBooked });
    } else {
      const isBooking = !this.state.isBooking;
      const isBooked = !this.state.isBooked;
      this.setState({ isBooking, isBooked });
    }
  }

  render() {
    return (
      <td className='day'>
        <div className='day__main'>
          {this.state.isBooking && <UserInput bookRoom={this.bookRoom} />}
          <div className='day__user'>{this.props.entry.user}</div>
          <div className='day__book' onClick={this.showUserInput}>{this.state.isBooked ? 'Снять' : 'Занять'}</div>
        </div>

      </td>
    );
  }
}

Day.propTypes = {
  day: PropTypes.number.isRequired,
  entry: PropTypes.object.isRequired,
  bookRoom: PropTypes.func.isRequired,
};
module.exports = Day;
