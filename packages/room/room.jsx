const React = require('react');
const Entry = require('entry/entry.jsx');
const Day = require('room/day.jsx');
const DelIcon = require('icons/delete.jsx');
const PenIcon = require('icons/pencil.jsx');
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


  render() {
    const { id } = this.props.info;
    return (
      <tr className='room'>
        <td className='room__title'>
          <div className='room__name'>
            {this.state.name}
            <DelIcon deleteRoom={this.props.deleteRoom} id={id}/>
            <PenIcon/>
          </div>
        </td>
        {
          this.props.days
            .map((day, index) => <Day day={day} key={index} />)
        }
      </tr>
      // <div className='room'>
      //   <div className="room__controls" onClick={this.delRoom.bind(this)}></div>
      //   <div className='room__param'>{this.state.name}</div>
      //   <div className='room__param'>{this.state.capacity}</div>
      //   {
      //     this.getEquipmentList()
      //       .map((eq) => <div className='room__param' key={eq.index}>{eq}</div>)
      //   }
      //   {
      //     this.state.reserved
      //       .map((el) => <Entry key={el.index} user={el.user} date={el.date} />)
      //   }
      // </div>
    );
  }
}

Room.propTypes = {
  deleteRoom: PropTypes.func,
  info: PropTypes.object,
};
module.exports = Room;
