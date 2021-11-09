import { Button } from 'semantic-ui-react';
import { join } from 'path';
import { useCookies } from 'react-cookie';
import { Workbook } from 'exceljs';
import { User, weekDays } from 'consts';

const AddToOnlineFile = () => {

    const [cookies, setCookie] = useCookies(['users', 'onlineFile']);

    const onClick = () => {
        console.log(join(__dirname, '..', '..', 'אונליין 1'))
        let fileToWrite: string = join(__dirname, '..', '..', cookies.onlineFile.toString());
        // switch (onlineFile) {
        //     case 1:
        //         fileToWrite = join(workingFolder, 'אונליין 1');
        //         break;
        //     case 2:
        //         fileToWrite = join(workingFolder, 'אונליין 2');
        //         break;
        // }
        const workbook = new Workbook();
        workbook.xlsx.readFile(fileToWrite).then(() => {
            const sheet = workbook.getWorksheet(1);
            cookies.users.forEach((user: User) => {
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
            sheet.commit();
            return workbook.xlsx.writeFile(fileToWrite);
        })
    }

    return <Button primary {... { onClick }}>:הוסף לקובץ</Button>
}

export default AddToOnlineFile;