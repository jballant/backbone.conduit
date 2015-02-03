# Backbone.Conduit
## Moving Data Through Backbone
Conduit is a Backbone plugin that improves the ability of Backbone to handle large scale data sets.  

[![Build Status](https://travis-ci.org/pwagener/backbone.conduit.svg?branch=master)](https://travis-ci.org/pwagener/backbone.conduit)

## TL;DR
Use `Conduit.Collection` (an extension of `Backbone.Collection`) if you need to
initialize a Collection with a large amount of data:
```
// Conduit can be found via the "Backbone.Conduit" global, or using RequireJS/AMD async
// loading, or by CommonJS build/loading techniques.
var Conduit = Backbone.Conduit;
var MyCollection = Conduit.Collection.extend({
    // Your magic here
});

var collection = new MyCollection();

// If you have the data on the page ...
var aBigArray = [ ... ];
collection.refill(aBigArray);

// Or, if you need to fetch it asynchronously
collection.fetchJumbo();
```

## More, Please
Please check out [The Documentation](http://pwagener.github.io/backbone.conduit/).

Does documentation bore you?  Well, have a look at:
- A [live demo of refill(...)](http://pwagener.github.io/backbone.conduit/examples/refill-vs-reset.html) showing side-by-side performance versus `Backbone.Collection.reset(...)`
- A [live demo of fill(...)](http://pwagener.github.io/backbone.conduit/examples/fill-vs-set.html) showing side-by-side performance versus `Backbone.Collection.set(...)`

## Issues
Have problems?  Please [file an issue](https://github.com/pwagener/backbone.conduit/issues)!
