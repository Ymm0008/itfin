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
	query_body = {
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
	#print(hits)
	results = []
	if(len(hits)):
		for item in hits:
			text_id = item['_id']
			if(item['_score'] >= score):
			#print item
				if entity_name in item['_source']['content']:
					result = item['_source']
					#res['text_id'] = text_id
					results.append(result)
	return results

def get_commentContent(entity_name, score, index_name, type):
	query_body = {
				"query":{
					"bool":{
						"must":{"match":{"content":entity_name}},
						"should":[
							{"match":{"sent":0}},
							{"match":{"sent":1}},
							{"match":{"sent":2}}
								],
						"minimum_should_match" : 1
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
				print item
				if entity_name in item['_source']['content']:
					result = item['_source']
					#res['text_id'] = text_id
					results.append(result)
	return results


def get_ab_info(index_name,type,firm_name):
	query_body = {"sort":{"in_date":{"order":"desc"}},"query":{"match":{"firm_name":firm_name}}}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			results.append(item['_source'])
	return results

def get_ch_info(index_name,type,firm_name):
	query_body = {"sort":{"change_time":{"order":"desc"}},"query":{"match":{"firm_name":firm_name}}}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			results.append(item['_source'])
	return results

def get_law_info(index_name,type,firm_name):
	query_body = {"sort":{"date":{"order":"desc"}},"query":{"match":{"firm_name":firm_name}}}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			results.append(item['_source'])
	return results



def get_subfirmContent(firm,index_name):
	type_name = 'invest_info'
	query_body = {
		"query": {
			"filtered": {
				"filter": {
					"bool": {
						"must": [{"term": {"firm_name": firm}},
								 # {"term": {"holder_type": u'公司'}}
								 ]
					}

				}
			}
		}

	}

	try:
		result = es.search(index=index_name, doc_type=type_name, body=query_body)['hits']['hits']
	except Exception, e:
		print e
		return []
	# 去掉重复文本
	unique_result = []
	for item in result:
		if item['_source'] not in unique_result:
			unique_result.append(item['_source'])
	return unique_result
