	$(function(){
		var thermo_color_left = [[255, 255, 255], [245, 229, 128]];
		var thermo_color_right = [[255, 255, 255], [200, 168, 225]];

		$('#nounTable td.file-ratio-1').graphup({
			max: 100,
			min: 0,
			colorMap: thermo_color_left,
			painter: 'bars',
			barsAlign: 'right'
		});
		$('#nounTable td.file-ratio-2').graphup({
			max: 100,
			min: 0,
			colorMap: thermo_color_right,
			painter: 'bars'
		});
		$('#verbTable td.file-ratio-1').graphup({
			max: 100,
			min: 0,
			colorMap: thermo_color_left,
			painter: 'bars',
			barsAlign: 'right'
		});
		$('#verbTable td.file-ratio-2').graphup({
			max: 100,
			min: 0,
			colorMap: thermo_color_right,
			painter: 'bars'
		});
		$('#adjTable td.file-ratio-1').graphup({
			max: 100,
			min: 0,
			colorMap: thermo_color_left,
			painter: 'bars',
			barsAlign: 'right'
		});
		$('#adjTable td.file-ratio-2').graphup({
			max: 100,
			min: 0,
			colorMap: thermo_color_right,
			painter: 'bars'
		});
	});