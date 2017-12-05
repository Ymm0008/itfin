#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import entityPortrait
import json

field = ['id','entity_type','entity_name','location','start_time']

@entityPortrait.route('/entityPortrait/')
def entityportrait():
	return render_template('entityPortrait/entity_portrait.html')

@entityPortrait.route('/portrait/',methods=['POST','GET'])
def portrait():
	result = get('entity_list',field)
	if result['status'] == 1:
		return json.dumps(result['data'],ensure_ascii=False)

@entityPortrait.route('/platform/',methods=['POST','GET'])
def platform():
	result = get_platform('entity_list')
	print(result)
	return json.dumps(result,ensure_ascii=False)

@entityPortrait.route('/company/',methods=['POST','GET'])
def company():
	result = get_company('entity_list')
	print(result)
	return json.dumps(result,ensure_ascii=False)

@entityPortrait.route('/project/',methods=['POST','GET'])
def project():
	result = get_project('entity_list')
	print(result)
	return json.dumps(result,ensure_ascii=False)
