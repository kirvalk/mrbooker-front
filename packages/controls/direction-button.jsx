const React = require('react');
const PropTypes = require('prop-types');
const DirConfig = require('../core/direction-config');

class DirectionButton extends React.Component {
  constructor(props) {
    super(props);

    this.getButtonName = this.getButtonName.bind(this);
  }

  getButtonName() {
    const { dir, step } = this.props;
    return DirConfig[dir][step];
  }

  render() {
    const { dir, step, moveWeek } = this.props;
    return (
      <button
        className="btn"
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
