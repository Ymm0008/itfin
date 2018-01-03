#!/usr/bin/env python
# coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from datetime import datetime,timedelta
import pymysql as mysql

#conn = mysql.connect(host="0.0.0.0",user="root",password="root",db="db",charset='utf8')
conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
conn.autocommit(True)
cur = conn.cursor()


#实体画像
def get(table1,table2,table3,table4,table5,field):
	#table1: entity_list	 table2: plat_detail 	table3: company_detail 		table4: project_detail
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql1 = "select el.id,el.entity_name,el.entity_type,el.location,pd.operation_mode,gs.province,gs.city,gs.district,pd.date from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id and el.monitor_status='1'" % (table1,table2,table5)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = "select el.id,el.entity_name,el.entity_type,el.location,cd.operation_mode,gs.province,gs.city,gs.district,cd.date from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id and el.monitor_status='1'" % (table1,table3,table5)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = "select el.id,el.entity_name,el.entity_type,el.location,p.operation_mode,gs.province,gs.city,gs.district,p.date from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id and el.monitor_status='1'" % (table1,table4,table5)
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


#实体详情页
def platform_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and pd.date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table1,table2,table3,id,table2,table2)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:str(row[i]).replace('(','').replace(')','').replace('人民币','').replace('万','').replace('元','') for i,k in enumerate(field)} for row in res]
	return data

def company_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and cd.date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table1,table2,table3,id,table2,table2)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:str(row[i]).replace('(','').replace(')','').replace('人民币','').replace('万','').replace('元','') for i,k in enumerate(field)} for row in res]
	return data

def project_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and p.date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table1,table2,table3,id,table2,table2)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:str(row[i]).replace('(','').replace(')','').replace('人民币','').replace('万','').replace('元','') for i,k in enumerate(field)} for row in res]
	return data


def get_ad(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date <= (select date from %s as a where id=(select max(b.id) from %s as b))" % (table,id,table,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_comment(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date <= (select date from %s as a where id=(select max(b.id) from %s as b))" % (table,id,table,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_gongshang(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table,id,table,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_guarantee(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table,id,table,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_return_rate(table1,table2,id,field):
	#table1: return_rate 	table2: plat/company/project_detail
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select a.id,a.entity_id,a.entity_name,a.date,a.return_type,a.return_rate,a.related_text,a.index_name,a.text_id,a.rule_id,b.avg_return from %s as a inner join %s as b on a.entity_id=b.entity_id where a.entity_id=%d and a.date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table1,table2,id,table2,table2)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data



def get_portrait(table1,table2,table3,table4,field,letter):
	result = []
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql1 = "select el.id,el.entity_name,el.entity_type,el.location,pd.operation_mode from %s as el inner join %s as pd on el.id=pd.entity_id and pd.date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table1,table2,table2,table2)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = "select el.id,el.entity_name,el.entity_type,el.location,cd.operation_mode from %s as el inner join %s as cd on el.id=cd.entity_id and cd.date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table1,table3,table3,table3)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = "select el.id,el.entity_name,el.entity_type,el.location,p.operation_mode from %s as el inner join %s as p on el.id=p.entity_id and p.date=(select date from %s as a where id=(select max(b.id) from %s as b))" % (table1,table4,table4,table4)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	for dict in data:
		l = None
		name = dict['entity_name'].encode('gbk')
		num = ord(name[0])*256 + ord(name[1])-65536
		if num >= -20319 and num <= -20284: 
			l = 'a'
		if num >= -20283 and num <= -19776: 
			l = 'b'
		if num >= -19775 and num <= -19219: 
			l = 'c'
		if num >= -19218 and num <= -18711: 
			l = 'd'
		if num >= -18710 and num <= -18527: 
			l = 'e'
		if num >= -18526 and num <= -18240: 
			l = 'f'
		if num >= -18239 and num <= -17923: 
			l = 'g'
		if num >= -17922 and num <= -17418: 
			l = 'h'
		if num >= -17417 and num <= -16475: 
			l = 'j'
		if num >= -16474 and num <= -16213: 
			l = 'k'
		if num >= -16212 and num <= -15641: 
			l = 'l'
		if num >= -15640 and num <= -15166: 
			l = 'm'
		if num >= -15165 and num <= -14923: 
			l = 'n'
		if num >= -14922 and num <= -14915: 
			l = 'o'
		if num >= -14914 and num <= -14631: 
			l = 'p'
		if num >= -14630 and num <= -14150: 
			l = 'q'
		if num >= -14149 and num <= -14091: 
			l = 'r'
		if num >= -14090 and num <= -13119: 
			l = 's'
		if num >= -13118 and num <= -12839: 
			l = 't'
		if num >= -12838 and num <= -12557: 
			l = 'w'
		if num >= -12556 and num <= -11848: 
			l = 'x'
		if num >= -11847 and num <= -11056: 
			l = 'y'
		if num >= -11055 and num <= -10247: 
			l = 'z'

		if l == letter:
			result.append(dict)
	return result




#监测预警
def getDetectData(table1,table2,table3,table4,table5,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql1 = "select el.id,el.entity_name,el.entity_type,el.location,pd.operation_mode,gs.province,gs.city,gs.district,pd.illegal_type,pd.date from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id and el.monitor_status='1' and pd.illegal_type>0 order by pd.date desc" % (table1,table2,table5)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = "select el.id,el.entity_name,el.entity_type,el.location,cd.operation_mode,gs.province,gs.city,gs.district,cd.illegal_type,cd.date from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id and el.monitor_status='1' and cd.illegal_type>0 order by cd.date desc" % (table1,table3,table5)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = "select el.id,el.entity_name,el.entity_type,el.location,p.operation_mode,gs.province,gs.city,gs.district,p.illegal_type,p.date from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id and el.monitor_status='1' and p.illegal_type>0 order by p.date desc" % (table1,table4,table5)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	if res:
		result = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return result

def getDetectRank(table1,table2,table3,date,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=int(date))
	start_time = start_time.strftime("%Y-%m-%d")

	sql1 = 'select entity_id,entity_name,count(*) from %s where date>="%s" and date<="%s" and illegal_type>0 group by entity_id order by count(*) desc'%(table1,start_time,end_time)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = 'select entity_id,entity_name,count(*) from %s where date>="%s" and date<="%s" and illegal_type>0 group by entity_id order by count(*) desc'%(table2,start_time,end_time)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = 'select entity_id,entity_name,count(*) from %s where date>="%s" and date<="%s" and illegal_type>0 group by entity_id order by count(*) desc'%(table3,start_time,end_time)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	result = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return result












