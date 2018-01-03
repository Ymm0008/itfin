#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import entityPortrait
from economy.config import *
import json

field = ['id','entity_name','entity_type','location','operation_mode','province','city','district','date']
plat_field = ['id','entity_name']
company_field = ['id','entity_name']
project_field = ['id','entity_name']

@entityPortrait.route('/entityPortrait/')
def entityportrait():
	return render_template('entityPortrait/entity_portrait.html')

@entityPortrait.route('/portrait/',methods=['POST','GET'])
def portrait():
	result = get(TABLE_ENTITY_LIST,TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL,TABLE_GONGSHANG,field)
	if result['status'] == 1:
		return json.dumps(result['data'],ensure_ascii=False)

@entityPortrait.route('/platform/',methods=['POST','GET'])
def platform():
	result = get_platform(TABLE_ENTITY_LIST,plat_field)
	return json.dumps(result,ensure_ascii=False)

@entityPortrait.route('/company/',methods=['POST','GET'])
def company():
	result = get_company(TABLE_ENTITY_LIST,company_field)
	return json.dumps(result,ensure_ascii=False)

@entityPortrait.route('/project/',methods=['POST','GET'])
def project():
	result = get_project(TABLE_ENTITY_LIST,project_field)
	return json.dumps(result,ensure_ascii=False)


@entityPortrait.route('/portrait_letter/',methods=['POST','GET'])
def portraitLetter():
	letter = request.args.get('letter','')
	result = get_portrait(TABLE_ENTITY_LIST,TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL,TABLE_GONGSHANG,field,letter)
	return json.dumps(result,ensure_ascii=False)






