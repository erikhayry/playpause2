/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/ember/index.d.ts" />
import IpcRenderer = Electron.IpcRenderer;
import IpcRendererEvent = Electron.IpcRendererEvent;
import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement(){
        const MAIN:IpcRenderer = require('electron').ipcRenderer;
        let webview = this.element.getElementsByTagName('webview')[0];
        webview.addEventListener('did-stop-loading', () => {
            webview.openDevTools();
        });
        console.log(this.element.getElementsByTagName('webview')[0])

        MAIN.on('playpause', (event:IpcRendererEvent) => {
            console.log('playpause')
            console.log(event)
            webview.executeJavaScript('console.log("playpause")');
        });
    }
});
