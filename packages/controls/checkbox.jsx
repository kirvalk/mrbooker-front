const React = require('react');
const PropTypes = require('prop-types');

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.sendValue = this.sendValue.bind(this);
  }

  sendValue(ev) {
    const value = Number(ev.target.checked);
    const { name } = this.props;
    this.props.handleChange(name, value);
  }

  render() {
    return (
      <div>
        <input type="checkbox"
               className="checkbox"
               id={this.props.id}
               onChange={this.sendValue}/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
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
