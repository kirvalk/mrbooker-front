const React = require('react');
const PropTypes = require('prop-types');

class DelIcon extends React.Component {
  constructor(props) {
    super(props);

    this.delRoom = this.delRoom.bind(this);
  }

  delRoom() {
    this.props.deleteRoom(this.props.id);
  }

  render() {
    return (
      <svg className="del-icon"
           onClick={this.delRoom}
           viewBox="0 0 459 459"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M76.5,408c0,28.05,22.95,51,51,51h204c28.05,0,51-22.95,51-51V102h-306V408z M408,25.5h-89.25L293.25,0h-127.5l-25.5,25.5
          H51v51h357V25.5z"/>
      </svg>
    );
  }
}

DelIcon.propTypes = {
  id: PropTypes.string.isRequired,
  deleteRoom: PropTypes.func.isRequired,
};
module.exports = DelIcon;
