import { Component, Input, Output, EventEmitter, ApplicationRef, ChangeDetectionStrategy } from "@angular/core";
import { TableData, Data, CriteriaSelection } from "./../../comparison/shared/index";
import { ComparisonCitationService } from "./../../comparison/components/comparison-citation.service";

@Component({
    selector: 'generictable',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent {
    @Input() display: boolean = false;
    @Input() settings: boolean = false;
    @Input() columns: Array<TableData> = new Array<TableData>();

    @Input() data: Array<Data> = new Array<Data>();
    @Input() query: {[name: string]: CriteriaSelection;} = {};
    @Input() displayTemplate: boolean = false;

    @Input() citationServ: ComparisonCitationService;

    @Output() settingsCallback: EventEmitter<any> = new EventEmitter();
    @Output() showDetails: EventEmitter<any> = new EventEmitter();

    @Input() changeNum: number = 0;

    @Input() order: Array<String> = new Array<String>();
    @Output() orderChange: EventEmitter<any> = new EventEmitter();
    @Input() orderOption: Array<number> = new Array<number>();
    @Output() orderOptionChange: EventEmitter<any> = new EventEmitter();

    private ctrlCounter: number = 0;

    constructor(private ar: ApplicationRef) {
    }

    private orderClick(e: MouseEvent, value: string) {
        let pos: number = this.order.findIndex(name => name == value);
        if (e.ctrlKey) {
            this.ctrlCounter = this.order[this.ctrlCounter] == value ? this.ctrlCounter : this.ctrlCounter + 1;
        } else {
            this.ctrlCounter = 0;
        }
        if (typeof pos != 'undefined' && pos >= 0) {
            this.order[this.ctrlCounter] = value;
            this.orderOption[this.ctrlCounter] = this.orderOption[pos] == 1 ? -1 : 1;
            this.orderOption[pos] = pos != this.ctrlCounter ? 0 : this.orderOption[this.ctrlCounter];
        } else {
            this.order[this.ctrlCounter] = value;
            this.orderOption[this.ctrlCounter] = 1;
        }
        if (this.ctrlCounter == 0) {
            for (let i = 1; i < this.orderOption.length; i++) {
                this.orderOption[i] = 0;
            }
        }
        this.orderChange.emit(this.order);
        this.orderOptionChange.emit(this.orderOption);
    }

    private displayOrder(value: string, option: number): boolean {
        return this.order.findIndex(val => val == value) >= 0 && this.orderOption[this.order.findIndex(val => val == value)] == option;
    }
}