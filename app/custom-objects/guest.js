import Ember from 'ember';


const {ipcMain} = require('electron')
const path = requireNode('path');
const fs = requireNode('fs');

export default Ember.Object.extend({
    init(){
        let webview = this.get('webview');
        webview.addEventListener('did-stop-loading', () => {
            webview.openDevTools();
            webview.executeJavaScript('console.log("init")');
            webview.executeJavaScript(fs.readFileSync('dist/assets/lib/electronSafeIpc.js').toString());
            //webview.executeJavaScript('window.electronSafeIpc.send("test", "hej")');
        });

// When everything is ready, trigger the events without problems
        webview.addEventListener("dom-ready", function() {
            // Aler the scripts src of the website from the <webview>
            webview.send("request");
        });

// Process the data from the webview
        webview.addEventListener('ipc-message',function(event){
            console.log(event);
            console.info(event.channel);
        });

/*        safeIPC.on('test', (val) => {
            console.log(val)
        });*/
        /*webview.executeJavaScript(fs.readFileSync(root + '/app/guest/guest-utils.js').toString());
        webview.executeJavaScript(fs.readFileSync(root + '/app/guest/xpath-utils.js').toString());*/
    }
});
