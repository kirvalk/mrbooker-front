const React = require('react');
const PropTypes = require('prop-types');

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.bookRoom = this.bookRoom.bind(this);
  }

  bookRoom(ev) {
    const { bookRoom } = this.props;
    ev.preventDefault();
    if (this.textInput.value === '') return;
    bookRoom(this.textInput.value);
  }

  render() {
    return (
      <form className="user-input" onSubmit={this.bookRoom}>
        <div className="user-input__name">Как вас зовут?</div>
        <input
          className="user-input__input input"
          type="text"
          ref={(el) => { this.textInput = el; }}
        />
        <button className="user-input__button btn" type="submit">ОК</button>
      </form>
    );
  }
}

UserInput.propTypes = { bookRoom: PropTypes.func.isRequired };
module.exports = UserInput;
