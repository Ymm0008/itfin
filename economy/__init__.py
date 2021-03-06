#!/usr/bin/env python
# encoding: utf-8

from economy.entityPortrait.views import entityPortrait
from economy.homePage.views import homePage
from economy.index.views import index
from economy.detection.views import detection
from economy.perceived.views import perceived
from economy.advertising.views import advertising
from economy.manage.views import manage
from flask import Flask, render_template, request, jsonify, Blueprint

def create_app():
	app = Flask(__name__)
	app.register_blueprint(entityPortrait,url_prefix='/portraite')
	app.register_blueprint(homePage,url_prefix='/homepage')
	app.register_blueprint(index,url_prefix='/index')
	app.register_blueprint(detection,url_prefix='/detection')
	app.register_blueprint(perceived,url_prefix='/perceived')
	app.register_blueprint(advertising,url_prefix='/advertising')
	app.register_blueprint(manage,url_prefix='/manage')
	return app
