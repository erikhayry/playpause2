"use strict";
var RatedHTMLElement = (function () {
    function RatedHTMLElement(element, parentXpath) {
        this.playButtonScore = 0;
        this.pauseButtonScore = 0;
        this.isPlayButton = false;
        this.isPauseButton = false;
        this.isAudio = false;
        this._PP_MEDIA_ATTRIBUTES = [
            'id', 'className', 'title'
        ];
        this.element = element;
        this.parentXpath = parentXpath;
        this.className = (element.className.replace) ? element.className.replace(/\s\s+/g, ' ') : element.className;
        this.title = element.title;
        this.id = element.id;
        this.nodeName = element.nodeName;
        if (!this.isOtherMediaControl(this.element)) {
            this.setButtonType(this.element);
            if (this.isAudio || this.isPlayButton || this.isPauseButton) {
                this.checkAudioEl(this.element, 10000);
                this.checkSiblings(this.element, 1000);
                this.checkNodeName(this.element, 100);
                this.checkAttributes(this.element, 100);
            }
        }
    }
    RatedHTMLElement.prototype.isOtherMediaControl = function (element) {
        var IGNORED_VALUES = [
            'playlist', 'volume', 'open', 'radioplayer'
        ];
        return this._PP_MEDIA_ATTRIBUTES.some(function (attr) {
            if (element[attr] && element[attr].indexOf) {
                var EL_ATTR_1 = element[attr].toLowerCase();
                return IGNORED_VALUES.some(function (val) {
                    return (EL_ATTR_1.indexOf(val) > -1);
                });
            }
        });
    };
    RatedHTMLElement.prototype.setButtonType = function (element) {
        this.isAudio = element.nodeName == 'AUDIO';
        this.isPlayButton = this._PP_MEDIA_ATTRIBUTES.some(function (attr) {
            if (element.parentNode.nodeName == 'BUTTON' || element.getElementsByTagName('button').length != 0) {
                return false;
            }
            if (element[attr] && element[attr].match) {
                var EL_ATTR = element[attr].toLowerCase();
                var playMatches = (EL_ATTR.match(/play/g) || []).length;
                return playMatches > 0 && playMatches != (EL_ATTR.match(/player/g) || []).length;
            }
        });
        this.isPauseButton = this._PP_MEDIA_ATTRIBUTES.some(function (attr) {
            if (element[attr] && element[attr].indexOf) {
                var EL_ATTR = element[attr].toLowerCase();
                return (EL_ATTR.indexOf('stop') > -1 || EL_ATTR.indexOf('pause') > -1);
            }
        });
    };
    RatedHTMLElement.prototype.checkSiblings = function (element, score) {
        var _this = this;
        var OTHER_MEDIA_VALUES = [
            'volume', 'next', 'previous', 'stop', 'pause', 'artwork', 'srcubber', 'info', 'skip', 'repeat',
            'rewind', 'forward', 'shuffle', 'queue', 'timeline', 'progress', 'cover', 'cover-art', 'track',
        ]; //TODO go one level up, set max value?
        var siblings = element.parentNode.childNodes;
        [].forEach.call(siblings, function (sibling) {
            if (sibling != element && sibling.nodeName == element.nodeName) {
                _this._PP_MEDIA_ATTRIBUTES.forEach(function (attr) {
                    if (sibling[attr]) {
                        var EL_ATTR_2 = sibling[attr].toLowerCase();
                        OTHER_MEDIA_VALUES.forEach(function (val) {
                            var matchingScore = (EL_ATTR_2.match(new RegExp(val, 'g')) || []).length * score;
                            _this.playButtonScore += matchingScore;
                            _this.pauseButtonScore += matchingScore;
                        });
                    }
                });
            }
        });
    };
    RatedHTMLElement.prototype.checkAttributes = function (element, score) {
        var _this = this;
        this._PP_MEDIA_ATTRIBUTES.forEach(function (attr) {
            if (element[attr]) {
                var EL_ATTR = element[attr].toLowerCase();
                _this.playButtonScore += (EL_ATTR.match(/play/g) || []).length * score;
                _this.pauseButtonScore += (EL_ATTR.match(/pause/g) || []).length * score;
            }
        });
    };
    RatedHTMLElement.prototype.checkAudioEl = function (element, score) {
        if (this.isAudio) {
            console.log(element);
            this.playButtonScore += score;
            this.pauseButtonScore += score;
        }
    };
    RatedHTMLElement.prototype.checkNodeName = function (element, score) {
        if (element.nodeName === 'BUTTON' || (element.nodeName && element.nodeName.indexOf('button') > -1)) {
            if (this.isPlayButton) {
                this.playButtonScore += score;
            }
            if (this.isPauseButton) {
                this.pauseButtonScore += score;
            }
        }
    };
    return RatedHTMLElement;
}());
window.PP_EP = (function () {
    var LOG = 'color: orange; font-weight: bold;';
    console.log('%c render on guest', LOG);
    function _getButtonCandidates(elements, old, parentXpath) {
        var IGNORED_NODE_TYPES = ['A'];
        var IGNORED_IFRAMES = ['js-player'];
        var _elements = elements || document.querySelectorAll('*');
        var _old = old || [];
        var _parentXpath = parentXpath || null;
        [].forEach.call(_elements, function (el) {
            if (el.nodeName === 'IFRAME' && !IGNORED_IFRAMES.some(function (val) { return el.className.indexOf(val) > 0; })) {
                try {
                    if (el && el.contentDocument) {
                        _old = _getButtonCandidates(el.contentDocument.querySelectorAll('*'), _old, window.PP_XPATH.getElementXPath(el));
                    }
                }
                catch (e) {
                    console.info(e);
                }
            }
            else if (IGNORED_NODE_TYPES.indexOf(el.nodeName) < 0) {
                _old.push(new RatedHTMLElement(el, _parentXpath));
            }
        });
        return _old.filter(function (el) { return el.isAudio || el.isPlayButton || el.isPauseButton; })
            .sort(function (a, b) { return (b.playButtonScore + b.pauseButtonScore) - (a.playButtonScore + a.pauseButtonScore); });
    }
    function _getElementQuery(path) {
        console.log('_getElementQuery', path);
        if (path.type === 'selector') {
            console.log(window.PP_XPATH.getElementsByXPath(document, path.value));
            return window.PP_XPATH.getElementsByXPath(document, path.value)[0];
        }
        //TODO use parent value instead of split
        if (path.type === 'iframe') {
            var _paths = path.value.split('+');
            var _iFrameEl = window.PP_XPATH.getElementsByXPath(document, _paths[0])[0];
            return window.PP_XPATH.getElementsByXPath(_iFrameEl.contentDocument, _paths[1])[0];
        }
    }
    function _sortByUniqueness(buttonCandidates) {
        buttonCandidates.forEach(function (candidate) {
            var identicalCandidates = buttonCandidates.filter(function (siblings) {
                return siblings.className == candidate.className;
            });
            candidate.numberOfTwins = identicalCandidates.length;
        });
        return buttonCandidates.sort(function (a, b) {
            if ((b.playButtonScore + b.pauseButtonScore) == (a.playButtonScore + a.pauseButtonScore)) {
                return a.numberOfTwins - b.numberOfTwins;
            }
            return (b.playButtonScore + b.pauseButtonScore) - (a.playButtonScore + a.pauseButtonScore);
        });
    }
    return {
        getButtons: function () {
            console.log('%c render on guest.getButtons()', LOG);
            window.electronSafeIpc.send('buttonsFetched', [1, 2, 3]);
        },
        getButtonCandidates: function () {
            var buttonCandidates = _getButtonCandidates();
            var playButtonsCandidates = _sortByUniqueness(buttonCandidates.filter(function (button) { return button.isPlayButton; }));
            if (playButtonsCandidates.length > 0) {
                playButtonsCandidates[0].xpath = window.PP_XPATH.getElementXPath(playButtonsCandidates[0].element);
            }
            var pauseButtonsCandidates = _sortByUniqueness(buttonCandidates.filter(function (button) { return button.isPauseButton; }));
            if (pauseButtonsCandidates.length > 0) {
                pauseButtonsCandidates[0].xpath = window.PP_XPATH.getElementXPath(pauseButtonsCandidates[0].element);
            }
            var audioCandidates = _sortByUniqueness(buttonCandidates.filter(function (button) { return button.isAudio; }));
            if (audioCandidates.length > 0) {
                audioCandidates[0].xpath = window.PP_XPATH.getElementXPath(audioCandidates[0].element);
            }
            playButtonsCandidates.forEach(function (el) { return delete el['element']; });
            pauseButtonsCandidates.forEach(function (el) { return delete el['element']; });
            audioCandidates.forEach(function (el) { return delete el['element']; });
            window.electronSafeIpc.send('buttonCandidatesFetched', {
                playButtonsCandidates: playButtonsCandidates,
                pauseButtonsCandidates: pauseButtonsCandidates,
                audioCandidates: audioCandidates,
            });
        },
        getTestableButtonCandidates: function (id) {
            var buttonCandidates = _getButtonCandidates();
            var playButtonsCandidates = _sortByUniqueness(buttonCandidates.filter(function (button) { return button.isPlayButton; }));
            if (playButtonsCandidates.length > 0) {
                playButtonsCandidates[0].xpath = window.PP_XPATH.getElementXPath(playButtonsCandidates[0].element);
            }
            var pauseButtonsCandidates = _sortByUniqueness(buttonCandidates.filter(function (button) { return button.isPauseButton; }));
            if (pauseButtonsCandidates.length > 0) {
                pauseButtonsCandidates[0].xpath = window.PP_XPATH.getElementXPath(pauseButtonsCandidates[0].element);
            }
            var audioCandidates = _sortByUniqueness(buttonCandidates.filter(function (button) { return button.isAudio; }));
            if (audioCandidates.length > 0) {
                audioCandidates[0].xpath = window.PP_XPATH.getElementXPath(audioCandidates[0].element);
            }
            playButtonsCandidates.forEach(function (el) { return delete el['element']; });
            pauseButtonsCandidates.forEach(function (el) { return delete el['element']; });
            audioCandidates.forEach(function (el) { return delete el['element']; });
            window.electronSafeIpc.send('testableButtonCandidatesFetched' + id, {
                playButtonsCandidates: playButtonsCandidates,
                pauseButtonsCandidates: pauseButtonsCandidates,
                audioCandidates: audioCandidates,
            });
        },
        getPlayerState: function (playBtnObj, pauseBtnObj) {
            var _playButtonEl = _getElementQuery(playBtnObj);
            var _pauseButtonEl = _getElementQuery(playBtnObj);
            console.log('getPlayerState', _playButtonEl, _pauseButtonEl);
            window.electronSafeIpc.send("buttonStylesFetched", {
                playBtnStyle: _playButtonEl ? window.getComputedStyle(_playButtonEl) : null,
                pauseBtnStyle: _pauseButtonEl ? window.getComputedStyle(_pauseButtonEl) : null
            });
        },
        click: function (buttonPath) {
            _getElementQuery(buttonPath).click();
        }
    };
})();
//# sourceMappingURL=guest-utils.js.map