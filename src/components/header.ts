import { Column } from './../interfaces/column';
export const header = (data: Column[][]): string => {
    const rowCount = data.length;
    const columnCount = data[0].length;
    const columns = [];
    for(let i = 0; i < columnCount; i++){
        const sum = data.reduce((sum, row) => sum + row[i].amount, 0);
        const column = `<th id="column-${i}">${ (sum / rowCount).toFixed(2) }</th>`;
        columns.push(column);
    }

    const result = [
        '<thead><tr>',
        ...columns,
        '</tr></thead>'
    ];
    return result.join('');
} 