#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import index
import json
from economy.es import *
from economy.config import *
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

plat_field = ['id','entity_id','entity_name','location','operation_mode','entity_type','start_time','illegal_type','risk_level','impact_level','penalty_status']
com_field = ['id','entity_id','entity_name','location','operation_mode','entity_type','start_time','illegal_type','risk_level','impact_level','penalty_status']
pro_field = ['id','entity_id','entity_name','location','operation_mode','entity_type','start_time','illegal_type','risk_level','impact_level','penalty_status']

ad_field = ['id','entity_id','entity_name','date','ad0_bbs','ad0_forum','ad0_webo','ad0_wechat','ad1_bbs','ad1_forum','ad1_webo','ad1_wechat','inf1_bbs','inf1_forum','inf1_webo','inf1_wechat','inf2_bbs','inf2_forum','inf2_webo','inf2_wechat','inf3_bbs','inf3_forum','inf3_webo','inf3_wechat','ad0_zhihu','ad1_zhihu','inf1_zhihu','inf2_zhihu','inf3_zhihu']
comment_field = ['id','entity_id','entity_name','date','sent0_bbs','sent0_forum','sent0_webo','sent0_wechat','sent1_bbs','sent1_forum','sent1_webo','sent1_wechat','sent2_bbs','sent2_forum','sent2_webo','sent2_wechat','sent0_zhihu','sent1_zhihu','sent2_zhihu']
gongshang_field = ['id','firm_name','entity_id','date','province','city','district','regist_address','up1_level_num','up2_level_num','up3_level_num','down1_level_num','down2_level_num','down3_level_num','admin_suit_num','civil_suit_num','crime_suit_num','other_suit_num','uncontact_abnormal_num','fake_abnormal_num','daily_report_abnormal_num','other_abnormal_num','people_change_num','poertaion_change_num','capital_change_num','other_change_num']
guarantee_promise_field = ['id','entity_id','entity_name','date','promise_type','promise_num','related_text','index_name','text_id','rule_id']
return_rate_field = ['id','entity_id','entity_name','date','return_type','return_rate','related_text','index_name','text_id','rule_id']

@index.route('/platform/')
def platform():
	return render_template('index/platform.html')

@index.route('/company/')
def company():
	name = request.args.get('name','')
	flag = request.args.get('flag','')
	pid = request.args.get('pid','')
	return render_template('index/company.html',name=name,flag=flag,pid=pid)

@index.route('/project/')
def project():
	name = request.args.get('name','')
	flag = request.args.get('flag','')
	return render_template('index/project.html',name=name,flag=flag)

@index.route('/entityType/')
def entity_type():
	id = int(request.args.get('id',''))
	type = int(request.args.get('type',''))
	if type == 1:
		result = platform_detail('entity_list','plat_detail',id,plat_field)
	elif type == 2:
		result = company_detail('entity_list','company_detail',id,com_field)
	elif type == 3:
		result = project_detail('entity_list','project_detail',id,pro_field)
	return json.dumps(result,ensure_ascii=False)


@index.route('/ad/')
def adData():
	id = int(request.args.get('id',''))
	result = get_ad('ad_statis',id,ad_field)
	return json.dumps(result,ensure_ascii=False)

@index.route('/comment/')
def commentData():
	id = int(request.args.get('id',''))
	result = get_comment('comment_statis',id,comment_field)
	return json.dumps(result,ensure_ascii=False)

@index.route('/gongshang/')
def gongshangData():
	id = int(request.args.get('id',''))
	result = get_gongshang('gongshang',id,gongshang_field)
	return json.dumps(result,ensure_ascii=False)

@index.route('/guarantee/')
def guaranteeData():
	id = int(request.args.get('id',''))
	result = get_guarantee('guarantee_promise',id,guarantee_promise_field)
	return json.dumps(result,ensure_ascii=False)

@index.route('/returnRate/')
def returnRateData():
	id = int(request.args.get('id',''))
	result = get_return_rate('return_rate',id,return_rate_field)
	return json.dumps(result,ensure_ascii=False)


@index.route('/returnRate_content/')
def returnrateContent():
	index_name = request.args.get('index_name','')
	text_id = request.args.get('text_id','')
	result = get_returnrate_content(index_name,text_id)
	return json.dumps(result,ensure_ascii=False)

@index.route('/promise_content/')
def promiseContent():
	index_name = request.args.get('index_name','')
	text_id = request.args.get('text_id','')
	result = get_promise_content(index_name,text_id)
	return json.dumps(result,ensure_ascii=False)


@index.route('/ad_content/')
def adContent():
	results = []
	entity_name = request.args.get('entity_name','')
	for each in TYPE.items():
		index_name = each[0]
		type = each[1]
		result = get_adContent(entity_name, 0.5, index_name, type)
		result.sort(key=lambda x:x['publish_time'],reverse=True)
		results.append({index_name:result})
	return json.dumps(results,ensure_ascii=False)

@index.route('/comment_content/')
def commentContent():
	results = []
	entity_name = request.args.get('entity_name','')
	for each in TYPE.items():
		index_name = each[0]
		type = each[1]
		result = get_commentContent(entity_name, 0.5, index_name, type)
		result.sort(key=lambda x:x['publish_time'],reverse=True)
		results.append({index_name:result})
	return json.dumps(results,ensure_ascii=False)


@index.route('/abnormal_info/')
def abnormalInfo():
	firm_name = request.args.get('firm_name','')
	result = get_ab_info('gongshang','abnormal_info',firm_name)
	return json.dumps(result,ensure_ascii=False)

@index.route('/change_info/')
def changelInfo():
	firm_name = request.args.get('firm_name','')
	result = get_ch_info('gongshang','change_info',firm_name)
	return json.dumps(result,ensure_ascii=False)

@index.route('/law_info/')
def lawInfo():
	firm_name = request.args.get('firm_name','')
	result = get_law_info('gongshang','law_info',firm_name)
	return json.dumps(result,ensure_ascii=False)


@index.route('/sub_firm/')
def subfirmContent():
	results = []
	index_name = 'gongshang'
	firm_name = request.args.get('firm_name', '')
	# print firm_name
	level1_subfirms = get_subfirmContent(firm_name,index_name)

	results.append(firm_name)		#根节点
	level1_temp = []
	for item in level1_subfirms:
		level1_temp.append(item['asset_name'])
	results.append({firm_name:level1_temp})

	level2_temp = {}
	for sub_firm in level1_subfirms:
		level2_subfirms = get_subfirmContent(sub_firm['asset_name'], index_name)
		level2_temp[sub_firm['asset_name']] = [x['asset_name'] for x in level2_subfirms]
	results.append(level2_temp)
	# print len(results)
	# print len(results[2])

	return json.dumps(results, ensure_ascii=False)





