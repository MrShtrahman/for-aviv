import { useState, ChangeEvent } from 'react';
import { Form, FormInput, InputOnChangeData } from 'semantic-ui-react';

import { useAppDispatch } from '../../redux/hooks';
import { User, addUser } from '../../redux/reducers/usersReducer';
import { parseActivities } from './parser';

const AddUser = () => {
    const dispatch = useAppDispatch();
    const [currActivities, setCurrActivities] = useState<string>('');
    const [currName, setCurrName] = useState<string>('');
    const onNameChange = (_: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setCurrName(data.value);
    }
    const onActivitiesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrActivities(event.target.value);
    }

    const onClick = () => {
        dispatch(addUser({ name: currName, activities: parseActivities(currActivities) }))
    }

    return (
        <Form>
            <FormInput fluid label='הוסף שם'
                onChange={(event, data) => onNameChange(event, data)} />
            <Form.TextArea label='הוסף פעילויות שבועיות'
                onChange={event => onActivitiesChange(event)} />
            <Form.Button color='green'
                {...{ onClick }}>הוסף</Form.Button>
        </Form>
    )
}

export default AddUser;