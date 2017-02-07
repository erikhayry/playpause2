'use strict';
import { Logger } from "./logger";
import { Subscriber } from "./subscriber";
//TODO handle exports error on load
export class Render {
    constructor() {
        this.logger = new Logger('Render', 'pink');
        this.logger.log('constructor');
        const MAIN = require('electron').ipcRenderer;
        this.subscriber = new Subscriber();
        MAIN.on('playpause', (event) => this.subscriber.publish('playpause', event));
    }
}
