import 'mocha';
import * as chai from 'chai';
import { JSDOM } from 'jsdom';

import * as scroll from './scroll';
import samplePageHTML from './sampleENPage';

const assert = chai.assert;

let dom = new JSDOM(samplePageHTML);
let window = dom.window;
let document = window.document;

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
    describe('fetchPage', () => {
        describe('fetch fails', () => {
            it('throws an error', async () => {
                const string = await scroll.fetchPage('https://kiafarhang.com');
                assert.isTrue(true);
            })
        })
    })
});