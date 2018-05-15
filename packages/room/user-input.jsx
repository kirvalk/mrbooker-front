const React = require('react');
const PropTypes = require('prop-types');

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.bookRoom = this.bookRoom.bind(this);
  }

  bookRoom() {
    this.props.bookRoom(this.textInput.value);
  }


  render() {
    return (
      <div className='user-input'>
        <div className='user-input__name'>Как вас зовут?</div>
        <input className='user-input__input' type="text" ref={(input) => { this.textInput = input; }} />
        <button onClick={this.bookRoom}>ОК</button>
      </div>
    );
  }
}

UserInput.propTypes = {};
module.exports = UserInput;
