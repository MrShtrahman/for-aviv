import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import AddToOnlineFile from 'components/AddToOnlineFile';
import ChooseOnlineFile from 'components/ChooseOnlineFile';
import styles from './App.module.css';
import AddUser from './components/AddUser';
import CreateExcelFile from './components/CreateExcelFile';

const App = () => {
  const [cookies, setCookie] = useCookies(['users', 'onlineFile']);

  useEffect(() => {
    if (!cookies.users) {
      setCookie('users', JSON.stringify([]))
    }
    if (!Array.isArray(cookies.users)) {
      setCookie('users', JSON.stringify(Array.from(cookies.users)))
    }
    if (!cookies.onlineFile) setCookie('onlineFile', 1)
  }, [])

  return (
    <div className={styles.AppContainer}>
      <h1>הוסף פעילויות משתמשים</h1>
      <div className={styles.App}>
        <AddUser />
        <br />
        {/* <ChooseOnlineFile />
      {'         '}
      <AddToOnlineFile /> */}
        <br />
        <br />
        <CreateExcelFile />
      </div>
    </div>
  )
}

export default App;