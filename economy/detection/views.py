#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import detection
import json

field = ['id','entity_type','entity_name','location','start_time']

@detection.route('/detect/')
def detect():
	return render_template('detection/detection.html')

