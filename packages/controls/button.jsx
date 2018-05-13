const React = require('react');
const PropTypes = require('prop-types');

class Button extends React.Component {
  constructor() {
    super();
    this.state = { title: 'Добавить' };
  }

  clickHandler() {
    const name = document.querySelector('#name');
    const capacity = document.querySelector('#capacity');
    const projector = document.querySelector('#projector');
    const sound = document.querySelector('#sound');
    const telephone = document.querySelector('#telephone');

    const newRoom = {
      name: name.value,
      capacity: Number(capacity.value),
      equipment: {
        projector: projector.checked ? 1 : 0,
        sound: sound.checked ? 1 : 0,
        telephone: telephone.checked ? 1 : 0,
      },
    };
    this.props.addRoom(newRoom);
  }

  render() {
    return (
      <button onClick={this.clickHandler.bind(this)}className="button">{this.state.title}</button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string,
  addRoom: PropTypes.func,
};

module.exports = Button;
