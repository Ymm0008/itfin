#!/usr/bin/env python
# coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

INDEX_NAME = {"bbs":"bbs","weibo":"weibo","zhihu":"zhihu","forum":"forum","wechat":"wechat"}
TYPE = {"bbs":"type1","webo":"type1","zhihu":"type2","forum":"type1","wechat":"type1"}

TABLE_ENTITY_LIST = 'entity_list'
TABLE_PLAT_DETAIL = 'plat_detail_daily'
TABLE_COMPANY_DETAIL = 'company_detail'
TABLE_PROJECT_DETAIL = 'project_detail'
TABLE_GONGSHANG = 'gongshang_daily'
TABLE_AD_STATIS = 'ad_statis_daily'
TABLE_COMMENT_STATIS = 'comment_statis_daily'
TABLE_GUARANTEE_PROMISE = 'guarantee_promise_daily'
TABLE_RETURN_RATE = 'return_rate_daily'