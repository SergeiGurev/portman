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
          <span style="width:200px;">Serial</span>
          <span style="width:50px;">Number of ports</span>
        </div>
        %for row in gw:
        <form action="submit" method="post" class="row">
          <input type="hidden" value={{row[0]}} name="gw_id">
          <input type="text" value={{row[1]}} name="ip" style="width:150px;">
          <input type="text" value={{row[2]}} name="serial" style="width:200px;">
          <input type="text" value={{row[3]}} name="num_of_ports" style="width:50px;">
          <button type="submit">Submit</button>
        </form>
        %end
      </div>

      <div class="column column-right">
        <p>List of ports:</p>
        <div class="column-head">
          <span style="width:50px;">Prefix</span>
          <span style="width:50px;">Port on GW</span>
          <span style="width:150px;">Number</span>
          <span style="width:50px;">Enabled</span>
        </div>

        %for row in ports:
        <form action="submit_port" method="post" class="row">
          <input type="hidden" value={{row[3]}} name="gw_id">
          <input type="text" value={{row[0]}} pattern="[0-9]{1,3}" style="width:50px;" name="port_id">
          <input type="text" value={{row[4]}} pattern="[0-9]{1,3}" style="width:50px;" name="port_gw">
          <input type="text" value={{row[1]}} style="width:150px;" name="port_num">
          %if row[2]==1:
            <input type="checkbox" checked name="enabled" style="width:50px;">
          %elif row[2]==0:
            <input type="checkbox" name="enabled" style="width:50px;">
          %end
          <button type="button" value="Request_num" method="get" formaction="/num_req/{{row[0]}}">Request number</button>
          <button type="button" value="Request_bal">Request balance</button>
          <button type="submit">Submit changes</button>
        </form>
        %end
      </div>
    </div>

    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
