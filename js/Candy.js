"use strict";

var Candy = {};

Candy.Stage = function (canv, meta) {
	this.context = canv.getContext("2d");
	this.canvas = canv;
	this.meta = meta;
	for (var x in meta) {
		this.context[x] = meta[x];
	}
};
Object.defineProperty(Candy.Stage.prototype, "width", {
	get: function () {
		return this.canvas.width;
	}
});
Object.defineProperty(Candy.Stage.prototype, "height", {
	get: function () {
		return this.canvas.height;
	}
});
Candy.Stage.prototype.wipe = function () {
	var tempFS = this.context.fillStyle;
	var tempSS = this.context.strokeStyle;
	this.context.fillStyle = this.meta.fillStyle;
	this.context.strokeStyle = this.meta.strokeStyle;
	this.context.fillRect(0, 0, this.width, this.height);
	this.context.fillStyle = tempFS;
	this.context.strokeStyle = tempSS;
};

Candy.randomColor = function() {
	var r = 17 * parseInt(Math.random() * 16, 10);
	var g = 17 * parseInt(Math.random() * 16, 10);
	var b = 17 * parseInt(Math.random() * 16, 10);
	var out = "rgb(" + r + ", " + g + ", " + b + ")";
	return out;
};
