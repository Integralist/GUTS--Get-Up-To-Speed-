# GUTS

Pattern/Component library and style guide for responsive code bases (primarily used by the responsive BBC News site)

## Purpose

- **Developers** have the ability to prototype quickly while at the same time utilising the BBC style guidelines
- **Designers** can base their work on existing patterns
- **Management** has a better idea of what things should look like
- **Testers** test once, debug everywhere

## Values

- Simple
- Clean
- Robust
- Promote best practices 
 - mobile first development
 - performance conscious
 - semantic
- Collaborative
- Documented
- Tested

## Tools

This library of components is built using the tools that make up the fundamental parts of the web: [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) and [JavaScript](https://developer.mozilla.org/en/docs/JavaScript).

No 3rd party libraries or pre-processors are used here. This is a conscious decision to make the code as clean, efficient and as portable as possible. The only exception to that rule is for the use of a unit testing framework.

HTML5 elements are used in the markup where appropriate and so this library assumes the browser viewing the content has the capabilities to render CSS styling onto HTML5 elements (e.g. Internet Explorer versions less than 9 are unable to without the add of an additional script).

## Browser Support?

The BBC News responsive code base aims to be as backward compatible as possible but for the purposes of keeping the code base of this library of components as light/efficient as possible we've not provided backward compatible support for browsers such as Internet Explorer versions less than 9.

That's not to mean that supporting those browsers is difficult. The additional work required to make the components work on these older browsers should be minimal. 

For example, JavaScript enabled versions of old Internet Explorer simply require an additional [script](https://github.com/aFarkas/html5shiv/) to support the styling of HTML5 elements.

For non-JavaScript enabled devices the components themselves should still provide a core experience to those users, so because older browsers such as Internet Explorer have trouble styling HTML5 elements without the aid of an additional script, we can use the technique of 'double bagging' where we wrap the HTML5 elements in the appropriate HTML4 tags and provide additional class names to those wrapping elements to allow them to pick up the stylings that otherwise would have only been applied by more modern browsers. This technique allows us to keep the original responsive code base modern and allows for backwards compatibility, but also means when the market stats for those older browsers drop off and support is no longer needed we are more easily able to strip out the HTML4 tags/classes.

## Code

The hosting page will be clunkier than normal because we're not using any additional 3rd party libraries or pre-processors to manage our code base (i.e. [RequireJS](http://requirejs.org/) to handle our dependencies/modules or [Sass](http://sass-lang.com/) to allow us to compile a single style sheet from multiple imported style sheets). 

So please keep in mind that we are not advocating the use of multiple `<link>` or `<script>` tags, or the use of `<iframe>`'s etc, these are merely used for the purpose of displaying and manipulating our components in a 'plain vanilla' (read: library agnostic) environment so as to allow greater portability and re-usability.