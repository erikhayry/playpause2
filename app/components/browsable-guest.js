import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    isLoading: true,
    browserUrl: 'http://sr.se',
    onWebviewReady: function(webview){
        const { ipcRenderer } = require('electron');
        this.set('webview', webview);


        ipcRenderer.on('playpause', () => {
            let candidate = this.get('candidate');
            console.log('playpause', candidate);
            if(candidate){
                webview.send("playpause", candidate.id, candidate.className);
            }
        });

        webview.addEventListener("dom-ready", () => {
            if(config.environment === 'development'){
                webview.openDevTools();
            }
        });

        webview.addEventListener('ipc-message', (event) => {
            console.log('ipc-message', event)
            switch (event.channel) {
                case 'playpausedfailed':
                    this.set('error', 'Unable to find element with selector ' + '#' + this.get('candidate').id);
                    break;
                case 'playpaused':
                    this.set('playpaused', true)
                    break;
                case 'candidatesFound':
                    let candidates = event.args[0];
                    this.sendAction('onCandidatesFound', candidates)
                    if(!candidates || candidates.length === 0){
                        this.set('error', 'No candidates found');
                    }
                    else{
                        this.set('info', 'Found ' + candidates.length  + ' candidates');
                        if(candidates.length > 1){
                            this.set('candidates', candidates)
                        }
                    }
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
            this.set('candidates', []);
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
        findCandidates: function(url){
            console.log('findCandidates', url);
            this.get('webview').send("findCandidates", url);
        },
        closeAlert: function (alertName) {
            this.set(alertName, '');
        },
        saveCandidate: function(name, url, id, className, type) {
            this.sendAction('saveCandidate', name, url, id, className, type)
        },
        candidateSelected: function(candidate){
            console.log('candidateSelected', candidate);
            this.set('candidate', candidate);
        }
    }
});
