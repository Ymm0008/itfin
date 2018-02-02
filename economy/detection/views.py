#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import detection
import json
from economy.config import *

field = ['id','entity_name','entity_type','operation_mode','province','city','district','illegal_type','date']
rank_field = ['entity_id','entity_name','count']
dis_field = ['illegal_type','province','city','count']
warn_type_field = ['illegal_type','count']
operation_field = ['id','operation']
illegal_field = ['id','illegal_name']

@detection.route('/detect/')
def detect():
	return render_template('detection/detection.html')

@detection.route('/detectData/',methods=['POST','GET'])
def detect_data():
	date = int(request.args.get('date',''))
	operation_mode = int(request.args.get('operation_mode',''))
	illegal_type = int(request.args.get('illegal_type',''))
	entity_type = int(request.args.get('entity_type',''))
	warn_distribute = request.args.get('warn_distribute','')
	result = getDetectData(date,TABLE_ENTITY_LIST,TABLE_MONITOR,TABLE_GONGSHANG,field,RISK_LEVEL,operation_mode,illegal_type,entity_type,warn_distribute)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/detectRank/')
def detect_rank():
	date = request.args.get('date','')
	entity_type = int(request.args.get('entity_type',''))
	result = getDetectRank(TABLE_MONITOR, date, rank_field, RISK_LEVEL, entity_type)
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
	result = getWarnCount(TABLE_MONITOR, RISK_LEVEL)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/warnType/')
def warn_type():
	date = int(request.args.get('date',''))
	illegal_type = int(request.args.get('illegal_type',''))
	entity_type = int(request.args.get('entity_type',''))
	operation_mode = int(request.args.get('operation_mode',''))
	warn_distribute = request.args.get('warn_distribute','')
	result = getWarnType(TABLE_MONITOR, TABLE_GONGSHANG, RISK_LEVEL, date, warn_type_field, illegal_type, entity_type, operation_mode, warn_distribute)
	return json.dumps(result,ensure_ascii=False)


@detection.route('/OperationModeBox/')
def operation_mode_box():
	result = operationModeBox(TABLE_OPERATION_LIST, operation_field)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/IllegalTypeBox/')
def illegal_type_box():
	result = illegalTypeBox(TABLE_ILLEGAL_LIST, illegal_field)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/TimeDistribute/')
def time_Distribute():
	date = int(request.args.get('date',''))
	illegal_type = int(request.args.get('illegal_type',''))
	entity_type = int(request.args.get('entity_type',''))
	operation_mode = int(request.args.get('operation_mode',''))
	warn_distribute = request.args.get('warn_distribute','')
	result = GetTimeDistribute(TABLE_MONITOR, TABLE_GONGSHANG, RISK_LEVEL, date, illegal_type, entity_type, operation_mode, warn_distribute)
	return json.dumps(result,ensure_ascii=False)

@detection.route('/WarnEntityCount/')
def warn_entity_count():
	result = getWarnEntityCount(TABLE_MONITOR, RISK_LEVEL)
	return json.dumps(result,ensure_ascii=False)




