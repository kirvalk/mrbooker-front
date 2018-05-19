const React = require('react');
const PropTypes = require('prop-types');

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.sendValue = this.sendValue.bind(this);
  }

  sendValue(ev) {
    const { value } = ev.target;
    const { name } = this.props;
    this.props.handleChange(name, value);
  }

  render() {
    return (
      <input type="text"
              className="text-input"
              id={this.props.id}
              placeholder={this.props.placeholder}
              onChange={this.sendValue}/>
    );
  }
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
};

module.exports = TextInput;
