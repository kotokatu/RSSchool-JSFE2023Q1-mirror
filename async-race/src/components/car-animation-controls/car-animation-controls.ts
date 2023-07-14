import { Button } from '../button/button';
import { BaseComponent } from '../base-component';

type DriveControlsParams = {
    parent: BaseComponent;
    startButtonContent: string;
    stopButtonContent: string;
    onStart: () => void;
    onStop: () => void;
};

export default class DriveControls extends BaseComponent {
    startBtn: Button;
    stopBtn: Button;
    onStart: () => void;
    onStop: () => void;
    constructor(params: DriveControlsParams) {
        super({ parent: params.parent, classNames: ['drive-controls'] });
        this.onStart = params.onStart;
        this.onStop = params.onStop;
        this.startBtn = new Button({
            parent: this,
            classNames: ['button-start'],
            content: params.startButtonContent,
            onClick: () => this.handleStartBtnClick(),
        });
        this.stopBtn = new Button({
            parent: this,
            classNames: ['button-stop'],
            content: params.stopButtonContent,
            onClick: () => this.handleStopBtnClick(),
        });
        this.stopBtn.disable();
    }

    async handleStartBtnClick() {
        this.startBtn.disable();
        this.stopBtn.enable();
        await this.onStart();
    }

    async handleStopBtnClick() {
        this.stopBtn.disable();
        this.startBtn.enable();
        await this.onStop();
    }
}
