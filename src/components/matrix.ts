import { getParentByTagName } from './getParentNodeByTagName';
import { highlightFields } from './hightLight';
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

            if (element.className === 'add') {
                this.data.push(this.generateRow());
                this.render();
            }

            if (element.className.indexOf('field') !== -1) {
                const row = +element['dataset'].row;
                const col = +element['dataset'].col;
                this.incrementField(row, col);
            }
        });

        this.element.addEventListener('mouseover', (e: Event) => {
            let element: Element = <Element>e.target;
            if (element.className.indexOf('field') !== -1) {
                if(element.nodeName !== 'TD') {
                    element = getParentByTagName(element, 'TD');
                }
                const row = +element['dataset'].row;
                const col = +element['dataset'].col;
                highlightFields(this.data, this.data[row][col].amount, this.highLight);
            }
            if (element.className === 'sum') {
                (<Element>element.parentNode).className = 'show-percents';
            }
        });

        this.element.addEventListener('mouseout', (e: Event) => {
            const element: Element = <Element>e.target;
            if (element.className.indexOf('field') !== -1) {
                this.removeHightLight();
            }
            if (element.className === 'sum') {
                (<Element>element.parentNode).className = '';
            }
        });
    }

    generateMatrix() {
        this.data = [];
        for (let i = 0; i < this.rows; i++) {
            this.data.push(this.generateRow());
        }
        console.table(this.data);
    }

    generateRow() {
        let row = [];
        for (let i = 0; i < this.columns; i++) {
            row.push({
                id: this.id++,
                amount: Math.floor(Math.random() * 1000)
            });
        }
        return row;
    }

    render() {
        const table = `<table>
            ${ header(this.data)}
            ${ body(this.data)}
        </table>
        <button class="add">Add</button>`;
        this.element.innerHTML = table;
    }

    incrementField(row: number, col: number) {
        this.data[row][col].amount++;
        this.render();
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