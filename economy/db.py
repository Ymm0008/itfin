#!/usr/bin/env python
# coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from datetime import datetime,timedelta
import pymysql as mysql
from pybloom import ScalableBloomFilter
import time

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
	sql1 = "select el.id,el.entity_name,el.entity_type,el.location,pd.operation_mode,gs.province,gs.city,gs.district,pd.date from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id where pd.date=gs.date and el.monitor_status='1' and pd.date=(select max(date) from %s as a)" % (table1,table2,table5,table2)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = "select el.id,el.entity_name,el.entity_type,el.location,cd.operation_mode,gs.province,gs.city,gs.district,cd.date from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id where cd.date=gs.date and el.monitor_status='1' and cd.date=(select max(date) from %s as a)" % (table1,table3,table5,table3)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = "select el.id,el.entity_name,el.entity_type,el.location,p.operation_mode,gs.province,gs.city,gs.district,p.date from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id where p.date=gs.date and el.monitor_status='1' and p.date=(select max(date) from %s as a)" % (table1,table4,table5,table4)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	if res:
		data = [{k:row[i] for i,k in enumerate(field)} for row in res]
		result = {'status':1,'data':data}
	else:
		result = {'status':0,'data':'null'}
	return result

def get_platform(table0,table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select pd.id,pd.entity_name,pd.illegal_type,el.entity_type from %s as el inner join %s as pd on el.id=pd.entity_id where pd.illegal_type>0" % (table0, table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_company(table0,table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select cd.id,cd.entity_name,cd.illegal_type,el.entity_type from %s as el inner join %s as cd on el.id=cd.entity_id where cd.illegal_type>0" % (table0, table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_project(table0,table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select p.id,p.entity_name,p.illegal_type,el.entity_type from %s as el inner join %s as p on el.id=p.entity_id where p.illegal_type>0" % (table0, table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_monitor_count(table):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql1 = "select count(*) from %s where monitor_status=1"%table
	cur.execute(sql1)
	res1 = cur.fetchall()[0][0]
	
	t = int(time.time())
	a = time.localtime(t)
	b = time.strftime("%Y-%m-%d",a)

	sql3 = "select count(*) from %s where in_time=%s and monitor_status=1"%(table, b)
	cur.execute(sql3)
	res3 = cur.fetchall()[0][0]

	dict = {'all':res1,'today':res3}
	return dict



#实体详情页
def platform_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and pd.date=(select max(date) from %s as a)" % (table1,table2,table3,id,table2)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:str(row[i]).replace('(','').replace(')','').replace('人民币','').replace('万','').replace('元','') for i,k in enumerate(field)} for row in res]
	return data

def company_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and cd.date=(select max(date) from %s as a)" % (table1,table2,table3,id,table2)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:str(row[i]).replace('(','').replace(')','').replace('人民币','').replace('万','').replace('元','') for i,k in enumerate(field)} for row in res]
	return data

def project_detail(table1,table2,table3,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id where el.id=%d and p.date=(select max(date) from %s as a)" % (table1,table2,table3,id,table2)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:str(row[i]).replace('(','').replace(')','').replace('人民币','').replace('万','').replace('元','') for i,k in enumerate(field)} for row in res]
	return data


def get_ad(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date <= (select max(date) from %s as a)" % (table,id,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_comment(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date <= (select max(date) from %s as a)" % (table,id,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_gongshang(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date=(select max(date) from %s as a)" % (table,id,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_guarantee(table,id,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select * from %s where entity_id=%d and date=(select max(date) from %s as a)" % (table,id,table)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data

def get_return_rate(table1,table2,id,field):
	#table1: return_rate 	table2: plat/company/project_detail
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select a.id,a.entity_id,a.entity_name,a.date,a.return_type,a.return_rate,a.related_text,a.index_name,a.text_id,a.rule_id,b.avg_return from %s as a inner join %s as b on a.entity_id=b.entity_id where a.entity_id=%d and a.date=(select max(date) from %s as a)" % (table1,table2,id,table1)
	cur.execute(sql)
	res = cur.fetchall()
	data = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return data



def get_portrait(table1,table2,table3,table4,table5,field,letter):
	result = []
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql1 = "select el.id,el.entity_name,el.entity_type,el.location,pd.operation_mode,gs.province,gs.city,gs.district,pd.date from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id where pd.date=gs.date and pd.date=(select max(date) from %s as a)" % (table1,table2,table5,table2)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = "select el.id,el.entity_name,el.entity_type,el.location,cd.operation_mode,gs.province,gs.city,gs.district,cd.date from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id where cd.date=gs.date and cd.date=(select max(date) from %s as a)" % (table1,table3,table5,table3)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = "select el.id,el.entity_name,el.entity_type,el.location,p.operation_mode,gs.province,gs.city,gs.district,p.date from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id where p.date=gs.date and p.date=(select max(date) from %s as a)" % (table1,table4,table5,table4)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	print(res)
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

def get_risk_comment_table(table1,table2,table3,entity_id,type,field):
	result = []
	dict = {}
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	if type == 1:
		sql = "select date,illegal_type from %s where illegal_type>0 and entity_id=%d order by date desc"%(table1,entity_id)
		cur.execute(sql)
		res = cur.fetchall()
		result = [{k:row[i] for i,k in enumerate(field)} for row in res]

		sql = "select count(*) from %s where illegal_type>0 and entity_id=%d order by date desc"%(table1,entity_id)
		cur.execute(sql)
		res = cur.fetchall()[0][0]
		dict = {res:result}
	
	if type == 2:
		sql = "select date,illegal_type from %s where illegal_type>0 and entity_id=%d order by date desc"%(table2,entity_id)
		cur.execute(sql)
		res = cur.fetchall()
		result = [{k:row[i] for i,k in enumerate(field)} for row in res]

		sql = "select count(*) from %s where illegal_type>0 and entity_id=%d order by date desc"%(table2,entity_id)
		cur.execute(sql)
		res = cur.fetchall()[0][0]
		dict = {res:result}
	
	if type == 3:
		sql = "select date,illegal_type from %s where illegal_type>0 and entity_id=%d order by date desc"%(table2,entity_id)
		cur.execute(sql)
		res = cur.fetchall()
		result = [{k:row[i] for i,k in enumerate(field)} for row in res]

		sql = "select count(*) from %s where illegal_type>0 and entity_id=%d order by date desc"%(table3,entity_id)
		cur.execute(sql)
		res = cur.fetchall()[0][0]
		dict = {res:result}
	return dict




#监测预警
def getDetectData(date,table1,table2,table3,table4,table5,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()

	#####
	list = [u"绿能宝",u"亿好金服",u"速溶360",u"鑫脉财富",u"太保金服",u"穆金所",u"升隆财富",u"邑民金融"]
	list1 = [""]*8
	list2 = []
	filter_list = []
	#####

	sql = "select max(date) from %s"%table2
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=int(date))
	start_time = start_time.strftime("%Y-%m-%d")
	sql1 = "select el.id,el.entity_name,el.entity_type,el.location,pd.operation_mode,gs.province,gs.city,gs.district,pd.illegal_type,pd.date from %s as el inner join %s as pd on el.id=pd.entity_id inner join %s as gs on el.id=gs.entity_id where pd.date=gs.date and pd.date>'%s' and pd.date<='%s' and el.monitor_status='1' and pd.illegal_type>0 and risk_level>80 order by pd.date desc" % (table1,table2,table5,start_time,end_time)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = "select el.id,el.entity_name,el.entity_type,el.location,cd.operation_mode,gs.province,gs.city,gs.district,cd.illegal_type,cd.date from %s as el inner join %s as cd on el.id=cd.entity_id inner join %s as gs on el.id=gs.entity_id where cd.date=gs.date and cd.date>'%s' and cd.date<='%s' and el.monitor_status='1' and cd.illegal_type>0 and risk_level>80 order by cd.date desc" % (table1,table3,table5,start_time,end_time)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = "select el.id,el.entity_name,el.entity_type,el.location,p.operation_mode,gs.province,gs.city,gs.district,p.illegal_type,p.date from %s as el inner join %s as p on el.id=p.entity_id inner join %s as gs on el.id=gs.entity_id where p.date=gs.date and p.date>'%s' and p.date<='%s' and el.monitor_status='1' and p.illegal_type>0 and risk_level>80 order by p.date desc" % (table1,table4,table5,start_time,end_time)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	result = [{k:row[i] for i,k in enumerate(field)} for row in res]
	#print(len(result))
	#for entity in list:
	for r in result:
		if not r['entity_name'] in filter_list and r['entity_name'] in list:
			for item in range(len(list)):
				if r['entity_name'] in list[item]:
					list1[item] = r
					print(r['entity_name'])
			#if not r['entity_name'] in filter_list:
				#if r['entity_name'] == entity:
					#list1.append(r)
					filter_list.append(r['entity_name'])
		else:
			list2.append(r)

	return list1 + list2

def getDetectRank(table1,table2,table3,date,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=int(date))
	start_time = start_time.strftime("%Y-%m-%d")

	sql1 = 'select entity_id,entity_name,max(risk_level) from %s where date>"%s" and date<="%s" and illegal_type>0 and risk_level>80 group by entity_id order by sum(risk_level) desc'%(table1,start_time,end_time)
	cur.execute(sql1)
	res1 = cur.fetchall()
	sql2 = 'select entity_id,entity_name,max(risk_level) from %s where date>"%s" and date<="%s" and illegal_type>0 and risk_level>80 group by entity_id order by sum(risk_level) desc'%(table2,start_time,end_time)
	cur.execute(sql2)
	res2 = cur.fetchall()
	sql3 = 'select entity_id,entity_name,max(risk_level) from %s where date>"%s" and date<="%s" and illegal_type>0 and risk_level>80 group by entity_id order by sum(risk_level) desc'%(table3,start_time,end_time)
	cur.execute(sql3)
	res3 = cur.fetchall()
	res = res1 + res2 + res3
	result = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return result

def getDetectDistribute(date,table1,table2,table3,table4,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()

	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=int(date))
	start_time = start_time.strftime("%Y-%m-%d")

	province_list = []
	list = []
	sql1 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=1 and risk_level>80 group by province,city'%(table1,table4,start_time,end_time)
	sql11 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=1 and risk_level>80 group by province,city'%(table2,table4,start_time,end_time)
	sql12 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=1 and risk_level>80 group by province,city'%(table3,table4,start_time,end_time)
	sql2 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=2 and risk_level>80 group by province,city'%(table1,table4,start_time,end_time)
	sql21 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=2 and risk_level>80 group by province,city'%(table2,table4,start_time,end_time)
	sql22 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=2 and risk_level>80 group by province,city'%(table3,table4,start_time,end_time)
	sql3 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=3 and risk_level>80 group by province,city'%(table1,table4,start_time,end_time)
	sql31 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=3 and risk_level>80 group by province,city'%(table2,table4,start_time,end_time)
	sql32 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type=3 and risk_level>80 group by province,city'%(table3,table4,start_time,end_time)

	cur.execute(sql1)
	res1 = cur.fetchall()
	result1 = [{k:row[i] for i,k in enumerate(field)} for row in res1]

	cur.execute(sql11)
	res2 = cur.fetchall()
	result2 = [{k:row[i] for i,k in enumerate(field)} for row in res2]

	cur.execute(sql12)
	res3 = cur.fetchall()
	result3 = [{k:row[i] for i,k in enumerate(field)} for row in res3]

	cur.execute(sql2)
	res4 = cur.fetchall()
	result4 = [{k:row[i] for i,k in enumerate(field)} for row in res4]

	cur.execute(sql21)
	res5 = cur.fetchall()
	result5 = [{k:row[i] for i,k in enumerate(field)} for row in res5]

	cur.execute(sql22)
	res6 = cur.fetchall()
	result6 = [{k:row[i] for i,k in enumerate(field)} for row in res6]

	cur.execute(sql3)
	res7 = cur.fetchall()
	result7 = [{k:row[i] for i,k in enumerate(field)} for row in res7]

	cur.execute(sql31)
	res8 = cur.fetchall()
	result8 = [{k:row[i] for i,k in enumerate(field)} for row in res8]

	cur.execute(sql32)
	res9 = cur.fetchall()
	result9 = [{k:row[i] for i,k in enumerate(field)} for row in res9]

	result = result1 + result2 + result3 + result4 + result5 + result6 + result7 + result8 + result9

	b = ScalableBloomFilter(1000000,0.001)
	for p in result1:
		if not p['city'] in b:
			[b.add(p['city'])]
			province_list.append({'province':p['province'],'city':p['city']})

	for d in province_list:
		if d['city']:
			pro_dict = {"province":d['province'],"city":d['city']}
			for dict in result:
				if dict['city'] == d['city']:
					#print(dict['province'])
					if dict['illegal_type'] == 1:
						pro_dict.update({'count1':dict['count']})
					elif dict['illegal_type'] == 2:
						pro_dict.update({'count2':dict['count']})
					elif dict['illegal_type'] == 3:
						pro_dict.update({'count3':dict['count']})
			pro_dict.update({'count2':0,'count3':0}) # 空数据报错。记得删掉
			pro_dict.update({'sum':pro_dict['count1']+pro_dict['count2']+pro_dict['count3']})
			list.append(pro_dict)
	return list

def getWarnCount(table1,table2,table3):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()

	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start0_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=7)
	start1_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=30)
	start2_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=90)
	start_time0 = start0_time.strftime("%Y-%m-%d")
	start_time1 = start1_time.strftime("%Y-%m-%d")
	start_time2 = start2_time.strftime("%Y-%m-%d")

	sql01 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table1,start_time0,end_time)
	sql02 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table1,start_time1,end_time)
	sql03 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table1,start_time2,end_time)

	sql11 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table2,start_time0,end_time)
	sql12 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table2,start_time1,end_time)
	sql13 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table2,start_time2,end_time)

	sql21 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table3,start_time0,end_time)
	sql22 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table3,start_time1,end_time)
	sql23 = "select count(*) from %s where illegal_type>0 and risk_level>80 and date>'%s' and date<='%s'"%(table3,start_time2,end_time)

	cur.execute(sql01)
	c01 = cur.fetchall()[0][0]
	cur.execute(sql02)
	c02 = cur.fetchall()[0][0]
	cur.execute(sql03)
	c03 = cur.fetchall()[0][0]
	cur.execute(sql11)
	c11 = cur.fetchall()[0][0]
	cur.execute(sql12)
	c12 = cur.fetchall()[0][0]
	cur.execute(sql13)
	c13 = cur.fetchall()[0][0]
	cur.execute(sql21)
	c21 = cur.fetchall()[0][0]
	cur.execute(sql22)
	c22 = cur.fetchall()[0][0]
	cur.execute(sql23)
	c23 = cur.fetchall()[0][0]

	count_7 = int(c01) + int(c11) + int(c21)
	count_30 = int(c02) + int(c12) + int(c22)
	count_90 = int(c03) + int(c13) + int(c23)

	dict = {'seven':count_7,'thirty':count_30,'ninty':count_90}
	return dict



# 首页
def h_getWarnCount(table1,table2,table3):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()

	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=7)
	start_time = start_time.strftime("%Y-%m-%d")

	sql1 = 'select count(*) from %s where illegal_type>0 and risk_level>80 and date>"%s" and date<="%s"'%(table1,start_time,end_time)	
	print(sql1)
	cur.execute(sql1)
	res1 = cur.fetchall()
	
	sql2 = 'select count(*) from %s where illegal_type>0 and risk_level>80 and date>"%s" and date<="%s"'%(table2,start_time,end_time)	
	cur.execute(sql2)
	res2 = cur.fetchall()
	
	sql3 = 'select count(*) from %s where illegal_type>0 and risk_level>80 and date>"%s" and date<="%s"'%(table3,start_time,end_time)
	cur.execute(sql3)
	res3 = cur.fetchall()

	dict = {'plat':res1[0][0],'com':res2[0][0],'pro':res3[0][0]}
	return dict


def get_city_rank(table1,table2,table3,table4,field,province_name):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	
	city_list = []
	list = []
	province_list = []

	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=7)
	start_time = start_time.strftime("%Y-%m-%d")
	
	start1_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=30)
	start_time1 = start1_time.strftime("%Y-%m-%d")

	sql1 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province,city'%(table1,table4,start_time,end_time)
	cur.execute(sql1)
	res1 = cur.fetchall()
	result1 = [{k:row[i] for i,k in enumerate(field)} for row in res1]
	sql2 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province,city'%(table2,table4,start_time,end_time)
	cur.execute(sql2)
	res2 = cur.fetchall()
	result2 = [{k:row[i] for i,k in enumerate(field)} for row in res2]
	sql3 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province,city'%(table3,table4,start_time,end_time)
	cur.execute(sql3)
	res3 = cur.fetchall()
	result3 = [{k:row[i] for i,k in enumerate(field)} for row in res3]
	result = result1 + result2 + result3

	sql11 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province,city'%(table1,table4,start_time1,end_time)
	cur.execute(sql11)
	res11 = cur.fetchall()
	result11 = [{k:row[i] for i,k in enumerate(field)} for row in res11]
	sql22 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province,city'%(table2,table4,start_time1,end_time)
	cur.execute(sql22)
	res22 = cur.fetchall()
	result22 = [{k:row[i] for i,k in enumerate(field)} for row in res22]
	sql33 = 'select pd.illegal_type,gs.province,gs.city,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province,city'%(table3,table4,start_time1,end_time)
	cur.execute(sql33)
	res33 = cur.fetchall()
	result33 = [{k:row[i] for i,k in enumerate(field)} for row in res33]
	result111 = result11 + result22 + result33

	b = ScalableBloomFilter(1000000,0.001)
	for p in result:
		if not p['city'] in b:
			[b.add(p['city'])]
			city_list.append({'province':p['province'],'city':p['city']})

	for d in city_list:
		if not d['province'] in province_list:
			province_list.append(d['province'])

	if province_name:
		for d in city_list:
			if d['province']==province_name and d['city']:
				pro_dict = {"province":d['province'],"city":d['city']}
				for dict in result:
					if dict['city'] == d['city']:
						pro_dict.update({'count7':dict['count']})
				for dict in result111:
					if dict['city'] == d['city']:
						pro_dict.update({'count30':dict['count']})
				list.append(pro_dict)
	

	if not province_name:
		for p in province_list:
			pro_dict = {"province":p}
			count = 0
			for dict in result:
				if dict['province'] == p:
					count += dict['count']
			pro_dict.update({"count":count})
			list.append(pro_dict)
	return list


def get_province_rank(table1,table2,table3,table4,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	list = []
	province_list = []
	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]
	start0_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=7)
	start1_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=30)
	
	start_time0 = start0_time.strftime("%Y-%m-%d")
	start_time1 = start1_time.strftime("%Y-%m-%d")

	sql1 = 'select gs.province,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province'%(table1,table4,start_time0,end_time)
	cur.execute(sql1)
	res1 = cur.fetchall()
	result1 = [{k:row[i] for i,k in enumerate(field)} for row in res1]
	sql2 = 'select gs.province,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province'%(table2,table4,start_time0,end_time)
	cur.execute(sql2)
	res2 = cur.fetchall()
	result2 = [{k:row[i] for i,k in enumerate(field)} for row in res2]
	sql3 = 'select gs.province,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province'%(table3,table4,start_time0,end_time)
	cur.execute(sql3)
	res3 = cur.fetchall()
	result3 = [{k:row[i] for i,k in enumerate(field)} for row in res3]
	
	sql4 = 'select gs.province,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province'%(table1,table4,start_time1,end_time)
	cur.execute(sql4)
	res4 = cur.fetchall()
	result4 = [{k:row[i] for i,k in enumerate(field)} for row in res4]
	sql5 = 'select gs.province,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province'%(table2,table4,start_time1,end_time)
	cur.execute(sql5)
	res5 = cur.fetchall()
	result5 = [{k:row[i] for i,k in enumerate(field)} for row in res5]
	sql6 = 'select gs.province,count(*) from %s as pd inner join %s as gs on pd.entity_id=gs.entity_id where pd.date>"%s" and pd.date<="%s" and illegal_type>0 and risk_level>80 group by province'%(table3,table4,start_time1,end_time)
	cur.execute(sql6)
	res6 = cur.fetchall()
	result6 = [{k:row[i] for i,k in enumerate(field)} for row in res6]

	result7 = result1 + result2 + result3
	result30 = result4 + result5 + result6

	b = ScalableBloomFilter(1000000,0.001)
	for p in result7:
		if not p['province'] in b:
			[b.add(p['province'])]
			province_list.append(p['province'])

	for d in province_list:
		if d:
			pro_dict = {"province":d}
			for dict in result7:
				if dict['province'] == d:
					pro_dict.update({'count7':dict['count']})
			for dict in result30:
				if dict['province'] == d:
					pro_dict.update({'count30':dict['count']})
			list.append(pro_dict)
	return list


def getTimeDistribute(table1,table2,table3):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()
	list = []
	count_list = []
	sql = "select max(date) from %s"%table1
	cur.execute(sql)
	end_time = cur.fetchall()[0][0]

	time_list = []
	for i in range(0,30):
		start_time = datetime.strptime(end_time,"%Y-%m-%d") - timedelta(days=i)
		start_time = start_time.strftime("%Y-%m-%d")
		time_list.append(start_time)

	for i,time in enumerate(time_list):
		#print(i)
		#print(time)
		#if i < len(time_list)-1:
		sql1 = "select count(*) from %s where date='%s' and illegal_type>0 and risk_level>80"%(table1,time)
		print(sql1)
		cur.execute(sql1)
		res1 = cur.fetchall()[0][0]

		sql2 = "select count(*) from %s where date='%s' and illegal_type>0 and risk_level>80"%(table2,time)
		cur.execute(sql2)
		res2 = cur.fetchall()[0][0]
	
		sql3 = "select count(*) from %s where date='%s' and illegal_type>0 and risk_level>80"%(table3,time)
		cur.execute(sql3)
		res3 = cur.fetchall()[0][0]

		result = res1 + res2 + res3
		dict = {'time':time,'count':result}
		list.append(dict)

	return list



#感知入库
def get_perceive_data(table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()

	sql = 'select * from %s group by entity_name order by date desc'%table
	cur.execute(sql)
	res = cur.fetchall()
	result = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return result


def p_getWarnCount(table,field):
	conn = mysql.connect(host="219.224.134.214",user="root",password="",db="itfin",charset='utf8')
	conn.autocommit(True)
	cur = conn.cursor()

	#sql1 = "select count(*) from %s where entity_type=1 group by entity_name"%table	
	#sql2 = "select count(*) from %s where entity_type=2 group by entity_name"%table	
	#sql3 = "select count(*) from %s where entity_type=3 group by entity_name"%table

	#cur.execute(sql1)
	#res1 = cur.fetchall()[0][0]
	#cur.execute(sql2)
	#res2 = cur.fetchall()[0][0]
	#cur.execute(sql3)
	#res3 = cur.fetchall()[0][0]
	#dict = {'platform':res1,'company':res2,'project':res3}
	#return dict

	sql = 'select entity_type,count(*) from %s where date=(select max(date) from sensor_daily as sd) group by entity_type'%table
	cur.execute(sql)
	res = cur.fetchall()
	result = [{k:row[i] for i,k in enumerate(field)} for row in res]
	return result






