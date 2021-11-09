import { useState, ChangeEvent, MouseEvent } from 'react';
import { Form, Label, TextAreaProps, Icon } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';

import { parseActivities } from './parser';

const AddUser = () => {
    const [cookies, setCookie] = useCookies(['users'])
    const [currActivities, setCurrActivities] = useState<string>('');
    const [currName, setCurrName] = useState<string>('');

    const onNameChange = (_: ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
        data.value && setCurrName(data.value.toString());

    const onActivitiesChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setCurrActivities(event.target.value);

    const onClick = (event: MouseEvent) => {
        event.preventDefault();
        const currentUsers = [...cookies.users, { name: currName, activities: parseActivities(currActivities) }]
        setCookie('users', JSON.stringify(currentUsers))
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