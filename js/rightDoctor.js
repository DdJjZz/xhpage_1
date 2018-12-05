var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    tooltip: {},
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [4, 5]
            }
        },
        indicator: [
            {name: '等待救治进度', max: 100},
            {name: '信息完整度', max: 100},
            {name: '已做检查进度', max: 100},
            {name: '身份验证进度', max: 100},
            {name: '身体恢复程度', max: 100},
        ]
    },
    series: [{
        name: '各项工作进度',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: [43, 100, 28, 35, 50],
                label: {
                    normal: {
                        show: true,
                        formatter:function(params) {
                            return params.value;
                        }
                    }
                }
            }
        ]
    }]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

setInterval(function (){

    // var data0 = option.series[0].data;
    // var data1 = option.series[1].data;
    // data0.shift();
    // data0.push(Math.round(Math.random() * 1000));
    // data1.shift();
    // data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
    var data=[];
    for(var i=0;i<5;i++){
        var a=Math.floor(Math.random() *1000)/10;
        data.push(a);
    }
    // data=[1,2,3,4,5];
    // option.series[0].data[0].value.shift();
    option.series[0].data[0].value=data;
    // option.series[1].data.shift();
    // option.series[1].data.push(app.count++);

    myChart.setOption(option);
}, 5000);

$(document).ready(function () {
    setPanelSize();
    show_wounded_detail(SoliderData['TableData'][0])
    // a.push('测试数据' + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));
    // a.push('测试数据' + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));
    // a.push('测试数据' + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));
});
function setPanelSize() {
    var windowsHeight=$(window).height();
    $("#wounded_page").css('height',parseInt(windowsHeight-100));
    // $("#wounded_panel").css("height",parseInt($(#w)))
    // console.log($("#wounded_page").height());
    $(window).resize(
        function () {
            var resizeHeight=$(window).height();
            $("#wounded_page").css('height',parseInt(resizeHeight-100));
            // console.log($("#wounded_page").height());
        }
    );
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
    else if (type == "CN") {
        return y + "年" + m + '月' + d + '日';
    }
    //字符串转时间戳
    // var date="1999-12-31";
    // date = new Date(Date.parse(date.replace(/-/g, "/")));
    // date = date.getTime();
}

function show_wounded_detail(data){
    var data_1=[0,0,0,0,0];
    option.series[0].data[0].value=data_1;
    myChart.setOption(option);
    var min=631123200000;
    var max=946569600000;
    var today=formatDateTime(new Date(),"CN")
    var birthday=formatDateTime(Math.floor(Math.random() * (max - min + 1) + min),"CN");
    $("#wounded_detail").empty();
    var txt="";
    txt=txt+'<h5 style="font-size: 16px">'+data[1]+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+data[4]+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+birthday+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+data[5]+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+data[2]+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+today+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+today+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+today+'</h5>';
    txt=txt+'<h5 style="font-size: 16px">'+Math.floor(Math.random() * (100 - 40 + 1) + 40)+'</h5>';
    $("#wounded_detail").append(txt);
    $("#wounded_img").empty();
    if(data[0]%2==0) {
        $("#wounded_img").append('<img src="./static/picture/user.jpg" style="height: 280px">');
    }
    else{
        $("#wounded_img").append('<img src="./static/picture/user2.jpg" style="height: 280px">');
    }

    var url=["./static/picture/xLight.jpg","./static/picture/Xlight1.jpg","./static/picture/Xlight2.jpg","./static/picture/Xlight3.jpg","./static/picture/Xlight4.jpg"]
    var newurl=[];
    var msg=["左侧第二根肋骨断裂","左臂骨骨裂","右侧第四根肋骨断裂","左臂骨断裂","右臂骨断裂","左臂骨粉碎性骨折","右臂骨粉碎性骨折","脊骨断裂"];
    var newmsg=[];
    var text="";
    text=text+'<ol class="carousel-indicators">';
    for(var i=0;i<3;i++){
        var index=Math.floor(Math.random()*5);
        newurl.push(url[index]);
    }
    for(var i=0;i<newurl.length;i++){
        if(i==0){
            text=text+'<li class="active" data-slide-to="'+i+'" data-target="#carousel"></li>'
        }
        else{
            text=text+'<li data-slide-to="'+i+'" data-target="#carousel"></li>'
        }
    }
    text=text+'</ol><div class="carousel-inner">';
    for(var i=0;i<newurl.length;i++){
        if(i==0){
            text=text+'<div class="item active"><img src="'+newurl[i]+'" style="height: 750px;"/></div>'
        }
        else{
            text=text+'<div class="item"><img src="'+newurl[i]+'" style="height: 750px;"/></div>'
        }
    }
    text=text+'</div><a class="left carousel-control" href="#carousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left">\n' +
        '</span></a><a class="right carousel-control" href="#carousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right">\n' +
        '</span> </a>';
    $("#carousel").empty();
    $("#carousel").append(text);

    for(var i=0;i<5;i++){
        var index=Math.floor(Math.random()*8);
        newmsg.push(msg[index]);
    }
    $("#x_img_msg").empty();
    var txt="";
    for(var i=0;i<newmsg.length;i++){
        if(i<10){
            var j='0'+(i+1);
        }
        else{
            j=i+1
        }
        txt=txt+'<h5>伤情'+j+'：'+newmsg[i]+'</h5><div style="border: 0.5px;border-color: #D3D3D3;border-style: solid;width: 100%"></div>'
    }
    $("#x_img_msg").append(txt);
}
$("#submit_msg").on('click',function () {
    var injury_value=$("input[name=injury]:checked").val();
    console.log(injury_value);
    var part=[];
    var category=[];
    var type=[];
    for (var i=1;i<=9;i++){
        if($("input[name=part][value='"+i+"']:checked").val()=="" || $("input[name=part][value='"+i+"']:checked").val()==undefined){}
        else{
            part.push($("input[name=part][value='"+i+"']:checked").val());
        }
        if($("input[name=category][value='"+i+"']:checked").val()=="" || $("input[name=category][value='"+i+"']:checked").val()==undefined){}
        else{
            category.push($("input[name=category][value='"+i+"']:checked").val());
        }
        if($("input[name=type][value='"+i+"']:checked").val()=="" || $("input[name=type][value='"+i+"']:checked").val()==undefined){}
        else{
            type.push($("input[name=type][value='"+i+"']:checked").val());
        }
    }
    console.log(part);
    console.log(category);
    console.log(type);
    $("input[name=injury][value='1']").attr('checked', true);
    // for (var i=1;i<=6;i++){
    //     if(i!=1){
    //
    //     }
    //     else {
    //         // $("input[name=injury][value='" + i + "']").checked();
    //     }
    // }
    for (var i=1;i<=9;i++){
        $("input[name=part][value='"+i+"']:checked").attr('checked',false);
        $("input[name=category][value='"+i+"']:checked").attr('checked',false);
        $("input[name=type][value='"+i+"']:checked").attr('checked',false);
    }
});

