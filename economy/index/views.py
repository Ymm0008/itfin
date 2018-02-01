#!/usr/bin/env python
#encoding: utf-8

from flask import Flask, render_template, request, jsonify, Blueprint, send_from_directory, url_for
from economy.db import *
from . import index
import json
from economy.es import *
from economy.config import *
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

plat_field = ['id','entity_type','pd_entity_name','start_time','entity_source','link_entity_id','in_type','in_time','monitor_status','pd.id','entity_id','entity_name','company','date','operation_mode','illegal_type','risk_level','impact_level','penalty_status','related_company','related_plat','related_person','follower','bg','avg_return','vol','investor','problem','debt_num','daily_input','daily_balance','inv_period','imprs','gs_id','firm_name','entity_id','gs_date','province','city','district','regist_address','up1_level_num','up2_level_num','up3_level_num','down1_level_num','down2_level_num','down3_level_num','admin_suit_num','civil_suit_num','crime_suit_num','other_suit_num','uncontact_abnormal_num','fake_abnormal_num','daily_report_abnormal_num','other_abnormal_num','people_change_num','operation_change_num','capital_change_num','other_change_num','legal_person','capital','holder_detail','set_time']
com_field = ['id','entity_type','cd_entity_name','start_time','entity_source','link_entity_id','in_type','in_time','monitor_status','cd.id','entity_id','entity_name','date','monitor_status','operation_mode','illegal_type','risk_level','impact_level','penalty_status','related_company','related_plat','related_person','gs_id','firm_name','entity_id','gs_date','province','city','district','regist_address','up1_level_num','up2_level_num','up3_level_num','down1_level_num','down2_level_num','down3_level_num','admin_suit_num','civil_suit_num','crime_suit_num','other_suit_num','uncontact_abnormal_num','fake_abnormal_num','daily_report_abnormal_num','other_abnormal_num','people_change_num','operation_change_num','capital_change_num','other_change_num','legal_person','capital','holder_detail','set_time']
pro_field = ['id','entity_type','p_entity_name','start_time','entity_source','link_entity_id','in_type','in_time','monitor_status','p.id','entity_id','entity_name','date','operation_mode','illegal_type','risk_level','impact_level','penalty_status','related_company','related_plat','related_person','gs_id','firm_name','entity_id','gs_date','province','city','district','regist_address','up1_level_num','up2_level_num','up3_level_num','down1_level_num','down2_level_num','down3_level_num','admin_suit_num','civil_suit_num','crime_suit_num','other_suit_num','uncontact_abnormal_num','fake_abnormal_num','daily_report_abnormal_num','other_abnormal_num','people_change_num','operation_change_num','capital_change_num','other_change_num','legal_person','capital','holder_detail','set_time']

ad_field = ['id','entity_id','entity_name','date','ad0_bbs','ad0_forum','ad0_webo','ad0_wechat','ad1_bbs','ad1_forum','ad1_webo','ad1_wechat','inf1_bbs','inf1_forum','inf1_webo','inf1_wechat','inf2_bbs','inf2_forum','inf2_webo','inf2_wechat','inf3_bbs','inf3_forum','inf3_webo','inf3_wechat','ad0_zhihu','ad1_zhihu','inf1_zhihu','inf2_zhihu','inf3_zhihu']
comment_field = ['id','entity_id','entity_name','date','em0_word_bbs','em0_word_forum','em0_word_webo','em0_word_wechat','em0_text_bbs','em0_text_forum','em0_text_webo','em0_text_wechat','em1_word_bbs','em1_word_forum','em1_word_webo','em1_word_wechat','em0_word_zhihu','em0_text_zhihu','em1_word_zhihu','em1_text_bbs','em1_text_forum','em1_text_webo','em1_text_wechat','em1_text_zhihu']
gongshang_field = ['id','firm_name','entity_id','date','province','city','district','location','up1_level_num','up2_level_num','up3_level_num','down1_level_num','down2_level_num','down3_level_num','admin_suit_num','civil_suit_num','crime_suit_num','other_suit_num','uncontact_abnormal_num','fake_abnormal_num','daily_report_abnormal_num','other_abnormal_num','people_change_num','poertaion_change_num','capital_change_num','other_change_num']
guarantee_promise_field = ['id','entity_id','entity_name','date','promise_type','promise_num','related_text','index_name','text_id','rule_id']
return_rate_field = ['id','entity_id','entity_name','date','return_type','return_rate','related_text','index_name','text_id','rule_id','avg_return']

table_field = ['date','illegal_type']

@index.route('/platform/')
def platform():
    return render_template('index/platform.html')

@index.route('/monitor/')
def monitor():
    name = request.args.get('name','')
    flag = request.args.get('flag','')
    pid = request.args.get('pid','')
    return render_template('index/monitorDetails.html',name=name,flag=flag,pid=pid)

@index.route('/company/')
def company():
    name = request.args.get('name','')
    flag = request.args.get('flag','')
    pid = request.args.get('pid','')
    return render_template('index/company.html',name=name,flag=flag,pid=pid)

@index.route('/project/')
def project():
    name = request.args.get('name','')
    flag = request.args.get('flag','')
    return render_template('index/project.html',name=name,flag=flag)

@index.route('/entityType/')
def entity_type():
    id = int(request.args.get('id',''))
    type = int(request.args.get('type',''))
    if type == 1:
        result = platform_detail(TABLE_ENTITY_LIST,TABLE_PLAT_DETAIL,TABLE_GONGSHANG,id,plat_field)
    elif type == 2:
        result = company_detail(TABLE_ENTITY_LIST,TABLE_COMPANY_DETAIL,TABLE_GONGSHANG,id,com_field)
    elif type == 3:
        result = project_detail(TABLE_ENTITY_LIST,TABLE_PROJECT_DETAIL,TABLE_GONGSHANG,id,pro_field)
    return json.dumps(result,ensure_ascii=False)


@index.route('/ad/')
def adData():
    id = int(request.args.get('id',''))
    result = get_ad(TABLE_AD_STATIS,id,ad_field)
    return json.dumps(result,ensure_ascii=False)

@index.route('/comment/')
def commentData():
    id = int(request.args.get('id',''))
    result = get_comment(TABLE_COMMENT_STATIS,id,comment_field)
    return json.dumps(result,ensure_ascii=False)

@index.route('/gongshang/')
def gongshangData():
    id = int(request.args.get('id',''))
    result = get_gongshang(TABLE_GONGSHANG,id,gongshang_field)
    return json.dumps(result,ensure_ascii=False)

@index.route('/guarantee/')
def guaranteeData():
    id = int(request.args.get('id',''))
    result = get_guarantee(TABLE_GUARANTEE_PROMISE,id,guarantee_promise_field)
    return json.dumps(result,ensure_ascii=False)

@index.route('/returnRate/')
def returnRateData():
    type = int(request.args.get('type',''))
    id = int(request.args.get('id',''))
    if type == 1:
        result = get_return_rate(TABLE_RETURN_RATE,TABLE_PLAT_DETAIL,id,return_rate_field)
    elif type == 2:
        result = get_return_rate(TABLE_RETURN_RATE,TABLE_COMPANY_DETAIL,id,return_rate_field)
    elif type == 3:
        result = get_return_rate(TABLE_RETURN_RATE,TABLE_PROJECT_DETAIL,id,return_rate_field)
    #result = get_return_rate('return_rate',id,return_rate_field)
    return json.dumps(result,ensure_ascii=False)


@index.route('/returnRate_content/')
def returnrateContent():
    index_name = request.args.get('index_name','')
    text_id = request.args.get('text_id','')
    result = get_returnrate_content(index_name,text_id)
    return json.dumps(result,ensure_ascii=False)

@index.route('/promise_content/')
def promiseContent():
    index_name = request.args.get('index_name','')
    text_id = request.args.get('text_id','')
    result = get_promise_content(index_name,text_id)
    return json.dumps(result,ensure_ascii=False)


@index.route('/ad_content/')
def adContent():
    results = []
    entity_name = request.args.get('entity_name','')
    for each in TYPE.items():
        index_name = each[0]
        type = each[1]
        result = get_adContent(entity_name, 0.5, index_name, type)
        for each in result:
            results.append(each)
    results.sort(key=lambda x:x['publish_time'],reverse=True)
    return json.dumps(results[0:50],ensure_ascii=False)

@index.route('/comment_content/')
def commentContent():
    results = []
    entity_name = request.args.get('entity_name','')
    for each in TYPE.items():
        index_name = each[0]
        type = each[1]
        result = get_commentContent(entity_name, 0.5, index_name, type)
        for each in result:
            results.append(each)
    results.sort(key=lambda x:x['publish_time'],reverse=True)
    return json.dumps(results[0:50],ensure_ascii=False)


@index.route('/abnormal_info/')
def abnormalInfo():
    firm_name = request.args.get('firm_name','')
    result = get_ab_info('gongshang','abnormal_info',firm_name)
    return json.dumps(result,ensure_ascii=False)

@index.route('/change_info/')
def changelInfo():
    firm_name = request.args.get('firm_name','')
    result = get_ch_info('gongshang','change_info',firm_name)
    return json.dumps(result,ensure_ascii=False)

@index.route('/law_info/')
def lawInfo():
    firm_name = request.args.get('firm_name','')
    result = get_law_info('gongshang','law_info',firm_name)
    return json.dumps(result,ensure_ascii=False)


@index.route('/sub_firm/')
def subfirmContent():
    results = []
    index_name = 'gongshang'
    firm_name = request.args.get('firm_name', '')
    # print firm_name
    level1_subfirms = get_subfirmContent(firm_name,index_name)

    results.append(firm_name)		#根节点
    level1_temp = []
    for item in level1_subfirms:
        level1_temp.append(item['asset_name'])
    results.append({firm_name:level1_temp})


    level2_names = []           #用于存储所有的二级公司名
    level2_subfirms = {}
    for sub_firm in level1_subfirms:
        level2_temp = get_subfirmContent(sub_firm['asset_name'], index_name)
        level2_subfirms[sub_firm['asset_name']] = [x['asset_name'] for x in level2_temp]
        level2_names += [x['asset_name'] for x in level2_temp]

    results.append(level2_subfirms)


    level3_subfirms = {}
    for sub_firm in level2_names:
        level3_temp = get_subfirmContent(sub_firm, index_name)
        level3_subfirms[sub_firm] = [x['asset_name'] for x in level3_temp]
    results.append(level3_subfirms)

    # 返回的数据结构为
    # [根公司，{根公司:[一级子公司A,B,C...]},{一级子公司A:[二级子公司A1,A2,A3],一级子公司B:[二级子公司B1,B2,B3]},{二级子公司A1:[三级子公司a1a2a3]}]

    return json.dumps(results, ensure_ascii=False)

@index.route('/holder/')
def holderContent():
    results = []
    index_name = 'gongshang'
    firm_name = request.args.get('firm_name', '')
    # print firm_name
    level1_holders = get_holderContent(firm_name, index_name)

    results.append(firm_name)  # 根节点
    level1_temp = []
    for item in level1_holders:
        level1_temp.append(item['holder'])
    results.append({firm_name: level1_temp})


    level2_holders = {}
    level2_names = []       #用于存储所有二层公司名
    for item in level1_holders:
        level2_temp = get_holderContent(item['holder'], index_name)
        level2_holders[item['holder']] = [x['holder'] for x in level2_temp]
        level2_names += [x['holder'] for x in level2_temp]
    results.append(level2_holders)

    level3_holders = {}
    for item in level2_names:
        level3_temp = get_holderContent(item, index_name)
        level3_holders[item] = [x['holder'] for x in level3_temp]
    results.append(level3_holders)


    # 返回的数据结构为
    # [根公司，{根公司:[一级股东A,B,C...]},{一级股东A:[二级股东A1,A2,A3],一级股东B:[二级子股东B1,B2,B3]},{二级股东A2:三级股东a1a2a3}]

    return json.dumps(results, ensure_ascii=False)


@index.route('/riskCommentTable/')
def risk_comment_table():
    entity_id = int(request.args.get('entity_id',''))
    type = int(request.args.get('type',''))
    result = get_risk_comment_table(TABLE_PLAT_DETAIL,TABLE_COMPANY_DETAIL,TABLE_PROJECT_DETAIL,entity_id,type,table_field)
    return json.dumps(result,ensure_ascii=False)


@index.route('/EditDetail/',methods=['POST'])
def edit_detail():
    dict = request.get_json()[0]
    if dict['type'] == 1:
        status = EditDetail(TABLE_PLAT_DETAIL,TABLE_GONGSHANG,dict)
    elif dict['type'] == 2:
        status = EditDetail(TABLE_COMPANY_DETAIL,TABLE_GONGSHANG,dict)
    elif dict['type'] == 3:
        status = EditDetail(TABLE_PROJECT_DETAIL,TABLE_GONGSHANG,dict)
    return json.dumps(status,ensure_ascii=False)

@index.route('/EditReturnRate/',methods=['POST'])
def edit_return_rate():
    entity_id = int(request.args.get('entity_id',''))
    return_rate = int(request.args.get('return_rate',''))
    status = EditReturnRate(TABLE_RETURN_RATE,return_rate,entity_id)
    return json.dumps(status,ensure_ascii=False)

@index.route('/EditRelatedPlat/',methods=['POST'])
def edit_related_plat():
    entity_type = int(request.args.get('entity_type',''))
    entity_id = int(request.args.get('entity_id',''))
    related_plat = request.args.get('related_plat','')
    date = request.args.get('date','')
    if entity_type == 1:
        status = EditRelatedPlat(TABLE_PLAT_DETAIL,entity_id,related_plat,date)
    elif entity_type == 2:
        status = EditRelatedPlat(TABLE_COMPANY_DETAIL,entity_id,related_plat,date)
    elif entity_type == 3:
        status = EditRelatedPlat(TABLE_PROJECT_DETAIL,entity_id,related_plat,date)
    return json.dumps(status,ensure_ascii=False)

@index.route('/EditRelatedCompany/',methods=['POST'])
def edit_related_company():
    entity_type = int(request.args.get('entity_type',''))
    entity_id = int(request.args.get('entity_id',''))
    related_company = request.args.get('related_company','')
    date = request.args.get('date','')
    if entity_type == 1:
        status = EditRelatedCompany(TABLE_PLAT_DETAIL,entity_id,related_company,date)
    elif entity_type == 2:
        status = EditRelatedCompany(TABLE_COMPANY_DETAIL,entity_id,related_company,date)
    elif entity_type == 3:
        status = EditRelatedCompany(TABLE_PROJECT_DETAIL,entity_id,related_company,date)
    return json.dumps(status,ensure_ascii=False)

@index.route('/MonitorStatus/')
def monitor_status():
    entity_name = request.args.get('entity_name','')
    log_type = int(request.args.get('log_type',''))
    remark = request.args.get('remark','')
    status = MonitorStatus(TABLE_ENTITY_LIST, TABLE_LOG, entity_name, log_type, remark)
    return json.dumps(status,ensure_ascii=False)