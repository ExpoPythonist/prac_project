function Home() {
	var _this = this;

	this.w = $(window).width();
	this.h = $(window).height();

	this.color    = ['#1e90ff', '#f08080', '#00ff7f'];
	this.color_sp = ['#00ccff', '#99ff00', '#ffff66'];

	this.render_network = function(nodes, links) {
		var size = {"width": 574, "height": 400};

		var force = d3.layout.force()
		.charge(-180)
		.linkDistance(200)
		.nodes(nodes)
		.links(links)
		.size([size['width'],size['height']])
		.start();

		var svg = d3.select('#wordNetwork').append("svg")
		.attr("width", size['width'])
		.attr("height", size['height']);

		var link = svg.selectAll(".link")
		.data(links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke-width", function(d) {
			if(Math.sqrt(d.weight) < 8) {
				return Math.sqrt(d.weight);
			} else {
				return 8;
			}
		})
		.style("stroke","#696969")
		.style("stroke-opacity",.2);

		var node = svg.selectAll(".node")
		.data(nodes)
		.enter().append("circle")
		.attr("class","node")
		.attr("r", function(d) {
			return 5 + parseFloat(d.value);
		})
		.style("fill", function(d) { return _this.color[d.group - 1]; })
		.style("stroke","#fff")
		.style("stroke-width",1.5)
		.on("mouseover", function(d) {
			link.style("stroke-opacity", function(o) {
				return o.source === d || o.target === d ? 1 : .2;
			});
		})
		.call(force.drag);

		var txt = svg.selectAll(".txt")
		.data(nodes)
		.enter().append("text")
		.attr("class","txt")
		.attr("text-anchor","middle")
		.style("font-size","11pt")
		.text(function(d){ return d.name; })
		.call(force.drag);

		force.on('tick',function(){
			link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

			node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
			txt.attr("x", function(d){ return d.x; })
			.attr("y", function(d){ return d.y; });
		});
	}

	this.render_cloud = function(nodes, tag_id) {
		var max_size  = d3.max(nodes, function(n){ return n.size} );
		var sizeScale = d3.scale.linear().domain([0, max_size]).range([15, 90]);

		var words = nodes.map(function(n) {
			return {
				name: n.name,
				text: n.name,
				size: sizeScale(n.size),
				group: n.group
			}
		});

		d3.layout.cloud().size([574,400])
		.words(words)
		.padding(5)
		.rotate(function() { return 0; })
		.font('Impact')
		.fontSize(function(d) { return d.size; })
		.on("end", function(nodes) {
			d3.select(tag_id).append("svg")
			.attr("width", 574)
			.attr("height", 400)
			.append("g")
			.attr("transform", "translate(287, 200)")
			.selectAll("text")
			.data(nodes)
			.enter().append("text")
			.style("font-size", function(d) { return d.size + "px"; })
			.attr("text-anchor", "middle")
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return _this.color[d.group - 1]; })
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { return d.name; });
		})
		.start();
	}

	this.render_cloud_embed = function(nodes) {
		var max_size  = d3.max(nodes, function(n) { return n.size; } );
		var sizeScale = d3.scale.linear().domain([0, max_size]).range([10, 100]);

		var words = nodes.map(function(n) {
			return {
				name: n.name,
				text: n.name,
				size: sizeScale(n.size) + 20,
				group: n.group
			};
		});

		d3.layout.cloud().size([_this.w, _this.h])
		.words(words)
		.padding(5)
		//.rotate(function() { return Math.round(1 - Math.random()) * 90; })
		.rotate(function() { return 0; })
		.font('Impact')
		.fontSize(function(d) { return d.size; })
		.on("end", _this.draw_embed)
		.start();
	};

	this.draw_embed = function(nodes) {
		d3.select("#wordCloud").append("svg")
		.attr({
			"width": _this.w,
			"height": _this.h
		})
		.append("g")
		.attr("transform", "translate(" + (_this.w / 2) + "," + (_this.h / 2) + ")")
		.selectAll("text")
		.data(nodes)
		.enter()
		.append("text")
		.style({
			"font-family": "Impact",
			"font-size": function(d) { return d.size + "px"; },
			"fill": function(d, i) { return _this.color[d.group - 1]; }
		})
		.attr({
			"text-anchor": "middle",
			"transform": function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			}
		})
		.text(function(d) { return d.text; });
	}

	this.render_cloud_sp = function(nodes) {
		var max_size  = d3.max(nodes, function(n){ return n.size} );
		var sizeScale = d3.scale.linear().domain([0, max_size]).range([15, 90]);

		var words = nodes.map(function(n) {
			return {
				name: n.name,
				text: n.name,
				size: sizeScale(n.size),
				group: n.group
			}
		});

		var w = $('#wordCloud').width();
		var h = $('#wordCloud').height();

		d3.layout.cloud().size([w, h])
		.words(words)
		.padding(5)
		.rotate(function() { return 0; })
		.font('Impact')
		.fontSize(function(d) { return d.size; })
		.on("end", _this.draw_sp)
		.start();
	}

	this.draw_sp = function(nodes) {
		var w = $('#wordCloud').width();
		var h = $('#wordCloud').height();

		var svg = d3.select("#wordCloud")
		.append("svg")
		.attr({
			"width": w,
			"height": h
		});

		svg.append("rect")
		.attr({
			"width": w,
			"height": h,
			"fill": "#333"
		});

		svg.append("g")
		.attr({
			"transform": "translate(" + (w / 2) + ", " + (h / 2) + ")"
		})
		.selectAll("text")
		.data(nodes)
		.enter().append("text")
		.style("font-size", function(d) { return d.size + "px"; })
		.attr("text-anchor", "middle")
		.style("font-family", "Impact")
		.style("fill", function(d, i) { return _this.color_sp[d.group - 1]; })
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) { return d.name; });
	}

	this.render_cloud_share = function(nodes) {
		var max_size  = d3.max(nodes, function(n){ return n.size} );
		var sizeScale = d3.scale.linear().domain([0, max_size]).range([15, 90]);

		var words = nodes.map(function(n) {
			return {
				name: n.name,
				text: n.name,
				size: sizeScale(n.size),
				group: n.group
			}
		});

		d3.layout.cloud().size([900, 400])
		.words(words)
		.padding(5)
		.rotate(function() { return 0; })
		.font('Impact')
		.fontSize(function(d) { return d.size; })
		.on("end", _this.draw_share)
		.start();
	}

	this.draw_share = function(nodes) {
		var w = 900;
		var h = 400;

		var svg = d3.select("#shareWordCloud")
		.append("svg")
		.attr({
			"width": w,
			"height": h
		});

		svg.append("rect")
		.attr({
			"width": w,
			"height": h,
			"fill": "#333"
		});

		svg.append("g")
		.attr({
			"transform": "translate(" + (w / 2) + ", " + (h / 2) + ")"
		})
		.selectAll("text")
		.data(nodes)
		.enter().append("text")
		.style("font-size", function(d) { return d.size + "px"; })
		.attr("text-anchor", "middle")
		.style("font-family", "Impact")
		.style("fill", function(d, i) { return _this.color_sp[d.group - 1]; })
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) { return d.name; });
	}

	this.render_map = function(
		json_data, tag, yAxis_type, left_doc_name, right_doc_name, yAxis_title,
		yAxis_higher_label, yAxis_lower_label, xAxis_label_minus, tickAmount,
		yAxis_max, yAxis_min, yAxis_gridLineWidth, yAxis_plotLines
		) {
		var label_right_center;
		var label_center_higher;
		var label_center_lower;
		$(tag).highcharts({
			chart: {
				type: 'bubble',
				plotBorderWidth: 1,
				height: 600,
				events: {
					load: function() {
						var right_label_width = getLabelWidth(this.renderer, right_doc_name + '寄り');
						label_right_center = this.renderer.label(right_doc_name + '寄り', this.chartWidth - 56, this.chartHeight / 2 + right_label_width / 2)
						.css({
							color: '#FFFFFF',
							fontSize: '16px'
						})
						.attr({
							fill: 'rgb(0, 102, 51)',
							padding: 8,
							r: 5,
							rotation: -90
						})
						.add();

						label_center_higher = this.renderer.label(yAxis_higher_label + 'な単語', this.chartWidth / 2 - xAxis_label_minus, 25)
						.css({
							color: '#FFFFFF',
							fontSize: '16px'
						})
						.attr({
							fill: 'rgba(0, 0, 0, 0.7)',
							padding: 8,
							r: 5,
						})
						.add();

						label_center_lower = this.renderer.label(yAxis_lower_label + 'な単語', this.chartWidth / 2 - xAxis_label_minus, 536)
						.css({
							color: '#FFFFFF',
							fontSize: '16px'
						})
						.attr({
							fill: 'rgba(0, 0, 0, 0.4)',
							padding: 8,
							r: 5,
						})
						.add();
					},
					redraw: function() {
						if (label_right_center) {
							label_right_center.destroy();
							label_center_higher.destroy();
							label_center_lower.destroy();
						}

						var left_label_width = getLabelWidth(this.renderer, left_doc_name + '寄り');
						label_right_center = this.renderer.label(right_doc_name + '寄り', this.chartWidth - 56, this.chartHeight / 2 + left_label_width / 2)
						.css({
							color: '#FFFFFF',
							fontSize: '16px'
						})
						.attr({
							fill: 'rgb(0, 102, 51)',
							padding: 8,
							r: 5,
							rotation: -90,
						})
						.add();

						label_center_higher = this.renderer.label(yAxis_higher_label + 'な単語', this.chartWidth / 2 - xAxis_label_minus, 25)
						.css({
							color: '#FFFFFF',
							fontSize: '16px'
						})
						.attr({
							fill: 'rgba(0, 0, 0, 0.7)',
							padding: 8,
							r: 5,
						})
						.add();

						label_center_lower = this.renderer.label(yAxis_lower_label + 'な単語', this.chartWidth / 2 - xAxis_label_minus, 536)
						.css({
							color: '#FFFFFF',
							fontSize: '16px'
						})
						.attr({
							fill: 'rgba(0, 0, 0, 0.4)',
							padding: 8,
							r: 5,
						})
						.add();
					}
				},
			},
			credits: {
				enabled: false
			},
			title: {
				text: ''
			},
			legend: {
				enabled: false
			},
			xAxis: {
				plotLines: [{
					color: '#D8D8D8',
					width: 1,
					value: 0
				}],
				title: '',
				// title: {
				// 	text: '単語のファイル偏り',
				// 	style: {
				// 		'font-weight': 'bold',
				// 		'font-size': '16px'
				// 	}
				// },
				labels: {
					enabled: false
				},
							max: 120,
							min: -120,
				tickLength: 0
			},
			yAxis: {
				gridLineWidth: yAxis_gridLineWidth,
				plotLines: yAxis_plotLines,
							title: '',
				// title: {
				// 	text: yAxis_title,
				// 	style: {
				// 		'font-weight': 'bold',
				// 		'font-size': '16px'
				// 	}
				// },
				type: yAxis_type,
				labels: {
					enabled: false
				},
				max: yAxis_max,
				min: yAxis_min,
				tickAmount: tickAmount
			},
			plotOptions: {
				series: {
					dataLabels: {
						allowOverlap: true,
						enabled: true,
						format: '{point.word}',
						style: {'fontSize': '14px'}
					},
					animation: false
				},
				bubble: {
					minSize: 50,
					maxSize: 50
				}
			},
			tooltip: {
				pointFormat: '{point.word}'
			},
			series: [{
				name: '名詞',
				color: '#1e90ff',
				data: json_data[0]
			}, {
				name: '動詞',
				color: '#f08080',
				data: json_data[1]
			}, {
				name: '形容詞',
				color: '#00ff7f',
				data: json_data[2]
			}]
		}, function(chart) {
			var left_label_width = getLabelWidth(this.renderer, left_doc_name + '寄り');
			chart.renderer.label(left_doc_name + '寄り', 23, this.chartHeight / 2 + left_label_width / 2)
			.css({
				color: '#FFFFFF',
				fontSize: '16px'
			})
			.attr({
				fill: 'rgb(255, 102, 0)',
				padding: 8,
				r: 5,
				rotation: -90
			})
			.add();
		});
	};
}

function getLabelWidth(ren, text) {
	var label = ren.label(text, 0, 0)
		.css({
			fontSize: '16px'
		})
		.attr({
			fill: 'rgb(0, 102, 51',
			padding: 8
		})
		.add();

	var w = label.width;
	label.destroy();
	return w;
}
