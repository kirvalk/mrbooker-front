const React = require('react');
const TextInput = require('controls/text-input.jsx');
const Checkbox = require('controls/checkbox.jsx');
const Button = require('controls/button.jsx');
const PropTypes = require('prop-types');


class AddForm extends React.Component {
  render() {
    const placeholders = { name: 'Название', capacity: 'Вместимость' };
    const labels = { projector: 'Проектор', sound: 'Колонки', telephone: 'Телефон' };
    return (
      <div className="add-form">
        <div className="add-form__tite">Добавить переговорную в БД</div>
        <TextInput id="name" placeholder={placeholders.name} />
        <TextInput id="capacity" placeholder={placeholders.capacity} />
        <div className="add-form__equioment">Имеющееся оборудование:</div>
        <Checkbox id="projector" label={labels.projector}/>
        <Checkbox id="sound" label={labels.sound}/>
        <Checkbox id="telephone" label={labels.telephone}/>
        <Button addRoom={this.props.addRoom} />
      </div>
    );
  }
}
AddForm.propTypes = { addRoom: PropTypes.func };
module.exports = AddForm;
