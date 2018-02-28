import MySQLdb
import requests
import shutil
import json

from bottle import route, run, template, debug, post, request, static_file

@route('/<filename:path>')
def send_static(filename):
    return static_file(filename, root='views/')

@route('/')
def show():
    db = MySQLdb.connect("localhost","asterisk","","asterisk")
    cursor_ports = db.cursor()
    cursor_ports.execute('SELECT Port,number,DateDisabled IS NULL,gw_id,port_on_gw From ports')
    rows_ports = cursor_ports.fetchall()

    cursor_gw = db.cursor()
    cursor_gw.execute('SELECT id,ipaddress,serial,portnum From gateways where id in (Select gw_id from ports)')
    rows_gw = cursor_gw.fetchall()
    return template('showitem', ports=rows_ports, gw=rows_gw)
    #return HTTPError(404, "Page not found")
    db.close()

#@route('/num_req/<port>')
#def num_req(port):

@route('/submit_port', method='POST')
def submit_port():
    port = request.forms.get("port_id")
    gw = request.forms.get("port_gw")
    number = request.forms.get("port_num")
    enabled = request.forms.get("enabled") == "on"
    query_sent = "no"

    db = MySQLdb.connect("localhost","asterisk","","asterisk")
    cursor = db.cursor()
    cursor.execute('SELECT number,DateDisabled IS NULL,gw_id,port_on_gw From ports where port = %s',(port,))
    result = cursor.fetchone()
    if result[0] != number:
      cursor.execute('UPDATE ports set number = %s where port = %s',(number,port))
      db.commit()

    if result[1] != enabled:
      if enabled == 0:
        cursor.execute('UPDATE ports set DateDisabled = NOW where port = %s',(port))
        db.commit()

      else:
        cursor.execute('UPDATE ports set DateDisabled = NULL where port = %s',(port))
        db.commit()

    db.close()
    return "OK"

@route('/gw_list')
def gw_list():
    db = MySQLdb.connect("localhost","asterisk","","asterisk")
    cursor = db.cursor()
    cursor.execute('SELECT id,ipaddress,serial,portnum From gateways where id in (Select gw_id from ports)')
    result = cursor.fetchall()
    db.close()
    return json.dumps(result)

@route('/port_list')
def port_list():
    db = MySQLdb.connect("localhost","asterisk","","asterisk")
    cursor = db.cursor()
    cursor.execute('SELECT Port,number,DateDisabled IS NULL,gw_id,port_on_gw From ports')
    result = cursor.fetchall()
    db.close()
    return json.dumps(result)

debug(True)
run(port=6880, debug=True, reloader=True)
