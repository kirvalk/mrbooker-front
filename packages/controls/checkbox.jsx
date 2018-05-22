const React = require('react');
const PropTypes = require('prop-types');

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.sendValue = this.sendValue.bind(this);
  }

  sendValue(ev) {
    const { handleChange } = this.props;
    const value = Number(ev.target.checked);
    const { name } = this.props;
    handleChange(name, value);
  }

  render() {
    const { id, label } = this.props;
    return (
      <div>
        <input
          type="checkbox"
          className="checkbox"
          id={id}
          onChange={this.sendValue}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

module.exports = Checkbox;
