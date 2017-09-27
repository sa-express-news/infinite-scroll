import * as scroll from './scroll';

// Load Hearst jwplayer player when page loads, in case we need it

const infiniteScroll = (): void => {
    const jwScript = scroll.createHDNPlayerScript(document);
    document.head.appendChild(jwScript);

    // Build a queue of related links/story URLS to hit

    let relatedATags = [];
    let relatedLinkURLs: string[] = [];

    // - Check if there's a related stories sidebar, because it's usually got more relevant content

    if (scroll.containsSelector(document.body, 'div.collection.article-related')) {
        //Take all the story links in the sidebar
        relatedATags = scroll.deduplicateElementsOnAttribute(document.querySelector('div.article-related').querySelectorAll('a'), 'href');

    } else {
        //Take all the story links at the bottom of the page
        relatedATags = scroll.deduplicateElementsOnAttribute(document.querySelector('div.article-sections').querySelectorAll('a'), 'href');
    }

    relatedLinkURLs = relatedATags.map((tag => tag.href));

    console.log(`Infinite scroll links: ${relatedLinkURLs}`);
}



// Immediately request the first story in the queue

// Pass the story to a function that returns only the HTML from headline to ending byline

// Listen to scroll events (throttle to save performance) and wait until the reader is arbitrary
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

// Set up (unless it'll keep working naturally) another throttled scroll listener

// Repeat the request, append, set up loop at appropriate page scroll threshold

// Queue is empty

// Append a link back to EN at the end of the page?

