"use strict";

var canv, stage, n = 0, N = 0, iv;

window.onload = function (evt) {
	canv = document.querySelector("#canv");
	stage = new Candy.Stage(canv);
	stage.context.beginPath();
	stage.context.arc(0, 0, stage.width, 0, Math.PI/2);
	stage.context.stroke();
	var BUTTONest = document.querySelector("#est");
	BUTTONest.onclick = function(e) {
			iv = setInterval(iteratePI, 1);
	};
	var BUTTONstop = document.querySelector("#stop");
	BUTTONstop.onclick = function(e) {
		clearInterval(iv);
	};
}

function iteratePI() {
	N++;
	var x = Math.random() * stage.width;
	var y = Math.random() * stage.height;
	stage.context.fillStyle = "#ff0000";
	if (x*x + y*y < stage.width*stage.width) {
		n++;
		stage.context.fillStyle = "#00ff00";
	}
	stage.context.beginPath();
	stage.context.arc(x, y, 2, 0, 2*Math.PI);
	stage.context.fill();
	document.querySelector("#nop").innerHTML = n;
	document.querySelector("#noN").innerHTML = N;
	document.querySelector("#pi").innerHTML = 4 * (n/N);
}
