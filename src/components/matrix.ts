import { Column } from './../interfaces/column';
import { body } from './body';
import { header } from './header';

export class Matrix {
    private id: number;
    public data: Column[][];

    constructor(
        private rows: number,
        private columns: number,
        private highLight: number,
        private element: Element
    ) {
        this.id = 1;
        this.generateMatrix();
        this.render();
        this.element.addEventListener('click', (e: Event) => {
            const element: Element = <Element>e.target;
            if (element.className === 'delete') {
                const index = +element['dataset'].row;
                this.deleteRow(index);
            }

            if (element.className.indexOf('field') !== -1) {
                const row = +element['dataset'].row;
                const col = +element['dataset'].col;
                this.incrementField(row, col);
            }
        });

        this.element.addEventListener('mouseover', (e: Event) => {
            const element: Element = <Element>e.target;
            if (element.className.indexOf('field') !== -1) {
                const row = +element['dataset'].row;
                const col = +element['dataset'].col;
                this.highLightFields(this.data[row][col].amount);
            }
        });

        this.element.addEventListener('mouseout', (e: Event) => {
            const element: Element = <Element>e.target;
            if (element.className.indexOf('field') !== -1) {
                this.removeHightLight();
            }
        });
    }

    generateMatrix() {
        this.data = [];
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let i = 0; i < this.columns; i++) {
                row.push({
                    id: this.id++,
                    amount: Math.floor(Math.random() * 1000)
                });
            }
            this.data.push(row);
        }
        console.table(this.data);
    }

    render() {
        const table = `<table>
            ${ header(this.data)}
            ${ body(this.data)}
        </table>`;
        this.element.innerHTML = table;
    }

    incrementField(row: number, col: number) {
        this.data[row][col].amount++;
        this.render();
    }

    highLightFields(amount: number) {
        const result = [];
        let huevoe;
        let item;
        for (let col = 0; col < this.data.length; col++) {
            for (let row = 0; row < this.data[col].length; row++) {
                if (result.length < this.highLight) {
                    this.data[col][row].buff = Math.abs(this.data[col][row].amount - amount);
                    result.push(this.data[col][row]);
                } else {
                    this.data[col][row].buff = Math.abs(this.data[col][row].amount - amount);
                    for (let i = 0; i < result.length; i++) {
                        if (!huevoe || result[i].buff > huevoe) {
                            huevoe = result[i].buff;
                            item = i;
                        }
                    }
                    if (huevoe > this.data[col][row].buff) {
                        result.splice(item, 1);
                        result.push(this.data[col][row]);
                        huevoe = this.data[col][row].buff;
                        item = result.length - 1;
                    }
                }
            }
        }
        for (let i = 0; i < result.length; i++) {
            document.getElementById(result[i].id).className = 'field showX';
        }

    }

    removeHightLight() {
        const arr = document.getElementsByClassName('showX');
        for (let i = 0; i != arr.length;) {
            arr[i].className = 'field';
        }
    }

    deleteRow(index: number) {
        this.data.splice(index, 1);
        this.rows--;
        this.render();
    }
}