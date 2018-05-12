const React = require('react');

class Room extends React.Component {
  render() {
    return (
      <div>
        <span>  {this.props.info.name}</span>
        <span>  {this.props.info.equipment.projector}</span>
      </div>
    );
  }
}

module.exports = Room;
