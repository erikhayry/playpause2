import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    isLoading: true,
    browserUrl: 'http://sr.se',
    onWebviewReady: function(webview){
        const { ipcRenderer } = require('electron');
        this.set('webview', webview);


        webview.addEventListener("dom-ready", () => {
            if(config.environment === 'development'){
                webview.openDevTools();
            }
        });

        webview.addEventListener('will-navigate', (event) => {
            console.log('will-navigate', event)
        });

        webview.addEventListener('did-navigate', (event) => {
            console.log('did-navigate', event)
        });

        webview.addEventListener('did-navigate-in-page', (event) => {
            console.log('did-navigate-in-page', event)
            this.set('browserUrl', event.url);
            this.set('isLoading', false);
            this.sendAction('didNavigate', event.url)
        });
    },
    didInsertElement() {

    },

    actions: {
        onWebviewReady: function(webview){
            console.log('onWebviewReady', webview);
            this.onWebviewReady(webview);
        },
        loadUrl: function(url){
            console.log('loadUrl', url)
            this.set('guestUrl', url);
        },
        closeAlert: function (alertName) {
            this.set(alertName, '');
        },
        saveCandidate: function(name, url, playPauseActionScript, stopActionScript, nextActionScript, previousActionScript) {
            this.sendAction('saveCandidate', name, url, playPauseActionScript, stopActionScript, nextActionScript, previousActionScript)
        },
    }
});
