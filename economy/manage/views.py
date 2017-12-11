#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import manage
import json

field = ['id','entity_type','entity_name','location','start_time']

@manage.route('/userManage/')
def userManage():
    return render_template('manage/userManage.html')

