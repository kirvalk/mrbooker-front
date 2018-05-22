const React = require('react');
const PropTypes = require('prop-types');

class DirectionButton extends React.Component {
  constructor(props) {
    super(props);

    this.getButtonName = this.getButtonName.bind(this);
  }

  getButtonName() {
    const { dir, step } = this.props;
    let name = '';
    if (dir === 'prev') {
      if (step === 'week') {
        name = '<<';
      } if (step === 'day') {
        name = '<';
      }
    } else if (dir === 'next') {
      if (step === 'week') {
        name = '>>';
      } if (step === 'day') {
        name = '>';
      }
    }
    return name;
  }

  render() {
    const { dir, step, moveWeek } = this.props;
    return (
      <button
        type="button"
        data-direction={dir}
        data-step={step}
        onClick={moveWeek}
      >
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
