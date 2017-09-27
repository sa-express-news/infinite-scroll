import 'mocha';
import * as chai from 'chai';
import * as nock from 'nock';
import * as sinon from 'sinon';
import * as fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

import * as scroll from './scroll';
import samplePageHTML from './sampleENPage';

const assert = chai.assert;

let dom = new JSDOM(samplePageHTML);
let window = dom.window;
let document = window.document;

let fakeServer;

before(() => {
    fakeServer = nock('http://example.com')
        .persist()
        .get('/')
        .reply(200, `<!DOCTYPE html><html><head></head><body></body></html>`);
});

beforeEach(() => {
    let dom = new JSDOM(samplePageHTML);
    let window = dom.window;
    let document = window.document;
})

describe('Infinite Scroll', () => {
    describe('createHDNPlayerScript', () => {
        it('returns an HTMLScriptElement', () => {
            assert.typeOf(scroll.createHDNPlayerScript(document), 'HTMLScriptElement');

        });
        it('the script tag has a src matching the Hearst JWPlayer code', () => {
            const script = scroll.createHDNPlayerScript(document);
            assert.strictEqual(script.src, 'https://content.jwplatform.com/libraries/uVzyVL6s.js');
        });
    });
    describe('containsSelector', () => {
        it('returns true if the element contains the provided selector', () => {
            assert.isTrue(scroll.containsSelector(document.body, `div.article_page`));
        });
        it('returns false if the element does not contain the provided selector', () => {
            assert.isFalse(scroll.containsSelector(document.body, 'span#fake-id-foobar'));
        });
    });
    describe('fetchPageHTML', () => {
        describe('fetch fails', () => {
            it('throws an error', async () => {

                const stub = sinon.stub(fetch, 'default');
                stub.throws();
                let err;

                try {
                    const html = await scroll.fetchPageHTML('http://httpstat.us/500');
                } catch (e) {
                    err = e;
                }

                stub.restore();
                assert.typeOf(err, 'Error');
            });
        });
        describe('fetch succeeds', () => {
            it('returns a promise which resolves to a string', async () => {
                const html = await scroll.fetchPageHTML('http://example.com');
                assert.isString(html);
            });
        });
    });
});