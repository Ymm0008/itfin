#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import homePage
import json
from economy.config import *

@homePage.route('/')
def index():
	return render_template('homePage/homePage.html')

@homePage.route('/warnCount/')
def warn_count():
	result = h_getWarnCount(TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL)
	return json.dumps(result,ensure_ascii=False)



@homePage.route('/provinceRank/')
def province_rank():
	result = get_province_rank()

	return result








