import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { Button } from 'semantic-ui-react';

import { useAppSelector } from 'redux/hooks';
import { User, weekDays } from 'redux/reducers/usersReducer';

const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const CreateExcelFile = () => {
    const { users } = useAppSelector(state => state.usersReducer);

    const onClick = async () => {
        const workbook = new Workbook();
        const sheet = workbook.addWorksheet('משתמשים');
        sheet.addRow(weekDays)
        users.forEach((user: User) => {
            // let row: string[] = [];
            // user.activities.forEach((activity: UserActivity) => {
            //     const dayIndex = weekDays.findIndex(elem => activity.day === elem) + 1;
            //     row[dayIndex] = `${user.name} - ${activity.type}`
            // })
            const row = weekDays.map(day => {
                const activity = user.activities.find(userAct => userAct.day === day);
                if (activity) return `${user.name} - ${activity.type}`
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

    return <Button color='blue' {...{ onClick }}>צור קובץ אקסל</Button>
}

export default CreateExcelFile;