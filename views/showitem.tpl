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

    <template id="port-template">
      <form action="submit_port" method="post" class="row">
        <input type="hidden" name="gw_id">
        <input type="text" pattern="[0-9]{1,3}" style="width:50px;" name="port_id">
        <input type="text" pattern="[0-9]{1,3}" style="width:50px;" name="port_gw">
        <input type="text" style="width:150px;" name="port_num">
        <input type="checkbox" checked name="enabled" style="width:50px;">
        <button type="button">Request number</button>
        <button type="button">Request balance</button>
        <button type="submit">Submit changes</button>
      </form>
    </template>

    <template id="gw-template">
      <form action="submit" method="post" class="row">
        <input type="hidden" name="gw_id">
        <input type="text" name="ip" style="width:150px;">
        <input type="text" name="serial" style="width:150px;">
        <input type="text" name="num_of_ports" style="width:50px;">
        <button type="button">Show ports</button>
        <button type="submit">Submit</button>
      </form>
    </template>

    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
