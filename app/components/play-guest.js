import Ember from 'ember';
import Guest from '../custom-objects/guest'

export default Ember.Component.extend({
    didInsertElement() {
        const { ipcRenderer } = requireNode('electron');
        let webview = this.element.getElementsByTagName('webview')[0];

        Guest.create({
            webview: webview
        });

        webview.addEventListener('did-stop-loading', () => {
            webview.openDevTools();
        });
        console.log(this.element.getElementsByTagName('webview')[0]);
        ipcRenderer.on('playpause', (event) => {
            console.log('playpause');
            console.log(event);
            webview.executeJavaScript('console.log("playpause")');
        });
    }
});
