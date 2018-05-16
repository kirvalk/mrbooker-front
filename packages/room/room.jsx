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
    this.state = this.props.info;
    this.getEntries = this.getEntries.bind(this);
    this.bookRoom = this.bookRoom.bind(this);
  }


  getEquipmentList() {
    const equip = this.props.info.equipment;
    return Object.values(equip);
  }

  getEntries(date) {
    const entry = this.state.reserved.find((el) => el.date === date);
    return entry || {};
  }

  bookRoom(date, user) {
    const { reserved } = this.state;
    const newParams = { date, user };

    createRequest('bookRoom', { id: this.state.id }, newParams).then((response) => {
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
    });
  }

  render() {
    const { id } = this.props.info;
    return (
      <div className="rooms__item">
        <div className="rooms__cell">
          <RoomName name={this.props.info.name} id={this.props.info.id} />
          <div className='room__controls'>
            <ProjectorIcon updateRoom={this.props.updateRoom} room={this.props.info} />
            <SoundIcon updateRoom={this.props.updateRoom} room={this.props.info} />
            <TelephoneIcon updateRoom={this.props.updateRoom} room={this.props.info} />
          </div>
          <DelIcon deleteRoom={this.props.deleteRoom} id={id}/>
        </div>
        {
          this.props.days
            .map((day, index) => <Day day={day} key={index} entry={this.getEntries(day)} bookRoom={this.bookRoom} />)
        }
      </div>
    );
  }
}

Room.propTypes = {
  deleteRoom: PropTypes.func,
  info: PropTypes.object,
  updateRoom: PropTypes.func,
  days: PropTypes.array,
};
module.exports = Room;
