var fellTable_url='';
// public_ajax.call_request('get',fellTable_url,fellTable);
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
    $('#fellTable').bootstrapTable('load', data);
    $('#fellTable').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 7,//单页记录数
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
                field: "a",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row.a==''||row.a=='null'||row.a=='unknown'||!row.a){
                        return '未知';
                    }else {
                        return '<span style="cursor:pointer;color:white;" onclick="jumpFrame_1(\''+row.c+'\')" title="进入画像">'+row.a+'</span>';
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
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '<span style="cursor:pointer;color:white;" onclick="editThis(\''+row.a+'\')" title="编辑"><i class="icon icon-edit"></i></span>'+
                        '<span style="cursor:pointer;color:white;display: inline-block;margin: 0 10px;" onclick="addThis(\''+row.a+'\')" title="添加入库"><i class="icon icon-star-empty"></i></span>'+
                        '<span style="cursor:pointer;color:white;" onclick="lookThis(\''+row.a+'\')" title="查看文本"><i class="icon icon-book"></i></span>';
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
};
fellTable(objData);
//进入画像
function jumpFrame_1(flag) {
    var html='';
    if (flag=='公司'){
        html='../templates/company.html';
    }else if(flag=='平台'){
        html='../templates/platform.html';
    }else if(flag=='项目'){
        html='../templates/project.html';
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
//查看文本
function lookThis() {

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