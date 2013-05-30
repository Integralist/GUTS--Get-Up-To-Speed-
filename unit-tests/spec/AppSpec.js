describe('App', function(){
    describe('init', function(){
        it('should be defined', function(){
            //
        });

        it('should call all required methods', function(){
            //
        });
    });

    describe('bindEvents', function(){
        it('should subscribe to multiple custom events', function(){
            //
        });

        it('should bind a click event handler to the document body', function(){
            //
        });

        it('should bind a resize event handler to the window', function(){
            //
        });
    });

    describe('delegationHandler', function(){
        it('should call `checkInputSelected` if an input element is provided', function(){
            //
        });

        it('should call `checkButtonSelected` if a button element is provided', function(){
            //
        });
    });

    describe('checkInputSelected', function(){
        it('should call both `determineGroupWidth` and `resizeIframeWidth` if input type is "radio" and the name is "group"', function(){
            //
        });

        it('should call `loadComponent` if input type is "radio" and the name is "components"', function(){
            //
        });
    });

    describe('checkButtonSelected', function(){
        it('should call `handleCustomResize` if the button id is "js-resize"', function(){
            //
        });

        it('should call `handleUnitTestDisplay` if the button id is "js-unit-tests"', function(){
            //
        });
    });

    describe('resizeIframeWidth', function(){
        it('should publish a custom event specifically for the main component iframe', function(){
            //
        });

        it('should publish a custom event specifically for the unit tests iframe', function(){
            //
        });
    });

    describe('determineGroupWidth', function(){
        it('should return the correct numerical value for the specified group', function(){
            //
        });
    });

    describe('loadComponent', function(){
        it('should successfully set the "src" attribute of the iframe', function(){
            //
        });
    });

    describe('handleCustomResize', function(){
        it('should call `resizeIframeWidth` if a valid numerical value is specified by the user', function(){
            //
        });
    });

    describe('handleUnitTestDisplay', function(){
        it('should ...', function(){
            //
        });
    });

    describe('toggleUnitTestIframeVisibility', function(){
        it('should ...', function(){
            //
        });
    });

    describe('createUnitTestIframe', function(){
        it('should ...', function(){
            //
        });
    });

    describe('handleResize', function(){
        it('should ...', function(){
            //
        });
    });

    describe('componentLoaded', function(){
        it('should ...', function(){
            //
        });
    });

    describe('resizeComponentHeight', function(){
        it('should ...', function(){
            //
        });
    });

    describe('checkUnitTestIframeCreated', function(){
        it('should ...', function(){
            //
        });
    });

    describe('resizeUnitTestsHeight', function(){
        it('should ...', function(){
            //
        });
    });

    describe('generateComponentView', function(){
        it('should ...', function(){
            //
        });
    });
});