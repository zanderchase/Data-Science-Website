

/////////////////////////////////////
// Step 1: Write accessor functions //
//////////////////////////////////////

// Accessor functions for the four dimensions of our data
// For each of these, assume that d looks like the following:
// {"name": string, "income": number, "lifeExpectancy": number,
//  "population": number, "region": string}
function x(d) {
    // Return nation's 
    return d.lasting
}
function y(d) {
    // Return nation's lifeExpectancy
    return d.peak
}
function radius(d) {
    // Return nation's population
    return d.numSongs
}
function color(d) {
    // Return nation's region
    return d.color
}
function key(d) {
    // Return nation's name
    return d.name
}

//////////////
// Provided //
//////////////

// Chart dimensions
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
var width = 960 - margin.right;
var height = 500 - margin.top - margin.bottom;

// Various scales
var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
    yScale = d3.scaleLinear().domain([80, 0]).range([height, 0]),
    radiusScale = d3.scaleLinear().domain([0, 60]).range([0, 200]),
    colorScale = d3.scaleOrdinal(["red", "green", "blue", "orange", "yellow", "violet", "brown"]);

// The x & y axes
var xAxis = d3.axisBottom(xScale).ticks(10, d3.format(",d")),
    yAxis = d3.axisLeft(yScale);

// Create the SVG container and set the origin
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//////////////////////////////
// Step 2: Add x and y axes //
//////////////////////////////
svg.append("g").attr("class", "axis").attr("transform", "translate(0, "+height+")").call(xAxis);
svg.append("g").attr("class","axis").call(yAxis);
//////////////////////////////////////
// Step 3: Add axis and year labels //
//////////////////////////////////////
svg.append("text").attr("transform","rotate(-90)")
.attr("x", 0 - height/2.5).attr("y", 0 + height/20).text("Average Peak Position").style("font","20px Times New Roman");

svg.append("text").attr("x", width - 230).attr("y",height - 10).text("Average Lasting Time (weeks)").style("font","20px Times New Roman");
svg.append("text").attr("x",width/8).attr("y", 0).text("Average Lasting Time vs. Average Peak Position vs. Number Songs in Genre").style("font", "20px Times New Roman").style("text-decoration", "underline");

var year_text = svg.append("text").attr("x", 800).attr("y", 400).attr("text-anchor", "middle")
                          .text("2000").style("font", "100px Times New Roman");




///////////////////////////
// Step 4: Load the data //
///////////////////////////

// Load the data.
d3.json("hits.json", function(hits) {

  /////////////////////////////////////////
  // Functions provided for your utility //
  /////////////////////////////////////////

  // A bisector since many nation's data is sparsely-defined.
  // We provide this to make it easier to linearly interpolate between years.
  var bisect = d3.bisector(function(d) { return d[0]; });

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return hits.map(function(d) {
      return {
        name: d.name,
        color: d.color,
        lasting: interpolateValues(d.lasting, year),
        numSongs: interpolateValues(d.numSongs, year),
        peak: interpolateValues(d.peak, year)
      };
    });
  }

  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }

  ///////////////////////
  // Step 4: Plot dots //
  ///////////////////////

  // Add a dot per nation. Initialize the data at 2000, and set the colors.
  var dot = svg.append("g").selectAll(".dot").data(interpolateData(2010)).enter()
            .append("circle").attr("class","dot")
            .style("fill", function(d){return colorScale(color(d));}).call(position).sort(order);

  
  // Add voronoi and join the lines to the dot
  var voronoi_object = d3.voronoi().x(function(p){return xScale(x(p))}).y(function(p){return yScale(y(p))})
                               .extent([[0,0],[width,height]]);


  var voronoi_lines = svg.selectAll("path").data(voronoi_object(interpolateData(year_text.text)).polygons())
                        .enter().append("path")
                        .attr("d", function(d,i) {return "M" + d.join("L") + "Z";})
                        .datum(function(d,i){return d.point})
                        .style("pointer-events","all")
                        .style("stroke", "black")
                        .style("fill", "none")
                        .style("opacity", "0");

var ordinal = d3.scaleOrdinal()
  .domain(["rock", "pop", "rap", "hip-hop", "country", "other"])
  .range([ "red", "yellow", "green", "blue", "orange", "violet"]);

svg = d3.select("svg");

svg.append("g")
  .attr("class", "legendOrdinal")
  .attr("transform", "translate(800,20)");

var legendOrdinal = d3.legendColor()
  //d3 symbol creates a path-string, for example
  //"M0,-8.059274488676564L9.306048591020996,
  //8.059274488676564 -9.306048591020996,8.059274488676564Z"
  .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
  .shapePadding(10)
  .scale(ordinal);

svg.select(".legendOrdinal")
  .call(legendOrdinal);

  ///////////////////////////////////
  // Step 5: Add fluff and overlay //
  ///////////////////////////////////

  // Add a title.
  dot.append("title").text(function(d){return key(d);});

  // Add an overlay for the year label.
  var box = year_text.node().getBBox();

  var overlay = svg.append("rect").attr("class", "overlay")
                          .attr("x",box.x).attr("y",box.y).attr("width", box.width)
                          .attr("height", box.height)
                          .on("mouseover",enableInteraction);

  ////////////////////////
  // Step 6: Transition //
  ////////////////////////

  // Start a transition that interpolates the data based on year.
  svg.transition()
      .duration(30000)
      .ease(d3.easeLinear)
      .tween("year", tweenYear)
      .on("end", enableInteraction);

  // Positions the dots based on data.
  function position(dot) {
    dot .attr("cx", function(d) { return xScale(x(d)); })
        .attr("cy", function(d) { return yScale(y(d)); })
        .attr("r", function(d) { return radiusScale(radius(d)); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }

  // After the transition finishes, you can mouseover to change the year.
  function enableInteraction() {

    // Create a year scale
    var year_scale= d3.scaleLinear().domain([2000,2015]).range([box.x,box.x + box.width]).clamp(true);
    // Cancel the current transition, if any.
    svg.transition().duration(0);

    // For the year overlay, add mouseover, mouseout, and mousemove events
    // that 1) toggle the active class on mouseover and out and 2)
    // change the displayed year on mousemove.

    overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

    function mouseover() {
      // turn on the label
      year_text.classed("active",true);
    }

    function mouseout() {
      // turn off the label
      year_text.classed("active",false);

    }

    function mousemove() {

      // Extract the x value for the mouse, since we want to scale this value
      var mouse_x = d3.mouse(this)[0];

      //Alter the vornoi and dot data and year label to reflect the current year
      dot.data(interpolateData(year_scale.invert(mouse_x)),key).call(position).sort(order);
      voronoi_lines.data(voronoi_object(interpolateData(year_scale.invert(mouse_x))).polygons())
           .attr("d", function(d,i) {return "M" + d.join("L") + "Z";});
      year_text.text(Math.round(year_scale.invert(mouse_x)));
    }
  }

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenYear() {
    var year = d3.interpolateNumber(2000, 2015);
    return function(t) {

      dot.data(interpolateData(year(t)),key).call(position).sort(order);
      year_text.text(Math.round(year(t)));

      voronoi_lines.data(voronoi_object(interpolateData(year(t))).polygons())
      .attr("d", function(d,i) {return "M" + d.join("L") + "Z";});

      voronoi_lines.append("title").text(function(d){return key(d.data)})
     };
  }
});

