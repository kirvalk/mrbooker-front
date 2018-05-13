const React = require('react');
const Entry = require('entry/entry.jsx');
const PropTypes = require('prop-types');

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.info;
  }


  getEquipmentList() {
    const equip = this.props.info.equipment;
    return Object.values(equip);
  }

  delRoom() {
    const { id } = this.props.info;
    this.props.deleteRoom(id);
  }

  render() {
    return (
      <div className='room'>
        <div className="room__controls" onClick={this.delRoom.bind(this)}></div>
        <div className='room__param'>{this.state.name}</div>
        <div className='room__param'>{this.state.capacity}</div>
        {this.getEquipmentList()
          .map((eq) => <div className='room__param' key={eq.index}>{eq}</div>)}

        {

          this.state.reserved
            .map((el) => <Entry key={el.index} user={el.user} date={el.date} />)
        }
      </div>
    );
  }
}

Room.propTypes = {
  deleteRoom: PropTypes.func,
  info: PropTypes.object,
};
module.exports = Room;
