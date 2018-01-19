#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import advertising
import json

field = ['id','entity_type','entity_name','location','start_time']

@advertising.route('/billing/')
def billing():
    return render_template('advertising/billing.html')

@advertising.route('/adDetails/')
def adDetails():
    name = request.args.get('name','')
    pid = request.args.get('pid','')
    return render_template('advertising/adDetails.html',name=name,pid=pid)

