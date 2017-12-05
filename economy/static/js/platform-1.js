require.config({
    paths: {
        echarts: '../static/js/echarts-2/build/dist',
    }
});
require(
    [
        'echarts',
        'echarts/chart/tree'
    ],
    function (ec) {
        // var myChart = echarts.init(document.getElementById('picChart-1'),'dark');
        var myChart = ec.init(document.getElementById('table-1'),'dark');
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
                            symbol: 'image://http://www.iconpng.com/png/ecommerce-business/iphone.png',
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
                                    symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
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
                                    symbol: 'image://http://www.viastreaming.com/images/apple_logo2.png',
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
                                    symbol: 'image://http://market.huawei.com/hwgg/logo_cn/download/logo.jpg',
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
                                    symbol: 'image://http://www.lenovo.com.cn/HomeUpload/Home001/6d94ee9a20140714.jpg',
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
    }
);
//宣传行为
// var risk_url='///';
// public_ajax.call_request('get',risk_url,riskValue);
<<<<<<< HEAD
console.log(1111111111111111111)
var objData=[{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
    {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
    {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''}]
var risk_url='/index/platformData/';
public_ajax.call_request('get',risk_url,riskValue);
function riskValue(data) {
    // console.log(data)
    data = data.slice(0,6)//先取6条数据
    console.log(data)
=======
var objData=[{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
    {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
    {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''}]
function riskValue(data) {
>>>>>>> 842ec185dcc37ef6cbdfe36e32996ecdd520a8b5
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
<<<<<<< HEAD
                field: "date",//键名
=======
                field: "a",//键名
>>>>>>> 842ec185dcc37ef6cbdfe36e32996ecdd520a8b5
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
<<<<<<< HEAD
                formatter: function (value, row, index) {
                    if (row.date==''||row.date=='null'||row.date=='unknown'||!row.date){
                        return '未知';
                    }else {
                        return row.date;
                    };
                }
            },
            {
                title: "预警内容",//标题
                field: "bg",//键名
=======
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
>>>>>>> 842ec185dcc37ef6cbdfe36e32996ecdd520a8b5
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
<<<<<<< HEAD
                formatter: function (value, row, index) {
                    if (row.bg==''||row.bg=='null'||row.bg=='unknown'||!row.bg){
                        return '未知';
                    }else {
                        return row.bg;
                    };
                }
=======
>>>>>>> 842ec185dcc37ef6cbdfe36e32996ecdd520a8b5
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
<<<<<<< HEAD
// riskValue(objData);
=======
riskValue(objData);
>>>>>>> 842ec185dcc37ef6cbdfe36e32996ecdd520a8b5
function line_1() {
    var myChart = echarts.init(document.getElementById('incomeTable'));
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