import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        let webview = this.set('webview', this.element.getElementsByTagName('webview')[0]);
        console.log(webview)
        this.sendAction('onReady', webview);
    }
});
