// ====适配分辨率
    if (screen.width <=1440) {
    	// 上下左右四个盒子宽高
    	$('#container .picChart-2, #container .picChart-4, #container .picChart-5, #container .picChart-6').css({'width':'300px','height':'150px'});
    	// 左下角盒子
        $('#container #picChart-5 .outSide').css({'height':'76%'})
        // 右下角盒子
        $('#container #picChart-6 .rightoutSide').css({'height':'108%'})
        $('#container #picChart-6 p span').css({'margin-left':'0','margin-right':'10px'})
    } else {
    	$('#container #picChart-4 p').css('padding-left','20%')
    }

// ====本周预警数====
    var h_warnCount_url='/homepage/warnCount/';
    public_ajax.call_request('get',h_warnCount_url,h_warnCount);
    function h_warnCount(data){
        if(data){
            $('#picChart-3 .company-1').text(data.com);//公司
            $('#picChart-3 .company-2').text(data.plat);//平台
            $('#picChart-3 .company-3').text(data.pro);//项目
        }
    }

// ====地图====
    require.config({
        paths: {
            echarts: '../static/js/echarts-2/build/dist',
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/map'
        ],
        function (ec) {
            // var myChart = echarts.init(document.getElementById('picChart-1'),'dark');
            var myChart = ec.init(document.getElementById('picChart-1'),'dark');
            var ecConfig = require('echarts/config');
            var zrEvent = require('zrender/tool/event');
            var curIndx = 0;
            var mapType = [
                'china',
                // 23个省
                '广东', '青海', '四川', '海南', '陕西',
                '甘肃', '云南', '湖南', '湖北', '黑龙江',
                '贵州', '山东', '江西', '河南', '河北',
                '山西', '安徽', '福建', '浙江', '江苏',
                '吉林', '辽宁', '台湾',
                // 5个自治区
                '新疆', '广西', '宁夏', '内蒙古', '西藏',
                // 4个直辖市
                '北京', '天津', '上海', '重庆',
                // 2个特别行政区
                '香港', '澳门'
            ];
            myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
                var len = mapType.length;
                var mt = mapType[curIndx % len];
                if (mt == 'china') {
                    // 更新数据
                    $('#container .bottom_left .title span').text('疑似非法集资城市排行');
                    $('#container .bottom_left #picChart-5>p').children('span:first-child').text('城市');

                    // 全国选择时指定到选中的省份
                    var selected = param.selected;
                    var target = param.target;
                    // var sss=JSON.stringify(selected)
                    for (var i in selected) {
                        if (selected[i]) {
                            // console.log(selected[i])//true
                            for(var k in selected[i]){
                                console.log(selected[i][k])
                            }
                            // console.log(i)//河北
                            mt = i;//mt='河北'
                            while (len--) {
                                if (mapType[len] == mt) {
                                    curIndx = len;
                                }
                            }
                            break;
                        }
                    }
                    option.tooltip.formatter = '点击返回全国<br/>{b}-{c}';
                    // 没有标注气泡的
                    option.dataRange = {
                        show:true,
                        min : 0,
                        max : 1000,
                        // calculable : true,
                        itemGap:2,
                        splitList: [
                            {start: 100},
                            // {start: 700, end: 999},
                            {start: 50, end: 100},
                            {start: 10, end: 50},
                            {start: 5, end: 10,},
                            // {start: 150, end: 300, label: '50 到 100（自定义特殊颜色）'},
                            {end: 5}
                        ],
                        x:'27%',
                        textStyle:{
                            color:'white'
                        },
                        color: ['#cf181d','#fee9b4'],
                        // color: ['maroon','purple','red','orange','yellow','lightgreen']
                        // color: ['#ccc97a','#264861','#b3c587']
                    }
                    option.series[0] = {
                        name: '',
                        type: 'map',
                        roam: true,
                        scaleLimit:{
                            max:1.5,
                            min:0.6
                        },
                        hoverable: true,
                        mapType: 'china',
                        selectedMode : 'single',
                        itemStyle: {
                            normal: {
                                borderWidth:2,
                                borderColor:'white',
                                color:'#fee9b4',
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "#8b4513",
                                        fontSize: 14,
                                        fontWeight:'700',
                                    }
                                }
                            },
                            emphasis: {// 也是选中样式
                                borderWidth:2,
                                borderColor:'#fff',
                                color: 'rgba(25, 107, 123, 0.7)',
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
                        data:[],
                        // 这是假数据
                        /*
                        data:[
                            // 11-27添加的重庆市下县数据
                            {name: '万州区',value: Math.round(Math.random()*1000)},
                            {name: '万盛区',value: Math.round(Math.random()*1000)},
                            {name: '丰都县',value: Math.round(Math.random()*1000)},
                            {name: '九龙坡区',value: Math.round(Math.random()*1000)},
                            {name: '云阳县',value: Math.round(Math.random()*1000)},
                            {name: '北碚区',value: Math.round(Math.random()*1000)},
                            {name: '南岸区',value: Math.round(Math.random()*1000)},
                            {name: '南川区',value: Math.round(Math.random()*1000)},
                            {name: '双桥区',value: Math.round(Math.random()*1000)},
                            {name: '合川区',value: Math.round(Math.random()*1000)},
                            {name: '垫江县',value: Math.round(Math.random()*1000)},
                            {name: '城口县',value: Math.round(Math.random()*1000)},
                            {name: '大渡口区',value: Math.round(Math.random()*1000)},
                            {name: '大足县',value: Math.round(Math.random()*1000)},
                            {name: '巫山县',value: Math.round(Math.random()*1000)},
                            {name: '巫溪县',value: Math.round(Math.random()*1000)},
                            {name: '巴南区',value: Math.round(Math.random()*1000)},
                            {name: '开县',value: Math.round(Math.random()*1000)},
                            {name: '彭水苗族土家族自治县',value: Math.round(Math.random()*1000)},
                            {name: '忠县',value: Math.round(Math.random()*1000)},
                            {name: '梁平县',value: Math.round(Math.random()*1000)},
                            {name: '武隆县',value: Math.round(Math.random()*1000)},
                            {name: '永川区',value: Math.round(Math.random()*1000)},
                            {name: '江北区',value: Math.round(Math.random()*1000)},
                            {name: '江津区',value: Math.round(Math.random()*1000)},
                            {name: '沙坪坝区',value: Math.round(Math.random()*1000)},
                            {name: '涪陵区',value: Math.round(Math.random()*1000)},
                            {name: '渝中区',value: Math.round(Math.random()*1000)},
                            {name: '渝北区',value: Math.round(Math.random()*1000)},
                            {name: '潼南县',value: Math.round(Math.random()*1000)},
                            {name: '璧山县',value: Math.round(Math.random()*1000)},
                            {name: '石柱土家族自治县',value: Math.round(Math.random()*1000)},
                            {name: '秀山土家族苗族自治县',value: Math.round(Math.random()*1000)},
                            {name: '綦江县',value: Math.round(Math.random()*1000)},
                            {name: '荣昌县',value: Math.round(Math.random()*1000)},
                            {name: '酉阳土家族苗族自治县',value: Math.round(Math.random()*1000)},
                            {name: '铜梁县',value: Math.round(Math.random()*1000)},
                            {name: '长寿区',value: Math.round(Math.random()*1000)},
                            {name: '黔江区',value: Math.round(Math.random()*1000)},
                            {name: '奉节县',value: Math.round(Math.random()*1000)},
                            // =====
                            // 北京
                            {name: "东城区", value: Math.round(Math.random()*1000)},
                            {name: "丰台区", value: Math.round(Math.random()*1000)},
                            {name: "大兴区", value: Math.round(Math.random()*1000)},
                            {name: "宣武区", value: Math.round(Math.random()*1000)},
                            {name: "密云县", value: Math.round(Math.random()*1000)},
                            {name: "崇文区", value: Math.round(Math.random()*1000)},
                            {name: "平谷区", value: Math.round(Math.random()*1000)},
                            {name: "延庆县", value: Math.round(Math.random()*1000)},
                            {name: "怀柔区", value: Math.round(Math.random()*1000)},
                            {name: "房山区", value: Math.round(Math.random()*1000)},
                            {name: "昌平区", value: Math.round(Math.random()*1000)},
                            {name: "朝阳区", value: Math.round(Math.random()*1000)},
                            {name: "海淀区", value: Math.round(Math.random()*1000)},
                            {name: "石景山区", value: Math.round(Math.random()*1000)},
                            {name: "西城区", value: Math.round(Math.random()*1000)},
                            {name: "通州区", value: Math.round(Math.random()*1000)},
                            {name: "门头沟区", value: Math.round(Math.random()*1000)},
                            {name: "顺义区", value: Math.round(Math.random()*1000)},
                            // 天津
                            {name: "东丽区", value: Math.round(Math.random()*1000)},
                            {name: "北辰区", value: Math.round(Math.random()*1000)},
                            {name: "南开区", value: Math.round(Math.random()*1000)},
                            {name: "和平区", value: Math.round(Math.random()*1000)},
                            {name: "塘沽区", value: Math.round(Math.random()*1000)},
                            {name: "大港区", value: Math.round(Math.random()*1000)},
                            {name: "宁河县", value: Math.round(Math.random()*1000)},
                            {name: "宝坻区", value: Math.round(Math.random()*1000)},
                            {name: "武清区", value: Math.round(Math.random()*1000)},
                            {name: "汉沽区", value: Math.round(Math.random()*1000)},
                            {name: "河东区", value: Math.round(Math.random()*1000)},
                            {name: "河北区", value: Math.round(Math.random()*1000)},
                            {name: "河西区", value: Math.round(Math.random()*1000)},
                            {name: "津南区", value: Math.round(Math.random()*1000)},
                            {name: "红桥区", value: Math.round(Math.random()*1000)},
                            {name: "蓟县", value: Math.round(Math.random()*1000)},
                            {name: "西青区", value: Math.round(Math.random()*1000)},
                            {name: "静海县", value: Math.round(Math.random()*1000)},
                            // 上海
                            {name: "南汇区", value: Math.round(Math.random()*1000)},
                            {name: "卢湾区", value: Math.round(Math.random()*1000)},
                            {name: "嘉定区", value: Math.round(Math.random()*1000)},
                            {name: "奉贤区", value: Math.round(Math.random()*1000)},
                            {name: "宝山区", value: Math.round(Math.random()*1000)},
                            {name: "崇明县", value: Math.round(Math.random()*1000)},
                            {name: "徐汇区", value: Math.round(Math.random()*1000)},
                            {name: "普陀区", value: Math.round(Math.random()*1000)},
                            {name: "杨浦区", value: Math.round(Math.random()*1000)},
                            {name: "松江区", value: Math.round(Math.random()*1000)},
                            {name: "浦东新区", value: Math.round(Math.random()*1000)},
                            {name: "虹口区", value: Math.round(Math.random()*1000)},
                            {name: "金山区", value: Math.round(Math.random()*1000)},
                            {name: "长宁区", value: Math.round(Math.random()*1000)},
                            {name: "闵行区", value: Math.round(Math.random()*1000)},
                            {name: "闸北区", value: Math.round(Math.random()*1000)},
                            {name: "青浦区", value: Math.round(Math.random()*1000)},
                            {name: "静安区", value: Math.round(Math.random()*1000)},
                            {name: "黄浦区", value: Math.round(Math.random()*1000)},

                            {name: '重庆市',value: Math.round(Math.random()*1000)},
                            {name: '北京市',value: Math.round(Math.random()*1000)},
                            {name: '天津市',value: Math.round(Math.random()*1000)},
                            {name: '上海市',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)},
                            {name: '巴音郭楞蒙古自治州',value: Math.round(Math.random()*1000)},
                            {name: '和田地区',value: Math.round(Math.random()*1000)},
                            {name: '哈密地区',value: Math.round(Math.random()*1000)},
                            {name: '阿克苏地区',value: Math.round(Math.random()*1000)},
                            {name: '阿勒泰地区',value: Math.round(Math.random()*1000)},
                            {name: '喀什地区',value: Math.round(Math.random()*1000)},
                            {name: '塔城地区',value: Math.round(Math.random()*1000)},
                            {name: '昌吉回族自治州',value: Math.round(Math.random()*1000)},
                            {name: '克孜勒苏柯尔克孜自治州',value: Math.round(Math.random()*1000)},
                            {name: '吐鲁番地区',value: Math.round(Math.random()*1000)},
                            {name: '伊犁哈萨克自治州',value: Math.round(Math.random()*1000)},
                            {name: '博尔塔拉蒙古自治州',value: Math.round(Math.random()*1000)},
                            {name: '乌鲁木齐市',value: Math.round(Math.random()*1000)},
                            {name: '克拉玛依市',value: Math.round(Math.random()*1000)},
                            {name: '阿拉尔市',value: Math.round(Math.random()*1000)},
                            {name: '图木舒克市',value: Math.round(Math.random()*1000)},
                            {name: '五家渠市',value: Math.round(Math.random()*1000)},
                            {name: '石河子市',value: Math.round(Math.random()*1000)},
                            {name: '那曲地区',value: Math.round(Math.random()*1000)},
                            {name: '阿里地区',value: Math.round(Math.random()*1000)},
                            {name: '日喀则地区',value: Math.round(Math.random()*1000)},
                            {name: '林芝地区',value: Math.round(Math.random()*1000)},
                            {name: '昌都地区',value: Math.round(Math.random()*1000)},
                            {name: '山南地区',value: Math.round(Math.random()*1000)},
                            {name: '拉萨市',value: Math.round(Math.random()*1000)},
                            {name: '呼伦贝尔市',value: Math.round(Math.random()*1000)},
                            {name: '阿拉善盟',value: Math.round(Math.random()*1000)},
                            {name: '锡林郭勒盟',value: Math.round(Math.random()*1000)},
                            {name: '鄂尔多斯市',value: Math.round(Math.random()*1000)},
                            {name: '赤峰市',value: Math.round(Math.random()*1000)},
                            {name: '巴彦淖尔市',value: Math.round(Math.random()*1000)},
                            {name: '通辽市',value: Math.round(Math.random()*1000)},
                            {name: '乌兰察布市',value: Math.round(Math.random()*1000)},
                            {name: '兴安盟',value: Math.round(Math.random()*1000)},
                            {name: '包头市',value: Math.round(Math.random()*1000)},
                            {name: '呼和浩特市',value: Math.round(Math.random()*1000)},
                            {name: '乌海市',value: Math.round(Math.random()*1000)},
                            {name: '海西蒙古族藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '玉树藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '果洛藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '海南藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '海北藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '黄南藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '海东地区',value: Math.round(Math.random()*1000)},
                            {name: '西宁市',value: Math.round(Math.random()*1000)},
                            {name: '甘孜藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '阿坝藏族羌族自治州',value: Math.round(Math.random()*1000)},
                            {name: '凉山彝族自治州',value: Math.round(Math.random()*1000)},
                            {name: '绵阳市',value: Math.round(Math.random()*1000)},
                            {name: '达州市',value: Math.round(Math.random()*1000)},
                            {name: '广元市',value: Math.round(Math.random()*1000)},
                            {name: '雅安市',value: Math.round(Math.random()*1000)},
                            {name: '宜宾市',value: Math.round(Math.random()*1000)},
                            {name: '乐山市',value: Math.round(Math.random()*1000)},
                            {name: '南充市',value: Math.round(Math.random()*1000)},
                            {name: '巴中市',value: Math.round(Math.random()*1000)},
                            {name: '泸州市',value: Math.round(Math.random()*1000)},
                            {name: '成都市',value: Math.round(Math.random()*1000)},
                            {name: '资阳市',value: Math.round(Math.random()*1000)},
                            {name: '攀枝花市',value: Math.round(Math.random()*1000)},
                            {name: '眉山市',value: Math.round(Math.random()*1000)},
                            {name: '广安市',value: Math.round(Math.random()*1000)},
                            {name: '德阳市',value: Math.round(Math.random()*1000)},
                            {name: '内江市',value: Math.round(Math.random()*1000)},
                            {name: '遂宁市',value: Math.round(Math.random()*1000)},
                            {name: '自贡市',value: Math.round(Math.random()*1000)},
                            {name: '黑河市',value: Math.round(Math.random()*1000)},
                            {name: '大兴安岭地区',value: Math.round(Math.random()*1000)},
                            {name: '哈尔滨市',value: Math.round(Math.random()*1000)},
                            {name: '齐齐哈尔市',value: Math.round(Math.random()*1000)},
                            {name: '牡丹江市',value: Math.round(Math.random()*1000)},
                            {name: '绥化市',value: Math.round(Math.random()*1000)},
                            {name: '伊春市',value: Math.round(Math.random()*1000)},
                            {name: '佳木斯市',value: Math.round(Math.random()*1000)},
                            {name: '鸡西市',value: Math.round(Math.random()*1000)},
                            {name: '双鸭山市',value: Math.round(Math.random()*1000)},
                            {name: '大庆市',value: Math.round(Math.random()*1000)},
                            {name: '鹤岗市',value: Math.round(Math.random()*1000)},
                            {name: '七台河市',value: Math.round(Math.random()*1000)},
                            {name: '酒泉市',value: Math.round(Math.random()*1000)},
                            {name: '张掖市',value: Math.round(Math.random()*1000)},
                            {name: '甘南藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '武威市',value: Math.round(Math.random()*1000)},
                            {name: '陇南市',value: Math.round(Math.random()*1000)},
                            {name: '庆阳市',value: Math.round(Math.random()*1000)},
                            {name: '白银市',value: Math.round(Math.random()*1000)},
                            {name: '定西市',value: Math.round(Math.random()*1000)},
                            {name: '天水市',value: Math.round(Math.random()*1000)},
                            {name: '兰州市',value: Math.round(Math.random()*1000)},
                            {name: '平凉市',value: Math.round(Math.random()*1000)},
                            {name: '临夏回族自治州',value: Math.round(Math.random()*1000)},
                            {name: '金昌市',value: Math.round(Math.random()*1000)},
                            {name: '嘉峪关市',value: Math.round(Math.random()*1000)},
                            {name: '普洱市',value: Math.round(Math.random()*1000)},
                            {name: '红河哈尼族彝族自治州',value: Math.round(Math.random()*1000)},
                            {name: '文山壮族苗族自治州',value: Math.round(Math.random()*1000)},
                            {name: '曲靖市',value: Math.round(Math.random()*1000)},
                            {name: '楚雄彝族自治州',value: Math.round(Math.random()*1000)},
                            {name: '大理白族自治州',value: Math.round(Math.random()*1000)},
                            {name: '临沧市',value: Math.round(Math.random()*1000)},
                            {name: '迪庆藏族自治州',value: Math.round(Math.random()*1000)},
                            {name: '昭通市',value: Math.round(Math.random()*1000)},
                            {name: '昆明市',value: Math.round(Math.random()*1000)},
                            {name: '丽江市',value: Math.round(Math.random()*1000)},
                            {name: '西双版纳傣族自治州',value: Math.round(Math.random()*1000)},
                            {name: '保山市',value: Math.round(Math.random()*1000)},
                            {name: '玉溪市',value: Math.round(Math.random()*1000)},
                            {name: '怒江傈僳族自治州',value: Math.round(Math.random()*1000)},
                            {name: '德宏傣族景颇族自治州',value: Math.round(Math.random()*1000)},
                            {name: '百色市',value: Math.round(Math.random()*1000)},
                            {name: '河池市',value: Math.round(Math.random()*1000)},
                            {name: '桂林市',value: Math.round(Math.random()*1000)},
                            {name: '南宁市',value: Math.round(Math.random()*1000)},
                            {name: '柳州市',value: Math.round(Math.random()*1000)},
                            {name: '崇左市',value: Math.round(Math.random()*1000)},
                            {name: '来宾市',value: Math.round(Math.random()*1000)},
                            {name: '玉林市',value: Math.round(Math.random()*1000)},
                            {name: '梧州市',value: Math.round(Math.random()*1000)},
                            {name: '贺州市',value: Math.round(Math.random()*1000)},
                            {name: '钦州市',value: Math.round(Math.random()*1000)},
                            {name: '贵港市',value: Math.round(Math.random()*1000)},
                            {name: '防城港市',value: Math.round(Math.random()*1000)},
                            {name: '北海市',value: Math.round(Math.random()*1000)},
                            {name: '怀化市',value: Math.round(Math.random()*1000)},
                            {name: '永州市',value: Math.round(Math.random()*1000)},
                            {name: '邵阳市',value: Math.round(Math.random()*1000)},
                            {name: '郴州市',value: Math.round(Math.random()*1000)},
                            {name: '常德市',value: Math.round(Math.random()*1000)},
                            {name: '湘西土家族苗族自治州',value: Math.round(Math.random()*1000)},
                            {name: '衡阳市',value: Math.round(Math.random()*1000)},
                            {name: '岳阳市',value: Math.round(Math.random()*1000)},
                            {name: '益阳市',value: Math.round(Math.random()*1000)},
                            {name: '长沙市',value: Math.round(Math.random()*1000)},
                            {name: '株洲市',value: Math.round(Math.random()*1000)},
                            {name: '张家界市',value: Math.round(Math.random()*1000)},
                            {name: '娄底市',value: Math.round(Math.random()*1000)},
                            {name: '湘潭市',value: Math.round(Math.random()*1000)},
                            {name: '榆林市',value: Math.round(Math.random()*1000)},
                            {name: '延安市',value: Math.round(Math.random()*1000)},
                            {name: '汉中市',value: Math.round(Math.random()*1000)},
                            {name: '安康市',value: Math.round(Math.random()*1000)},
                            {name: '商洛市',value: Math.round(Math.random()*1000)},
                            {name: '宝鸡市',value: Math.round(Math.random()*1000)},
                            {name: '渭南市',value: Math.round(Math.random()*1000)},
                            {name: '咸阳市',value: Math.round(Math.random()*1000)},
                            {name: '西安市',value: Math.round(Math.random()*1000)},
                            {name: '铜川市',value: Math.round(Math.random()*1000)},
                            {name: '清远市',value: Math.round(Math.random()*1000)},
                            {name: '韶关市',value: Math.round(Math.random()*1000)},
                            {name: '湛江市',value: Math.round(Math.random()*1000)},
                            {name: '梅州市',value: Math.round(Math.random()*1000)},
                            {name: '河源市',value: Math.round(Math.random()*1000)},
                            {name: '肇庆市',value: Math.round(Math.random()*1000)},
                            {name: '惠州市',value: Math.round(Math.random()*1000)},
                            {name: '茂名市',value: Math.round(Math.random()*1000)},
                            {name: '江门市',value: Math.round(Math.random()*1000)},
                            {name: '阳江市',value: Math.round(Math.random()*1000)},
                            {name: '云浮市',value: Math.round(Math.random()*1000)},
                            {name: '广州市',value: Math.round(Math.random()*1000)},
                            {name: '汕尾市',value: Math.round(Math.random()*1000)},
                            {name: '揭阳市',value: Math.round(Math.random()*1000)},
                            {name: '珠海市',value: Math.round(Math.random()*1000)},
                            {name: '佛山市',value: Math.round(Math.random()*1000)},
                            {name: '潮州市',value: Math.round(Math.random()*1000)},
                            {name: '汕头市',value: Math.round(Math.random()*1000)},
                            {name: '深圳市',value: Math.round(Math.random()*1000)},
                            {name: '东莞市',value: Math.round(Math.random()*1000)},
                            {name: '中山市',value: Math.round(Math.random()*1000)},
                            {name: '延边朝鲜族自治州',value: Math.round(Math.random()*1000)},
                            {name: '吉林市',value: Math.round(Math.random()*1000)},
                            {name: '白城市',value: Math.round(Math.random()*1000)},
                            {name: '松原市',value: Math.round(Math.random()*1000)},
                            {name: '长春市',value: Math.round(Math.random()*1000)},
                            {name: '白山市',value: Math.round(Math.random()*1000)},
                            {name: '通化市',value: Math.round(Math.random()*1000)},
                            {name: '四平市',value: Math.round(Math.random()*1000)},
                            {name: '辽源市',value: Math.round(Math.random()*1000)},
                            {name: '承德市',value: Math.round(Math.random()*1000)},
                            {name: '张家口市',value: Math.round(Math.random()*1000)},
                            {name: '保定市',value: Math.round(Math.random()*1000)},
                            {name: '唐山市',value: Math.round(Math.random()*1000)},
                            {name: '沧州市',value: Math.round(Math.random()*1000)},
                            {name: '石家庄市',value: Math.round(Math.random()*1000)},
                            {name: '邢台市',value: Math.round(Math.random()*1000)},
                            {name: '邯郸市',value: Math.round(Math.random()*1000)},
                            {name: '秦皇岛市',value: Math.round(Math.random()*1000)},
                            {name: '衡水市',value: Math.round(Math.random()*1000)},
                            {name: '廊坊市',value: Math.round(Math.random()*1000)},
                            {name: '恩施土家族苗族自治州',value: Math.round(Math.random()*1000)},
                            {name: '十堰市',value: Math.round(Math.random()*1000)},
                            {name: '宜昌市',value: Math.round(Math.random()*1000)},
                            {name: '襄樊市',value: Math.round(Math.random()*1000)},
                            {name: '黄冈市',value: Math.round(Math.random()*1000)},
                            {name: '荆州市',value: Math.round(Math.random()*1000)},
                            {name: '荆门市',value: Math.round(Math.random()*1000)},
                            {name: '咸宁市',value: Math.round(Math.random()*1000)},
                            {name: '随州市',value: Math.round(Math.random()*1000)},
                            {name: '孝感市',value: Math.round(Math.random()*1000)},
                            {name: '武汉市',value: Math.round(Math.random()*1000)},
                            {name: '黄石市',value: Math.round(Math.random()*1000)},
                            {name: '神农架林区',value: Math.round(Math.random()*1000)},
                            {name: '天门市',value: Math.round(Math.random()*1000)},
                            {name: '仙桃市',value: Math.round(Math.random()*1000)},
                            {name: '潜江市',value: Math.round(Math.random()*1000)},
                            {name: '鄂州市',value: Math.round(Math.random()*1000)},
                            {name: '遵义市',value: Math.round(Math.random()*1000)},
                            {name: '黔东南苗族侗族自治州',value: Math.round(Math.random()*1000)},
                            {name: '毕节地区',value: Math.round(Math.random()*1000)},
                            {name: '黔南布依族苗族自治州',value: Math.round(Math.random()*1000)},
                            {name: '铜仁地区',value: Math.round(Math.random()*1000)},
                            {name: '黔西南布依族苗族自治州',value: Math.round(Math.random()*1000)},
                            {name: '六盘水市',value: Math.round(Math.random()*1000)},
                            {name: '安顺市',value: Math.round(Math.random()*1000)},
                            {name: '贵阳市',value: Math.round(Math.random()*1000)},
                            {name: '烟台市',value: Math.round(Math.random()*1000)},
                            {name: '临沂市',value: Math.round(Math.random()*1000)},
                            {name: '潍坊市',value: Math.round(Math.random()*1000)},
                            {name: '青岛市',value: Math.round(Math.random()*1000)},
                            {name: '菏泽市',value: Math.round(Math.random()*1000)},
                            {name: '济宁市',value: Math.round(Math.random()*1000)},
                            {name: '德州市',value: Math.round(Math.random()*1000)},
                            {name: '滨州市',value: Math.round(Math.random()*1000)},
                            {name: '聊城市',value: Math.round(Math.random()*1000)},
                            {name: '东营市',value: Math.round(Math.random()*1000)},
                            {name: '济南市',value: Math.round(Math.random()*1000)},
                            {name: '泰安市',value: Math.round(Math.random()*1000)},
                            {name: '威海市',value: Math.round(Math.random()*1000)},
                            {name: '日照市',value: Math.round(Math.random()*1000)},
                            {name: '淄博市',value: Math.round(Math.random()*1000)},
                            {name: '枣庄市',value: Math.round(Math.random()*1000)},
                            {name: '莱芜市',value: Math.round(Math.random()*1000)},
                            {name: '赣州市',value: Math.round(Math.random()*1000)},
                            {name: '吉安市',value: Math.round(Math.random()*1000)},
                            {name: '上饶市',value: Math.round(Math.random()*1000)},
                            {name: '九江市',value: Math.round(Math.random()*1000)},
                            {name: '抚州市',value: Math.round(Math.random()*1000)},
                            {name: '宜春市',value: Math.round(Math.random()*1000)},
                            {name: '南昌市',value: Math.round(Math.random()*1000)},
                            {name: '景德镇市',value: Math.round(Math.random()*1000)},
                            {name: '萍乡市',value: Math.round(Math.random()*1000)},
                            {name: '鹰潭市',value: Math.round(Math.random()*1000)},
                            {name: '新余市',value: Math.round(Math.random()*1000)},
                            {name: '南阳市',value: Math.round(Math.random()*1000)},
                            {name: '信阳市',value: Math.round(Math.random()*1000)},
                            {name: '洛阳市',value: Math.round(Math.random()*1000)},
                            {name: '驻马店市',value: Math.round(Math.random()*1000)},
                            {name: '周口市',value: Math.round(Math.random()*1000)},
                            {name: '商丘市',value: Math.round(Math.random()*1000)},
                            {name: '三门峡市',value: Math.round(Math.random()*1000)},
                            {name: '新乡市',value: Math.round(Math.random()*1000)},
                            {name: '平顶山市',value: Math.round(Math.random()*1000)},
                            {name: '郑州市',value: Math.round(Math.random()*1000)},
                            {name: '安阳市',value: Math.round(Math.random()*1000)},
                            {name: '开封市',value: Math.round(Math.random()*1000)},
                            {name: '焦作市',value: Math.round(Math.random()*1000)},
                            {name: '许昌市',value: Math.round(Math.random()*1000)},
                            {name: '濮阳市',value: Math.round(Math.random()*1000)},
                            {name: '漯河市',value: Math.round(Math.random()*1000)},
                            {name: '鹤壁市',value: Math.round(Math.random()*1000)},
                            {name: '大连市',value: Math.round(Math.random()*1000)},
                            {name: '朝阳市',value: Math.round(Math.random()*1000)},
                            {name: '丹东市',value: Math.round(Math.random()*1000)},
                            {name: '铁岭市',value: Math.round(Math.random()*1000)},
                            {name: '沈阳市',value: Math.round(Math.random()*1000)},
                            {name: '抚顺市',value: Math.round(Math.random()*1000)},
                            {name: '葫芦岛市',value: Math.round(Math.random()*1000)},
                            {name: '阜新市',value: Math.round(Math.random()*1000)},
                            {name: '锦州市',value: Math.round(Math.random()*1000)},
                            {name: '鞍山市',value: Math.round(Math.random()*1000)},
                            {name: '本溪市',value: Math.round(Math.random()*1000)},
                            {name: '营口市',value: Math.round(Math.random()*1000)},
                            {name: '辽阳市',value: Math.round(Math.random()*1000)},
                            {name: '盘锦市',value: Math.round(Math.random()*1000)},
                            {name: '忻州市',value: Math.round(Math.random()*1000)},
                            {name: '吕梁市',value: Math.round(Math.random()*1000)},
                            {name: '临汾市',value: Math.round(Math.random()*1000)},
                            {name: '晋中市',value: Math.round(Math.random()*1000)},
                            {name: '运城市',value: Math.round(Math.random()*1000)},
                            {name: '大同市',value: Math.round(Math.random()*1000)},
                            {name: '长治市',value: Math.round(Math.random()*1000)},
                            {name: '朔州市',value: Math.round(Math.random()*1000)},
                            {name: '晋城市',value: Math.round(Math.random()*1000)},
                            {name: '太原市',value: Math.round(Math.random()*1000)},
                            {name: '阳泉市',value: Math.round(Math.random()*1000)},
                            {name: '六安市',value: Math.round(Math.random()*1000)},
                            {name: '安庆市',value: Math.round(Math.random()*1000)},
                            {name: '滁州市',value: Math.round(Math.random()*1000)},
                            {name: '宣城市',value: Math.round(Math.random()*1000)},
                            {name: '阜阳市',value: Math.round(Math.random()*1000)},
                            {name: '宿州市',value: Math.round(Math.random()*1000)},
                            {name: '黄山市',value: Math.round(Math.random()*1000)},
                            {name: '巢湖市',value: Math.round(Math.random()*1000)},
                            {name: '亳州市',value: Math.round(Math.random()*1000)},
                            {name: '池州市',value: Math.round(Math.random()*1000)},
                            {name: '合肥市',value: Math.round(Math.random()*1000)},
                            {name: '蚌埠市',value: Math.round(Math.random()*1000)},
                            {name: '芜湖市',value: Math.round(Math.random()*1000)},
                            {name: '淮北市',value: Math.round(Math.random()*1000)},
                            {name: '淮南市',value: Math.round(Math.random()*1000)},
                            {name: '马鞍山市',value: Math.round(Math.random()*1000)},
                            {name: '铜陵市',value: Math.round(Math.random()*1000)},
                            {name: '南平市',value: Math.round(Math.random()*1000)},
                            {name: '三明市',value: Math.round(Math.random()*1000)},
                            {name: '龙岩市',value: Math.round(Math.random()*1000)},
                            {name: '宁德市',value: Math.round(Math.random()*1000)},
                            {name: '福州市',value: Math.round(Math.random()*1000)},
                            {name: '漳州市',value: Math.round(Math.random()*1000)},
                            {name: '泉州市',value: Math.round(Math.random()*1000)},
                            {name: '莆田市',value: Math.round(Math.random()*1000)},
                            {name: '厦门市',value: Math.round(Math.random()*1000)},
                            {name: '丽水市',value: Math.round(Math.random()*1000)},
                            {name: '杭州市',value: Math.round(Math.random()*1000)},
                            {name: '温州市',value: Math.round(Math.random()*1000)},
                            {name: '宁波市',value: Math.round(Math.random()*1000)},
                            {name: '舟山市',value: Math.round(Math.random()*1000)},
                            {name: '台州市',value: Math.round(Math.random()*1000)},
                            {name: '金华市',value: Math.round(Math.random()*1000)},
                            {name: '衢州市',value: Math.round(Math.random()*1000)},
                            {name: '绍兴市',value: Math.round(Math.random()*1000)},
                            {name: '嘉兴市',value: Math.round(Math.random()*1000)},
                            {name: '湖州市',value: Math.round(Math.random()*1000)},
                            {name: '盐城市',value: Math.round(Math.random()*1000)},
                            {name: '徐州市',value: Math.round(Math.random()*1000)},
                            {name: '南通市',value: Math.round(Math.random()*1000)},
                            {name: '淮安市',value: Math.round(Math.random()*1000)},
                            {name: '苏州市',value: Math.round(Math.random()*1000)},
                            {name: '宿迁市',value: Math.round(Math.random()*1000)},
                            {name: '连云港市',value: Math.round(Math.random()*1000)},
                            {name: '扬州市',value: Math.round(Math.random()*1000)},
                            {name: '南京市',value: Math.round(Math.random()*1000)},
                            {name: '泰州市',value: Math.round(Math.random()*1000)},
                            {name: '无锡市',value: Math.round(Math.random()*1000)},
                            {name: '常州市',value: Math.round(Math.random()*1000)},
                            {name: '镇江市',value: Math.round(Math.random()*1000)},
                            {name: '吴忠市',value: Math.round(Math.random()*1000)},
                            {name: '中卫市',value: Math.round(Math.random()*1000)},
                            {name: '固原市',value: Math.round(Math.random()*1000)},
                            {name: '银川市',value: Math.round(Math.random()*1000)},
                            {name: '石嘴山市',value: Math.round(Math.random()*1000)},
                            {name: '儋州市',value: Math.round(Math.random()*1000)},
                            {name: '文昌市',value: Math.round(Math.random()*1000)},
                            {name: '乐东黎族自治县',value: Math.round(Math.random()*1000)},
                            {name: '三亚市',value: Math.round(Math.random()*1000)},
                            {name: '琼中黎族苗族自治县',value: Math.round(Math.random()*1000)},
                            {name: '东方市',value: Math.round(Math.random()*1000)},
                            {name: '海口市',value: Math.round(Math.random()*1000)},
                            {name: '万宁市',value: Math.round(Math.random()*1000)},
                            {name: '澄迈县',value: Math.round(Math.random()*1000)},
                            {name: '白沙黎族自治县',value: Math.round(Math.random()*1000)},
                            {name: '琼海市',value: Math.round(Math.random()*1000)},
                            {name: '昌江黎族自治县',value: Math.round(Math.random()*1000)},
                            {name: '临高县',value: Math.round(Math.random()*1000)},
                            {name: '陵水黎族自治县',value: Math.round(Math.random()*1000)},
                            {name: '屯昌县',value: Math.round(Math.random()*1000)},
                            {name: '定安县',value: Math.round(Math.random()*1000)},
                            {name: '保亭黎族苗族自治县',value: Math.round(Math.random()*1000)},
                            {name: '五指山市',value: Math.round(Math.random()*1000)}
                        ],
                        */
                        // 标注
                        markPoint : {
                            symbol:'pin',
                            symbolSize : function (v){
                                // return 10 + v/100
                                return 20
                            },
                            effect : {
                                show: false,
                                shadowBlur : 0
                            },
                            itemStyle: {
                                normal: {
                                    // color:'#9ed4f5',
                                    color:'#ffbdd4',
                                    // borderColor: '#87cefa',
                                    borderColor: '#ffbdd4',
                                    borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                                    label: {
                                        show: false
                                        // position: 'top'
                                    }
                                },
                                emphasis: {
                                    // color:'#000',
                                    borderColor: '#1e90ff',
                                    borderWidth: 2,
                                    label: {
                                        position: 'top',
                                        textStyle:{
                                            color:'#fff',
                                            // color:'#952922',
                                            fontWeight:'bold',
                                        }
                                    }
                                }
                            },
                            data:[]
                        },
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
                    }
                    // 点击进入省级后适配分辨率
                    if(target){
                        if (screen.width <= 1440) {
                            option.series[0].mapLocation = {
                                x:'center',
                                y:'220px',
                                width:'100%',
                                height:'65%'
                            }
                        } else {
                            option.series[0].mapLocation = {
                                x:'center',
                                y:'250px',
                                width:'100%',
                                height:'70%'
                            }
                        }
                        // ====请求省下级各市====
                        var city_url='/homepage/cityRank/?province='+target;
                        // console.log(city_url);
                        public_ajax.call_request('get',city_url,city);
                    }
                    var proviceData = [],proviceData_1 = [];
                    function city(data){
                        if(data){
                            // console.log(data);
                            var data_count7,data_count30;
                            // 更新左下角
                            $('#container .bottom_left #picChart-5 #proRank').empty();
                            for(var i=0;i<data.length;i++){
                                proviceData.push({name:data[i].city,value:data[i].count7});

                                // series.data的数据（用于地图块的颜色，只能跟地图数据名字一样、、）
                                proviceData_1.push({name:data[i].city+'市',value:data[i].count7});//

                                // 更新左下角排行
                                if(!data[i].count7){
                                    data_count7 = 0;
                                }else {
                                    data_count7 = data[i].count7;
                                }
                                if(!data[i].count30){
                                    data_count30 = 0;
                                }else {
                                    data_count30 = data[i].count30;
                                }
                                var str = '<p><span>'+data[i].city+'</span><span>'+data_count7+'</span><span>'+data_count30+'</span></p>';
                                $('#container .bottom_left #picChart-5 #proRank').append(str)
                            }
                        }
                        // console.log(proviceData);
                        // console.log(proviceData_1);
                        option.series[0].data = proviceData_1;
                        // ===========先去掉标注===============
                        // option.series[0].markPoint.data = proviceData;
                        // 渲染地图
                        // console.log(option);
                        myChart.setOption(option, true);
                    }
                    /*

                     // 23个省 ---加标注气泡
                        // '广东', '青海', '四川', '海南', '陕西',
                        if(target == '广东'){

                            // 画标注
                            option.series[0].markPoint.data= [
                                {name: "东莞", value: Math.round(Math.random()*100)},
                                {name: "中山", value: Math.round(Math.random()*100)},
                                {name: "云浮", value: Math.round(Math.random()*100)},
                                {name: "佛山", value: Math.round(Math.random()*100)},
                                {name: "广州", value: Math.round(Math.random()*100)},
                                {name: "惠州", value: Math.round(Math.random()*100)},
                                {name: "揭阳", value: Math.round(Math.random()*100)},
                                {name: "梅州", value: Math.round(Math.random()*100)},
                                {name: "汕头", value: Math.round(Math.random()*100)},
                                {name: "汕尾", value: Math.round(Math.random()*100)},
                                {name: "江门", value: Math.round(Math.random()*100)},
                                {name: "河源", value: Math.round(Math.random()*100)},
                                {name: "深圳", value: Math.round(Math.random()*100)},
                                {name: "清远", value: Math.round(Math.random()*100)},
                                {name: "湛江", value: Math.round(Math.random()*100)},
                                {name: "潮州", value: Math.round(Math.random()*100)},
                                {name: "珠海", value: Math.round(Math.random()*100)},
                                {name: "肇庆", value: Math.round(Math.random()*100)},
                                {name: "茂名", value: Math.round(Math.random()*100)},
                                {name: "阳江", value: Math.round(Math.random()*100)},
                                {name: "韶关", value: Math.round(Math.random()*100)},

                                //深圳市内
                                {name: "龙岗区", value:  Math.round(Math.random()*10)},
                                {name: "盐田区", value: Math.round(Math.random()*10)},
                                {name: "坪山区", value: Math.round(Math.random()*10)},
                                {name: "大鹏新区", value: Math.round(Math.random()*10)},
                                {name: "深汕特别合作区", value: Math.round(Math.random()*10)},
                                {name: "宝安区", value: Math.round(Math.random()*10)},
                                {name: "光明新区", value: Math.round(Math.random()*10)},
                                {name: "南山区", value: Math.round(Math.random()*10)},
                                {name: "前海特区", value: Math.round(Math.random()*10)},
                                {name: "龙华区", value: Math.round(Math.random()*10)},
                                {name: "福田区", value: Math.round(Math.random()*10)},
                                {name: "罗湖区", value: Math.round(Math.random()*10)},
                            ]
                            // 更新数据
                            // 左下角表格
                            $('#container .bottom_left .title span').text('疑似非法集资城市排行')
                            $('#container .bottom_left #picChart-5>p').children('span:first-child').text('城市')
                            // $('#container .bottom_left #picChart-5 #proRank').empty();
                            // var cityData = ["东莞","中山","云浮","佛山","广州","惠州","揭阳","梅州","汕头","汕尾","江门","河源","深圳","清远","湛江","潮州","珠海","肇庆","茂名","阳江","韶关"];
                            // for (var i=0;i<cityData.length;i++){
                            //     var str = '<p><span>'+cityData[i]+'</span><span>'+Math.round(Math.random()*10)+'</span><span>'+Math.round(Math.random()*10)+'</span></p>';
                            //     $('#container .bottom_left #picChart-5 #proRank').append(str)
                            // }
                            // 左上角折线面积图
                            // option_1.series[0].data = [30, 182, 434, 791, 390, 30, 10];
                            // line_1();

                        }else if(target == '青海'){
                            option.series[0].markPoint.data= [
                                {name: "果洛藏族自治州", value: Math.round(Math.random()*100)},
                                {name: "海东地区", value: Math.round(Math.random()*100)},
                                {name: "海北藏族自治州", value: Math.round(Math.random()*100)},
                                {name: "海南藏族自治州", value: Math.round(Math.random()*100)},
                                {name: "海西蒙古族藏族自治州", value: Math.round(Math.random()*100)},
                                {name: "玉树藏族自治州", value: Math.round(Math.random()*100)},
                                {name: "西宁", value: Math.round(Math.random()*100)},
                                {name: "黄南藏族自治州", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '四川'){
                            option.series[0].markPoint.data= [
                                {name: "乐山市", value: Math.round(Math.random()*100)},
                                {name: "内江市", value: Math.round(Math.random()*100)},
                                {name: "凉山彝族自治州", value: Math.round(Math.random()*100)},
                                {name: "南充", value: Math.round(Math.random()*100)},
                                {name: "宜宾", value: Math.round(Math.random()*100)},
                                {name: "巴中", value: Math.round(Math.random()*100)},
                                {name: "广元", value: Math.round(Math.random()*100)},
                                {name: "广安", value: Math.round(Math.random()*100)},
                                {name: "德阳", value: Math.round(Math.random()*100)},
                                {name: "成都", value: Math.round(Math.random()*100)},
                                {name: "攀枝花", value: Math.round(Math.random()*100)},
                                {name: "泸州", value: Math.round(Math.random()*100)},
                                {name: "甘孜藏族自治州", value: Math.round(Math.random()*100)},
                                {name: "眉山", value: Math.round(Math.random()*100)},
                                {name: "绵阳", value: Math.round(Math.random()*100)},
                                {name: "自贡", value: Math.round(Math.random()*100)},
                                {name: "资阳", value: Math.round(Math.random()*100)},
                                {name: "达州", value: Math.round(Math.random()*100)},
                                {name: "遂宁", value: Math.round(Math.random()*100)},
                                {name: "阿坝藏族羌族自治州", value: Math.round(Math.random()*100)},
                                {name: "雅安", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '海南'){
                            option.series[0].markPoint.data= [
                                {name: "万宁", value: Math.round(Math.random()*100)},
                                {name: "三亚", value: Math.round(Math.random()*100)},
                                {name: "东方", value: Math.round(Math.random()*100)},
                                {name: "临高县", value: Math.round(Math.random()*100)},
                                {name: "乐东黎族自治县", value: Math.round(Math.random()*100)},
                                {name: "五指山", value: Math.round(Math.random()*100)},
                                {name: "保亭黎族苗族自治县", value: Math.round(Math.random()*100)},
                                {name: "儋州", value: Math.round(Math.random()*100)},
                                {name: "定安县", value: Math.round(Math.random()*100)},
                                {name: "屯昌县", value: Math.round(Math.random()*100)},
                                {name: "文昌", value: Math.round(Math.random()*100)},
                                {name: "昌江黎族自治县", value: Math.round(Math.random()*100)},
                                {name: "海口", value: Math.round(Math.random()*100)},
                                {name: "澄迈县", value: Math.round(Math.random()*100)},
                                {name: "琼中黎族苗族自治县", value: Math.round(Math.random()*100)},
                                {name: "琼海", value: Math.round(Math.random()*100)},
                                {name: "白沙黎族自治县", value: Math.round(Math.random()*100)},
                                {name: "陵水黎族自治县", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '陕西'){
                            option.series[0].markPoint.data= [
                                {name: "咸阳", value: Math.round(Math.random()*100)},
                                {name: "商洛", value: Math.round(Math.random()*100)},
                                {name: "安康", value: Math.round(Math.random()*100)},
                                {name: "宝鸡", value: Math.round(Math.random()*100)},
                                {name: "延安", value: Math.round(Math.random()*100)},
                                {name: "榆林", value: Math.round(Math.random()*100)},
                                {name: "汉中", value: Math.round(Math.random()*100)},
                                {name: "渭南", value: Math.round(Math.random()*100)},
                                {name: "西安", value: Math.round(Math.random()*100)},
                                {name: "铜川", value: Math.round(Math.random()*100)},
                            ]
                        }
                        // '甘肃', '云南', '湖南', '湖北', '黑龙江',
                        else if(target == '甘肃'){
                            option.series[0].markPoint.data= [
                                {name: "临夏回族自治州", value: Math.round(Math.random()*100)},
                                {name: "兰州", value: Math.round(Math.random()*100)},
                                {name: "嘉峪关", value: Math.round(Math.random()*100)},
                                {name: "天水", value: Math.round(Math.random()*100)},
                                {name: "定西", value: Math.round(Math.random()*100)},
                                {name: "平凉", value: Math.round(Math.random()*100)},
                                {name: "庆阳", value: Math.round(Math.random()*100)},
                                {name: "张掖", value: Math.round(Math.random()*100)},
                                {name: "武威", value: Math.round(Math.random()*100)},
                                {name: "甘南藏族自治州", value: Math.round(Math.random()*100)},
                                {name: "白银", value: Math.round(Math.random()*100)},
                                {name: "酒泉", value: Math.round(Math.random()*100)},
                                {name: "金昌", value: Math.round(Math.random()*100)},
                                {name: "陇南", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '云南'){
                            option.series[0].markPoint.data= [
                                {name: "临沧", value: Math.round(Math.random()*100)},
                                {name: "丽江", value: Math.round(Math.random()*100)},
                                {name: "保山", value: Math.round(Math.random()*100)},
                                {name: "大理白族自治州", value: Math.round(Math.random()*100)},
                                {name: "德宏傣族景颇族自治州", value: Math.round(Math.random()*100)},
                                {name: "怒江傈僳族自治州", value: Math.round(Math.random()*100)},
                                {name: "文山壮族苗族自治州", value: Math.round(Math.random()*100)},
                                {name: "昆明", value: Math.round(Math.random()*100)},
                                {name: "昭通", value: Math.round(Math.random()*100)},
                                {name: "普洱", value: Math.round(Math.random()*100)},
                                {name: "曲靖", value: Math.round(Math.random()*100)},
                                {name: "楚雄彝族自治州", value: Math.round(Math.random()*100)},
                                {name: "玉溪", value: Math.round(Math.random()*100)},
                                {name: "红河哈尼族彝族自治州", value: Math.round(Math.random()*100)},
                                {name: "西双版纳傣族自治州", value: Math.round(Math.random()*100)},
                                {name: "迪庆藏族自治州", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '湖南'){
                            option.series[0].markPoint.data= [
                                {name: "娄底", value: Math.round(Math.random()*100)},
                                {name: "岳阳", value: Math.round(Math.random()*100)},
                                {name: "常德", value: Math.round(Math.random()*100)},
                                {name: "张家界", value: Math.round(Math.random()*100)},
                                {name: "怀化", value: Math.round(Math.random()*100)},
                                {name: "株洲", value: Math.round(Math.random()*100)},
                                {name: "永州", value: Math.round(Math.random()*100)},
                                {name: "湘潭", value: Math.round(Math.random()*100)},
                                {name: "湘西土家族苗族自治州", value: Math.round(Math.random()*100)},
                                {name: "益阳", value: Math.round(Math.random()*100)},
                                {name: "衡阳", value: Math.round(Math.random()*100)},
                                {name: "邵阳", value: Math.round(Math.random()*100)},
                                {name: "郴州", value: Math.round(Math.random()*100)},
                                {name: "长沙", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '湖北'){
                            option.series[0].markPoint.data= [
                                {name: "仙桃", value: Math.round(Math.random()*100)},
                                {name: "十堰", value: Math.round(Math.random()*100)},
                                {name: "咸宁", value: Math.round(Math.random()*100)},
                                {name: "天门", value: Math.round(Math.random()*100)},
                                {name: "孝感", value: Math.round(Math.random()*100)},
                                {name: "宜昌", value: Math.round(Math.random()*100)},
                                {name: "恩施土家族苗族自治州", value: Math.round(Math.random()*100)},
                                {name: "武汉", value: Math.round(Math.random()*100)},
                                {name: "潜江", value: Math.round(Math.random()*100)},
                                {name: "神农架林区", value: Math.round(Math.random()*100)},
                                {name: "荆州", value: Math.round(Math.random()*100)},
                                {name: "荆门", value: Math.round(Math.random()*100)},
                                {name: "襄樊", value: Math.round(Math.random()*100)},
                                {name: "鄂州", value: Math.round(Math.random()*100)},
                                {name: "随州", value: Math.round(Math.random()*100)},
                                {name: "黄冈", value: Math.round(Math.random()*100)},
                                {name: "黄石", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '黑龙江'){
                            option.series[0].markPoint.data= [
                                {name: "七台河", value: Math.round(Math.random()*100)},
                                {name: "伊春", value: Math.round(Math.random()*100)},
                                {name: "佳木斯", value: Math.round(Math.random()*100)},
                                {name: "双鸭山", value: Math.round(Math.random()*100)},
                                {name: "哈尔滨", value: Math.round(Math.random()*100)},
                                {name: "大兴安岭", value: Math.round(Math.random()*100)},
                                {name: "大庆", value: Math.round(Math.random()*100)},
                                {name: "牡丹江", value: Math.round(Math.random()*100)},
                                {name: "绥化", value: Math.round(Math.random()*100)},
                                {name: "鸡西", value: Math.round(Math.random()*100)},
                                {name: "鹤岗", value: Math.round(Math.random()*100)},
                                {name: "黑河", value: Math.round(Math.random()*100)},
                                {name: "齐齐哈尔", value: Math.round(Math.random()*100)},
                            ]
                        }
                        // '贵州', '山东', '江西', '河南', '河北',
                        else if(target == '贵州'){
                            option.series[0].markPoint.data= [
                                {name: "六盘水", value: Math.round(Math.random()*100)},
                                {name: "安顺", value: Math.round(Math.random()*100)},
                                {name: "毕节地区", value: Math.round(Math.random()*100)},
                                {name: "贵阳", value: Math.round(Math.random()*100)},
                                {name: "遵义", value: Math.round(Math.random()*100)},
                                {name: "铜仁地区", value: Math.round(Math.random()*100)},
                                {name: "黔东南苗族侗族自治州", value: Math.round(Math.random()*100)},
                                {name: "黔南布依族苗族自治州", value: Math.round(Math.random()*100)},
                                {name: "黔西南布依族苗族自治州", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '山东'){
                            option.series[0].markPoint.data= [
                                {name: "东营", value: Math.round(Math.random()*100)},
                                {name: "临沂", value: Math.round(Math.random()*100)},
                                {name: "威海", value: Math.round(Math.random()*100)},
                                {name: "德州", value: Math.round(Math.random()*100)},
                                {name: "日照", value: Math.round(Math.random()*100)},
                                {name: "枣庄", value: Math.round(Math.random()*100)},
                                {name: "泰安", value: Math.round(Math.random()*100)},
                                {name: "济南", value: Math.round(Math.random()*100)},
                                {name: "济宁", value: Math.round(Math.random()*100)},
                                {name: "淄博", value: Math.round(Math.random()*100)},
                                {name: "滨州", value: Math.round(Math.random()*100)},
                                {name: "潍坊", value: Math.round(Math.random()*100)},
                                {name: "烟台", value: Math.round(Math.random()*100)},
                                {name: "聊城", value: Math.round(Math.random()*100)},
                                {name: "莱芜", value: Math.round(Math.random()*100)},
                                {name: "菏泽", value: Math.round(Math.random()*100)},
                                {name: "青岛", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '江西'){
                            option.series[0].markPoint.data= [
                                {name: "上饶", value: Math.round(Math.random()*100)},
                                {name: "九江", value: Math.round(Math.random()*100)},
                                {name: "南昌", value: Math.round(Math.random()*100)},
                                {name: "吉安", value: Math.round(Math.random()*100)},
                                {name: "宜春", value: Math.round(Math.random()*100)},
                                {name: "抚州", value: Math.round(Math.random()*100)},
                                {name: "新余", value: Math.round(Math.random()*100)},
                                {name: "景德镇", value: Math.round(Math.random()*100)},
                                {name: "萍乡", value: Math.round(Math.random()*100)},
                                {name: "赣州", value: Math.round(Math.random()*100)},
                                {name: "鹰潭", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '河南'){
                            option.series[0].markPoint.data= [
                                {name: "三门峡", value: Math.round(Math.random()*100)},
                                {name: "信阳", value: Math.round(Math.random()*100)},
                                {name: "南阳", value: Math.round(Math.random()*100)},
                                {name: "周口", value: Math.round(Math.random()*100)},
                                {name: "商丘", value: Math.round(Math.random()*100)},
                                {name: "安阳", value: Math.round(Math.random()*100)},
                                {name: "平顶山", value: Math.round(Math.random()*100)},
                                {name: "开封", value: Math.round(Math.random()*100)},
                                {name: "新乡", value: Math.round(Math.random()*100)},
                                {name: "洛阳", value: Math.round(Math.random()*100)},
                                {name: "漯河", value: Math.round(Math.random()*100)},
                                {name: "濮阳", value: Math.round(Math.random()*100)},
                                {name: "焦作", value: Math.round(Math.random()*100)},
                                {name: "许昌", value: Math.round(Math.random()*100)},
                                {name: "郑州", value: Math.round(Math.random()*100)},
                                {name: "驻马店", value: Math.round(Math.random()*100)},
                                {name: "鹤壁", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '河北'){
                            option.series[0].markPoint.data= [
                                {name: "保定", value: Math.round(Math.random()*100)},
                                {name: "唐山", value: Math.round(Math.random()*100)},
                                {name: "廊坊", value: Math.round(Math.random()*100)},
                                {name: "张家口", value: Math.round(Math.random()*100)},
                                {name: "承德", value: Math.round(Math.random()*100)},
                                {name: "沧州", value: Math.round(Math.random()*100)},
                                {name: "石家庄", value: Math.round(Math.random()*100)},
                                {name: "秦皇岛", value: Math.round(Math.random()*100)},
                                {name: "衡水", value: Math.round(Math.random()*100)},
                                {name: "邢台", value: Math.round(Math.random()*100)},
                                {name: "邯郸", value: Math.round(Math.random()*100)},
                            ]
                        }
                        // '山西', '安徽', '福建', '浙江', '江苏',
                        else if(target == '山西'){
                            option.series[0].markPoint.data= [
                                {name: "临汾", value: Math.round(Math.random()*100)},
                                {name: "吕梁", value: Math.round(Math.random()*100)},
                                {name: "大同", value: Math.round(Math.random()*100)},
                                {name: "太原", value: Math.round(Math.random()*100)},
                                {name: "忻州", value: Math.round(Math.random()*100)},
                                {name: "晋中", value: Math.round(Math.random()*100)},
                                {name: "晋城", value: Math.round(Math.random()*100)},
                                {name: "朔州", value: Math.round(Math.random()*100)},
                                {name: "运城", value: Math.round(Math.random()*100)},
                                {name: "长治", value: Math.round(Math.random()*100)},
                                {name: "阳泉", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '安徽'){
                            option.series[0].markPoint.data= [
                                {name: "亳州", value: Math.round(Math.random()*100)},
                                {name: "六安", value: Math.round(Math.random()*100)},
                                {name: "合肥", value: Math.round(Math.random()*100)},
                                {name: "安庆", value: Math.round(Math.random()*100)},
                                {name: "宣城", value: Math.round(Math.random()*100)},
                                {name: "宿州", value: Math.round(Math.random()*100)},
                                {name: "巢湖", value: Math.round(Math.random()*100)},
                                {name: "池州", value: Math.round(Math.random()*100)},
                                {name: "淮北", value: Math.round(Math.random()*100)},
                                {name: "淮南", value: Math.round(Math.random()*100)},
                                {name: "滁州", value: Math.round(Math.random()*100)},
                                {name: "芜湖", value: Math.round(Math.random()*100)},
                                {name: "蚌埠", value: Math.round(Math.random()*100)},
                                {name: "铜陵", value: Math.round(Math.random()*100)},
                                {name: "阜阳", value: Math.round(Math.random()*100)},
                                {name: "马鞍山", value: Math.round(Math.random()*100)},
                                {name: "黄山", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '福建'){
                            option.series[0].markPoint.data= [
                                {name: "三明", value: Math.round(Math.random()*100)},
                                {name: "南平", value: Math.round(Math.random()*100)},
                                {name: "厦门", value: Math.round(Math.random()*100)},
                                {name: "宁德", value: Math.round(Math.random()*100)},
                                {name: "泉州", value: Math.round(Math.random()*100)},
                                {name: "漳州", value: Math.round(Math.random()*100)},
                                {name: "福州", value: Math.round(Math.random()*100)},
                                {name: "莆田", value: Math.round(Math.random()*100)},
                                {name: "龙岩", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '浙江'){
                            option.series[0].markPoint.data= [
                                {name: "丽水", value: Math.round(Math.random()*100)},
                                {name: "台州", value: Math.round(Math.random()*100)},
                                {name: "嘉兴", value: Math.round(Math.random()*100)},
                                {name: "宁波", value: Math.round(Math.random()*100)},
                                {name: "杭州", value: Math.round(Math.random()*100)},
                                {name: "温州", value: Math.round(Math.random()*100)},
                                {name: "湖州", value: Math.round(Math.random()*100)},
                                {name: "绍兴", value: Math.round(Math.random()*100)},
                                {name: "舟山", value: Math.round(Math.random()*100)},
                                {name: "衢州", value: Math.round(Math.random()*100)},
                                {name: "金华", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '江苏'){
                            option.series[0].markPoint.data= [
                                {name: "南京", value: Math.round(Math.random()*100)},
                                {name: "南通", value: Math.round(Math.random()*100)},
                                {name: "宿迁", value: Math.round(Math.random()*100)},
                                {name: "常州", value: Math.round(Math.random()*100)},
                                {name: "徐州", value: Math.round(Math.random()*100)},
                                {name: "扬州", value: Math.round(Math.random()*100)},
                                {name: "无锡", value: Math.round(Math.random()*100)},
                                {name: "泰州", value: Math.round(Math.random()*100)},
                                {name: "淮安", value: Math.round(Math.random()*100)},
                                {name: "盐城", value: Math.round(Math.random()*100)},
                                {name: "苏州", value: Math.round(Math.random()*100)},
                                {name: "连云港", value: Math.round(Math.random()*100)},
                                {name: "镇江", value: Math.round(Math.random()*100)},
                            ]
                        }
                        // '吉林', '辽宁', '台湾',
                        else if(target == '吉林'){
                            option.series[0].markPoint.data= [
                                {name: "吉林", value: Math.round(Math.random()*100)},
                                {name: "四平", value: Math.round(Math.random()*100)},
                                {name: "延边朝鲜族自治州", value: Math.round(Math.random()*100)},
                                {name: "松原", value: Math.round(Math.random()*100)},
                                {name: "白城", value: Math.round(Math.random()*100)},
                                {name: "白山", value: Math.round(Math.random()*100)},
                                {name: "辽源", value: Math.round(Math.random()*100)},
                                {name: "通化", value: Math.round(Math.random()*100)},
                                {name: "长春", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '辽宁'){
                            option.series[0].markPoint.data= [
                                {name: "丹东", value: Math.round(Math.random()*100)},
                                {name: "大连", value: Math.round(Math.random()*100)},
                                {name: "抚顺", value: Math.round(Math.random()*100)},
                                {name: "朝阳", value: Math.round(Math.random()*100)},
                                {name: "本溪", value: Math.round(Math.random()*100)},
                                {name: "沈阳", value: Math.round(Math.random()*100)},
                                {name: "盘锦", value: Math.round(Math.random()*100)},
                                {name: "营口", value: Math.round(Math.random()*100)},
                                {name: "葫芦岛", value: Math.round(Math.random()*100)},
                                {name: "辽阳", value: Math.round(Math.random()*100)},
                                {name: "铁岭", value: Math.round(Math.random()*100)},
                                {name: "锦州", value: Math.round(Math.random()*100)},
                                {name: "阜新", value: Math.round(Math.random()*100)},
                                {name: "鞍山", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '台湾'){
                            option.series[0].markPoint.data= [
                                {name: "台湾", value: Math.round(Math.random()*100)},
                            ]
                        }
                        // 5个自治区
                        // '新疆', '广西', '宁夏', '内蒙古', '西藏',
                        else if(target == '新疆'){
                            option.series[0].markPoint.data= [
                                {name: "乌鲁木齐", value: Math.round(Math.random()*100)},
                                {name: "五家渠市", value: Math.round(Math.random()*100)},
                                {name: "伊犁哈萨克自治州", value: Math.round(Math.random()*100)},
                                {name: "克孜勒苏柯尔克孜自治州", value: Math.round(Math.random()*100)},
                                {name: "克拉玛依", value: Math.round(Math.random()*100)},
                                {name: "博尔塔拉蒙古自治州", value: Math.round(Math.random()*100)},
                                {name: "吐鲁番地区", value: Math.round(Math.random()*100)},
                                {name: "和田地区", value: Math.round(Math.random()*100)},
                                {name: "哈密地区", value: Math.round(Math.random()*100)},
                                {name: "喀什地区", value: Math.round(Math.random()*100)},
                                {name: "图木舒克市", value: Math.round(Math.random()*100)},
                                {name: "塔城地区", value: Math.round(Math.random()*100)},
                                {name: "巴音郭楞蒙古自治州", value: Math.round(Math.random()*100)},
                                {name: "昌吉回族自治州", value: Math.round(Math.random()*100)},
                                {name: "石河子", value: Math.round(Math.random()*100)},
                                {name: "阿克苏地区", value: Math.round(Math.random()*100)},
                                {name: "阿勒泰地区", value: Math.round(Math.random()*100)},
                                {name: "阿拉尔市", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '广西'){
                            option.series[0].markPoint.data= [
                                {name: "北海", value: Math.round(Math.random()*100)},
                                {name: "南宁", value: Math.round(Math.random()*100)},
                                {name: "崇左", value: Math.round(Math.random()*100)},
                                {name: "来宾", value: Math.round(Math.random()*100)},
                                {name: "柳州", value: Math.round(Math.random()*100)},
                                {name: "桂林", value: Math.round(Math.random()*100)},
                                {name: "梧州", value: Math.round(Math.random()*100)},
                                {name: "河池", value: Math.round(Math.random()*100)},
                                {name: "玉林", value: Math.round(Math.random()*100)},
                                {name: "百色", value: Math.round(Math.random()*100)},
                                {name: "贵港", value: Math.round(Math.random()*100)},
                                {name: "贺州", value: Math.round(Math.random()*100)},
                                {name: "钦州", value: Math.round(Math.random()*100)},
                                {name: "防城港", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '宁夏'){
                            option.series[0].markPoint.data= [
                                {name: "中卫", value: Math.round(Math.random()*100)},
                                {name: "吴忠", value: Math.round(Math.random()*100)},
                                {name: "固原", value: Math.round(Math.random()*100)},
                                {name: "石嘴山", value: Math.round(Math.random()*100)},
                                {name: "银川", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '内蒙古'){
                            option.series[0].markPoint.data= [
                                {name: "乌兰察布", value: Math.round(Math.random()*100)},
                                {name: "乌海", value: Math.round(Math.random()*100)},
                                {name: "兴安盟", value: Math.round(Math.random()*100)},
                                {name: "包头", value: Math.round(Math.random()*100)},
                                {name: "呼伦贝尔", value: Math.round(Math.random()*100)},
                                {name: "呼和浩特", value: Math.round(Math.random()*100)},
                                {name: "巴彦淖尔", value: Math.round(Math.random()*100)},
                                {name: "赤峰", value: Math.round(Math.random()*100)},
                                {name: "通辽", value: Math.round(Math.random()*100)},
                                {name: "鄂尔多斯", value: Math.round(Math.random()*100)},
                                {name: "锡林郭勒盟", value: Math.round(Math.random()*100)},
                                {name: "阿拉善盟", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '西藏'){
                            option.series[0].markPoint.data= [
                                {name: "山南地区", value: Math.round(Math.random()*100)},
                                {name: "拉萨", value: Math.round(Math.random()*100)},
                                {name: "日喀则地区", value: Math.round(Math.random()*100)},
                                {name: "昌都地区", value: Math.round(Math.random()*100)},
                                {name: "林芝地区", value: Math.round(Math.random()*100)},
                                {name: "那曲地区", value: Math.round(Math.random()*100)},
                                {name: "阿里地区", value: Math.round(Math.random()*100)},
                            ]
                        }
                        // 4个直辖市
                        // '北京', '天津', '上海', '重庆',
                        else if(target == '北京'){
                            option.series[0].markPoint.data= [
                                {name: "东城区", value: Math.round(Math.random()*100)},
                                {name: "丰台区", value: Math.round(Math.random()*100)},
                                {name: "大兴区", value: Math.round(Math.random()*100)},
                                {name: "宣武区", value: Math.round(Math.random()*100)},
                                {name: "密云县", value: Math.round(Math.random()*100)},
                                {name: "崇文区", value: Math.round(Math.random()*100)},
                                {name: "平谷区", value: Math.round(Math.random()*100)},
                                {name: "延庆县", value: Math.round(Math.random()*100)},
                                {name: "怀柔区", value: Math.round(Math.random()*100)},
                                {name: "房山区", value: Math.round(Math.random()*100)},
                                {name: "昌平区", value: Math.round(Math.random()*100)},
                                {name: "朝阳区", value: Math.round(Math.random()*100)},
                                {name: "海淀区", value: Math.round(Math.random()*100)},
                                {name: "石景山区", value: Math.round(Math.random()*100)},
                                {name: "西城区", value: Math.round(Math.random()*100)},
                                {name: "通州区", value: Math.round(Math.random()*100)},
                                {name: "门头沟区", value: Math.round(Math.random()*100)},
                                {name: "顺义区", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '天津'){
                            option.series[0].markPoint.data= [
                                {name: "东丽区", value: Math.round(Math.random()*100)},
                                {name: "北辰区", value: Math.round(Math.random()*100)},
                                {name: "南开区", value: Math.round(Math.random()*100)},
                                {name: "和平区", value: Math.round(Math.random()*100)},
                                {name: "塘沽区", value: Math.round(Math.random()*100)},
                                {name: "大港区", value: Math.round(Math.random()*100)},
                                {name: "宁河县", value: Math.round(Math.random()*100)},
                                {name: "宝坻区", value: Math.round(Math.random()*100)},
                                {name: "武清区", value: Math.round(Math.random()*100)},
                                {name: "汉沽区", value: Math.round(Math.random()*100)},
                                {name: "河东区", value: Math.round(Math.random()*100)},
                                {name: "河北区", value: Math.round(Math.random()*100)},
                                {name: "河西区", value: Math.round(Math.random()*100)},
                                {name: "津南区", value: Math.round(Math.random()*100)},
                                {name: "红桥区", value: Math.round(Math.random()*100)},
                                {name: "蓟县", value: Math.round(Math.random()*100)},
                                {name: "西青区", value: Math.round(Math.random()*100)},
                                {name: "静海县", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '上海'){
                            option.series[0].markPoint.data= [
                                {name: "南汇区", value: Math.round(Math.random()*100)},
                                {name: "卢湾区", value: Math.round(Math.random()*100)},
                                {name: "嘉定区", value: Math.round(Math.random()*100)},
                                {name: "奉贤区", value: Math.round(Math.random()*100)},
                                {name: "宝山区", value: Math.round(Math.random()*100)},
                                {name: "崇明县", value: Math.round(Math.random()*100)},
                                {name: "徐汇区", value: Math.round(Math.random()*100)},
                                {name: "普陀区", value: Math.round(Math.random()*100)},
                                {name: "杨浦区", value: Math.round(Math.random()*100)},
                                {name: "松江区", value: Math.round(Math.random()*100)},
                                {name: "浦东新区", value: Math.round(Math.random()*100)},
                                {name: "虹口区", value: Math.round(Math.random()*100)},
                                {name: "金山区", value: Math.round(Math.random()*100)},
                                {name: "长宁区", value: Math.round(Math.random()*100)},
                                {name: "闵行区", value: Math.round(Math.random()*100)},
                                {name: "闸北区", value: Math.round(Math.random()*100)},
                                {name: "青浦区", value: Math.round(Math.random()*100)},
                                {name: "静安区", value: Math.round(Math.random()*100)},
                                {name: "黄浦区", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '重庆'){
                            option.series[0].markPoint.data= [
                                {name: "万州区", value: Math.round(Math.random()*100)},
                                {name: "万盛区", value: Math.round(Math.random()*100)},
                                {name: "丰都县", value: Math.round(Math.random()*100)},
                                {name: "九龙坡区", value: Math.round(Math.random()*100)},
                                {name: "云阳县", value: Math.round(Math.random()*100)},
                                {name: "北碚区", value: Math.round(Math.random()*100)},
                                {name: "南岸区", value: Math.round(Math.random()*100)},
                                {name: "南川区", value: Math.round(Math.random()*100)},
                                {name: "双桥区", value: Math.round(Math.random()*100)},
                                {name: "合川区", value: Math.round(Math.random()*100)},
                                {name: "垫江县", value: Math.round(Math.random()*100)},
                                {name: "城口县", value: Math.round(Math.random()*100)},
                                {name: "大渡口区", value: Math.round(Math.random()*100)},
                                {name: "大足县", value: Math.round(Math.random()*100)},
                                {name: "奉节县", value: Math.round(Math.random()*100)},
                                {name: "巫山县", value: Math.round(Math.random()*100)},
                                {name: "巫溪县", value: Math.round(Math.random()*100)},
                                {name: "巴南区", value: Math.round(Math.random()*100)},
                                {name: "开县", value: Math.round(Math.random()*100)},
                                {name: "彭水苗族土家族自治县", value: Math.round(Math.random()*100)},
                                {name: "忠县", value: Math.round(Math.random()*100)},
                                {name: "梁平县", value: Math.round(Math.random()*100)},
                                {name: "武隆县", value: Math.round(Math.random()*100)},
                                {name: "永川区", value: Math.round(Math.random()*100)},
                                {name: "江北区", value: Math.round(Math.random()*100)},
                                {name: "江津区", value: Math.round(Math.random()*100)},
                                {name: "沙坪坝区", value: Math.round(Math.random()*100)},
                                {name: "涪陵区", value: Math.round(Math.random()*100)},
                                {name: "渝中区", value: Math.round(Math.random()*100)},
                                {name: "渝北区", value: Math.round(Math.random()*100)},
                                {name: "潼南县", value: Math.round(Math.random()*100)},
                                {name: "璧山县", value: Math.round(Math.random()*100)},
                                {name: "石柱土家族自治县", value: Math.round(Math.random()*100)},
                                {name: "秀山土家族苗族自治县", value: Math.round(Math.random()*100)},
                                {name: "綦江县", value: Math.round(Math.random()*100)},
                                {name: "荣昌县", value: Math.round(Math.random()*100)},
                                {name: "酉阳土家族苗族自治县", value: Math.round(Math.random()*100)},
                                {name: "铜梁县", value: Math.round(Math.random()*100)},
                                {name: "长寿区", value: Math.round(Math.random()*100)},
                                {name: "黔江区", value: Math.round(Math.random()*100)},
                            ]
                        }
                        // 2个特别行政区
                        // '香港', '澳门'
                        else if(target == '香港'){
                            option.series[0].markPoint.data= [
                                {name: "香港", value: Math.round(Math.random()*100)},
                            ]
                        }else if(target == '澳门'){
                            option.series[0].markPoint.data= [
                                {name: "澳门", value: Math.round(Math.random()*100)},
                            ]
                        }
                    */
                }
                else {
                    // 返回全国更新数据
                    // 左下角数据
                    $('#container .bottom_left .title span').text('疑似非法集资省份排行')
                    $('#container .bottom_left #picChart-5>p').children('span:first-child').text('省份')
                    public_ajax.call_request('get',provinceRank_url,provinceRank);
                    // provinceRank(provinceRank_data);//用保存的数据
                    // $('#container .bottom_left #picChart-5 #proRank').empty();
                    // var provinceData = ['广东', '青海', '四川', '海南', '陕西','甘肃', '云南', '湖南', '湖北', '黑龙江','贵州', '山东', '江西', '河南', '河北','山西', '安徽', '福建', '浙江', '江苏','吉林', '辽宁', '台湾','新疆', '广西', '宁夏', '内蒙古', '西藏','北京', '天津', '上海', '重庆','香港', '澳门'];
                    // for (var i=0;i<provinceData.length;i++){
                    //     var str = '<p><span>'+provinceData[i]+'</span><span>'+Math.round(Math.random()*10)+'</span><span>'+Math.round(Math.random()*100)+'</span></p>';
                    //     $('#container .bottom_left #picChart-5 #proRank').append(str)
                    // }
                    // 左上角折线图更新
                    // option_1.series[0].data = [11, 11, 15, 13, 12, 13, 10];
                    // line_1();

                    curIndx = 0;
                    mt = 'china';
                    option.tooltip.formatter = '点击进入该省<br/>{b}:{c}';
                    option.dataRange = {
                        show:true,
                        min: 0,
                        max: 2500,
                        x: '27%',
                        y: 'bottom',
                        //text:['2500','0'],           // 文本，默认为数值文本
                        // calculable : true,
                        itemGap:2,
                        splitList: [
                            // {start: 800},
                            // // {start: 700, end: 999},
                            // {start: 600, end: 800},
                            // {start: 400, end: 600},
                            // {start: 150, end: 400, label: '100 到 300'},
                            // // {start: 150, end: 300, label: '50 到 100（自定义特殊颜色）'},
                            // {end: 150},

                            {start: 100},
                            // {start: 700, end: 999},
                            {start: 50, end: 100},
                            {start: 20, end: 50},
                            {start: 10, end: 20},
                            // {start: 150, end: 300, label: '50 到 100（自定义特殊颜色）'},
                            {end: 10},
                        ],
                        textStyle:{
                            color:'white'
                        },
                        color: ['#cf181d','#fee9b4'],
                        // color:['#8a7ca8','#e098c7','#8fd3e8','#71669e','#cc70af','#7cb4cc']
                        // color: ['#ccc97a','#264861','#b3c587']
                    }
                    option.series[0] = {
                        name: '随机数据',
                        type: 'map',
                        roam: true,
                        scaleLimit:{
                            max:1.2,
                            min:0.6
                        },
                        hoverable: true,
                        mapType: 'china',
                        selectedMode : 'single',
                        itemStyle: {
                            normal: {
                                borderWidth:2,
                                borderColor:'white',
                                color:'rgba(3, 3, 4, 0.41)',
                                label: {
                                    show: true,
                                    textStyle: {
                                        // color: "rgb(249, 249, 249)",
                                        color: "#8b4513",
                                        fontSize: 14,
                                        fontWeight:'700',
                                    }
                                }
                            },
                            emphasis: {// 也是选中样式
                                borderWidth:2,
                                borderColor:'#fff',
                                color: 'rgba(25, 107, 123, 0.7)',
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
                        // data:[]
                        data:cityRankData//用之前的数据，不再重新请求
                        /*
                            data:[
                                {name: '北京',value: Math.round(Math.random()*1000)},
                                {name: '天津',value: Math.round(Math.random()*1000)},
                                {name: '上海',value: Math.round(Math.random()*1000)},
                                {name: '重庆',value: Math.round(Math.random()*1000)},
                                {name: '河北',value: Math.round(Math.random()*1000)},
                                {name: '河南',value: Math.round(Math.random()*1000)},
                                {name: '云南',value: Math.round(Math.random()*1000)},
                                {name: '辽宁',value: Math.round(Math.random()*1000)},
                                {name: '黑龙江',value: Math.round(Math.random()*1000)},
                                {name: '湖南',value: Math.round(Math.random()*1000)},
                                {name: '安徽',value: Math.round(Math.random()*1000)},
                                {name: '山东',value: Math.round(Math.random()*1000)},
                                {name: '新疆',value: Math.round(Math.random()*1000)},
                                {name: '江苏',value: Math.round(Math.random()*1000)},
                                {name: '浙江',value: Math.round(Math.random()*1000)},
                                {name: '江西',value: Math.round(Math.random()*1000)},
                                {name: '湖北',value: Math.round(Math.random()*1000)},
                                {name: '广西',value: Math.round(Math.random()*1000)},
                                {name: '甘肃',value: Math.round(Math.random()*1000)},
                                {name: '山西',value: Math.round(Math.random()*1000)},
                                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                {name: '陕西',value: Math.round(Math.random()*1000)},
                                {name: '吉林',value: Math.round(Math.random()*1000)},
                                {name: '福建',value: Math.round(Math.random()*1000)},
                                {name: '贵州',value: Math.round(Math.random()*1000)},
                                {name: '广东',value: Math.round(Math.random()*1000)},
                                {name: '青海',value: Math.round(Math.random()*1000)},
                                {name: '西藏',value: Math.round(Math.random()*1000)},
                                {name: '四川',value: Math.round(Math.random()*1000)},
                                {name: '宁夏',value: Math.round(Math.random()*1000)},
                                {name: '海南',value: Math.round(Math.random()*1000)},
                                {name: '台湾',value: Math.round(Math.random()*1000)},
                                {name: '香港',value: Math.round(Math.random()*1000)},
                                {name: '澳门',value: Math.round(Math.random()*1000)}
                            ]
                         */
                    }
                    // 点击返回全国后适配分辨率
                    if (screen.width <= 1440) {
                        option.series[0].mapLocation = {
                            x:'center',
                            y:'100px',
                            width:'100%',
                            height:'80%'
                        }
                    } else {
                        option.series[0].mapLocation = {
                            x:'center',
                            y:'100px',
                            width:'85%',
                            height:'85%'
                        }
                    }
                    /*
                        if ((screen.width == 1920) && (screen.height == 1080)){
                            option.series[0].mapLocation = {
                                x:'center',
                                y:'100px',
                                width:'85%',
                                height:'85%'
                            }
                        }
                        if ((screen.width == 1440) && (screen.height == 900)){
                            option.series[0].mapLocation = {
                                x:'center',
                                y:'100px',
                                width:'100%',
                                height:'80%'
                            }
                        }
                        if ((screen.width == 1366) && (screen.height == 768)){
                            option.series[0].mapLocation = {
                                x:'center',
                                y:'100px',
                                width:'100%',
                                height:'80%'
                            }
                        }
                     */
                    /*
                        // ====请求全国数据====用已保存的
                        var cityRank_url_1='/homepage/cityRank/';
                        public_ajax.call_request('get',cityRank_url_1,cityRank_1);
                        var cityRankData_1 = [];
                        function cityRank_1(data){
                            if(data){
                                // console.log(data);
                                for(var i=0;i<data.length;i++){
                                    cityRankData_1.push({name:data[i].province,value:data[i].count})
                                }
                                cityRankData_1.push({name:'青海',value:0});
                                cityRankData_1.push({name:'甘肃',value:0});
                                // console.log(cityRankData_1);
                                option.series[0].data = cityRankData_1;
                                myChart.setOption(option);
                            }
                        }
                        myChart.setOption(option);
                     */
                }
                option.series[0].mapType = mt;
                option.title.subtext = mt + ' （点击切换）';
                myChart.setOption(option, true);
            });
            var option = {
                title: {
                    show:false,
                    text : '全国34个省市自治区',
                    subtext : 'china （点击切换）'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '点击进入该省<br/>{b}:{c}'
                },
                legend: {
                    orient: 'vertical',
                    x:'right',
                    data:['随机数据']
                },
                dataRange: {
                    show:true,
                    x: '27%',
                    y: 'bottom',
                    // text:['高','低'],           // 文本，默认为数值文本
                    // calculable : true,
                    itemGap:2,
                    splitList: [
                        // {start: 800},
                        // // {start: 700, end: 999},
                        // {start: 600, end: 800},
                        // {start: 400, end: 600},
                        // {start: 150, end: 400, label: '100 到 300'},
                        // // {start: 150, end: 300, label: '50 到 100（自定义特殊颜色）'},
                        // {end: 150},

                        {start: 100},
                        // {start: 700, end: 999},
                        {start: 50, end: 100},
                        {start: 20, end: 50},
                        {start: 10, end: 20},
                        // {start: 150, end: 300, label: '50 到 100（自定义特殊颜色）'},
                        {end: 10},
                    ],
                    textStyle:{
                        color:'white'
                    },
                    // color: ['#F76359','#F8C590','#F1EB97','#DEFEAB']
                    // color: ['#F5675D','#EDDC49','#72CB6F']
                    // color: ['#ECF752','#79E8D0','#FFB8B8','#86E65A','#24D197']
                    // color: ['#de8c68','#e87e51','#f2753f','#f29f3f','#ffe957']
                    // color:['#8a7ca8','#e098c7','#8fd3e8','#71669e','#cc70af','#7cb4cc']
                    // color: ['#ccc97a','#264861','#b3c587']
                    color: ['#cf181d','#fee9b4'],
                },
                series : [
                    {
                        name: '随机数据',
                        type: 'map',
                        roam: true,//鼠标滚轮缩放 和 拖拽
                        scaleLimit:{ // 缩放级别
                            max:1.4,
                            min:0.6
                        },
                        hoverable: true,
                        mapType: 'china',
                        selectedMode : 'single',
                        // 地图位置设置，默认只适应上下左右居中可配x，y，width，height，任意参数为空都将根据其他参数自适应
                        // 默认1920*1080分辨率
                        // mapLocation:{
                        //     x:'20%',
                        //     y:'80px',
                        //     width:'85%',
                        //     height:'85%'
                        // },
                        itemStyle: {
                            normal: {
                                borderWidth:2,
                                borderColor:'white',
                                color:'rgba(3, 3, 4, 0.41)',
                                label: {
                                    show: true,
                                    textStyle: {
                                        // color: "rgb(249, 249, 249)",
                                        color: "#8b4513",
                                        fontSize: 14,
                                        fontWeight:'700',
                                    }
                                }
                            },
                            emphasis: {// 也是选中样式
                                borderWidth:2,
                                borderColor:'#fff',
                                color: 'rgba(25, 107, 123, 0.7)',
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
                        data:[]
                        /*
                        data:[
                            {name: '北京',value: Math.round(Math.random()*1000)},
                            {name: '天津',value: Math.round(Math.random()*1000)},
                            {name: '上海',value: Math.round(Math.random()*1000)},
                            {name: '重庆',value: Math.round(Math.random()*1000)},
                            {name: '河北',value: Math.round(Math.random()*1000)},
                            {name: '河南',value: Math.round(Math.random()*1000)},
                            {name: '云南',value: Math.round(Math.random()*1000)},
                            {name: '辽宁',value: Math.round(Math.random()*1000)},
                            {name: '黑龙江',value: Math.round(Math.random()*1000)},
                            {name: '湖南',value: Math.round(Math.random()*1000)},
                            {name: '安徽',value: Math.round(Math.random()*1000)},
                            {name: '山东',value: Math.round(Math.random()*1000)},
                            {name: '新疆',value: Math.round(Math.random()*1000)},
                            {name: '江苏',value: Math.round(Math.random()*1000)},
                            {name: '浙江',value: Math.round(Math.random()*1000)},
                            {name: '江西',value: Math.round(Math.random()*1000)},
                            {name: '湖北',value: Math.round(Math.random()*1000)},
                            {name: '广西',value: Math.round(Math.random()*1000)},
                            {name: '甘肃',value: Math.round(Math.random()*1000)},
                            {name: '山西',value: Math.round(Math.random()*1000)},
                            {name: '内蒙古',value: Math.round(Math.random()*1000)},
                            {name: '陕西',value: Math.round(Math.random()*1000)},
                            {name: '吉林',value: Math.round(Math.random()*1000)},
                            {name: '福建',value: Math.round(Math.random()*1000)},
                            {name: '贵州',value: Math.round(Math.random()*1000)},
                            {name: '广东',value: Math.round(Math.random()*1000)},
                            {name: '青海',value: Math.round(Math.random()*1000)},
                            {name: '西藏',value: Math.round(Math.random()*1000)},
                            {name: '四川',value: Math.round(Math.random()*1000)},
                            {name: '宁夏',value: Math.round(Math.random()*1000)},
                            {name: '海南',value: Math.round(Math.random()*1000)},
                            {name: '台湾',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)}
                        ],
                         */
                    },
                ]
            };
            // 首次画地图之前判断分辨率
            if (screen.width <= 1440) {
                option.series[0].mapLocation = {
                    x:'center',
                    y:'100px',
                    width:'100%',
                    height:'80%'
                }
            } else {
                option.series[0].mapLocation = {
                    x:'center',
                    y:'100px',
                    width:'85%',
                    height:'85%%'
                }
            }
            //====请求全国数据====
            var cityRank_url='/homepage/cityRank/';
            public_ajax.call_request('get',cityRank_url,cityRank);
            var cityRankData = [];
            function cityRank(data){
                // console.log(data);
                for(var i=0;i<data.length;i++){
                    cityRankData.push({name:data[i].province,value:data[i].count})
                }
                // 判断没有的省市 赋值为0 以展示地图
                var all_data=['北京','天津','上海','重庆','河北','河南','云南','辽宁','黑龙江','湖南','安徽','山东','新疆','江苏','浙江','江西','湖北','广西','甘肃','山西','内蒙古','陕西','吉林','福建','贵州','广东','青海','西藏','四川','宁夏','海南','台湾','香港','澳门'];
                for(var n = 0; n < all_data.length; n++){
                    var an = all_data[n];
                    var isExist = false;
                    for(var m = 0; m < cityRankData.length; m++){
                        var cm = cityRankData[m].name;
                        if(cm == an){
                            isExist = true;
                            break;
                        }
                    }
                    if(!isExist){
                        cityRankData.push({name:an,value:0});
                    }
                }
                option.series[0].data = cityRankData;
                myChart.setOption(option);
                // 右下角热点舆情
                public_ajax.call_request('get',hotSpot_url,comment);
            }
            myChart.setOption(option);
        }
    );

// ====非法集资省份排行==== 页面初始  左下角省份数据
    var provinceRank_url = '/homepage/provinceRank/';
    public_ajax.call_request('get',provinceRank_url,provinceRank);
    // 保存数据，返回全国地图时使用
    var provinceRank_data;

    var provinceData = [],provinceData_7=[],provinceData_30=[];
    function provinceRank(data){
        // console.log(data);
        if(data){
            provinceRank_data = data;
            $('#container .bottom_left #picChart-5 #proRank').empty();
            for(var i=0;i<data.length;i++){
                provinceData.push(data[i].province);
                provinceData_7.push(data[i].count7);
                provinceData_30.push(data[i].count30);
            }
            for (var j=0;j<provinceData.length;j++){
                var str = '<p><span>'+provinceData[j]+'</span><span>'+provinceData_7[j]+'</span><span>'+provinceData_30[j]+'</span></p>';
                $('#container .bottom_left #picChart-5 #proRank').append(str)
            }
        }
    }
    /*
        $('#container .bottom_left #picChart-5 #proRank').empty();
        var provinceData = ['广东', '青海', '四川', '海南', '陕西','甘肃', '云南', '湖南', '湖北', '黑龙江','贵州', '山东', '江西', '河南', '河北','山西', '安徽', '福建', '浙江', '江苏','吉林', '辽宁', '台湾','新疆', '广西', '宁夏', '内蒙古', '西藏','北京', '天津', '上海', '重庆','香港', '澳门'];
        for (var i=0;i<provinceData.length;i++){
            var str = '<p><span>'+provinceData[i]+'</span><span>'+Math.round(Math.random()*10)+'</span><span>'+Math.round(Math.random()*100)+'</span></p>';
            $('#container .bottom_left #picChart-5 #proRank').append(str)
        }
    */

// ====疑似非法集资态势==== 左上角折线面积图
    //一个月时间 -先画一张假图
        // function get7DaysBefore(date,m){
        //     var date = date || new Date(),
        //         timestamp, newDate;
        //     if(!(date instanceof Date)){
        //         date = new Date(date);
        //     }
        //     timestamp = date.getTime();
        //     newDate = new Date(timestamp - m * 24 * 3600 * 1000);
        //     return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('-');
        // };
        // var day30=[];
        // for (var a=0;a < 30;a++){
        //     day30.push(get7DaysBefore(new Date(),a));
        // }
        // var day30Data=[];
        // for (var b=0;b< 30;b++){
        //     day30Data.push(Math.round(Math.random()*(20-5)+5));
        // }
        // var option_1 = {
        //         tooltip: {
        //             trigger: 'axis',
        //             axisPointer: {
        //                 lineStyle: {
        //                     color: '#57617B'
        //                 }
        //             }
        //         },
        //         grid: {
        //             left: '4%',
        //             right: '7%',
        //             bottom: '8%',
        //             top:'4%',
        //             containLabel: true
        //         },
        //         xAxis: [{
        //             type: 'category',
        //             boundaryGap: false,
        //             axisLine: {
        //                 lineStyle: {
        //                     color: '#57617B'
        //                 }
        //             },
        //             axisLabel: {
        //                 textStyle: {
        //                     color: '#fff',
        //                 }
        //             },
        //             data: day30.reverse(),
        //         }],
        //         yAxis: [{
        //             type: 'value',
        //             axisTick: {
        //                 show: false
        //             },
        //             axisLine: {
        //                 lineStyle: {
        //                     color: '#57c4d3'
        //                 }
        //             },
        //             axisLabel: {
        //                 show:false,
        //                 margin: 10,
        //                 textStyle: {
        //                     fontSize: 14,
        //                     color:'white',
        //                 }
        //             },
        //             splitLine: {
        //                 lineStyle: {
        //                     color: '#57617B'
        //                 }
        //             }
        //         }],
        //         series: [
        //             {
        //                 name: '',
        //                 type: 'line',
        //                 smooth: true,
        //                 symbol: 'circle',
        //                 symbolSize: 5,
        //                 showSymbol: false,
        //                 lineStyle: {
        //                     normal: {
        //                         width: 1,
        //                     }
        //                 },
        //                 areaStyle: {
        //                     normal: {
        //                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                             offset: 0,
        //                             color: 'rgba(137, 189, 27, 0.8)'
        //                         }, {
        //                             offset: 1,
        //                             color: 'rgba(137, 189, 27, 0)'
        //                         }], false),
        //                         shadowColor: 'rgba(0, 0, 0, 0.1)',
        //                         shadowBlur: 10
        //                     }
        //                 },
        //                 itemStyle: {
        //                     normal: {
        //                         color: 'rgb(137,189,27)',
        //                         borderColor: 'rgba(137,189,2,0.27)',
        //                         borderWidth: 12
        //                     }
        //                 },
        //                 // data: day30Data,
        //                 data: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,],
        //             }
        //         ]
        //     };
        // function line_1() {
        //     var myChart = echarts.init(document.getElementById('picChart-2'));
        //     myChart.setOption(option_1);
        // }
        // line_1();
    // 请求数据==重新渲染图表==
    var timeDistribute_url='/homepage/timeDistribute/';
    public_ajax.call_request('get',timeDistribute_url,line_1_new);
    var option_1 = {
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
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57c4d3'
                }
            },
            axisLabel: {
                show:false,
                margin: 10,
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
            var myChart = echarts.init(document.getElementById('picChart-2'));
            myChart.setOption(option_1);
        }
    }

// ====字符云====
    // 当天感知数
    var warnCount_url='/perceived/warnCount/';
    public_ajax.call_request('get',warnCount_url,warnCount);
    function warnCount (data){
        if(data.length == 0){
            $('#container .todayIn').text(0);
        }else {
            $('#container .todayIn').text(data[0].count);
        }
    }
    // 感知表格前15个
    var fellTable_url='/perceived/perceiveData/';
    public_ajax.call_request('get',fellTable_url,fellTable);
    var fellData_1 = [];
    function fellTable(data){
        // console.log(data.slice(0,15));
        var fellData = data.slice(0,15);
        // var fellData_1 = [];
        for(var i=0;i<fellData.length;i++){
            fellData_1.push({name:fellData[i].entity_name,value:16,itemStyle:createRandomItemStyle()})
        }
        keywords();
    }
    // console.log(fellData_1);

    function createRandomItemStyle() {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 128+127),
                    Math.round(Math.random() * 128+127),
                    Math.round(Math.random() * 128+127)
                ].join(',') + ')'
            }
        };
    }
    function keywords() {
        require(
            [
                'echarts',
                'echarts/chart/wordCloud'
            ],
            //关键词
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('picChart-4-4'));
                var option = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        show: true,
                    },
                    series: [{
                        type: 'wordCloud',
                        // size: ['100%', '90%','100%','90%','100%','20%','10%','20%'],
                        // size: ['100%', '90%','100%','90%','100%','20%','10%','20%'],
                        size: ['100%','100%'],
                        textRotation : [0, 45, 90, -45],
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 18
                        },
                        /*
                            data: [
                                {
                                    name: "我要金蛋",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "屹农金服",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "理财去",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "联投银帮",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "弘信宝",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "网惠金融",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "晶行财富",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "孺牛金服",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "摩根浦捷贷",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "知屋理财",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "沪臣地方金融",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "升隆财富",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "冰融贷",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "靠谱鸟",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "速溶360",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "存米网",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                                {
                                    name: "太保金服",
                                    value: 999,
                                    itemStyle: createRandomItemStyle()
                                },
                            ]
                         */
                        data:fellData_1
                    }]
                };
                myChart.setOption(option);
            }
        );
    }
    keywords();

// ====右下角热点舆情====
    /*

        var commentData = ['银承派','中储贷','财富观','鼎信贷','派财网','汇金益','易保利','橙旗贷'];
        var commentData_2 = [
            '如此任性的银承派 银承派薅羊毛预警-平台曝光台-网贷经典http://t.cn/R0cSO63 ​​​​​',
            '点银网世联集金种子拼图亚租所红金宝堆金网东方车贷C金所沃要投古德金融超市银承派摇财树微镇精融汇合伙人金融融裕贷  兆金所掌中财富绿化贷升值贷固金所佰亿猫前海广深发万盈金融阿凡达e贷考拉理财好好理财优投金服 ',
            ' 利典金融钱兜金融米缸金融小袋理财  中航生意贷上雨创投财来网全通贷群盈财富隆筹金融互融CLUB广群金融全民财富玺鉴',
            '飞鸟金融前海领投便利贷创富部落财火火融金桥石榴壳钱眼金融车富88产融贷华人金融汉沃财富易享贷富门理财e路同心锐盈财富利往行中业兴融前海红筹派派猪理财共赢时贷钱罐子有米贷司库金服妈妈资本华众时贷新常态金服倍多金理财农场小树时代理财 ',
            '派财网的资产端对接的是保理公司，和一般做个贷的平台并不同。 保理资产的特点是基于核心企业应收账款or仓单质押的借款，并予央行备案登记，',
            '自2016年8月24日多部委联合发布《网络借贷信息中介机构业务活动管理暂行办法》(以下简称《暂行办法》)至今已一年，一年以来，',
            '也许每个人都经历过肆意挥霍的时光吧。刚毕业那一年，整整一年，发财树小编是月光族的一员。现在回想过去，心中满是后悔。',
            '​​​​#跟钱做朋友#上周六日，上了本田健老师的财富课程，明天来给大家分享复盘，颠覆你之前的财富观，跟钱做朋友。做一个快乐的富翁。'];
        function comment_test(data,data2){
            $('#container .bottom_right #picChart-6 #comment').empty();
            for(var i=0;i<data.length;i++){
                var str = '<p><span class="comment_lef">'+data[i]+'</span><span class="comment_rig" title=\"'+data2[i]+'\">'+data2[i]+'</span>';
                $('#container .bottom_right #picChart-6 #comment').append(str)
            }
        }
        comment_test(commentData,commentData_2);
     */


    var hotSpot_url = '/homepage/hotSpot/';
    function comment(data){
        if(data){
            $('#container .bottom_right #picChart-6 #comment').empty();
            for(var i=0;i<data.length;i++){
                var str = '<p><span class="comment_lef" onclick="jumpFrame_1(\''+data[i].name+
                                '\',\''+data[i].entity_type+'\',\''+data[i].id+'\')" title="进入画像">'+data[i].name+'</span><span class="comment_rig" title=\"'+data[i].content+'\">'+$.trim(data[i].content)+'</span>';
                $('#container .bottom_right #picChart-6 #comment').append(str)
            }
        }

    }

// 点击进入公司详情页
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

//滚动

var $uList = $("#container #proRank");
var $uList2 = $("#container #comment");
var timer = null,timer2=null;
//触摸清空定时器
$uList.hover(function() {
        clearInterval(timer);
    },
    function() { //离开启动定时器
        timer = setInterval(function() {
                scrollList($uList);
            },
            1000);
    }).trigger("mouseleave"); //自动触发触摸事件
$uList2.hover(function() {
        clearInterval(timer2);
    },
    function() { //离开启动定时器
        timer2 = setInterval(function() {
                scrollList2($uList2);
            },
            1000);
    }).trigger("mouseleave"); //自动触发触摸事件
//滚动动画
function scrollList(obj) {
    //获得当前<li>的高度
    var scrollHeight = $("#proRank p:first").height();
    //滚动出一个<li>的高度
    $uList.stop().animate({
            marginTop: -scrollHeight
        },
        600,
        function() {
            //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
            $uList.css({
                marginTop: 0
            }).find("p:first").appendTo($uList);
            // $uList.css({
            //     marginTop: 0
            // }).find("p:first").remove();
            // $('.scroll-box .box').append(phonehtml.shift());
        });
};

function scrollList2(obj) {
    //获得当前<li>的高度
    var scrollHeight = $("#comment p:first").height();
    //滚动出一个<li>的高度
    $uList2.stop().animate({
            marginTop: -scrollHeight
        },
        600,
        function() {
            //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
            $uList2.css({
                marginTop: 0
            }).find("p:first").appendTo($uList2);
            // $uList.css({
            //     marginTop: 0
            // }).find("p:first").remove();
            // $('.scroll-box .box').append(phonehtml.shift());
        });
};
