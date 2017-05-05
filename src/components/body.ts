import { Column } from './../interfaces/column';
export const body = (data: Column[][]): string => {

    const getRowSum = (row: Column[]):number => {
        return row.reduce((sum, item) => sum + item.amount, 0);
    }

    const result = [
        '<tbody>',
        ...data.map((columns, rowIndex) => {
            const rowSum = getRowSum(columns);
            const row = [
                `<tr id="row-${rowIndex}">`,
                ...columns.map((col, colIndex) => {
                    const colPercents = (col.amount / (rowSum / 100)).toFixed(2);
                    return `<td data-row="${ rowIndex }" 
                                data-col="${ colIndex }" 
                                class="field"
                                id="${ col.id }">
                                <span class="field-value">${ col.amount }</span>
                                <span class="field-percents">
                                    <span class="field-percents-value">${ colPercents }%</span>
                                    <span class="field-percents-bg" style="height: ${colPercents}%;"></span>
                                </span>
                            </td>`
                }),
                `<td class="sum" data-row="${rowIndex}">${ rowSum }</td>`,
                `<td class="action"><button class="delete" data-row="${rowIndex}">X</button></td>`,
                '</tr>'
            ];
            return row.join('');
        }),
        '</tbody>'
    ];
    return result.join('');
}