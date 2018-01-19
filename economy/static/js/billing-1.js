//广告记录
var adWarningdata=[
    {'a':'银承派','b':'预期年收益相当于银行活期的63倍、余某宝的6倍','c':'2016-11-24 00：00','d':'微博','e':'强'},
    {'a':'银承派','b':'五花八门的优惠活动、无孔不入的打折广告','c':'2016-11-24 00：00','d':'微信','e':'强'},
    {'a':'银承派','b':'这年头做金融真是太难了、多项技能加持','c':'2016-11-24 00：00','d':'论坛','e':'强'},
    {'a':'-','b':'预期年收益相当于银行活期的63倍、余某宝的6倍','c':'2016-11-24 00：00','d':'贴吧','e':'强'},
    {'a':'银承派','b':'五花八门的优惠活动、无孔不入的打折广告','c':'2016-11-24 00：00','d':'知乎','e':'一般'},
    {'a':'-','b':'这年头做金融真是太难了、多项技能加持','c':'2016-11-24 00：00','d':'微博','e':'强'},
]
function adWarning(data) {
    $('#contentTable').bootstrapTable('load', data);
    $('#contentTable').bootstrapTable({
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
                title: "监测对象",//标题
                field: "a",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.a==''||row.a=='null'||row.a=='unknown'||!row.a){
                        return '未知';
                    }else {
                        return '<span style="cursor:pointer;color:white;" onclick="" title="查看广告详情">'+row.a+'</span>';
                    };
                }
            },
            {
                title: "广告文本",//标题
                field: "b",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "发布时间",//标题
                field: "c",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "发布渠道",//标题
                field: "d",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直

            },
            {
                title: "煽动性等级",//标题
                field: "e",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "监测详情",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '<span style="cursor:pointer;color:white;" onclick="jumpFrame(\''+row.a+'\',\''+row.a+'\')" title="查看详情"><i class="icon icon-file-alt"></i></span>';
                }
            },
            {
                title: "一键取证",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '<span style="cursor:pointer;color:white;" title="一键取证"><i class="icon icon-signin"></i></span>';
                }
            },
        ],
    });
    $('.contentTable p.load').hide();
};
adWarning(adWarningdata);
function jumpFrame(name,pid) {
    window.open('/advertising/adDetails/?name='+escape(name))//+'&pid='+pid);
}
//广告态势
function line() {
    var myChart = echarts.init(document.getElementById('adTrend'),'chalk');
    var option = {
        backgroundColor:'transparent',
        title: {
            text: '广告发布数',
            x: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '5%',
            right: '7%',
            top:'7%',
            containLabel: true
        },
        xAxis: [{
            name:'时间',
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    width:'2'
                }
            },
            axisLabel: {
                rotate:90,
                textStyle: {
                    color: '#fff',
                    fontWeight:'700'
                }
            },
            data: ['2017-12-1','2017-12-2','2017-12-3','2017-12-4','2017-12-5','2017-12-6','2017-12-7'],
        }],
        yAxis: [
            {
                name:'数量',
                type: 'value',
                axisTick: {
                    show: true
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14,
                        fontWeight:'700',
                        color:'white',
                    }
                }
            }
        ],
        series: [
            {
                name: '总数量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        areaStyle: {type:'default'},
                    }
                },
                data: [22, 26, 24, 22, 33, 43, 29],
            },
            {
                name: '一般煽动性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        areaStyle: {type:'default'},
                    }
                },
                data: [11, 11, 15, 13, 12, 13, 10],
            },
            {
                name: '强煽动性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        areaStyle: {type:'default'},
                    }
                },
                data: [10, 7, 9, 5, 8, 11, 4],
            }
        ]
    };
    myChart.setOption(option);
};
line();
//广告分布
function place() {
    var myChart = echarts.init(document.getElementById('adplace'),'chalk');
    var option = {
        backgroundColor:'transparent',
        tooltip: {
            trigger: 'item',
        },
        visualMap: {
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            itemWidth: 20,
            itemHeight: 80,
            text: ['高','低'],           // 文本，默认为数值文本
            inRange: {
                color: ['#fee9b4','#cf181d'],
            },
            textStyle: {
                color: '#fff',
                fontSize: 12,
            },
            calculable: true
        },
        series: [
            {
                name:'所在位置',
                type: 'map',
                mapType: 'china',
                roam: false,
                zoom:1.25,
                aspectScale: 1,
                label: {
                    show:true,
                },
                itemStyle:{
                    normal: {
                        borderWidth:2,
                        borderColor:'white',
                        areaColor:'#fde5b1',
                        label: {
                            show: true,
                            textStyle: {
                                color: "#333",
                                fontSize: 14,
                                fontWeight:'700',
                            }
                        }
                    },
                    emphasis: {// 也是选中样式
                        borderWidth:2,
                        borderColor:'#fff',
                        label: {
                            show: true,
                            textStyle: {
                                color: "#333",
                                fontSize: 14,
                                fontWeight:'700',
                            }
                        }
                    }
                },
                data:[{name:'北京',value:244},{name:'黑龙江',value:512},
                    {name:'山东',value:311},{name:'新疆',value:123},
                    {name:'广东',value:469},]
            }
        ]
    };
    myChart.setOption(option);
};
place();
//广告发布量排名和煽动性排名
function adRank(classname) {
    var myChart = echarts.init(document.getElementById(classname),'chalk');
    var option = {
        backgroundColor:'transparent',
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '13%',
            containLabel: true
        },
        yAxis: {
            name:'预警数量',
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        xAxis: {
            name:'预警对象',
            type: 'category',
            axisLabel:{
                interval:0,
                rotate:90,//倾斜度 -90 至 90 默认为0
                margin:2,
                textStyle:{
                    fontSize:8
                }
            },
            data : ['优易网','湖北嘟嘟','有糖','品质金融','一元云购','上海中晋公司','风车点赞','玫瑰庄园','青云门','浙江本色控股'],
        },
        series: [
            {
                name: '预警数',
                type: 'bar',
                data:[11, 22, 34, 53, 65, 78, 89, 101, 122, 156].reverse(),
            },
        ]
    };
    myChart.setOption(option);
}
adRank('adTotal');
setTimeout(function () {
    adRank('provocative');
},1000)
//广告渠道和广告煽动性
function pieNum(classname,data) {
    var h=[];
    $.each(data,function (index,item) {
        h.push(item.name);
    })
    var myChart = echarts.init(document.getElementById(classname),'chalk');
    var option = {
        backgroundColor:'transparent',
        title : {
            text: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: h
        },
        series : [
            {
                name: '发布者',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:data,
                label: {
                    normal:{
                        show: true,
                        position:'inner',
                        formatter: "{b} {d}%",
                        textStyle: {
                            fontWeight:'bolder',
                            fontSize : '12',
                            color:'#164d8e'
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}
var a1=[{name:'强煽动性',value:'200'},{name:'一般煽动性',value:'400'},{name:'无煽动性',value:'700'}];
var a2=[{name:'微博',value:'200'},{name:'微信',value:'400'},{name:'知乎',value:'700'},
    {name:'贴吧',value:'400'},{name:'论坛',value:'700'}];
pieNum('incitement',a1);
setTimeout(function () {
    pieNum('channel',a2);
},1000);
//煽动性排名
function sixRankBar(classname,tit) {
    var myChart = echarts.init(document.getElementById(classname),'chalk');
    var option = {
        backgroundColor:'transparent',
        title: {
            text: tit,
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '13%',
            containLabel: true
        },
        yAxis: {
            name:'预警数量',
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        xAxis: {
            name:'预警对象',
            type: 'category',
            axisLabel:{
                interval:0,
                rotate:90,//倾斜度 -90 至 90 默认为0
                margin:2,
                textStyle:{
                    fontSize:8
                }
            },
            data : ['优易网','湖北嘟嘟','有糖','品质金融','一元云购','上海中晋公司','风车点赞','玫瑰庄园','青云门','浙江本色控股'],
        },
        series: [
            {
                name: '预警数',
                type: 'bar',
                data:[11, 22, 34, 53, 65, 78, 89, 101, 122, 156].reverse(),
            },
        ]
    };
    myChart.setOption(option);
};
sixRankBar('top6-1','微博');
sixRankBar('top6-2','微信');
sixRankBar('bot6-3','贴吧');
sixRankBar('bot6-4','知乎');
sixRankBar('bot6-5','论坛');
//渠道详情
function sevenRankPie(classname,tit,data) {
    var myChart = echarts.init(document.getElementById(classname),'chalk');
    var option = {
        backgroundColor:'transparent',
        title : {
            text: tit,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: h
        // },
        series : [
            {
                name: '发布者',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:data,
                label: {
                    normal:{
                        show: true,
                        position:'inner',
                        formatter: "{b} {d}%",
                        textStyle: {
                            fontWeight:'bolder',
                            fontSize : '12',
                            color:'#164d8e'
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}
sevenRankPie('top7-1','微博',a1);
sevenRankPie('top7-2','微信',a1);
sevenRankPie('bot7-3','贴吧',a1);
sevenRankPie('bot7-4','知乎',a1);
sevenRankPie('bot7-5','论坛',a1);
