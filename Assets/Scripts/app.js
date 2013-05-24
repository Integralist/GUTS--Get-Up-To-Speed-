guts.GROUP1 = 419;
guts.GROUP2 = 599;
guts.GROUP3 = 1007;
guts.GROUP4 = 1425; // an arbitrary value to indicate desktop and higher

guts.determineGroupWidth = function(group) {
    var width;

    switch (group) {
        case '1':
            width = this.GROUP1;
            break;
        case '2':
            width = this.GROUP2;
            break;
        case '3':
            width = this.GROUP3;
            break;
        case '4':
            width = this.GROUP4;
            break;
    }

    return width;
};

guts.loadComponent = function(input) {
    this.iframe.src = 'components/' + input.value + '.html';
};

guts.checkInputSelected = function(input) {
    if (input.type === 'radio') {
        switch (input.name) {
            case 'groups':
                this.resizeIframeWidth(this.determineGroupWidth(input.value));
                break;
            case 'components':
                this.loadComponent(input);
                break;
        }
    }
};

guts.checkButtonSelected = function(input) {
    switch (input.id) {
        case 'js-resize':
            this.handleCustomResize(input);
            break;
        case 'js-unit-tests':
            this.handleUnitTestDisplay();
            break;
    }
};

guts.handleCustomResize = function(){
    var button = document.getElementById('js-resize-value'),
        value  = /\d+/.exec(button.value);
    
    if (value) {
        this.resizeIframeWidth(value);
    }
};

guts.handleUnitTestDisplay = function(){
    if (!this.unitTestsIframe) {
        this.createUnitTestIframe();
    } else {
        this.toggleUnitTestIframeVisibility();
    }
};

guts.toggleUnitTestIframeVisibility = function(){
    var button = document.getElementById('js-unit-tests-value');

    if (button.checked) {
        this.unitTestsIframe.classList.remove('hide');
    } else {
        this.unitTestsIframe.classList.add('hide');
    }
};

guts.createUnitTestIframe = function(){
    var iframe            = document.createElement('iframe');
        iframe.src        = 'unit-tests/SpecRunner.html';
        iframe.className  = 'unit-tests';

    iframe.onload = function(){ 
        guts.pubsub.publish('iframe:loaded', this.unitTestsIframe);
    };
    
    this.unitTestsIframe = iframe;

    document.body.appendChild(iframe);
};

guts.checkUnitTestIframeCreated = function(){
    if (this.unitTestsIframe) {
        this.toggleUnitTestIframeVisibility();
    }
};

guts.delegationHandler = function(e) {
    var target = e.target,
        tag = target.tagName.toLowerCase();

    switch (tag) {
        case 'input':
            this.checkInputSelected(target);
            break;
        case 'button':
            this.checkButtonSelected(target);
            break;
    }
};

guts.resizeIframeWidth = function(width) {
    if (this.iframe) {
        this.iframe.style.width = width + 'px';
        this.pubsub.publish('iframe:width:set');
    }

    if (this.unitTestsIframe) {
        this.unitTestsIframe.style.width = width + 'px';
        this.pubsub.publish('iframe:width:set', this.unitTestsIframe);
    }
};

guts.resizeIframeHeight = function(topic, iframe) {
    iframe = iframe || this.iframe;
    iframe.style.height = (iframe.contentWindow.document.body.scrollHeight + 30) + 'px';

    this.pubsub.publish('iframe:height:set');
};

guts.iframeLoaded = function(topic, loadingUnitTest) {
    if (loadingUnitTest) {
        this.pubsub.publish('iframe:unittest:setheight', this.unitTestsIframe);
    } else {
        var screenWidth = document.documentElement.clientWidth,
            setWidthTo = (screenWidth < this.GROUP1) ? screenWidth : this.GROUP1 /* default size to load when the app initializes */;
        
        this.resizeIframeWidth(setWidthTo);
    }
};

guts.handleResize = function(){
    this.resizeIframeWidth(document.documentElement.clientWidth);
};

guts.generateComponentView = function(){
    var container    = document.querySelector('.container'),
        iframe       = document.createElement('iframe');
        iframe.src   = 'components/object-media.html';
    
    iframe.onload = function(){ 
        guts.pubsub.publish('iframe:loaded');
    };

    this.iframe = iframe;

    document.body.appendChild(iframe);
};

guts.bindEvents = function(){
    this.pubsub.subscribe('iframe:loaded', this.iframeLoaded.bind(this));
    this.pubsub.subscribe('iframe:width:set', this.resizeIframeHeight.bind(this));
    this.pubsub.subscribe('iframe:height:set', this.checkUnitTestIframeCreated.bind(this));
    this.pubsub.subscribe('iframe:unittest:setheight', this.resizeIframeHeight.bind(this));

    window.document.body.addEventListener('click', this.delegationHandler.bind(this), false);
    window.addEventListener('resize', this.handleResize.bind(this), false);
};

guts.init = function(){
    this.bindEvents();
    this.generateComponentView();
};