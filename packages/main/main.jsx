const React = require('react');
const BookEntries = require('book-entries/book-entries.jsx');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };

    this.getClass = this.getClass.bind(this);
    this.changeLoadingStatus = this.changeLoadingStatus.bind(this);
  }

  getClass() {
    const { isLoading } = this.state;
    return isLoading ? 'main main__loading' : 'main';
  }

  changeLoadingStatus(bool) {
    this.setState({ isLoading: bool });
  }

  render() {
    return (
      <div className={this.getClass()}>
        <BookEntries changeLoadingStatus={this.changeLoadingStatus} />
      </div>
    );
  }
}

module.exports = Main;
