//====预警记录====
var earlyWarningdata=[{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'指标预警','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'指标预警','e':'集资','f':'heiha'},
    {'a':'青云门','b':'北京','c':'2016-11-24','d':'模型预警','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
    {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
    {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
    {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
    {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
    {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'}]
var earlyWarning_url='/detection/detectData/';
public_ajax.call_request('get',earlyWarning_url,earlyWarning);
function earlyWarning(data) {
    $('#recordingTable').bootstrapTable('load', data);
    $('#recordingTable').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 8,//单页记录数
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
                field: "entity_name",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.entity_name==''||row.entity_name=='null'||row.entity_name=='unknown'||!row.entity_name){
                        return '未知';
                    }else {
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.entity_name+'\')" title="进入画像">'+row.entity_name+'</span>';
                    };
                }
            },
            {
                title: "注册地",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    var registAddress;
                    if(row.province == '北京市'){
                        registAddress= row.city+row.district;
                    }else{
                        registAddress= row.province+row.city+row.district;
                    }
                    if (registAddress.length == 0){
                        return '未知';
                    }else {
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.registAddress+'\')" title="注册地">'+registAddress+'</span>';
                    };
                }

            },
            {
                title: "时间",//标题
                field: "date",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "预警理由",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    var warningReasons;
                    if(row.illegal_type==1){
                        warningReasons = '模型预警';
                    }else if(row.illegal_type==2){
                        warningReasons = '舆情预警';
                    }else if(row.illegal_type==3){
                        warningReasons = '指标预警';
                    }
                    if (row.illegal_type==''||row.illegal_type=='null'||row.illegal_type=='unknown'||!row.illegal_type){
                        return '未知';
                    }else{
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.entity_name+'\')" title="预警理由">'+warningReasons+'</span>';
                    };
                }
            },
            {
                title: "运营模式",//标题
                field: "e",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.operation_mode==''||row.operation_mode=='null'||row.operation_mode=='unknown'||!row.operation_mode){
                        return '互联网金融';
                    }else {
                        // return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.entity_name+'\')" title="进入画像">'+row.entity_name+'</span>';

                        return '互联网金融'; // ====先写死====
                    };
                }
            },
            {
                title: "监测详情",//标题
                field: "f",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_2(\''+row.d+'\')" title="查看详情"><i class="icon icon-file-alt"></i></span>';
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
                    return '<span style="cursor:pointer;color:white;" onclick="prove(\''+row.a+'\')" title="一键取证"><i class="icon icon-signin"></i></span>';
                }
            },
        ],
    });
    $('#recordingTable p.load').hide();
};
// earlyWarning(earlyWarningdata);

function jumpFrame_1(flag) {
    var html='';
    // 页面展示出来 先
    if (flag=='湖北嘟嘟'){
        html = '/index/company';
    }else if(flag=='优易网'){
        // html='../templates/platform.html';
        html = '/index/platform';
    }else if(flag=='青云门'){
        html = '/index/project';
    }else {
        // 页面展示出来 先
        html = '/index/company';
        // html = '/index/platform';
        // html = '/index/project';
    }
    window.location.href=html;
}
function jumpFrame_2(monitorFlag) {
    window.localStorage.setItem('monitorFlag',monitorFlag);
    window.location.href='../templates/monitorDetails.html';
}
function prove(flag) {

}
//预警趋势
function line_1() {
    var myChart = echarts.init(document.getElementById('trendLine'),'chalk');
    var option = {
        backgroundColor:'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        grid: {
            left: '4%',
            right: '7%',
            bottom: '8%',
            top:'4%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    width:'2'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontWeight:'700'
                }
            },
            data: ['周一','周二','周三','周四','周五','周六','周日'],
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    width:'2'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14,
                    fontWeight:'700',
                    color:'white',
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [
            {
                name: '预警次数',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
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
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12
                    }
                },
                data: [11, 11, 15, 13, 12, 13, 10],
            }
        ]
    };
    myChart.setOption(option);
}
line_1();

//====预警排名====
    var ranking_url='/detection/detectRank?date=7';
    public_ajax.call_request('get',ranking_url,line_2);
    function line_2(data) {
        if(data){
            var entity_nameArr = [], rankingData = [];
            for(var i=0;i<data.length;i++){
                entity_nameArr.push(data[i].entity_name);
                rankingData.push(data[i].count)
            }
            var myChart = echarts.init(document.getElementById('warningNum'),'chalk');
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
                legend: {
                    data: ['']
                },
                grid: {
                    left: '3%',
                    right: '8%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    name:'预警数量',
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    name:'预警对象',
                    type: 'category',
                    // data : ['优易网','湖北嘟嘟','有糖','品质金融','一元云购','上海中晋公司','风车点赞','玫瑰庄园','青云门','浙江本色控股'],
                    data :entity_nameArr,
                },
                series: [
                    {
                        name: '预警数',
                        type: 'bar',
                        // data:[11, 22, 34, 53, 65, 78, 89, 101, 122, 156],
                        data:rankingData,
                        markPoint : {
                            data : [
                                {
                                    type : 'max',
                                    name: '最大值',
                                    itemStyle:{
                                        normal:{
                                            color:'rgb(175, 215, 237)',
                                        }
                                    },
                                    label:{
                                        normal:{
                                            textStyle:
                                                {color:'#fff'},
                                        }
                                    }
                                },
                                {
                                    type : 'min',
                                    name: '最小值',
                                    itemStyle:{
                                        normal:{
                                            color:'rgb(147, 224, 255)',
                                        }
                                    },
                                    label:{
                                        normal:{
                                            textStyle:
                                                {color:'#fff'},
                                        }
                                    }
                                },
                            ]
                        },
                    },
                ]
            };
            $('#warningNum p.load').hide();
            myChart.setOption(option);
        }

    }
    // line_2();
    // ===时间选项===
    $('._time2').change(function(){
        var selectTime = $(this).children('option:selected').val();//这就是selected的值
        ranking_url = '/detection/detectRank?date='+selectTime;
        console.log(ranking_url);
        public_ajax.call_request('get',ranking_url,line_2);
    })


//====预警分布====
require.config({
    paths: {
        echarts: '/static/js/echarts-2/build/dist',
    }
});
require(
    [
        'echarts',
        'echarts/chart/map'
    ],
    function (ec) {
        // var myChart = echarts.init(document.getElementById('picChart-1'),'dark');
        var myChart = ec.init(document.getElementById('map'),'chalk');
        var option = {
            backgroundColor:'transparent',
            title : {
                text: '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:['']
            },
            dataRange: {
                min : 0,
                max : 500,
                calculable : true,
                color: ['maroon','purple','red','orange','yellow','lightgreen']
            },
            series : [
                {
                    name: '',
                    type: 'map',
                    mapType: 'china',
                    hoverable: true,
                    scaleLimit: {max:5, min:0.8},
                    data : [],
                    itemStyle: {
                        normal: {
                            borderWidth:2,
                            borderColor:'white',
                            color:'rgba(3, 3, 4, 0.41)',
                            label: {
                                show: false,
                                textStyle: {
                                    color: "rgb(249, 249, 249)",
                                    fontSize: 14,
                                    fontWeight:'700',
                                }
                            }
                        },
                        emphasis: {// 也是选中样式
                            borderWidth:2,
                            borderColor:'#fff',
                            color: 'rgba(4, 4, 4, 0.6)',
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#a3e00b',
                                    fontSize: 14,
                                    fontWeight:'700',
                                }
                            }
                        }
                    },
                    markPoint : {
                        symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                        itemStyle: {
                            normal: {
                                borderColor: '#87cefa',
                                borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                label: {
                                    show: false
                                }
                            },
                            emphasis: {
                                borderColor: '#1e90ff',
                                borderWidth: 5,
                                label: {
                                    show: false
                                }
                            }
                        },
                        data : [
                            {name: "海门", value: 9},
                            {name: "鄂尔多斯", value: 12},
                            {name: "招远", value: 12},
                            {name: "舟山", value: 12},
                            {name: "齐齐哈尔", value: 14},
                            {name: "盐城", value: 15},
                            {name: "赤峰", value: 16},
                            {name: "青岛", value: 18},
                            {name: "乳山", value: 18},
                            {name: "金昌", value: 19},
                            {name: "泉州", value: 21},
                            {name: "莱西", value: 21},
                            {name: "日照", value: 21},
                            {name: "胶南", value: 22},
                            {name: "南通", value: 23},
                            {name: "拉萨", value: 24},
                            {name: "云浮", value: 24},
                            {name: "梅州", value: 25},
                            {name: "文登", value: 25},
                            {name: "上海", value: 25},
                            {name: "攀枝花", value: 25},
                            {name: "威海", value: 25},
                            {name: "承德", value: 25},
                            {name: "厦门", value: 26},
                            {name: "汕尾", value: 26},
                            {name: "潮州", value: 26},
                            {name: "丹东", value: 27},
                            {name: "太仓", value: 27},
                            {name: "曲靖", value: 27},
                            {name: "烟台", value: 28},
                            {name: "福州", value: 29},
                            {name: "瓦房店", value: 30},
                            {name: "即墨", value: 30},
                            {name: "抚顺", value: 31},
                            {name: "玉溪", value: 31},
                            {name: "张家口", value: 31},
                            {name: "阳泉", value: 31},
                            {name: "莱州", value: 32},
                            {name: "湖州", value: 32},
                            {name: "汕头", value: 32},
                            {name: "昆山", value: 33},
                            {name: "宁波", value: 33},
                            {name: "湛江", value: 33},
                            {name: "揭阳", value: 34},
                            {name: "荣成", value: 34},
                            {name: "连云港", value: 35},
                            {name: "葫芦岛", value: 35},
                            {name: "常熟", value: 36},
                            {name: "东莞", value: 36},
                            {name: "河源", value: 36},
                            {name: "淮安", value: 36},
                            {name: "泰州", value: 36},
                            {name: "南宁", value: 37},
                            {name: "营口", value: 37},
                            {name: "惠州", value: 37},
                            {name: "江阴", value: 37},
                            {name: "蓬莱", value: 37},
                            {name: "韶关", value: 38},
                            {name: "嘉峪关", value: 38},
                            {name: "广州", value: 38},
                            {name: "延安", value: 38},
                            {name: "太原", value: 39},
                            {name: "清远", value: 39},
                            {name: "中山", value: 39},
                            {name: "昆明", value: 39},
                            {name: "寿光", value: 40},
                            {name: "盘锦", value: 40},
                            {name: "长治", value: 41},
                            {name: "深圳", value: 41},
                            {name: "珠海", value: 42},
                            {name: "宿迁", value: 43},
                            {name: "咸阳", value: 43},
                            {name: "铜川", value: 44},
                            {name: "平度", value: 44},
                            {name: "佛山", value: 44},
                            {name: "海口", value: 44},
                            {name: "江门", value: 45},
                            {name: "章丘", value: 45},
                            {name: "肇庆", value: 46},
                            {name: "大连", value: 47},
                            {name: "临汾", value: 47},
                            {name: "吴江", value: 47},
                            {name: "石嘴山", value: 49},
                            {name: "沈阳", value: 50},
                            {name: "苏州", value: 50},
                            {name: "茂名", value: 50},
                            {name: "嘉兴", value: 51},
                            {name: "长春", value: 51},
                            {name: "胶州", value: 52},
                            {name: "银川", value: 52},
                            {name: "张家港", value: 52},
                            {name: "三门峡", value: 53},
                            {name: "锦州", value: 54},
                            {name: "南昌", value: 54},
                            {name: "柳州", value: 54},
                            {name: "三亚", value: 54},
                            {name: "自贡", value: 56},
                            {name: "吉林", value: 56},
                            {name: "阳江", value: 57},
                            {name: "泸州", value: 57},
                            {name: "西宁", value: 57},
                            {name: "宜宾", value: 58},
                            {name: "呼和浩特", value: 58},
                            {name: "成都", value: 58},
                            {name: "大同", value: 58},
                            {name: "镇江", value: 59},
                            {name: "桂林", value: 59},
                            {name: "张家界", value: 59},
                            {name: "宜兴", value: 59},
                            {name: "北海", value: 60},
                            {name: "西安", value: 61},
                            {name: "金坛", value: 62},
                            {name: "东营", value: 62},
                            {name: "牡丹江", value: 63},
                            {name: "遵义", value: 63},
                            {name: "绍兴", value: 63},
                            {name: "扬州", value: 64},
                            {name: "常州", value: 64},
                            {name: "潍坊", value: 65},
                            {name: "重庆", value: 66},
                            {name: "台州", value: 67},
                            {name: "南京", value: 67},
                            {name: "滨州", value: 70},
                            {name: "贵阳", value: 71},
                            {name: "无锡", value: 71},
                            {name: "本溪", value: 71},
                            {name: "克拉玛依", value: 72},
                            {name: "渭南", value: 72},
                            {name: "马鞍山", value: 72},
                            {name: "宝鸡", value: 72},
                            {name: "焦作", value: 75},
                            {name: "句容", value: 75},
                            {name: "北京", value: 79},
                            {name: "徐州", value: 79},
                            {name: "衡水", value: 80},
                            {name: "包头", value: 80},
                            {name: "绵阳", value: 80},
                            {name: "乌鲁木齐", value: 84},
                            {name: "枣庄", value: 84},
                            {name: "杭州", value: 84},
                            {name: "淄博", value: 85},
                            {name: "鞍山", value: 86},
                            {name: "溧阳", value: 86},
                            {name: "库尔勒", value: 86},
                            {name: "安阳", value: 90},
                            {name: "开封", value: 90},
                            {name: "济南", value: 92},
                            {name: "德阳", value: 93},
                            {name: "温州", value: 95},
                            {name: "九江", value: 96},
                            {name: "邯郸", value: 98},
                            {name: "临安", value: 99},
                            {name: "兰州", value: 99},
                            {name: "沧州", value: 100},
                            {name: "临沂", value: 103},
                            {name: "南充", value: 104},
                            {name: "天津", value: 105},
                            {name: "富阳", value: 106},
                            {name: "泰安", value: 112},
                            {name: "诸暨", value: 112},
                            {name: "郑州", value: 113},
                            {name: "哈尔滨", value: 114},
                            {name: "聊城", value: 116},
                            {name: "芜湖", value: 117},
                            {name: "唐山", value: 119},
                            {name: "平顶山", value: 119},
                            {name: "邢台", value: 119},
                            {name: "德州", value: 120},
                            {name: "济宁", value: 120},
                            {name: "荆州", value: 127},
                            {name: "宜昌", value: 130},
                            {name: "义乌", value: 132},
                            {name: "丽水", value: 133},
                            {name: "洛阳", value: 134},
                            {name: "秦皇岛", value: 136},
                            {name: "株洲", value: 143},
                            {name: "石家庄", value: 147},
                            {name: "莱芜", value: 148},
                            {name: "常德", value: 152},
                            {name: "保定", value: 153},
                            {name: "湘潭", value: 154},
                            {name: "金华", value: 157},
                            {name: "岳阳", value: 169},
                            {name: "长沙", value: 175},
                            {name: "衢州", value: 177},
                            {name: "廊坊", value: 193},
                            {name: "菏泽", value: 194},
                            {name: "合肥", value: 229},
                            {name: "武汉", value: 273},
                            {name: "大庆", value: 279}
                        ]
                    },
                    geoCoord: {
                        "海门":[121.15,31.89],
                        "鄂尔多斯":[109.781327,39.608266],
                        "招远":[120.38,37.35],
                        "舟山":[122.207216,29.985295],
                        "齐齐哈尔":[123.97,47.33],
                        "盐城":[120.13,33.38],
                        "赤峰":[118.87,42.28],
                        "青岛":[120.33,36.07],
                        "乳山":[121.52,36.89],
                        "金昌":[102.188043,38.520089],
                        "泉州":[118.58,24.93],
                        "莱西":[120.53,36.86],
                        "日照":[119.46,35.42],
                        "胶南":[119.97,35.88],
                        "南通":[121.05,32.08],
                        "拉萨":[91.11,29.97],
                        "云浮":[112.02,22.93],
                        "梅州":[116.1,24.55],
                        "文登":[122.05,37.2],
                        "上海":[121.48,31.22],
                        "攀枝花":[101.718637,26.582347],
                        "威海":[122.1,37.5],
                        "承德":[117.93,40.97],
                        "厦门":[118.1,24.46],
                        "汕尾":[115.375279,22.786211],
                        "潮州":[116.63,23.68],
                        "丹东":[124.37,40.13],
                        "太仓":[121.1,31.45],
                        "曲靖":[103.79,25.51],
                        "烟台":[121.39,37.52],
                        "福州":[119.3,26.08],
                        "瓦房店":[121.979603,39.627114],
                        "即墨":[120.45,36.38],
                        "抚顺":[123.97,41.97],
                        "玉溪":[102.52,24.35],
                        "张家口":[114.87,40.82],
                        "阳泉":[113.57,37.85],
                        "莱州":[119.942327,37.177017],
                        "湖州":[120.1,30.86],
                        "汕头":[116.69,23.39],
                        "昆山":[120.95,31.39],
                        "宁波":[121.56,29.86],
                        "湛江":[110.359377,21.270708],
                        "揭阳":[116.35,23.55],
                        "荣成":[122.41,37.16],
                        "连云港":[119.16,34.59],
                        "葫芦岛":[120.836932,40.711052],
                        "常熟":[120.74,31.64],
                        "东莞":[113.75,23.04],
                        "河源":[114.68,23.73],
                        "淮安":[119.15,33.5],
                        "泰州":[119.9,32.49],
                        "南宁":[108.33,22.84],
                        "营口":[122.18,40.65],
                        "惠州":[114.4,23.09],
                        "江阴":[120.26,31.91],
                        "蓬莱":[120.75,37.8],
                        "韶关":[113.62,24.84],
                        "嘉峪关":[98.289152,39.77313],
                        "广州":[113.23,23.16],
                        "延安":[109.47,36.6],
                        "太原":[112.53,37.87],
                        "清远":[113.01,23.7],
                        "中山":[113.38,22.52],
                        "昆明":[102.73,25.04],
                        "寿光":[118.73,36.86],
                        "盘锦":[122.070714,41.119997],
                        "长治":[113.08,36.18],
                        "深圳":[114.07,22.62],
                        "珠海":[113.52,22.3],
                        "宿迁":[118.3,33.96],
                        "咸阳":[108.72,34.36],
                        "铜川":[109.11,35.09],
                        "平度":[119.97,36.77],
                        "佛山":[113.11,23.05],
                        "海口":[110.35,20.02],
                        "江门":[113.06,22.61],
                        "章丘":[117.53,36.72],
                        "肇庆":[112.44,23.05],
                        "大连":[121.62,38.92],
                        "临汾":[111.5,36.08],
                        "吴江":[120.63,31.16],
                        "石嘴山":[106.39,39.04],
                        "沈阳":[123.38,41.8],
                        "苏州":[120.62,31.32],
                        "茂名":[110.88,21.68],
                        "嘉兴":[120.76,30.77],
                        "长春":[125.35,43.88],
                        "胶州":[120.03336,36.264622],
                        "银川":[106.27,38.47],
                        "张家港":[120.555821,31.875428],
                        "三门峡":[111.19,34.76],
                        "锦州":[121.15,41.13],
                        "南昌":[115.89,28.68],
                        "柳州":[109.4,24.33],
                        "三亚":[109.511909,18.252847],
                        "自贡":[104.778442,29.33903],
                        "吉林":[126.57,43.87],
                        "阳江":[111.95,21.85],
                        "泸州":[105.39,28.91],
                        "西宁":[101.74,36.56],
                        "宜宾":[104.56,29.77],
                        "呼和浩特":[111.65,40.82],
                        "成都":[104.06,30.67],
                        "大同":[113.3,40.12],
                        "镇江":[119.44,32.2],
                        "桂林":[110.28,25.29],
                        "张家界":[110.479191,29.117096],
                        "宜兴":[119.82,31.36],
                        "北海":[109.12,21.49],
                        "西安":[108.95,34.27],
                        "金坛":[119.56,31.74],
                        "东营":[118.49,37.46],
                        "牡丹江":[129.58,44.6],
                        "遵义":[106.9,27.7],
                        "绍兴":[120.58,30.01],
                        "扬州":[119.42,32.39],
                        "常州":[119.95,31.79],
                        "潍坊":[119.1,36.62],
                        "重庆":[106.54,29.59],
                        "台州":[121.420757,28.656386],
                        "南京":[118.78,32.04],
                        "滨州":[118.03,37.36],
                        "贵阳":[106.71,26.57],
                        "无锡":[120.29,31.59],
                        "本溪":[123.73,41.3],
                        "克拉玛依":[84.77,45.59],
                        "渭南":[109.5,34.52],
                        "马鞍山":[118.48,31.56],
                        "宝鸡":[107.15,34.38],
                        "焦作":[113.21,35.24],
                        "句容":[119.16,31.95],
                        "北京":[116.46,39.92],
                        "徐州":[117.2,34.26],
                        "衡水":[115.72,37.72],
                        "包头":[110,40.58],
                        "绵阳":[104.73,31.48],
                        "乌鲁木齐":[87.68,43.77],
                        "枣庄":[117.57,34.86],
                        "杭州":[120.19,30.26],
                        "淄博":[118.05,36.78],
                        "鞍山":[122.85,41.12],
                        "溧阳":[119.48,31.43],
                        "库尔勒":[86.06,41.68],
                        "安阳":[114.35,36.1],
                        "开封":[114.35,34.79],
                        "济南":[117,36.65],
                        "德阳":[104.37,31.13],
                        "温州":[120.65,28.01],
                        "九江":[115.97,29.71],
                        "邯郸":[114.47,36.6],
                        "临安":[119.72,30.23],
                        "兰州":[103.73,36.03],
                        "沧州":[116.83,38.33],
                        "临沂":[118.35,35.05],
                        "南充":[106.110698,30.837793],
                        "天津":[117.2,39.13],
                        "富阳":[119.95,30.07],
                        "泰安":[117.13,36.18],
                        "诸暨":[120.23,29.71],
                        "郑州":[113.65,34.76],
                        "哈尔滨":[126.63,45.75],
                        "聊城":[115.97,36.45],
                        "芜湖":[118.38,31.33],
                        "唐山":[118.02,39.63],
                        "平顶山":[113.29,33.75],
                        "邢台":[114.48,37.05],
                        "德州":[116.29,37.45],
                        "济宁":[116.59,35.38],
                        "荆州":[112.239741,30.335165],
                        "宜昌":[111.3,30.7],
                        "义乌":[120.06,29.32],
                        "丽水":[119.92,28.45],
                        "洛阳":[112.44,34.7],
                        "秦皇岛":[119.57,39.95],
                        "株洲":[113.16,27.83],
                        "石家庄":[114.48,38.03],
                        "莱芜":[117.67,36.19],
                        "常德":[111.69,29.05],
                        "保定":[115.48,38.85],
                        "湘潭":[112.91,27.87],
                        "金华":[119.64,29.12],
                        "岳阳":[113.09,29.37],
                        "长沙":[113,28.21],
                        "衢州":[118.88,28.97],
                        "廊坊":[116.7,39.53],
                        "菏泽":[115.480656,35.23375],
                        "合肥":[117.27,31.86],
                        "武汉":[114.31,30.52],
                        "大庆":[125.03,46.58]
                    }
                },
                {
                    name: 'Top5',
                    type: 'map',
                    mapType: 'china',
                    data:[],
                    markPoint : {
                        symbol:'emptyCircle',
                        symbolSize : function (v){
                            return 10 + v/100
                        },
                        effect : {
                            show: true,
                            shadowBlur : 0
                        },
                        itemStyle:{
                            normal:{
                                label:{show:false}
                            }
                        },
                        data : [
                            {name: "廊坊", value: 193},
                            {name: "菏泽", value: 194},
                            {name: "合肥", value: 229},
                            {name: "武汉", value: 273},
                            {name: "大庆", value: 279}
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
);
    //==地图==
var placeData=[{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
    {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},]
var placeRank_url='/detection/detectDistribute/';
public_ajax.call_request('get',placeRank_url,placeRank);
function placeRank(data) {
    $('#placeRank').bootstrapTable('load', data);
    $('#placeRank').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 10,//单页记录数
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
                title: "省份",//标题
                field: "province",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.province==''||row.province=='null'||row.province=='unknown'||!row.province){
                        return '未知';
                    }else {
                        return row.province;
                    };
                }
            },
            {
                title: "指标预警",//标题
                field: "count1",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "模型预警",//标题
                field: "count1",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                // title: "舆情预警",//标题
                title: "指标预警",//标题
                field: "count1",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "sum",//标题
                field: "sum",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
        ],
    });
};
// placeRank(placeData);

//====运营模式====
function pie_1() {
    var myChart = echarts.init(document.getElementById('pie-1'),'chalk');
    var option = {
        backgroundColor:'transparent',
        title : {
            text: '业务类别',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['互联网金融','传统金融','非金融业务']
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:768, name:'互联网金融'},
                    {value:453, name:'传统金融'},
                    {value:1548, name:'非金融业务'}
                ],
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
pie_1();
function pie_2() {
    var myChart = echarts.init(document.getElementById('pie-2'),'chalk');
    var option = {
        backgroundColor:'transparent',
        title : {
            text: '业务形态',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['P2P理财','投资项目','游戏','任务奖励','外汇','私募股权基金']
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'P2P理财'},
                    {value:310, name:'投资项目'},
                    {value:234, name:'任务奖励'},
                    {value:135, name:'游戏'},
                    {value:456, name:'外汇'},
                    {value:1548, name:'私募股权基金'}
                ],
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
pie_2();


//类型
function pie_3() {
    var myChart = echarts.init(document.getElementById('warningType'),'chalk');
    var option = {
        backgroundColor:'transparent',
        title : {
            text: '',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['收益率异常','广告异常','经营异常','宣传行为异常','负面评论异常','诉讼异常','模型异常','舆情异常']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'收益率异常'},
                    {value:310, name:'广告异常'},
                    {value:234, name:'经营异常'},
                    {value:135, name:'宣传行为异常'},
                    {value:1548, name:'负面评论异常'},
                    {value:456, name:'诉讼异常'},
                    {value:873, name:'模型异常'},
                    {value:633, name:'舆情异常'},
                ],
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
pie_3();