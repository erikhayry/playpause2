import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    didInsertElement() {
        const { ipcRenderer } = require('electron');
        let webview = this.element.getElementsByTagName('webview')[0];
        ipcRenderer.on('playpause', () => {
            webview.send("playpause", this.get('guest-selector'));
        });
        webview.addEventListener("dom-ready", () => {
            if(config.environment === 'development'){
                webview.openDevTools();
            }
        });
        webview.addEventListener('ipc-message', (event) => {
            switch (event.channel) {
                case 'playpausedfailed':
                    this.set('error', 'Unable to find element with selector ' + this.get('guest-selector'));
                    break;
            }
        });
    },
    actions: {
        closeAlert: function () {
            this.set('error', '');
        }
    }
});
