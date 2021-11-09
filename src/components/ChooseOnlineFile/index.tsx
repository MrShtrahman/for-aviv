import { Button } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';

const StillNotSure = () => {

    const [cookies, setCookie] = useCookies(['onlineFile']);

    return (
        <Button.Group>
            <Button color={cookies.onlineFile === 1 ? 'green' : 'red'} onClick={() => setCookie('onlineFile', 1)}>אונליין 1</Button>
            <Button.Or />
            <Button color={cookies.onlineFile === 2 ? 'green' : 'red'} onClick={() => setCookie('onlineFile', 2)}>אונליין 2</Button>
        </Button.Group>
    )
}

export default StillNotSure;