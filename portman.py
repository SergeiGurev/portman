import MySQLdb
import requests
import shutil
import json
import random

from bottle import route, run, template, debug, post, request, static_file

global dbhost,dbname,dbuser,dbpass
dbhost='localhost'
dbname='asterisk'
dbuser='asterisk'
dbpass=''

@route('/<filename:path>')
def send_static(filename):
    return static_file(filename, root='views/')

@route('/')
def show():

    db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
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

@route('/set_port', method='POST')
def set_port():
    data = request.json
    port = data.get("port_id")
    gw = data.get("port_on_gw")
    number = data.get("port_num")
    enabled = data.get("enabled")
    query_sent = "no"
    print(number)
    db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
    cursor = db.cursor()
    cursor.execute('SELECT number,DateDisabled IS NULL From ports where port = %s',(port,))
    result = cursor.fetchone()

    if number != None:
      if result[0] != number:
        cursor.execute('UPDATE ports set number = %s where port = %s',(number,port))
        db.commit()

    if enabled != None:
      if result[1] != enabled:
        if enabled == 0:
          cursor.execute('UPDATE ports set DateDisabled = NOW() where port = %s',(port))
          db.commit()
        else:
          cursor.execute('UPDATE ports set DateDisabled = NULL where port = %s',(port))
          db.commit()

    db.close()
    return "OK"

@route('/gw_list')
def gw_list():
    db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
    cursor = db.cursor()
    cursor.execute('SELECT id,ipaddress,serial,portnum From gateways where id in (Select gw_id from ports)')
    result = cursor.fetchall()
    db.close()
    return json.dumps(result)

@route('/port_list')
def port_list():
    db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
    cursor = db.cursor()
    cursor.execute('SELECT Port,number,DateDisabled IS NULL,gw_id,port_on_gw From ports')
    result = cursor.fetchall()
    db.close()
    return json.dumps(result)

@route('/set_gw', method='POST')
def test_subm():
  data = request.json
  gw_id=data.get('gw_id')
  serial=data.get('serial')
  num_of_ports=data.get('portnum')
  ip=data.get('ipaddress')

  db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
  cursor = db.cursor()

  if gw_id == 0:
    cursor.execute('INSERT into gateways(ipaddress,portnum,serial) values(%s,%s,%s)',(ip,num_of_ports,serial))
  else:
    cursor.execute('UPDATE gateways set ipaddress = %s, portnum = %s, serial = %s where id=%s',(ip,num_of_ports,serial,gw_id))

  db.commit()
  db.close()

#@route('/set_port', method='POST')
#def set_port():
#  data = request.json
#  gw_id=data.get('gw_id')
#  port=data.get('port_id')
#  port_on_gw=data.get('port_gw')
#  number=data.get('port_num')
#  enabled=data.get('enabled')
#
#  db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
#  cursor = db.cursor()
#
#  cursor.execute('UPDATE ports set number = %s,IF(%s=1,DateDisabled = NULL, DateDisabled = NOW())',(number,enabled))
#
#  db.commit()
#  db.close()

@route('/get_gw', method='POST')
def get_gw():
    db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT id,ipaddress,serial,portnum From gateways')
    result = cursor.fetchall()
    db.close()
    return json.dumps(result)


@route('/get_port', method='POST')
def get_port():
    data = request.json
    gw_id = data.get('gw_id')
    db = MySQLdb.connect(dbhost,dbname,dbpass,dbuser)
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    if gw_id == 0:
      cursor.execute('SELECT port,number,DateDisabled IS NULL as enabled,gw_id,port_on_gw From ports')
    else:
      cursor.execute('SELECT port,number,DateDisabled IS NULL as enabled,gw_id,port_on_gw From ports where gw_id = %s',(gw_id))
    result = cursor.fetchall()
    db.close()

    return json.dumps(result)

@route('/get_num', method='POST')
def get_num():
    data = request.json
    port = data.get('port')

    return str(port) + '<-port' + str(random.randrange(100000,999999,2))

debug(True)
run(port=6880, debug=True, reloader=True)
