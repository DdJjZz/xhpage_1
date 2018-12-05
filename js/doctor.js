var doctor_left_table = 0;
var SoliderData=getSoliderData();
var table_row=13;
function getSoliderData() {
    var ColumnName = ['序号', '姓名', '卡号', '病情'];
    var TableData = [];
    var name = ["郑军", "乔洋", "宋霞", "崔伟", "黄芳", "汤刚", "毛艳", "邵平", "任平", "廖勇", "贾杰", "蒋伟", "黎军", "高丽", "蔡霞", "刘静", "雷芳", "魏敏", "高静", "何平", "龚刚", "白敏", "史静", "万杰", "潘磊", "龚军", "蒋洋", "汤芳", "毛超", "伊艳", "潘刚", "白秀兰", "周桂英", "许娟", "雷超", "姜静", "孟洋", "曾刚", "傅勇", "袁杰"];
    var sex =  ["男",   "男",   "女",   "男",   "女",   "男",   "女",   "男",   "男",   "男",   "男",   "男",   "男",   "女",   "女",   "女",   "女",   "女",   "女",   "男",   "男",   "女",   "男",   "男",   "男",   "男",   "女",   "女",   "男",   "女",   "男",   "女",     "女",     "女",   "男",   "女",   "男",   "男",   "男",   "男"];
    var a = {};
    var injury = ["轻伤", "中度", "重伤", "危重"];
    var blooedType = ['A', 'B', 'C', 'O', "AB"];
    for (var i = 0; i < name.length; i++) {
        var data = [];
        data.push(i + 1);
        data.push(name[i]);
        data.push(Math.floor(Math.random() * (99999999999 - 10000000000 + 1) + 10000000000));
        var injuryRandom = (Math.round(Math.random() * 3));
        var sexRandom = (Math.round(Math.random()));
        var blooedRandom = (Math.round(Math.random() * 4));
        data.push(injury[injuryRandom]);
        data.push(sex[i]);
        data.push(blooedType[blooedRandom]);
        TableData.push(data);
    }
    a['ColumnName'] = ColumnName;
    a['TableData'] = TableData;
    return a;
}



function formatDateTime(inputTime, type) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // h = h < 10 ? ('0' + h) : h;
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    // minute = minute < 10 ? ('0' + minute) : minute;
    // second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    if (type == "EN") {
        return y + '-' + m + '-' + d;
    }
    else if (type == "EN") {
        return y + "年" + m + '月' + d + '日';
    }
}

function table_split(tag,tableData) {
    console.log(SoliderData);
    var data = tableData;
    var TableData = data['TableData'];
    var length = TableData.length;
    var page = Math.ceil(length / table_row);
    var txt = "";
    if (doctor_left_table > 0) {
        txt = txt + "<li><a id='prev'>Prev</a></li>"
    }
    if (page - doctor_left_table - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='page_control_" + (doctor_left_table + 1 + i) + "'>" + (doctor_left_table + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - doctor_left_table; i++) {
            txt = txt + "<li><a id='page_control_" + (doctor_left_table + 1 + i) + "'>" + (doctor_left_table + 1 + i) + "</a></li>"
        }
    }
    if (page > doctor_left_table + 5) {
        txt = txt + "<li><a id='Next'>Next</a></li>";
    }
    tag.empty();
    tag.append(txt);
    $("#Prev").on('click', function () {
        doctor_left_table = doctor_left_table - 5;
        table_split(tag,tableData);
    });
    $("#Next").on('click', function () {
        doctor_left_table = doctor_left_table + 5;
        table_split(tag,tableData);
    });

    for (var i = 1; i <= page; i++) {
        $("#page_control_" + i).on('click', function () {
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = data.ColumnName;
            var start = table_page_1 * table_row;
            var end = table_page_1 * table_row + table_row;
            var a = [];
            if (data.TableData.length < end) {
                for (var i = start; i < data.TableData.length; i++) {
                    a.push(data.TableData[i])
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(data.TableData[i])
                }
            }
            table_new['TableData'] = a;
            draw_table(table_new);
        })
    }

    var table_page_1 = doctor_left_table;
    var table_new = {};
    table_new['ColumnName'] = data.ColumnName;
    var start = table_page_1 * table_row;
    var end = table_page_1 * table_row + table_row;
    var a = [];
    if (data.TableData.length < end) {
        for (var i = start; i < data.TableData.length; i++) {
            a.push(data.TableData[i])
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(data.TableData[i])
        }
    }
    table_new['TableData'] = a;
    draw_table(table_new);
}

function draw_table(data) {
    var TableData = data['TableData'];
    var ColumnName = data['ColumnName'];
    // console.log(data);
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var k = 0; k < TableData.length; k++) {
        if (k % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        for (var j = 0; j < 4; j++) {
            txt = txt + "<td>" + TableData[k][j] + "</td>";
        }
    }
    txt = txt + "</tr></tbody>";
    $("#solider_table").empty();
    $("#solider_table").append(txt);
    get_wounded_detail();
}

$(document).ready(function () {
    setPanelSize();
    table_split($("#page_control"),SoliderData);
});
function setPanelSize() {
    var windowsHeight=$(window).height();
    $("#table_page").css('height',parseInt(windowsHeight-100));
    // table_row=parseInt(($("#table_page").height()-200)/45);
    // console.log(table_row);
    $(window).resize(
        function () {
            var resizeHeight=$(window).height();
            $("#table_page").css('height',parseInt(resizeHeight-100));
            // table_row=parseInt(($("#table_page").height()-200)/45);
            // console.log(table_row);
            // table_split($("#page_control"));
        }
    );
}
$("#solider_search").on('click',function () {
    var solider_name=$("#solider_name").val();
    var newData={};
    if(solider_name==""){
        SoliderData=getSoliderData();
        table_split($("#page_control"),SoliderData);
        show_wounded_detail(SoliderData['TableData'][0]);
    }
    else{
        newData['ColumnName'] = SoliderData['ColumnName'];
        var arr=[];
        for(var i=0;i<SoliderData['TableData'].length;i++){
            if(SoliderData['TableData'][i][1].indexOf(solider_name)>=0){
                arr.push(SoliderData['TableData'][i]);
            }
        }
        newData['TableData']=arr;
        table_split($("#page_control"),newData);
    }
});


function get_wounded_detail(){
    $("table tbody td").on('click',function () {
        var index=$(this).parent().find("td")[0].innerText;
        show_wounded_detail(SoliderData['TableData'][index-1])
    });
}