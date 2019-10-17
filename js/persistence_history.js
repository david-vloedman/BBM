// ************************************************************************
//
// Results History
//
// ************************************************************************


function ResultsHistory(beers){
  this.historyData = persistenceManager.getHistoric();
  if(this.historyData === null) this.fabricateHistory(beers);

}

ResultsHistory.prototype.addBeer = function(beer){
  this.historyData.push(beer);
};

ResultsHistory.prototype.fabricateHistory = function(beers){
  var randomIndices = [];
  for(var i = 0; i < beers.length; i++){
    randomIndices.push(Math.floor(Math.random() * beers.length));
  }

  var history = [];
  console.log('index', randomIndices);
  randomIndices.forEach(index => {
    history.push(beers[index]);
  });
  this.historyData = history;
  persistenceManager.storeHistoric(this.historyData);
};
// ************************************************************************
//  The package for chart function puts the history in data set
//  more suitable for Chart.js. It returns a 2-dimensional array.
//  At each index of the outer array contains the beer name and how many times
//  It's been suggested
// ************************************************************************
ResultsHistory.prototype.packageForChart = function(){
  var data = [];
  beers.forEach(beer => {
    data.push([beer.name,0]);
  });

  this.historyData.forEach(beer => {
    data.forEach(datum =>{
      if(beer.name === datum[0]) datum[1]++;
    });
  });
  return data;
};

// ************************************************************************
//
// persistenceManager
//
// ************************************************************************

var persistenceManager = {

  // pass in user object to be saved
  saveData: function(data, key){
    var toStore = JSON.stringify(data);
    localStorage.setItem(key, toStore);
  },

  // returns a stored user
  getData: function(key){
    return JSON.parse(localStorage.getItem(key));
  },


  // pass in a history object to be saved
  storeHistoric: function(historicData){
    var toStore = JSON.stringify(historicData);
    localStorage.setItem('history', toStore);
  },
  // retrieve history from local storage
  getHistoric: function(){
    return JSON.parse(localStorage.getItem('history'));
  }
};
