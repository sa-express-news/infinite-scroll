import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { JSDOM } from 'jsdom';

const assert = chai.assert;

import samplePageHTML from './sampleENPage';

let dom = new JSDOM(samplePageHTML);
let window = dom.window;
let document = window.document;

// beforeEach(() => {
//     let dom = new JSDOM(samplePageHTML);
//     let window = dom.window;
//     let document = window.document;
// })