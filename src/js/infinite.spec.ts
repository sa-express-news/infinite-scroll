import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { JSDOM } from 'jsdom';

const assert = chai.assert;

import * as infinite from './infinite';
import ENPage1 from './sample-pages/ENPage1';

let dom = new JSDOM(ENPage1);
let window = dom.window;
let document = window.document;

// beforeEach(() => {
//     let dom = new JSDOM(samplePageHTML);
//     let window = dom.window;
//     let document = window.document;
// })

describe('Infinite Scroll', () => {
    describe('loadJW', () => {
        it('adds the Hearst JW Player code to the head of the document', () => {
            infinite.loadJW(document);
            const scripts = document.head.getElementsByTagName('script');
            const jwScript = Array.from(scripts).filter((script => script.src = 'https://content.jwplatform.com/libraries/uVzyVL6s.js'));

            assert.isDefined(jwScript);
        });
    });
    describe('buildLinkQueue', () => {
        describe('related links sidebar present', () => {
            it('returns an array', () => {
                const results = infinite.buildLinkQueue(document);
                assert.isArray(results);
            });
            it('each array is a story link', () => {
                const results = infinite.buildLinkQueue(document);
                results.forEach((link) => {
                    assert.include(link, '.php');
                });
            });
            it('should return every relevant related story link', () => {
                const results = infinite.buildLinkQueue(document);
                assert.include(results, '/sports/spurs/article/Spurs-camp-a-thrill-for-Gay-after-long-rehab-12234689.php');
                assert.include(results, '/sports/spurs/article/For-Spurs-Ginobili-basketball-is-still-a-joy-12234647.php');
                assert.include(results, '/sports/spurs/article/Popovich-s-political-commentary-polls-well-with-12230231.php');
                assert.include(results, '/sports/spurs/article/Spurs-Gasol-sheds-weight-to-keep-up-12230198.php');
            });
            it('should not contain any extraneous links', () => {
                const results = infinite.buildLinkQueue(document);
                assert.lengthOf(results, 4);
            })
        });
    });
});