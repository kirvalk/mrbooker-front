const React = require('react');
const PropTypes = require('prop-types');

class Checkbox extends React.Component {
  getUnicId() {
    return String((Math.random()
      .toString(16)
      .split('.')[1]));
  }

  render() {
    const id = this.getUnicId();
    return (
      <div>
        <input type="checkbox" className="checkbox" id={id}/>
        <label htmlFor={id}>{this.props.label}</label>
      </div>
    );
  }
}

Checkbox.propTypes = { label: PropTypes.string };

module.exports = Checkbox;
