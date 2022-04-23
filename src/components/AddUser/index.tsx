import { useState, ChangeEvent } from 'react';
import { Form, TextAreaProps, Icon } from 'semantic-ui-react';

import { useAppDispatch } from 'redux/hooks';
import { addUser } from 'redux/reducers/usersReducer';
import { parseActivities } from './parser';
import { parseSpecialActivities } from './specialParser';
import { parsePowerAerobicActivities } from './powerAerobicParser';

const AddUser = () => {
  const dispatch = useAppDispatch();
  const [currActivities, setCurrActivities] = useState<string>('');
  const [currSpecialActivities, setCurrSpecialActivities] = useState<string>('');
  const [currPowerDays, setCurrPowerDays] = useState<string>('');
  const [currAerobicDays, setCurrAerobicDays] = useState<string>('');
  const [currName, setCurrName] = useState<string>('');

  const onNameChange = (_: ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
    data.value && setCurrName(data.value.toString());

  const onActivitiesChange = (event: ChangeEvent<HTMLTextAreaElement>) => setCurrActivities(event.target.value);
  const onPowerDaysChange = (event: ChangeEvent<HTMLTextAreaElement>) => setCurrPowerDays(event.target.value);
  const onAerobicDaysChange = (event: ChangeEvent<HTMLTextAreaElement>) => setCurrAerobicDays(event.target.value);

  const onSpecialActivitiesChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setCurrSpecialActivities(event.target.value);

  const dispatchUser = () => {
    const powerAerobicActivities = parsePowerAerobicActivities(currPowerDays, currAerobicDays);
    const normalActivities = currActivities !== '';
    dispatch(
      addUser({
        name: currName,
        activities: normalActivities ?
          parseActivities(currActivities).concat(powerAerobicActivities) :
          parseSpecialActivities(currSpecialActivities).concat(powerAerobicActivities)
      })
    );
    setCurrName('');
    setCurrSpecialActivities('');
    setCurrActivities('');
    setCurrAerobicDays('');
    setCurrPowerDays('');
  };

  return (
    <Form>
      <Form.TextArea
        label='הוסף שם'
        onChange={(event, data) => onNameChange(event, data)}
        style={{ height: 45 }}
        value={currName}
      />
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
        <Form.TextArea
          label='הוסף פעילויות שבועיות'
          onChange={event => onActivitiesChange(event)}
          style={{ minHeight: 277 }}
          value={currActivities}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Form.TextArea
            label='הוסף ימי אירובי'
            onChange={event => onAerobicDaysChange(event)}
            style={{ minHeight: 120 }}
            value={currAerobicDays}
          />
          <Form.TextArea
            label='הוסף ימי כוח'
            onChange={event => onPowerDaysChange(event)}
            style={{ minHeight: 120 }}
            value={currPowerDays}
          />
        </div>
      </div>
      <Form.TextArea
        label='הוסף פעילויות שבועיות - פורמט מיוחד'
        onChange={event => onSpecialActivitiesChange(event)}
        style={{ minHeight: 100 }}
        value={currSpecialActivities}
      />
      <Form.Button color='green' onClick={dispatchUser} icon labelPosition='left' fluid>
        <Icon name='users' />
        הוסף משתמש
      </Form.Button>
    </Form>
  );
};

export default AddUser;
