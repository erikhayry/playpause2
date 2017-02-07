'use strict';
import IpcRenderer = Electron.IpcRenderer;
import IpcRendererEvent = Electron.IpcRendererEvent;
import WebViewElement = Electron.WebViewElement;
import {Logger} from "./logger";
import {Subscriber} from "./subscriber";

//TODO handle exports error on load
export class Render{
  private logger = new Logger('Render', 'pink');
  private subscriber:Subscriber;

  constructor() {
    this.logger.log('constructor');
    const MAIN:IpcRenderer = require('electron').ipcRenderer;
    this.subscriber = new Subscriber();

    MAIN.on('playpause', (event:IpcRendererEvent) => this.subscriber.publish('playpause', event));
  }
}
