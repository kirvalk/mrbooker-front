const React = require('react');
const TextInput = require('controls/text-input.jsx');
const Checkbox = require('controls/checkbox.jsx');
const Button = require('controls/button.jsx');

class AddForm extends React.Component {
  render() {
    const placeholders = { name: 'Название', capacity: 'Вместимость' };
    const labels = { projector: 'Проектор', sound: 'Колонки', telephone: 'Телефон' };
    return (
      <div className="add-form">
        <div className="add-form__tite">Добавить переговорную в БД</div>
        <TextInput placeholder={placeholders.name} />
        <TextInput placeholder={placeholders.capacity} />
        <div className="add-form__equioment">Имеющееся оборудование:</div>
        <Checkbox label={labels.projector}/>
        <Checkbox label={labels.sound}/>
        <Checkbox label={labels.telephone}/>
        <Button />
      </div>
    );
  }
}

module.exports = AddForm;
