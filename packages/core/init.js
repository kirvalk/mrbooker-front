const { createElement } = require('react');
const { render } = require('react-dom');
const Main = require('main/main.jsx');

render(createElement(Main), document.getElementById('root'));

module.hot.accept();
