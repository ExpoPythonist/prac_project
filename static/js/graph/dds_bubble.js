var DATA_COUNT = 10;
var MIN_XY = -75;
var MAX_XY = 100;

var presets = window.chartColors;
var utils = Samples.utils;

utils.srand(110);

function colorize(opaque, context) {
	var value = context.dataset.data[context.dataIndex];
	var x = value.x / 100;
	var y = value.y / 100;
	var r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
	var g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
	var b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
	var a = opaque ? 1 : 0.5 * value.v / 1000;

	return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function generateData() {
	var data = [];
	var i;

	for (i = 0; i < DATA_COUNT; ++i) {
		data.push({
			x: utils.rand(MIN_XY, MAX_XY).toFixed(2),
			y: utils.rand(MIN_XY, MAX_XY).toFixed(2),
			v: utils.rand(500, 700).toFixed(0)
		});
	}

	console.log(JSON.stringify(data));



	return data;
}

// generateData();
// generateData();
// generateData();
// generateData();

var data = {
	datasets: [{
		data: [
   {
      "x":"29.49",
      "y":"40.41",
      "v":"511"
   },
   {
      "x":"-6.48",
      "y":"83.70",
      "v":"505"
   },
   {
      "x":"25.20",
      "y":"43.95",
      "v":"565"
   },
   {
      "x":"22.45",
      "y":"-5.93",
      "v":"574"
   },
   {
      "x":"58.18",
      "y":"6.98",
      "v":"617"
   },
   {
      "x":"30.31",
      "y":"-19.40",
      "v":"575"
   },
   {
      "x":"11.76",
      "y":"-12.16",
      "v":"533"
   },
   {
      "x":"75.44",
      "y":"-73.38",
      "v":"574"
   },
   {
      "x":"-55.72",
      "y":"44.86",
      "v":"582"
   },
   {
      "x":"41.18",
      "y":"65.46",
      "v":"638"
   }
]
	}, {
		data: [
   {
      "x":"89.06",
      "y":"61.36",
      "v":"628"
   },
   {
      "x":"-14.16",
      "y":"-69.54",
      "v":"634"
   },
   {
      "x":"-20.55",
      "y":"95.69",
      "v":"539"
   },
   {
      "x":"-32.22",
      "y":"-70.04",
      "v":"627"
   },
   {
      "x":"23.77",
      "y":"31.18",
      "v":"582"
   },
   {
      "x":"45.32",
      "y":"-52.73",
      "v":"686"
   },
   {
      "x":"-69.64",
      "y":"-73.84",
      "v":"622"
   },
   {
      "x":"-73.20",
      "y":"40.74",
      "v":"675"
   },
   {
      "x":"-67.45",
      "y":"13.96",
      "v":"528"
   },
   {
      "x":"20.54",
      "y":"93.71",
      "v":"663"
   }
]
	}]
};





var data2 = {
	datasets: [{
		data: [
   {
      "x":"88.68",
      "y":"2.92",
      "v":"565"
   },
   {
      "x":"34.88",
      "y":"-10.50",
      "v":"516"
   },
   {
      "x":"-67.93",
      "y":"-48.63",
      "v":"600"
   },
   {
      "x":"28.16",
      "y":"-38.56",
      "v":"501"
   },
   {
      "x":"46.07",
      "y":"92.64",
      "v":"500"
   },
   {
      "x":"58.71",
      "y":"67.88",
      "v":"683"
   },
   {
      "x":"-36.00",
      "y":"-39.93",
      "v":"532"
   },
   {
      "x":"9.86",
      "y":"17.14",
      "v":"530"
   },
   {
      "x":"94.20",
      "y":"-38.01",
      "v":"561"
   },
   {
      "x":"-60.05",
      "y":"42.55",
      "v":"509"
   }
]
	}, {
		data: [
   {
      "x":"-29.99",
      "y":"-18.26",
      "v":"656"
   },
   {
      "x":"82.30",
      "y":"27.46",
      "v":"686"
   },
   {
      "x":"-0.25",
      "y":"77.64",
      "v":"682"
   },
   {
      "x":"-29.74",
      "y":"30.19",
      "v":"528"
   },
   {
      "x":"66.75",
      "y":"-41.96",
      "v":"506"
   },
   {
      "x":"12.15",
      "y":"-65.92",
      "v":"501"
   },
   {
      "x":"54.36",
      "y":"31.25",
      "v":"595"
   },
   {
      "x":"91.31",
      "y":"-27.54",
      "v":"672"
   },
   {
      "x":"20.91",
      "y":"5.63",
      "v":"615"
   },
   {
      "x":"91.07",
      "y":"28.67",
      "v":"508"
   }
]
	}]
};




var options = {
	aspectRatio: 3,
	legend: false,
	tooltips: false,

	elements: {
		point: {
			backgroundColor: colorize.bind(null, false),

			borderColor: colorize.bind(null, true),

			borderWidth: function(context) {
				return Math.min(Math.max(1, context.datasetIndex + 1), 8);
			},

			hoverBackgroundColor: 'transparent',

			hoverBorderColor: function(context) {
				return utils.color(context.datasetIndex);
			},

			hoverBorderWidth: function(context) {
				var value = context.dataset.data[context.dataIndex];
				return Math.round(8 * value.v / 1000);
			},

			radius: function(context) {
				var value = context.dataset.data[context.dataIndex];
				var size = context.chart.width;
				var base = Math.abs(value.v) / 1000;
				return (size / 24) * base;
			}
		}
	}
};

var chart = new Chart('chart-0', {
	type: 'bubble',
	data: data,
	options: options
});

var chart = new Chart('chart-1', {
	type: 'bubble',
	data: data2,
	options: options
});

