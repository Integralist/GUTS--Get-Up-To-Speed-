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

guts.checkInputSelected = function(input) {
    if (input.type === 'radio') {
        switch (input.name) {
            case 'groups':
                this.resizeIframeWidth(this.determineGroupWidth(input.value));
                this.resizeIframeHeight();
                break;
            case 'components':
                //
                break;
        }
    }
};

guts.delegationHandler = function(e) {
    var target = e.target,
        tag = target.tagName.toLowerCase();
    
    switch (tag) {
        case 'input':
            this.checkInputSelected(target);
            break;
    }
};

guts.resizeIframeWidth = function(width) {
    console.log('resize iframe width', width);
    if (this.iframe) {
        this.iframe.style.width = width + 'px';
    }
};

guts.resizeIframeHeight = function(){
    if (this.iframe) {
        this.iframe.style.height = this.iframe.contentWindow.document.body.scrollHeight + 'px';
    }
};

guts.iframeLoaded = function(){
    var screenWidth = document.documentElement.clientWidth,
        setWidthTo = (screenWidth < this.GROUP1) ? screenWidth : this.GROUP1 /* default size to load when the app initializes */;
    
    this.resizeIframeWidth(setWidthTo);
    this.resizeIframeHeight();
};

guts.handleResize = function(){
    this.resizeIframeWidth(document.documentElement.clientWidth);
    this.resizeIframeHeight();
};

guts.generateComponentView = function(){
    var container    = document.querySelector('.container'),
        iframe       = document.createElement('iframe');
        iframe.src   = 'components/object-media.html';
    
    iframe.onload = function(){ 
        guts.pubsub.publish('iframe:loaded');
    };

    this.iframe = iframe;

    container.parentNode.insertBefore(iframe, container.nextSibling); // inserts iframe before <script> elements
};

guts.bindEvents = function(){
    this.pubsub.subscribe('iframe:loaded', this.iframeLoaded.bind(this));
    window.document.body.addEventListener('click', this.delegationHandler.bind(this), false);
    window.addEventListener('resize', this.handleResize.bind(this), false);
};

guts.init = function(){
    this.bindEvents();
    this.generateComponentView();
};

guts.init();