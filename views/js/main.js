'use strict';

ajax('/get_gw', null, renderGW, false);

function ajax(address, data, cb, asinc) {
  var oReq = new XMLHttpRequest();
  oReq.onload = loadHendler;
  oReq.open('post', address, asinc);
  oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  oReq.send(data);

  function loadHendler() {
    // console.log(oReq.responseText);

    if (cb) cb(JSON.parse(oReq.responseText));
  }
}

function renderGW(data) {
  if (!data) return;

  var fragment = document.createDocumentFragment();
  var gwTemplate = document.querySelector('#gw-template').content;
  var gwCont = document.querySelector('.gateways')

  data.forEach(function(it) {
    var gwElement = gwTemplate.cloneNode(true);
    gwElement.querySelector('input[name="gw_id"]').value = it['id'];
    gwElement.querySelector('input[name="ipaddress"]').value = it['ipaddress'];
    gwElement.querySelector('input[name="serial"]').value = it['serial'];
    gwElement.querySelector('input[name="portnum"]').value = it['portnum'];
    gwElement.querySelector('.show-ports-btn').addEventListener('click', function() {
      var req = {};
      req['gw_id'] = it['id'] + '';
      ajax('/get_port', JSON.stringify(req), renderPorts);
      var rows = document.querySelectorAll('.gw');
      for (var i = 0; i < rows.length; i++) {
        rows[i].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    })
    fragment.appendChild(gwElement);
  })

  gwCont.innerHTML = '';
  gwCont.appendChild(fragment);
}

function renderPorts(data) {
  if (!data) return;

  var fragment = document.createDocumentFragment();
  var portTemplate = document.querySelector('#port-template').content;
  var portsCont = document.querySelector('.ports')

  data.forEach(function(it) {
    var portElement = portTemplate.cloneNode(true);
    portElement.querySelector('input[name="gw_id"]').value = it['gw_id'];
    portElement.querySelector('input[name="port"]').value = it['port'];
    portElement.querySelector('input[name="port_on_gw"]').value = it['port_on_gw'];
    portElement.querySelector('input[name="number"]').value = it['number'];
    portElement.querySelector('input[name="enabled"]').checked = (it['enabled'] === 1);
    fragment.appendChild(portElement);
  })

  portsCont.innerHTML = '';
  portsCont.appendChild(fragment);
}
