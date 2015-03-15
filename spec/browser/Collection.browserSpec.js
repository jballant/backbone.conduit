/**
 * Test browser-specific pieces of the Collection
 */
'use strict';

var Conduit = require('src/index');

var config = Conduit.config;
var Collection = Conduit.Collection;
var mockServer = require('./../mockServer');

var FooCollection = Collection.extend({
    url: '/foo'
});

describe('The Conduit Collection', function() {
    var collection;

    beforeEach(function() {
        collection = new FooCollection(null, {
            comparator: 'name'
        });
        mockServer.add({
            url: '/foo',
            data: this.getSampleData()
        });
    });

    it('instantiates an object', function() {
        expect(collection).to.be.an('object');
    });

    describe('when calling "fetch"', function() {
        var sortSpy;
        beforeEach(function() {
            sortSpy = this.sinon.spy(collection, 'sort');

            expect(collection).to.have.length(0);
            // Note mockServer provides synchronous fetching...
            collection.fetch({
                sort: true
            });
        });

        it('gets the sample data', function() {
            expect(collection).to.have.length(3);
        });

        it('uses synchronous sorting', function() {
            //noinspection BadExpressionStatementJS
            expect(sortSpy.called).to.be.true;
        });
    });

    describe('when resetting unsorted data', function() {
        beforeEach(function() {
            collection.comparator = null;
            collection.reset(this.getSampleData());
            collection.comparator = 'name';
        });

        afterEach(function() {
            config.disableWorker();
        });

        it('can sort data regularly', function() {
            collection.sort();
            expect(collection.at(0).get('name')).to.equal('one');
        });

        it('throws an error when sorting async w/o enabling the worker', function() {
            var boundMethod = _.bind(collection.sortAsync, collection);
            expect(boundMethod).to.throw(Error);
        });

        it('can sort async if worker is enabled', function(done) {
            config.enableWorker({
                paths: workerLocation
            }).then(function() {
                collection.sortAsync().then(function() {
                    expect(collection.at(0).get('name')).to.equal('one');
                    done();
                });
            });
        });
    });
});