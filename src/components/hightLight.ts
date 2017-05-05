import { Column } from './../interfaces/column';
export const highlightFields = (data:Column[][], amount: number, highLight: number) => {
    const result = [];
    let huevoe;
    let item;
    for (let col = 0; col < data.length; col++) {
        for (let row = 0; row < data[col].length; row++) {
            if (result.length < highLight) {
                data[col][row].buff = Math.abs(data[col][row].amount - amount);
                result.push(data[col][row]);
            } else {
                data[col][row].buff = Math.abs(data[col][row].amount - amount);
                for (let i = 0; i < result.length; i++) {
                    if (!huevoe || result[i].buff > huevoe) {
                        huevoe = result[i].buff;
                        item = i;
                    }
                }
                if (huevoe > data[col][row].buff) {
                    result.splice(item, 1);
                    result.push(data[col][row]);
                    huevoe = data[col][row].buff;
                    item = result.length - 1;
                }
            }
        }
    }
    for (let i = 0; i < result.length; i++) {
        document.getElementById(result[i].id).className = 'field showX';
    }
    return result;

}