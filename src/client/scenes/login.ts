import { socket } from './../../shared/socket';
import {GameEvent} from '../../shared/events.model';
// import * as socketIo from 'socket.io-client';

declare const window: any;
const SERVER_URL = 'http://localhost:3000';

export class LoginScene extends Phaser.Scene {

    public formContainer: HTMLDivElement;
    public loginPage: HTMLDivElement;
    public form: HTMLDivElement;
    public loginForm: HTMLFormElement;
    public input: HTMLInputElement;
    public button: HTMLButtonElement;
    private name: any;

    constructor() {
        super({
            key: "LoginScene"
        });
        this.createForm();
    }

    private createForm() {
        this.formContainer = document.createElement('div');
        this.formContainer.className = 'form-container';

        this.loginPage = document.createElement('div');
        this.loginPage.className = 'login-page';

        this.form = document.createElement('div');
        this.form.className = 'form';

        this.loginForm = document.createElement('form');

        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.placeholder = 'username';
        this.input.id = 'your-name';
        this.input.focus();

        this.button = document.createElement('button');
        this.button.innerText = 'Join game';
        this.button.addEventListener('click', (e) => this.createPlayer(e));

        this.loginForm.appendChild(this.input);
        this.loginForm.appendChild(this.button);
        this.loginPage.appendChild(this.form);
        this.form.appendChild(this.loginForm);
        this.formContainer.appendChild(this.loginPage);

        document.body.appendChild(this.formContainer);
    }

    private createPlayer(e): void {
        e.preventDefault();
        this.toggleLogin();
        const name = this.input.value;
        socket.emit(GameEvent.authentication, {name}, {
            x: window.innerWidth,
            y: window.innerHeight
        });
        this.scene.start("GameScene");
    }

    private toggleLogin(): void {
        this.formContainer.classList.toggle('visible');
    }

}