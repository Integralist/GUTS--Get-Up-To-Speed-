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
        if (input.name === 'groups') {
            this.resizeIframeWidth(this.determineGroupWidth(input.value));
        }

        if (input.name === 'components') {
            this.loadComponent(input);
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
        validNumericalValue  = /\d+/.exec(button.value);
    
    if (validNumericalValue) {
        this.resizeIframeWidth(validNumericalValue);
    }
};

guts.handleUnitTestDisplay = function(){
    if (this.unitTestsIframe) {
        this.toggleUnitTestIframeVisibility();
    } else {
        this.createUnitTestIframe();
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
        guts.pubsub.publish('unit-tests:loaded');
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

    if (tag === 'input') {
        this.checkInputSelected(target);
    }

    if (tag === 'button') {
        this.checkButtonSelected(target);
    }
};

guts.resizeIframeWidth = function(width) {
    if (this.iframe) {
        this.iframe.style.width = width + 'px';
        this.pubsub.publish('component:width:set');
    }

    if (this.unitTestsIframe) {
        this.unitTestsIframe.style.width = width + 'px';
        this.pubsub.publish('unit-tests:width:set');
    }
};

guts.resizeComponentHeight = function(){
    iframe = this.iframe;
    iframe.style.height = 0; // WebKit returns the current `scrollHeight`, so we reset to zero to allow the content of the iframe to determine the height
    iframe.style.height = (iframe.contentWindow.document.body.scrollHeight + 30) + 'px'; // Firefox doesn't resize properly so we need to add some additional space

    this.pubsub.publish('component:height:set');
};

guts.resizeUnitTestsHeight = function(){
    iframe = this.unitTestsIframe;
    iframe.style.height = 0; // WebKit returns the current `scrollHeight`, so we reset to zero to allow the content of the iframe to determine the height
    iframe.style.height = (iframe.contentWindow.document.body.scrollHeight + 30) + 'px'; // Firefox doesn't resize properly so we need to add some additional space

    this.pubsub.publish('unit-tests:height:set');
};

guts.componentLoaded = function(){
    var screenWidth = document.documentElement.clientWidth,
        setWidthTo = (screenWidth < this.GROUP1) ? screenWidth : this.GROUP1 /* default size to load when the app initializes */;
    
    this.resizeIframeWidth(setWidthTo);
};

guts.handleResize = function(){
    this.resizeIframeWidth(document.documentElement.clientWidth);
};

guts.generateComponentView = function(){
    var container    = document.querySelector('.container'),
        iframe       = document.createElement('iframe');
        iframe.src   = 'components/object-media.html';
    
    iframe.onload = function(){
        guts.pubsub.publish('component:loaded');
    };

    this.iframe = iframe;

    document.body.appendChild(iframe);
};

guts.bindEvents = function(){
    this.pubsub.subscribe('component:loaded', this.componentLoaded.bind(this));
    this.pubsub.subscribe('component:width:set', this.resizeComponentHeight.bind(this));
    this.pubsub.subscribe('component:height:set', this.checkUnitTestIframeCreated.bind(this));
    this.pubsub.subscribe('unit-tests:loaded', this.resizeUnitTestsHeight.bind(this));
    this.pubsub.subscribe('unit-tests:width:set', this.resizeUnitTestsHeight.bind(this));
    this.pubsub.subscribe('unit-tests:height:set', this.checkUnitTestIframeCreated.bind(this));

    window.document.body.addEventListener('click', this.delegationHandler.bind(this), false);
    window.addEventListener('resize', this.handleResize.bind(this), false);
};

guts.init = function(){
    this.bindEvents();
    this.generateComponentView();
};