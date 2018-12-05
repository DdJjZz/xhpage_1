/**
 * Created by Huang Yuanjie on 2017/10/23.
 */
var table_page = 0;
var test_table_page = 0;
var device_table_page_1 = 0;
var device_table_page_2 = 0;
var device_table_page_3 = 0;
var data_table_page_1 = 0;
var data_table_page_2 = 0;
var data_table_page_3 = 0;
var data_table_page_4 = 0;
var system_table_page_1 = 0;
var system_table_page_2 = 0;
var system_table_page_3 = 0;

function formatDateTime(inputTime) {
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
    return y + '-' + m + '-' + d;
}


$(document).ready(
    function () {
        showBox1();
        clearWindow();
        $("#ManageView").css('display', 'block');
        $('.fa-calendar').parent().parent().find('input').datetimepicker({
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
            // return ev.date.valueOf()
            $(this).val(formatDateTime(ev.date.valueOf()));
            // $("#test_input").val(formatDateTime(ev.date.valueOf()));
            // console.log(ev.date.valueOf());
        });
    }
);


function showBox1() {
    // var timer = null;
    var obj = $("table tbody td");
    var box = $("#showbox");
    obj.click(function (e) {
        if ($(this)[0] === $(this).parent().find('td')[$(this).parent().find('td').length - 1]) {
        }
        else {
            var text = "";
            var clientX = e.clientX;
            var clientY = e.clientY;
            box.empty();
            text = text + "<div class='arrow'></div><h4 title='Popover title'>&nbsp&nbsp&nbsp" + $(this).parent().find('td')[1].innerText + "</h4>";
            for (var i = 2; i < 5; i++) {
                if (!($(this).parent().find('td')[i])) {
                    var txt = "";
                }
                else {
                    if (i >= $(this).parent().find('td').length - 1) {
                        txt = "";
                    }
                    else {
                        var txt = $(this).parent().find('td')[i].innerText;
                    }

                }
                text = text + "<div class='popover-content'>" + txt + "</div>";

            }
            box.append(text);
            box.css("left", clientX - box.width() / 2).css("top", clientY - box.height() - 10);
            box.css("display", "block");
        }
    });
    obj.on("mouseout", function () {
        box.hide();
    });
}

function createData() {
    var ColumnName = ['序号', '姓名', '卡号', '角色', '生效时间', '操作'];
    var name = ['魏子博', '郭占泽', '崔洪铭', '杨明坤', '麦淞玮', '张奎荣', '肖烔锴', '冯泽华', '刘培志'];
    var type = ['医生', '护士', '指挥', 'IT维护'];
    // var date=new Date().toISOString();
    // console.log(date);
    var TableData = [];
    var length = Math.ceil(Math.random() * 200);
    for (var i = 0; i < length; i++) {
        var a = [];
        a.push(i + 1);
        a.push(name[Math.floor(Math.random() * 8)]);
        a.push(Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));
        a.push(type[Math.floor(Math.random() * 3)]);
        a.push(new Date().toISOString());
        TableData.push(a);
    }
    var table = {};
    table['ColumnName'] = ColumnName;
    table['TableData'] = TableData;
    return table;
}

function table_split(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (table_page > 0) {
        txt = txt + "<li><a id='Prev'>Prev</a></li>";
    }
    if (page - table_page - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='page_control_" + (table_page + 1 + i) + "'>" + (table_page + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - table_page; i++) {
            txt = txt + "<li><a id='page_control_" + (table_page + 1 + i) + "'>" + (table_page + 1 + i) + "</a></li>"
        }
    }
    if (page > table_page + 5) {
        txt = txt + "<li><a id='Next'>Next</a></li>";
    }
    $("#page_control").empty();
    $("#page_control").append(txt);
    $("#Prev").on('click', function () {
        table_page = table_page - 5;
        table_split(table);
    });
    $("#Next").on('click', function () {
        table_page = table_page + 5;
        table_split(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#page_control_" + i).on('click', function () {
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i])
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i])
                }
            }
            table_new['TableData'] = a;
            console.log(table_new);
            text1_draw_table(table_new, 2);
        })
    }
    var table_page_1 = table_page;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i])
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i])
        }
    }
    table_new['TableData'] = a;
    text1_draw_table(table_new, 2);
}

function text1_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        for (var j = 0; j < TableData[i].length; j++) {
            txt = txt + "<td>" + TableData[i][j] + "</td>";
        }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#test1").empty();
    $("#test1").append(txt);
    showBox1();
    get_change_data();
}

function text_table_split(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (test_table_page > 0) {
        txt = txt + "<li><a id='test_Prev'>Prev</a></li>";
    }
    if (page - test_table_page - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='test_page_control_" + (test_table_page + 1 + i) + "'>" + (test_table_page + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - test_table_page; i++) {
            txt = txt + "<li><a id='test_page_control_" + (test_table_page + 1 + i) + "'>" + (test_table_page + 1 + i) + "</a></li>"
        }
    }
    if (page > test_table_page + 5) {
        txt = txt + "<li><a id='test_Next'>Next</a></li>";
    }
    $("#test_page_control").empty();
    $("#test_page_control").append(txt);
    $("#test_Prev").on('click', function () {
        test_table_page = test_table_page - 5;
        text_table_split(table);
    });
    $("#test_Next").on('click', function () {
        test_table_page = test_table_page + 5;
        text_table_split(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#test_page_control_" + i).on('click', function () {
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            console.log(table_new);
            text_draw_table(table_new, 2);
        })
    }
    var table_page_1 = test_table_page;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i])
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i])
        }
    }
    table_new['TableData'] = a;
    text_draw_table(table_new, 2);
}

function text_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='test_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='test_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='test_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#test").empty();
    $("#test").append(txt);
    showBox1();
    get_change_data();
}

function create_data() {
    var ColumnName = ['序号', '测试列1', '测试列2', '测试列3', '测试列4', '操作'];
    var TableData = [];
    var length = Math.ceil(Math.random() * 200);
    for (var i = 0; i < length; i++) {
        var a = [];
        a.push(i + 1);
        a.push('测试数据' + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));
        a.push('测试数据' + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));
        a.push('测试数据' + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));
        a.push(new Date().toISOString());
        TableData.push(a);
    }
    var table = {};
    table['ColumnName'] = ColumnName;
    table['TableData'] = TableData;
    return table;
}

function device_table_split_1(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (device_table_page_1 > 0) {
        txt = txt + "<li><a id='device_Prev'>Prev</a></li>";
    }
    if (page - device_table_page_1 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='device_page_controller_1_" + (device_table_page_1 + 1 + i) + "'>" + (device_table_page_1 + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - device_table_page_1; i++) {
            txt = txt + "<li><a id='device_page_control_1_" + (device_table_page_1 + 1 + i) + "'>" + (device_table_page_1 + 1 + i) + "</a></li>"
        }
    }
    if (page > device_table_page_1 + 5) {
        txt = txt + "<li><a id='device_Next'>Next</a></li>";
    }
    $("#device_page_control_1").empty();
    $("#device_page_control_1").append(txt);
    $("#device_Prev").on('click', function () {
        device_table_page_1 = device_table_page_1 - 5;
        device_table_split_1(table);
    });
    $("#device_Next").on('click', function () {
        device_table_page_1 = device_table_page_1 + 5;
        device_table_split_1(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#device_page_controller_1_" + i).on('click', function () {
            console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i])
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i])
                }
            }
            table_new['TableData'] = a;
            device_table_draw_table(table_new, 2);
        })
    }
    var table_page_1 = device_table_page_1;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    device_table_draw_table(table_new, 2);
}

function device_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='device_1_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='test_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='device_1_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#device_table_1").empty();
    $("#device_table_1").append(txt);
    showBox1();
    get_change_data();
}

function clearWindow() {
    $("#ManageView").css('display', 'none');
    $("#DeviceManagementView").css('display', 'none');
    $("#DataManagementView").css('display', 'none');
    $("#SystemMaintenanceView").css('display', 'none');
}

function setTitle(left, right) {
    $("#left_title").empty();
    $("#left_title").append(left);
    $("#right_title").empty();
    $("#right_title").append(right);
}

$("#ManagePageView").on('click', function () {
    clearWindow();
    $("#ManageView").css('display', 'block');
    setTitle("管理界面", "救护所管理/管理界面");
    table_page = 0;
    test_table_page = 0;
    var table = createData();
    table_split(table);
    var table_test = createData();
    text_table_split(table_test);
});

$("#DeviceManagementPageView").on('click', function () {
    clearWindow();
    $("#DeviceManagementView").css('display', 'block');
    setTitle("设备管理", "设备管理/设备管理界面");
    device_table_page_1 = 0;
    device_table_page_2 = 0;
    device_table_page_3 = 0;
    var device_table_1 = create_data();
    device_table_split_1(device_table_1);
    var device_table_2 = create_data();
    device_table_split_2(device_table_2);
    var device_table_3 = create_data();
    device_table_split_3(device_table_3);

});
$("#DataManagementPageView").on('click', function () {
    clearWindow();
    $("#DataManagementView").css('display', 'block');
    setTitle("数据管理", "数据管理/数据管理界面");
    data_table_page_1 = 0;
    data_table_page_2 = 0;
    data_table_page_3 = 0;
    data_table_page_4 = 0;
    var data_table_1 = create_data();
    data_table_split_1(data_table_1);
    var data_table_2 = create_data();
    data_table_split_2(data_table_2);
    var data_table_3 = create_data();
    data_table_split_3(data_table_3);
    var data_table_4 = create_data();
    data_table_split_4(data_table_4);
});
$("#SystemMaintenancePageView").on('click', function () {
    clearWindow();
    $("#SystemMaintenanceView").css('display', 'block');
    setTitle("系统维护", "系统维护/系统维护界面");
    system_table_page_1 = 0;
    system_table_page_2 = 0;
    system_table_page_3 = 0;
    var system_table_1 = create_data();
    system_table_split_1(system_table_1);
    var system_table_2 = create_data();
    system_table_split_2(system_table_2);
    var system_table_3 = create_data();
    system_table_split_3(system_table_3);
});

function device_table_split_2(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (device_table_page_2 > 0) {
        txt = txt + "<li><a id='device_Prev_2'>Prev</a></li>";
    }
    if (page - device_table_page_2 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='device_page_controller_2_" + (device_table_page_2 + 1 + i) + "'>" + (device_table_page_2 + 1 + i) + "</a></li>";
        }
    }
    else {
        for (var i = 0; i < page - device_table_page_2; i++) {
            txt = txt + "<li><a id='device_page_control_2_" + (device_table_page_2 + 1 + i) + "'>" + (device_table_page_2 + 1 + i) + "</a></li>";
        }
    }
    if (page > device_table_page_2 + 5) {
        txt = txt + "<li><a id='device_Next_2'>Next</a></li>";
    }
    $("#device_page_control_2").empty();
    $("#device_page_control_2").append(txt);
    $("#device_Prev_2").on('click', function () {
        device_table_page_2 = device_table_page_2 - 5;
        device_table_split_2(table);
    });
    $("#device_Next_2").on('click', function () {
        device_table_page_2 = device_table_page_2 + 5;
        device_table_split_2(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#device_page_controller_2_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            device_2_table_draw_table(table_new, 1);
        })
    }
    var table_page_1 = device_table_page_2;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    device_2_table_draw_table(table_new, 1);
}

function device_2_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm'  id='device_2_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='test_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='device_2_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#device_table_2").empty();
    $("#device_table_2").append(txt);
    showBox1();
    get_change_data();
}

function device_table_split_3(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (device_table_page_3 > 0) {
        txt = txt + "<li><a id='device_Prev_3'>Prev</a></li>";
    }
    if (page - device_table_page_3 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='device_page_controller_3_" + (device_table_page_3 + 1 + i) + "'>" + (device_table_page_3 + 1 + i) + "</a></li>";
        }
    }
    else {
        for (var i = 0; i < page - device_table_page_3; i++) {
            txt = txt + "<li><a id='device_page_control_3_" + (device_table_page_3 + 1 + i) + "'>" + (device_table_page_3 + 1 + i) + "</a></li>";
        }
    }
    if (page > device_table_page_3 + 5) {
        txt = txt + "<li><a id='device_Next_3'>Next</a></li>";
    }
    $("#device_page_control_3").empty();
    $("#device_page_control_3").append(txt);
    $("#device_Prev_3").on('click', function () {
        device_table_page_3 = device_table_page_3 - 5;
        device_table_split_3(table);
    });
    $("#device_Next_3").on('click', function () {
        device_table_page_3 = device_table_page_3 + 5;
        device_table_split_3(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#device_page_control_3_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            device_3_table_draw_table(table_new, 2);
        })
    }
    var table_page_1 = device_table_page_3;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    device_3_table_draw_table(table_new, 2);
}

function device_3_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='device_3_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='device_3_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='device_3_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#device_table_3").empty();
    $("#device_table_3").append(txt);
    showBox1();
    get_change_data();
}

function data_table_split_1(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (data_table_page_1 > 0) {
        txt = txt + "<li><a id='data_Prev_1'>Prev</a></li>";
    }
    if (page - data_table_page_1 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='data_page_control_1_" + (data_table_page_1 + 1 + i) + "'>" + (data_table_page_1 + 1 + i) + "</a></li>";
        }
    }
    else {
        for (var i = 0; i < page - data_table_page_1; i++) {
            txt = txt + "<li><a id='data_page_control_1_" + (data_table_page_1 + 1 + i) + "'>" + (data_table_page_1 + 1 + i) + "</a></li>";
        }
    }
    if (page > data_table_page_1 + 5) {
        txt = txt + "<li><a id='data_Next_1'>Next</a></li>";
    }
    $("#data_page_control_1").empty();
    $("#data_page_control_1").append(txt);
    $("#data_Prev_1").on('click', function () {
        data_table_page_1 = data_table_page_1 - 5;
        data_table_split_1(table);
    });
    $("#data_Next_1").on('click', function () {
        data_table_page_1 = data_table_page_1 + 5;
        data_table_split_1(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#data_page_control_1_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            data_1_table_draw_table(table_new, 2);
        })
    }
    var table_page_1 = data_table_page_1;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    data_1_table_draw_table(table_new, 2);
}

function data_1_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr style='height: 50px'>";
        }
        else {
            txt = txt + "<tr class='success' style='height: 50px'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td><img src='./static/picture/user.jpg' style='width: 35px;height: 35px'/></td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_1_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='data_1_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_1_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#data_table_1").empty();
    $("#data_table_1").append(txt);
    showBox1();
    get_change_data();
}

function data_table_split_2(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (data_table_page_2 > 0) {
        txt = txt + "<li><a id='data_Prev_2'>Prev</a></li>";
    }
    if (page - data_table_page_2 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='data_page_control_2_" + (data_table_page_2 + 1 + i) + "'>" + (data_table_page_2 + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - data_table_page_2; i++) {
            txt = txt + "<li><a id='data_page_control_2_" + (data_table_page_2 + 1 + i) + "'>" + (data_table_page_2 + 1 + i) + "</a></li>"
        }
    }
    if (page > data_table_page_2 + 5) {
        txt = txt + "<li><a id='data_Next_2'>Next</a></li>";
    }
    $("#data_page_control_2").empty();
    $("#data_page_control_2").append(txt);
    $("#data_Prev_2").on('click', function () {
        data_table_page_2 = data_table_page_2 - 5;
        data_table_split_2(table);
    });
    $("#data_Next_2").on('click', function () {
        data_table_page_2 = data_table_page_2 + 5;
        data_table_split_2(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#data_page_control_2_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i])
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i])
                }
            }
            table_new['TableData'] = a;
            data_2_table_draw_table(table_new, 2);
        })
    }
    var table_page_1 = data_table_page_2;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    data_2_table_draw_table(table_new, 2);
}

function data_2_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        // txt = txt + "<td><img src='./static/picture/user.jpg' style='width: 35px;height: 35px'/></td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_2_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='data_2_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_2_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#data_table_2").empty();
    $("#data_table_2").append(txt);
    showBox1();
    get_change_data();
}

function data_table_split_3(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (data_table_page_3 > 0) {
        txt = txt + "<li><a id='data_Prev_3'>Prev</a></li>";
    }
    if (page - data_table_page_3 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='data_page_control_3_" + (data_table_page_3 + 1 + i) + "'>" + (data_table_page_3 + 1 + i) + "</a></li>";
        }
    }
    else {
        for (var i = 0; i < page - data_table_page_3; i++) {
            txt = txt + "<li><a id='data_page_control_3_" + (data_table_page_3 + 1 + i) + "'>" + (data_table_page_3 + 1 + i) + "</a></li>";
        }
    }
    if (page > data_table_page_3 + 5) {
        txt = txt + "<li><a id='data_Next_3'>Next</a></li>";
    }
    $("#data_page_control_3").empty();
    $("#data_page_control_3").append(txt);
    $("#data_Prev_3").on('click', function () {
        data_table_page_3 = data_table_page_3 - 5;
        data_table_split_3(table);
    });
    $("#data_Next_3").on('click', function () {
        data_table_page_3 = data_table_page_3 + 5;
        data_table_split_3(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#data_page_control_3_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            data_3_table_draw_table(table_new, 2);
        })
    }
    var table_page_1 = data_table_page_3;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    data_3_table_draw_table(table_new, 2);
}

function data_3_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        // txt = txt + "<td><img src='./static/picture/user.jpg' style='width: 35px;height: 35px'/></td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_3_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='data_3_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_3_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#data_table_3").empty();
    $("#data_table_3").append(txt);
    showBox1();
    get_change_data();
}

function data_table_split_4(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (data_table_page_4 > 0) {
        txt = txt + "<li><a id='data_Prev_4'>Prev</a></li>";
    }
    if (page - data_table_page_4 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='data_page_control_4_" + (data_table_page_4 + 1 + i) + "'>" + (data_table_page_4 + 1 + i) + "</a></li>";
        }
    }
    else {
        for (var i = 0; i < page - data_table_page_4; i++) {
            txt = txt + "<li><a id='data_page_control_4_" + (data_table_page_4 + 1 + i) + "'>" + (data_table_page_4 + 1 + i) + "</a></li>";
        }
    }
    if (page > data_table_page_4 + 5) {
        txt = txt + "<li><a id='data_Next_4'>Next</a></li>";
    }
    $("#data_page_control_4").empty();
    $("#data_page_control_4").append(txt);
    $("#data_Prev_4").on('click', function () {
        data_table_page_4 = data_table_page_4 - 5;
        data_table_split_4(table);
    });
    $("#data_Next_4").on('click', function () {
        data_table_page_4 = data_table_page_4 + 5;
        data_table_split_4(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#data_page_control_4_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            data_4_table_draw_table(table_new, 1);
        })
    }
    var table_page_1 = data_table_page_4;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i])
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i])
        }
    }
    table_new['TableData'] = a;
    data_4_table_draw_table(table_new, 1);
}

function data_4_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        // txt = txt + "<td><img src='./static/picture/user.jpg' style='width: 35px;height: 35px'/></td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_4_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='data_4_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='data_4_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#data_table_4").empty();
    $("#data_table_4").append(txt);
    showBox1();
    get_change_data();
}

function system_table_split_1(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (system_table_page_1 > 0) {
        txt = txt + "<li><a id='system_Prev_1'>Prev</a></li>";
    }
    if (page - system_table_page_1 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='system_page_control_1_" + (system_table_page_1 + 1 + i) + "'>" + (system_table_page_1 + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - system_table_page_1; i++) {
            txt = txt + "<li><a id='system_page_control_1_" + (system_table_page_1 + 1 + i) + "'>" + (system_table_page_1 + 1 + i) + "</a></li>"
        }
    }
    if (page > system_table_page_1 + 5) {
        txt = txt + "<li><a id='system_Next_1'>Next</a></li>";
    }
    $("#system_page_control_1").empty();
    $("#system_page_control_1").append(txt);
    $("#system_Prev_1").on('click', function () {
        system_table_page_1 = system_table_page_1 - 5;
        system_table_split_1(table);
    });
    $("#system_Next_1").on('click', function () {
        system_table_page_1 = system_table_page_1 + 5;
        system_table_split_1(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#system_page_control_1_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            system_1_table_draw_table(table_new, 1);
        })
    }
    var table_page_1 = system_table_page_1;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    system_1_table_draw_table(table_new, 1);
}

function system_1_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        // txt = txt + "<td><img src='./static/picture/user.jpg' style='width: 35px;height: 35px'/></td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='system_1_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='data_4_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='system_1_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#system_table_1").empty();
    $("#system_table_1").append(txt);
    showBox1();
    get_change_data();
}

function system_table_split_2(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (system_table_page_2 > 0) {
        txt = txt + "<li><a id='system_Prev_2'>Prev</a></li>";
    }
    if (page - system_table_page_2 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='system_page_control_2_" + (system_table_page_2 + 1 + i) + "'>" + (system_table_page_2 + 1 + i) + "</a></li>";
        }
    }
    else {
        for (var i = 0; i < page - system_table_page_2; i++) {
            txt = txt + "<li><a id='system_page_control_2_" + (system_table_page_2 + 1 + i) + "'>" + (system_table_page_2 + 1 + i) + "</a></li>";
        }
    }
    if (page > system_table_page_2 + 5) {
        txt = txt + "<li><a id='system_Next_2'>Next</a></li>";
    }
    $("#system_page_control_2").empty();
    $("#system_page_control_2").append(txt);
    $("#system_Prev_2").on('click', function () {
        system_table_page_2 = system_table_page_2 - 5;
        system_table_split_2(table);
    });
    $("#system_Next_2").on('click', function () {
        system_table_page_2 = system_table_page_2 + 5;
        system_table_split_2(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#system_page_control_2_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i]);
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i]);
                }
            }
            table_new['TableData'] = a;
            system_2_table_draw_table(table_new, 1);
        })
    }
    var table_page_1 = system_table_page_2;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    system_2_table_draw_table(table_new, 1);
}

function system_2_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        // txt = txt + "<td><img src='./static/picture/user.jpg' style='width: 35px;height: 35px'/></td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='system_2_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='data_4_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='system_2_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#system_table_2").empty();
    $("#system_table_2").append(txt);
    showBox1();
    get_change_data();
}

function system_table_split_3(table) {
    // console.log(table);
    var length = table.TableData.length;
    var page = Math.ceil(length / 10);
    var txt = "";
    if (system_table_page_3 > 0) {
        txt = txt + "<li><a id='system_Prev_3'>Prev</a></li>";
    }
    if (page - system_table_page_3 - 5 > 0) {
        for (var i = 0; i < 5; i++) {
            txt = txt + "<li><a id='system_page_control_3_" + (system_table_page_3 + 1 + i) + "'>" + (system_table_page_3 + 1 + i) + "</a></li>"
        }
    }
    else {
        for (var i = 0; i < page - system_table_page_3; i++) {
            txt = txt + "<li><a id='system_page_control_3_" + (system_table_page_3 + 1 + i) + "'>" + (system_table_page_3 + 1 + i) + "</a></li>"
        }
    }
    if (page > system_table_page_3 + 5) {
        txt = txt + "<li><a id='system_Next_3'>Next</a></li>";
    }
    $("#system_page_control_3").empty();
    $("#system_page_control_3").append(txt);
    $("#system_Prev_3").on('click', function () {
        system_table_page_3 = system_table_page_3 - 5;
        system_table_split_3(table);
    });
    $("#system_Next_3").on('click', function () {
        system_table_page_3 = system_table_page_3 + 5;
        system_table_split_3(table);
    })
    for (var i = 1; i <= page; i++) {
        $("#system_page_control_3_" + i).on('click', function () {
            // console.log("hello world");
            var table_page_1 = parseInt(($(this).html())) - 1;
            var table_new = {};
            table_new['ColumnName'] = table.ColumnName;
            var start = table_page_1 * 10;
            var end = table_page_1 * 10 + 10;
            var a = [];
            if (table.TableData.length < end) {
                for (var i = start; i < table.TableData.length; i++) {
                    a.push(table.TableData[i])
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    a.push(table.TableData[i])
                }
            }
            table_new['TableData'] = a;
            system_3_table_draw_table(table_new, 2);
        })
    }
    var table_page_1 = system_table_page_3;
    var table_new = {};
    table_new['ColumnName'] = table.ColumnName;
    var start = table_page_1 * 10;
    var end = table_page_1 * 10 + 10;
    var a = [];
    if (table.TableData.length < end) {
        for (var i = start; i < table.TableData.length; i++) {
            a.push(table.TableData[i]);
        }
    }
    else {
        for (var i = start; i < end; i++) {
            a.push(table.TableData[i]);
        }
    }
    table_new['TableData'] = a;
    system_3_table_draw_table(table_new, 2);
}

function system_3_table_draw_table(table, type) {
    var ColumnName = table.ColumnName;
    var TableData = table.TableData;
    var txt = "";
    txt = txt + "<thead><tr>";
    for (var i = 0; i < ColumnName.length; i++) {
        txt = txt + "<th>" + ColumnName[i] + "</th>";
    }
    txt = txt + "</tr></thead><tbody>";
    for (var i = 0; i < TableData.length; i++) {
        if (i % 2 == 0) {
            txt = txt + "<tr>";
        }
        else {
            txt = txt + "<tr class='success'>";
        }
        txt = txt + "<td>" + TableData[i][0] + "</td>";
        txt = txt + "<td>" + TableData[i][1] + "</td>";
        txt = txt + "<td>" + TableData[i][2] + "</td>";
        txt = txt + "<td>" + TableData[i][3] + "</td>";
        // txt = txt + "<td><img src='./static/picture/user.jpg' style='width: 35px;height: 35px'/></td>";
        txt = txt + "<td>" + TableData[i][4] + "</td>";
        // for (var j = 0; j < TableData[i].length; j++) {
        //     txt = txt + "<td>" + TableData[i][j] + "</td>";
        // }
        if (type == 2) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='system_3_change_" + (i + 1) + "'>修改</button><button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#delete-modal' id='data_4_delete_" + (i + 1) + "'>删除</button></td>";
        }
        else if (type == 1) {
            txt = txt + "<td><button type='button' class='btn btn-primary btn-sm' id='system_3_change_" + (i + 1) + "'>修改</button>";
        }
    }
    txt = txt + "</tbody>";
    $("#system_table_3").empty();
    $("#system_table_3").append(txt);
    showBox1();
    get_change_data();
}

function set_modal_title_and_content_and_footer(title,content,footer){
    $("#myModalTitle").empty();
    $("#myModalTitle").append(title);
    $("#myModalContent").empty();
    $("#myModalContent").append(content);
    $("#myModalFooter").empty();
    $("#myModalFooter").append(footer);
}

$("#add_device").on('click',function () {
    var title="增加设备";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    // $('#modal-container-532205').show();
    // console.log('KKKKKKKK');
});

function deviceAdd(){
    console.log('KKKKKKKKKKK');
}

$("#add_batch").on('click',function () {
    var title="批量添加设备";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
});

$("#add_interface").on('click',function () {
    var title="添加接口";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
});

$("#device_search").on('click',function(){
    var date=$("#device_date").val();
    var name=$("#device_name").val();
    device_table_page_2=0;
    var device_table_2 = create_data();
    device_table_split_2(device_table_2);
    console.log(date);
    console.log(name);
});

$("#add_data_batch").on('click',function () {
    var title="批量添加数据";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
});

$("#add_resources").on('click',function () {
    var title="添加资源";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
})

$("#add_data_model").on('click',function () {
    var title="导入算法模型";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
})

$("#add_evacuation_purpose").on('click',function () {
    var title="增加后送目的";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
});

$("#data_search").on('click',function(){
    var date=$("#data_date").val();
    var name=$("#data_name").val();
    data_table_page_1=0;
    var device_table_2 = create_data();
    data_table_split_1(device_table_2);
    console.log(date);
    console.log(name);
    $("#data_date").val("");
    $("#data_name").val("");
});

$("#add_device_new").on('click',function () {
    var title="添加新设备";
    var content="";
    for(var i=0;i<4;i++){
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+i+"</span><input type='text' class='form-control' placeholder='测试内容"+i+"' aria-describedby='basic-addon1' id='test_input_"+i+"'/></div>"
    }
    var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
    set_modal_title_and_content_and_footer(title,content,footer);
    $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
});

function get_change_data(){
    $("button[id^=system_3_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=system_2_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=system_1_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=data_4_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=data_3_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=data_2_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });

    $("button[id^=data_1_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        // content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>"
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=device_3_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=device_2_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=device_1_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=test_change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });


    $("button[id^=change_]").on('click',function () {
        var row=$(this).parent().parent().find("td");
        var cell1=row[1].innerText;
        var cell2=row[2].innerText;
        var cell3=row[3].innerText;
        // var cell4=row[4].innerText;
        // console.log(column1[1].innerText);
        // console.log($(this).attr('id'));
        var title="修改数据";
        var content="";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+1+"</span><input type='text' class='form-control' value='"+cell1+"'  aria-describedby='basic-addon1' id='test_input_"+1+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+2+"</span><input type='text' class='form-control' value='"+cell2+"' aria-describedby='basic-addon1' id='test_input_"+2+"'/></div>";
        content=content+"<div class='input-group'><span class='input-group-addon'>测试内容"+3+"</span><input type='text' class='form-control' value='"+cell3+"' aria-describedby='basic-addon1' id='test_input_"+3+"'/></div>";
        var footer="<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button><button type='button' class='btn btn-primary' id='deviceAdd' onclick='deviceAdd()' data-dismiss='modal'>保存</button>";
        set_modal_title_and_content_and_footer(title,content,footer);
        $(this).attr({"data-toggle":"modal","data-target":"#modal-container-532205"});
    });
}