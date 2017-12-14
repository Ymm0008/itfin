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

//经营异常
var commentData = [
    {'a':'积极','b':'百度贴吧','c':'2017-12','d':'放款快，审核简单，赶快注册！'},
    {'a':'积极2','b':'百度贴吧2','c':'2017-12','d':'2放款快，审核简单，赶快注册！'},
    {'a':'积极3','b':'百度贴吧3','c':'2017-12','d':'3放款快，审核简单，赶快注册！'},
    {'a':'积极4','b':'百度贴吧4','c':'2017-12','d':'4放款快，审核简单，赶快注册！'},
    {'a':'积极5','b':'百度贴吧5','c':'2017-12','d':'5放款快，审核简单，赶快注册！'},
]
function commentTable(data) {
    console.log(data)
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
                        '                <img src="/static/images/textIcon.png" class="textFlag">' +
                        '                <p class="context">' +row.d+
                        '                </p>' +
                        '            </div>' +
                        '        </div>';
                }
            },
        ],
    });
};
commentTable(commentData)

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
var _myChart1,_myChart2;
function table_1(){
    var myChart = echarts.init(document.getElementById('table-1'));
    var option = {
        title : {
            text: '手机品牌',
            subtext: '线、节点样式'
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
                name:'树图',
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
                        name: '手机',
                        value: 6,
                        symbolSize: [90, 70],
                        // symbol: 'image://http://www.iconpng.com/png/ecommerce-business/iphone.png',
                        symbol: '手机',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                }
                            }
                        },
                        children: [
                            {
                                name: '小米',
                                value: 4,
                                // symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
                                symbol: '小米',
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
                                        name: '小米1',
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
                                    {
                                        name: '小米2',
                                        value: 4,
                                        symbol: 'circle',
                                        symbolSize: 20,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: true,
                                                    position: 'right',
                                                    formatter: "{b}"
                                                },
                                                color: '#fa6900',
                                                borderWidth: 2,
                                                borderColor: '#cc66ff'

                                            },
                                            emphasis: {
                                                borderWidth: 0
                                            }
                                        }
                                    },
                                    {
                                        name: '小米3',
                                        value: 2,
                                        symbol: 'circle',
                                        symbolSize: 20,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    position: 'right'
                                                },
                                                color: '#fa6900',
                                                brushType: 'stroke',
                                                borderWidth: 1,
                                                borderColor: '#999966',
                                            },
                                            emphasis: {
                                                borderWidth: 0
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                name: '苹果',
                                // symbol: 'image://http://www.viastreaming.com/images/apple_logo2.png',
                                symbol: '苹果',
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
                                name: '华为',
                                // symbol: 'image://http://market.huawei.com/hwgg/logo_cn/download/logo.jpg',
                                symbol: '华为',
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
                            {
                                name: '联想',
                                // symbol: 'image://http://www.lenovo.com.cn/HomeUpload/Home001/6d94ee9a20140714.jpg',
                                symbol: '华为',
                                symbolSize: [100, 40],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        }

                                    }
                                },
                                value: 2
                            }
                        ]
                    }
                ]
            }
        ]
    };
    myChart.setOption(option);
    _myChart1 = myChart;
}
table_1();
//宣传行为
var boas=[{'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''},{'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''},
    {'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''},{'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''},
    {'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''},{'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''},
    {'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''},{'a':'百度','b':'23','c':''},{'a':'新浪微博','b':'11','c':''}]
// var publicityTable_url='/system_manage/show_users_account/';
// public_ajax.call_request('get',publicityTable_url,publicityTable);
function publicityTable(data) {
    console.log(data)
    $('#publicityTable').bootstrapTable('load', data);
    $('#publicityTable').bootstrapTable({
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
                title: "宣传渠道",//标题
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
                title: "相关文本数",//标题
                field: "b",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "查看文本",//标题
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
publicityTable(boas)
function line_2() {
    var day30=[];
    for (var a=0;a < 30;a++){
        day30.push(get7DaysBefore(new Date(),a));
    }
    var day30Data=[];
    for (var b=0;b< 30;b++){
        day30Data.push(Math.round(Math.random()*(20-5)+5));
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
                name:'数量',
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
        ]
    };
    myChart.setOption(option);
    _myChart2 = myChart;
}
line_2();
//信息变更
var indsa=[{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
    {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
    {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
    {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
    {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
    {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},]
// var publicityTable_url='/system_manage/show_users_account/';
// public_ajax.call_request('get',publicityTable_url,publicityTable);
function inforChange(data) {
    $('#inforChange').bootstrapTable('load', data);
    $('#inforChange').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 3,//单页记录数
        pageList: [8,14,20],//分页步进值
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
                title: "变更项",//标题
                field: "b",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "变更前",//标题
                field: "c",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {

                }
            },
            {
                title: "变更后",//标题
                field: "d",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {

                }
            },
        ],
    });
};
<<<<<<< HEAD
inforChange(indsa);
//诉讼记录
var kajsdj=[{'a':'2017-11-11','b':'testtesttesttesttesttesttesttest'},]
function lawsuit(data) {
    $('#lawsuit').bootstrapTable('load', data);
    $('#lawsuit').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 3,//单页记录数
        pageList: [8,14,20],//分页步进值
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
                title: "记录",//标题
                field: "b",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
        ],
    });
};
lawsuit(kajsdj);

//收益率及其分布
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
    {'a':'积极2','b':'百度贴吧2','c':'2017-12','d':'2放款快，审核简单，赶快注册！'},
    {'a':'积极3','b':'百度贴吧3','c':'2017-12','d':'3放款快，审核简单，赶快注册！'},
    {'a':'积极4','b':'百度贴吧4','c':'2017-12','d':'4放款快，审核简单，赶快注册！'},
    {'a':'积极5','b':'百度贴吧5','c':'2017-12','d':'5放款快，审核简单，赶快注册！'},
]
function incomeTable(data) {
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
                        '                        <span>收益率：<b style="color: #ff6d70">33%</b></span>'+
                        '                        <button class="original btn-primary btn-xs">查看全文</button>'+
                        '                    </p>'+
                        '                    <p class="context">'+row.d+'</p>'+
                        '                </div>'+
                        '            </div>';
                }
            },
        ],
    });
};
incomeTable(serds);

//收益/保本/担保承诺
function guarantee(data) {
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
                    return '<div class="promiseCon">'+
                        '            <div class="inforContent">'+
                        '                <div class="main">'+
                        '                    <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                        '                    <p class="option">'+
                        '                        <span>承诺类型：<b style="color: #ff6d70">担保</b></span>'+
                        '                        <button class="original btn-primary btn-xs">查看全文</button>'+
                        '                    </p>'+
                        '                    <p class="context">'+row.d+'</p>'+
                        '                </div>'+
                        '            </div>'+
                        '        </div>';
                }
            },
        ],
    });
};
guarantee(serds);

//广告内容
function billing(data) {
    $('#billing').bootstrapTable('load', data);
    $('#billing').bootstrapTable({
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
                        '            <div class="main">'+
                        '                <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                        '                <p class="option">'+
                        '                    <span>煽动性：<b style="color: #ff6d70">强</b></span>'+
                        '                    <span>广告渠道：<b style="color: #ff6d70">百度贴吧</b></span>'+
                        '                    <span>发布时间：<b style="color: #ff6d70">2017-11-22</b></span>'+
                        '                    <button class="original btn-primary btn-xs">查看全文</button>'+
                        '                </p>'+
                        '                <p class="context">'+row.d+'</p>'+
                        '            </div>'+
                        '        </div>';
                }
            },
        ],
    });
};
billing(serds);

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
