var hospitalData = createData();
var table_row = 10;
var hospital_left_table = 0;

function createData() {
    var Data;
    var injury = ['轻伤', '中度', '重伤', '危重'];
    var success = ['等待救治', '正在救治', '救治成功', '需要转移'];
    var translate = ['等待运送', '运送途中', '已经送达'];
    var translateType = ['汽车', '直升机', '轮船'];
    $.ajaxSetup({async: false});
    $.getJSON('fdwq.json', function (data) {
        Data = data;
    });
    console.log(Data.length);
    for (var i = 0; i < Data.length; i++) {
        for (var j = 0; j < Data[i]['data'].length; j++) {
            var injuryIndex = Math.ceil(Math.random() * 4);
            var successIndex = Math.ceil(Math.random() * 4);
            var translateIndex = Math.ceil(Math.random() * 3);
            var translateTypeIndex = Math.ceil(Math.random() * 3);
            var card = Math.floor(Math.random() * (99999999999 - 10000000000 + 1) + 10000000000);
            var date = formatDateTime(new Date(), "EN");
            Data[i]['data'][j]['date'] = date;
            Data[i]['data'][j]['injury'] = injury[injuryIndex - 1];
            Data[i]['data'][j]['success'] = success[successIndex - 1];
            // Data[i]['data'][j]['card'] = card;
            Data[i]['data'][j]['index'] = j + 1;
            Data[i]['data'][j]['translate'] = translate[translateIndex - 1];
            Data[i]['data'][j]['translateType'] = translateType[translateTypeIndex - 1];
            Data[i]['data'][j]['position'] = "测试数据A12测试数据A12测试数据A12测试数据A12测试数据A12测试数据A12测试数据A12测试数据A12测试数据A12测试数据A12测试数据A12";
        }
    }
    return Data
}

function getThisHospitalData(array) {
    var data = {}
    var ColumnName = ['序号', '住院时间', '姓名', '卡号', '伤情', '状态', '操作'];
    data['ColumnName'] = ColumnName;
    data['TableData'] = array;
    return data;
}

function setPanelSize() {
    var windowsHeight = $(window).height();
    $("#hospital_page").css('height', parseInt(windowsHeight - 100));
    // table_row=parseInt(($("#table_page").height()-200)/45);
    // console.log(table_row);
    $(window).resize(
        function () {
            var resizeHeight = $(window).height();
            $("#hospital_page").css('height', parseInt(resizeHeight - 100));
            // table_row=parseInt(($("#table_page").height()-200)/45);
            // console.log(table_row);
            // table_split($("#page_control"));
        }
    );
}

$(document).ready(function () {
    setPanelSize();
    console.log(hospitalData);
    var left_table = getThisHospitalData(hospitalData[0]['data'])
    hospital_table_split($("#hospital_control"), left_table);
    createSelectOfHospital();
    // table_split($("#page_control"),SoliderData);
});

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


function hospital_table_split(tag, tableData) {
    console.log(tableData);
    var data = tableData;
    var TableData = data['TableData'];
    var length = TableData.length;
    var page = Math.ceil(length / table_row);
    var txt = "";
    if (hospital_left_table > 0) {
        txt = txt + "<li><a id='Prev'>Prev</a></li>"
    }
    if (page - hospital_left_table - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='page_control_" + (hospital_left_table + 1 + i) + "'>" + (hospital_left_table + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - hospital_left_table; i++) {
            txt = txt + "<li><a id='page_control_" + (hospital_left_table + 1 + i) + "'>" + (hospital_left_table + 1 + i) + "</a></li>"
        }
    }
    if (page > hospital_left_table + 5) {
        txt = txt + "<li><a id='Next'>Next</a></li>";
    }
    tag.empty();
    tag.append(txt);
    $("#Prev").on('click', function () {
        hospital_left_table = hospital_left_table - 5;
        hospital_table_split(tag, tableData);
    });
    $("#Next").on('click', function () {
        hospital_left_table = hospital_left_table + 5;
        hospital_table_split(tag, tableData);
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
    var table_page_1 = hospital_left_table;
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
    console.log(data);
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
        txt = txt + "<td>" + TableData[k]['index'] + "</td>";
        txt = txt + "<td>" + TableData[k]['date'] + "</td>";
        txt = txt + "<td style='cursor: pointer;'>" + TableData[k]['name'] + "</td>";
        txt = txt + "<td>" + TableData[k]['card'] + "</td>";
        txt = txt + "<td>" + TableData[k]['injury'] + "</td>";
        txt = txt + "<td>" + TableData[k]['success'] + "</td>";
        txt = txt + "<td><button class='btn btn-default'>编辑</button>" +
            "<button class='btn btn-danger'>伤员转移</button></td>";
        txt = txt + "<td style='display: none'>" + TableData[k]['position'] + "</td>";
    }
    txt = txt + "</tr></tbody>";
    $("#hospital_table").empty();
    $("#hospital_table").append(txt);
    // get_wounded_detail();
    showHospitalBox();
    ChangePatientDetail();
}

function showHospitalBox() {
    // var timer = null;
    var obj = $("table tbody td");
    var box = $("#hospitalBox");
    obj.click(function (e) {
        if ($(this)[0] === $(this).parent().find('td')[2]) {
            var text = "";
            var clientX = e.clientX;
            var clientY = e.clientY;
            box.empty();
            text = text + "<div class='arrow'></div><h4 title='Popover title'>&nbsp&nbsp&nbsp姓名：" + $(this).parent().find('td')[2].innerText + "</h4>";
            var txt1 = $(this).parent().find('td')[7].innerText;
            // for (var i=0;i<((txt1.length)%20);i++){
            //     txt=txt+txt1.substring(i*20,i*20+20)+"</br>"
            // }
            text = text + "<div class='popover-content'>职位：" + txt1 + "</div>";
            box.append(text);
            box.css("left", clientX - box.width() / 2).css("top", clientY - box.height() - 10);
            // box.css("width", 3000);
            box.css("display", "block");
        }
        else {

        }
    });
    obj.on("mouseout", function () {
        box.hide();
    });
}

// $("#change_date").datetimepicker({
//     language: 'zh-CN',
//     format: "yyyy-mm-dd",
//     weekStart: 1,
//     todayBtn: 1,
//     autoclose: 1,
//     todayHighlight: 1,
//     startView: 2,
//     minView: 2,
//     forceParse: 0
// }).on('changeDate', function (ev) {
//     // return ev.date.valueOf()
//     // $(this).val(formatDateTime(ev.date.valueOf()),"EN");
//     // $("#test_input").val(formatDateTime(ev.date.valueOf()));
//     console.log(ev.date.valueOf());
// });

$("#date_input").datetimepicker({
    language: 'zh-CN',
    format: "yyyy-mm-dd",
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
}).on('changeDate', function (ev) {
    $(this).val(formatDateTime(ev.date.valueOf(), "EN"));
});

function ChangePatientDetail() {
    var obj = $("table tbody td button");
    obj.click(function () {
        $("#myModalFooter").empty();
        $("#myModalFooter").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" id="HospitalModalSave">确认</button>')
        if ($(this)[0].innerText == "编辑") {
            $("#hospitalModalTitle").empty();
            $("#hospitalModalTitle").append("修改伤员信息");
            // $("#date_title").empty();
            // $("#date_title").append('住院日期<div style="left:">&nbsp&nbsp</div>');
            $("#add_date_div").css("display", "none");
            $("#change_date_div").css("display", "block");
            $("#translater_date_div").css("display", "none");
            $("#translater_div").css("display", "none");
            $("#add_and_change_div").css("display", "block");
            var index = $(this).parent().parent().find("td")[0].innerText;
            $("#date_input").val(hospitalData[0]['data'][index - 1]['date']);
            $("#name_input").val(hospitalData[0]['data'][index - 1]['name']);
            $("#card_input").val(hospitalData[0]['data'][index - 1]['card']);
            $("#position_input").val(hospitalData[0]['data'][index - 1]['position']);
            var injury = hospitalData[0]['data'][index - 1]['injury']
            switch (injury) {
                case "轻伤":
                    injury = "1";
                    break;
                case "中度":
                    injury = "2";
                    break;
                case "重伤":
                    injury = "3";
                    break;
                case "危重":
                    injury = "4";
                    break;
                default:
                    break;
            }
            var success = hospitalData[0]['data'][index - 1]['success'];
            switch (success) {
                case "救治成功":
                    success = "1";
                    break;
                case "正在救治":
                    success = "2";
                    break;
                case "等待救治":
                    success = "3";
                    break;
                case "需要转移":
                    success = "4";
                    break;
                default:
                    break;
            }
            $("input[name=injury][value=" + injury + "]").attr('checked', true);
            $("input[name=state][value=" + success + "]").attr('checked', true);
            $("#HospitalModalSave").on('click', function () {
                var date = $("#date_input").val();
                var name = $("#name_input").val();
                var card = $("#card_input").val();
                var injury = $("input[name=injury]").val();
                var success = $("input[name=state]").val();
                var position = $("#position_input").val();
                if (name == "") {
                    $("#name_input").focus();
                    $("#name_input").attr("placeholder", "姓名不可为空");
                }
                else if (card == "") {
                    $("#card_input").focus();
                    $("#card_input").attr("placeholder", "卡号不可为空");
                }
                else {
                    $(this).attr({"data-toggle": "modal", "data-target": "#modal-message", "data-dismiss": "modal"});
                }

            });
            $("#HospitalModalSubmit").on('click', function () {
                $("#date_input").val("");
                $("#name_input").val("");
                $("#card_input").val("");
                $("#position_input").val("");
                $("input[name=injury][value='1']").prop('checked', true);
                $("input[name=state][value='1']").prop('checked', true);
            });
            // $("#date_input").val(hospitalData[0]['data'][index-1]['date']);
        }
        else if (($(this)[0].innerText == "伤员转移")) {
            var index = $(this).parent().parent().find("td")[0].innerText;
            $("#hospitalModalTitle").empty();
            $("#hospitalModalTitle").append("伤员转院");
            // $("#date_title").empty();
            // $("#date_title").append('住院日期<div style="left:">&nbsp&nbsp</div>');
            $("#add_date_div").css("display", "none");
            $("#change_date_div").css("display", "none");
            $("#translater_date_div").css("display", "block");
            $("#translater_div").css("display", "block");
            $("#add_and_change_div").css("display", "none");
            $("#date_input").val(hospitalData[0]['data'][index - 1]['date']);
            $("#name_input").val(hospitalData[0]['data'][index - 1]['name']);
            $("#card_input").val(hospitalData[0]['data'][index - 1]['card']);
            $("#position_input").val(hospitalData[0]['data'][index - 1]['position']);
            $("input[name=injury][value='1']").prop('checked', 'checked');
            $("input[name=deliveryMode][value='2']").prop('checked', 'checked');
            $("input[name=hospital][value='1']").prop('checked', 'checked');
        }
        else{
            return;
        }
        $(this).attr({"data-toggle": "modal", "data-target": "#modal-container-299830"});
    })
}

$("#hospital_patient_add").on('click', function () {
    $("#myModalFooter").empty();
    $("#myModalFooter").append('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button><button type="button" class="btn btn-primary" id="HospitalModalSave">确认</button>')
    $("#add_date_div").css("display", "block");
    $("#change_date_div").css("display", "none");
    $("#translater_date_div").css("display", "none");
    $("#translater_div").css("display", "none");
    $("#add_and_change_div").css("display", "block");
    $("#date_input").val("");
    $("#name_input").val("");
    $("#card_input").val("");
    $("#position_input").val("");
    $("input[name=state][value='1']").prop('checked', 'checked');
    $("input[name=injury][value='1']").prop('checked', 'checked');
    console.log($("input[name=injury]:checked").val());
    console.log($("input[name=state]:checked").val());
    $("#HospitalModalSave").on('click', function () {
        var date = $("#date_input").val();
        var name = $("#name_input").val();
        var card = $("#card_input").val();
        var injury = $("input[name=injury]").val();
        var success = $("input[name=state]").val();
        var position = $("#position_input").val();
        if (name == "") {
            $("#name_input").focus();
            $("#name_input").attr("placeholder", "姓名不可为空");
        }
        else if (card == "") {
            $("#card_input").focus();
            $("#card_input").attr("placeholder", "卡号不可为空");
        }
        else {
            $(this).attr({"data-toggle": "modal", "data-target": "#modal-message", "data-dismiss": "modal"});
        }

    });
});


function createSelectOfHospital() {
    $("#translater_type").empty();
    var txt = "";
    for (var i = 1; i < hospitalData.length; i++) {
        if (i == 1) {
            txt = txt + '<label class="radio" style="float: left;width: 15%;padding-left: 20px;padding-top: 0px"><input type="radio" name="hospital" value="' + i + '"><span style="font-size: 16px">' + hospitalData[i]['name'] + '</span></label>'
        }
        else {
            txt = txt + '<label class="radio" style="float: left;width: 15%;padding-left: 20px;padding-top: 15px"><input type="radio" name="hospital" value="' + i + '"><span style="font-size: 16px">' + hospitalData[i]['name'] + '</span></label>'
        }
    }
    $("#translater_type").append(txt);
}

$("#hospital_patient_seach").on('click',function () {
    var patientName=$("#patient_name").val();
    var newData={};
    if(patientName==""){
        hospitalData = createData();
        rightHospitalData=rightCreateData();
        var ColumnName = ['序号', '住院时间', '姓名', '卡号', '伤情', '状态', '操作'];
        newData['ColumnName'] = ColumnName;
        newData['TableData']=hospitalData[0]['data'];
        hospital_table_split($("#hospital_control"),newData);
        createRightHospitalTab();
        createRightHospitalPanel();
    }
    else{
        var ColumnName = ['序号', '住院时间', '姓名', '卡号', '伤情', '状态', '操作'];
        newData['ColumnName'] = ColumnName;
        var arr=[]
        for(var i=0;i<hospitalData[0]['data'].length;i++){
            if(hospitalData[0]['data'][i]['name'].indexOf(patientName)>=0){
                arr.push(hospitalData[0]['data'][i])
            }
        }
        newData['TableData']=arr;
        hospital_table_split($("#hospital_control"),newData);
    }
});