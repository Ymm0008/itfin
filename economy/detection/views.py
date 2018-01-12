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
warn_type_field = ['illegal_type','count']

@detection.route('/detect/')
def detect():
	return render_template('detection/detection.html')

@detection.route('/detectData/',methods=['POST','GET'])
def detect_data():
	date = request.args.get('date','')
	result = getDetectData(date,TABLE_ENTITY_LIST,TABLE_MONITOR,TABLE_GONGSHANG,field,RISK_LEVEL)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/detectRank/')
def detect_rank():
	date = request.args.get('date','')
	result = getDetectRank(TABLE_MONITOR,date,rank_field,RISK_LEVEL)
	result.sort(key=lambda x:x['count'],reverse=True)

	return json.dumps(result[0:20],ensure_ascii=False)

@detection.route('/detectDistribute/')
def detect_distribute():
	date = request.args.get('date','')
	result = getDetectDistribute(date,TABLE_MONITOR,TABLE_GONGSHANG,dis_field,RISK_LEVEL)
	result.sort(key=lambda x:x['sum'],reverse=True)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/warnCount/')
def warn_count():
	result = getWarnCount(TABLE_MONITOR,RISK_LEVEL)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/warnType/')
def warn_type():
	date = int(request.args.get('date',''))
	result = getWarnType(TABLE_MONITOR, RISK_LEVEL, date, warn_type_field)
	return json.dumps(result,ensure_ascii=False)




