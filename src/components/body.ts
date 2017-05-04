import { Column } from './../interfaces/column';
export const body = (data: Column[][]): string => {

    const getRowSum = (row: Column[]):number => {
        return row.reduce((sum, item) => sum + item.amount, 0);
    }

    const result = [
        '<tbody>',
        ...data.map((columns, rowIndex) => {
            const row = [
                `<tr id="row-${rowIndex}">`,
                ...columns.map((col, colIndex) => {
                    return `<td data-row="${ rowIndex }" 
                                data-col="${ colIndex }" 
                                class="field"
                                id="${ col.id }">${ col.amount }</td>`
                }),
                `<td class="sum" data-row="${rowIndex}">${ getRowSum(columns) }</td>`,
                `<td class="action"><button class="delete" data-row="${rowIndex}">X</button></td>`,
                '</tr>'
            ];
            return row.join('');
        }),
        '</tbody>'
    ];
    return result.join('');
}