#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import index
import json

field = ['id','entity_name','company','date','operation_mode','illigal_type','resk_level','impact_level','penalty_status','related_cpmpany','related_plat','related_person','follower','bg','avg_return','vol','investor','problem','debt_num','daily_input','daily_balance','inv_period','imprs']

@index.route('/platform/')
def platform():
	return render_template('index/platform.html')

@index.route('/platformData/')
def platformData():
	result = platform_detail('plat_detail',field)
	return json.dumps(result,ensure_ascii=False)


@index.route('/company/')
def company():
	return render_template('index/company.html')

@index.route('/companyData/')
def companyData():
	result = company_detail('company_detail',field)
	return json.dumps(result,ensure_ascii=False)


@index.route('/project/')
def project():
	return render_template('index/project.html')

@index.route('/projectData/')
def projectData():
	result = project_detail('project_detail',field)
	return json.dumps(result,ensure_ascii=False)