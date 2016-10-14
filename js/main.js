var canv, mouseDown = false, N = 1e6, curves = [], rc, colors = [], stage,
	curve, L = [], prevX = -1, prevY = -1, beginX, beginY, TABLEinfo;

window.onload = function(evt) {
	canv = document.querySelector("#canv");
	console.log(canv);
	stage = new Candy.Stage(canv);
	console.log(stage);
	canv.onmousedown = canv.ontouchstart = function(e) {
		curve = new Curve(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		rc = Candy.randomColor();
		if (rc in colors){
			rc = Candy.randomColors();
		}
		colors.push(rc);
		stage.context.strokeStyle = rc;
		stage.context.beginPath();
		moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		mouseDown = true;
	};
	canv.onmouseup = canv.ontouchend = function(e) {
		var x, y, n = 0, span;
		curve.close();
		stage.context.closePath();
		stage.context.stroke();
		mouseDown = false;
		for (var i = 0; i < N; i++) {
			x = parseInt(Math.random() * stage.width, 10);
			y = parseInt(Math.random() * stage.height, 10);
			if (curve.isPointInside(x, y, curve)) {
				n++;
			}
		}
		curves.push(curve);
		
		TABLEinfo = document.querySelector("#info");
		TABLEinfo.insertRow(curves.length);
		TABLEinfo.rows[curves.length].insertCell(0);
		TABLEinfo.rows[curves.length].cells[0].style.background = rc;
		TABLEinfo.rows[curves.length].insertCell(1);
		TABLEinfo.rows[curves.length].cells[1].innerHTML = n/N;
		TABLEinfo.rows[curves.length].insertCell(2);
	};
	canv.onmousemove = canv.ontouchmove = function(e) {
		if (mouseDown) {
			curve.addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			stage.context.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			stage.context.stroke();
		} else {
			for (var i = 0; i < curves.length; i++) {
				TABLEinfo.rows[i+1].cells[2].innerHTML = 
(curves[i].isPointInside(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)) ? "Inside" : "Outside";
			}
		}
		document.querySelector("#coox").innerHTML = e.pageX - this.offsetLeft;
		document.querySelector("#cooy").innerHTML = e.pageY - this.offsetTop;
	};
};
