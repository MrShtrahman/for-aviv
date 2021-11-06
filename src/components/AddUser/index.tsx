import { useState, ChangeEvent, MouseEvent } from 'react';
import { Form, InputOnChangeData, TextAreaProps } from 'semantic-ui-react';

import { useAppDispatch } from 'redux/hooks';
import { addUser } from 'redux/reducers/usersReducer';
import { parseActivities } from './parser';

const AddUser = () => {
    const dispatch = useAppDispatch();
    const [currActivities, setCurrActivities] = useState<string>('');
    const [currName, setCurrName] = useState<string>('');
    const onNameChange = (_: ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
        data.value && setCurrName(data.value.toString());

    const onActivitiesChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setCurrActivities(event.target.value);

    const onClick = (event: MouseEvent) => {
        event.preventDefault();
        dispatch(addUser({
            name: currName, activities: parseActivities(currActivities)
        }))
        setCurrName('');
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
            <Form.Button color='green'
                onClick={event => onClick(event)}>הוסף</Form.Button>
        </Form>
    )
}

export default AddUser;