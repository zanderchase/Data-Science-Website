    var margin = {top: 19.5, right: 19.5, bottom: 29.5, left: 59.5};
    var width = 1060 - margin.right;
    var height = 550 - margin.top - margin.bottom;
    var padding = 30;

    // define the y scale  (vertical)
    var yScale = d3.scaleLinear()
      .domain([100, 0])    // values between 0 and 100
.range([height - padding, padding]);   // map these to the chart height, less padding.
             //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.

    var timeP = d3.timeParse("%d/%m/%Y")
    // define the x scale (horizontal)
    var mindat = timeP(1+'/'+1+'/'+2000);
    var maxdat = timeP(31+'/'+12+'/'+2000);

    var xScale = d3.scaleTime()
      .domain([mindat, maxdat])// values between for month of january
      .range([padding, width - padding * 2]);   // map these the the chart width = total width minus padding at both sides


    // define the y axis
    var yAxis = d3.axisLeft(yScale);


    // define the y axis
    var xAxis = d3.axisBottom(xScale)

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + 200 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // draw y axis with labels and move in from the size by the amount of padding
    svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate("+padding+",0)")
        .call(yAxis);



    // draw x axis with labels and move to the bottom of the chart area
    svg.append("g")
        .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    var yearlabel = svg.append("text")
      .attr("class", "yearlabel")
      .attr("x", 50)
      .attr("y", 0);

    yearlabel.text("Year: 2000")


    var timeline = svg.append("text")
      .attr("class", "timeline")
      .attr("x", 50)
      .attr("y", 530);

    timeline.text(' \xa0\xa0 '+'2000'+' \xa0\xa0\xa0 '+'2001'+' \xa0\xa0\xa0 '+'2002'+' \xa0\xa0\xa0 '+'2003'+' \xa0\xa0\xa0 '
    +'2004'+' \xa0\xa0\xa0 '+'2005'+' \xa0\xa0\xa0 '+'2006'+' \xa0\xa0\xa0 '+'2007'+' \xa0\xa0\xa0 '+'2008'+
    ' \xa0\xa0\xa0 '+'2009'+' \xa0\xa0\xa0 '+'2010'+' \xa0\xa0\xa0 '+'2011'+
    ' \xa0\xa0\xa0 '+'2012'+' \xa0\xa0\xa0 '+'2013'+' \xa0\xa0\xa0 '+'2014'+' \xa0\xa0\xa0 '+'2015'+' \xa0\xa0\xa0 ')


    var songlabel = svg.append("text")
      .attr("class", "songlabel")
      .attr("x", 300)
      .attr("y", 0);

    songlabel.text("One Hit Wonder:")

  var startxcord = -60
  var startycord = 30

  legend = svg.append("g")
    .attr("class","legend")
    .attr("transform","translate(startxcord,startycord)")
    .style("font-size","12px");

  legend.append('rect')
          .attr('x', startxcord)
          .attr('y', startycord)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', "pink")
          .style('stroke', "pink");
  legend.append('rect')
          .attr('x', startxcord)
          .attr('y', startycord+14)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', 'lightseagreen')
          .style('stroke', 'lightseagreen');
  legend.append('rect')
          .attr('x', startxcord)
          .attr('y', startycord+28)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', "gold")
          .style('stroke', "gold");
  legend.append('rect')
          .attr('x', startxcord)
          .attr('y', startycord+42)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', "lightblue")
          .style('stroke', "lightblue");
legend.append('rect')
          .attr('x', startxcord)
          .attr('y', startycord+56)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', "orange")
          .style('stroke', "orange");
legend.append('rect')
        .attr('x', startxcord)
        .attr('y', startycord+70)
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', "grey")
        .style('stroke', "grey");

legend.append('text')
        .attr('x', startxcord+20)
        .attr('y', startycord+10)
        .text('Pop')
legend.append('text')
        .attr('x', startxcord+20)
        .attr('y', startycord+24)
        .text('Rap')
legend.append('text')
        .attr('x', startxcord+20)
        .attr('y', startycord+38)
        .text('Rock')
legend.append('text')
        .attr('x', startxcord+20)
        .attr('y', startycord+52)
        .text('Country')
legend.append('text')
        .attr('x', startxcord+20)
        .attr('y', startycord+66)
        .text('Hip-hop')
legend.append('text')
        .attr('x', startxcord+20)
        .attr('y', startycord+80)
        .text('Other')

svg.append("text")
    .attr('x', -200)
    .attr('y', -30)
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Position On Chart");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height +10)
    .text("Month Of Year");




  drawlines(2000)

  function drawlines(target_year){

    //var mindate = timeP(1+'/'+1+'/'+target_year);
    //var maxdate = timeP(12+'/'+31+'/'+target_year);

    //xScale.domain([mindate, maxdate])


    d3.json("data.json", function(schedule) {
      console.log("here")
      console.log(schedule)
      console.log("after")
      console.log(schedule[0])
      var tick = 0;
      //function that will draw the path of the train
      var myline = d3.line()
        .x(function(d) {return xScale(d.xax);})
        .y(function(d) {return yScale(d.yax);});


      var allData = [];

      for(i=0; i<schedule.length; i++) {
        temparr = [];
        //create an array of dictionaries holding the trains x and y locations
        for(j=0; j<schedule[i][1].length; j++) {

          if(schedule[i][1][j][2] == target_year){
            //console.log(schedule[i][1][j][0])
            temparr.push({yax: schedule[i][1][j][1], xax: timeP(schedule[i][1][j][0]+'/'+2000)});
          }
        }
        var songname = schedule[i][0][0][0]
        var artist = schedule[i][0][0][1]
        var genre = schedule[i][0][0][2]

        var color = null;
        if (genre.toLowerCase() == 'pop') {
          color = "pink";
        }
        else if(genre.toLowerCase() == 'rap'){
          color = 'lightseagreen';
        }
        else if(genre.includes('hip')){
          color = "orange";
        }
        else if(genre.toLowerCase() == 'country') {
          color = "lightblue";
        }
        else if (genre.toLowerCase() == 'rock'){
          color = 'gold';
        }
        else{
          color = "lightgrey"
        }

        //draw the path of the trainline
        if(temparr.length > 10) {
          var train = svg.append("path")
            .attr("d", myline(temparr))
            .attr("transform", "translate(0, 0)")
            .attr("class", "trainline")
            .attr("stroke", color)
            .attr("text", songname)
            .attr("text2", artist)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .append("title").text(songname);
          }
      }

      var prev = null
      var prevcolor = null
      function mouseover() {
        if(prev != null) {
          prev.attr("stroke", prevcolor)

        }
        prevcolor = d3.select(this).attr("stroke");
        d3.select(this).attr("stroke", "black");
        songlabel.text("One Hit Wonder: "+d3.select(this).attr("text")+", by: "+d3.select(this).attr("text2"))

      }

      function mouseout() {
        prev = d3.select(this)
      }
    });
  }



  var box = timeline.node().getBBox();
  var overlay = svg.append("rect");

  overlay.attr("class", "overlay")
    .attr("x", box.x)
    .attr("y", box.y)
    .attr("width", box.width)
    .attr("height", box.height)
    .on("mouseover", enableInteraction);

  function enableInteraction() {
    // Create a year scale

    var yearscale = d3.scaleLinear()
      .domain([2000, 2016])
      .range([box.x, box.x + box.width])
      .clamp(true);

    // For the year overlay, add mouseover, mouseout, and mousemove events
    // that 1) toggle the active class on mouseover and out and 2)
    // change the displayed year on mousemove.
    overlay
        //.on("mouseover", mouseover)
        //.on("mouseout", mouseout)
        //.on("mousemove", mover)
        //.on("touchmove", mover)
        .on("click", mover);

    function mouseover() {
      yearlabel.addClass("active")
    }

    function mouseout() {
      yearlabel.removeClass("active")
    }

    //updated my dot, the year label and the voronoi
    function mover() {
      /*if(prev != null) {
        prev.attr("stroke", "grey")
        prev = null;
      }
      */
      var cur_year = Math.trunc(yearscale.invert(d3.mouse(this)[0]))
      yearlabel.text("Year: " + cur_year)
      d3.selectAll('path').remove()
      drawlines(cur_year);
      /*
      .data(interpolateData(yearscale.invert(d3.mouse(this)[0])), key).call(position).sort(order);
      myPoly.data(voronoi(interpolateData(yearscale.invert(d3.mouse(this)[0]))).polygons())
        .attr("d", function(d, i) {return "M" + d.join("L") + "Z";});

      myPoly.append("title").text(function(d) {return key(d.data);});
      yearlabel.text(Math.trunc(yearscale.invert(d3.mouse(this)[0])));
      */
      console.log("yoooooooOOO")
    }

  }




/*var timeP = d3.timeParse("%Hh%M")
var myformat = d3.timeFormat("%Hh%M");
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
var width = 760 - margin.right;
var height = 500 - margin.top - margin.bottom;

// Various scales
var xScale = d3.scaleTime().range([0, width+50]).domain([timeP("6h00"), timeP("23h00")]);
var yScale = d3.scaleLinear().range([0, height]).domain([]);

// The x & y axes
var xAxis1 = d3.axisBottom(xScale)
    .ticks(18)
    .tickFormat(myformat)

var xAxis2 = d3.axisTop(xScale)
    .ticks(18)
    .tickFormat(myformat)

var yAxis = d3.axisLeft(yScale);

// Create the SVG container and set the origin
var svg = d3.select("#chart")
    .on("mousemove", mover)
    .append("svg")
    .attr("width", width + 200 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//set up a vertical line that moves with mouse movement
var vline = svg.append("line")
  .attr("y1", 0)
  .attr("y2", height)
  .attr("x1", 50)
  .attr("x2", 50)
  .attr("class", "vertline")
  .on("mousemove", mover);

//moves the line apropriately within the specified bounds
  function mover() {
    var xloc = d3.mouse(this)[0] - 40
    if (xloc > 50 && xloc < (width + 100)) {
      vline.attr("x1", xloc)
      vline.attr("x2", xloc);
    }
  }


//////////////////////////////
// Step 2: Add x and y axes //
//////////////////////////////
svg.append("g")
  .attr("class", "yaxis axis")
  .attr("transform", "translate(50,0)")
  .call(yAxis);


svg.append("g")
  .attr("class", "xaxis axis")
  .attr("transform", "translate(50, "+height+")")
  .call(xAxis1);

svg.append("g")
  .attr("class", "txaxis axis")
  .attr("transform", "translate(50, 0)")
  .call(xAxis2);


//dictionary to store y locations of trainstops
var distDict = {}

d3.json("../data/distances.json", function(distances) {
  distDict = distances
  var citylist = Object.keys(distances);
  var myarr = []
  //make an array of dictionaries that hold the stop locations
  for(i=0; i<citylist.length; i++) {
    var hold = String(citylist[i]);
    myarr.push({name: hold, dis: distances[hold]});
  }

  //console.log(myarr);

  yAxis.ticks(citylist.length)

  //sets new y axis scale
  yScale.domain([d3.min(myarr, function(d) {return d.dis;}), d3.max(myarr, function(d) {return d.dis;})]);

  //sets up new trainstop
  var trainstop = svg.append("g")
    .attr("class", "trainstop")
    .selectAll("g")
    .data(myarr)
    .enter()
    .append("g")
    .attr("transform", function(d) {return "translate(0, "+ yScale(d.dis) +")";});

  //adds text specifying which trainstop
  trainstop.append("text")
    .attr("class", "text")
    .attr("font-size", ".65em")
    .attr("x", 45)
    .attr("dy", ".15em")
    .attr("text-anchor", "end")
    .text(function(d) {return d.name;});

  //inserts horizontal grid lines
  svg.selectAll(".hline")
    .data(myarr)
    .enter()
    .append("line")
    .attr("y1", function(d) {return d.dis;})
    .attr("y2", function(d) {return d.dis;})
    .attr("x1", 0)
    .attr("x2", width + 50)
    .attr("class", "gridline")
    .attr("transform", "translate(50,-2.5)");


});

d3.json("../data/schedule.json", function(schedule) {

  var tick = 0;

  //function that will draw the path of the train
  var myline = d3.line()
    .x(function(d) {return xScale(d.xax);})
    .y(function(d) {return yScale(d.nameYloc);});


  var allData = [];

  for(i=0; i<schedule.length; i++) {
    temparr = [];
    //create an array of dictionaries holding the trains x and y locations
    for(j=0; j<schedule[i].length; j++) {
      temparr.push({nameYloc: distDict[schedule[i][j][0]], xax: timeP(schedule[i][j][1])});
      temparr.push({nameYloc: distDict[schedule[i][j][0]], xax: timeP(schedule[i][j][2])});
    }

    //draw the path of the trainline
    var train = svg.append("path")
      .attr("d", myline(temparr))
      .attr("transform", "translate(50, 0)")
      .attr("class", "trainline")
      .attr("stroke", "black")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
  }

    //change color if line is hovered over
    function mouseover() {
      d3.select(this).attr("stroke", "red");
    }

    function mouseout() {
      d3.select(this).attr("stroke", "black")
    }




});
*/
