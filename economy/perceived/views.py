#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import perceived
import json
from economy.config import *
from economy.es import *

field = ['id','entity_type','entity_name','date','company','related_person','key_words','index_name','text_id','rec_type','status']
warn_field = ['entity_type','count']

@perceived.route('/perceive/')
def perceive():
    return render_template('perceived/perceived.html')

@perceived.route('/perceiveData/')
def perceive_data():
	result = get_perceive_data(TABLE_SENSOR,field)
	return json.dumps(result,ensure_ascii=False)

@perceived.route('/perceiveContent/')
def perceive_content():
	text_id = request.args.get('text_id','')
	index_name = request.args.get('index_name','')
	type = TYPE[index_name]
	result = get_perceive_content(index_name,type,text_id)
	return json.dumps(result,ensure_ascii=False)

@perceived.route('/warnCount/')
def warn_count():
	result = p_getWarnCount(TABLE_SENSOR,warn_field)
	return json.dumps(result,ensure_ascii=False)

@perceived.route('/Edit/')
def edit():
	entity_id = int(request.args.get('entity_id'))
	entity_name = request.args.get(u'entity_name')
	entity_type = int(request.args.get('entity_type'))
	company = request.args.get(u'company')
	related_person = request.args.get(u'related_person')
	keyword = request.args.get(u'keyword')
	status = Edit(TABLE_SENSOR,entity_id,entity_name,entity_type,company,related_person,keyword)
	return json.dumps(status,ensure_ascii=False)

@perceived.route('/Add/')
def add():
	entity_id = int(request.args.get('entity_id'))
	status = Add(TABLE_SENSOR,entity_id)
	return json.dumps(status,ensure_ascii=False)

@perceived.route('/Cancel/')
def cancel():
	entity_id = int(request.args.get('entity_id'))
	status = Cancel(TABLE_SENSOR, entity_id)
	return json.dumps(status,ensure_ascii=False)

@perceived.route('/OnceInStorage/',methods=['POST'])
def once_in_storage():
	list = request.get_json()
	status = OnceInStorage(TABLE_SENSOR, list)
	return json.dumps(status,ensure_ascii=False)

@perceived.route('/InStorage/',methods=['POST'])
def in_storage():
	list = request.get_json()
	status = InStorage(TABLE_SENSOR, list)
	return json.dumps(status,ensure_ascii=False)

@perceived.route('/OutStorage/')
def out_storage():
	entity_id = int(request.args.get('entity_id',''))
	status = OutStorage(TABLE_SENSOR,entity_id)
	return json.dumps(status,ensure_ascii=False)