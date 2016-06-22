import d3 from 'd3';
import cloud from 'd3-cloud';
import { sample } from 'lodash';

var fill = d3.scale.category20();

function getRotation() {
  return sample([-45, 0, 45]);
}

export function create(words = [], options = {}) {
  var layout = cloud()
    .size([700, 700])
    .words(words)
    .padding(5)
    .rotate(getRotation)
    .font("Impact")
    .fontSize(d => {
      return Math.min(35, d.size) * 5;
    })
    .on("end", draw);

  layout.start();

  function draw(words) {
    const [x, y] = layout.size();
    d3.select("body").append("svg")
      .attr("width", x)
      .attr("height", y)
      .append("g")
      .attr("transform", "translate(" + x / 2 + "," + y / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", d => d.size + "px")
      .style("font-family", "Impact")
      .style("fill", (d, i) => fill(i))
      .attr("text-anchor", "middle")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text(d => d.text);
  }
}