"use strict";

function Curve(x, y) {
		this.beginX = x;
		this.beginY = y;
		this.points = {x: [y]};
		this.prevX = x;
		this.prevY = y;
}
Curve.prototype.addPoint = function(x, y) {
	var m, xi, yi, a, b;
	if (x !== this.prevX) {
		m = (y - this.prevY)/(x - this.prevX);
		a = (x < this.prevX) ? x : this.prevX;
		b = x + this.prevX - a;
		for (xi = a + 1; xi <= b; xi++) {
			yi = parseInt(this.prevY + m*(xi - this.prevX), 10);
			if (this.points[xi] === undefined) {
				this.points[xi] = [];
			}
			if (this.points[xi].indexOf(yi) < 0) {
				this.points[xi].push(yi);
			}
		}
	}	
	this.prevX = x;
	this.prevY = y;
};
Curve.prototype.close = function() {
	this.addPoint(this.beginX, this.beginY);
};
Curve.prototype.isPointInside = function(x, y) {
	var c = 0;
	if (this.points[x] !== undefined) {
		for (var i = 0; i < this.points[x].length; i++) {
			if (y >= this.points[x][i]) {
				c++;
			}
		}
		if (c % 2 !== 0) {
			return true;	
		}
	}
	return false;
};
