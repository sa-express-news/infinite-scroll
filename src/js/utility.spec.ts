import 'mocha';
import * as chai from 'chai';
import * as nock from 'nock';
import * as sinon from 'sinon';
import * as fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

import * as utility from './utility';
import samplePageHTML from './sample-pages/ENPage1';

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

describe('Utility code', () => {
    describe('createHDNPlayerScript', () => {
        it('returns an HTMLScriptElement', () => {
            assert.typeOf(utility.createHDNPlayerScript(document), 'HTMLScriptElement');

        });
        it('the script tag has a src matching the Hearst JWPlayer code', () => {
            const script = utility.createHDNPlayerScript(document);
            assert.strictEqual(script.src, 'https://content.jwplatform.com/libraries/uVzyVL6s.js');
        });
    });
    describe('containsSelector', () => {
        it('returns true if the element contains the provided selector', () => {
            assert.isTrue(utility.containsSelector(document.body, `div.article_page`));
        });
        it('returns false if the element does not contain the provided selector', () => {
            assert.isFalse(utility.containsSelector(document.body, 'span#fake-id-foobar'));
        });
    });
    describe('fetchPageHTML', () => {
        describe('fetch fails', () => {
            it('throws an error', async () => {

                const stub = sinon.stub(fetch, 'default');
                stub.throws();
                let err;

                try {
                    const html = await utility.fetchPageHTML('http://httpstat.us/500');
                } catch (e) {
                    err = e;
                }

                stub.restore();
                assert.typeOf(err, 'Error');
            });
        });
        describe('fetch succeeds', () => {
            it('returns a promise which resolves to a string', async () => {
                const html = await utility.fetchPageHTML('http://example.com');
                assert.isString(html);
            });
        });
    });
    describe('deduplicateElementsOnAttribute', () => {
        it('returns an array', () => {
            const links = document.querySelector('div.article-related').querySelectorAll('a');

            assert.isArray(utility.deduplicateElementsOnAttribute(links, 'href'));

        });
        it('the array contains the same types of elements passed into it', () => {
            const links = document.querySelector('div.article-related').querySelectorAll('a');

            const dedupLinks = utility.deduplicateElementsOnAttribute(links, 'href');

            dedupLinks.forEach(link => {
                assert.typeOf(link, 'HTMLAnchorElement');
            });
        });
        it('any elements with the same attribute are removed', () => {
            const links = document.querySelector('div.article-related').querySelectorAll('a');

            const dedupLinks = utility.deduplicateElementsOnAttribute(links, 'href');

            //I know there are four unique links out of 8 <a> tags in the sample page HTML

            assert.strictEqual(dedupLinks.length, 4);
        });
    });
});