var rightHospitalData = rightCreateData();
var hospital_right_table_row = 7;
var hospital_right_table = 0;
// var base = 100000000;
var DataTime=createChartDict();
// var dateTime=[];
// var dateData=[];
function formatDateTime(inputTime, type) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    if (type == "EN") {
        return y + '-' + m + '-' + d;
    }
    else if (type == "EN") {
        return y + "年" + m + '月' + d + '日';
    }
    else if(type=="ALL"){
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
}

function rightCreateData() {
    var Data;
    var injury = ['轻伤', '中度', '重伤', '危重'];
    var success = ['等待救治', '正在救治', '救治成功', '需要转移'];
    var translate = ['等待运送', '运送途中', '已经送达'];
    var translateType = ['汽车', '直升机', '轮船'];
    $.ajaxSetup({async: false});
    $.getJSON('fdwq.json', function (data) {
        Data = data;
    });
    for (var i = 0; i < Data.length; i++) {
        for (var j = 0; j < Data[i]['data'].length; j++) {
            var injuryIndex = Math.ceil(Math.random() * 4);
            var successIndex = Math.ceil(Math.random() * 4);
            var translateIndex = Math.ceil(Math.random() * 3);
            var translateTypeIndex = Math.ceil(Math.random() * 3);
            // var card = Math.floor(Math.random() * (99999999999 - 10000000000 + 1) + 10000000000);
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

function setRightPanelSize() {
    var windowsHeight = $(window).height();
    $("#right_hospital_page").css('height', parseInt(windowsHeight - 100));
    // table_row=parseInt(($("#table_page").height()-200)/45);
    // console.log(table_row);
    $(window).resize(
        function () {
            var resizeHeight = $(window).height();
            $("#right_hospital_page").css('height', parseInt(resizeHeight - 100));
            // table_row=parseInt(($("#table_page").height()-200)/45);
            // console.log(table_row);
            // table_split($("#page_control"));
        }
    );
}

$(document).ready(function () {
    setRightPanelSize();
    createRightHospitalTab();
    createRightHospitalPanel();
});

function createRightHospitalTab() {
    $("#hospital_tab").empty();
    var txt = "";
    for (var i = 1; i < rightHospitalData.length; i++) {
        if (i == 1) {
            txt = txt + '<li class="active"><a href="#panel-' + rightHospitalData[i]['index'] + '" data-toggle="tab" style="font-size: 15px"><i class="fa fa-calendar"></i>&nbsp&nbsp' + rightHospitalData[i]['name'] + '伤员列表</a></li>'
        }
        else {
            txt = txt + '<li><a href="#panel-' + rightHospitalData[i]['index'] + '" data-toggle="tab" style="font-size: 15px"><i class="fa fa-calendar"></i>&nbsp&nbsp' + rightHospitalData[i]['name'] + '伤员列表</a></li>'
        }
    }
    $("#hospital_tab").append(txt);
}

function createRightHospitalPanel() {
    $("#hospital_panel").empty();
    for (var i = 1; i < rightHospitalData.length; i++) {
        var txt = "";
        // var data = {};
        // data["ColumnName"] = ['序号'];
        // data["TableData"] = [1];
        if (i == 1) {
            txt = txt + '<div class="tab-pane active" id="panel-' + rightHospitalData[i]['index'] + '">' +
                '<div class="container">' +
                '<div class="row clearfix">' +
                '<div class="col-md-12 column col-lg-20">' +
                '<table class="table table-hover table-bordered" id="hospital_table_' + rightHospitalData[i]['index'] + '">' +
                '</table>' +
                '</div>' +
                '<div class="col-md-12 column">' +
                '<ul class="pagination" style="float: right;cursor: pointer;"id="hospital_control_' + rightHospitalData[i]['index'] + '"' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '<div style="float: left;width: 450px;height: 330px" id="right_container_1_' + rightHospitalData[i]['index'] + '">' +
                '</div>' +
                '<div style="float: right;width: 450px;height: 300px" id="right_container_2_' + rightHospitalData[i]['index'] + '">' +
                '</div>' +
                '</div>' +
                '</div>'
        }
        else {
            txt = txt + '<div class="tab-pane" id="panel-' + rightHospitalData[i]['index'] + '">' +
                '<div class="container">' +
                '<div class="row clearfix">' +
                '<div class="col-md-12 column col-lg-20">' +
                '<table class="table table-hover table-bordered" id="hospital_table_' + rightHospitalData[i]['index'] + '">' +
                '</table>' +
                '</div>' +
                '<div class="col-md-12 column">' +
                '<ul class="pagination" style="float: right;cursor: pointer;"id="hospital_control_' + rightHospitalData[i]['index'] + '"' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '<div style="float: left;width: 450px;height: 330px;" id="right_container_1_' + rightHospitalData[i]['index'] + '">' +
                '</div>' +
                '<div style="float: left;width: 450px;height: 300px;" id="right_container_2_' + rightHospitalData[i]['index'] + '">' +
                '</div>' +
                '</div>' +
                '</div>'
        }
        var data = createRightHospitalData(i);
        $("#hospital_panel").append(txt);
        right_hospital_table_split($("#hospital_control_" + rightHospitalData[i]['index']), $("#hospital_table_" + rightHospitalData[i]['index']), data, rightHospitalData[i]['index']);
        createChartForPie(i);
        createChartForLine(i);
    }
    // console.log( $("#hospital_panel"));
}


function right_hospital_table_split(tagControl, tagTable, tableData, index) {
    var data = tableData;
    var TableData = data['TableData'];
    var length = TableData.length;
    var page = Math.ceil(length / hospital_right_table_row);
    var txt = "";
    if (hospital_right_table > 0) {
        txt = txt + "<li><a id='RightPrev_" + index + "'>Prev</a></li>"
    }
    if (page - hospital_right_table - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='right_page_control_" + index + "_" + (hospital_right_table + 1 + i) + "'>" + (hospital_right_table + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - hospital_right_table; i++) {
            txt = txt + "<li><a id='right_page_control_" + index + "_" + (hospital_right_table + 1 + i) + "'>" + (hospital_right_table + 1 + i) + "</a></li>"
        }
    }
    if (page > hospital_right_table + 5) {
        txt = txt + "<li><a id='RightNext_" + index + "'>Next</a></li>";
    }

    tagControl.empty();
    tagControl.append(txt);
    $("#RightPrev_" + index).on('click', function () {
        hospital_right_table = hospital_right_table - 5;
        right_hospital_table_split(tagControl, tagTable, tableData, index);
    });
    $("#RightNext_" + index).on('click', function () {
        hospital_right_table = hospital_right_table + 5;
        right_hospital_table_split(tagControl, tagTable, tableData, index);
    });

    for (var i = 1; i <= page; i++) {
        $("#right_page_control_" + index + "_" + i).on('click', function () {
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = data.ColumnName;
            var start = table_page_1 * hospital_right_table_row;
            var end = table_page_1 * hospital_right_table_row + hospital_right_table_row;
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
            right_draw_table(tagTable, table_new);
        })
    }
    var table_page_1 = hospital_right_table;
    var table_new = {};
    table_new['ColumnName'] = data.ColumnName;
    var start = table_page_1 * hospital_right_table_row;
    var end = table_page_1 * hospital_right_table_row + hospital_right_table_row;
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
    right_draw_table(tagTable, table_new);
}

function right_draw_table(tag, data) {
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
        txt = txt + "<td>" + TableData[k]['translateType'] + "</td>";
        txt = txt + "<td>" + TableData[k]['translate'] + "</td>";
        // txt = txt + "<td><button class='btn btn-default'>编辑</button>" +
        //     "<button class='btn btn-danger'>伤员转移</button></td>";
        txt = txt + "<td style='display: none'>" + TableData[k]['position'] + "</td>";
    }
    txt = txt + "</tr></tbody>";
    tag.empty();
    tag.append(txt);
    // get_wounded_detail();
    showHospitalBox();
}

function createRightHospitalData(index) {
    var data = {}
    data['ColumnName'] = ["序号", "转院日期", "姓名", "卡号", "伤情", "运送方式", "收治状态"]
    data['TableData'] = rightHospitalData[index]['data']
    return data;
}

function showHospitalBox() {
    // var timer = null;
    var obj = $("table tbody td");
    var box = $("#rightHospitalBox");
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
// function getDomId(index){}

// var myChart = echarts.init(dom);
function createChartForPie(index) {
    var hospitalname=rightHospitalData[index]['name'];
    var light=0;
    var moderate=0;
    var serious=0;
    var critical=0;
    for (var i=0;i<rightHospitalData[index]['data'].length;i++){
        var injury=rightHospitalData[index]['data'][i]['injury'];

        switch (injury){
            case "轻伤":
                light=light+1;
                break;
            case "中度":
                moderate=moderate+1;
                break;
            case "重伤":
                serious=serious+1;
                break;
            case "危重":
                critical=critical+1;
                break;
            default:
                break;
        }
    }
    var dict=[{value:light, name:'轻伤'}, {value:moderate, name:'中度'}, {value:serious, name:'重伤'}, {value:critical, name:'危重'}];
    var domStr = "right_container_1_"+rightHospitalData[index]['index'];
    var dom = document.getElementById(domStr);
    var myChart = echarts.init(dom);
    var app = {};
    var option = null;
    option = {
        title : {
            text: hospitalname+'患者分布情况',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['轻伤', '中度', '重伤', '危重']
        },
        series : [
            {
                name: '伤患人数',
                type: 'pie',
                radius : '60%',
                center: ['60%', '50%'],
                data:dict,
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
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function createChartForLine(index) {
    var hospitalname=rightHospitalData[index]['name'];
    var domStr = "right_container_2_"+rightHospitalData[index]['index'];
    var dom = document.getElementById(domStr);
    var myChart = echarts.init(dom);
    var option = null;
    option = {
        title: {
            text: hospitalname+'历史患者流量',
            x:'35%'
        },
        tooltip: {
            trigger: 'axis'
        },
        // toolbox: {
        //     feature: {
        //         myTool1: {
        //             show: true,
        //             title: 'stop',
        //             // icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
        //             icon: 'image://http://127.0.0.1/fdwq/image/injury.png',
        //             onclick: function (){
        //                 window.clearInterval(t1);
        //             }
        //         },
        //         myTool2: {
        //             show: true,
        //             title: 'restart',
        //             icon: 'image://http://echarts.baidu.com/images/favicon.png',
        //             onclick: function (){
        //                 window.clearInterval(t1);
        //                 var t1=setInterval(function () {
        //                     // console.log(base);
        //                     DataTime[hospitalname]["Base"]=DataTime[hospitalname]["Base"]+60000;
        //                     if(DataTime[hospitalname]["Time"].length>=20){
        //                         DataTime[hospitalname]["Time"].shift();
        //                     }
        //                     if(DataTime[hospitalname]["Data"].length>=20){
        //                         DataTime[hospitalname]["Data"].shift();
        //                     }
        //                     DataTime[hospitalname]["Time"].push(formatDateTime(DataTime[hospitalname]["Base"],"ALL"));
        //                     DataTime[hospitalname]["Data"].push(Math.floor(Math.random() * (100 - 70 + 1) + 70));
        //                     myChart.setOption({
        //                         xAxis:{
        //                             data:DataTime[hospitalname]["Time"].map(function (str) {
        //                                 return str.replace(' ', '\n')
        //                             })
        //                         },
        //                         series:[{
        //                             name:'人数',
        //                             data:DataTime[hospitalname]["Data"]
        //                         }]
        //                     });
        //                 },1000);
        //             }
        //         }
        //     }
        // },
        legend: {
            orient: 'vertical',
            left:'left',
            data:['人数']
        },
        grid: {
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            name:'日期',
            // data: ['周一','周二','周三','周四','周五','周六','周日']
            data: [].map(function (str) {
                return str.replace(' ', '\n')
            })
        },
        yAxis: {
            type: 'value',
            name:'人数（人）'
        },
        series: [
            {
                smooth: true,
                name:'人数',
                type:'line',
                areaStyle: {normal: {}},
                // itemStyle:{
                //     type: 'linear',
                //     x: 0,
                //     y: 0,
                //     x2: 0,
                //     y2: 1,
                //     colorStops: [{
                //         offset: 0, color: 'red' // 0% 处的颜色
                //     }, {
                //         offset: 1, color: 'blue' // 100% 处的颜色
                //     }],
                //     globalCoord: true // 缺省为 false
                // },
                // stack: '总量',
                // data:[120, 132, 101, 134, 90, 230, 210]
                data:[]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    // $("#right_container_2_"+rightHospitalData[index]['index']).on("mouseover",function () {
    //
    // });
    // $("#right_container_2_"+rightHospitalData[index]['index']).on("mouseout",function () {
    //
    // });
    var t1=setInterval(function () {
        // console.log(base);
        DataTime[hospitalname]["Base"]=DataTime[hospitalname]["Base"]+60000;
        if(DataTime[hospitalname]["Time"].length>=20){
            DataTime[hospitalname]["Time"].shift();
        }
        if(DataTime[hospitalname]["Data"].length>=20){
            DataTime[hospitalname]["Data"].shift();
        }
        DataTime[hospitalname]["Time"].push(formatDateTime(DataTime[hospitalname]["Base"],"ALL"));
        DataTime[hospitalname]["Data"].push(Math.floor(Math.random() * (100 - 70 + 1) + 70));
        myChart.setOption({
            xAxis:{
                data:DataTime[hospitalname]["Time"].map(function (str) {
                    return str.replace(' ', '\n')
                })
            },
            series:[{
                name:'人数',
                data:DataTime[hospitalname]["Data"]
            }]
        });
    },1000);
}

function createChartDict(){
    var a={};
    for(var i=1;i<rightHospitalData.length;i++){
        var name=rightHospitalData[i]['name'];
        a[name]={};
        a[name]['Data']=[];
        a[name]['Time']=[];
        a[name]['Base']=0;
    }
    return a;
}

