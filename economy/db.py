#!/usr/bin/env python
# coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import pymysql as mysql

#conn = mysql.connect(host="0.0.0.0",user="root",password="root",db="db",charset='utf8')
conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
conn.autocommit(True)
cur = conn.cursor()

def get(table1,table2,table3,table4,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql1 = "select el.id,el.entity_name,el.entity_type,el.location,pd.operation_mode from %s as el inner join %s as pd on el.id=pd.entity_id and pd.date='2017-11-27'" % (table1,table2)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = "select el.id,el.entity_name,el.entity_type,el.location,cd.operation_mode from %s as el inner join %s as cd on el.id=cd.entity_id and cd.date='2017-11-27'" % (table1,table3)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = "select el.id,el.entity_name,el.entity_type,el.location,p.operation_mode from %s as el inner join %s as p on el.id=p.entity_id and p.date='2017-11-27'" % (table1,table4)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	if res:
		data = [{k:row[i] for i,k in enumerate(field)} for row in res]
		result = {'status':1,'data':data}
	else:
		result = {'status':0,'data':'null'}
	return result

def get_platform(table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select id,entity_name from %s where entity_type=1" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_company(table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select id,entity_name from %s where entity_type=2" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_project(table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select id,entity_name from %s where entity_type=3" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data


def platform_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and pd.date='2017-11-27'" % (table1,table2,table3,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def company_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and cd.date='2017-11-27'" % (table1,table2,table3,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def project_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and p.date='2017-11-27'" % (table1,table2,table3,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data


def get_ad(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date='2017-11-27'" % (table,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_comment(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date='2017-11-27'" % (table,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_gongshang(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date='2017-11-27'" % (table,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_guarantee(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date='2017-11-27'" % (table,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_return_rate(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date='2017-11-27'" % (table,id)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data













