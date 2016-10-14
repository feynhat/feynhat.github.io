var canv, mouseDown = false, N = 1e6, curves = [], rc, colors = [], stage,
	curve, L = [], prevX = -1, prevY = -1, beginX, beginY, TABLEinfo;

window.onload = function(evt) {
	canv = document.querySelector("#canv");
	stage = new Candy.Stage(canv);
	canv.onmousedown = function(e) {
		console.log(e.pageX, this.offsetLeft);
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
	canv.onmouseup = function(e) {
		var x, y, n = 0, span;
		curve.close();
		stage.context.closePath();
		stage.context.stroke();
		mouseDown = false;
		for (var i = 0; i < N; i++) {
			x = parseInt(Math.random() * stage.width, 10);
			y = parseInt(Math.random() * stage.height, 10);
			if (curve.isPointInside(x, y)) {
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
	canv.onmousemove = function(e) {
		if (mouseDown) {
			curve.addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			stage.context.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			stage.context.stroke();
		} else if (e.touch !== true){
			for (var i = 0; i < curves.length; i++) {
				TABLEinfo.rows[i+1].cells[2].innerHTML = 
(curves[i].isPointInside(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)) ? "Inside" : "Outside";
			}
		}
		document.querySelector("#coox").innerHTML = e.pageX - this.offsetLeft;
		document.querySelector("#cooy").innerHTML = e.pageY - this.offsetTop;
	};
	canv.ontouchstart = function(e) {
		try {
			document.querySelector("#info").rows[0].deleteCell(2);
		} catch(e) {
		}
		canv.onmousedown({pageX: e.touches[0].pageX, pageY: e.touches[0].pageY, touch: true});
	};
	canv.ontouchmove = function(e) {
		canv.onmousemove({pageX: e.touches[0].pageX, pageY: e.touches[0].pageY, touch: true});
	};
	canv.ontouchend = function(e) {
		canv.onmouseup({pageX: e.touches[0].pageX, pageY: e.touches[0].pageY, touch: true});
	};
};
