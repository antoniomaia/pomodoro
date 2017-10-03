var sessionLength = 25;
var breakLength = 5;
var countDown; 


function changeBreakLength(time){
	if(breakLength > 1)
		breakLength += time;
	else
		breakLength = 1;

	updateElementById("breakLength", breakLength);
}
function changeSessionLength(time){
	resetPomodoro();
	if(sessionLength > 1)
		sessionLength += time;
	else
		sessionLength = 1;

	updateElementById("sessionLength", sessionLength);
	updateElementById("sessionTime", sessionLength);
}
function updateElementById(element, value){
	document.getElementById(element).innerHTML = value;
}
function startPomodoro(){
	var timeMin = document.getElementById("sessionLength").innerHTML;
	var timeInSec = timeMin * 60;

	if(countDown) return;
	timer(timeInSec);
}

function timer(seconds){
	var now = Date.now();
	var then = now + (seconds * 1000);
	displayTimeLeft(seconds);

	countDown = setInterval(function(){
		var secondsLeft = Math.round((then - Date.now()) / 1000);

		if (seconds < 0){
			clearInterval(countDown);
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
	updateElementById("sessionTime", sessionLength);
}

