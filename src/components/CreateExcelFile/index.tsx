import { useState } from 'react';

import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { User, weekDays, deleteUsers } from 'redux/reducers/usersReducer';
import { useAppSelector, useAppDispatch } from 'redux/hooks';

const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const CreateExcelFile = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.usersReducer);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onExcelFileCreation = () => {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('משתמשים');
    sheet.addRow(weekDays);
    users.forEach((user: User) => {
      const row = weekDays.map(day => {
        const activity = user.activities.find(userAct => userAct.day.replace(' ', '') === day);
        if (activity) {
          return day === 'חמישי' && activity.type.indexOf('שקיל') !== -1 ? '' : `${user.name} - ${activity.type}`;
        }
        return day !== 'חמישי' ? `${user.name} - מנוחה` : '';
      });
      sheet.addRow(row);
    });
    sheet.columns.forEach(column => {
      let maxLength = 0;
      column['eachCell'] &&
        column['eachCell']({ includeEmpty: true }, cell => {
          const columnLength = cell.value ? cell.value.toString().length : 8;
          if (columnLength > maxLength) maxLength = columnLength;
        });
      column.width = maxLength < 8 ? 8 : maxLength;
    });
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: blobType });
      saveAs(blob, `${format(new Date(), 'dd.MM.yyyy')}.xlsx`);
    });
  };

  const onUsersDeletionConfirm = () => {
    dispatch(deleteUsers(''));
    setIsConfirmOpen(false);
  };

  return (
    <Button.Group widths='10'>
      <Button color='red' onClick={() => setIsConfirmOpen(true)} icon labelPosition='left'>
        <Icon name='delete' />
        אפס טבלה
      </Button>
      <Button color='facebook' onClick={onExcelFileCreation} icon labelPosition='left'>
        <Icon name='file' />
        צור קובץ אקסל חדש
      </Button>
      <Confirm
        open={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={onUsersDeletionConfirm}
        cancelButton='סגור'
        confirmButton='מחק'
        content='?האם ברצונך למחוק את טבלת המשתמשים'
      />
    </Button.Group>
  );
};

export default CreateExcelFile;
