const React = require('react');
const PropTypes = require('prop-types');

class DirectionButton extends React.Component {
  constructor(props) {
    super(props);

    this.getButtonName = this.getButtonName.bind(this);
  }

  getButtonName() {
    let name = '';
    if (this.props.dir === 'prev') {
      if (this.props.step === 'week') {
        name = '<<';
      } if (this.props.step === 'day') {
        name = '<';
      }
    } else if (this.props.dir === 'next') {
      if (this.props.step === 'week') {
        name = '>>';
      } if (this.props.step === 'day') {
        name = '>';
      }
    }
    return name;
  }

  render() {
    return (
      <button
        data-direction={this.props.dir}
        data-step={this.props.step}
        onClick={this.props.moveWeek}>
        {this.getButtonName()}
        </button>
    );
  }
}

DirectionButton.propTypes = {
  dir: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  moveWeek: PropTypes.func.isRequired,
};
module.exports = DirectionButton;
