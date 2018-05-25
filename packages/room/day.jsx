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
    this.showBookButton = this.showBookButton.bind(this);
    this.hideBookButton = this.hideBookButton.bind(this);
  }

  showUserInput() {
    const { entry } = this.props;
    const { isBooking } = this.state;
    if (Object.keys(entry).length === 0) {
      this.setState({ isBooking: !isBooking });
    } else {
      this.bookRoom();
    }
  }

  bookRoom(userName) {
    const { day, bookRoom } = this.props;
    const { isBooking } = this.state;
    if (!userName) {
      bookRoom(day);
    } else {
      bookRoom(day, userName);
      this.setState({ isBooking: !isBooking });
    }
  }

  showBookButton() {
    this.setState({ isHovered: true });
  }

  hideBookButton() {
    this.setState({ isHovered: false, isBooking: false });
  }

  render() {
    const { isBooking, isHovered } = this.state;
    const { entry } = this.props;
    return (
      <div
        className="rooms__cell day"
        onMouseEnter={this.showBookButton}
        onMouseLeave={this.hideBookButton}
      >
        <ReactCSSTransitionGroup
          transitionName="slidedown"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {
            isBooking && <UserInput bookRoom={this.bookRoom} />
          }
        </ReactCSSTransitionGroup>
        {
          entry.user
          && <div className="day__user">{entry.user}</div>
        }
        <ReactCSSTransitionGroup
          transitionName="slideup"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {
            isHovered && (
            <div className="day__book" onClick={this.showUserInput}>
              {Object.keys(entry).length !== 0 ? 'Снять бронь' : 'Забронировать'}
            </div>
            )
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
