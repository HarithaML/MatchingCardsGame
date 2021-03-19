window.addEventListener('load', init, false);

let showElementById = (id) => document.getElementById(`card${id}`).style.visibility = 'visible';
let hideElementById = (id) => document.getElementById(`card${id}`).style.visibility = 'hidden';
let hideElement = (element) => element.style.visibility = 'hidden';

let numCards = 6;
const timeoutValue = 1000;

let matchingPairs;
let lastSelection;
let nuMatchingPairs=0;

const checkTimer = () => {
    if(nuMatchingPairs === matchingPairs.length ) {
        window.stopTimer();
    }
}

function init() {
    matchingPairs = [];
    let srcDivIdMap = new Map();
    for (let i = 1; i <= numCards; i++) {
        let idString = i.toString();
        let dcId = document.getElementById(`card${i}`);
        let src = dcId.getAttribute("src");
        (srcDivIdMap.has(src)) ? srcDivIdMap.get(src).push(idString) : srcDivIdMap.set(src, [idString]);
    }
    srcDivIdMap.forEach((v, _) => matchingPairs.push(v.join("-")));
}


function showImage(id) {
    if (lastSelection) {
        let check = matchingPairs.includes(`${lastSelection}-${id}`) ||
            matchingPairs.includes(`${id}-${lastSelection}`);

        if (check) {
            showElementById(id);
            nuMatchingPairs += 1;
            checkTimer()
        } else {
            showElementById(id)
            const temp = lastSelection;
            setTimeout(() => {
                hideElementById(id);
                hideElementById(temp);
            }, timeoutValue);
        }
        lastSelection = null;
    } else {
        lastSelection = id;
        showElementById(id);
    }

}

window.numCards = numCards;
window.timeoutValue = timeoutValue;
window.initMatchingPairs = () => init();
window.hideElement = (element) => hideElement(element);
