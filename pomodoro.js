let sessionLength = 25;
let breakLength = 5;
let countDown;

function changeBreakLength(time) {
	if (breakLength > 1 || time > 0)
		breakLength += time;
	else
		breakLength = 1;

	updateElementById("breakLength", breakLength);
}
function changeSessionLength(time) {
	resetPomodoro();
	if (sessionLength > 1 || time > 0)
		sessionLength += time;
	else
		sessionLength = 1;

	updateElementById("sessionLength", sessionLength);
	updateElementById("sessionTime", sessionLength + ":00");
}
function updateElementById(element, value) {
	document.getElementById(element).innerHTML = value;
}
function startPomodoro() {
	const timeMin = document.getElementById("sessionLength").innerHTML;
	const timeInSec = timeMin * 60;

	if (countDown) return;
	timer(timeInSec, true);
}

function timer(seconds, breakAfter) {
	const now = Date.now();
	const then = now + (seconds * 1000);
	displayTimeLeft(seconds);

	countDown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if (secondsLeft < 0) {
			clearInterval(countDown);
			playSound();
			if (breakAfter) makeBreak(breakAfter);
			return;
		}

		displayTimeLeft(secondsLeft);
	}, 1000);
}

//display time in min:sec format
function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainSeconds = seconds % 60;
	const display = ((remainSeconds < 10) ? minutes + ":0" + remainSeconds : minutes + ":" + remainSeconds);
	updateElementById("sessionTime", display);
}

function resetPomodoro() {
	clearInterval(countDown);
	countDown = undefined;
	updateElementById("sessionTime", sessionLength + ":00");
}

function playSound() {
	document.getElementById("alertSound").play();
}

function makeBreak(breakAfter) {
	const timeMin = document.getElementById("breakLength").innerHTML;
	const timeInSec = timeMin * 60;
	timer(timeInSec, false);
}
