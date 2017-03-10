import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    isLoading: true,
    browserUrl: 'http://sr.se',
    didInsertElement() {
        let webview = this.set('webview', this.element.getElementsByTagName('webview')[0]);


        webview.addEventListener("dom-ready", () => {
            if(config.environment === 'development'){
                webview.openDevTools();
            }
        });

        webview.addEventListener('ipc-message', (event) => {
            console.log('ipc-message', event)
            switch (event.channel) {
                case 'candidatesFound':
                    this.sendAction('onCandidatesFound', event.args[0])
                    this.set('info', 'Found ' + event.args[0]  + ' candidates');
                    break;
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

    actions: {
        loadUrl: function(url){
            console.log('loadUrl', url)
            this.set('guestUrl', url);
        },
        findCandidates: function(url){
            console.log('findCandidates', url)
            this.get('webview').send("findCandidates", url);
        },
        closeAlert: function () {
            this.set('info', '');
        }
    }
});
