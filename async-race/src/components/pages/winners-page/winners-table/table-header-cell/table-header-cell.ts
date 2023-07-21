import { BaseComponent } from '../../../../base-component';
import './table-header-cell.css';

export default class TableHeaderCell extends BaseComponent {
    private onClick?: () => void;

    private marker?: BaseComponent;

    constructor(parent: BaseComponent, content: string, onClick?: () => void) {
        super({
            tag: 'th',
            parent,
            content,
            classNames: ['table-header-cell'],
        });
        if (onClick) {
            this.onClick = onClick;
            this.renderMarker();
        }
    }

    private renderMarker(): void {
        this.addListener('click', () => this.handleClick());
        this.marker = new BaseComponent({
            tag: 'span',
            parent: this,
            content: '↓',
            classNames: ['marker'],
        });
    }

    private handleClick(): void {
        this.showMarker();
        this.onClick?.();
    }

    private showMarker(): void {
        this.marker?.setCssClasses(['visible']);
        this.marker?.getNode().classList.toggle('arrow-up');
    }

    public hideMarker(): void {
        this.marker?.removeCssClasses(['visible']);
    }
}
