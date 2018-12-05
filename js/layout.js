/**
 * Created by Huang Yuanjie on 2018/11/10.
 */
// var leftWidth;
// function resizeFunction(){
//     $(window).resize(function () {
//         $("#workspace1").css("width",$(window).width()-240);
//     });
// }

$(document).ready(function () {
    var a=GetRequest();
    var userType=getUserType(a['session']);
    function splitPage(e) {
        switch(userType){
            case "admin":
                break;
            case "admin1":
                var page = $.xmlayout.layout(e);
                var pageData = page.element(10, false, null, null,
                    [
                        page.element(1.2, true, false, false),//宽度，鼠标拖拉，鼠标右键，工具栏，两个相邻的窗体必须同时将鼠标拖拉设为true，才可以进行拖拉
                        page.element(8.8, true, false, false),
                    ]);
                page.init(
                    {
                        data: pageData,
                        panel: e,
                        timer: 2000,
                        drag_bar_unit: 1,//边框的宽度
                        isradius:false,
                        drag_bar_color: "#FFFFF1",// 默认为黑色，其余颜色需要制定
                        playuseable: false,//幻灯片播放
                    }
                );
                var n = page.getPanels();
                n[0].loadPage("./subhtml/left.html", null);
                n[1].loadPage("./subhtml/right.html", null);
                var a = page.addRightPanelItem(n[0], "user-defiend", function (e) {
                    alert("user-defiend click"), page.removeRightPanelItem(n[0], a)
                });
                page.disablePanelItem(n[0], page.RPID.ZOOM_OUT, !0),
                    $.xmlayout.addParam({xm: page});
                break;
            case 'doctor':
                $("#page_name").empty();
                $("#page_name").append("伤员伤票显示界面");
                $("#user_type").empty();
                $('#user_type').append(userType+"<img style='cursor: pointer;color: #fff;width: 40px;height: 40px;border-radius: 20px;margin: 10px 0px 10px 10px;float: right' src='./static/picture/user.jpg'>");
                var page = $.xmlayout.layout(e);
                var pageData = page.element(10, false, null, null,
                    [
                        page.element(3, true, false, false),//宽度，鼠标拖拉，鼠标右键，工具栏，两个相邻的窗体必须同时将鼠标拖拉设为true，才可以进行拖拉
                        page.element(7, true, false, false),
                    ]);
                page.init(
                    {
                        data: pageData,
                        panel: e,
                        timer: 2000,
                        drag_bar_unit: 1,//边框的宽度
                        isradius:false,
                        drag_bar_color: "#FFFFF1",// 默认为黑色，其余颜色需要制定
                        playuseable: false,//幻灯片播放
                    }
                );
                var n = page.getPanels();
                n[0].loadPage("./subhtml/left_doctor.html", null);
                n[1].loadPage("./subhtml/right_doctor.html", null);
                var a = page.addRightPanelItem(n[0], "user-defiend", function (e) {
                    alert("user-defiend click"), page.removeRightPanelItem(n[0], a)
                });
                page.disablePanelItem(n[0], page.RPID.ZOOM_OUT, !0),
                    $.xmlayout.addParam({xm: page});
                break;
            case "doctor1":
                $("#page_name").empty();
                $("#page_name").append("分类后送指挥界面");
                $("#user_type").empty();
                $('#user_type').append(userType+"<img style='cursor: pointer;color: #fff;width: 40px;height: 40px;border-radius: 20px;margin: 10px 0px 10px 10px;float: right' src='./static/picture/user.jpg'>");
                var page = $.xmlayout.layout(e);
                var pageData = page.element(10, false, null, null,
                    [
                        page.element(4.6, true, false, false),//宽度，鼠标拖拉，鼠标右键，工具栏，两个相邻的窗体必须同时将鼠标拖拉设为true，才可以进行拖拉
                        page.element(5.4, true, false, false),
                    ]);
                page.init(
                    {
                        data: pageData,
                        panel: e,
                        timer: 2000,
                        drag_bar_unit: 1,//边框的宽度
                        isradius:false,
                        drag_bar_color: "#FFFFF1",// 默认为黑色，其余颜色需要制定
                        playuseable: false,//幻灯片播放
                    }
                );
                var n = page.getPanels();
                n[0].loadPage("./subhtml/left_doctor1.html", null);
                n[1].loadPage("./subhtml/right_doctor1.html", null);
                var a = page.addRightPanelItem(n[0], "user-defiend", function (e) {
                    alert("user-defiend click"), page.removeRightPanelItem(n[0], a)
                });
                page.disablePanelItem(n[0], page.RPID.ZOOM_OUT, !0),
                    $.xmlayout.addParam({xm: page});
                break;
            default:
                break;
        }
    }
    var t = $("#workspace");
    splitPage(t);
});

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function getUserType(session){
    var userTypeDict={'123456':'admin','234567':'admin1','345678':'doctor','456789':'doctor1'};
    return userTypeDict[session];
}