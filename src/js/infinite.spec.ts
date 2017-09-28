import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { JSDOM } from 'jsdom';

const assert = chai.assert;

import * as infinite from './infinite';
//EN page with related links sidebar
import ENPage1 from './sample-pages/ENPage1';

//EN page without related links sidebar
import ENPage2 from './sample-pages/ENPage2';

let dom = new JSDOM(ENPage1);
let window = dom.window;
let document = window.document;


describe('Infinite Scroll', () => {
    describe('loadJW', () => {
        it('adds the Hearst JW Player code to the head of the document', () => {
            infinite.loadJW(document);
            const scripts = document.head.getElementsByTagName('script');
            const jwScript = Array.from(scripts).filter((script => script.src === 'https://content.jwplatform.com/libraries/uVzyVL6s.js'));

            assert.isDefined(jwScript);
        });
    });
    describe('buildLinkQueue', () => {
        it('returns an array', () => {
            const results = infinite.buildLinkQueue(document.body);
            assert.isArray(results);
        });
        it('each array is a story link', () => {
            const results = infinite.buildLinkQueue(document.body);
            results.forEach((link) => {
                assert.include(link, '.php');
            });
        });
        describe('related links sidebar present', () => {
            it('should return every related story link', () => {
                const results = infinite.buildLinkQueue(document.body);
                assert.include(results, '/sports/spurs/article/Spurs-camp-a-thrill-for-Gay-after-long-rehab-12234689.php');
                assert.include(results, '/sports/spurs/article/For-Spurs-Ginobili-basketball-is-still-a-joy-12234647.php');
                assert.include(results, '/sports/spurs/article/Popovich-s-political-commentary-polls-well-with-12230231.php');
                assert.include(results, '/sports/spurs/article/Spurs-Gasol-sheds-weight-to-keep-up-12230198.php');
            });
            it('should not contain any extraneous links', () => {
                const results = infinite.buildLinkQueue(document.body);
                assert.lengthOf(results, 4);
            });
        });
        describe('related links sidebar not present - default to related stories at end of page', () => {
            let dom = new JSDOM(ENPage2);
            let window = dom.window;
            let document = window.document;
            it('should return every related story link', () => {
                const results = infinite.buildLinkQueue(document.body);
                assert.include(results, '/news/local/article/Trump-picks-Texas-Supreme-Court-justice-former-12238193.php');
                assert.include(results, '/news/local/article/Comptroller-says-280-000-recovered-from-Texas-12238189.php');
                assert.include(results, '/news/education/article/Alamo-Colleges-chancellor-pay-now-has-bonus-12237970.php');
                assert.include(results, '/news/local/article/Lawyers-in-Paxton-prosecution-say-their-fight-for-12237914.php');
            });
            it('should not contain any extraneous links', () => {
                const results = infinite.buildLinkQueue(document.body);
                assert.lengthOf(results, 4);
            });
        });
    });
    describe('addNewArticle', () => {
        beforeEach(() => {
            let dom = new JSDOM(ENPage1);
            let window = dom.window;
            let document = window.document;
        })
        describe('Element passed does not contain a div.article-body', () => {
            const dom = new JSDOM(`<html><head></head><body></body></html>`);
            const window = dom.window;
            const document = window.document;
            it('throws an error', () => {


                let err;
                try {
                    infinite.addNewArticle(document.body, '<html></html>');
                } catch (e) {
                    err = e;
                }

                assert.typeOf(err, 'Error');
            });
        });
        describe('Element passed contains a div.article-comments', () => {
            infinite.addNewArticle(document.body, ENPage1);

            const articleComments = document.querySelector('div.article-comments');
            const newDiv = articleComments.nextElementSibling;
            it('appends a div right after div.article-article-comments', () => {
                assert.typeOf(newDiv, 'HTMLDivElement');
            });
            it(`the div has a class of 'infinite-scroll-story'`, () => {
                assert.isTrue(newDiv.classList.contains('infinite-scroll-story'));
            });
            it('the top-level element of the div is a div.article-wrap', () => {
                assert.typeOf(newDiv.firstElementChild, 'HTMLDivElement');
                assert.isTrue(newDiv.firstElementChild.classList.contains('article-wrap'));
            });
        });
    });
});