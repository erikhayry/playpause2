import Ember from 'ember';

//const path = requireNode('path');
const fs = requireNode('fs');

export default Ember.Object.extend({
    init(){
        let webview = this.get('webview');
        webview.addEventListener('did-stop-loading', () => {
            webview.openDevTools();
            webview.executeJavaScript('console.log("init")');
            webview.executeJavaScript(fs.readFileSync('dist/assets/lib/electronSafeIpc.js').toString());
        });

        // When everything is ready, trigger the events without problems
        webview.addEventListener("dom-ready", function() {
            // Alert the scripts src of the website from the <webview>
            webview.send("request");
        });

        // Process the data from the webview
        webview.addEventListener('ipc-message', function(event){
            console.log(event);
            console.info(event.channel);
        });
    }
});
