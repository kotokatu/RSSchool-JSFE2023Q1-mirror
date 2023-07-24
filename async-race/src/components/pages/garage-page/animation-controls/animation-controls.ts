import Button from '../../../button/button';
import BaseComponent from '../../../base-component';

type AnimationControlsParams = {
    class: string;
    startButtonContent: string;
    stopButtonContent: string;
    onStart: () => void;
    onStop: () => void;
    parent?: BaseComponent;
};

export default class AnimationControls extends BaseComponent {
    public startBtn!: Button;

    public stopBtn!: Button;

    private onStart: () => void;

    private onStop: () => void;

    constructor(params: AnimationControlsParams) {
        super('div', [`${params.class}-animation-controls`], params.parent);
        this.onStart = params.onStart;
        this.onStop = params.onStop;
        this.render(params.startButtonContent, params.stopButtonContent);
    }

    private render(startButtonContent: string, stopButtonContent: string): void {
        this.startBtn = new Button(this.onStart, this, ['button-start'], startButtonContent);
        this.stopBtn = new Button(this.onStop, this, ['button-stop'], stopButtonContent);
    }
}
