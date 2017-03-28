import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    onWebviewReady(webview) {
        const { ipcRenderer } = require('electron');

        ipcRenderer.on('playpause', () => {
            console.log(this.get('stationPlayPauseAction'))
            webview.executeJavaScript(this.get('stationPlayPauseAction'));
        });

        ipcRenderer.on('stop', () => {
            console.log(this.get('stationStopAction'))
            webview.executeJavaScript(this.get('stationStopAction'));
        });

        ipcRenderer.on('next', () => {
            console.log(this.get('stationNextAction'))
            webview.executeJavaScript(this.get('stationNextAction'));
        });

        ipcRenderer.on('previous', () => {
            console.log(this.get('stationPreviousAction'))
            webview.executeJavaScript(this.get('stationPreviousAction'));
        });

        webview.addEventListener("dom-ready", () => {
            if(config.environment === 'development'){
                webview.openDevTools();
            }
        });
    },
    actions: {
        onWebviewReady: function(webview){
            this.onWebviewReady(webview)
        },
        closeAlert: function () {
            this.set('error', '');
        }
    }
});
