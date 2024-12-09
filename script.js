const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountsDispaly = document.querySelector('.pomoCountsdisplay');

// Making Variables
const WORK_TIME = 2 * 60;
const BREAK_TIME = 0.5 * 60;
let timerID = null;
let oneRoundCompleted = false; // One Round = Work Time + Break Time
let totalCount = 0;

// Function to update title
const updateTitle = (msg) => {
    title.textContent = msg;
}

// Function to Save pomodoro counts to local storage
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomoCounts", JSON.stringify(counts));
}

// Function to countdown
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time/60);
        const secs = Math.floor(time % 60);
        timer.textContent = time;
        time--;
        if(time < 0){
            stopTimer();
           if(!oneRoundCompleted) {
              timerID = startTimer(BREAK_TIME);
              oneRoundCompleted = true;
              updateTitle("It's Break Time!");
           } 
           else{
                updateTitle(" Completed 1 Round of Pomodoro Technique!");
                setTimeout(() => updateTitle("Start Timer Again!"), 2000);
                totalCount++;
                saveLocalCounts();
                showPomoCounts();
           }
        }
    } 
}

// Arrow Function to start timer
const startTimer = (startTime) => {
    if(timerID !== null){
      stopTimer();  
    }
   return setInterval(countDown(startTime), 1000);
}

// Arrow Function to stop time
const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}

// Adding Event Listener to start button
startBtn.addEventListener('click', ()=>{
   timerID = startTimer(WORK_TIME);
   updateTitle("It's Work Time!");
   
});

// Adding Event Listener to reset button
resetBtn.addEventListener('click', ()=>{
    stopTimer();
    timer.textContent = "25:00";
});

// Adding Event Listener to pause button
pauseBtn.addEventListener('click', ()=>{
    stopTimer();
});

// Adding Event Listener to resume button
resumeBtn.addEventListener('click', ()=>{
    stopTimer();
    timer.textContent = "25:00";
});


// Function to show completed pomodoros to screen from local stroge
const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    if(counts > 0){
        pomoCountsDispaly.style.display = "flex";
   } 
   pomoCountsDispaly.firstElementChild.textContent = counts;
}

showPomoCounts();