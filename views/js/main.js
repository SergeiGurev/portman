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

    if (cb) cb(oReq.responseText);
  }
}

function renderGW(data) {
  if (!data) return;
  data = JSON.parse(data);

  var fragment = document.createDocumentFragment();
  var gwTemplate = document.querySelector('#gw-template').content;
  var gwCont = document.querySelector('.gateways')

  data.forEach(function(it) {
    var gwElement = gwTemplate.cloneNode(true);
    gwElement.querySelector('.gw__id').value = it['id'];
    gwElement.querySelector('.gw__ipaddr').value = it['ipaddress'];
    gwElement.querySelector('.gw__serial').value = it['serial'];
    gwElement.querySelector('.gw__port-num').value = it['portnum'];
    gwElement.querySelector('.gw__show-ports-btn').addEventListener('click', function() {
      var req = {};
      req['gw_id'] = it['id'] + '';
      ajax('/get_port', JSON.stringify(req), renderPorts);
      var rows = document.querySelectorAll('.gw');
      for (var i = 0; i < rows.length; i++) {
        rows[i].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    })
    gwElement.querySelector('.gw__submit-btn').addEventListener('click', function(e) {
      e.preventDefault();
      setChanges(this.parentNode, '/set_gw');
    })
    fragment.appendChild(gwElement);
  })

  gwCont.innerHTML = '';
  gwCont.appendChild(fragment);
}

function renderPorts(data) {
  if (!data) return;
  data = JSON.parse(data);

  var fragment = document.createDocumentFragment();
  var portTemplate = document.querySelector('#port-template').content;
  var portsCont = document.querySelector('.ports')

  data.forEach(function(it) {
    var portElement = portTemplate.cloneNode(true);
    portElement.querySelector('.port__gw-id').value = it['gw_id'];
    portElement.querySelector('.port__id').value = it['port'];
    portElement.querySelector('.port__on-gw').value = it['port_on_gw'];
    portElement.querySelector('.port__num').value = it['number'];
    portElement.querySelector('.port__on-off').checked = (it['enabled'] === 1);
    portElement.querySelector('.port__submit-btn').addEventListener('click', function(e) {
      e.preventDefault();
      setChanges(this.parentNode, '/set_port');
    })
    portElement.querySelector('.port__req-num-btn').addEventListener('click', function() {
      setPortNum(this.parentNode);
    })
    fragment.appendChild(portElement);
  })

  portsCont.innerHTML = '';
  portsCont.appendChild(fragment);
}

function setChanges(elem, address) {
  var data = {},
      inputs = elem.querySelectorAll('.ch-input');

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute('type') === 'checkbox') {
      data[inputs[i].getAttribute('name')] = inputs[i].checked;
    } else {
      data[inputs[i].getAttribute('name')] = inputs[i].value;
    }
  }

  ajax(address, JSON.stringify(data));
}

function setPortNum(elem) {
  var portID = elem.querySelector('.port__id'),
      req = {},
      setNum = function(data) {
        elem.querySelector('.port__num').value = data;
      };

  req[portID.getAttribute('name')] = portID.value;
  ajax('/get_num', JSON.stringify(req), setNum);
}
