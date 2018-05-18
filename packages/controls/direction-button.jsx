const React = require('react');

class DirectionButton extends React.Component {
  render() {
    return (
      <button
        data-direction={this.props.dir}
        data-step={this.props.step}
        onClick={this.props.moveWeek}>
        {this.props.dir === 'prev' && this.props.step === 'week' && '<<'}
        {this.props.dir === 'next' && this.props.step === 'week' && '>>'}
        {this.props.dir === 'prev' && this.props.step === 'day' && '<'}
        {this.props.dir === 'next' && this.props.step === 'day' && '>'}
        </button>
    );
  }
}


module.exports = DirectionButton;
