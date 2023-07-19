import { BaseComponent } from '../../../../base-component';
import './table-header-cell.css';

export default class TableHeaderCell extends BaseComponent {
    onClick?: () => void;
    marker?: BaseComponent;
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

    private renderMarker() {
        this.addListener('click', () => this.handleClick());
        this.marker = new BaseComponent({
            tag: 'span',
            parent: this,
            content: '↓',
            classNames: ['marker'],
        });
    }

    private handleClick() {
        this.onClick?.();
        this.marker?.setCssClasses(['visible']);
        this.marker?.getNode().classList.toggle('arrow-up');
    }

    public hideMarker() {
        this.marker?.removeCssClasses(['visible']);
    }
}
