const React = require('react');
const PropTypes = require('prop-types');

class Checkbox extends React.Component {
  render() {
    const { id } = this.props;
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
