const React = require('react');
const PropTypes = require('prop-types');

class Button extends React.Component {
  constructor() {
    super();
    this.state = { title: 'Добавить' };
  }

  render() {
    return (
      <button className="button">{this.state.title}</button>
    );
  }
}

Button.propTypes = { title: PropTypes.string };

module.exports = Button;
