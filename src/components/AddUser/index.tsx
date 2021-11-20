import { useState, ChangeEvent, MouseEvent } from 'react';
import { Form, TextAreaProps } from 'semantic-ui-react';

import { useAppDispatch } from 'redux/hooks';
import { addUser } from 'redux/reducers/usersReducer';
import { parseActivities } from './parser';
import { parseSpecialActivities } from './specialParser';

const AddUser = () => {
    const dispatch = useAppDispatch();
    const [currActivities, setCurrActivities] = useState<string>('');
    const [currSpecialActivities, setCurrSpecialActivities] = useState<string>('');
    const [currName, setCurrName] = useState<string>('');

    const onNameChange = (_: ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
        data.value && setCurrName(data.value.toString());

    const onActivitiesChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setCurrActivities(event.target.value);

    const onSpecialActivitiesChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setCurrSpecialActivities(event.target.value);

    const onClick = (event: MouseEvent) => {
        event.preventDefault();
        const normalActivities = currActivities !== ''
        dispatch(addUser({
            name: currName, activities: normalActivities ? parseActivities(currActivities) : parseSpecialActivities(currSpecialActivities)
        }))
        setCurrName('');
        setCurrSpecialActivities('');
        setCurrActivities('');
    }

    return (
        <Form>
            <Form.TextArea fluid label='הוסף שם'
                onChange={(event, data) => onNameChange(event, data)}
                style={{ height: 45 }} value={currName} />
            <Form.TextArea label='הוסף פעילויות שבועיות'
                onChange={event => onActivitiesChange(event)}
                style={{ minHeight: 250 }} value={currActivities} />
            <Form.TextArea label='הוסף פעילויות שבועיות - פורמט מיוחד'
                onChange={event => onSpecialActivitiesChange(event)}
                style={{ minHeight: 100 }} value={currSpecialActivities} />
            {/* <Form.Group widths='equal'>
                <Form.Field>
                    <Icon name='check circle' color='green' size='big' />
                    <Label>{`המשתמש ${currName} נוסף בהצלחה`}</Label>
                </Form.Field> */}
            <Form.Button color='green' onClick={event => onClick(event)}>הוסף משתמש</Form.Button>
            {/* </Form.Group> */}
        </Form >
    )
}

export default AddUser;