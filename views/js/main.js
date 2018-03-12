'use strict';

function ajax(address, data, cb) {
  var oReq = new XMLHttpRequest();
  oReq.onload = loadHendler;
  oReq.open('post', address, true);
  oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  oReq.send(data);

  function loadHendler() {

    if (cb) cb(JSON.parse(oReq.responseText));
  }
}


// var forms = document.querySelectorAll('form');
//
// for (var i = 0; i < forms.length; i++) {
//   forms[i].addEventListener('submit', function(e) {
//     e.preventDefault();
//     var inputs = this.querySelectorAll('input[type="text"]');
//     var checkbox = this.querySelector('input[type="checkbox"]');
//     var values = {};
//     if (checkbox) {
//       values[checkbox.getAttribute('name')] = checkbox.checked;
//     }
//     for (var j = 0; j < inputs.length; j++) {
//       values[inputs[j].getAttribute('name')] = inputs[j].value;
//     }
//
//     ajax('/set_gw', JSON.stringify(values), cb);
//
//     function cb() {
//       console.log('sent:', JSON.stringify(values));
//     }
//   })
// }

function renderGW(data) {
  if (!data) return;

  var fragment = document.createDocumentFragment();
  var gwTemplate = document.querySelector('#gw-template').content;
  var gwCont = document.querySelector('.gateways')

  data.forEach(function(it) {
    var gwElement = gwTemplate.cloneNode(true);
    gwElement.querySelector('input[name="gw_id"]').value = it['id'];
    gwElement.querySelector('input[name="ip"]').value = it['ipaddress'];
    gwElement.querySelector('input[name="serial"]').value = it['serial'];
    gwElement.querySelector('input[name="num_of_ports"]').value = it['portnum'];
    fragment.appendChild(gwElement);
  })

  gwCont.innerHTML = '';
  gwCont.appendChild(fragment);
}

ajax('/get_gw', null, renderGW);
