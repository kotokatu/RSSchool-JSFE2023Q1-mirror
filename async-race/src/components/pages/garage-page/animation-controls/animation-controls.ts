import { Button } from '../../../button/button';
import { BaseComponent } from '../../../base-component';

type AnimationControlsParams = {
    class: string;
    startButtonContent: string;
    stopButtonContent: string;
    onStart: () => void;
    onStop: () => void;
};

export default class AnimationControls extends BaseComponent {
    public startBtn!: Button;

    public stopBtn!: Button;

    private onStart: () => void;

    private onStop: () => void;

    constructor(params: AnimationControlsParams) {
        super({ classNames: [`${params.class}-animation-controls`] });
        this.onStart = params.onStart;
        this.onStop = params.onStop;
        this.render(params.startButtonContent, params.stopButtonContent);
    }

    private render(startButtonContent: string, stopButtonContent: string): void {
        this.startBtn = new Button({
            parent: this,
            classNames: ['button-start'],
            content: startButtonContent,
            onClick: this.onStart,
        });
        this.stopBtn = new Button({
            parent: this,
            classNames: ['button-stop'],
            content: stopButtonContent,
            onClick: this.onStop,
        });
    }
}
