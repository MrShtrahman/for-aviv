import styles from './App.module.css';
import AddUser from './components/AddUser';
import CreateExcelFile from './components/CreateExcelFile';

const App = () => (
  <div className={styles.AppContainer}>
    <h1>הוסף פעילויות משתמשים</h1>
    <div className={styles.App}>
      <AddUser />
      <CreateExcelFile />
    </div>
  </div>
)

export default App;