#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import homePage
import json
from economy.config import *

field = ['illegal_type','province','city','count']
province_field = ['province','count']
warn_field = ['plat','com','pro']

@homePage.route('/')
def index():
	return render_template('homePage/homePage.html')

@homePage.route('/warnCount/')
def warn_count():
	result = h_getWarnCount(TABLE_MONITOR, warn_field, RISK_LEVEL)
	return json.dumps(result,ensure_ascii=False)

@homePage.route('/cityRank/')
def city_rank():
	province = request.args.get('province','')
	result = get_city_rank(TABLE_MONITOR,TABLE_GONGSHANG,field,province, RISK_LEVEL)
	return json.dumps(result,ensure_ascii=False)

@homePage.route('/provinceRank/')
def province_rank():
	result = get_province_rank(TABLE_MONITOR,TABLE_GONGSHANG,province_field, RISK_LEVEL)
	result.sort(key=lambda x:x['count7'],reverse=True)
	return json.dumps(result,ensure_ascii=False)

@homePage.route('/timeDistribute/')
def time_distribute():
	result = getTimeDistribute(TABLE_MONITOR,RISK_LEVEL)
	return json.dumps(result,ensure_ascii=False)

