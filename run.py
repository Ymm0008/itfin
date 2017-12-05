#!/usr/bin/env python
# encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint
from economy.db import *
import json
from optparse import OptionParser
from economy import create_app

optparser = OptionParser()
optparser.add_option('-p','--port',dest='port',help='Server Http Port Number', default=5000, type='int')
(options, args) = optparser.parse_args()

app = create_app()

if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0',port=options.port)
