const React = require('react');
const BookEntries = require('book-entries/book-entries.jsx');

class Main extends React.Component {
  render() {
    return (
      <div>
        <BookEntries/>
      </div>
    );
  }
}

module.exports = Main;
