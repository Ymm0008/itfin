#!/usr/bin/env python
# coding:utf-8

import pymysql as mysql

conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
#conn = mysql.connect(host="0.0.0.0",user="root",password="root",db="db",charset='utf8')
conn.autocommit(True)
cur = conn.cursor()

def get(table,field):
	sql = "select * from %s" % table
	cur.execute(sql)
	res = cur.fetchall()
	if res:
		data = [{k:row[i] for i,k in enumerate(field)} for row in res]
		result = {'status':1,'data':data}
	else:
		result = {'status':0,'data':'null'}
	return result 

def get_platform(table):
	sql = "select entity_name from %s where entity_type=1" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [row[0] for row in res]
	return data

def get_company(table):
	sql = "select entity_name from %s where entity_type=2" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [row[0] for row in res]
	return data

def get_project(table):
	sql = "select entity_name from %s where entity_type=3" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [row[0] for row in res]
	return data


def platform_detail(table,field):
	sql = "select * from %s" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def company_detail(table,field):
	sql = "select * from %s" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def project_detail(table,field):
	sql = "select * from %s" % table
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data




	




