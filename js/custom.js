// Implements most of the visualizations in overview page

// A Bar Graph, graphing data as given
class BarGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, data, label, val, title, xlabel, ylabel) {
		this.svg = d3.select("#" + id);

		// scales the width by proper amount
 		let width = 800 / data.length;

 		// encodes index information for each bar
 		for (let i in data) {
 			data[i]["i"] = width * i;
 		}

 		let barPadding = 8;

 		let xLabels = new Array();
 		data.forEach(function(d) {
 				d[val] = +d[val];
				xLabels.push(d[label]);
		});

		let x = d3.scaleBand()
			.domain(xLabels)
			.range([0, 800])

		let y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d[val]; })])
            .range([400, 0]);

		let barChart = this.svg.selectAll("rect")
		    .data(data)
		    .enter()
		    .append("rect")
		    .attr("fill", "steelblue")
		    .attr("y", function(d) {
		        return 50 + y(d[val]);
		    })
		    .attr("height", function(d) {
		        return y(0) - y(d[val]);
		    })
		    .attr("width", width - barPadding)
		    .attr("transform", function (d, i) {
		         let translate = [width * i, 0];
		         return "translate("+ translate +")";
		    });

    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisLeft().scale(y);

    // adds x-axis
    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

    // title
    this.svg.append("text")
            .attr("x", 400)             
            .attr("y", 25)
            .attr("text-anchor", "middle")  
            .style("font-size", "28px") 
            .text(title);

		// x-axis label
		this.svg.append("text")
			.attr("x", 400)             
			.attr("y", 490)
			.attr("text-anchor", "middle")  
			.style("font-size", "18px") 
			.text(xlabel);


		// y-axis label
	  this.svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -85)
	      .attr("x", -250)
	      .style("font-size", "18px")
	      .style("text-anchor", "middle")
	      .text(ylabel); 
	}
}

// Corresponds to a horizontal Bar Graph, graphing data as given
class HorizBarGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, data, label, val, title, xlabel, ylabel, color=null) {
		this.svg = d3.select("#" + id);

		// scales the width by proper amount
		let height = 400 / data.length;

 		// encodes index information for each bar
 		for (let i in data) {
 			data[i]["i"] = height * i * 40;
 		}

 		let barPadding = 8;

 		let yLabels = new Array();
 		data.forEach(function(d) {
 			d[val] = +d[val];
 			yLabels.push(d[label]);
 		});


 		let x = d3.scaleLinear()
 		.domain([0, d3.max(data, function(d) { return d[val]; })])
 		.range([0, 800]);

 		let y = d3.scaleBand()
 		.domain(yLabels)
 		.range([400, 0])

 		let barChart = this.svg.selectAll("rect")
 		.data(data)
 		.enter()
 		.append("rect")
 		.attr("fill", function(d) {
 			if (color == null) {
 				return "steelblue";
 			} else {
 				return d[color];
 			}
 		})
 		.attr("x", function(d) {
 			return 0;
 		})
 		.attr("height", height - barPadding)
 		.attr("width", function(d) {
 			return x(d[val]);
 		})
 		.attr("transform", function (d, i) {
 			let base = 450 - height + barPadding;
 			let translate = [0, base - height * i];
 			return "translate("+ translate +")";
 		});

		// mark ticks 
		let xAxis = d3.axisBottom().scale(x);
		let yAxis = d3.axisLeft().scale(y);

    // adds x-axis
    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
    // 	''  y-axis
    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

    // title
    this.svg.append("text")
    .attr("x", 400)             
    .attr("y", 20)
    .attr("text-anchor", "middle")  
    .style("font-size", "28px") 
    .text(title);

		// x-axis label
		this.svg.append("text")
		.attr("x", 400)             
		.attr("y", 485)
		.attr("text-anchor", "middle")  
		.style("font-size", "18px") 
		.text(xlabel);

		// y-axis label
		this.svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -75)
		.attr("x", -250)
		.style("font-size", "18px")
		.style("text-anchor", "middle")
		.text(ylabel); 

		// legend outline
		this.svg.append("rect")
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("fill", "none")
 		.attr("height", 80)
 		.attr("width", 150)
 		.attr("transform", "translate(650, 365)");

 		// felony legend
		this.svg.append("rect")
		.attr("fill", "red")
 		.attr("height", 10)
 		.attr("width", 20)
 		.attr("transform", "translate(660, 375)");

		this.svg.append("text")
		.attr("x", 685)
		.attr("y", 385)
		.style("font-size", "18px")
		.text("Felonies"); 

		// misdemeanor legend
		this.svg.append("rect")
		.attr("fill", "orange")
 		.attr("height", 10)
 		.attr("width", 20)
 		.attr("transform", "translate(660, 400)");

		this.svg.append("text")
		.attr("x", 685)
		.attr("y", 410)
		.style("font-size", "18px")
		.text("Misdemeanors"); 

		// violation legend
		this.svg.append("rect")
		.attr("fill", "yellow")
 		.attr("height", 10)
 		.attr("width", 20)
 		.attr("transform", "translate(660, 425)");

		this.svg.append("text")
		.attr("x", 685)
		.attr("y", 435)
		.style("font-size", "18px")
		.text("Violations"); 
	}
}
// A Stacked Bar Graph, graphing data as given
class StackedGraph {
	// data as a map (i.e. {year : count, . . . })
	constructor(id, combined, label, val, title, xlabel, ylabel) {
		this.svg = d3.select("#" + id);
		let felonies = this.svg.append("g")
													.attr("class", "felonies");
		let violations = this.svg.append("g")
													.attr("class", "violations");
		let misdemeanors = this.svg.append("g")
													.attr("class", "misdemeanors");													

		// Stack two data objs
		function stack(a, b) {
			let result = new Array();
			for (let i in a) {
				if (Number.isInteger(parseInt(i))) {
					let curr = {};
					curr['LAW_CAT_CD'] = a[i]['LAW_CAT_CD'];
					curr['Hour'] = a[i]['Hour'];
					curr['count'] = parseInt(a[i]['count']) + parseInt(b[i]['count']);
					result.push(curr);
				}
			}
			return result;
		}

		let data1 = combined[0];
		let data2 = stack(combined[0], combined[2]);
		let data3 = stack(data2, combined[1]);

		let max = 0;
		for (let i in data3) {
			let curr = data3[i]['count'];
			if (data3[i]['count'] > max) {
				max = data3[i]['count'];
			}
		}
		
		// scales the width by proper amount
 		let width = 800 / data1.length;

 		// encodes index information for each bar
 		for (let i in data1) {
 			if (Number.isInteger(parseInt(i))) {
 				data1[i]["i"] = width * i;
	 			data2[i]["i"] = width * i;
	 			data3[i]["i"] = width * i;	
 			}
		}

 		let barPadding = 8;

 		

 		let xLabels = new Array();
 		data1.forEach(function(d) {
			d[val] = +d[val];
			xLabels.push(d[label]);
		});

		let x = d3.scaleBand()
			.domain(xLabels)
			.range([0, 800])
		
		let y = d3.scaleLinear()
            .domain([0, max])
            .range([400, 0]);
		

		felonies.selectAll("rect")
		    .data(data3)
		    .enter()
		    .append("rect")
		    .attr("fill", "yellow")
		    .attr("y", function(d) {
		        return 50 + y(d[val]);
		    })
		    .attr("height", function(d) {
		        return y(0) - y(d[val]);
		    })
		    .attr("width", width - barPadding)
		    .attr("transform", function (d, i) {
		         let translate = [width * i, 0];
		         return "translate("+ translate +")";
		    });

		violations.selectAll("rect")
		    .data(data2)
		    .enter()
		    .append("rect")
		    .attr("fill", "red")
		    .attr("y", function(d) {
		        return 50 + y(d[val]);
		    })
		    .attr("height", function(d) {
		        return y(0) - y(d[val]);
		    })
		    .attr("width", width - barPadding)
		    .attr("transform", function (d, i) {
		         let translate = [width * i, 0];
		         return "translate("+ translate +")";
		    });

		misdemeanors.selectAll("rect")
		    .data(data1)
		    .enter()
		    .append("rect")
		    .attr("fill", "orange")
		    .attr("y", function(d) {
		        return 50 + y(d[val]);
		    })
		    .attr("height", function(d) {
		        return y(0) - y(d[val]);
		    })
		    .attr("width", width - barPadding)
		    .attr("transform", function (d, i) {
		         let translate = [width * i, 0];
		         return "translate("+ translate +")";
		    });

    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisLeft().scale(y);

    // adds x-axis
    this.svg.append("g").attr("transform", "translate(0, 450)").call(xAxis);
    this.svg.append("g").attr("transform", "translate(0, 50)").call(yAxis);

    // title
    this.svg.append("text")
            .attr("x", 400)             
            .attr("y", 20)
            .attr("text-anchor", "middle")  
            .style("font-size", "28px") 
            .text(title);

		// x-axis label
		this.svg.append("text")
			.attr("x", 400)             
			.attr("y", 485)
			.attr("text-anchor", "middle")  
			.style("font-size", "18px") 
			.text(xlabel);


		// y-axis label
	  this.svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -85)
	      .attr("x", -250)
	      .style("font-size", "18px")
	      .style("text-anchor", "middle")
	      .text(ylabel); 


		// legend outline
		this.svg.append("rect")
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("fill", "none")
 		.attr("height", 80)
 		.attr("width", 150)
 		.attr("transform", "translate(65, 70)");

 		// felony legend
		this.svg.append("rect")
		.attr("fill", "red")
 		.attr("height", 10)
 		.attr("width", 20)
 		.attr("transform", "translate(75, 80)");

		this.svg.append("text")
		.attr("x", 100)
		.attr("y", 90)
		.style("font-size", "14px")
		.text("Felonies"); 

		// misdemeanor legend
		this.svg.append("rect")
		.attr("fill", "orange")
 		.attr("height", 10)
 		.attr("width", 20)
 		.attr("transform", "translate(75, 105)");

		this.svg.append("text")
		.attr("x", 100)
		.attr("y", 115)
		.style("font-size", "14px")
		.text("Misdemeanors"); 

		// violation legend
		this.svg.append("rect")
		.attr("fill", "yellow")
 		.attr("height", 10)
 		.attr("width", 20)
 		.attr("transform", "translate(75, 130)");

		this.svg.append("text")
		.attr("x", 100)
		.attr("y", 140)
		.style("font-size", "14px")
		.text("Violations"); 
	}
}

class RectangularHeatmap {
	constructor(id, data, xval, yval, val, xlabel, ylabel, title) {
		data.forEach(function(d) {
			d[val] = +d[val];
		});

		this.svg = d3.select("#" + id);

		let x_elements = Array.from(new Set(data.map(function(d) { return d[xval]; } )));
		let y_elements = Array.from(new Set(data.map(function(d) { return d[yval]; } )));

		let width = 800;
		let height = 450;
		let itemSize = Math.min(width / x_elements.length, height / y_elements.length);
		let cellSize = itemSize - 1;


		let x = d3.scaleBand()
		.domain(x_elements)
		.range([0, x_elements.length * itemSize]);

		let xAxis = d3.axisTop().scale(x);

		let y = d3.scaleBand()
		.domain(y_elements)
		.range([80, 80 + y_elements.length * itemSize])


		let yAxis = d3.axisLeft().scale(y);

		let scale = d3.scaleLinear().domain([0,  d3.max(data, function(d) { return d["count"]; })]).range(['white', 'red']);


   let cells = this.svg.selectAll('rect')
        .data(data)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('x', function(d) { return x(d[xval]); })
        .attr('y', function(d) { return y(d[yval]); })
        .attr('fill', function(d) { return scale(d["count"]); });

			
	    this.svg.append("g").attr("transform", "translate(0, 80)").call(xAxis);
	    // 	''  y-axis
	    this.svg.append("g").call(yAxis);


     let linearGradient = this.svg.append("defs")
	    .append("linearGradient")
	    .attr("id", "linear-gradient");
           

        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "white");

        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "red");

        this.svg.append("rect")
            .attr("x", 0)
            .attr("y", 350)
            .attr("width", width)
            .attr("height", 30)
            .style("stroke", "black")
            .style("stroke-width", 2)
            .style("fill", "url(#linear-gradient)"); 

	 // title
	    this.svg.append("text")
            .attr("x", 400)             
            .attr("y", 25)
            .attr("text-anchor", "middle")  
            .style("font-size", "28px") 
            .text(title);
	    		// x-axis label
		this.svg.append("text")
		.attr("x", 400)             
		.attr("y", 55)
		.attr("text-anchor", "middle")  
		.style("font-size", "18px") 
		.text(xlabel);

		this.svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -50)
		.attr("x", -80 - itemSize * y_elements.length / 2)
		.style("font-size", "18px")
		.style("text-anchor", "middle")
		.text(ylabel); 

		this.svg.append("text")
		.attr("x", 0)             
		.attr("y", 400)
		.attr("text-anchor", "middle")  
		.style("font-size", "18px") 
		.text(0);

		this.svg.append("text")
		.attr("x", width)             
		.attr("y", 400)
		.attr("text-anchor", "middle")  
		.style("font-size", "18px") 
		.text(d3.max(data, function(d) { return d["count"]; }));

		this.svg.append("text")
		.attr("x", -50)             
		.attr("y", 370)
		.attr("text-anchor", "middle")  
		.style("font-size", "14px") 
		.text("Color scale:");
	}
}

function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		main();
	}
}

whenDocumentLoaded(() => {
	// creates map
	d3.csv("data/years.csv").then(function (data) {
		const plot = new BarGraph("year_graph", data, "Year", "count", 
			"Number of Crimes per Year", "Year", "Number of Crimes Committed");
	});
	d3.csv("data/borough_counts.csv").then(function (data) {
		const plot = new BarGraph("boro_graph", data, "BORO_NM", "count", 
			"Number of Crimes per Borough, 2017", "Borough", "Number of Crimes Committed");
	});
	d3.csv("data/month_counts.csv").then(function (data) {
		const plot = new BarGraph("month_graph", data, "Month", "count", 
			"Number of Crimes per Month, 2006-2017", "Month", "Number of Crimes Committed");
	});
	d3.csv("data/misdemeanors_hour.csv").then(function (data1) {
		d3.csv("data/violations_hour.csv").then(function (data2) {
			d3.csv("data/felonies_hour.csv").then(function (data3) {
				combined = [data1, data2, data3];
				const plot = new StackedGraph("stack_graph", combined, "Hour of the Day", "count", 
					"Number of Crimes per Hour of Day, 2006-2017", "Hour of Day", "Number of Crimes Comitted");
			}); 
		});
	});
	d3.csv("data/crime_freqs.csv").then(function (data) {
		data.forEach(function(d) {
			if (d.category == "FELONY") {
				d["category"] = "red";
			} else if (d.category == "VIOLATION") {
				d["category"] = "yellow";
			} else { // misdemeanor
				d["category"] = "orange";
			}
		});
		const plot = new HorizBarGraph("freq_graph", data, "OFNS_DESC", "count", "Most Frequent Crimes Committed", 
			"Number of Crimes Committed", "", color="category");
	});
	d3.csv("data/crime_times.csv").then(function (data) {
		const plot = new RectangularHeatmap("heatmap", data, "Hour", "Day", "count", "Hour", "Day of the Week", "Hour and Day of the Week Crime Trends");
	});
});