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


// 当天感知数
var warnCount_url='/perceived/warnCount/';
public_ajax.call_request('get',warnCount_url,warnCount);
function warnCount (data){
    if(data){
        $('#container .topTitle .com-1').text(0);
        $('#container .topTitle .com-2').text(0);
        $('#container .topTitle .com-3').text(data[0].count);
    }
}

var pageData=6;
if (screen.width <= 1440){
    $('#container .secondScreen .box').css({'max-height':'308px','min-height':'308px'})
    pageData=6;
}else {
    $('#container .secondScreen .box').css({'max-height':'510px','min-height':'510px'})
    pageData=10;
}
// ====一屏表格====
var fellTable_url='/perceived/perceiveData/';
public_ajax.call_request('get',fellTable_url,fellTable);

Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};
var objData=[
    {'a':'五行币','b':'发帖子较多','c':'项目','d':'李三','e':'大妈','f':'返还'},{'a':'优易网','b':'e租宝有联系','c':'平台','d':'嘟嘟网','e':'张三','f':'内蒙古，大妈'},
    {'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},{'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},
    {'a':'五行币','b':'发帖子较多','c':'项目','d':'李三','e':'大妈','f':'返还'},{'a':'优易网','b':'e租宝有联系','c':'平台','d':'嘟嘟网','e':'张三','f':'内蒙古，大妈'},
    {'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},{'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},
    {'a':'五行币','b':'发帖子较多','c':'项目','d':'李三','e':'大妈','f':'返还'},{'a':'优易网','b':'e租宝有联系','c':'平台','d':'嘟嘟网','e':'张三','f':'内蒙古，大妈'},
    {'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},{'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},
    {'a':'五行币','b':'发帖子较多','c':'项目','d':'李三','e':'大妈','f':'返还'},{'a':'优易网','b':'e租宝有联系','c':'平台','d':'嘟嘟网','e':'张三','f':'内蒙古，大妈'},
    {'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},{'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},
    {'a':'五行币','b':'发帖子较多','c':'项目','d':'李三','e':'大妈','f':'返还'},{'a':'优易网','b':'e租宝有联系','c':'平台','d':'嘟嘟网','e':'张三','f':'内蒙古，大妈'},
    {'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},{'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},
    {'a':'五行币','b':'发帖子较多','c':'项目','d':'李三','e':'大妈','f':'返还'},{'a':'优易网','b':'e租宝有联系','c':'平台','d':'嘟嘟网','e':'张三','f':'内蒙古，大妈'},
    {'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},{'a':'湖北嘟嘟','b':'网贷数据','c':'公司','d':'湖北嘟嘟网络技术有限公司','e':'松哥','f':'理财'},
];
var libaryList=[];
function fellTable(data) {
    if(data){
        $('#fellTable p.load').hide();
        $('#fellTable').bootstrapTable('load', data);
        $('#fellTable').bootstrapTable({
            data:data,
            search: true,//是否搜索
            pagination: true,//是否分页
            pageSize: pageData,//单页记录数
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
                    title: "入库",//标题
                    field: "select",
                    checkbox: true,
                    align: "center",//水平
                    valign: "middle"//垂直
                },
                {
                    title: "实体名称",//标题
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
                    title: "感知时间",//标题
                    field: "date",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.date==''||row.date=='null'||row.date=='unknown'||!row.date){
                            return '未知';
                        }else {
                            return '<span style="cursor:pointer;color:white;" title="感知时间">'+row.date+'</span>';
                        };
                    }
                },
                {
                    title: "推荐理由",//标题
                    field: "rec_type",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.rec_type==''||row.rec_type=='null'||row.rec_type=='unknown'||!row.rec_type){
                            return '未知';
                        }else {
                            return '<span style="cursor:pointer;color:white;" title="推荐理由">'+row.rec_type+'</span>';
                        };
                    }
                },
                {
                    title: "实体类别",//标题
                    field: "entity_type",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        var entityType;
                        if(row.entity_type==1){
                            entityType = '平台'
                        }else if(row.entity_type==2){
                            entityType = '公司'
                        }else if(row.entity_type==3){
                            entityType = '项目'
                        }
                        if (row.entity_type==''||row.entity_type=='null'||row.entity_type=='unknown'||!row.entity_type){
                            return '未知';
                        }else  {
                            return '<span style="cursor:pointer;color:white;" title="实体类型">'+entityType+'</span>';
                        };
                    }
                },
                {
                    title: "注册公司",//标题
                    field: "company",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.company==''||row.company=='null'||row.company=='unknown'||!row.company){
                            return '未知';
                        }else {
                            return '<span style="cursor:pointer;color:white;" title="注册公司">'+row.company+'</span>';
                        };
                    }
                },
                {
                    title: "相关人物",//标题
                    field: "related_person",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.related_person==''||row.related_person=='null'||row.related_person=='unknown'||!row.related_person){
                            return '未知';
                        }else {
                            return '<span style="cursor:pointer;color:white;" title="相关人物">'+row.related_person+'</span>';
                        };
                    }
                },
                {
                    title: "其他关键词",//标题
                    field: "key_words",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        if (row.key_words==''||row.key_words=='null'||row.key_words=='unknown'||!row.key_words){
                            return '未知';
                        }else {
                            return '<span style="cursor:pointer;color:white;" title="其他关键词">'+row.key_words+'</span>';
                        };
                    }
                },
                {
                    title: "操作",//标题
                    field: "",//键名
                    sortable: true,//是否可排序
                    order: "desc",//默认排序方式
                    align: "center",//水平
                    valign: "middle",//垂直
                    formatter: function (value, row, index) {
                        return '<span style="cursor:pointer;color:white;" onclick="editThis(\''+row.a+'\')" title="编辑"><i class="icon icon-edit"></i></span>'+
                            '<span style="cursor:pointer;color:white;display: inline-block;margin: 0 10px;" onclick="addThis(\''+row.a+'\')" title="添加入库"><i class="icon icon-star-empty"></i></span>'+
                            '<span style="cursor:pointer;color:white;" onclick="lookThis(\''+row.text_id+'\',\''+row.index_name+'\')" title="查看文本"><i class="icon icon-book"></i></span>';
                    }
                },
            ],
            onCheck:function (row) {
                libaryList.push(row.a);testLib()
            },
            onUncheck:function (row) {
                libaryList.removeByValue(row.a);testLib()
            },
            onCheckAll:function (row) {
                libaryList.push(row.a);testLib()
            },
            onUncheckAll:function (row) {
                libaryList.removeByValue(row.a);testLib()
            },
        });
    }
};
// fellTable(objData);

//进入画像
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
//可以入库不！？
function testLib() {
    if (libaryList.length==0){
        $('.oneLibrary').attr('disabled','disabled');
    }else {
        $('.oneLibrary').removeAttr('disabled');
    }
}
//编辑
function editThis() {
    $('#editRow').modal('show');
    $('.modal-backdrop').css({position:'static'});
}
//添加入库
function addThis() {

}
//====查看文本====
function lookThis(text_id,index_name) {
    if(text_id != '' && index_name != ''){
        var perceiveContent_url = '/perceived/perceiveContent/?text_id='+text_id+'&index_name='+index_name;
        public_ajax.call_request('get',perceiveContent_url,perceiveContent);
    }else{
        console.log('====暂无更多内容====')
    }
}
// 所有的数据
var articalList={};
// 部分数据
var articalList_part={};
function perceiveContent(data){
    if(data){
        var tag='#perceiveContent_in'.toString().substring(1)
        $('#perceiveContent_in').empty();
        $('#perceiveContent_in').bootstrapTable('load', data);
        $('#perceiveContent_in').bootstrapTable({
            data:data,
            search: false,//是否搜索
            pagination: false,//是否分页
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
                        var publisTime = getLocalTime_2(row.publish_time);
                        var contentClip, title, author, usn;
                        if(row.content.length >= 100){
                            contentClip = row.content.slice(0,100)+'  ...';
                            articalList_part[tag+'_'+index] = contentClip;
                        }else{
                            contentClip = row.content;
                            articalList_part[tag+'_'+index] = contentClip;
                        }
                        // 所有的数据
                        articalList[tag+'_'+index] = row.content;

                        if(row.title){//标题
                            title = row.title;
                        }else{
                            title = '未知';
                        }

                        if(row.author){//作者
                            author = row.author;
                        }else{
                            author = '未知';
                        }

                        if(row.usn){//用户
                            usn = row.usn;
                        }else{
                            usn = '未知';
                        }

                        var url;//原文链接
                        if(row.u){
                            url = row.u;
                        }else if(row.url){
                            url = row.url;
                        }

                        return '<div class="inforContent">'+
                            '            <div class="main">'+
                            '                <img src="/static/images/textIcon.png" class="textFlag" style="top: 8px;">'+
                            '                <p class="option clearfix">'+
                            '                    <span style="display:inline-block;width:100%;">标题：<b style="vertical-align:middle;color: #ff6d70;display:inline-block;width:50%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" title="\''+title+'\'">'+title+'</b><button onclick="getAllArtical(\''+tag+'_'+index+'\')" artical=\"'+tag+'_'+index+'\" class="original btn-primary btn-xs" style="margin-left:10px;">查看全文</button>'+'</span>'+
                            '                    <span>发布时间：<b style="color: #ff6d70;">'+publisTime+'</b></span><br />'+
                            // '                    <span style="display:inline-block;width:49%;">作者：<b style="color: #ff6d70;">'+author+'</b></span>'+

                            // '   <button onclick="getAllArtical(\''+tag+'_'+index+'\')" artical=\"'+tag+'_'+index+'\" class="original btn-primary btn-xs" style="float:right;">查看全文</button>'+
                            '                    <span>用户：<b style="color: #ff6d70;">'+usn+'</b></span>'+
                            '                </p>'+
                            '                <p class="context" style="overflow:auto;max-height:200px;text-indent:2em;">'+contentClip+'</p>'+
                            '                <a href="'+url+'" title="原网页链接" target="_blank">原网页链接</a>            '+
                            '            </div>'+
                            '        </div>';
                    }
                },
            ],
        });

        $('#perceiveContent').modal('show');
        $('.modal-backdrop').css({position:'static'});
    }
}
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

//添加入库
//文档准备就绪
$(function () {
    var L_data = [
            {'a':'','b':'','c':'','d':'','e':'','f':'',},
            {'a':'','b':'','c':'','d':'','e':'','f':''},
            {'a':'','b':'','c':'','d':'','e':'','f':''},
            {'a':'','b':'','c':'','d':'','e':'','f':''},
            {'a':'','b':'','c':'','d':'','e':'','f':''},
            {'a':'','b':'','c':'','d':'','e':'','f':''},
        ];
    $('#addClub').bootstrapTable({
        data:L_data,
        uniqueId:'a',
        // search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 6,//单页记录数
        pageList: [15,20,25],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        // searchOnEnterKey: false,//回车搜索
        // showRefresh: false,//刷新按钮
        // showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:false,
        sortable:false,
        sortStable:false,
        // sortName:'bci',
        // sortOrder:"desc",
        // uniqueid:'a',
        columns: [
            {
                title: "入库",//标题
                field: "select",
                checkbox: true,
                align: "center",//水平
                valign: "middle"//垂直
            },
            {
                title: "实体名称",//标题
                field: "a",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.a==''||row.a=='null'||row.a=='unknown'||!row.a){
                        return '';
                    }else {
                        return row.a;
                    };
                }
            },
            {
                title: "推荐理由",//标题
                field: "b",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "实体类别",//标题
                field: "c",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "注册公司",//标题
                field: "d",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "相关人物",//标题
                field: "e",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "其他关键词",//标题
                field: "f",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
            },
            {
                title: "操作",//标题
                field: "g",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.g==''||row.g=='null'||row.g=='unknown'||!row.g){
                        return '';
                    }else {
                        return row.g;
                    };
                }
            },
        ],
        onCheck:function (row) {
            libaryList.push(row.a);testLib()
        },
        onUncheck:function (row) {
            libaryList.removeByValue(row.a);testLib()
        },
        onCheckAll:function (row) {
            libaryList.push(row.a);testLib()
        },
        onUncheckAll:function (row) {
            libaryList.removeByValue(row.a);testLib()
        },
    });
    //全选/反选
    // $('#cha').click(function () {
    //     //判断checkbox是否选中
    //     if($(this).is(':checked')){
    //         $('input[type="checkbox"]').attr("checked","true");
    //     }else{
    //         $('input[type="checkbox"]').removeAttr("checked");
    //     }
    // });
    //增加一行
    $('#add').click(function () {
        var one=$('.add-1').val();
        var two=$('.add-2').val();
        var three=$('.add-3').val();
        var four=$('.add-4').val();
        var five=$('.add-5').val();
        var six=$('.add-6').val();
        var row = {'a':one,'b':two,'c':three,'d':four,'e':five,'f':six,'g':'<input type="button" value="编辑" class="btn-info btn btn-sm" onclick="editThisRow(this)">'+
                            '       <input type="button" value="确定" class="btn-info btn btn-sm" onclick="sureThisRow(this)">'+
                            '       <input type="button" value="删除" class="btn-info btn btn-sm deleteone" onclick="delThisRow(\''+one+'\')">'}
        $('#addClub').bootstrapTable('insertRow',{index: 0, row: row});//在最开始插入新行
        // $("#addClub").prepend(str);
        // $('#addClub tbody tr:last').remove();
        $('#addClub tbody tr:first td').css({padding:'12px 8px'});
        $('#container .secondScreen .newAdd input').val('');//清空输入框
        $('#addClub').bootstrapTable('removeByUniqueId','');
    });
})
// 删除行
function delThisRow(_thisOne) {
    $('#addClub').bootstrapTable('removeByUniqueId',_thisOne);
    var currentTrlen=$('#addClub tbody tr').length;
    if (currentTrlen<6){
        var row = {'a':'','b':'','c':'','d':'','e':'','f':'','g':''};
        $('#addClub').bootstrapTable('insertRow',{index: 5, row: row});
    }
}
function sureThisRow(_this) {
    var ttr=$(_this).parents("tr");
    $(ttr).find('input[type="text"]').each(function () {
        var inputVal = $(this).val();
        $(this).parents('td').html(inputVal);
    })
}
function editThisRow(_this) {
    var ttr =$(_this).parents('tr');
    ttr.find("td").each(function () {
        if($(this).children("input[type='checkbox']").length>0){
            return ;
        }
        if($(this).children("input[type='button']").length>0){
            return ;
        }
        if($(this).children("input[type='text']").length>0){
            return ;
        }
        var tdText = $(this).html();
        $(this).html("");
        var inputObj = $("<input type='text' class='editing'>");
        inputObj.appendTo($(this));
        inputObj.css("width","95%");
        inputObj.val(tdText);
    });
}