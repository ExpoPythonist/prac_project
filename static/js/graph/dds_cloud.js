function DDSCloud() {
	var _this = this;

	this.w = $(window).width();
	this.h = $(window).height();

	this.color    = ['#1e90ff', '#f08080', '#00ff7f'];
	this.color_sp = ['#00ccff', '#99ff00', '#ffff66'];


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

}



$(function(){
	var dds_cloud = new DDSCloud();

	dds_cloud.render_cloud(
		[
		   {
		      "name":"メロス",
		      "group":1,
		      "value":20.0,
		      "size":70.0
		   },
		   {
		      "name":"セリヌンティウス",
		      "group":1,
		      "value":"3.9473684210526314",
		      "size":"13.815789473684212"
		   },
		   {
		      "name":"おまえ",
		      "group":1,
		      "value":"3.6842105263157894",
		      "size":"13.575681997798533"
		   },
		   {
		      "name":"それから",
		      "group":1,
		      "value":"2.6315789473684212",
		      "size":"10.830555762051588"
		   },
		   {
		      "name":"わし",
		      "group":1,
		      "value":"2.1052631578947367",
		      "size":"2.972628744218157"
		   },
		   {
		      "name":"群衆",
		      "group":1,
		      "value":"1.8421052631578947",
		      "size":"6.447368421052631"
		   },
		   {
		      "name":"さま",
		      "group":1,
		      "value":"1.5789473684210527",
		      "size":"0.7949526285747869"
		   },
		   {
		      "name":"結婚式",
		      "group":1,
		      "value":"1.5789473684210527",
		      "size":"1.7116688611038027"
		   },
		   {
		      "name":"約束",
		      "group":1,
		      "value":"1.5789473684210527",
		      "size":"2.141858066979429"
		   },
		   {
		      "name":"濁流",
		      "group":1,
		      "value":"1.5789473684210527",
		      "size":"5.526315789473683"
		   },
		   {
		      "name":"暴君",
		      "group":1,
		      "value":"1.5789473684210527",
		      "size":"15.789473684210527"
		   },
		   {
		      "name":"身代り",
		      "group":1,
		      "value":"1.5789473684210527",
		      "size":"5.526315789473683"
		   },
		   {
		      "name":"信実",
		      "group":1,
		      "value":"1.3157894736842106",
		      "size":"4.605263157894737"
		   },
		   {
		      "name":"疲労",
		      "group":1,
		      "value":"1.3157894736842106",
		      "size":"2.447163009124723"
		   },
		   {
		      "name":"つもり",
		      "group":1,
		      "value":"1.3157894736842106",
		      "size":"0.6548399575718051"
		   },
		   {
		      "name":"出発",
		      "group":1,
		      "value":"1.3157894736842106",
		      "size":"1.5594684032950619"
		   },
		   {
		      "name":"王城",
		      "group":1,
		      "value":"1.3157894736842106",
		      "size":"4.605263157894737"
		   },
		   {
		      "name":"老爺",
		      "group":1,
		      "value":"1.0526315789473684",
		      "size":3.68421052631579
		   },
		   {
		      "name":"刑場",
		      "group":1,
		      "value":"1.0526315789473684",
		      "size":3.68421052631579
		   },
		   {
		      "name":"来る",
		      "group":2,
		      "value":"9.539473684210526",
		      "size":"5.276727065533311"
		   },
		   {
		      "name":"走る",
		      "group":2,
		      "value":"7.894736842105263",
		      "size":"25.272894964758066"
		   },
		   {
		      "name":"くれる",
		      "group":2,
		      "value":"6.578947368421052",
		      "size":"1.8527062053827574"
		   },
		   {
		      "name":"殺す",
		      "group":2,
		      "value":"5.592105263157895",
		      "size":"14.085079561015421"
		   },
		   {
		      "name":"言う",
		      "group":2,
		      "value":"4.276315789473684",
		      "size":"0.4226895208813431"
		   },
		   {
		      "name":"行く",
		      "group":2,
		      "value":"4.276315789473684",
		      "size":"0.5923133255940619"
		   },
		   {
		      "name":"出来る",
		      "group":2,
		      "value":"3.9473684210526314",
		      "size":"1.513649310271869"
		   },
		   {
		      "name":"信じる",
		      "group":2,
		      "value":"3.6184210526315788",
		      "size":"4.810395855787783"
		   },
		   {
		      "name":"死ぬ",
		      "group":2,
		      "value":"3.289473684210526",
		      "size":"1.3593858381736248"
		   },
		   {
		      "name":"待つ",
		      "group":2,
		      "value":"2.960526315789474",
		      "size":"1.740053192718147"
		   },
		   {
		      "name":"帰る",
		      "group":2,
		      "value":"2.960526315789474",
		      "size":"0.9666254502666853"
		   },
		   {
		      "name":"笑う",
		      "group":2,
		      "value":"2.6315789473684212",
		      "size":"1.8368594511810017"
		   },
		   {
		      "name":"下さる",
		      "group":2,
		      "value":"2.6315789473684212",
		      "size":"0.9087101668273014"
		   },
		   {
		      "name":"沈む",
		      "group":2,
		      "value":"2.6315789473684212",
		      "size":"12.482330805378758"
		   },
		   {
		      "name":"無い",
		      "group":3,
		      "value":"7.894736842105263",
		      "size":"8.333595622435455"
		   },
		   {
		      "name":"いい",
		      "group":3,
		      "value":"2.960526315789474",
		      "size":"0.19599263937346295"
		   },
		   {
		      "name":"よい",
		      "group":3,
		      "value":"2.3026315789473686",
		      "size":"0.49079097651749215"
		   },
		   {
		      "name":"佳い",
		      "group":3,
		      "value":"1.9736842105263157",
		      "size":"15.789473684210526"
		   },
		   {
		      "name":"大きい",
		      "group":3,
		      "value":"1.3157894736842106",
		      "size":"0.5291643377789502"
		   },
		   {
		      "name":"若い",
		      "group":3,
		      "value":"1.3157894736842106",
		      "size":"0.904075074249187"
		   },
		   {
		      "name":"早い",
		      "group":3,
		      "value":"1.3157894736842106",
		      "size":"0.20370724568342746"
		   },
		   {
		      "name":"高い",
		      "group":3,
		      "value":"1.3157894736842106",
		      "size":"0.25598718559870604"
		   },
		   {
		      "name":"深い",
		      "group":3,
		      "value":"0.9868421052631579",
		      "size":"0.5165829655615573"
		   },
		   {
		      "name":"悪い",
		      "group":3,
		      "value":"0.9868421052631579",
		      "size":"0.11920197417504441"
		   },
		   {
		      "name":"たまらない",
		      "group":3,
		      "value":"0.6578947368421053",
		      "size":"0.7483885229392059"
		   },
		   {
		      "name":"ありがたい",
		      "group":3,
		      "value":"0.6578947368421053",
		      "size":"0.442809692132095"
		   },
		   {
		      "name":"小さい",
		      "group":3,
		      "value":"0.6578947368421053",
		      "size":"0.23841247915291774"
		   },
		   {
		      "name":"口惜しい",
		      "group":3,
		      "value":"0.6578947368421053",
		      "size":"5.2631578947368425"
		   }
		] , '#wordCloud');

});

