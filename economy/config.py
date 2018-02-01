#!/usr/bin/env python
# coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

#table
TABLE_ENTITY_LIST = 'entity_list'
TABLE_PLAT_DETAIL = 'plat_detail_daily'
TABLE_COMPANY_DETAIL = 'company_detail'
TABLE_PROJECT_DETAIL = 'project_detail'
TABLE_GONGSHANG = 'gongshang_daily'
TABLE_AD_STATIS = 'ad_statis_daily'
TABLE_COMMENT_STATIS = 'comment_statis_daily'
TABLE_GUARANTEE_PROMISE = 'guarantee_promise_daily'
TABLE_RETURN_RATE = 'return_rate_daily'
TABLE_SENSOR = 'sensor_daily'
TABLE_MONITOR = 'monitor_daily'
TABLE_OPERATION_LIST = 'operation_list'
TABLE_ILLEGAL_LIST = 'illegal_list'
TABLE_LOG = 'logs'

#es
ES_HOST = '219.224.134.214'
ES_PORT = 9202
INDEX_NAME = {"bbs":"bbs","weibo":"weibo","zhihu":"zhihu","forum":"forum","wechat":"wechat"}
TYPE = {"bbs":"type1","webo":"type1","zhihu":"type2","forum":"type1","wechat":"type1"}

#db
HOST = "219.224.134.214"
USER = "root"
PASSWORD = ""
DEFAULT_DB = "itfin"
CHARSET = "utf8"
TEST_DB = "zyz"

#para
RISK_LEVEL = 0
