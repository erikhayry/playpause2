import Ember from 'ember';

export default Ember.Component.extend({
    
    onWebviewReady(webview) {
        const { ipcRenderer } = require('electron');

        ipcRenderer.on('playpause', () => {
            console.log(this.get('stationPlayPauseAction'));
            webview.executeJavaScript(this.get('stationPlayPauseAction'));
        });

        ipcRenderer.on('stop', () => {
            console.log(this.get('stationStopAction'));
            webview.executeJavaScript(this.get('stationStopAction'));
        });

        ipcRenderer.on('next', () => {
            console.log(this.get('stationNextAction'));
            webview.executeJavaScript(this.get('stationNextAction'));
        });

        ipcRenderer.on('previous', () => {
            console.log(this.get('stationPreviousAction'));
            webview.executeJavaScript(this.get('stationPreviousAction'));
        });

        ipcRenderer.on('openDevTools', () => {
            console.log(this.get('openDevToolsAction'));
            webview.openDevTools();
        });
    },
    actions: {
        onWebviewReady(webview){
            this.onWebviewReady(webview);
        },
        closeAlert() {
            this.set('error', '');
        }
    }
});
