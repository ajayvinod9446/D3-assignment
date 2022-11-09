// initial ploting
    newploting();
// start D3 script

function newploting(x){
    data ="http://34.78.46.186/Circles/Towns/"+x;
d3.json(data, function(error, data) {
    if(error)throw error;
var overlay = new google.maps.OverlayView();

overlay.onAdd = function() {
var layer = d3.select(this.getPanes().overlayLayer).append("div")
    .attr("class", "towns");

overlay.draw = function() {
  var projection = this.getProjection(),
      padding = 10;

  var marker = layer.selectAll("svg")
      .data(data)
      .each(transform) 
    .enter().append("svg")
      .each(transform)
      .attr("class", "marker");


  marker.append("circle")
      .attr("class","circle")
      .attr("r", function(d){return d.Population/50000*3})
      .attr("cx", padding)
      .attr("cy", padding);

  marker.append("text")
      .attr("class","Town")
      .attr("x", padding + 7)
      .attr("y", padding)
      .attr("dy", ".31em")
      .text(function(d) { return d.Town; });

  function transform(d) {
    d = new google.maps.LatLng(d.lat, d.lng);
    d = projection.fromLatLngToDivPixel(d);
    return d3.select(this)
        .style("left", (d.x - padding) + "px")
        .style("top", (d.y - padding) + "px");  
  }
};
};

overlay.setMap(map);    
});
}

function plotingOnClick()
{
    var x = 10;
    d3.selectAll('.circle').remove();
    d3.selectAll('.Town').remove();
    newploting(x);
}

function sliderValue(x)
{
    d3.selectAll('.circle').remove();
    d3.selectAll('.Town').remove();
    newploting(x);
}
