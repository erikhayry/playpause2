import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    isLoading: true,
    browserUrl: 'http://sr.se',
    didReceiveAttrs() {
        this._super(...arguments);
        let url = this.get('url');
        if(url){
            this.set('guestUrl', url);
        }
    },
    onWebviewReady(webview){
        this.set('webview', webview);

        webview.addEventListener("dom-ready", () => {
            if(config.environment === 'development'){
                webview.openDevTools();
            }
        });

        webview.addEventListener('will-navigate', (event) => {
            console.log('will-navigate', event);
        });

        webview.addEventListener('did-navigate', (event) => {
            console.log('did-navigate', event, webview.getTitle());
        });

        webview.addEventListener('did-navigate-in-page', (event) => {
            console.log('did-navigate-in-page', event);
            this.set('browserUrl', event.url);
            this.set('isLoading', false);
            this.sendAction('didNavigate', event.url);
        });
    },
    actions: {
        onWebviewReady(webview){
            console.log('onWebviewReady', webview);
            this.onWebviewReady(webview);
        },
        loadUrl(url){
            console.log('loadUrl', url);
            this.set('guestUrl', url);
        },
        closeAlert(alertName) {
            this.set(alertName, '');
        },
        save(name, url, playPauseAction, stopAction, nextAction, previousAction) {
            this.sendAction('save', name, url, playPauseAction, stopAction, nextAction, previousAction);
        },
        update(value, type){
            console.log('update', value, type);
            this.set(type, value);
        }
    }
});
