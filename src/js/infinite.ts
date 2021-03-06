import * as utility from './utility';

// Load Hearst jwplayer player when page loads, in case we need it

export const loadJW = (document: Document): void => {
    const jwScript = utility.createHDNPlayerScript(document);
    document.head.appendChild(jwScript);
}

// Build a queue of related links/story URLS to hit
export const buildLinkQueue = (element: Element): string[] => {

    const RELATED_SIDEBAR_SELECTOR = 'div.article-related';
    const BOTTOM_PAGE_STORY_LINKS_SELECTOR = 'div.article-sections';


    let relatedATags = [];
    let relatedLinkURLs: string[] = [];

    // - Check if there's a related stories sidebar, because it's usually got more relevant content

    if (utility.containsSelector(element, RELATED_SIDEBAR_SELECTOR)) {
        //Take all the story links in the sidebar
        relatedATags = utility.deduplicateElementsOnAttribute(element.querySelector(RELATED_SIDEBAR_SELECTOR).querySelectorAll('a'), 'href');

    } else {
        //Take all the story links at the bottom of the page
        relatedATags = utility.deduplicateElementsOnAttribute(element.querySelector(BOTTOM_PAGE_STORY_LINKS_SELECTOR).querySelectorAll('a'), 'href');
    }

    const allURLs = relatedATags.map((tag => tag.href));

    //Purge the list of links to sections like /sports/spurs/ - we only want articles, which all end in .php
    relatedLinkURLs = allURLs.filter((link => link.indexOf('.php') > -1));

    return relatedLinkURLs;

}

// Append a new article right after a given element's div.article-body

export const addNewArticle = (element: Element, articleHTML: string): void => {
    const ARTICLE_BODY_SELECTOR = 'div.article-body';
    const ARTICLE_COMMENTS_SELECTOR = 'div.article-comments';

    const articleBody = element.querySelector(ARTICLE_COMMENTS_SELECTOR);
    if (articleBody === null) {
        throw new Error(`Infinite scroll: can't find area to append next article`);
    }

    const holdingDiv = element.ownerDocument.createElement('div');
    holdingDiv.innerHTML = articleHTML;
    const articleContent = holdingDiv.querySelector('div.article-wrap');

    const articleContentHTML = articleContent.outerHTML;

    const div = element.ownerDocument.createElement('div');
    div.classList.add('infinite-scroll-story');
    div.innerHTML = articleContentHTML;
    articleBody.parentElement.insertBefore(div, element.nextSibling);

}

export const infiniteScroll = async (): Promise<void> => {

    loadJW(document);
    const linkQueue = buildLinkQueue(document.body);

    const main = async () => {
        if (utility.getScrollPercent(document) >= 75 && linkQueue.length > 0) {
            const storyLink = linkQueue.shift();
            const story = await utility.fetchPageHTML(storyLink);
            addNewArticle(document.body, story);
        }
    }

    document.addEventListener('scroll', main);

    // addNewArticle(document.body, firstStory);



}


// Immediately request the first story in the queue

// Pass the story to a function that returns only the HTML from headline to ending byline

// Listen to utility events (throttle to save performance) and wait until the reader is arbitrary
// % down the page

// Once reader reaches threshold, append next story to the bottom of the page.

// Fire a setup function on the new page's HTML

//Setup

// (Maybe) pop the new story's URL onto the history stack

// Ping Google Analytics to register a page view

// Ping the paywall to register another view

// Run any other necessary page-load code

// Check for the presence of a jwplayer container

// If jwplayer container exists

// Parse the script tag inside the jwplayer container to find video sources

// Delete, target or replace the container

// Target the container (or the new one you made) with the jwplayer API library,
// using the source file parsed from the script to add the video

// Add any necessary jwplayer view tracking code

// Do the check - append move for other tricky items (slideshows, iframes, freeforms)

// Article successfully appended - check if the queue contains another article links

// Queue contains another article

// Set up (unless it'll keep working naturally) another throttled utility listener

// Repeat the request, append, set up loop at appropriate page utility threshold

// Queue is empty

// Append a link back to EN at the end of the page?

