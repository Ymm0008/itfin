#!/usr/bin/env python
# encoding: utf-8

from economy.entityPortrait.views import entityPortrait
from economy.homePage.views import homePage
from economy.index.views import index
from economy.detection.views import detection
from flask import Flask, render_template, request, jsonify, Blueprint

def create_app():
	app = Flask(__name__)
	app.register_blueprint(entityPortrait,url_prefix='/portraite')
	app.register_blueprint(homePage,url_prefix='/')
	app.register_blueprint(index,url_prefix='/index')
	app.register_blueprint(detection,url_prefix='/detection')
	return app
