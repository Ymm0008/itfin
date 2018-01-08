
// ====预警数====
    var warnCount_url = '/detection/warnCount/';
    public_ajax.call_request('get',warnCount_url,warnCount);
    function warnCount(data){
        if(data){
            $('.topTitle .com-3').text(data.seven);
            $('.topTitle .com-2').text(data.thirty);
            $('.topTitle .com-1').text(data.ninty);
        }
    }

//====预警记录====
    var earlyWarningdata=[{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'指标预警','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'指标预警','e':'集资','f':'heiha'},
        {'a':'青云门','b':'北京','c':'2016-11-24','d':'模型预警','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
        {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
        {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
        {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
        {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'湖北嘟嘟','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},{'a':'优易网','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'},
        {'a':'青云门','b':'北京','c':'2016-11-24','d':'ALIBABA','e':'集资','f':'heiha'}]
    var earlyWarning_url='/detection/detectData/?date=7';
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
                            return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.entity_name+'\',\''+row.entity_type+'\',\''+row.id+'\')" title="进入画像">'+row.entity_name+'</span>';
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
                        if(row.province == '北京' || row.province == '上海' || row.province == '天津' || row.province == '重庆'){
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
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.entity_name+'\',\''+row.entity_type+'\',\''+row.id+'\')" title="查看详情"><i class="icon icon-file-alt"></i></span>';
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
    // ===时间选项===
    $('#select-1').change(function(){
        var selectTime = $(this).children('option:selected').val();//这就是selected的值
        earlyWarning_url = '/detection/detectData/?date='+selectTime;
        console.log(earlyWarning_url);
        public_ajax.call_request('get',earlyWarning_url,earlyWarning);
    })

    function jumpFrame_1(name,type,id) {
        var html='';
        name=escape(name);
        if (type=='1'||type=='2'){
            html='/index/company/?name='+name+'&flag='+type+'&pid='+id;
        }else {
            html='/index/project/?name='+name+'&flag='+type+'&pid='+id;
        }
        window.location.href=html;
    }
    // 监测详情
    function jumpFrame_2(monitorFlag) {
        // window.localStorage.setItem('monitorFlag',monitorFlag);
        // window.location.href='../templates/monitorDetails.html';
        window.location.href='/index/monitor/';
    }
    // 一键取证
    function prove(flag) {

    }

//====预警趋势====
    var timeDistribute_url='/homepage/timeDistribute/';
    public_ajax.call_request('get',timeDistribute_url,line_1_new);
    var option_1 = {
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
            top:'10%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                }
            },
            data:[],
        }],
        yAxis: [{
            type: 'value',
            name:'当日总预警数',
            nameLocation:'end',
            nameTextStyle:{
                fontSize:14
            },
            axisTick: {
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: '#57c4d3'
                }
            },
            axisLabel: {
                show:true,
                // margin: 10,
                textStyle: {
                    fontSize: 14,
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
                name: '',
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
                // data: day30Data,
                data: [],
            }
        ]
    };
    var day30_new=[],day30Data_new=[];
    function line_1_new(data) {
        if(data){
            $('#picChart-2 p.load').hide();
            for(var i=0;i<data.length;i++){
                day30_new.push(data[i].time);
                day30Data_new.push(data[i].count)
            };
            option_1.xAxis[0].data = day30_new.reverse();
            option_1.series[0].data = day30Data_new.reverse();
            var myChart = echarts.init(document.getElementById('trendLine'),'chalk');
            myChart.setOption(option_1);
        }
    }

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
            yAxis: [
                {
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
                    }
                }
            ],
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
    // line_1();
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
                // data: ['收益率异常','广告异常','经营异常','宣传行为异常','负面评论异常','诉讼异常','模型异常','舆情异常']
                data: ['收益率异常','广告异常','经营异常','诉讼异常','模型预警','舆情预警']
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
                        // {value:135, name:'宣传行为异常'},
                        // {value:1548, name:'负面评论异常'},
                        {value:456, name:'诉讼异常'},
                        {value:873, name:'模型预警'},
                        {value:633, name:'舆情预警'},
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

//====预警分布====
    // ===表格
    var placeData=[{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},
        {'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},{'a':'北京','b':'67','c':'25','d':'56'},]
    var placeRank_url='/detection/detectDistribute?date=7';
    public_ajax.call_request('get',placeRank_url,placeRank);
    var mapData = [],
        mapTop5 = [],
        mapT5 = [];
    function placeRank(data) {
        if(data){
            for(var i=0;i<data.length;i++){
                mapData.push({name:data[i].city,value:data[i].sum})
            }
            // console.log(mapData);
            mapTop5 = data.slice(0,5);
            for(var j=0;j<mapTop5.length;j++){
                mapT5.push({name:mapTop5[j].city,value:mapTop5[j].sum})
            }
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
                        title: "市",//标题
                        field: "city",//键名
                        sortable: true,//是否可排序
                        order: "desc",//默认排序方式
                        align: "center",//水平
                        valign: "middle",//垂直
                        formatter: function (value, row, index) {
                            if (row.city==''||row.city=='null'||row.city=='unknown'||!row.city){
                                return '未知';
                            }else {
                                return row.city;
                            };
                        }
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
                        title: "舆情预警",//标题
                        field: "count2",//键名
                        sortable: true,//是否可排序
                        order: "desc",//默认排序方式
                        align: "center",//水平
                        valign: "middle",//垂直
                    },
                    // 指标预警去掉
                    // {
                    //     // title: "舆情预警",//标题
                    //     title: "指标预警",//标题
                    //     field: "count3",//键名
                    //     sortable: true,//是否可排序
                    //     order: "desc",//默认排序方式
                    //     align: "center",//水平
                    //     valign: "middle",//垂直
                    // },
                ],
            });
            $('#placeRank p.load').hide();

            // 地图
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
                            max : 2000,
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
                                    /*
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
                                    ],
                                    */
                                    data:mapData
                                },
                                // 更全的地理经纬信息
                                geoCoord : {
                                    '北京':[116.4,39.9],
                                    '天津':[117.2,39.12],
                                    '石家庄':[114.52,38.05],
                                    '唐山':[118.2,39.63],
                                    '秦皇岛':[119.6,39.93],
                                    '邯郸':[114.48,36.62],
                                    '邢台':[114.48,37.07],
                                    '保定':[115.47,38.87],
                                    '张家口':[114.88,40.82],
                                    '承德':[117.93,40.97],
                                    '沧州':[116.83,38.3],
                                    '廊坊':[116.7,39.52],
                                    '衡水':[115.68,37.73],
                                    '太原':[112.55,37.87],
                                    '大同':[113.3,40.08],
                                    '阳泉':[113.57,37.85],
                                    '长治':[113.12,36.2],
                                    '晋城':[112.83,35.5],
                                    '朔州':[112.43,39.33],
                                    '晋中':[112.75,37.68],
                                    '运城':[110.98,35.02],
                                    '忻州':[112.73,38.42],
                                    '临汾':[111.52,36.08],
                                    '吕梁':[111.13,37.52],
                                    '呼和浩特':[111.73,40.83],
                                    '包头':[109.83,40.65],
                                    '乌海':[106.82,39.67],
                                    '赤峰':[118.92,42.27],
                                    '通辽':[122.27,43.62],
                                    '鄂尔多斯':[109.8,39.62],
                                    '呼伦贝尔':[119.77,49.22],
                                    '巴彦淖尔':[107.42,40.75],
                                    '乌兰察布':[113.12,40.98],
                                    '兴安盟':[122.05,46.08],
                                    '锡林郭勒盟':[116.07,43.95],
                                    '阿拉善盟':[105.67,38.83],
                                    '沈阳':[123.43,41.8],
                                    '大连':[121.62,38.92],
                                    '鞍山':[122.98,41.1],
                                    '抚顺':[123.98,41.88],
                                    '本溪':[123.77,41.3],
                                    '丹东':[124.38,40.13],
                                    '锦州':[121.13,41.1],
                                    '营口':[122.23,40.67],
                                    '阜新':[121.67,42.02],
                                    '辽阳':[123.17,41.27],
                                    '盘锦':[122.07,41.12],
                                    '铁岭':[123.83,42.28],
                                    '朝阳':[120.45,41.57],
                                    '葫芦岛':[120.83,40.72],
                                    '长春':[125.32,43.9],
                                    '吉林':[126.55,43.83],
                                    '四平':[124.35,43.17],
                                    '辽源':[125.13,42.88],
                                    '通化':[125.93,41.73],
                                    '白山':[126.42,41.93],
                                    '松原':[124.82,45.13],
                                    '白城':[122.83,45.62],
                                    '延边朝鲜族自治州':[129.5,42.88],
                                    '哈尔滨':[126.53,45.8],
                                    '齐齐哈尔':[123.95,47.33],
                                    '鸡西':[130.97,45.3],
                                    '鹤岗':[130.27,47.33],
                                    '双鸭山':[131.15,46.63],
                                    '大庆':[125.03,46.58],
                                    '伊春':[128.9,47.73],
                                    '佳木斯':[130.37,46.82],
                                    '七台河':[130.95,45.78],
                                    '牡丹江':[129.6,44.58],
                                    '黑河':[127.48,50.25],
                                    '绥化':[126.98,46.63],
                                    '大兴安岭地区':[124.12,50.42],
                                    '上海':[121.47,31.23],
                                    '南京':[118.78,32.07],
                                    '无锡':[120.3,31.57],
                                    '徐州':[117.18,34.27],
                                    '常州':[119.95,31.78],
                                    '苏州':[120.58,31.3],
                                    '南通':[120.88,31.98],
                                    '连云港':[119.22,34.6],
                                    '淮安':[119.02,33.62],
                                    '盐城':[120.15,33.35],
                                    '扬州':[119.4,32.4],
                                    '镇江':[119.45,32.2],
                                    '泰州':[119.92,32.45],
                                    '宿迁':[118.28,33.97],
                                    '杭州':[120.15,30.28],
                                    '宁波':[121.55,29.88],
                                    '温州':[120.7,28],
                                    '嘉兴':[120.75,30.75],
                                    '湖州':[120.08,30.9],
                                    '绍兴':[120.57,30],
                                    '金华':[119.65,29.08],
                                    '衢州':[118.87,28.93],
                                    '舟山':[122.2,30],
                                    '台州':[121.43,28.68],
                                    '丽水':[119.92,28.45],
                                    '合肥':[117.25,31.83],
                                    '芜湖':[118.38,31.33],
                                    '蚌埠':[117.38,32.92],
                                    '淮南':[117,32.63],
                                    '马鞍山':[118.5,31.7],
                                    '淮北':[116.8,33.95],
                                    '铜陵':[117.82,30.93],
                                    '安庆':[117.05,30.53],
                                    '黄山':[118.33,29.72],
                                    '滁州':[118.32,32.3],
                                    '阜阳':[115.82,32.9],
                                    '宿州':[116.98,33.63],
                                    '巢湖':[117.87,31.6],
                                    '六安':[116.5,31.77],
                                    '亳州':[115.78,33.85],
                                    '宣城':[118.75,30.95],
                                    '福州':[119.3,26.08],
                                    '厦门':[118.08,24.48],
                                    '莆田':[119,25.43],
                                    '三明':[117.62,26.27],
                                    '泉州':[118.67,24.88],
                                    '漳州':[117.65,24.52],
                                    '南平':[118.17,26.65],
                                    '龙岩':[117.03,25.1],
                                    '宁德':[119.52,26.67],
                                    '南昌':[115.85,28.68],
                                    '景德镇':[117.17,29.27],
                                    '萍乡':[113.85,27.63],
                                    '九江':[116,29.7],
                                    '新余':[114.92,27.82],
                                    '鹰潭':[117.07,28.27],
                                    '赣州':[114.93,25.83],
                                    '吉安':[114.98,27.12],
                                    '宜春':[114.38,27.8],
                                    '抚州':[116.35,28],
                                    '上饶':[117.97,28.45],
                                    '济南':[116.98,36.67],
                                    '青岛':[120.38,36.07],
                                    '淄博':[118.05,36.82],
                                    '枣庄':[117.32,34.82],
                                    '东营':[118.67,37.43],
                                    '烟台':[121.43,37.45],
                                    '潍坊':[119.15,36.7],
                                    '济宁':[116.58,35.42],
                                    '泰安':[117.08,36.2],
                                    '威海':[122.12,37.52],
                                    '日照':[119.52,35.42],
                                    '莱芜':[117.67,36.22],
                                    '临沂':[118.35,35.05],
                                    '德州':[116.3,37.45],
                                    '聊城':[115.98,36.45],
                                    '滨州':[117.97,37.38],
                                    '菏泽':[115.43,35.25],
                                    '郑州':[113.62,34.75],
                                    '开封':[114.3,34.8],
                                    '洛阳':[112.45,34.62],
                                    '平顶山':[113.18,33.77],
                                    '安阳':[114.38,36.1],
                                    '鹤壁':[114.28,35.75],
                                    '新乡':[113.9,35.3],
                                    '焦作':[113.25,35.22],
                                    '濮阳':[115.03,35.77],
                                    '许昌':[113.85,34.03],
                                    '三门峡':[111.2,34.78],
                                    '南阳':[112.52,33],
                                    '商丘':[115.65,34.45],
                                    '信阳':[114.07,32.13],
                                    '周口':[114.65,33.62],
                                    '驻马店':[114.02,32.98],
                                    '武汉':[114.3,30.6],
                                    '黄石':[115.03,30.2],
                                    '十堰':[110.78,32.65],
                                    '宜昌':[111.28,30.7],
                                    '襄阳':[112.15,32.02],
                                    '鄂州':[114.88,30.4],
                                    '荆门':[112.2,31.03],
                                    '孝感':[113.92,30.93],
                                    '荆州':[112.23,30.33],
                                    '黄冈':[114.87,30.45],
                                    '咸宁':[114.32,29.85],
                                    '随州':[113.37,31.72],
                                    '恩施土家族苗族自治州':[109.47,30.3],
                                    '仙桃':[113.45,30.37],
                                    '长沙':[112.93,28.23],
                                    '株洲':[113.13,27.83],
                                    '湘潭':[112.93,27.83],
                                    '衡阳':[112.57,26.9],
                                    '邵阳':[111.47,27.25],
                                    '岳阳':[113.12,29.37],
                                    '常德':[111.68,29.05],
                                    '张家界':[110.47,29.13],
                                    '益阳':[112.32,28.6],
                                    '郴州':[113.02,25.78],
                                    '永州':[111.62,26.43],
                                    '怀化':[110,27.57],
                                    '娄底':[112,27.73],
                                    '湘西土家族苗族自治州':[109.73,28.32],
                                    '广州':[113.27,23.13],
                                    '韶关':[113.6,24.82],
                                    '深圳':[114.05,22.55],
                                    '珠海':[113.57,22.27],
                                    '汕头':[116.68,23.35],
                                    '佛山':[113.12,23.02],
                                    '江门':[113.08,22.58],
                                    '湛江':[110.35,21.27],
                                    '茂名':[110.92,21.67],
                                    '肇庆':[112.47,23.05],
                                    '惠州':[114.42,23.12],
                                    '梅州':[116.12,24.28],
                                    '汕尾':[115.37,22.78],
                                    '河源':[114.7,23.73],
                                    '阳江':[111.98,21.87],
                                    '清远':[113.03,23.7],
                                    '东莞':[113.75,23.05],
                                    '中山':[113.38,22.52],
                                    '潮州':[116.62,23.67],
                                    '揭阳':[116.37,23.55],
                                    '云浮':[112.03,22.92],
                                    '南宁':[108.37,22.82],
                                    '柳州':[109.42,24.33],
                                    '桂林':[110.28,25.28],
                                    '梧州':[111.27,23.48],
                                    '北海':[109.12,21.48],
                                    '防城港':[108.35,21.7],
                                    '钦州':[108.62,21.95],
                                    '贵港':[109.6,23.1],
                                    '玉林':[110.17,22.63],
                                    '百色':[106.62,23.9],
                                    '贺州':[111.55,24.42],
                                    '河池':[108.07,24.7],
                                    '来宾':[109.23,23.73],
                                    '崇左':[107.37,22.4],
                                    '海口':[110.32,20.03],
                                    '三亚':[109.5,18.25],
                                    '五指山':[109.52,18.78],
                                    '琼海':[110.47,19.25],
                                    '儋州':[109.57,19.52],
                                    '文昌':[110.8,19.55],
                                    '万宁':[110.4,18.8],
                                    '东方':[108.63,19.1],
                                    '重庆':[106.55,29.57],
                                    '成都':[104.07,30.67],
                                    '自贡':[104.78,29.35],
                                    '攀枝花':[101.72,26.58],
                                    '泸州':[105.43,28.87],
                                    '德阳':[104.38,31.13],
                                    '绵阳':[104.73,31.47],
                                    '广元':[105.85,32.43],
                                    '遂宁':[105.57,30.52],
                                    '内江':[105.05,29.58],
                                    '乐山':[103.77,29.57],
                                    '南充':[106.08,30.78],
                                    '眉山':[103.83,30.05],
                                    '宜宾':[104.62,28.77],
                                    '广安':[106.63,30.47],
                                    '达州':[107.5,31.22],
                                    '雅安':[103,29.98],
                                    '巴中':[106.77,31.85],
                                    '资阳':[104.65,30.12],
                                    '阿坝藏族羌族自治州':[102.22,31.9],
                                    '甘孜藏族自治州':[101.97,30.05],
                                    '凉山彝族自治州':[102.27,27.9],
                                    '贵阳':[106.63,26.65],
                                    '六盘水':[104.83,26.6],
                                    '遵义':[106.92,27.73],
                                    '安顺':[105.95,26.25],
                                    '铜仁地区':[109.18,27.72],
                                    '兴义':[104.9,25.08],
                                    '毕节地区':[105.28,27.3],
                                    '黔东南苗族侗族自治州':[107.97,26.58],
                                    '昆明':[102.72,25.05],
                                    '曲靖':[103.8,25.5],
                                    '玉溪':[102.55,24.35],
                                    '保山':[99.17,25.12],
                                    '昭通':[103.72,27.33],
                                    '丽江':[100.23,26.88],
                                    '墨江哈尼族自治县':[101.68,23.43],
                                    '临沧':[100.08,23.88],
                                    '楚雄彝族自治州':[101.55,25.03],
                                    '红河哈尼族彝族自治州':[103.4,23.37],
                                    '文山壮族苗族自治州':[104.25,23.37],
                                    '西双版纳傣族自治州':[100.8,22.02],
                                    '大理白族自治州':[100.23,25.6],
                                    '大理白族自治州':[100.23,25.6],
                                    '德宏傣族景颇族自治州':[98.58,24.43],
                                    '怒江傈僳族自治州':[98.85,25.85],
                                    '迪庆藏族自治州':[99.7,27.83],
                                    '拉萨':[91.13,29.65],
                                    '昌都地区':[97.18,31.13],
                                    '山南地区':[91.77,29.23],
                                    '日喀则地区':[88.88,29.27],
                                    '那曲地区':[92.07,31.48],
                                    '林芝地区':[94.37,29.68],
                                    '西安':[108.93,34.27],
                                    '铜川':[108.93,34.9],
                                    '宝鸡':[107.13,34.37],
                                    '咸阳':[108.7,34.33],
                                    '渭南':[109.5,34.5],
                                    '延安':[109.48,36.6],
                                    '汉中':[107.02,33.07],
                                    '榆林':[109.73,38.28],
                                    '安康':[109.02,32.68],
                                    '商洛':[109.93,33.87],
                                    '兰州':[103.82,36.07],
                                    '嘉峪关':[98.27,39.8],
                                    '金昌':[102.18,38.5],
                                    '白银':[104.18,36.55],
                                    '天水':[105.72,34.58],
                                    '武威':[102.63,37.93],
                                    '张掖':[100.45,38.93],
                                    '平凉':[106.67,35.55],
                                    '酒泉':[98.52,39.75],
                                    '庆阳':[107.63,35.73],
                                    '定西':[104.62,35.58],
                                    '陇南':[104.92,33.4],
                                    '临夏回族自治州':[103.22,35.6],
                                    '甘南藏族自治州':[102.92,34.98],
                                    '西宁':[101.78,36.62],
                                    '海东地区':[102.12,36.5],
                                    '海北藏族自治州':[100.9,36.97],
                                    '黄南藏族自治州':[102.02,35.52],
                                    '海南藏族自治州':[100.62,36.28],
                                    '果洛藏族自治州':[100.23,34.48],
                                    '玉树藏族自治州':[97.02,33],
                                    '海西蒙古族藏族自治州':[97.37,37.37],
                                    '银川':[106.28,38.47],
                                    '石嘴山':[106.38,39.02],
                                    '吴忠':[106.2,37.98],
                                    '固原':[106.28,36],
                                    '中卫':[105.18,37.52],
                                    '乌鲁木齐':[87.62,43.82],
                                    '克拉玛依':[84.87,45.6],
                                    '吐鲁番地区':[89.17,42.95],
                                    '哈密地区':[93.52,42.83],
                                    '昌吉回族自治州':[87.3,44.02],
                                    '博尔塔拉蒙古自治州':[82.07,44.9],
                                    '巴音郭楞蒙古自治州':[86.15,41.77],
                                    '阿克苏地区':[80.27,41.17],
                                    '阿图什':[76.17,39.72],
                                    '喀什地区':[75.98,39.47],
                                    '和田地区':[79.92,37.12],
                                    '伊犁哈萨克自治州':[81.32,43.92],
                                    '塔城地区':[82.98,46.75],
                                    '阿勒泰地区':[88.13,47.85],
                                    '石河子':[86.03,44.3],
                                    '香港':[114.08,22.2],
                                    // '澳门':[113.33,22.13],
                                    '澳门':[113.5494640000,22.1929190000],
                                    '台北':[121.5,25.03],
                                    '高雄':[120.28,22.62],
                                    '基隆':[121.73,25.13],
                                    '台中':[120.67,24.15],
                                    '台南':[120.2,23],
                                    '新竹':[120.95,24.82],
                                    '嘉义':[120.43,23.48],

                                    // ===2017 11 21 LL 新添加的深圳定位信息===
                                    '龙岗区':[114.2544550000,22.7260170000],
                                    '盐田区':[114.2434300000,22.5634380000],
                                    '坪山区':[114.3504740000,22.7162330000],
                                    '大鹏新区':[114.4808220000,22.6044740000],

                                    '深汕特别合作区':[114.9957620000,22.8380630000],
                                    '宝安区':[113.8904270000,22.5600330000],
                                    '光明新区':[113.9236620000,22.7790820000],
                                    '南山区':[113.9365390000,22.5385000000],

                                    '前海特区':[113.9095760000,22.5236480000],
                                    '龙华区':[114.0485290000,22.7575970000],
                                    '福田区':[114.0615470000,22.5284660000],
                                    '罗湖区':[114.1374320000,22.5544850000],

                                    // ===2017 11 20 LL 新添加的青海定位信息===
                                    '果洛藏族自治州':[99.3823,34.0466],
                                    '海东地区':[102.3706,36.2988],
                                    '海北藏族自治州':[100.3711,37.9138],
                                    '海南藏族自治州':[100.3711,35.9418],
                                    '海西蒙古族藏族自治州':[94.9768,37.1118],
                                    '玉树藏族自治州':[93.5925,33.9368],
                                    '黄南藏族自治州':[101.5686,35.1178],
                                    // 四川
                                    '乐山市':[103.5791,29.1742],
                                    '内江市':[104.8535,29.6136],
                                    '凉山彝族自治州':[101.9641,27.6746],
                                    '巴中':[107.0618,31.9977],
                                    '广元':[105.6885,32.2284],
                                    '广安':[106.6333,30.4376],
                                    '甘孜藏族自治州':[99.9207,31.0803],
                                    '眉山':[103.8098,330.0146],
                                    '资阳':[104.9744,30.1575],
                                    '达州':[107.6111,31.333],
                                    '遂宁':[105.5347,30.6683],
                                    '阿坝藏族羌族自治州':[102.4805,32.4536],
                                    '雅安':[102.6672,29.8938],
                                    // 海南
                                    '万宁':[110.3137,18.8388],
                                    '东方':[108.8498,19.0414],
                                    '临高县':[109.6957,19.8063],
                                    '乐东黎族自治县':[109.0283,18.6301],
                                    '五指山':[109.5282,18.8299],
                                    '保亭黎族苗族自治县':[109.6284,18.6108],
                                    '儋州':[109.3291,19.5653],
                                    '定安县':[110.3384,19.4698],
                                    '屯昌县':[110.0377,19.362],
                                    '文昌':[110.8905,19.7823],
                                    '昌江黎族自治县':[109.0407,19.2137],
                                    '澄迈县':[109.9937,19.7314],
                                    '琼中黎族苗族自治县':[109.8413,19.0736],
                                    '琼海':[110.4208,19.224],
                                    '白沙黎族自治县':[109.3703,19.211],
                                    '陵水黎族自治县':[109.9924,18.5415],

                                    // 云南
                                    '普洱':[100.9725700000,22.8309790000],

                                    // 湖北
                                    '襄樊':[112.1285370000,32.0147970000],
                                    '神农架林区':[110.6825250000,31.7504960000],
                                    '天门':[113.1724090000,30.6696220000],
                                    '潜江':[112.9054740000,30.4083580000],

                                    // 黑龙江
                                    '大兴安岭':[123.6445590000,52.5109470000],

                                    // 贵州
                                    '黔南布依族苗族自治州':[107.0236160000,25.9995600000],
                                    '黔西南布依族苗族自治州':[105.4966400000,25.0354490000],

                                    // 河南
                                    '漯河':[114.0234210000,33.5877110000],
                                    // 安徽,
                                    '池州':[117.4984210000,30.6708840000],
                                    // 台湾,
                                    '台湾':[120.9614540000,23.8040600000],
                                    // 新疆
                                    '五家渠市':[87.5499370000,44.1724450000],
                                    '阿拉尔市':[81.2873540000,40.5532640000],
                                    '图木舒克市':[79.0756160000,39.8712090000],
                                    '克孜勒苏柯尔克孜自治州':[76.1743090000,39.7204710000],
                                    // 西藏
                                    '阿里地区':[80.1127770000,32.5068660000],
                                    // 北京
                                    '东城区':[116.4224010000,39.9348270000],
                                    '丰台区':[116.2924020000,39.8649370000],
                                    '大兴区':[116.3486250000,39.7325550000],
                                    '宣武区':[116.3956480000,39.9027030000],
                                    '密云县':[116.8495470000,40.3821760000],
                                    '崇文区':[116.4372790000,39.8905870000],
                                    '平谷区':[117.1273790000,40.1469510000],
                                    '延庆县':[115.9816320000,40.4621690000],
                                    '怀柔区':[116.6383860000,40.3226180000],
                                    '房山区':[116.1494440000,39.7543260000],
                                    '昌平区':[116.2376180000,40.2264130000],
                                    '朝阳区':[116.4495590000,39.9263750000],
                                    '海淀区':[116.3054340000,39.9654900000],
                                    '石景山区':[116.2296130000,39.9113540000],
                                    '西城区':[116.3725140000,39.9181240000],
                                    '通州区':[116.6634150000,39.9160170000],
                                    '门头沟区':[116.1076040000,39.9461470000],
                                    '顺义区':[116.6614240000,40.1363510000],
                                    // 天津
                                    '东丽区':[117.3205690000,39.0923320000],
                                    '北辰区':[117.1414030000,39.2303440000],
                                    '南开区':[117.1565150000,39.1441050000],
                                    '和平区':[117.2214670000,39.1233900000],
                                    '塘沽区':[117.6700730000,39.0331920000],
                                    '大港区':[117.4674980000,38.8492790000],
                                    '宁河县':[117.8323930000,39.3369560000],
                                    '宝坻区':[117.3166010000,39.7231940000],
                                    '武清区':[117.0505970000,39.3898710000],
                                    '汉沽区':[117.7877890000,39.2470880000],
                                    '河东区':[117.2584130000,39.1344870000],
                                    '河北区':[117.2035930000,39.1534850000],
                                    '河西区':[117.2294160000,39.1157180000],
                                    '津南区':[117.3633870000,38.9441480000],
                                    '红桥区':[117.1575180000,39.1732860000],
                                    '蓟县':[117.4145790000,40.0515090000],
                                    '西青区':[117.0144100000,39.1487270000],
                                    '静海县':[116.9804690000,38.9533710000],
                                    // 上海
                                    '南汇区':[121.7653220000,31.0502860000],
                                    '卢湾区':[121.4795090000,31.2153440000],
                                    '嘉定区':[121.2725950000,31.3801550000],
                                    '奉贤区':[121.4805040000,30.9237200000],
                                    '宝山区':[121.4965630000,31.4102790000],
                                    '崇明县':[121.4035570000,31.6285700000],
                                    '徐汇区':[121.4433960000,31.1945570000],
                                    '普陀区':[121.4035690000,31.2549730000],
                                    '杨浦区':[121.5325200000,31.2655240000],
                                    '松江区':[121.2344800000,31.0371350000],
                                    '浦东新区':[121.5504550000,31.2273480000],
                                    '虹口区':[121.5115860000,31.2697470000],
                                    '金山区':[121.3484800000,30.7478520000],
                                    '长宁区':[121.4304540000,31.2268480000],
                                    '闵行区':[121.3886120000,31.1188430000],
                                    '闸北区':[121.4705760000,31.2504650000],
                                    '青浦区':[121.1305530000,31.1554540000],
                                    '静安区':[121.4534320000,31.2338450000],
                                    '黄浦区':[121.4915860000,31.2372470000],
                                    // 重庆
                                    '万州区':[108.4155580000,30.8136220000],
                                    '万盛区':[106.9336780000,28.9546900000],
                                    '丰都县':[107.7374810000,29.8694130000],
                                    '九龙坡区':[106.5175590000,29.5079280000],
                                    '云阳县':[108.7034480000,30.9366110000],
                                    '北碚区':[106.4035690000,29.8116030000],
                                    '南岸区':[106.6684300000,29.5026830000],
                                    '南川区':[107.1055850000,29.1634790000],
                                    '双桥区':[117.9494280000,40.9808240000],
                                    '合川区':[117.9494280000,40.9808240000],
                                    '垫江县':[107.3395660000,30.3332940000],
                                    '城口县':[108.6716120000,31.9533910000],
                                    '大渡口区':[106.4885340000,29.4901070000],
                                    '大足县':[105.7153260000,29.7008440000],
                                    '奉节县':[109.4704730000,31.0246020000],
                                    '巫山县':[109.8855460000,31.0805190000],
                                    '巫溪县':[109.5764030000,31.4048800000],
                                    '巴南区':[106.5474540000,29.4084750000],
                                    '开县':[108.3994980000,31.1666440000],
                                    '彭水苗族土家族自治县':[108.1725780000,29.2994620000],
                                    '忠县':[108.0445380000,30.3052680000],
                                    '梁平县':[107.8105490000,30.6799800000],
                                    '武隆县':[107.7664250000,29.3320270000],
                                    '永川区':[105.9334990000,29.3620460000],
                                    '江北区':[106.5804150000,29.6128320000],
                                    '江津区':[106.2655980000,29.2958840000],
                                    '沙坪坝区':[106.4644650000,29.5471930000],
                                    '涪陵区':[107.3964200000,29.7092780000],
                                    '渝中区':[106.5754400000,29.5590900000],
                                    '渝北区':[106.6375590000,29.7239270000],
                                    '潼南县':[105.8473990000,30.1973140000],
                                    '璧山县':[106.2334750000,29.5983470000],
                                    '石柱土家族自治县':[108.1204140000,30.0061090000],
                                    '秀山土家族苗族自治县':[109.0135740000,28.4534480000],
                                    '綦江县':[106.6574840000,29.0341140000],
                                    '荣昌县':[105.6043300000,29.4067780000],
                                    '酉阳土家族苗族自治县':[108.7745860000,28.8470400000],
                                    '铜梁县':[106.0634490000,29.8505090000],
                                    '长寿区':[107.0875310000,29.8635200000],
                                    '黔江区':[108.7775910000,29.5388130000],
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
                                        return 10 + v/1000
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
                                    /*
                                    data : [
                                        {name: "廊坊", value: 193},
                                        {name: "菏泽", value: 194},
                                        {name: "合肥", value: 229},
                                        {name: "武汉", value: 273},
                                        {name: "大庆", value: 279}
                                    ]
                                    */
                                    data:mapT5
                                }
                            }
                        ]
                    };
                    $('#map p.load').hide();
                    myChart.setOption(option);
                }
            );
        }
    };
    // placeRank(placeData);
    // ===时间选项===
    $('._time').change(function(){
        var selectTime = $(this).children('option:selected').val();//这就是selected的值
        placeRank_url = '/detection/detectDistribute?date='+selectTime;
        console.log(placeRank_url);
        public_ajax.call_request('get',placeRank_url,placeRank);
    })

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
                yAxis: {
                    name:'预警数量',
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                xAxis: {
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
                        /*
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
                         */
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
