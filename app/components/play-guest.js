import Ember from 'ember';

export default Ember.Component.extend({

    onWebviewReady(webview) {
        const { ipcRenderer } = require('electron');

        ipcRenderer.on('playpause', () => {
            console.log(this.get('stationPlayPauseAction'));
            this.sendAction('activeAction', 'playpause');
            webview.executeJavaScript(this.get('stationPlayPauseAction'));
        });

        ipcRenderer.on('stop', () => {
            console.log(this.get('stationStopAction'));
            this.sendAction('activeAction', 'stop');
            webview.executeJavaScript(this.get('stationStopAction'));
        });

        ipcRenderer.on('next', () => {
            console.log(this.get('stationNextAction'));
            this.sendAction('activeAction', 'next');
            webview.executeJavaScript(this.get('stationNextAction'));
        });

        ipcRenderer.on('previous', () => {
            console.log(this.get('stationPreviousAction'));
            this.sendAction('activeAction', 'previous');
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
