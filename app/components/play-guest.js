import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    onWebviewReady(webview) {
        const { ipcRenderer } = require('electron');

        ipcRenderer.on('playpause', () => {
            console.log(this.get('stationIdName'))
            console.log(this.get('stationClassName'))
            webview.send("playpause", this.get('stationIdName'), this.get('stationClassName'));
        });
        webview.addEventListener("dom-ready", () => {
            if(config.environment === 'development'){
                webview.openDevTools();
            }
        });
        webview.addEventListener('ipc-message', (event) => {
            switch (event.channel) {
                case 'playpausedfailed':
                    this.set('error', 'Unable to find element with selector ' + this.get('stationIdName') + ' / ' + this.get('stationClassName'));
                    break;
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
