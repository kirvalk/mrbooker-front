const React = require('react');
const PropTypes = require('prop-types');

class Room extends React.Component {
  render() {
    return (
      <td className='day'>
        <div className='day__main'>
          <div className='day__name'>{this.props.day}</div>
          <div className='day__user'>{this.props.entry.user}</div>
        </div>

      </td>
    );
  }
}

Room.propTypes = {
  day: PropTypes.number,
  entry: PropTypes.object,
};
module.exports = Room;
