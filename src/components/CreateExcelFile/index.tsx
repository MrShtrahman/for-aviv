import { useState } from 'react';

import { Workbook } from 'exceljs';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { Button, Confirm } from 'semantic-ui-react';

import { User, weekDays } from 'consts';

const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const CreateExcelFile = () => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [cookies, setCookie] = useCookies(['users']);

    const onExcelFileCreation = () => {
        const workbook = new Workbook();
        const sheet = workbook.addWorksheet('משתמשים');
        sheet.addRow(weekDays)
        cookies.users.forEach((user: User) => {
            const row = weekDays.map(day => {
                const activity = user.activities.find(userAct => userAct.day === day);
                if (activity) {
                    if (day === 'חמישי' && activity.type.indexOf('שקיל') !== -1) {
                        return ''
                    } else {
                        return `${user.name} - ${activity.type}`
                    }
                }
                else {
                    if (day !== 'חמישי') return `${user.name} - מנוחה`
                }
            })
            sheet.addRow(row);
        })
        sheet.columns.forEach(column => {
            let maxLength = 0;
            column['eachCell'] && column['eachCell']({ includeEmpty: true }, cell => {
                const columnLength = cell.value ? cell.value.toString().length : 8;
                if (columnLength > maxLength) maxLength = columnLength;
            })
            column.width = maxLength < 8 ? 8 : maxLength;
        })
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], { type: blobType });
            saveAs(blob, `${format(new Date(), 'dd.MM.yyyy')}.xlsx`)
        });
    }

    const onUsersDeletionConfirm = () => {
        setCookie('users', JSON.stringify([]))
        setIsConfirmOpen(false);
    };

    return <Button.Group widths='10'>
        <Button color='red' onClick={() => setIsConfirmOpen(true)}>אפס טבלת משתמשים</Button>
        <Button color='blue' onClick={onExcelFileCreation}>צור קובץ אקסל חדש</Button>
        <Confirm open={isConfirmOpen} onCancel={() => setIsConfirmOpen(false)}
            onConfirm={onUsersDeletionConfirm} cancelButton='סגור' confirmButton='מחק'
            content='?האם ברצונך למחוק את טבלת המשתמשים' />
    </Button.Group>
}

export default CreateExcelFile;