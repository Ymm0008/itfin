var entity_name ,firm_name;

// 备 编辑基本信息用
var operation_mode_1 = 0;
var date_1,entity_id_1,gs_date_1,entity_type_1;

// 备 恢复/停止监测用
var monitor_status_1;

//====基本信息====
    var basicInfor_url='/index/entityType/?id='+pid+'&type='+type;
    public_ajax.call_request('get',basicInfor_url,basicInfor);
    function basicInfor(data){
        // console.log(data);
        var item=data[0];

        // 判断监测状态
        monitor_status_1 = item.monitor_status;//保存当前状态
        if(item.monitor_status == 1){//正在监测状态
            $('.nameStatus').text('正在监测');
            $('.status-1').html('<i class="icon icon-retweet"></i>&nbsp;停止监测');
        }else if(item.monitor_status == 2){//（状态）已停止监测
            $('.nameStatus').text('已停止监测');
            $('.status-1').html('<i class="icon icon-retweet"></i>&nbsp;恢复监测');
        }

        var t1='',t2='',t3='否',t4='0',t5='0',t6='否',operationMode,legalPerson,capital;
        if (item.entity_type==1){t1='平台';}else if (item.entity_type==2){t1='公司';}else if (item.entity_type==1){t1='项目';}else {t1=''}
        if (item.set_time){t2=item.set_time;}//成立时间
        $('.location').text(item.regist_address||''); //注册地
        if (item.operation_mode==1){
            operationMode = '互联网金融';
        }else{
            // operationMode = item.operation_mode;
            operationMode = '互联网金融';
        }
        if(item.legal_person){legalPerson = item.legal_person};
        if(item.capital){capital = item.capital+'万元'}
        $('.type-1').text(operationMode);//运营模式
        $('.type-2').text(t1);
        $('.type-3').text(t2);//成立时间
        $('.type-4').text(legalPerson);//法人代表
        $('.type-5').text(capital);//注册资本
        $('.isPlatformName').text(item.company || '');//工商注册公司名称：

        // //风险评价
        // if (item.illegal_type==1){//是否疑似非法集资
        //     t3='是';
        // }else{
        //     //隐藏下面的内容和右边表格
        //     $('.val-2').parents('p').css('display','none');
        //     $('.val-3').parents('p').css('display','none');
        //     $('.val-4').parents('p').css('display','none');
        //     $('.val-5').parents('p').css('display','none');
        //     $('.riskRight').css('display','none');
        // }
        // $('.val-1').text(t3);

        // if (item.risk_level!=''&&item.risk_level!='null'&&item.risk_level!='unknown'&&!item.risk_level&&item.risk_level!='None'){
        //     t4=item.risk_level;
        // }
        // $('.val-2').text(item.risk_level);//风险等级

        // if (item.impact_level!=''&&item.impact_level!='null'&&item.impact_level!='unknown'&&!item.impact_level&&item.impact_level!='None'){
        //     t5=item.impact_level;
        // }
        // $('.val-3').text(item.impact_level);//影响等级

        // $('.val-4').text(item.operation_mode||'');
        // if (item.penalty_status==1){t6='是';}
        // $('.val-5').text(t6);

        // // 股东信息
        // var holderDetail = [];
        // if(item.holder_detail != ''){
        //     holderDetail =  item.holder_detail.split('&');
        //     var str = '';
        //     for(var i=0;i<holderDetail.length;i++){
        //         holderDetail[i] = holderDetail[i].replace(':',"---");
        //         str += '<p style="text-align:left;margin:0 0 20px 0;"><span style="">股东名称：'+holderDetail[i]+'万元</span></p>';
        //     }
        //     $('.mid-3').html(str);
        // }else {
        //     $('.mid-3').text('暂无记录');
        // }

        // 取出entity_name
        entity_name = item.entity_name;
        // console.log(entity_name)

        // 取出公司名称
        firm_name = item.firm_name;

        operation_mode_1 = item.operation_mode;
        date_1 = item.date;
        entity_id_1 = parseInt(item.entity_id);
        gs_date_1 = item.gs_date;
        entity_type_1 = parseInt(item.entity_type);

        // // 子公司分公司情况
        // var table_1_url = '/index/sub_firm/?firm_name='+firm_name;
        // // var table_1_url = '/index/sub_firm/?firm_name=广西联银投资有限公司';//测试子公司分公司情况

        // // // 股东情况
        // // var table_2_url = '/index/holder/?firm_name='+firm_name;
        // // // var table_2_url = '/index/holder/?firm_name=广西联银投资有限公司';//测试股东情况
        // // public_ajax.call_request('get',table_2_url,table_2);

        // // 经营异常
        // var comment_url = '/index/abnormal_info/?firm_name='+firm_name;
        // // var comment_url = '/index/abnormal_info/?firm_name=信和财富投资管理（北京）有限公司绍兴分公司';//测试
        // var uncontact_abnormal_num = item.uncontact_abnormal_num;//无法联系类异常数
        // var fake_abnormal_num = item.fake_abnormal_num;//弄虚作假类异常数
        // var daily_report_abnormal_num = item.daily_report_abnormal_num;//未公布年报类异常数
        // var other_abnormal_num = item.other_abnormal_num;//其他类异常数

        // // 信息变更
        // var inforChange_url='/index/change_info/?firm_name='+firm_name;
        // var people_change_num = item.people_change_num;//人员类变更数量
        // var operation_change_num = item.operation_change_num;//经营类变更数量
        // var capital_change_num = item.capital_change_num;//资本类变更数量
        // var other_change_num = item.other_change_num;//其他类变更数量

        // // 诉讼记录
        // var lawsuit_url = '/index/law_info/?firm_name='+firm_name;
        // // var lawsuit_url = '/index/law_info/?firm_name=中信银行股份有限公司';//测试
        // var admin_suit_num = item.admin_suit_num;//行政类诉讼数量
        // var civil_suit_num = item.civil_suit_num;//民事诉讼数量
        // var crime_suit_num = item.crime_suit_num;//刑事诉讼数量
        // var other_suit_num = item.other_suit_num;//其他诉讼数量

        // // 子公司分公司情况
        // public_ajax.call_request('get',table_1_url,table_1);
        // // 经营异常
        // public_ajax.call_request('get',comment_url,commentTable);
        // $('.business_1').text(uncontact_abnormal_num);
        // $('.business_2').text(fake_abnormal_num);
        // $('.business_3').text(daily_report_abnormal_num);
        // $('.business_4').text(other_abnormal_num);
        // // 信息变更
        // public_ajax.call_request('get',inforChange_url,inforChange);
        // $('.inforChange_1').text(people_change_num);
        // $('.inforChange_2').text(operation_change_num);
        // $('.inforChange_3').text(capital_change_num);
        // $('.inforChange_4').text(other_change_num);
        // // 诉讼记录
        // public_ajax.call_request('get',lawsuit_url,lawsuit);
        // $('.lawsuit_1').text(admin_suit_num);
        // $('.lawsuit_2').text(civil_suit_num);
        // $('.lawsuit_3').text(crime_suit_num);
        // $('.lawsuit_4').text(other_suit_num);

        // // 广告内容
        // var billing_url = '/index/ad_content/?entity_name='+entity_name;

        // 评论信息【舆情内容】
        var commentinforContent_url = '/index/comment_content/?entity_name='+entity_name;

        // // console.log(billing_url);
        // public_ajax.call_request('get',billing_url,billing_1);

        public_ajax.call_request('get',commentinforContent_url,commentinforContent_1);
    }

// 基本信息编辑
    $('#card-edit').on('click',function(){
        $('#editCard').modal('show');

        // 值 渲染到input
        var select_url = '/detection/OperationModeBox/';    //运营模式
        public_ajax.call_request('get',select_url,slectUrl);
        function slectUrl(data){
            if(data){
                var str = '';
                for(var i=0;i<data.length;i++){
                    str += '<option value="'+data[i].id+'">'+data[i].operation+'</option>'
                }
                $('#editCard .user-1 .u1_Val').append(str);

                // console.log(operation_mode_1);
                // $("#editCard .user-1 select option[value='"+operation_mode_1+"']").attr('selected',"selected");
                $("#editCard .user-1 select").val(operation_mode_1);
            }
        }
        // console.log(operation_mode_1);
        // $("#editCard .user-1 select option[value='"+operation_mode_1+"']").attr('selected',"selected");
        // 注册地
        $('#editCard .user-2 input').val($('.location').text());
        // 成立时间
        $('#editCard .user-3 input').val($('.type-3').text());
        // 法人代表
        $('#editCard .user-4 input').val($('.type-4').text());
        // 注册资本
        var show_capital_val = $('.type-5').text();
        show_capital_val = show_capital_val.substr(0, show_capital_val.length - 2);
        $('#editCard .user-5 input').val(show_capital_val);
        // 工商注册公司名称
        $('#editCard .user-6 input').val($('.isPlatformName').text());
        // 旗下产品
        // $('#editCard .user-4 input').attr('value',$('.type-4').text());

        // 确定提交修改的信息
        $('#sure').on('click',function(){
            var libaryList=[]; //用于传给后台的数据

            // 注册资本  去掉万元
            var capital_val = $('#editCard .user-5 input').val();
            // capital_val = capital_val.substr(0, capital_val.length - 2);

            var company_val;
            if($('#editCard .user-6 input').val() == ''){
                company_val = 'null';
            }else{
                company_val = $('#editCard .user-6 input').val();//工商注册公司名称
            }
            var set_time_val = $('#editCard .user-3 input').val();//成立时间
            var legal_person_val = $('#editCard .user-4 input').val();//法人代表
            var regist_address_val = $('#editCard .user-2 input').val();//注册地
            var operation_mode_val = parseInt($('#editCard .user-1 select').val());//运营模式

            libaryList.push({
                capital:capital_val,
                company:company_val,

                date:date_1,
                entity_id:entity_id_1,
                gs_date:gs_date_1,
                type:entity_type_1,

                legal_person:legal_person_val,
                operation_mode:operation_mode_val,
                regist_address:regist_address_val,
                set_time:set_time_val
            });
            console.log(libaryList);
            var EditDetail_url = '/index/EditDetail/';
            $.ajax({
                url:EditDetail_url,
                type:'POST',
                contentType:'application/json',
                // data:JSON.stringify(LL_data),
                data:JSON.stringify(libaryList),
                dataType:'json',
                success:function(data){
                    // console.log(data);
                    if(data.status == 'ok'){
                        $('#editCard').modal('hide');
                        $('#saveSuccess').modal('show');
                        // 重新渲染 基本信息
                        var basicInfor_url='/index/entityType/?id='+pid+'&type='+type;
                        public_ajax.call_request('get',basicInfor_url,basicInfor);

                    }
                }
            })
        })

    })

// 停止/恢复监测
    $('.status-1').on('click',function(){
        $('#MonitorStatus_off .modal-body span').hide();
        // console.log(monitor_status_1);
        if(monitor_status_1 == 1){//正在监测状态 点击停止监测
            $('#MonitorStatus_off .modal-header h4').text('停止监测');
            $('#MonitorStatus_off #reason_text').val('');
            $('#MonitorStatus_off').modal('show');
        }else if(monitor_status_1 == 2){//(状态)已停止监测 点击恢复监测
            $('#MonitorStatus_off .modal-header h4').text('恢复监测');
            $('#MonitorStatus_off #reason_text').val('');
            $('#MonitorStatus_off').modal('show');
        }
    })
    $('#sure_4').on('click',function(){
        var remark_text = $('#reason_text').val();
        if(remark_text == ''){
            $('#MonitorStatus_off .modal-body span').show();
            $('#MonitorStatus_off #reason_text').focus(function(){
                $('#MonitorStatus_off .modal-body span').hide();
            })
            return false;
        }else {
            var MonitorStatus_off_url;
            $('#MonitorStatus_off .modal-body span').hide();
            if(monitor_status_1 == 1){//正在监测状态 点击停止监测
                MonitorStatus_off_url = '/index/MonitorStatus/?entity_name='+entity_name+'&log_type=1&remark='+remark_text;
                public_ajax.call_request('get',MonitorStatus_off_url,MonitorStatusOff);
            }else if(monitor_status_1 == 2){//(状态)已停止监测 点击恢复监测
                MonitorStatus_off_url = '/index/MonitorStatus/?entity_name='+entity_name+'&log_type=2&remark='+remark_text;
                public_ajax.call_request('get',MonitorStatus_off_url,MonitorStatusOff);
            }
        }
    })
    function MonitorStatusOff(data){
        if(data.status == 'ok'){
            // console.log("修改成功");
            $('#saveSuccess').modal('show');
            // 重新渲染基本信息
            var basicInfor_url='/index/entityType/?id='+pid+'&type='+type;
            public_ajax.call_request('get',basicInfor_url,basicInfor);
        }
    }

// 舆情趋势分析
    var trend_url='/index/comment/?id='+pid;
    public_ajax.call_request('get',trend_url,line_2);
    function line_2(data) {
        if(data){
            var day30Data_0 = [],day30Data_1 = [],day30Data_2 = [];
            // 时间
            var date = [];
            for(var i=0;i<data.length;i++){
                // 一般负面评论
                day30Data_0.push(data[i].em0_text_webo+data[i].em0_text_bbs+data[i].em0_text_zhihu+data[i].em0_text_forum+data[i].em0_text_wechat);
                // 严重负面评论
                day30Data_1.push(data[i].em1_text_webo+data[i].em1_text_bbs+data[i].em1_text_zhihu+data[i].em1_text_forum+data[i].em1_text_wechat);
                // // 积极评论
                // day30Data_2.push(data[i].sent2_webo+data[i].sent2_bbs+data[i].sent2_zhihu+data[i].sent2_forum+data[i].sent2_wechat);
                // 时间
                date.push(data[i].date);
            }
        }
        // var item = data[0];
        // var day30Data_0 = [];
        // var day30Data_1 = [];
        // var day30Data_2 = [];
        // day30Data_0.push(item.sent0_webo+item.sent0_bbs+item.sent0_zhihu+item.sent0_forum+item.sent0_wechat);
        // day30Data_1.push(item.sent1_webo+item.sent1_bbs+item.sent1_zhihu+item.sent1_forum+item.sent1_wechat);
        // day30Data_2.push(item.sent2_webo+item.sent2_bbs+item.sent2_zhihu+item.sent2_forum+item.sent2_wechat);
        // var date = [];
        // date.push(item.date);

        var myChart = echarts.init(document.getElementById('opinion'));
        var option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['一般负面评论','严重负面评论']
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                // data: day30
                data: date
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name:'一般负面评论',
                    type:'line',
                    // smooth:true,
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:day30Data_0,
                    itemStyle:{normal:{areaStyle:{type:'default'}}},
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'},
                    //         {type: 'min', name: '最小值'}
                    //     ]
                    // },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                },
                {
                    name:'严重负面评论',
                    type:'line',
                    // smooth:true,
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:day30Data_1,
                    itemStyle:{normal:{areaStyle:{type:'default'}}},
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'},
                    //         {type: 'min', name: '最小值'}
                    //     ]
                    // },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                },
                // {
                //     name:'积极评论',
                //     type:'line',
                //     smooth:true,
                //     data:day30Data_2,
                //     itemStyle:{normal:{areaStyle:{type:'default'}}},
                //     markPoint: {
                //         data: [
                //             {type: 'max', name: '最大值'},
                //             {type: 'min', name: '最小值'}
                //         ]
                //     },
                //     markLine: {
                //         data: [
                //             {type: 'average', name: '平均值'}
                //         ]
                //     }
                // },
            ]
        };
        myChart.setOption(option);
        _myChart2 = myChart;
    }

//====舆情内容====
    //评论信息

    // 所有的数据
    var commentarticalList={};
    // 部分数据
    var commentarticalList_part={};

    function commentinforContent_1(data,el,channel) {
        // console.log(data)
        if(data.length == 0){
            $('#commentinforContent p.load').text('暂无记录');
        }else {
            var com ='#commentinforContent'.toString().substring(1);
            $('#commentinforContent').bootstrapTable('load', data);
            $('#commentinforContent').bootstrapTable({
                data:data,
                search: false,//是否搜索
                pagination: true,//是否分页
                pageSize: 5,//单页记录数
                pageList: [15,20,25],//分页步进值
                sidePagination: "client",//服务端分页
                searchAlign: "left",
                searchOnEnterKey: false,//回车搜索
                showRefresh: false,//刷新按钮
                showColumns: false,//列选择按钮
                buttonsAlign: "right",//按钮对齐方式
                locale: "zh-CN",//中文支持
                detailView: false,
                showToggle:false,
                sortName:'bci',
                sortOrder:"desc",
                columns: [
                    {
                        title: "",//标题
                        field: "",//键名
                        sortable: true,//是否可排序
                        order: "desc",//默认排序方式
                        align: "center",//水平
                        valign: "middle",//垂直
                        formatter: function (value, row, index) {
                            var publishTime = getLocalTime_2(row.publish_time);
                            var contentClip;
                            if(row.content.length >= 200){
                                contentClip = row.content.slice(0,200)+'  ...';
                                commentarticalList_part[com+'_'+index] = contentClip;
                            }else{
                                contentClip = row.content;
                                commentarticalList_part[com+'_'+index] = contentClip;
                            }
                            // 所有的数据
                            commentarticalList[com+'_'+index] = row.content;
                            // 评论倾向
                            var sent = '负面';

                            // if(row.sent == 0){
                            //     sent = '消极';
                            // }else if(row.sent == 1){
                            //     sent = '中性';
                            // }else if(row.sent == 2){
                            //     sent = '积极';
                            // }else{
                            //     sent = '未知';
                            // }
                            // 评论来源
                            var source;
                            if(row.source == 'wechat'){
                                source = '微信';
                            }else if(row.source =='zhihu'){
                                source = '知乎';
                            }else if(row.source =='bbs'){
                                source = '论坛';
                            }else if(row.source =='webo'){
                                source = '微博';
                            }else if(row.source =='forum'){
                                source = '贴吧';
                            }else{
                                source = '未知';
                            }

                            // 原网页链接
                            var url;
                            if(row.url){
                                url = row.url;
                            }else{
                                url = row.u;
                            }

                            return '<div class="inforContent" id="commentinforContent">'+
                                '                <div class="main">'+
                                '                    <img src="/static/images/textIcon.png" class="textFlag" style="top:8px;">'+
                                '                    <p class="option">'+
                                '                        <span>评论倾向：<b style="color: #ff6d70;font-size:16px;">'+sent+'</b></span>'+
                                '                        <span>评论来源：<b style="color: #ff6d70;font-size:16px;">'+source+'</b></span>'+
                                '                        <span>发布时间：<b style="color: #ff6d70;font-size:16px;">'+publishTime+'</b></span>'+
                                '                        <button class="originalbtn btn-primary btn-xs" onclick="getAllcommtentartical(\''+com+'_'+index+'\')" artical=\"'+com+'_'+index+'\">查看全文</button>'+
                                '                    </p>'+
                                '                    <p class="context">'+contentClip+'</p>'+
                                '                <a href="'+url+'" title="原网页链接" target="_blank">原网页链接</a>            '+
                                '                </div>'+
                                '            </div>';
                        }
                    },
                ],
            });
            $('#commentinforContent p.load').hide();
        }
    };

    function getAllcommtentartical (_id){
        var nowText = $("button[artical = "+ _id +"]").text();
        // console.log(articalList[_id]);
        $("button[artical = "+ _id +"]").parents('.main').find('.context').text(commentarticalList[_id]);
        $("button[artical = "+ _id +"]").text('收起');
        if(nowText == '收起'){
            $("button[artical = "+ _id +"]").parents('.main').find('.context').text(commentarticalList_part[_id]);
            $("button[artical = "+ _id +"]").text('查看全文');
        }
    }


/*

function line_1() {
    var myChart = echarts.init(document.getElementById('income'),'chalk');
    var option = {
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['']
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:'数量',
                type:'line',
                smooth:true,
                data:[11, 11, 15, 13, 12, 13, 10],
                itemStyle:{normal:{areaStyle:{type:'default'}}},
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };
    myChart.setOption(option);
}
line_1();
function line_2() {
    var myChart = echarts.init(document.getElementById('modal-1'),'chalk');
    var option = {
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['']
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:'数量',
                type:'line',
                smooth:true,
                data:[11, 11, 15, 13, 12, 13, 10],
                itemStyle:{normal:{areaStyle:{type:'default'}}},
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };
    myChart.setOption(option);
}
line_2();

 */

