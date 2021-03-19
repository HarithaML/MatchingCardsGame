window.addEventListener('load', init, false);

let numCards = 6;
document.getElementById('start').addEventListener('click',startTimer);
for(let i=0;i<=numCards;i++){
    document.getElementById(`${i}`).addEventListener('click',() => {showImage(`${i}`)});
}

let showElementById = (id) => document.getElementById(`card${id}`).style.visibility = 'visible';
let hideElementById = (id) => document.getElementById(`card${id}`).style.visibility = 'hidden';
let hideElement = (element) => element.style.visibility = 'hidden';
let numberGenerator = () => {return Math.floor(Math.random() * numCards) + 1};
let setSourceAttribute = (image,name) => image.setAttribute("src", `pics/${name}`);

let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;
let totalMinutes = 0;
let stop;


const timeoutValue = 1000;

let matchingPairs;
let lastSelection;
let nuMatchingPairs=0;

const checkTimer = () => {
    if(nuMatchingPairs === matchingPairs.length ) {
        stopTimer();
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
const getTimerValue = () => {
    document.getElementById('message').innerHTML = `You have taken ${totalMinutes} Minutes ${totalSeconds} Seconds To Complete the challenge!`;
};

function startTimer(){
    stop=0;
    pickCards();
    init();
    setInterval(setStart, timeoutValue)
}

function setStart() {
    if(stop === 1){
        return 0;
    }else{
        totalSeconds++;
        if(totalSeconds===60){
            totalMinutes++;
            totalSeconds=0;
            minutesLabel.innerHTML=totalMinutes.toString();
        }else {
            secondsLabel.innerHTML = totalSeconds.toString();
        }
    }

}

function pickCards(){
    let numbers = [];
    for(let i = 1; i <= numCards; i ++) {
        let dcId = document.getElementById(`card${i}`);
        setImage(dcId, numbers);
    }
}

function setImage(cardImg,numbersTaken){
    if(numbersTaken.length === 0){
        let number = numberGenerator();
        numbersTaken.push(number);
        setSourceAttribute(cardImg,generateName(number));
    }else{
        let number = numberGenerator();
        while (numbersTaken.includes(number)){
            number = numberGenerator();
        }
        numbersTaken.push(number);
        setSourceAttribute(cardImg, generateName(number));
    }
    hideElement(cardImg);
}

function generateName(number){
    let name ="";
    switch (number){
        case 1:
            name = "nodejs.jpeg";
            break;
        case 2:
            name = "angularjs.jpeg";
            break;
        case 3:
            name = "reactjs.png";
            break;
        case 4:
            name = "nodejs.jpeg";
            break;
        case 5:
            name = "angularjs.jpeg";
            break;
        case 6:
            name = "reactjs.png";
            break;

    }
    return name;

}

let stopTimer = () => {
    stop =1;
    getTimerValue()
    secondsLabel.innerHTML="00";
    minutesLabel.innerHTML="00";
    totalMinutes = 0;
    totalSeconds = 0;
}



