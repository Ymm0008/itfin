#!/usr/bin/env python
#encoding: utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from elasticsearch import Elasticsearch
from duplicate import duplicate
from pybloom import ScalableBloomFilter
from economy.config import *

es = Elasticsearch([{'host':ES_HOST,'port':ES_PORT}])

def get_returnrate_content(index_name, text_id):
	query_body = {"size":500,"query":{"match":{"_id":text_id}}}
	res = es.search(index=index_name, doc_type='type1', body=query_body,request_timeout=100)
	content = res['hits']['hits'][0]['_source']
	return content

def get_promise_content(index_name, text_id):
	query_body = {"size":500,"query":{"match":{"_id":text_id}}}
	res = es.search(index=index_name, doc_type='type1', body=query_body,request_timeout=100)
	content = res['hits']['hits'][0]['_source']
	return content


def get_adContent(entity_name, score, index_name, type):
	query_body = {	"size":200,
					"query":{
						"bool":{
							"must":{"match":{"content":entity_name}},
							"should":[
								{"match":{"ad123":2}},
								{"match":{"ad123":3}}
								],
							"minimum_should_match":1
							}
						}
					}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			name = item['_index']
			if(item['_score'] >= score):
				if entity_name in item['_source']['content']:
					result = item['_source']
					result.update({'source':name})
					results.append(result)
	# 按发布时间排序
	results.sort(key=lambda x: x['publish_time'], reverse=True)
	# 根据文本相似度去重
	dup_results = duplicate(results)
	return dup_results
	# return results

def get_commentContent(entity_name, score, index_name, type):
	query_body = {	"size":200,
					"query":{
						"bool":{
							"must":{"match":{"content":entity_name}},
							"should":[
								{"match":{"em1":0}},
								{"match":{"em1":1}}
									],
							"minimum_should_match" : 1
								}
							}
				}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			name = item['_index']
			if(item['_score'] >= score):
				if entity_name in item['_source']['content']:
					result = item['_source']
					result.update({'source':name})
					results.append(result)
	# 按发布时间排序
	results.sort(key=lambda x: x['publish_time'], reverse=True)
	# 根据文本相似度去重
	dup_results = duplicate(results)
	return dup_results
	# return results


def get_ab_info(index_name,type,firm_name):
	query_body = {"size":100,"sort":{"in_date":{"order":"desc"}},"query":{"match":{"firm_name":firm_name}}}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			results.append(item)
	# 去掉重复文本
	unique_result = []
	# if(len(results)):
	for item in results:
		if item['_source'] not in unique_result:
			unique_result.append(item['_source'])
	return unique_result
	# return results

def get_ch_info(index_name,type,firm_name):
	query_body = {"size":100,"sort":{"change_time":{"order":"desc"}},"query":{"match":{"firm_name":firm_name}}}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			results.append(item)
	# 去掉重复文本
	unique_result = []
	for item in results:
		if item['_source'] not in unique_result:
			unique_result.append(item['_source'])
	return unique_result
	# return results

def get_law_info(index_name,type,firm_name):
	query_body = {"size":100,"sort":{"date":{"order":"desc"}},"query":{"match":{"firm_name":firm_name}}}
	res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
	hits = res['hits']['hits']
	results = []
	if(len(hits)):
		for item in hits:
			results.append(item)
	# 去掉重复文本
	unique_result = []
	for item in results:
		if item['_source'] not in unique_result:
			unique_result.append(item['_source'])
	return unique_result
	# return results



def get_subfirmContent(firm,index_name):
	type_name = 'invest_info'
	query_body = {	"size":500,
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
		#print e
		return []
	# 去掉重复文本
	unique_result = []
	for item in result:
		if item['_source'] not in unique_result:
			unique_result.append(item['_source'])
	return unique_result

def get_holderContent(firm,index_name):
	type_name = 'holder_info'
	query_body = {"size": 500,
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
		# print e
		return []
	# 去掉重复文本
	unique_result = []
	for item in result:
		if item['_source'] not in unique_result:
			unique_result.append(item['_source'])
	return unique_result


def get_perceive_content(index_name,type,text_id):
	list = []
	for id in text_id.split(','):
		query_body = {
				"query":{
					"match":{
						"_id":id
					}
				}
		}
		result = es.search(index=index_name,doc_type=type,body=query_body)['hits']['hits'][0]['_source']
		list.append(result)
	return list


#首页
def getHotSpot(entity_list):
	type = 'type1'
	results = []
	number = 0
	for dict in entity_list:
		indexB = ScalableBloomFilter(1000,0.001)
		for index_name in ['bbs','forum','webo']:
			query_body = {
					"sort":{"publish_time":{"order":"desc"}},
					"query": {
						"bool": {
							"must": [
								{
								"match": {
									"content": dict['name']
									}
								},
									{
								"match": {
									"em1": 1
									}
								}
							]
						}
					}
				}
			res = es.search(index=index_name, doc_type=type, body=query_body, request_timeout=100)
			hits = res['hits']['hits']
			if(len(hits)):
				for item in hits:
					if dict['name'] in item['_source']['content']:
						if not index_name in indexB:
							if number < 10:
								id = dict['id']
								entity_name = dict['name']
								entity_type = dict['entity_type']
								content = item['_source']['content']
								results.append({'id':id,'name':entity_name,'content':content,'entity_type':entity_type})
								[indexB.add(index_name)]
								number += 1
		if not number < 10:
			break
	return results

