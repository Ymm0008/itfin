var monitorTable_url='/system_manage/show_users_account/';
// public_ajax.call_request('get',monitorTable_url,peoPicture);
function monitorTable(data) {
    console.log(data)
    $('#riskValueTable').bootstrapTable('load', data);
    $('#riskValueTable').bootstrapTable({
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
                title: "时间",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.user_name==''||row.user_name=='null'||row.user_name=='unknown'||!row.user_name){
                        return '未知';
                    }else {
                        return row.user_name;
                    };
                }
            },
            {
                title: "预警内容",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.user_name==''||row.user_name=='null'||row.user_name=='unknown'||!row.user_name){
                        return '未知';
                    }else {
                        return row.user_name;
                    };
                }
            },
            {
                title: "预警类型",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {

                }
            },
            {
                title: "预警次数",//标题
                field: "",//键名
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

//收益率及分布
var inCome_url='/system_manage/show_users_account/';
// public_ajax.call_request('get',inCome_url,inCome);
function inCome(data) {
    var myChart = echarts.init(document.getElementById('incomeTable'));
    var option = {
        title: {
            text: '未来一周气温变化',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['最高气温','最低气温']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel: {
                textStyle: {
                    color: 'white',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                },
            },
            axisLine:{
                lineStyle:{
                    width:2,
                    color:'#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: 'white',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                },
            },
            axisLine:{
                lineStyle:{
                    width:2,
                    color:'#fff'
                }
            }
        },
        series: [
            {
                name:'最高气温',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10],
                smooth:true,
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor:'#57c4d3',
                    }
                },
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
                name:'最低气温',
                type:'line',
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
}
inCome();

//网络评论趋势
var networkComment_url='/system_manage/show_users_account/';
// public_ajax.call_request('get',networkComment_url,networkComment);
function networkComment(data) {
    var myChart = echarts.init(document.getElementById('commentLine'));
    var option = {
        title: {
            text: '评论趋势统计',
            left:'center',
            textStyle:{
                color:'#fff'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data:['最高气温','最低气温']
        // },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel: {
                textStyle: {
                    color: 'white',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                },
            },
            axisLine:{
                lineStyle:{
                    width:2,
                    color:'#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: 'white',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                },
            },
            axisLine:{
                lineStyle:{
                    width:2,
                    color:'#fff'
                }
            }
        },
        series: [
            {
                name:'最高气温',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10],
                smooth:true,
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor:'#57c4d3',
                    }
                },
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
                name:'最低气温',
                type:'line',
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
}
networkComment();