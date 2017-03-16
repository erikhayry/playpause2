import Ember from 'ember';

export default Ember.Component.extend({
    currentCandidateIndex: 0,
    didReceiveAttrs(){
        console.log('didReceiveAttrs', this.get('candidates'), this.get('confirmCandidate'), this.get('currentCandidateIndex'));

        let candidates = this.get('candidates');
        let index = this.get('currentCandidateIndex');

        if(candidates && candidates.length > 0){
            this.set('candidate', candidates[index]);
            this.sendAction('candidateSelected', this.get('candidate'));

            if(candidates[index + 1]){
                this.set('nextCandidate', candidates[index + 1]);
            }
            else{
                this.set('nextCandidate', undefined);
            }
        }
        console.log(this.get('candidate'), this.get('nextCandidate'));
    },
    actions: {
        tryAnotherCandidate: function(){
            //TODO refactor. Service?
            console.log('tryAnotherCandidate', this.get('currentCandidateIndex'));

            let index = this.get('currentCandidateIndex') + 1;
            let candidates = this.get('candidates');

            this.set('candidate', candidates[index]);
            this.sendAction('candidateSelected', this.get('candidate'));

            if(candidates[index + 1]){
                this.set('nextCandidate', candidates[index + 1]);
            }
            else{
                this.set('nextCandidate', undefined);
            }
            this.set('currentCandidateIndex', index);
            console.log(this.get('currentCandidateIndex'));
        },
        saveCandidate: function(candidate) {
            this.sendAction('saveCandidate', candidate.name, candidate.url, candidate.id, candidate.className, candidate.type);
        },
        toCandidateConfirm: function(candidate) {
            this.set('confirmCandidate', candidate);
        },
        cancel: function() {
            //TODO send action
            this.set('candidates', []);
        }

    }
});
