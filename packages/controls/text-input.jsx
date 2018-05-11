const React = require('react');
const PropTypes = require('prop-types');

class TextInput extends React.Component {
  render() {
    return (
      <input type="text" placeholder={this.props.placeholder} className="text-input"/>
    );
  }
}

TextInput.propTypes = { placeholder: PropTypes.string };

module.exports = TextInput;
