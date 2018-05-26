const React = require('react');
const BookEntries = require('book-entries/book-entries.jsx');
const className = require('class-name/class-name');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };

    this.changeLoadingStatus = this.changeLoadingStatus.bind(this);
  }

  changeLoadingStatus(bool) {
    this.setState({ isLoading: bool });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className={className({ name: 'main', mods: { loading: isLoading } })}>
        <BookEntries changeLoadingStatus={this.changeLoadingStatus} />
      </div>
    );
  }
}

module.exports = Main;
