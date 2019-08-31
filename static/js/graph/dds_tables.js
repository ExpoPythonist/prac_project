$(function(){
	$('#nounTable td.freq').graphup({
		colorMap: [[30,144,255]],
		painter: 'bars'
	});
	$('#verbTable td.freq').graphup({
		colorMap: [[240,128,128]],
		painter: 'bars'
	});
	$('#adjTable td.freq').graphup({
		colorMap: [[0,255,127]],
		painter: 'bars'
	});
});
