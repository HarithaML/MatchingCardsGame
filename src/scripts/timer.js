
let numberGenerator = () => {return Math.floor(Math.random() * window.numCards) + 1};
let setSourceAttribute = (image,name) => image.setAttribute("src", `pics/${name}`);

let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;
let totalMinutes = 0;
let stop;

const getTimerValue = () => {
    document.getElementById('message').innerHTML = `You have taken ${totalMinutes} Minutes ${totalSeconds} Seconds To Complete the challenge!`;
};

function startTimer(){
    stop=0;
    pickCards();
    window.init();
    setInterval(setStart, window.timeoutValue)
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
    for(let i = 1; i <= window.numCards; i ++) {
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
    window.hideElement(cardImg);
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


window.stopTimer = () => stopTimer();
