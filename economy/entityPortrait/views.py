#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import entityPortrait
import json

field = ['id','entity_name','entity_type','location','operation_mode']
plat_field = ['id','entity_name']
company_field = ['id','entity_name']
project_field = ['id','entity_name']

@entityPortrait.route('/entityPortrait/')
def entityportrait():
	return render_template('entityPortrait/entity_portrait.html')

@entityPortrait.route('/portrait/',methods=['POST','GET'])
def portrait():
	result = get('entity_list','plat_detail','company_detail','project_detail',field)
	if result['status'] == 1:
		return json.dumps(result['data'],ensure_ascii=False)

@entityPortrait.route('/platform/',methods=['POST','GET'])
def platform():
	result = get_platform('entity_list',plat_field)
	#print(result)
	return json.dumps(result,ensure_ascii=False)

@entityPortrait.route('/company/',methods=['POST','GET'])
def company():
	result = get_company('entity_list',company_field)
	#print(result)
	return json.dumps(result,ensure_ascii=False)

@entityPortrait.route('/project/',methods=['POST','GET'])
def project():
	result = get_project('entity_list',project_field)
	#print(result)
	return json.dumps(result,ensure_ascii=False)


@entityPortrait.route('/portrait_letter/',methods=['POST','GET'])
def portraitLetter():
	letter = request.args.get('letter','')
	result = get_portrait('entity_list','plat_detail','company_detail','project_detail',field,letter)
	return json.dumps(result,ensure_ascii=False)






