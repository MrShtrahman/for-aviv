import styles from './App.module.css';
import AddUser from './components/AddUser';
import CreateExcelFile from './components/CreateExcelFile';

const App = () => (
  <div className={styles.AppContainer}>
    <br />
    <h1 style={{ fontSize: '2.5rem' }}>הוסף פעילויות משתמשים</h1>
    <div className={styles.App}>
      <AddUser />
      <br />
      <br />
      <CreateExcelFile />
    </div>
  </div>
);

export default App;
