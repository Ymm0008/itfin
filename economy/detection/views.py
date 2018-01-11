#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import detection
import json
from economy.config import *

field = ['id','entity_name','entity_type','location','operation_mode','province','city','district','illegal_type','date']
rank_field = ['entity_id','entity_name','count']
dis_field = ['illegal_type','province','city','count']

@detection.route('/detect/')
def detect():
	return render_template('detection/detection.html')

@detection.route('/detectData/',methods=['POST','GET'])
def detect_data():
	date = request.args.get('date','')
	result = getDetectData(date,TABLE_ENTITY_LIST,TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL,TABLE_GONGSHANG,field)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/detectRank/')
def detect_rank():
	date = request.args.get('date','')
	result = getDetectRank(TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL,date,rank_field)
	result.sort(key=lambda x:x['count'],reverse=True)

	return json.dumps(result[0:20],ensure_ascii=False)

@detection.route('/detectDistribute/')
def detect_distribute():
	date = request.args.get('date','')
	result = getDetectDistribute(date,TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL,TABLE_GONGSHANG,dis_field)
	result.sort(key=lambda x:x['sum'],reverse=True)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/warnCount/')
def warn_count():
	result = getWarnCount(TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL)
	return json.dumps(result,ensure_ascii=False)
