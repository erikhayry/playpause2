import Ember from 'ember';

export default Ember.Component.extend({
    //candidate: undefined,
    nextCandidate: undefined,
    candidates: [],
    currentCandidateIndex: 0,
    playpaused: false,
    didReceiveAttrs(){
        console.log('didReceiveAttrs', this.get('candidates'), this.get('currentCandidateIndex'))

        let candidates = this.get('candidates');
        let index = this.get('currentCandidateIndex');

        if(candidates && candidates.length > 0){
            this.set('candidate', candidates[index])
            if(candidates[index + 1]){
                this.set('nextCandidate', candidates[index + 1])
            }
            else{
                this.set('nextCandidate', undefined)
            }
        }
        console.log(this.get('candidate'), this.get('nextCandidate'))
    },
    actions: {
        tryAnotherCandidate: function(){
            console.log('tryAnotherCandidate', this.get('currentCandidateIndex'))

            let index = this.get('currentCandidateIndex') + 1;
            let candidates = this.get('candidates');

            this.set('candidate', candidates[index])
            if(candidates[index + 1]){
                this.set('nextCandidate', candidates[index + 1])
            }
            else{
                this.set('nextCandidate', undefined)
            }
            this.set('currentCandidateIndex', index)
            console.log(this.get('currentCandidateIndex'))
        },
        saveCandidate: function(candidate) {
            this.sendAction('saveCandidate', candidate.name, candidate.url, candidate.id, candidate.className, candidate.type)
        },
        toCandidateConfirm: function(candidate) {
            this.set('confirmCandidate', candidate)
        }

    }
});
