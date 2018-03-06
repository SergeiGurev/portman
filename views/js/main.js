'use strict';

function cb() {
  console.log('sent');
}

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
    var inputs = this.querySelectorAll('input');
    var values = {};
    for (var j = 0; j < inputs.length; j++) {
      values[inputs[j].getAttribute('name')] = inputs[j].value;
    }

    console.log(JSON.stringify(values));
    ajax('/test', JSON.stringify(values), cb);
  })
}
