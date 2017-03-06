import Ember from 'ember';
export default Ember.Component.extend({
    didInsertElement() {
        const { ipcRenderer } = require('electron');
        let webview = this.element.getElementsByTagName('webview')[0];
        ipcRenderer.on('playpause', (event) => {
            console.log('playpause');
            console.log(event);
            webview.send("playpause", this.get('guest-selector'));
        });
        webview.addEventListener("dom-ready", () => {
            webview.openDevTools();
        });
        webview.addEventListener('ipc-message', (event) => {
            console.log(event);
            console.info(event.channel);
            console.info(event.args[0]);
        });
    }
});
