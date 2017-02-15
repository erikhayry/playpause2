// inyector.js// Get the ipcRenderer of electron
const {ipcRenderer} = require('electron');
console.log('test')
// Do something according to a request of your mainview
ipcRenderer.on('request', function(){
    ipcRenderer.sendToHost(getScripts());
});

/**
 * Simple function to return the source path of all the scripts in the document
 * of the <webview>
 *
 *@returns {String}
 **/
function getScripts(){
    var items = [];

    for(var i = 0;i < document.scripts.length;i++){
        items.push(document.scripts[i].src);
    }

    return JSON.stringify(items);
}
