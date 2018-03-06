'use strict';

function ajax(address, data, cb) {
  var oReq = new XMLHttpRequest();
  oReq.onload = cb;
  oReq.open('post', address, true);
  oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  oReq.send(data);
}


var forms = document.querySelectorAll('form');

for (var i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', function(e) {
    e.preventDefault();
    var inputs = this.querySelectorAll('input[type="text"]');
    var checkbox = this.querySelector('input[type="checkbox"]');
    var values = {};
    if (checkbox) {
      values[checkbox.getAttribute('name')] = checkbox.checked;
    }
    for (var j = 0; j < inputs.length; j++) {
      values[inputs[j].getAttribute('name')] = inputs[j].value;
    }

    ajax('/test', JSON.stringify(values), cb);

    function cb() {
      console.log('sent:', JSON.stringify(values));
    }
  })
}
