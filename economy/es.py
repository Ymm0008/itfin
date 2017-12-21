#!/usr/bin/env python
#encoding: utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from elasticsearch import Elasticsearch

ES_HOST = '219.224.134.216'
ES_PORT = 9202

es = Elasticsearch([{'host':ES_HOST,'port':ES_PORT}])


def get_returnrate_content(index_name,text_id):
	query_body = {"query":{"match":{"_id":text_id}}}
	res = es.search(index=index_name, doc_type=type1, body=query_body,request_timeout=100)
	content = res['hits']['hits']['_source']['content']
	return content

def get_promise_content(index_name,text_id):
	query_body = {"query":{"match":{"_id":text_id}}}
	res = es.search(index=index_name, doc_type=type1, body=query_body,request_timeout=100)
	content = res['hits']['hits']['_source']['content']
	return content

