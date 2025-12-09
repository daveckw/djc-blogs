import * as XLSX from 'xlsx';

interface DataItem {
    [key: string]: any;
}

function exportToExcel(data: DataItem[], fieldToDisplay: string[]): void {
    let displayData: DataItem[] = [];
    if (data && fieldToDisplay) {
        displayData = data.map((item: DataItem) => {
            const obj: DataItem = {};
            fieldToDisplay.forEach((field: string) => {
                if (field === 'phone') {
                    obj[field] = keepOnlyNumbers(item[field]);
                } else {
                    obj[field] =
                        item[field] && typeof item[field] === 'string'
                            ? item[field].replace(/\\n/g, '\n')
                            : item[field];
                }
            });
            return obj;
        });
    }

    console.log(displayData);

    const downloadExcel = (): void => {
        const worksheet = XLSX.utils.json_to_sheet(displayData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Apply text wrapping and vertical alignment
        for (const key in worksheet) {
            if (key[0] === '!') continue;

            if (!worksheet[key].s) {
                worksheet[key].s = {};
            }
            worksheet[key].s.alignment = { wrapText: true, vertical: 'center' };
        }

        XLSX.writeFile(workbook, 'data.xlsx');
    };

    downloadExcel();
}

export default exportToExcel;

function keepOnlyNumbers(input: string | number | undefined | null): string {
    if (!input) return '';
    input = input.toString();
    const output: string = input.replace(/\D/g, '');
    return output;
}
