var entity_name ;

// 基本信息
    var basicInfor_url='/index/entityType/?id='+pid+'&type='+type;
    public_ajax.call_request('get',basicInfor_url,basicInfor);
    function basicInfor(data){
        // console.log(data);
        var item=data[0];
        entity_name = item.entity_name;
        // console.log(entity_name)
        var t1='',t2='',t3='否',t4='0级',t5='0级',t6='否',operationMode;
        if (item.entity_type==1){t1='平台';}else if (item.entity_type==2){t1='公司';}else if (item.entity_type==1){t1='项目';}else {t1=''}
        if (item.start_time){t2=item.start_time;}
        $('.location').text(item.location||''); //注册地
        if (item.operation_mode==1){
            operationMode = '互联网金融';
        }else{
            operationMode = item.operation_mode;
        }
        $('.type-1').text(operationMode);
        $('.type-2').text(t1);
        $('.type-3').text(t2);
        if (item.illegal_type==1){t3='是';}
        $('.val-1').text(t3);
        if (item.risk_level){t4=item.risk_level+'级';}
        $('.val-2').text(t4);
        if (item.impact_level){t5=item.impact_level+'级';}
        $('.val-3').text(t5);
        $('.val-4').text(item.operation_mode||'');
        if (item.penalty_status==1){t6='是';}
        $('.val-5').text(t6);

        // 广告内容
        var billing_url = '/index/ad_content/?entity_name='+entity_name;
        // console.log(billing_url);
        public_ajax.call_request('get',billing_url,billing_1);
        // 评论信息【舆情信息】
        var commentinforContent_url = '/index/comment_content/?entity_name='+entity_name;
        public_ajax.call_request('get',commentinforContent_url,commentinforContent_1);

    }

//股东【未完成
    // 取出公司名称
    var firm_name;

    var master_url='/index/gongshang/?id='+pid;
    public_ajax.call_request('get',master_url,master);
    function master(data) {
        // console.log(data)
        var item=data[0];
        $('.up-1').text(item.up1_level_num);
        $('.up-2').text(item.up2_level_num);
        $('.up-3').text(item.up3_level_num);
        $('.down-1').text(item.up1_level_num);
        $('.down-2').text(item.up2_level_num);
        $('.down-3').text(item.up3_level_num);
        $('.mid-1').text();
        $('.mid-2').text();
        $('.mid-3').text();

        firm_name = item.firm_name;
    }

//一个月时间
function get7DaysBefore(date,m){
    var date = date || new Date(),
        timestamp, newDate;
    if(!(date instanceof Date)){
        date = new Date(date);
    }
    timestamp = date.getTime();
    newDate = new Date(timestamp - m * 24 * 3600 * 1000);
    return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('-');
};

//====经营异常【未完成】
    var commentData = [
        {'a':'积极','b':'百度贴吧','c':'2017-12','d':'放款快，审核简单，赶快注册！'},
    ]
    // var comment_url = '/index/abnormal_info/?firm_name='+firm_name;
    // 暂用假的
    var comment_url = '/index/abnormal_info/?firm_name=信和财富投资管理（北京）有限公司绍兴分公司';
    setTimeout(function(){
        public_ajax.call_request('get',comment_url,commentTable);
    },1000)

    function commentTable(data) {
        // console.log(data)
        $('#business').bootstrapTable('load', data);
        $('#business').bootstrapTable({
            data:data,
            search: true,//是否搜索
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
                        return '<div class="inforContent" style="text-align: left;">' +
                            '            <div class="main">' +
                            '                <span>异常类型：<b style="color: #ff6d70">'+row.abnormal_type+'</b></span>'+
                            '                <img src="/static/images/textIcon.png" class="textFlag">' +
                            '                <p class="context">' +row.in_reason+
                            '                </p>' +
                            '            </div>' +
                            '        </div>';
                    }
                },
            ],
        });
        $('#business p.load').hide();
    };
    // commentTable(commentData)

// 12个月
var last_year_month = function() {
    var d = new Date();
    var result = [];
    for(var i = 0; i < 12; i++) {
        d.setMonth(d.getMonth() - 1);
        var m = d.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        //在这里可以自定义输出的日期格式
        result.push(d.getFullYear() + "年" + m + '月');
    }
    return result;
}

// 右顶侧小表格【未完成
    // var risk_url='///';
    // public_ajax.call_request('get',risk_url,riskValue);
    var objData=[{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
        {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
        {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''}]
    function riskValue(data) {
        $('#riskValueTable').bootstrapTable('load', data);
        $('#riskValueTable').bootstrapTable({
            data:data,
            search: true,//是否搜索
            pagination: true,//是否分页
            pageSize: 3,//单页记录数
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
                    title: "时间",//标题
                    field: "a",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    // formatter: function (value, row, index) {
                    //     if (row.user_name==''||row.user_name=='null'||row.user_name=='unknown'||!row.user_name){
                    //         return '未知';
                    //     }else {
                    //         return row.user_name;
                    //     };
                    // }
                },
                {
                    title: "预警内容",//标题
                    field: "b",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                },
                {
                    title: "查看详情",//标题
                    field: "",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        return '<span style="cursor:pointer;" onclick="" title="查看详情"><i class="icon icon-edit"></i></span>';
                    }
                },
            ],
        });
    };
    riskValue(objData)

// 子公司分公司【未完成
    // var table_1_url = '/index/sub_firm/?firm_name='+firm_name;
    var table_1_url = '/index/sub_firm/?firm_name=广西联银投资有限公司';
    public_ajax.call_request('get',table_1_url,table_1);

    var _myChart1,_myChart2;
    function table_1(data){
        console.log(data)
        var myChart = echarts.init(document.getElementById('table-1'));
        var option = {
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b}: {c}"
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,

            series : [
                {
                    name:'',
                    type:'tree',
                    orient: 'horizontal',  // vertical horizontal
                    rootLocation: {x: 100, y: '60%'}, // 根节点位置  {x: 'center',y: 10}
                    nodePadding: 20,
                    symbol: 'circle',
                    symbolSize: 40,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    color: '#cc9999',
                                    fontSize: 15,
                                    fontWeight:  'bolder'
                                }
                            },
                            lineStyle: {
                                color: '#000',
                                width: 1,
                                type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [
                        {
                            name: 'A',
                            value: 6,
                            symbolSize: [90, 70],
                            // symbol: 'image://http://www.iconpng.com/png/ecommerce-business/iphone.png',
                            symbol: 'A',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            children: [
                                {
                                    name: 'B',
                                    value: 4,
                                    // symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
                                    symbol: 'B',
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    symbolSize: [60, 60],
                                    children: [
                                        {
                                            name: 'C',
                                            symbol: 'circle',
                                            symbolSize: 20,
                                            value: 4,
                                            itemStyle: {
                                                normal: {
                                                    color: '#fa6900',
                                                    label: {
                                                        show: true,
                                                        position: 'right'
                                                    },

                                                },
                                                emphasis: {
                                                    label: {
                                                        show: false
                                                    },
                                                    borderWidth: 0
                                                }
                                            }
                                        },
                                        // {
                                        //     name: 'D',
                                        //     value: 4,
                                        //     symbol: 'circle',
                                        //     symbolSize: 20,
                                        //     itemStyle: {
                                        //         normal: {
                                        //             label: {
                                        //                 show: true,
                                        //                 position: 'right',
                                        //                 formatter: "{b}"
                                        //             },
                                        //             color: '#fa6900',
                                        //             borderWidth: 2,
                                        //             borderColor: '#cc66ff'

                                        //         },
                                        //         emphasis: {
                                        //             borderWidth: 0
                                        //         }
                                        //     }
                                        // },
                                        // {
                                        //     name: 'E',
                                        //     value: 2,
                                        //     symbol: 'circle',
                                        //     symbolSize: 20,
                                        //     itemStyle: {
                                        //         normal: {
                                        //             label: {
                                        //                 position: 'right'
                                        //             },
                                        //             color: '#fa6900',
                                        //             brushType: 'stroke',
                                        //             borderWidth: 1,
                                        //             borderColor: '#999966',
                                        //         },
                                        //         emphasis: {
                                        //             borderWidth: 0
                                        //         }
                                        //     }
                                        // }
                                    ]
                                },
                                {
                                    name: 'F',
                                    // symbol: 'image://http://www.viastreaming.com/images/apple_logo2.png',
                                    symbol: 'F',
                                    symbolSize: [60, 60],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            }

                                        }
                                    },
                                    value: 4
                                },
                                {
                                    name: 'G',
                                    // symbol: 'image://http://market.huawei.com/hwgg/logo_cn/download/logo.jpg',
                                    symbol: 'G',
                                    symbolSize: [60, 60],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            }

                                        }
                                    },
                                    value: 2
                                },
                            ]
                        }
                    ]
                }
            ]
        };

        for(var i=0;i<data.length;i++){
            // data[i]
        }
        option.series[0].data[0].name = data[0];//根公司
        // option.series[0].data[0].symbol = data[0];

        var comp = data[0];
        // 一级子公司
        option.series[0].data[0].children[0].name = data[1].广西联银投资有限公司[0];
        option.series[0].data[0].children[1].name = data[1].广西联银投资有限公司[1];
        option.series[0].data[0].children[2].name = data[1].广西联银投资有限公司[2];

        // 二级子公司
        option.series[0].data[0].children[0].children[0].name = data[2].广西金狐计算机科技有限公司[0]

        myChart.setOption(option);
        _myChart1 = myChart;
    }
    // table_1();

//====宣传行为====
    var publicityTable_url='/index/ad/?id='+pid;
    public_ajax.call_request('get',publicityTable_url,publicityTable);
    function publicityTable(data) {
        var item = data[0];
        // 非广告
        $('#pubTable .ad0_webo').text(item.ad0_webo);
        $('#pubTable .ad0_forum').text(item.ad0_forum);
        $('#pubTable .ad0_bbs').text(item.ad0_bbs);
        $('#pubTable .ad0_wechat').text(item.ad0_wechat);
        $('#pubTable .ad0_zhihu').text(item.ad0_zhihu);
        // 无煽动性广告
        $('#pubTable .inf1_webo').text(item.inf1_webo);
        $('#pubTable .inf1_forum').text(item.inf1_forum);
        $('#pubTable .inf1_bbs').text(item.inf1_bbs);
        $('#pubTable .inf1_wechat').text(item.inf1_wechat);
        $('#pubTable .inf1_zhihu').text(item.inf1_zhihu);

        $('#pubTable .inf2_webo').text(item.inf2_webo);
        $('#pubTable .inf2_forum').text(item.inf2_forum);
        $('#pubTable .inf2_bbs').text(item.inf2_bbs);
        $('#pubTable .inf2_wechat').text(item.inf2_wechat);
        $('#pubTable .inf2_zhihu').text(item.inf2_zhihu);

        $('#pubTable .inf3_webo').text(item.inf3_webo);
        $('#pubTable .inf3_forum').text(item.inf3_forum);
        $('#pubTable .inf3_bbs').text(item.inf3_bbs);
        $('#pubTable .inf3_wechat').text(item.inf3_wechat);
        $('#pubTable .inf3_zhihu').text(item.inf3_zhihu);
    }

//====信息变更====
    var indsa=[{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'}]
    // var inforChange_url='/index/change_info/?firm_name='+firm_name;
    var inforChange_url='/index/change_info/?firm_name=广西联银投资有限公司';
    public_ajax.call_request('get',inforChange_url,inforChange);
    function inforChange(data) {
        // console.log(data)
        $('#inforChange').bootstrapTable('load', data);
        $('#inforChange').bootstrapTable({
            data:data,
            search: true,//是否搜索
            pagination: true,//是否分页
            pageSize: 3,//单页记录数
            pageList: [3,8,14,20],//分页步进值
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
                    title: "时间",//标题
                    field: "change_time",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        var change_time;
                        if (row.change_time==''||row.change_time=='null'||row.change_time=='unknown'||!row.change_time){
                            return '未知';
                        }else {
                            change_time = getLocalTime(row.change_time);
                            return change_time;
                        };
                    }
                },
                {
                    title: "变更项",//标题
                    field: "change_item",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.change_item==''||row.change_item=='null'||row.change_item=='unknown'||!row.change_item){
                            return '未知';
                        }else {
                            return row.change_item;
                        };
                    }
                },
                {
                    title: "变更前",//标题
                    field: "content_before",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.content_before==''||row.content_before=='null'||row.content_before=='unknown'||!row.content_before){
                            return '未知';
                        }else {
                            return row.content_before;
                        };
                    }
                },
                {
                    title: "变更后",//标题
                    field: "content_after",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.content_after==''||row.content_after=='null'||row.content_after=='unknown'||!row.content_after){
                            return '未知';
                        }else {
                            return row.content_after;
                        };
                    }
                },
            ],
        });
        $('#inforChange p.load').hide();
    };
    // inforChange(indsa);

//====诉讼记录====
    var kajsdj=[{'a':'2017-11-11','b':'testtesttesttesttesttesttesttest'},]
    // var lawsuit_url = '/index/law_info/?firm_name='+firm_name;
    var lawsuit_url = '/index/law_info/?firm_name=中信银行股份有限公司';
    public_ajax.call_request('get',lawsuit_url,lawsuit);
    function lawsuit(data) {
        $('#lawsuit').bootstrapTable('load', data);
        $('#lawsuit').bootstrapTable({
            data:data,
            search: true,//是否搜索
            pagination: true,//是否分页
            pageSize: 3,//单页记录数
            pageList: [3,8,14,20],//分页步进值
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
                    title: "时间",//标题
                    field: "date",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        var lawsuit_date;
                        if (row.date==''||row.date=='null'||row.date=='unknown'||!row.date){
                            return '未知';
                        }else {
                            lawsuit_date = getLocalTime(row.date);
                            // return row.date;
                            return lawsuit_date;
                        };
                    }
                },
                {
                    title: "记录",//标题
                    field: "title",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.title==''||row.title=='null'||row.title=='unknown'||!row.title){
                            return '未知';
                        }else {
                            return row.title;
                        };
                    }
                },
            ],
        });
        $('#lawsuit p.load').hide();
    };
    // lawsuit(kajsdj);

//====收益率及其分布====
    function line_1() {
        var day30=[];
        // for (var a=0;a < 12;a++){
        //     day30.push(get12MonthBefore(new Date(),a));
        // }
        day30 = last_year_month().reverse();
        // console.log(day30)


        var day30Data=[];
        for (var b=0;b< 12;b++){
            day30Data.push(Math.round(Math.random()*(20-5)+5));
        }

        var day30Data_2=[];
        for (var c=0;c< 12;c++){
            day30Data_2.push(Math.round(Math.random()*(20-3)+5));
        }

        var day30Data_3=[];
        for (var d=0;d< 12;d++){
            day30Data_3.push(Math.round(Math.random()*(20-8)+5));
        }

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
                data:['']
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data:day30
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name:'消极评论',
                    type:'line',
                    smooth:true,
                    data:day30Data.reverse(),
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
                {
                    name:'中性评论',
                    type:'line',
                    smooth:true,
                    data:day30Data_2,
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
                {
                    name:'积极评论',
                    type:'line',
                    smooth:true,
                    data:day30Data_3,
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
    // line_1();
    var serds = [
        {'a':'积极','b':'百度贴吧','c':'2017-12','d':'放款快，审核简单，赶快注册！'},
    ]
    var incomeTable_url='/index/returnRate/?id='+pid;
    public_ajax.call_request('get',incomeTable_url,incomeTable);
    function incomeTable(data) {
        // console.log(data)
        $('#incomeTable').bootstrapTable('load', data);
        $('#incomeTable').bootstrapTable({
            data:data,
            search: true,//是否搜索
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
                        return '<div class="inforContent">'+
                            '                <div class="main">'+
                            '                    <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                            '                    <p class="option">'+
                            '                        <span>收益率：<b style="color: #ff6d70">'+row.return_rate+'%</b></span>'+
                            '                        <button class="original btn-primary btn-xs" onclick="incomeTable_more(\''+row.index_name+'\',\''+row.text_id+'\')">查看全文</button>'+
                            '                    </p>'+
                            '                    <p class="context">'+row.related_text+'</p>'+
                            '                </div>'+
                            '            </div>';
                    }
                },
            ],
        });
        $('#incomeTable p.load').hide();
    };
    // incomeTable(serds);

//====收益率点击查看全文====
    function incomeTable_more(index_name,text_id){
        var incomeTable_more_url = '/index/returnRate_content/?index_name='+index_name+'&text_id='+text_id;
        // console.log(incomeTable_more_url);
        public_ajax.call_request('get',incomeTable_more_url,incomeTablemore);
    }
    function incomeTablemore(data){
        console.log(data)
        if(data){
            var channel = data.site_name || data.index_name;//渠道
            var Release_time = getLocalTime(data.publish_time);//时间戳转时间
            $('#moreInfo #channel').text(channel);
            $('#moreInfo #Release_time').text(Release_time);
            if(data.title){
                $('#moreInfo #Advertising_Headlines').text(data.title);//标题
            }else {
                $('#moreInfo #Advertising_Headlines').text('无');//标题
            }
            if(data.author){
                $('#moreInfo #author').text(data.author);//作者
            }else{
                $('#moreInfo #author').text('未知');//作者
            }
            $('#moreInfo #words').text(data.content);//内容
            $('#moreInfo #url a').text('查看原文').attr({'href':data.u,'target':'_blank','title':'查看原文'});//原文链接

            $('#moreInfo').modal('show');
        }
    }

//====收益/保本/担保承诺【未完成】====
    var guarantee_url='/index/guarantee/?id='+pid;
    public_ajax.call_request('get',guarantee_url,guarantee);
    function guarantee(data) {
        // console.log(data)
        $('#guarantee').bootstrapTable('load', data);
        $('#guarantee').bootstrapTable({
            data:data,
            search: true,//是否搜索
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
                        var promiseType;
                        if(row.promise_type == 1){
                            promiseType = '本息类担保'
                        }else if(row.promise_type == 2){
                            promiseType = '非本息类担保'
                        }else {
                            promiseType = '无匹配结果'
                        }
                        return '<div class="promiseCon">'+
                            '            <div class="inforContent">'+
                            '                <div class="main">'+
                            '                    <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                            '                    <p class="option">'+
                            '                        <span>承诺类型：<b style="color: #ff6d70">'+promiseType+'</b></span>'+
                            '                        <button class="original btn-primary btn-xs" onclick="guarantee_more(\''+row.index_name+'\',\''+row.text_id+'\')">查看全文</button>'+
                            '                    </p>'+
                            '                    <p class="context">'+row.related_text+'</p>'+
                            '                </div>'+
                            '            </div>'+
                            '        </div>';
                    }
                },
            ],
        });
        $('#guarantee p.load').hide();
    };
    function guarantee_more (index_name,text_id){
        var guarantee_more_url = '/index/promise_content/?index_name='+index_name+'&text_id='+text_id;
        // console.log(guarantee_more_url);
        public_ajax.call_request('get',guarantee_more_url,guaranteeMore);
    }
    function guaranteeMore(data){
        // console.log(data)
    }

//====广告内容====
    // setTimeout(function(){
    //     var billing_url = '/index/ad_content/?entity_name='+entity_name;
    //     // console.log(billing_url);
    //     public_ajax.call_request('get',billing_url,billing_1);
    // },1000);
    var data_0,data_1,data_2,data_3,data_4;
    function billing_1(data){
        // console.log(data)
        data_0 = data[0].wechat;
        data_1 = data[1].zhihu;
        data_2 = data[2].bbs;
        data_3 = data[3].webo;
        data_4 = data[4].forum;

        billing(data_0,'#billing_0','微信');
        billing(data_1,'#billing_1','知乎');
        billing(data_2,'#billing_2','论坛');
        billing(data_3,'#billing_3','微博');
        billing(data_4,'#billing_4','贴吧');
    }
    // 所有的数据
    var articalList={};
    // 部分数据
    var articalList_part={};
    function billing(data,el,channel) {
        if(data.length == 0){
            $(el).hide();
        }else {
            var tag=el.toString().substring(1)
            $(el).bootstrapTable('load', data);
            $(el).bootstrapTable({
                data:data,
                search: true,//是否搜索
                pagination: true,//是否分页
                pageSize: 3,//单页记录数
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
                            var publisTime = getLocalTime(row.publish_time);
                            var contentClip;
                            if(row.content.length >= 200){
                                contentClip = row.content.slice(0,200)+'  ...';
                                articalList_part[tag+'_'+index] = contentClip;
                            }else{
                                contentClip = row.content;
                                articalList_part[tag+'_'+index] = contentClip;
                            }
                            // 所有的数据
                            articalList[tag+'_'+index] = row.content;
                            return '<div class="inforContent">'+
                                '            <div class="main">'+
                                '                <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                                '                <p class="option">'+
                                '                    <span>煽动性：<b style="color: #ff6d70">强</b></span>'+
                                '                    <span>广告渠道：<b style="color: #ff6d70">'+channel+'</b></span>'+
                                '                    <span>发布时间：<b style="color: #ff6d70">'+publisTime+'</b></span>'+
                                '   <button onclick="getAllArtical(\''+tag+'_'+index+'\')" artical=\"'+tag+'_'+index+'\" class="original btn-primary btn-xs">查看全文</button>'+
                                '                </p>'+
                                '                <p class="context">'+contentClip+'</p>'+

                                '            </div>'+
                                '        </div>';
                        }
                    },
                ],
            });
            $(el+' p.load').hide();
        }
    };
    // 切换全文和部分数据
    function getAllArtical (_id) {
        var nowText = $("button[artical = "+ _id +"]").text();
        // console.log(articalList[_id]);
        $("button[artical = "+ _id +"]").parents('.main').find('.context').text(articalList[_id]);
        $("button[artical = "+ _id +"]").text('收起');
        if(nowText == '收起'){
            $("button[artical = "+ _id +"]").parents('.main').find('.context').text(articalList_part[_id]);
            $("button[artical = "+ _id +"]").text('查看全文');
        }
    }
    // billing(serds);

//====舆情分析====
    //评论信息
    // setTimeout(function(){
    //     var commentinforContent_url = '/index/comment_content/?entity_name='+entity_name;
    //     public_ajax.call_request('get',commentinforContent_url,commentinforContent_1);
    // },1000);
    var commentData_0,commentData_1,commentData_2,commentData_3,commentData_4;
    function commentinforContent_1(data){
        commentData_0 = data[0].wechat;
        commentData_1 = data[1].zhihu;
        commentData_2 = data[2].bbs;
        commentData_3 = data[3].webo;
        commentData_4 = data[4].forum;

        commentinforContent(commentData_0,'#commentinforContent_0','微信');
        commentinforContent(commentData_1,'#commentinforContent_1','知乎');
        commentinforContent(commentData_2,'#commentinforContent_2','论坛');
        commentinforContent(commentData_3,'#commentinforContent_3','微博');
        commentinforContent(commentData_4,'#commentinforContent_4','贴吧');
    }
    // 所有的数据
    var commentarticalList={};
    // 部分数据
    var commentarticalList_part={};
    function commentinforContent(data,el,channel) {
        if(data.length == 0){
            $(el).hide();
        }else {
            var com =el.toString().substring(1);
            $(el).bootstrapTable('load', data);
            $(el).bootstrapTable({
                data:data,
                search: true,//是否搜索
                pagination: true,//是否分页
                pageSize: 3,//单页记录数
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
                            var publishTime = getLocalTime(row.publish_time);
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
                            return '<div class="inforContent" id="commentinforContent">'+
                                '                <div class="main">'+
                                '                    <img src="/static/images/textIcon.png" class="textFlag" style="top:8px;">'+
                                '                    <p class="option">'+
                                '                        <span>评论倾向：<b style="color: #ff6d70">积极</b></span>'+
                                '                        <span>评论来源：<b style="color: #ff6d70">'+channel+'</b></span>'+
                                '                        <span>发布时间：<b style="color: #ff6d70">'+publishTime+'</b></span>'+
                                '                        <button class="originalbtn btn-primary btn-xs" onclick="getAllcommtentartical(\''+com+'_'+index+'\')" artical=\"'+com+'_'+index+'\">查看全文</button>'+
                                '                    </p>'+
                                '                    <p class="context">'+contentClip+'</p>'+
                                '                </div>'+
                                '            </div>';
                        }
                    },
                ],
            });
            $(el+' p.load').hide();
        }
    };
    // commentinforContent(serds);
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

// 趋势分析
function line_2() {
    var day30=[];
    day30 = last_year_month().reverse();
    var day30Data=[];
    for (var b=0;b< 12;b++){
        day30Data.push(Math.round(Math.random()*(20-5)+5));
    }

    var day30Data_2=[];
    for (var c=0;c< 12;c++){
        day30Data_2.push(Math.round(Math.random()*(20-3)+5));
    }

    var day30Data_3=[];
    for (var d=0;d< 12;d++){
        day30Data_3.push(Math.round(Math.random()*(20-8)+5));
    }

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
            data:['']
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: day30
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:'消极评论',
                type:'line',
                smooth:true,
                data:day30Data.reverse(),
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
            {
                name:'中性评论',
                type:'line',
                smooth:true,
                data:day30Data_2,
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
            {
                name:'积极评论',
                type:'line',
                smooth:true,
                data:day30Data_3,
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
    _myChart2 = myChart;
}
line_2();


// 使用jsFiddle生成Word
//     var result = document.getElementById('LL');
//     result.addEventListener('click', function(){
//
//         //img类推
//         var imgs = [],canvasArr = [_myChart1, _myChart2];
//         // need dataurl
//         for(var i = 0; i < canvasArr.length; i++){
//             var canvasIndex = canvasArr[i].getRenderedCanvas({
//                 pixelRatio: 1,
//                 backgroundColor: '#FFFFFF'
//             });
//             imgs.push(canvasIndex.toDataURL('image/jpeg'));
//         }
//
//         //虚拟创建各种需要的DOM内容，不加入文档流，但使用, style需要在节点中添加
//         var $div = $('<div id="myDoc"></div>');
//         var $homeTitle = $('<p class="homeTitle" style="font-size: 30px; font-weight: 600; text-align: center; ">' + '画像' +'</p>');
//         // var $homeInfo = $(
//         //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo1' + '</p>' +
//         //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo2' + '</p>' +
//         //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo3' + '</p>' +
//         //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo4' + '</p>'
//         // );
//         var $homeFooter = $('<p class="homeFooter" style="text-align: center; font-size: 13px; page-break-after: always; margin-top: 40px;">' + 'exportConfig.homePage.footer' + '</p>');
//         var $firstPointTitle = $('<p class="pointTitle" style="page-break-before: always; font-weight: 600; font-size: 25px; margin-bottom: 25px;">' + 'exportConfig.theFirst.title'+ '</p>');
//         var $firstPointFirPara = $('<p class="pointParagraph">' + '&nbsp;&nbsp;&nbsp;' + 'requestData.LevelSummary' + 'exportConfig.theFirst.paragraph1p7' + '</p>');
//         var $firstPointFirImg = $('<div style="text-align: center;">' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;" />'+ '\n' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;"/>' + '<p style="font-size: 20px; font-weight: 600;">图 1 危害等级分布柱状图、饼图</p>' + '</div>');
//         var $firstPointSecPara = $('<p class="pointParagraph">' + '&nbsp;&nbsp;&nbsp;' + 'requestData.TypeSummary' + 'exportConfig.theFirst.paragraph2p11'+ '</p>');
//         var $firstPointSecImg = $('<div style="text-align: center;">' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;"/>' + '\n' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;"/>' + '<p style="font-size: 20px; font-weight: 600;">图 1 问题类型分布柱状图、饼图</p>' + '</div>');
//         var $secondPointTitle = $('<p class="pointTitle" style="font-size: 25px; font-weight: 600; margin-bottom: 25px;">' + 'exportConfig.theSecond.title' + '</p>' + '<p class="tableTitle" style="text-align: center;">' + 'exportConfig.theSecond.tableTitle' +'</p>');
//
//          var $resultTable = structureTable();
//         // 构造表格，structure table ,这里的data.length 需改为项目的表格内容，如requestData.ProblemList.length
//         function structureTable() {
//             var $table = $('<table style="border-collapse: collapse; text-align: left; word-wrap: break-word; word-break: break-all;"></table>');
//             var $thead = $('<thead style="text-align: center;"><tr><td style="width: 10%; border: 1px solid black;">时间</td><td style="width: 10%; border: 1px solid black;">预警内容</td><td style="width: 10%; border: 1px solid black;">查看详情</td><td style="border: 1px solid black; width: auto;">建议方案</td></tr></thead>');
//             var tbody = '<tbody>';
//             for(var i = 0; i < objData.length; i++){
//                 tbody +='<tr>' + '<td style="border: 1px solid black;">' + objData[i]['a'] + '</td>' + '<td style="border: 1px solid black;">' + objData[i]['b'] + '</td>' + '<td style="border: 1px solid black;">' + objData[i]['c'] + '</td>' + '<td style="border: 1px solid black;">' + objData[i][3] + '</td>' + '</tr>';
//             }
//             tbody += '</tbody>';
//             var $tbody = $(tbody);
//             $table.append($thead, $tbody);
//             return $table;
//         }
//         // $div.append($homeTitle, $homeInfo, $homeFooter, $firstPointTitle, $firstPointFirPara, $firstPointFirImg, $firstPointSecPara, $firstPointSecImg, $secondPointTitle, $resultTable);
//         // $div.append($homeTitle, $homeFooter, $firstPointTitle, $firstPointFirPara, $firstPointFirImg, $firstPointSecPara, $firstPointSecImg, $secondPointTitle,$resultTable);
//         $('#container').append($resultTable);
//
//         //主体函数，即将内容加入到word中
//         $.fn.wordExport = function(fileName) {
//             fileName = typeof fileName !== 'undefined' ? fileName : "导出";
//             var static = {
//                 mhtml: {
//                     top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
//                     head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n+ '_styles_' + \n</style>\n</head>\n",
//                     body: "<body>_body_</body>"
//                 }
//             };
//             var options = {
//                 maxWidth: 624
//             };
//             // Clone selected element before manipulating it
//             var markup = $(this).clone();
//
//             // Remove hidden elements from the output
//             markup.each(function() {
//                 var self = $(this);
//                 if (self.is(':hidden'))
//                     self.remove();
//             });
//
//             // Embed all images using Data URLs
//             // img如果再文档流中，上面可以不用处理，使用这儿的内容先去创建canvas 然后toDataURL获取uri再进行使用，这里注释是因为上面我们已经将内容转为uri，故不需要做无用功
//             var images = Array();
//             var img = markup.find('img');
//             for (var i = 0; i < imgs.length; i++) {
//                 // Calculate dimensions of output image
//                 //var w = Math.min(img[i].width, options.maxWidth);
//                 //var h = img[i].height * (w / img[i].width);
//                     // Create canvas for converting image to data URL
//                 //var canvas = document.createElement("CANVAS");
//                 //canvas.width = w;
//                 //canvas.height = h;
//                     // Draw image to canvas
//                 //var context = canvas.getContext('2d');
//                 //context.drawImage(img[i], 0, 0, w, h);
//                 // Get data URL encoding of image
//                 var uri = imgs[i];
//                 $(img[i]).attr("src", imgs[i]);
//                 //img[i].width = w;
//                 //img[i].height = h;
//                 // Save encoded image to array
//                 images[i] = {
//                     type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
//                     encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
//                     location: $(img[i]).attr("src"),
//                     data: uri.substring(uri.indexOf(",") + 1)
//                 };
//             }
//             // Prepare bottom of mhtml file with image data
//             var mhtmlBottom = "\n";
//             for (var i = 0; i < images.length; i++) {
//                 mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
//                 mhtmlBottom += "Content-Location: " + images[i].location + "\n";
//                 mhtmlBottom += "Content-Type: " + images[i].type + "\n";
//                 mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
//                 mhtmlBottom += images[i].data + "\n\n";
//             }
//             mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";
//
//             //TODO: load css from included stylesheet
//             //styles如果再文档流中可用，否则通过这种方式，无法查找到元素，无法添加样式，故上面将样式内联在dom结构中
//             var styles = 'table {border-collapse:collapse; border: 1px solid #000;} td { border: 1px solid #000;} h1 { font-size: 30px; color: red; }'
//             // Aggregate parts of the file together
//             var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;
//
//             // Create a Blob with the file contents
//             var blob = new Blob([fileContent], {
//                 type: "application/msword;charset=utf-8"
//             });
//             saveAs(blob, fileName + ".doc");
//         }
//         // $div.wordExport('docName');
//         $("#container").wordExport('docName');
//     },false);
