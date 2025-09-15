//Initializing variables 
let timer;
let seconds = 0, minutes = 0, hours = 0;
let isRunning = false;

//selecting elements from the DOM
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

// format time values to always be two digits
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

// Update the display
function updateDisplay(){
    display.textContent = `
    ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

//Start the stopwatch
startBtn.addEventListener('click',function() {
    if (!isRunning) {    //only run if its not already running
        isRunning = true;  //mark stopwatch as running 
        timer = setInterval(() => {   //set an interval to update time every 1 second
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }, 1000); // update every second
    }
});

//Pause the stopwatch
pauseBtn.addEventListener('click', function() {
    if (isRunning) { // only pause if its running
        isRunning = false; // mark stopwatch as not running
        clearInterval(timer); // clear the interval to stop time updates
    }
});

//Reset the stopwatch
resetBtn.addEventListener('click', function() {
    isRunning = false;
    clearInterval(timer);
    seconds = 0; minutes = 0; hours = 0;
    updateDisplay();
    laps.innerHTML = ''; // clear all recorded laps
});

//Add lap functionality
lapBtn.addEventListener('click', function() {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = `Lap: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        laps.appendChild(li);
    }
});

//Initialize display
updateDisplay();

