const React = require('react');
const PropTypes = require('prop-types');

class RoomName extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props, { change: false });
  }

  updateRoom() {
    const inp = document.querySelector(`#${this.props.id}`);
  }


  render() {
    return (
      <div>
        <div className='room__name' onClick={this.updateRoom.bind(this)}>
          {this.props.name}
        </div>
          {/* <input type="text" id={this.props.id} className='room__input'/> */}
      </div>
    );
  }
}


module.exports = RoomName;
