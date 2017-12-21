#!/usr/bin/env python
#encoding: utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from elasticsearch import Elasticsearch
import config

ES_HOST = '219.224.134.216'
ES_PORT = 9202

es = Elasticsearch([{'host':ES_HOST,'port':ES_PORT}])


def get_returnrate_content(index_name, text_id):
	query_body = {"query":{"match":{"_id":text_id}}}
	res = es.search(index=index_name, doc_type='type1', body=query_body,request_timeout=100)
	print(res)
	content = res['hits']['hits'][0]['_source']
	return content

def get_promise_content(index_name, text_id):
	query_body = {"query":{"match":{"_id":text_id}}}
	res = es.search(index=index_name, doc_type='type1', body=query_body,request_timeout=100)
	content = res['hits']['hits'][0]['_source']
	return content


def get_adContent(entity_name, score, index_name, type):
	query_body = {"sort":{"publish_time":{"order":"desc"}},
					"query":{
						"bool":{
							"must":[
								{"match":{"content":entity_name}},
								{"match":{"ad01":1}}
								]
							}
						}
					}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	#print(res)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			text_id = item['_id']
			if(item['_score'] >= score):
				#print item
				if entity_name in item['_source']['content']:
					res = item['_source']
					res['text_id'] = text_id
					results.append(res)
	return results

def get_commentContent(entity_name, score, index_name, type):
	query_body = {"sort":{"publish_time":{"order":"desc"}},
					"query":{
						"bool":{
							"must":[
								{"match":{"content":entity_name}},
								{"match":{"ad01":1}}
									],
							"should":[
								{"match":{"sent":1}},
								{"match":{"sent":2}},
								{"match":{"sent":3}}
									]
								}
							}
				}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	#print(res)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			text_id = item['_id']
			print item['_score']
			if(item['_score'] >= score):
				#print item
				if entity_name in item['_source']['content']:
					res = item['_source']
					res['text_id'] = text_id
					results.append(res)
	return results







