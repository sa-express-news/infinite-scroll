// Load Hearst jwplayer player when page loads, in case we need it

// Build a queue of related links/story URLS to hit

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















// const fetchPage = async (page: string): Promise<string> => {

//     return await parseResponseText(await fetch(page));
// }

// const parseResponseText = async (response: Response): Promise<string> => {
//     return await response.text();
// }

// const appendHTMLAfterElement = (element: Element, html: string): void => {
//     const newHTML = document.createElement('div');
//     newHTML.innerHTML = html;
//     const parentElement = element.parentElement;
//     parentElement.appendChild(newHTML);
// }

// // const replaceAllScripts = (document: Document): void => {
// //     const scripts = Array.from(document.getElementsByTagName('script'));
// //     scripts.forEach((script: HTMLScriptElement) => {
// //         reloadElement(script, 'script');
// //     });
// // }

// // const reloadElement = (element: Element, tagToCreate: string): void => {
// //     const parent = element.parentElement;
// //     const html = element.innerHTML;
// //     parent.removeChild(element);

// //     const newElement = document.createElement(tagToCreate);
// //     newElement.innerHTML = html;
// //     parent.appendChild(newElement);

// // }

// // const getScriptsInElement = (element: Element): NodeListOf<HTMLScriptElement> => {
// //     return element.getElementsByTagName('script');
// // }

// const addHDNPlayer = (document: Document): void => {
//     const script = document.createElement('script');
//     script.src = 'https://content.jwplatform.com/libraries/uVzyVL6s.js';
//     document.head.appendChild(script);
// }

// const createJWVideo = (window: Window): void => {
//     if (window.jwplayer) {
//         const container = document.getElementsByClassName('hearst-jwplayer')[0];
//         const parent = container.parentElement;
//         parent.removeChild(container);
//         const newContainer = document.createElement('div');
//         newContainer.id = 'jw-player-kia';
//         parent.appendChild(newContainer);
//         const playerInstance = jwplayer('jw-player-kia');
//         playerInstance.setup({
//             file: "http://content.jwplatform.com/videos/QOZNRGOD-DKEYSFrx.mp4"
//         });
//     }
// }

// const main = async (url: string): Promise<void> => {
//     addHDNPlayer(document);
//     const html = await fetchPage(url);
//     const article = document.getElementById('content');
//     console.log('appending page');
//     await appendHTMLAfterElement(article, html);
//     createJWVideo(window);
//     // const logger = document.getElementById('dummyLog');
//     // reloadElement(logger, 'script');
//     // const div = document.getElementById('player-9eoq3cVV-container');
//     // await reloadElement(div, 'div');

//     // const scripts = getScriptsInElement(div);
//     // scripts.forEach(script => reloadElement(script, 'script'));
//     // replaceAllScripts(document);
// }
