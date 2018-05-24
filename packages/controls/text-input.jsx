const React = require('react');
const PropTypes = require('prop-types');

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.sendValue = this.sendValue.bind(this);
  }

  sendValue(ev) {
    const { value } = ev.target;
    const { name, handleChange } = this.props;
    handleChange(name, value);
  }

  render() {
    const { id, placeholder } = this.props;
    return (
      <input
        type="text"
        className="text-input input"
        id={id}
        placeholder={placeholder}
        onChange={this.sendValue}
      />
    );
  }
}

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

module.exports = TextInput;
