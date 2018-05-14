const React = require('react');

class Direction extends React.Component {
  render() {
    return (
      <button onClick={this.props.moveWeek.bind(this, this.props.dir)}>{this.props.dir}</button>
    );
  }
}


module.exports = Direction;
