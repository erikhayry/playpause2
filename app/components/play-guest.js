import Ember from 'ember';
export default Ember.Component.extend({
    didInsertElement() {
        const MAIN = require('electron').ipcRenderer;
        let webview = this.element.getElementsByTagName('webview')[0];
        webview.addEventListener('did-stop-loading', () => {
            webview.openDevTools();
        });
        console.log(this.element.getElementsByTagName('webview')[0]);
        MAIN.on('playpause', (event) => {
            console.log('playpause');
            console.log(event);
            webview.executeJavaScript('console.log("playpause")');
        });
    }
});
