const React = require('react');
const Day = require('room/day.jsx');
const DelIcon = require('icons/delete.jsx');
const ProjectorIcon = require('icons/projector.jsx');
const SoundIcon = require('icons/sound.jsx');
const TelephoneIcon = require('icons/telephone.jsx');
const RoomName = require('room/room-name.jsx');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');
const PropTypes = require('prop-types');

class Room extends React.Component {
  constructor(props) {
    super(props);
    const { info } = this.props;
    this.state = Object.assign(info, { isHovered: false });

    this.getEntries = this.getEntries.bind(this);
    this.bookRoom = this.bookRoom.bind(this);
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }

  getEquipmentList() {
    const { info } = this.props;
    const equip = info.equipment;
    return Object.values(equip);
  }

  getEntries(date) {
    const { reserved } = this.state;
    const entry = reserved.find((el) => el.date === date);
    return entry || {};
  }

  bookRoom(date, user) {
    const { reserved, id } = this.state;
    const newParams = { date, user };
    const { changeLoadingStatus } = this.props;
    changeLoadingStatus(true);

    createRequest('bookRoom', { id }, newParams).then((response) => {
      if (response.status === responseStatuses.OK) {
        const alreadyBooked = reserved.find((entry) => {
          return entry.date === newParams.date;
        });
        if (alreadyBooked) {
          reserved.splice(reserved.indexOf(alreadyBooked), 1);
        } else {
          reserved.push({ date: newParams.date, user: newParams.user });
        }
        this.setState({ reserved });
      }
      changeLoadingStatus(false);
    });
  }

  mouseEnterHandler() {
    this.setState({ isHovered: true });
  }

  mouseLeaveHandler() {
    this.setState({ isHovered: false });
  }

  render() {
    const { info, updateRoom, deleteRoom, days } = this.props;
    const { id, capacity, name } = info;
    const { isHovered } = this.state;
    return (
      <div
        className="rooms__item"
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <div className="rooms__cell">
          <RoomName
            name={name}
            capacity={capacity}
            id={id}
            updateRoom={updateRoom}
          />
          <div className="room__controls">
            <ProjectorIcon updateRoom={updateRoom} room={info} />
            <SoundIcon updateRoom={updateRoom} room={info} />
            <TelephoneIcon updateRoom={updateRoom} room={info} />
            {
              isHovered
              && <DelIcon deleteRoom={deleteRoom} id={id} />
            }
          </div>
        </div>
        {
          days.map((day, index) => (
            <Day
              day={day}
              key={index}
              entry={this.getEntries(day)}
              bookRoom={this.bookRoom}
            />
          ))
        }
      </div>
    );
  }
}

Room.propTypes = {
  deleteRoom: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  updateRoom: PropTypes.func.isRequired,
  days: PropTypes.array.isRequired,
  changeLoadingStatus: PropTypes.func.isRequired,
};
module.exports = Room;
