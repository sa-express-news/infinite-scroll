

//This is only so we can use fetch in node and therefore test our fetch-related code
import fetch from 'node-fetch';

export const createHDNPlayerScript = (document: Document): HTMLScriptElement => {
    const script = document.createElement('script');
    script.src = 'https://content.jwplatform.com/libraries/uVzyVL6s.js';
    return script;
}


export const containsSelector = (element: Element, selector: string): boolean => {
    return element.querySelector(selector) !== null;
}

export const fetchPageHTML = async (page: string): Promise<string> => {
    try {
        const response = await fetch(page);
        return await response.text();
    } catch (e) {
        throw e;
    }

    async function parseResponseText(response: Response): Promise<string> {
        return await response.text();

    }
}
export const deduplicateElementsOnAttribute = (elements: HTMLCollection | NodeListOf<any>, attribute: string): Element[] => {
    let uniqueAttributes: string[] = [];
    let array = Array.from(elements);
    let filteredArray = array.filter((current: Element) => {
        let alreadyFound = false;
        if (uniqueAttributes.indexOf(current[attribute]) === -1) {
            uniqueAttributes.push(current[attribute]);
        } else {
            alreadyFound = true;
        }
        return alreadyFound;
    })
    return filteredArray;
}


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
