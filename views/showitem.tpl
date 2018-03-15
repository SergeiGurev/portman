<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
  </head>

  <body>
    <div class="wrapper">
      <div class="column column-left">
        <p>List of gateways:</p>
        <div class="column-head">
          <span style="width:150px;">IP</span>
          <span style="width:150px;">Serial</span>
          <span style="width:50px;">Number of ports</span>
        </div>
        <div class="gateways"></div>
      </div>

      <div class="column column-right">
        <p>List of ports:</p>
        <div class="column-head">
          <span style="width:50px;">Prefix</span>
          <span style="width:50px;">Port on GW</span>
          <span style="width:150px;">Number</span>
          <span style="width:50px;">Enabled</span>
        </div>
        <div class="ports"></div>
      </div>
    </div>

    <template id="gw-template">
      <form action="submit" method="post" class="row gw">
        <input type="hidden" name="gw_id" class="gw__id ch-input">
        <input type="text" name="ipaddress" style="width:150px;" class="gw__ipaddr ch-input">
        <input type="text" name="serial" style="width:150px;" class="gw__serial ch-input">
        <input type="text" name="portnum" style="width:50px;" class="gw__port-num ch-input">
        <button type="button" class="gw__show-ports-btn">Show ports</button>
        <button type="submit" class="gw__submit-btn">Submit</button>
      </form>
    </template>

    <template id="port-template">
      <form action="submit_port" method="post" class="row port">
        <input type="hidden" name="gw_id" class="port__gw-id ch-input">
        <input type="text" pattern="[0-9]{1,3}" style="width:50px;" name="port_id" class="port__id ch-input">
        <input type="text" pattern="[0-9]{1,3}" style="width:50px;" name="port_gw" class="port__on-gw ch-input">
        <input type="text" style="width:150px;" name="port_num" class="port__num ch-input">
        <input type="checkbox" name="enabled" style="width:50px;" class="port__on-off ch-input">
        <button type="button">Request number</button>
        <button type="button">Request balance</button>
        <button type="submit" class="port__submit-btn">Submit changes</button>
      </form>
    </template>

    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
