#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import index
import json

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

'''
@index.route('/platformData/')
def platformData():
	result = platform_detail('entity_list','plat_detail',plat_field)
	return json.dumps(result,ensure_ascii=False)
'''


@index.route('/company/')
def company():
	name = request.args.get('name','')
	flag = request.args.get('flag','')
	return render_template('index/company.html',name=name,flag=flag)

'''
@index.route('/companyData/')
def companyData():
	result = company_detail('entity_list','company_detail',com_field)
	return json.dumps(result,ensure_ascii=False)
'''


@index.route('/project/')
def project():
	name = request.args.get('name','')
	flag = request.args.get('flag','')
	return render_template('index/project.html',name=name,flag=flag)

'''
@index.route('/projectData/')
def projectData():
	result = project_detail('entity_list','project_detail',pro_field)
	return json.dumps(result,ensure_ascii=False)
'''



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









