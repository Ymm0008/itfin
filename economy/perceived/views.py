#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import perceived
import json
from economy.config import *
from economy.es import *

field = ['id','entity_type','entity_name','date','company','related_person','key_words','index_name','text_id','rec_type','status']

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