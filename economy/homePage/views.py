#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import homePage
import json

@homePage.route('/')
def index():
	return render_template('homePage/homePage.html')
