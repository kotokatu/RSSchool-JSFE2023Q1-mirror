import { BaseComponent } from '../../../../base-component';
import './table-header-cell.scss';

export default class TableHeaderCell extends BaseComponent {
    private onClick?: () => void;

    private marker?: BaseComponent;

    constructor(parent: BaseComponent, className: string, content: string, onClick?: () => void) {
        super({
            tag: 'th',
            parent,
            content,
            classNames: ['table-cell', 'table-header-cell', className],
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
        this.marker?.getNode().classList.remove('arrow-up');
    }
}
