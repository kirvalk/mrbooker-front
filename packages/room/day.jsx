const React = require('react');
const PropTypes = require('prop-types');

class Room extends React.Component {
  render() {
    return (
      <td className='day'>
        <div className='day__main'>
          <div className='day__name'>{this.props.day}</div>
        </div>

      </td>
    );
  }
}


module.exports = Room;
