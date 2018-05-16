const React = require('react');
const PropTypes = require('prop-types');
const UserInput = require('room/user-input');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isBooking: false, isHovered: false };
    this.bookRoom = this.bookRoom.bind(this);
    this.showUserInput = this.showUserInput.bind(this);
  }

  showUserInput() {
    if (Object.keys(this.props.entry).length === 0) {
      const isBooking = !this.state.isBooking;
      this.setState({ isBooking });
    } else {
      this.bookRoom();
    }
  }

  bookRoom(userName) {
    if (!userName) {
      this.props.bookRoom(this.props.day);
    } else {
      this.props.bookRoom(this.props.day, userName);
      const isBooking = !this.state.isBooking;
      this.setState({ isBooking });
    }
  }

  showBookButton() {
    this.setState({ isHovered: true });
  }

  hideBookButton() {
    this.setState({ isHovered: false });
  }

  render() {
    return (
      <div className='rooms__cell day' onMouseEnter={this.showBookButton.bind(this)} onMouseLeave ={this.hideBookButton.bind(this)}>
        <ReactCSSTransitionGroup
          transitionName="slidedown"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>

          {this.state.isBooking && <UserInput bookRoom={this.bookRoom} />}

        </ReactCSSTransitionGroup>
        {
          this.props.entry.user
          && <div className='day__user'>{this.props.entry.user}</div>
        }
        <ReactCSSTransitionGroup
          transitionName="slideup"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
        {
          this.state.isHovered
          && <div className='day__book' onClick={this.showUserInput}>{Object.keys(this.props.entry).length !== 0 ? 'Снять' : 'Занять'}</div>
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Day.propTypes = {
  day: PropTypes.number.isRequired,
  entry: PropTypes.object.isRequired,
  bookRoom: PropTypes.func.isRequired,
};
module.exports = Day;
