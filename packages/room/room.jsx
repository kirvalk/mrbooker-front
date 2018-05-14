const React = require('react');
const Day = require('room/day.jsx');
const DelIcon = require('icons/delete.jsx');
const ProjectorIcon = require('icons/projector.jsx');
const SoundIcon = require('icons/sound.jsx');
const TelephoneIcon = require('icons/telephone.jsx');
const RoomName = require('room/room-name.jsx');
const PropTypes = require('prop-types');

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.info;
    this.getEntries = this.getEntries.bind(this);
  }


  getEquipmentList() {
    const equip = this.props.info.equipment;
    return Object.values(equip);
  }

  getEntries(date) {
    const entry = this.state.reserved.find((el) => el.date === date);
    return entry || {};
  }

  render() {
    const { id } = this.props.info;
    return (
      <tr className='room'>
        <td className='room__title'>
          <RoomName name={this.props.info.name} id={this.props.info.id} />
          <div className='room__controls'>
            <ProjectorIcon updateRoom={this.props.updateRoom} room={this.props.info} />
            <SoundIcon updateRoom={this.props.updateRoom} room={this.props.info} />
            <TelephoneIcon updateRoom={this.props.updateRoom} room={this.props.info} />
          </div>
            <DelIcon deleteRoom={this.props.deleteRoom} id={id}/>
        </td>
        {
          this.props.days
            .map((day, index) => <Day day={day} key={index} entry={this.getEntries(day)} />)
        }
      </tr>
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
