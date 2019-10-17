'using strict';
var chartPackage;


var renderResults = function(){
  var children = [];
  var result = persistenceManager.getData('beer');
  var target = document.getElementById('results');
  children.push(document.createElement('img'));
  children[0].src = `../${result.imgPath}`;
  children.push(document.createElement('p'));
  children[1].id = 'brand';
  children[1].innerHTML = result.brand;
  children.push(document.createElement('p'));
  children[2].id = 'name';
  children[2].innerHTML = result.name;
  children.push(document.createElement('p'));
  children[3].id = 'desc';
  children[3].innerHTML = result.description;
  children.forEach(child => { target.appendChild(child); });
};


//
//  CHART
//
//
//
var getDataSet = function(){
  var data = [];
  chartPackage.forEach(datum => {
    data.push(datum[1]);
  });
  return data;
};

var getLabels = function(){
  var labels = [];
  chartPackage.forEach(label => {
    labels.push(label[0]);
  });
  return labels;
};



var createDataSet = function(){
  var params = {
    type: 'doughnut',
    data: {
      labels: getLabels(),
      datasets:[{
        label: 'Previous Suggestions',
        data: getDataSet(),
        backgroundColor: [
          'rgba(243, 152, 0, 1)',
          'rgba(199, 124, 0, 1)',
          'rgba(0, 128, 100, 1)',
          'rgba(79, 57, 2, 1)',
          'rgba(45, 33, 3, 1)',
          'rgba(120, 46, 0, 1)',
          'rgba(222, 85, 0, 1)',
          'rgba(0, 207, 161, 1)',
          'rgba(46, 38, 97, 1)'       
        ],
      }]
    },
    options: {
      legend: {
        labels: {
          fontSize: 20,
        }
      }
    }
  };


  return params;

};



var createChart = function(){
  var canvas = document.createElement('canvas');  
  var chart = new Chart(canvas, createDataSet());
  var target = document.getElementById('results');
  target.appendChild(canvas);
};




!function(){
  beers = persistenceManager.getData('beers');
  chartPackage = new ResultsHistory(beers).packageForChart();
 

  renderResults();
  createChart();
}();
