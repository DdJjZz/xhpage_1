/**
 * Created by Huang Yuanjie on 2017/10/23.
 */
var $SIDEBAR_MENU = $('#sidebar-menu');
$(document).ready(function () {
    // clrarWindow();
    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();
        // var $span=$(this).find('span');
        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
            });
        } else {
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }
            $li.addClass('active');
            $('ul:first', $li).slideDown(function() {
            });
        }
    });
    // getUrlStringData();
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
