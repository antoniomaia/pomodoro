var sessionLength = 25;
var breakLength = 5;
var countDown; 


function changeBreakLength(time){
	if(breakLength > 1 || time > 0)
		breakLength += time;
	else
		breakLength = 1;

	updateElementById("breakLength", breakLength);
}
function changeSessionLength(time){
	resetPomodoro();
	if(sessionLength > 1 || time > 0)
		sessionLength += time;
	else
		sessionLength = 1;

	updateElementById("sessionLength", sessionLength);
	updateElementById("sessionTime", sessionLength + ":00");
}
function updateElementById(element, value){
	document.getElementById(element).innerHTML = value;
}
function startPomodoro(){
	var timeMin = document.getElementById("sessionLength").innerHTML;
	var timeInSec = timeMin * 60;

	if(countDown) return;
	timer(timeInSec, true);
}

function timer(seconds, breakAfter){
	var now = Date.now();
	var then = now + (seconds * 1000);
	displayTimeLeft(seconds);

	countDown = setInterval(function(){
		var secondsLeft = Math.round((then - Date.now()) / 1000);
		console.log(secondsLeft);
		if (secondsLeft < 0){
			clearInterval(countDown);
			playSound();
			if(breakAfter) makeBreak(breakAfter);
			return;
		}

		displayTimeLeft(secondsLeft);
	}, 1000);
}

//display time in min:sec format
function displayTimeLeft(seconds){
	var minutes = Math.floor(seconds / 60);
	var remainSeconds = seconds % 60;
	var display = ((remainSeconds < 10) ? minutes + ":0" + remainSeconds : minutes + ":" + remainSeconds); 
	updateElementById("sessionTime", display);
}

function resetPomodoro(){
	clearInterval(countDown);
	countDown = undefined;
	updateElementById("sessionTime", sessionLength + ":00");
}

function playSound(){
	document.getElementById("alertSound").play();
}

function makeBreak(breakAfter){
	var timeMin = document.getElementById("breakLength").innerHTML;
	var timeInSec = timeMin * 60;
		timer(timeInSec, false);
}

