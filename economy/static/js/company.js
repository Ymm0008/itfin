
/* 时间戳转换时间  放在publicNav 里去了
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    //时间戳转时间【年月日】
    function getLocalTime_1(nS) {
        // return new Date(parseInt(nS) * 1000).toLocaleDateString().replace(/年|月/g, "-");
        // return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        return new Date(parseInt(nS) * 1000).Format("yyyy-MM-dd");//年月日
        // return new Date(parseInt(nS) * 1000).Format("yyyy-MM-dd HH:mm:ss");//年月日 时分秒
    }
    // 【年月日时分秒】
    function getLocalTime_2(nS) {
        return new Date(parseInt(nS) * 1000).Format("yyyy-MM-dd HH:mm:ss");//年月日 时分秒
    }
 */

var entity_name ,firm_name;

// 备 编辑基本信息用
var operation_mode_1 = 0;
var date_1,entity_id_1,gs_date_1,entity_type_1;

// 备 恢复/停止监测用
var monitor_status_1;

//====基本信息====
    var basicInfor_url='/index/entityType/?id='+pid+'&type='+type;
    // var basicInfor_url='/index/entityType/?id=5120&type=1';//测试股东信息
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

        var t1='',t2='',t3='否',t4='0',t5='0',t6='否';
        var operationMode = '互联网金融';
        var legalPerson = '未知';
        var capital = '未知';
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
        $('.type-2').text(t1);//实体类型
        $('.type-3').text(t2);//成立时间
        $('.type-4').text(legalPerson);//法人代表
        $('.type-5').text(capital);//注册资本
        $('.isPlatformName').text(item.company || '');//工商注册公司名称：

        //风险评价
        if (item.illegal_type==1){//是否疑似非法集资
            t3='是';
        }else{
            //隐藏下面的内容和右边表格
            $('.val-2').parents('p').css('display','none');
            $('.val-3').parents('p').css('display','none');
            $('.val-4').parents('p').css('display','none');
            $('.val-5').parents('p').css('display','none');
            $('.riskRight').css('display','none');
        }
        $('.val-1').text(t3);

        if (item.risk_level!=''&&item.risk_level!='null'&&item.risk_level!='unknown'&&!!item.risk_level&&item.risk_level!='None'){
            t4=item.risk_level;
        }
        $('.val-2').text(item.risk_level);//风险等级
        // $('.val-2').text(t4);//风险等级

        // if (item.impact_level!=''&&item.impact_level!='null'&&item.impact_level!='unknown'&&!!item.impact_level){
        //     t5=item.impact_level;
        // }
        $('.val-3').text(item.impact_level);//影响等级
        // $('.val-3').text(t5);//影响等级

        $('.val-4').text(item.operation_mode||''); //集资模式
        // $('.val-4').text(operationMode); //集资模式

        if (item.penalty_status==1){t6='是';} //是否已判罚
        $('.val-5').text(t6);

        // 股东信息
        var holderDetail = [];
        if(item.holder_detail != ''){
            holderDetail =  item.holder_detail.split('&');
            var str = '';
            for(var i=0;i<holderDetail.length;i++){
                holderDetail[i] = holderDetail[i].replace(':',"---");
                str += '<p style="text-align:left;margin:0 0 20px 0;"><span style="">股东名称：'+holderDetail[i]+'万元</span></p>';
            }
            $('.mid-3').html(str);
        }else {
            $('.mid-3').text('暂无记录');
        }

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

        // 子公司分公司情况
        var table_1_url = '/index/sub_firm/?firm_name='+firm_name;
        // var table_1_url = '/index/sub_firm/?firm_name=广西联银投资有限公司';//测试子公司分公司情况

        // // 股东情况
        // var table_2_url = '/index/holder/?firm_name='+firm_name;
        // // var table_2_url = '/index/holder/?firm_name=广西联银投资有限公司';//测试股东情况
        // public_ajax.call_request('get',table_2_url,table_2);

        // 经营异常
        var comment_url = '/index/abnormal_info/?firm_name='+firm_name;
        // var comment_url = '/index/abnormal_info/?firm_name=信和财富投资管理（北京）有限公司绍兴分公司';//测试
        var uncontact_abnormal_num = item.uncontact_abnormal_num;//无法联系类异常数
        var fake_abnormal_num = item.fake_abnormal_num;//弄虚作假类异常数
        var daily_report_abnormal_num = item.daily_report_abnormal_num;//未公布年报类异常数
        var other_abnormal_num = item.other_abnormal_num;//其他类异常数

        // 信息变更
        var inforChange_url='/index/change_info/?firm_name='+firm_name;
        var people_change_num = item.people_change_num;//人员类变更数量
        var operation_change_num = item.operation_change_num;//经营类变更数量
        var capital_change_num = item.capital_change_num;//资本类变更数量
        var other_change_num = item.other_change_num;//其他类变更数量

        // 诉讼记录
        var lawsuit_url = '/index/law_info/?firm_name='+firm_name;
        // var lawsuit_url = '/index/law_info/?firm_name=中信银行股份有限公司';//测试
        var admin_suit_num = item.admin_suit_num;//行政类诉讼数量
        var civil_suit_num = item.civil_suit_num;//民事诉讼数量
        var crime_suit_num = item.crime_suit_num;//刑事诉讼数量
        var other_suit_num = item.other_suit_num;//其他诉讼数量

        // 子公司分公司情况
        public_ajax.call_request('get',table_1_url,table_1);
        // 经营异常
        public_ajax.call_request('get',comment_url,commentTable);
        $('.business_1').text(uncontact_abnormal_num);
        $('.business_2').text(fake_abnormal_num);
        $('.business_3').text(daily_report_abnormal_num);
        $('.business_4').text(other_abnormal_num);
        // 信息变更
        public_ajax.call_request('get',inforChange_url,inforChange);
        $('.inforChange_1').text(people_change_num);
        $('.inforChange_2').text(operation_change_num);
        $('.inforChange_3').text(capital_change_num);
        $('.inforChange_4').text(other_change_num);
        // 诉讼记录
        public_ajax.call_request('get',lawsuit_url,lawsuit);
        $('.lawsuit_1').text(admin_suit_num);
        $('.lawsuit_2').text(civil_suit_num);
        $('.lawsuit_3').text(crime_suit_num);
        $('.lawsuit_4').text(other_suit_num);

        // 广告内容
        var billing_url = '/index/ad_content/?entity_name='+entity_name;

        // 评论信息【舆情信息】
        var commentinforContent_url = '/index/comment_content/?entity_name='+entity_name;

        // console.log(billing_url);
        public_ajax.call_request('get',billing_url,billing_1);

        public_ajax.call_request('get',commentinforContent_url,commentinforContent_1);
    }
    // // 编辑功能
    // $('#card-edit').on('click',function(){
    //     if($('#card .infor .inforLine b').attr('contenteditable') == true){
    //         $('#card .infor .inforLine b').attr('contenteditable','false');
    //         console.log('已退出编辑模式=======');
    //     }else if($('#card .infor .inforLine b').attr('contenteditable') == false){
    //         $('#card .infor .inforLine b').attr('contenteditable','true');
    //         console.log("=========编辑模式中");
    //     }

    // })

// 编辑基本信息
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

//====股东数量====
    var master_url='/index/gongshang/?id='+pid;
    public_ajax.call_request('get',master_url,master);
    function master(data) {
        // console.log(data)
        var item=data[0];
        $('.up-1').text(item.up1_level_num);
        $('.up-2').text(item.up2_level_num);
        $('.up-3').text(item.up3_level_num);
        $('.down-1').text(item.down1_level_num);
        $('.down-2').text(item.down2_level_num);
        $('.down-3').text(item.down3_level_num);
        // $('.mid-1').text();
        // $('.mid-2').text();
        // $('.mid-3').text();
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

// ====右顶侧小表格====

    var risk_url='/index/riskCommentTable/?entity_id='+pid+'&type='+type;
    public_ajax.call_request('get',risk_url,riskValue);
    var objData=[{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
        {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},
        {'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''},{'a':'2017-09-11','b':'指标','c':''}]
    function riskValue(data) {
        // console.log(data);
        for(var item in data){
            // console.log(item);
            if(data[item].length == 0){
                $('#riskValueTable p.load').text('暂无记录');
            }else{
                $('#riskValueTable').bootstrapTable('load', data[item]);
                $('#riskValueTable').bootstrapTable({
                    data:data[item],
                    search: false,//是否搜索
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
                            field: "date",//键名
                            sortable: true,//是否可排序
                            order: "desc",//默认排序方式
                            align: "center",//水平
                            valign: "middle",//垂直
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
                            field: "illegal_type",//键名
                            sortable: true,//是否可排序
                            order: "desc",//默认排序方式
                            align: "center",//水平
                            valign: "middle",//垂直
                            formatter: function (value, row, index) {
                                if (row.illegal_type==''||row.illegal_type=='null'||row.illegal_type=='unknown'||!row.illegal_type){
                                    return '未知';
                                }else if(row.illegal_type==1) {
                                    return '模型预警';
                                }else if(row.illegal_type==2) {
                                    return '舆情预警';
                                }else if(row.illegal_type==3) {
                                    return '指标预警';
                                };
                            }
                        },
                        {
                            title: "查看详情",//标题
                            field: "",//键名
                            sortable: true,//是否可排序
                            order: "desc",//默认排序方式
                            align: "center",//水平
                            valign: "middle",//垂直
                            formatter: function (value, row, index) {
                                return '<span style="cursor:pointer;" onclick="jumpFrame_2(\''+entity_name+'\',\''+type+'\',\''+pid+'\',\''+row.illegal_type+'\')" title="查看详情"><i class="icon icon-edit"></i></span>';
                            }
                        },
                    ],
                });
                $('#riskValueTable p.load').hide();

                $('.mon-2').text(item)
            }
        }

    };
    // riskValue(objData)
    // =========监测详情===========
    function jumpFrame_2(name,type,id,illegal_type) {
        // window.localStorage.setItem('monitorFlag',monitorFlag);
        // window.location.href='../templates/monitorDetails.html';
        var html = '';
        name=escape(name);
        if(illegal_type == 1){//模型预警 ----> 进入画像页
            html='/index/company/?name='+name+'&flag='+type+'&pid='+id;
        }else if(illegal_type == 2){//舆情预警 ----> 进入监测详情页
            html='/index/monitor/?name='+name+'&flag='+type+'&pid='+id;
        }else {
            html='/index/company/?name='+name+'&flag='+type+'&pid='+id;
        }

        // window.location.href='/index/monitor/';
        window.location.href=html;
    }

// ====股东情况(在子公司分公司内部)====

// ====子公司分公司====
    // var table_1_url = '/index/sub_firm/?firm_name='+firm_name;
    // var table_1_url = '/index/sub_firm/?firm_name=广西联银投资有限公司';
    // public_ajax.call_request('get',table_1_url,table_1);

    var _myChart1,_myChart2;
    function table_1(data){
        // console.log(data);

        var myChart = echarts.init(document.getElementById('table-1'));
        myChart.showLoading(
            {type:'default',
            opts: {
              text: '正在加载中...',
              color: '#c23531',
              textColor: '#000',
              maskColor: 'rgba(255, 255, 255, 0.8)',
              zlevel: 0
            }
            });//自定义设置未作用

        var option = {
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b}"
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
            /*
                series : [
                    {
                        name:'',
                        type:'tree',
                        orient: 'horizontal',  // vertical horizontal
                        rootLocation: {x: 100, y: '60%'}, // 根节点位置  {x: 'center',y: 10}
                        nodePadding: 20,
                        left: '50%',
                        symbol: 'circle',
                        symbolSize: 40,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    // position: 'inside',
                                    textStyle: {
                                        color: '#333',
                                        fontSize: 15,
                                        fontWeight:  'bolder'
                                    },
                                    position:'bottom',//位置
                                    // offset:[50,0], //偏移
                                    // 字符换行
                                    formatter:function(val){
                                        if(val.name.length>8){
                                            return val.name.substring(0,8)+'\n'+val.name.substring(8)
                                        }else {
                                            return val.name
                                        }
                                    }
                                },
                                lineStyle: {
                                    color: '#000',
                                    width: 1,
                                    type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                                },
                                borderColor:'#337ab7'
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: data[0],
                                // value: 6,
                                symbolSize: [20, 20],
                                // symbol: 'image://http://www.iconpng.com/png/ecommerce-business/iphone.png',
                                // symbol: 'circle',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                        }
                                    }
                                },
                                // children: [
                                //         {
                                //             name: 'B',
                                //             value: 4,
                                //             // symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
                                //             symbol: 'B',
                                //             itemStyle: {
                                //                 normal: {
                                //                     label: {
                                //                         show: false
                                //                     }
                                //                 }
                                //             },
                                //             symbolSize: [60, 60],
                                //             children: [
                                //                 {
                                //                     name: 'C',
                                //                     symbol: 'circle',
                                //                     symbolSize: 20,
                                //                     value: 4,
                                //                     itemStyle: {
                                //                         normal: {
                                //                             color: '#fa6900',
                                //                             label: {
                                //                                 show: true,
                                //                                 position: 'right'
                                //                             },
                                //
                                //                         },
                                //                         emphasis: {
                                //                             label: {
                                //                                 show: false
                                //                             },
                                //                             borderWidth: 0
                                //                         }
                                //                     }
                                //                 },
                                //                 {
                                //                     name: 'D',
                                //                     value: 4,
                                //                     symbol: 'circle',
                                //                     symbolSize: 20,
                                //                     itemStyle: {
                                //                         normal: {
                                //                             label: {
                                //                                 show: true,
                                //                                 position: 'right',
                                //                                 formatter: "{b}"
                                //                             },
                                //                             color: '#fa6900',
                                //                             borderWidth: 2,
                                //                             borderColor: '#cc66ff'
                                //
                                //                         },
                                //                         emphasis: {
                                //                             borderWidth: 0
                                //                         }
                                //                     }
                                //                 },
                                //                 {
                                //                     name: 'E',
                                //                     value: 2,
                                //                     symbol: 'circle',
                                //                     symbolSize: 20,
                                //                     itemStyle: {
                                //                         normal: {
                                //                             label: {
                                //                                 position: 'right'
                                //                             },
                                //                             color: '#fa6900',
                                //                             brushType: 'stroke',
                                //                             borderWidth: 1,
                                //                             borderColor: '#999966',
                                //                         },
                                //                         emphasis: {
                                //                             borderWidth: 0
                                //                         }
                                //                     }
                                //                 }
                                //             ]
                                //         },
                                //         {
                                //             name: 'F',
                                //             // symbol: 'image://http://www.viastreaming.com/images/apple_logo2.png',
                                //             symbol: 'F',
                                //             symbolSize: [60, 60],
                                //             itemStyle: {
                                //                 normal: {
                                //                     label: {
                                //                         show: false
                                //                     }
                                //
                                //                 }
                                //             },
                                //             value: 4
                                //         },
                                //         {
                                //             name: 'G',
                                //             // symbol: 'image://http://market.huawei.com/hwgg/logo_cn/download/logo.jpg',
                                //             symbol: 'G',
                                //             symbolSize: [60, 60],
                                //             itemStyle: {
                                //                 normal: {
                                //                     label: {
                                //                         show: false
                                //                     }
                                //
                                //                 }
                                //             },
                                //             value: 2
                                //         },
                                //
                                // ]
                            }
                        ]
                    }
                ]
             */
            series : [
                {
                    name:'',
                    type:'tree',
                    // left:'30%', //tree组件离容器左侧的距离。
                    layout:'orthogonal',//树图的布局，有 正交 orthogonal 和 径向 radial 两种。
                    orient: 'horizontal',  // 树图中 正交布局 的方向 ，对应有 水平 和 垂直 两个方向，取值分别为 horizontal , vertical.
                    expandAndCollapse:true, //子树折叠和展开的交互，
                    initialTreeDepth:2, //树图初始展开的层级（深度）。

                    // rootLocation: {x: 'center', y: '60%'}, // 根节点位置  {x: 'center',y: 10}
                    // nodePadding: 20,

                    symbol: 'emptyCircle',
                    symbolSize: 40,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#333',
                                    fontSize: 12,
                                    fontWeight:  'bolder'//加粗
                                },
                                position:'left', //文字的位置
                                formatter:function(params){
                                    // console.log(params.data.name);
                                    // return params.data.name.slice(0,10)+'\n'+params.data.name.slice(10)
                                    if(params.data.name.length >5){
                                        return params.data.name.slice(0,5)+'...'
                                    }else {
                                        return params.data.name
                                    }

                                }
                            },
                            lineStyle: {
                                color: '#000',
                                width: 1,
                                type: 'dashed', // 'curve'|'broken'|'solid'|'dotted'|'dashed' 线的样式
                                curveness:1  //线的曲度
                            },
                            borderColor:'#337ab7'
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    leaves: {//展开后的文字位置
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },
                    data: [
                        {
                            name: data[0],
                            // value: 6,
                            symbolSize: [20, 20],
                            // symbol: 'image://http://www.iconpng.com/png/ecommerce-business/iphone.png',
                            // symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            children: [
                                {
                                    name:'股东情况',
                                    // value:6,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true
                                            },
                                            // position:['60%','50%']
                                        }
                                    },
                                    symbolSize: [20, 20],
                                    children:[],
                                },
                                {
                                    // name:'分公司情况',
                                    name:'对外投资情况',
                                    // value:6,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true
                                            },
                                            // position:['60%','50%']
                                        }
                                    },
                                    symbolSize: [20, 20],
                                    children:[],
                                },
                                /*
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
                                            {
                                                name: 'D',
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
                                                name: 'E',
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
                                */

                            ]
                        }
                    ]
                }
            ]
        };

        option.series[0].data[0].name = data[0];//根公司
        // console.log(data[0]);
        var reg = new RegExp('"',"g");
        var comp = data[0].replace(reg, "");
        // 一级子公司
        if(data[1][comp].length != 0){
            for(var i=0;i<data[1][comp].length;i++){
                // option.series[0].data[0].children[i].name = data[1][comp][i];
                option.series[0].data[0].children[1].children.push(
                    {
                        name:data[1][comp][i],
                        // value:6,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                },
                                // position:['60%','50%']
                            }
                        },
                        symbolSize: [20, 20],
                        children:[],
                    },
                )
                // 二级子公司
                if(data[2][data[1][comp][i]].length != 0){
                    for(var j=0;j<data[2][data[1][comp][i]].length;j++){
                        // option.series[0].data[0].children[i].children[j].name = data[2][data[1][comp][i]][0];
                        option.series[0].data[0].children[1].children[i].children.push(
                            {
                                name:data[2][data[1][comp][i]][j],
                                // value:6,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        }
                                    }
                                },
                                symbolSize: [20, 20],
                                children:[],
                            },
                        )
                        // 三级子公司（暂无数据）
                        if(data[3][data[2][data[1][comp][i]][j]].length != 0){
                            for(var n=0;n<datdata[3][data[2][data[1][comp][i]][j]].length;n++){
                                // option.series[0].data[0].children[1].children[i].children[j].children[n].name = data[3][data[2][data[1][comp][i]][j]][0];
                                option.series[0].data[0].children[1].children[i].children[j].children.push(
                                    {
                                        name:data[3][data[2][data[1][comp][i]][j]][n],
                                        // value:6,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: false
                                                }
                                            }
                                        },
                                        symbolSize: [20, 20],
                                        children:[],
                                    },
                                )
                            }
                        }
                    }
                }

            }
            // option.series[0].data[0].children[0].name = data[1].comp[0];
        };
        // 一级子公司
        // option.series[0].data[0].children[0].name = data[1].广西联银投资有限公司[0];
        // option.series[0].data[0].children[1].name = data[1].广西联银投资有限公司[1];
        // option.series[0].data[0].children[2].name = data[1].广西联银投资有限公司[2];

        // 二级子公司
        // option.series[0].data[0].children[0].children[0].name = data[2].广西金狐计算机科技有限公司[0]

        // ===========股东情况==========
        var table_2_url = '/index/holder/?firm_name='+firm_name;
        public_ajax.call_request('get',table_2_url,table_2);

        function table_2(data){
            // console.log(data);
            var reg = new RegExp('"',"g");
            var comp2 = data[0].replace(reg, "");
            // 一级股东
            if(data[1][comp2].length != 0){
                if(data[1][comp2].length >6){
                    $('#table-1').css('height','900px');
                    var myChart = echarts.init(document.getElementById('table-1'));
                    myChart.showLoading(
                        {
                            type:'default',
                            opts: {
                              text: '正在加载中...',
                              color: '#c23531',
                              textColor: '#000',
                              maskColor: 'rgba(255, 255, 255, 0.8)',
                              zlevel: 0
                            }
                        }
                    );//自定义设置未作用
                }else{
                    var myChart = echarts.init(document.getElementById('table-1'));
                    myChart.showLoading();
                }

                for(var i=0;i<data[1][comp2].length;i++){
                    // option.series[0].data[0].children[i].name = data[1][comp][i];
                    option.series[0].data[0].children[0].children.push(
                        {
                            name:data[1][comp2][i],
                            // value:6,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    },
                                    // position:['60%','50%']
                                }
                            },
                            symbolSize: [20, 20],
                            children:[],
                        },
                    )
                    // 二级股东
                    if(data[2][data[1][comp2][i]].length != 0){
                        for(var j=0;j<data[2][data[1][comp][i]].length;j++){
                            // option.series[0].data[0].children[i].children[j].name = data[2][data[1][comp][i]][0];
                            option.series[0].data[0].children[0].children[i].children.push(
                                {
                                    name:data[2][data[1][comp2][i]][j],
                                    // value:6,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    symbolSize: [20, 20],
                                    children:[],
                                },
                            )
                            // // 三级股东（暂无数据）
                            // console.log(data[3][data[2][data[1][comp2][i]][j]]);
                            if(data[3][data[2][data[1][comp2][i]][j]].length != 0){
                                for(var n=0;n<data[3][data[2][data[1][comp2][i]][j]].length;n++){
                                    // console.log(data[3][data[2][data[1][comp2][i]][j]][n]);
                                    // option.series[0].data[0].children[0].children[i].children[j].children[n].name = data[3][data[1][comp][i][j]][0];
                                    option.series[0].data[0].children[0].children[i].children[j].children.push(
                                        {
                                            name:data[3][data[2][data[1][comp2][i]][j]][n],
                                            // value:6,
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: false
                                                    }
                                                }
                                            },
                                            symbolSize: [20, 20],
                                            children:[],
                                        },
                                    )
                                }
                            }
                        }
                    }
                }
                // option.series[0].data[0].children[0].name = data[1].comp[0];
            }else {
                var myChart = echarts.init(document.getElementById('table-1'));
                myChart.showLoading(
                    {
                        type:'default',
                        opts: {
                          text: '正在加载中...',
                          color: '#c23531',
                          textColor: '#000',
                          maskColor: 'rgba(255, 255, 255, 0.8)',
                          zlevel: 0
                        }
                    }
                );//自定义设置未作用
            };
            myChart.hideLoading();
            myChart.setOption(option);
            _myChart1 = myChart;
        }
        // myChart.setOption(option);
        // _myChart1 = myChart;
    }
    // table_1();


//====宣传行为====
    var publicityTable_url='/index/ad/?id='+pid;
    public_ajax.call_request('get',publicityTable_url,publicityTable);
    /*
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
     */

    var data_billing_diagram ;//广告趋势图数据
    function publicityTable(data){
        data_billing_diagram = data;
        // console.log(data);
        var item = data[0];
        var inf1_data = [],inf2_data = [],inf3_data = [];
        inf1_data.push(item.inf1_wechat,item.inf1_zhihu,item.inf1_bbs,item.inf1_webo,item.inf1_forum);
        inf2_data.push(item.inf2_wechat,item.inf2_zhihu,item.inf2_bbs,item.inf2_webo,item.inf2_forum);
        inf3_data.push(item.inf3_wechat,item.inf3_zhihu,item.inf3_bbs,item.inf3_webo,item.inf3_forum);
        var myChart = echarts.init(document.getElementById('publicityTable'));
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
                data:['强煽动性广告','一般煽动性广告','无煽动性广告']
                // .wechat; .zhihu; .bbs; .webo; .forum;
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    // data : ['周一','周二','周三','周四','周五','周六','周日']
                    data:['微信','知乎','论坛','微博','贴吧']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                // {
                //     name:'直接访问',
                //     type:'bar',
                //     data:[320, 332, 301, 334, 390, 330, 320]
                // },
                {
                    name:'强煽动性广告',
                    type:'bar',
                    barWidth : 55,
                    stack: '广告',
                    // data:[120, 132, 101, 134, 90,]
                    data:inf3_data
                },
                {
                    name:'一般煽动性广告',
                    type:'bar',
                    barWidth : 55,
                    stack: '广告',
                    // data:[220, 182, 191, 234, 290,]
                    data:inf2_data
                },
                {
                    name:'无煽动性广告',
                    type:'bar',
                    barWidth : 55,
                    stack: '广告',
                    // data:[150, 232, 201, 154, 190,]
                    data:inf1_data
                },
                /*
                    {
                        name:'搜索引擎',
                        type:'bar',
                        data:[862, 1018, 964, 1026, 1679, 1600, 1570],
                        markLine : {
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            },
                            data : [
                                [{type : 'min'}, {type : 'max'}]
                            ]
                        }
                    },
                    {
                        name:'百度',
                        type:'bar',
                        barWidth : 5,
                        stack: '搜索引擎',
                        data:[620, 732, 701, 734, 1090, 1130, 1120]
                    },
                    {
                        name:'谷歌',
                        type:'bar',
                        stack: '搜索引擎',
                        data:[120, 132, 101, 134, 290, 230, 220]
                    },
                    {
                        name:'必应',
                        type:'bar',
                        stack: '搜索引擎',
                        data:[60, 72, 71, 74, 190, 130, 110]
                    },
                    {
                        name:'其他',
                        type:'bar',
                        stack: '搜索引擎',
                        data:[62, 82, 91, 84, 109, 110, 120]
                    }
                */
            ]
        };
        myChart.setOption(option);

        billing_diagram(data_billing_diagram);
    }

//====经营异常
    var commentData = [
        {'a':'积极','b':'百度贴吧','c':'2017-12','d':'放款快，审核简单，赶快注册！'},
    ]
    // var comment_url = '/index/abnormal_info/?firm_name='+firm_name;
    // 暂用假的
    // var comment_url = '/index/abnormal_info/?firm_name=信和财富投资管理（北京）有限公司绍兴分公司';
    // setTimeout(function(){
    //     public_ajax.call_request('get',comment_url,commentTable);
    // },1000)
    function commentTable(data) {
        // console.log(data)
        if(data.length == 0){
            $('.business_title').hide();
            $('#business p.load').text('暂无记录');
        }else {
            $('#business').bootstrapTable('load', data);
            $('#business').bootstrapTable({
                data:data,
                search: false,//是否搜索
                pagination: true,//是否分页
                pageSize: 5,//单页记录数
                // pageList: [15,20,25],//分页步进值
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
                            var time = getLocalTime_1(row.in_date);
                            return '<div class="inforContent" style="text-align: left;">' +
                                '            <div class="main">' +
                                '                <span style="margin-right:20px;">异常类型：<b style="color: #ff6d70">'+row.abnormal_type+'</b></span>'+
                                '                <img src="/static/images/textIcon.png" class="textFlag">' +
                                '                <span>时间：<b style="color: #ff6d70">'+time+'</b></span>'+
                                '                <p class="context">' +row.in_reason+
                                '                </p>' +
                                '            </div>' +
                                '        </div>';
                        }
                    },
                ],
            });
            $('#business p.load').hide();
        }
    };
    // commentTable(commentData)

//====信息变更====
    var indsa=[{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},
        {'a':'2017-11-11','b':'名称','c':'1111','d':'2222'},{'a':'2017-11-11','b':'名称','c':'1111','d':'2222'}]
    // var inforChange_url='/index/change_info/?firm_name='+firm_name;
    // var inforChange_url='/index/change_info/?firm_name=广西联银投资有限公司';
    // public_ajax.call_request('get',inforChange_url,inforChange);
    function inforChange(data) {
        // console.log(data)
        if(data.length == 0){
            $('.inforChange_title').hide();
            $('#inforChange p.load').text('暂无记录');
        }else {
            $('#inforChange').bootstrapTable('load', data);
            $('#inforChange').bootstrapTable({
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
                                change_time = getLocalTime_1(row.change_time);
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
        }

    };
    // inforChange(indsa);

//====诉讼记录====
    var kajsdj=[{'a':'2017-11-11','b':'testtesttesttesttesttesttesttest'},]
    // var lawsuit_url = '/index/law_info/?firm_name='+firm_name;
    // var lawsuit_url = '/index/law_info/?firm_name=中信银行股份有限公司';
    // public_ajax.call_request('get',lawsuit_url,lawsuit);
    function lawsuit(data) {
        if(data.length == 0){
            $('.lawsuit_title').hide();
            $('#lawsuit p.load').text('暂无记录');
        }else {
            $('#lawsuit').bootstrapTable('load', data);
            $('#lawsuit').bootstrapTable({
                data:data,
                search: false,//是否搜索
                pagination: true,//是否分页
                pageSize: 5,//单页记录数
                // pageList: [3,8,14,20],//分页步进值
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
                                lawsuit_date = getLocalTime_1(row.date);
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
        }

    };
    // lawsuit(kajsdj);

//====收益率及其分布====
    var serds = [
        {'a':'积极','b':'百度贴吧','c':'2017-12','d':'放款快，审核简单，赶快注册！'},
    ]
    var incomeTable_url='/index/returnRate/?id='+pid+'&type='+type;
    public_ajax.call_request('get',incomeTable_url,incomeTable);
    function incomeTable(data) {
        // console.log(data)
        $('#incomeTable').bootstrapTable('load', data);
        $('#incomeTable').bootstrapTable({
            data:data,
            search: false,//是否搜索
            pagination: true,//是否分页
            pageSize: 5,//单页记录数
            // pageList: [15,20,25],//分页步进值
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
                        var returnRate = row.return_rate*100;
                        if(returnRate == 0){
                            returnRate = '未知';
                        }else {
                            returnRate+= '%'
                        }

                        var avg_return;//披露收益率
                        if(row.avg_return == '-' || row.avg_return == 'null'){
                            avg_return = '未知';
                        }else{
                            avg_return = row.avg_return;
                        }
                        return '<div class="inforContent">'+
                            '                <div class="main">'+
                            '                    <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                            '                    <p class="option">'+
                            '                        <span>宣传收益率：<b id="show_return_rate" style="color: #ff6d70;font-size:16px">'+returnRate+'</b></span>'+
                            '                        <button class="original btn-primary btn-xs" onclick="incomeTable_more(\''+row.index_name+'\',\''+row.text_id+'\')">查看全文</button>'+
                            '                    </p>'+
                            '                    <p class="context">'+row.related_text+'</p>'+
                            '                </div>'+
                            '            </div>'+
                            '<div class="inforContent_2">'+
                            '       <div class="main">'+
                            '           <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                            '           <p class="ooption">'+
                            '                <span>披露收益率：<b style="color: #ff6d70;font-size:16px;">'+avg_return+'</b></span>'+
                            '           </p>'+
                            '       </div>'+
                            '</div>';
                    }
                },
            ],
        });
        $('#incomeTable p.load').hide();
    };
    // incomeTable(serds);

//====收益率点击查看全文====
    function incomeTable_more(index_name,text_id){
        if(index_name != '' && text_id != ''){
            var incomeTable_more_url = '/index/returnRate_content/?index_name='+index_name+'&text_id='+text_id;
            // console.log(incomeTable_more_url);
            public_ajax.call_request('get',incomeTable_more_url,incomeTablemore);
        }else{
            console.log('====暂无更多内容====')
        }

    }
    function incomeTablemore(data){
        // console.log(data)
        if(data){
            var channel = data.site_name || data.index_name;//渠道
            var Release_time = getLocalTime_2(data.publish_time);//时间戳转时间
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
            if(data.usn){
                $('#moreInfo #usn').text(data.usn);//作者
            }else{
                $('#moreInfo #usn').text('未知');//作者
            }
            $('#moreInfo #words').text(data.content);//内容
            // 原网页链接
            var url;
            if(data.url){
                url = data.url;
            }else{
                url = data.u;
            }
            $('#moreInfo #url a').text('原网页链接').attr({'href':url,'target':'_blank','title':'原网页链接'});//原文链接

            $('#moreInfo').modal('show');
        }
    }

// 收益率 编辑
    $('#income-edit').on('click',function(){
        $('#editIncome').modal('show');
        // 宣传收益率
        var show_return_rate = $('#show_return_rate').text();
        show_return_rate = show_return_rate.substr(0, show_return_rate.length - 1);
        $('#editIncome .user-1 input').val(show_return_rate);

        $('#sure_1').on('click',function(){
            var return_rate_val = $('#editIncome .user-1 input').val();

            var EditReturnRate_url='/index/EditReturnRate/?entity_id='+pid+'&return_rate='+return_rate_val;
            public_ajax.call_request('post',EditReturnRate_url,EditReturnRate);
        })

    })
    function EditReturnRate(data){
        if(data.status == 'ok'){
            // alert('修改成功');
            $('#editIncome').modal('hide');
            $('#saveSuccess').modal('show');
            // 重新渲染页面
            var incomeTable_url='/index/returnRate/?id='+pid+'&type='+type;
            public_ajax.call_request('get',incomeTable_url,incomeTable);

        }
    }

//====收益/保本/担保承诺====
    var guarantee_url='/index/guarantee/?id='+pid;
    // var guarantee_url='/index/guarantee/?id=4291';
    public_ajax.call_request('get',guarantee_url,guarantee);
    function guarantee(data) {
        // console.log(data)
        if(data.length == 0){
            $('#guarantee p.load').text('暂无记录');
        }else {
            var item = data[0];
            if(item.related_text == ''){
                $('#guarantee p.load').text('暂无记录');
            }else {
                $('#guarantee').bootstrapTable('load', data);
                $('#guarantee').bootstrapTable({
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
                                    '                        <span>承诺类型：<b style="color: #ff6d70;font-size:16px;">'+promiseType+'</b></span>'+
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
            }
        }
    };

// ====收益担保点击查看全文====
    function guarantee_more (index_name,text_id){
        var guarantee_more_url = '/index/promise_content/?index_name='+index_name+'&text_id='+text_id;
        // console.log(guarantee_more_url);
        public_ajax.call_request('get',guarantee_more_url,guaranteeMore);
    }
    function guaranteeMore(data){
        // console.log(data)
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
                $('#moreInfo #author').text('暂无');//作者
            }
            if(data.usn){
                $('#moreInfo #usn').text(data.author);//用户
            }else {
                $('#moreInfo #usn').text('暂无');//用户
            }
            $('#moreInfo #words').text(data.content);//内容
            // 原网页链接
            var url;
            if(row.url){
                url = row.url;
            }else{
                url = row.u;
            }
            $('#moreInfo #url a').text('原网页链接').attr({'href':url,'target':'_blank','title':'原网页链接'});//原文链接

            $('#moreInfo').modal('show');
        }
    }

//====广告内容====
    /*
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
    */

    // 所有的数据
    var articalList={};
    // 部分数据
    var articalList_part={};
    /*
    function billing(data,el,channel) {
        if(data.length == 0){
            $(el).hide();
        }else {
            var tag=el.toString().substring(1)
            $(el).bootstrapTable('load', data);
            $(el).bootstrapTable({
                data:data,
                search: false,//是否搜索
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
                            // 煽动性
                            var inflammatory;
                            if(row.ad123 == 1){
                                inflammatory = '无';
                            }else if(row.ad123 ==2){
                                inflammatory = '一般';
                            }else if(row.ad123 ==3){
                                inflammatory = '强';
                            }
                            return '<div class="inforContent">'+
                                '            <div class="main">'+
                                '                <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                                '                <p class="option">'+
                                '                    <span>煽动性：<b style="color: #ff6d70">'+inflammatory+'</b></span>'+
                                '                    <span>广告渠道：<b style="color: #ff6d70">'+channel+'</b></span>'+
                                '                    <span>发布时间：<b style="color: #ff6d70">'+publisTime+'</b></span>'+
                                '   <button onclick="getAllArtical(\''+tag+'_'+index+'\')" artical=\"'+tag+'_'+index+'\" class="original btn-primary btn-xs">查看全文</button>'+
                                '                </p>'+
                                '                <p class="context">'+contentClip+'</p>'+
                                '                <a href="'+row.url+'" title="原网页链接" target="_blank">原网页链接</a>            '+
                                '            </div>'+
                                '        </div>';
                        }
                    },
                ],
            });
            $(el+' p.load').hide();
        }
    };
    */
    function billing_1(data) {
        if(data.length == 0){
            $('#billing p.load').text('暂无记录');
        }else {
            var tag='#billing'.toString().substring(1)
            $('#billing').bootstrapTable('load', data);
            $('#billing').bootstrapTable({
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
                            var publisTime = getLocalTime_1(row.publish_time);
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
                            // 煽动性
                            var inflammatory;
                            if(row.ad123 == 1){
                                inflammatory = '无';
                            }else if(row.ad123 ==2){
                                inflammatory = '一般';
                            }else if(row.ad123 ==3){
                                inflammatory = '强';
                            }else{
                                inflammatory = '未知';
                            }
                            // 渠道
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

                            return '<div class="inforContent">'+
                                '            <div class="main">'+
                                '                <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                                '                <p class="option">'+
                                '                    <span>煽动性：<b style="color: #ff6d70;font-size:16px;">'+inflammatory+'</b></span>'+
                                '                    <span>广告渠道：<b style="color: #ff6d70;font-size:16px;">'+source+'</b></span>'+
                                '                    <span>发布时间：<b style="color: #ff6d70;font-size:16px;">'+publisTime+'</b></span>'+
                                '   <button onclick="getAllArtical(\''+tag+'_'+index+'\')" artical=\"'+tag+'_'+index+'\" class="original btn-primary btn-xs">查看全文</button>'+
                                '                </p>'+
                                '                <p class="context">'+contentClip+'</p>'+
                                '                <a href="'+url+'" title="原网页链接" target="_blank">原网页链接</a>            '+
                                '            </div>'+
                                '        </div>';
                        }
                    },
                ],
            });
            $('#billing p.load').hide();
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

    // 加一个折线图  ===广告趋势图===
    function billing_diagram (data){
        // console.log(data)
        if(data){
            var ad1_data = [],inf1_data = [],inf2_data = [],inf3_data = [];
            // 时间
            var date = [];
            for(var i=0;i < data.length;i++){
                inf1_data.push(data[i].inf1_wechat+data[i].inf1_zhihu+data[i].inf1_bbs+data[i].inf1_webo+data[i].inf1_forum);
                inf2_data.push(data[i].inf2_wechat+data[i].inf2_zhihu+data[i].inf2_bbs+data[i].inf2_webo+data[i].inf2_forum);
                inf3_data.push(data[i].inf3_wechat+data[i].inf3_zhihu+data[i].inf3_bbs+data[i].inf3_webo+data[i].inf3_forum);

                date.push(data[i].date);
            }
            var myChart = echarts.init(document.getElementById('billing_diagram'));
            var option = {
                title: {
                    text: ''
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    // data:['无煽动性广告数','一般煽动性广告数','强煽动性广告数','广告数']
                    data:['无煽动性广告数','一般煽动性广告数','强煽动性广告数']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        // data:['微信','知乎','论坛','微博','贴吧']
                        data:date
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [

                    {
                        name:'无煽动性广告数',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:inf1_data
                    },
                    {
                        name:'一般煽动性广告数',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:inf2_data
                    },
                    {
                        name:'强煽动性广告数',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:inf3_data
                    },
                    // {
                    //     name:'广告数',
                    //     type:'line',
                    //     stack: '总量',
                    //     areaStyle: {normal: {}},
                    //     data:ad1_data
                    // },
                ]
            };
            myChart.setOption(option);
        }
    }

//====舆情分析====
    //评论信息
    /*
    setTimeout(function(){
        var commentinforContent_url = '/index/comment_content/?entity_name='+entity_name;
        public_ajax.call_request('get',commentinforContent_url,commentinforContent_1);
    },1000);
     */

    /*
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
    */

    // 所有的数据
    var commentarticalList={};
    // 部分数据
    var commentarticalList_part={};
    /*
    function commentinforContent(data,el,channel) {
        // console.log(data)
        if(data.length == 0){
            $(el).hide();
        }else {
            var com =el.toString().substring(1);
            $(el).bootstrapTable('load', data);
            $(el).bootstrapTable({
                data:data,
                search: false,//是否搜索
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
                            // 评论倾向
                            var sent;
                            if(row.sent == 0){
                                sent = '消极';
                            }else if(row.sent == 1){
                                sent = '中性';
                            }else if(row.sent == 2){
                                sent = '积极';
                            }
                            return '<div class="inforContent" id="commentinforContent">'+
                                '                <div class="main">'+
                                '                    <img src="/static/images/textIcon.png" class="textFlag" style="top:8px;">'+
                                '                    <p class="option">'+
                                '                        <span>评论倾向：<b style="color: #ff6d70">'+sent+'</b></span>'+
                                '                        <span>评论来源：<b style="color: #ff6d70">'+channel+'</b></span>'+
                                '                        <span>发布时间：<b style="color: #ff6d70">'+publishTime+'</b></span>'+
                                '                        <button class="originalbtn btn-primary btn-xs" onclick="getAllcommtentartical(\''+com+'_'+index+'\')" artical=\"'+com+'_'+index+'\">查看全文</button>'+
                                '                    </p>'+
                                '                    <p class="context">'+contentClip+'</p>'+
                                '                <a href="'+row.url+'" title="原网页链接" target="_blank">原网页链接</a>            '+
                                '                </div>'+
                                '            </div>';
                        }
                    },
                ],
            });
            $(el+' p.load').hide();
        }
    };
    */
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
                    smooth:true,
                    data:day30Data_0,
                    itemStyle:{normal:{areaStyle:{type:'default'}}},
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'},
                    //         {type: 'min', name: '最小值'}
                    //     ]
                    // },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'严重负面评论',
                    type:'line',
                    smooth:true,
                    data:day30Data_1,
                    itemStyle:{normal:{areaStyle:{type:'default'}}},
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'},
                    //         {type: 'min', name: '最小值'}
                    //     ]
                    // },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
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
    // line_2();


// 关联产品 编辑
    var show_product;
    $('#EditRelatedPlat').on('click',function(){
        $('#EditRelatedPlat-box').modal('show');
        // 关联产品 原值
        show_product = $('#product').text();
        // if(show_product == '无'){
        //     show_product = '';
        // }
        // $('#EditRelatedPlat-box .user-1 input').val('');
        // $('#EditRelatedPlat-box .user-1 input').attr('value',show_product);
        $('#EditRelatedPlat-box .user-1 input').val(show_product);
        $('#EditRelatedPlat-box .user-1 span').text('关联产品:');

        $('#sure_2').on('click',function(){
            var EditRelatedPlat_val = $('#EditRelatedPlat-box .user-1 input').val();

            var EditRelatedPlat_url='/index/EditRelatedPlat/?entity_id='+pid+'&entity_type='+type+'&date='+date_1+'&related_plat='+EditRelatedPlat_val;
            public_ajax.call_request('post',EditRelatedPlat_url,EditRelatedPlat);
        })

    })
    function EditRelatedPlat(data){
        if(data.status == 'ok'){
            // alert('修改成功');
            $('#EditRelatedPlat-box .user-1 input').val('');
            $('#EditRelatedPlat-box').modal('hide');
            $('#saveSuccess').modal('show');

            // 重新渲染页面
            // var incomeTable_url='/index/returnRate/?id='+pid+'&type='+type;
            // public_ajax.call_request('get',incomeTable_url,incomeTable);
        }
    }

// 关联企业 编辑
    var show_company;
    $('#EditRelatedCompany').click(function(){
        $('#EditRelatedCompany-box').modal('show');
        show_company = $('#company').text();
        // if(show_company == '无'){
        //     show_company = '';
        // }
        // console.log(show_company);
        // $('#EditRelatedCompany-box .user-1 input').val('');
        // $('#EditRelatedCompany-box .user-1 input').attr('value',show_company);//这样只能设置一次。。。。。
        $('#EditRelatedCompany-box .user-1 input').val(show_company);
        // $('#EditRelatedCompany-box .user-1 span').text('关联企业:');


    })

    $('#sure_3').on('click',function(){
        var EditRelatedCompany_val = $('#EditRelatedCompany-box .user-1 input').val();

        var EditRelatedCompany_url='/index/EditRelatedCompany/?entity_id='+pid+'&entity_type='+type+'&date='+date_1+'&related_company='+EditRelatedCompany_val;
        public_ajax.call_request('post',EditRelatedCompany_url,EditRelatedCompany);
    })

    function EditRelatedCompany(data){
        if(data.status == 'ok'){
            // alert('修改成功');
            $('#EditRelatedCompany-box .user-1 input').val('');
            $('#EditRelatedCompany-box').modal('hide');
            $('#saveSuccess').modal('show');
            // 重新渲染页面
            // var incomeTable_url='/index/returnRate/?id='+pid+'&type='+type;
            // public_ajax.call_request('get',incomeTable_url,incomeTable);
        }
    }


/*
    // 使用jsFiddle生成Word
    var result = document.getElementById('LL');
    result.addEventListener('click', function(){

        //img类推
        var imgs = [],canvasArr = [_myChart1, _myChart2];
        // need dataurl
        for(var i = 0; i < canvasArr.length; i++){
            var canvasIndex = canvasArr[i].getRenderedCanvas({
                pixelRatio: 1,
                backgroundColor: '#FFFFFF'
            });
            imgs.push(canvasIndex.toDataURL('image/jpeg'));
        }

        //虚拟创建各种需要的DOM内容，不加入文档流，但使用, style需要在节点中添加
        var $div = $('<div id="myDoc"></div>');
        var $homeTitle = $('<p class="homeTitle" style="font-size: 30px; font-weight: 600; text-align: center; ">' + '画像' +'</p>');
        // var $homeInfo = $(
        //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo1' + '</p>' +
        //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo2' + '</p>' +
        //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo3' + '</p>' +
        //     '<p class="homeInfo" style="font-size: 23px; margin: 50px 0 0 30px; font-weight: 600;">' + 'exportConfig.homePage.programInfo4' + '</p>'
        // );
        var $homeFooter = $('<p class="homeFooter" style="text-align: center; font-size: 13px; page-break-after: always; margin-top: 40px;">' + 'exportConfig.homePage.footer' + '</p>');
        var $firstPointTitle = $('<p class="pointTitle" style="page-break-before: always; font-weight: 600; font-size: 25px; margin-bottom: 25px;">' + 'exportConfig.theFirst.title'+ '</p>');
        var $firstPointFirPara = $('<p class="pointParagraph">' + '&nbsp;&nbsp;&nbsp;' + 'requestData.LevelSummary' + 'exportConfig.theFirst.paragraph1p7' + '</p>');
        var $firstPointFirImg = $('<div style="text-align: center;">' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;" />'+ '\n' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;"/>' + '<p style="font-size: 20px; font-weight: 600;">图 1 危害等级分布柱状图、饼图</p>' + '</div>');
        var $firstPointSecPara = $('<p class="pointParagraph">' + '&nbsp;&nbsp;&nbsp;' + 'requestData.TypeSummary' + 'exportConfig.theFirst.paragraph2p11'+ '</p>');
        var $firstPointSecImg = $('<div style="text-align: center;">' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;"/>' + '\n' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;"/>' + '<p style="font-size: 20px; font-weight: 600;">图 1 问题类型分布柱状图、饼图</p>' + '</div>');
        var $secondPointTitle = $('<p class="pointTitle" style="font-size: 25px; font-weight: 600; margin-bottom: 25px;">' + 'exportConfig.theSecond.title' + '</p>' + '<p class="tableTitle" style="text-align: center;">' + 'exportConfig.theSecond.tableTitle' +'</p>');

         var $resultTable = structureTable();
        // 构造表格，structure table ,这里的data.length 需改为项目的表格内容，如requestData.ProblemList.length
        function structureTable() {
            var $table = $('<table style="border-collapse: collapse; text-align: left; word-wrap: break-word; word-break: break-all;"></table>');
            var $thead = $('<thead style="text-align: center;"><tr><td style="width: 10%; border: 1px solid black;">时间</td><td style="width: 10%; border: 1px solid black;">预警内容</td><td style="width: 10%; border: 1px solid black;">查看详情</td><td style="border: 1px solid black; width: auto;">建议方案</td></tr></thead>');
            var tbody = '<tbody>';
            for(var i = 0; i < objData.length; i++){
                tbody +='<tr>' + '<td style="border: 1px solid black;">' + objData[i]['a'] + '</td>' + '<td style="border: 1px solid black;">' + objData[i]['b'] + '</td>' + '<td style="border: 1px solid black;">' + objData[i]['c'] + '</td>' + '<td style="border: 1px solid black;">' + objData[i][3] + '</td>' + '</tr>';
            }
            tbody += '</tbody>';
            var $tbody = $(tbody);
            $table.append($thead, $tbody);
            return $table;
        }
        // $div.append($homeTitle, $homeInfo, $homeFooter, $firstPointTitle, $firstPointFirPara, $firstPointFirImg, $firstPointSecPara, $firstPointSecImg, $secondPointTitle, $resultTable);
        // $div.append($homeTitle, $homeFooter, $firstPointTitle, $firstPointFirPara, $firstPointFirImg, $firstPointSecPara, $firstPointSecImg, $secondPointTitle,$resultTable);
        $('#container').append($resultTable);

        //主体函数，即将内容加入到word中
        $.fn.wordExport = function(fileName) {
            fileName = typeof fileName !== 'undefined' ? fileName : "导出";
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n+ '_styles_' + \n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();

            // Remove hidden elements from the output
            markup.each(function() {
                var self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });

            // Embed all images using Data URLs
            // img如果再文档流中，上面可以不用处理，使用这儿的内容先去创建canvas 然后toDataURL获取uri再进行使用，这里注释是因为上面我们已经将内容转为uri，故不需要做无用功
            var images = Array();
            var img = markup.find('img');
            for (var i = 0; i < imgs.length; i++) {
                // Calculate dimensions of output image
                //var w = Math.min(img[i].width, options.maxWidth);
                //var h = img[i].height * (w / img[i].width);
                    // Create canvas for converting image to data URL
                //var canvas = document.createElement("CANVAS");
                //canvas.width = w;
                //canvas.height = h;
                    // Draw image to canvas
                //var context = canvas.getContext('2d');
                //context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = imgs[i];
                $(img[i]).attr("src", imgs[i]);
                //img[i].width = w;
                //img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
            }
            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].location + "\n";
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                mhtmlBottom += images[i].data + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            //styles如果再文档流中可用，否则通过这种方式，无法查找到元素，无法添加样式，故上面将样式内联在dom结构中
            var styles = 'table {border-collapse:collapse; border: 1px solid #000;} td { border: 1px solid #000;} h1 { font-size: 30px; color: red; }'
            // Aggregate parts of the file together
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        }
        // $div.wordExport('docName');
        $("#container").wordExport('docName');
    },false);
*/