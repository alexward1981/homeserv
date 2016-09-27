// Json loader
var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};


// get data from HUE Api
var hue = (function() {
  var apiurl = 'http://mediaserve.boxtools.pw:5500/api',
      apikey = 'SOX1dFLtPEJJstJtLeDppZit4JEA43FIu8mieKZv',
      container = $('.hue'),
      lightList = $('<ul />');

  getJSON(apiurl+'/'+apikey+'/lights').then(function(data) {
    $.each(data, function(key, value) {
      console.log(value);
      var state;
      if(!value.state.on) {
        state = 'off'
      } else {
        state = value.state.bri;
      }
      $('<li><strong>'+value.name+'</strong> is <strong>'+state+'</strong></li>').appendTo(lightList)
    });
    container.find('div').remove();
    lightList.appendTo(container);
}, function(status) { //error detection....
  alert('Something went wrong.');
});
})();
