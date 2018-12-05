var url=getRelativeURL();
function getRelativeURL(){
    var url = document.location.toString();
    // var arrUrl= url.split("://");
    // var start = arrUrl[1].indexOf("/");
    // var reUrl=arrUrl[1].substring(start);
    // if(reUrl.indexOf("?")!=-1) {
    //     reUrl = reUrl.split("?")[0];
    // }
    // var end = reUrl.lastIndexOf("/");
    // reUrl=reUrl.substring(0,end);
    //
    // reUrl=reUrl.replaceAll(/\/\/*/, "/");
    var arrurl=url.split("://");
    console.log(arrurl);
    var localurl=arrurl[1].split("/");
    url=arrurl[0]+"://"+localurl[0];
    return url;

}

function resizeFunction() {
    $(window).resize(function () {
        var width = $(window).width();
        var height = $(window).height();
        document.getElementById('ArmyMap').style.height = parseInt(height) + 'px';
        document.getElementById('ArmyMap').style.width = parseInt(width) + 'px';
        $("#leftrow").css('height', (parseInt(height) - 53) * 0.65);
        $("#bottomRow").css('height', (parseInt(height) - 53) * 0.35);
        $("#bottomRow").css('width', (parseInt(width) - 6));
        $("#leftrow").css('width', parseInt(width * 0.25));
        $('#MainStatistic').css("left", parseInt($("#leftrow").width()) + 15);
        $("#gridHolder").css('height', parseInt($("#leftrow").height() * 0.5));
        $("#gridHolder").css('width', parseInt($("#leftrow").width() - 22));
        $("#gridHolder1").css('height', parseInt(($("#leftrow").height() * 0.4)));
        $("#gridHolder1").css('width', parseInt($("#leftrow").width() - 22));
        $("#gridHolder2").css('height', parseInt($("#bottomRow").height() - 30));
        $("#gridHolder2").css('width', parseInt($("#bottomRow").width() * 0.25));
        $("#gridHolder3").css('height', parseInt($("#bottomRow").height() - 30));
        $("#gridHolder3").css('width', parseInt($("#bottomRow").width() * 0.25));
        $("#gridHolder4").css('height', parseInt($("#bottomRow").height() - 30));
        $("#gridHolder4").css('width', parseInt($("#bottomRow").width() * 0.25));
        $("#gridHolder5").css('height', parseInt($("#bottomRow").height()));
        $("#gridHolder5").css('width', parseInt($("#bottomRow").width() * 0.25));
        console.log(parseInt(width * 0.25));
    });
}

function setGridorChartSize() {
    var height = $(window).height();
    var width = $(window).width();
    $("#leftrow").css('height', (parseInt(height) - 53) * 0.65);
    $("#bottomRow").css('height', (parseInt(height) - 53) * 0.35);
    $("#bottomRow").css('width', (parseInt(width) - 6));
    $("#leftrow").css('width', parseInt(width * 0.25));
    $("#gridHolder").css('height', parseInt($("#leftrow").height() * 0.5));
    $("#gridHolder").css('width', parseInt($("#leftrow").width() - 22));
    $("#gridHolder1").css('height', parseInt(($("#leftrow").height() * 0.4)));
    $("#gridHolder1").css('width', parseInt($("#leftrow").width() - 22));
    $("#gridHolder2").css('height', parseInt($("#bottomRow").height() - 30));
    $("#gridHolder2").css('width', parseInt($("#bottomRow").width() * 0.25));
    $("#gridHolder3").css('height', parseInt($("#bottomRow").height() - 30));
    $("#gridHolder3").css('width', parseInt($("#bottomRow").width() * 0.25));
    $("#gridHolder4").css('height', parseInt($("#bottomRow").height() - 30));
    $("#gridHolder4").css('width', parseInt($("#bottomRow").width() * 0.25));
    $("#gridHolder5").css('height', parseInt($("#bottomRow").height()));
    $("#gridHolder5").css('width', parseInt($("#bottomRow").width() * 0.25));
    //gridHolder2
}

$(document).ready(
    function () {
        setGridorChartSize();
        resizeFunction();
        setInterval(ChageData, 10000);
    }
);


function clearAndCreate() {
    // $("#gridHolder").empty();
    // $("#gridHolder1").empty();
    // $("#gridHolder2").empty();
    // $("#gridHolder3").empty();
    // $("#gridHolder4").empty();
    // KoolChart.create("grid", "gridHolder", chartVars, "100%", "100%");
    // KoolChart.create("grid1", "gridHolder1", chartVars, "100%", "80%");
    // KoolChart.create("grid2", "gridHolder2", chartVars, "100%", "100%");
    // KoolChart.create("grid3", "gridHolder3", chartVars, "100%", "80%");
    // KoolChart.create("grid4", "gridHolder4", chartVars, "100%", "80%");
    // KoolChart.create("grid5", "gridHolder5", chartVars, "100%", "100%");
}

var chartVars = "KoolOnLoadCallFunction=gridReadyHandler";
KoolChart.create("grid", "gridHolder", chartVars, "100%", "100%");
KoolChart.create("grid1", "gridHolder1", chartVars, "100%", "80%");
KoolChart.create("grid2", "gridHolder2", chartVars, "100%", "100%");
KoolChart.create("grid3", "gridHolder3", chartVars, "100%", "80%");
KoolChart.create("grid4", "gridHolder4", chartVars, "100%", "80%");
KoolChart.create("grid5", "gridHolder5", chartVars, "100%", "100%");

function getChartLayout(id) {
    switch (id) {
        case "grid":
            var data = [layoutStr, chartData];
            return data;
            break;
        case "grid1":
            var data = [layoutStr1, chartData1];
            return data;
            break;
        case "grid2":
            var data = [layoutStr2, chartData2];
            return data;
            break;
        case "grid3":
            var data = [layoutStr3, chartData3];
            return data;
            break;
        case "grid4":
            var data = [layoutStr4, chartData4];
            return data;
            break;
        case "grid5":
            var data = [layoutStr5];
            return data;
            break;
        default:
            break;
    }
}

function gridReadyHandler(id) {
    var getLayoutData = getChartLayout(id);
    if (getLayoutData[0] == layoutStr5) {
        document.getElementById(id).setLayout(getLayoutData[0]);
    }
    else {
        document.getElementById(id).setLayout(getLayoutData[0]);
        document.getElementById(id).setData(getLayoutData[1]);
    }
}

var layoutStr = '<KoolChart borderStyle="none">'
    + '<Options>'
    + '<Legend position="top" hAlign="right" useVisibleCheck="true" defaultMouseOverAction="false" styleName="chartStyle" backgroundColor="rgba(0,0,0,0.2)"/>'
    + '</Options>'
    + '<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
    + '<Column2DChart showDataTips="true" columnWidthRatio="0.4" styleName="chartStyle">'
    + '<backgroundElements>'
    + '<GridLines>'
    + '<horizontalStroke>'
    + '<Stroke color="#f1f1f1" alpha="0.5"/>'
    + '</horizontalStroke>'
    + '</GridLines>'
    + '</backgroundElements>'
    + '<horizontalAxis>'
    + '<CategoryAxis id="hAxis" categoryField="type"/>'
    + '</horizontalAxis>'
    + '<verticalAxis>'
    + '<LinearAxis id="vAxis" formatter="{numfmt}"  interval="10"/>'
    + '</verticalAxis>'
    + '<series>'
    + '<Column2DSet type="stacked" showTotalLabel="true" totalLabelJsFunction="totalFunc">'
    + '<series>'
    + '<Column2DSeries labelPosition="inside" yField="goods" displayName="标准" showValueLabels="[]" color="#ffffff">'
    + '<fill>'
    + '<SolidColor color="#f6a54c" alpha="0.5"/>'
    + '</fill>'
    + '<showDataEffect>'
    + '<SeriesInterpolate/>'
    + '</showDataEffect>'
    + '</Column2DSeries>'
    + '<Column2DSeries labelPosition="inside" yField="income" displayName="余量" showValueLabels="[]" color="#ffffff">'
    + '<showDataEffect>'
    + '<SeriesInterpolate/>'
    + '</showDataEffect>'
    + '</Column2DSeries>'
    + '</series>'
    + '</Column2DSet>'
    + '</series>'
    + '</Column2DChart>'
    + '<Style>'
    + '.chartStyle{fontSize:11;color:#ffffff;}'
    + '</Style>'
    + '</KoolChart>';

var chartData =
    [
        {"type": "药品", "goods": 12, "income": 11,},
        {"type": "医疗物品", "goods": 14, "income": 19,},
        {"type": "医护人员", "goods": 23, "income": 25,},
        {"type": "医疗器械", "goods": 20, "income": 20,},
    ];

var layoutStr1 =
    '<KoolChart borderStyle="none">'
    + '<Options color="#000000">'
    + '<Legend position="right" direction="vertical" useVisibleCheck="true"  styleName="chartStyle" backgroundColor="rgba(0,0,0,0.2)"/>'
    + '</Options>'
    + '<Pie2DChart id="chart" innerRadius="0.7" showDataTips="true" selectionMode="single">'
    + '<series>'
    // + '<Pie2DSeries nameField="Month" field="Profit" startAngle="20" renderDirection="clockwise" labelPosition="inside" labelJsFunction="labelFunc" color="#ffffff">'
    // + '<fills>'
    // + '<SolidColor color="#20cbc2"/>'
    // + '<SolidColor color="#074d81"/>'
    // + '<SolidColor color="#40b2e6"/>'
    // + '</fills>'
    // + '<showDataEffect>'
    // + '<SeriesZoom duration="800"/>' //动画时间（ms）
    // + '</showDataEffect>'
    // + '</Pie2DSeries>'
    + '<Pie2DSeries nameField="Month" field="Profit" labelPosition="inside" color="#ffffff" renderDirection="counterClockwise" labelJsFunction="labelFunc" startAngle="90" insideLabelRatio="0.8">'
    + '<showDataEffect>'
    + '<SeriesInterpolate/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '</series>'
    // + '<backgroundElements>'
    // // + '<CanvasElement>'
    // // + '<Label text="伤情" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="19" color="#FFFFFF" backgroundAlpha="0"/>'
    // // + '<Label text="分布" height="24" horizontalCenter="0" verticalCenter="10" fontSize="19" color="#FFFFFF" backgroundAlpha="0"/>'
    // // + '</CanvasElement>'
    // + '</backgroundElements>'
    + '</Pie2DChart>'
    + '<Style>'
    + '.chartStyle{fontSize:11;color:#ffffff;}'
    + '</Style>'
    + '</KoolChart>';

var chartData1 = [
    {"Month": "轻伤伤员", "Profit": 1232},
    {"Month": "危重伤员", "Profit": 1620},
    {"Month": "中伤伤员", "Profit": 1530},
    {"Month": "重伤伤员", "Profit": 1730},
];

function labelFunc(seriesId, index, data, values) {
    var str = values[2], depth;
    str += "\n" + values[0];
    return "<font color='#ffffff'>" + str + "</font>";
}

var layoutStr2 =
    '<KoolChart borderStyle="none" >'
    + '<Bar2DChart showDataTips="true" barWidthRatio="1" maxBarWidth="5" styleName="chartStyle">'
    + '<horizontalAxis>'
    + '<LinearAxis minimum="0"  interval="10"/>'
    + '</horizontalAxis>'
    + '<verticalAxis>'
    + '<CategoryAxis categoryField="Month"/>'
    + '</verticalAxis>'
    + '<series>'
    + '<Bar2DSeries labelPosition="inside" xField="Vancouver" color="#ffffff" insideLabelYOffset="-2">'
    + '<showDataEffect>'
    + '<SeriesInterpolate/>'
    + '</showDataEffect>'
    + '</Bar2DSeries>'
    + '</series>'
    + '</Bar2DChart>'
    + '<Style>'
    + '.chartStyle{fontSize:11;color:#ffffff;}'
    + '</Style>'
    + '</KoolChart>';
var chartData2 = [
    {"Month": "轻伤救治率", "Vancouver": "35.8"},
    {"Month": "重伤救治率", "Vancouver": "28.8"},
    {"Month": "中伤救治率", "Vancouver": "47.6"},
    {"Month": "平均等待时长", "Vancouver": "81"},
    {"Month": "平均救治时长", "Vancouver": "60.1"},
];
KoolChart.registerTheme(KoolChart.themes);

function KoolChartChangeTheme(theme) {
    document.getElementById("grid2").setTheme(theme);
}

var layoutStr3 =
    '<KoolChart borderStyle="none">'
    + '<Options color="#000000">'
    + '<Legend position="right" direction="vertical" useVisibleCheck="true" styleName="chartStyle" backgroundColor="rgba(0,0,0,0.2)"/>'
    + '</Options>'
    + '<Pie2DChart id="chart" innerRadius="0.7" showDataTips="true" selectionMode="single">'
    + '<series>'
    // + '<Pie2DSeries nameField="Month" field="Profit" startAngle="20" renderDirection="clockwise" labelPosition="inside" labelJsFunction="labelFunc" color="#ffffff">'
    // + '<fills>'
    // + '<SolidColor color="#20cbc2"/>'
    // + '<SolidColor color="#074d81"/>'
    // + '<SolidColor color="#40b2e6"/>'
    // + '</fills>'
    // + '<showDataEffect>'
    // + '<SeriesZoom duration="800"/>' //动画时间（ms）
    // + '</showDataEffect>'
    // + '</Pie2DSeries>'
    + '<Pie2DSeries nameField="Month" field="Profit" labelPosition="inside" color="#ffffff" renderDirection="counterClockwise" labelJsFunction="labelFunc" startAngle="90" insideLabelRatio="0.8">'
    + '<showDataEffect>'
    + '<SeriesInterpolate/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '</series>'
    // + '<backgroundElements>'
    // + '<CanvasElement>'
    // + '<Label text="伤情" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="19" color="#FFFFFF" backgroundAlpha="0"/>'
    // + '<Label text="分布" height="24" horizontalCenter="0" verticalCenter="10" fontSize="19" color="#FFFFFF" backgroundAlpha="0"/>'
    // + '</CanvasElement>'
    // + '</backgroundElements>'
    + '</Pie2DChart>'
    + '<Style>'
    + '.chartStyle{fontSize:11;color:#ffffff;}'
    + '</Style>'
    + '</KoolChart>';

var chartData3 = [
    {"Month": "血常规", "Profit": 1232},
    {"Month": "CT", "Profit": 1620},
    {"Month": "胸透", "Profit": 1530},
    {"Month": "B超", "Profit": 1730},
    {"Month": "手术室", "Profit": 1730},
];

var layoutStr4 =
    '<KoolChart borderStyle="none">'
    + '<Options>'
    + '<Legend position="right" direction="vertical" useVisibleCheck="true" styleName="chartStyle" backgroundColor="rgba(0,0,0,0.2)"/>'
    + '</Options>'
    + '<NumberFormatter id="numFmt"/>'
    + '<Pie2DChart showDataTips="true">'
    + '<series>'
    + '<Pie2DSeries nameField="Month" field="Profit" labelPosition="inside" formatter="{numFmt}" color="#ffffff" renderDirection="counterClockwise" startAngle="90" >'
    + '<showDataEffect>'
    + '<SeriesInterpolate/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '<Pie2DSeries nameField="Month" field="Cost" labelPosition="inside" formatter="{numFmt}" color="#ffffff" renderDirection="counterClockwise" startAngle="90" insideLabelRatio="0.9" innerStackRatio="0.2" >'
    + '<showDataEffect>'
    + '<SeriesInterpolate/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '</series>'
    + '</Pie2DChart>'
    + '</KoolChart>';

// Use an array variable for Dataset.
var chartData4 =
    [
        {"Month": "待后送", "Cost": 240, "Profit": 0},
        {"Month": "已后送", "Cost": 70, "Profit": 0},
        {"Month": "待分类", "Profit": 300},
        {"Month": "已分类", "Profit": 1200},
    ]
KoolChart.registerTheme(KoolChart.themes);

function KoolChartChangeTheme(theme) {
    document.getElementById("grid4").setTheme(theme);
}


var layoutStr5 =
    '<KoolChart borderStyle="none">'
    + '<Options>'
    + '<Legend position="top" hAlign="right"  useVisibleCheck="true" styleName="chartStyle" backgroundColor="rgba(0,0,0,0.2)"/>'
    + '</Options>'
    + '<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
    + '<DateFormatter id="dateFmt" formatString="HH:NN:SS" />'
    + '<RealTimeChart id="chart" dataDisplayType="dataSize" displayDataSize="15" showDataTips="true" styleName="chartStyle" useThousandsSeparator="true" dataTipDisplayMode="axis">'
    + '<horizontalAxis>'
    + '<CategoryAxis id="hAxis" categoryField="Time" formatter="{dateFmt}"/>'
    + '</horizontalAxis>'
    + '<verticalAxis>'
    + '<LinearAxis id="vAxis" minimum="0"  interval="10"/>'
    + '</verticalAxis>'
    // + '<series>'
    // + '<Area2DSeries labelPosition="up" yField="P1" displayName="伤亡数据" itemRenderer="CircleItemRenderer"/>'
    // + '</series>'
    + '<series>'
    + '<Area2DSeries labelPosition="up" yField="P1" displayName="已有伤员" itemRenderer="CircleItemRenderer"/>'
    + '<Area2DSeries labelPosition="up" yField="P2" displayName="伤员流入" itemRenderer="CircleItemRenderer"/>'
    + '<Area2DSeries labelPosition="up" yField="P3" displayName="伤员流出" itemRenderer="CircleItemRenderer"/>'
    // +'<Area2DSeries labelPosition="up" yField="P2"  form="curve" displayName="伤员流入">'
    // +'<showDataEffect>'
    // +'<SeriesInterpolate/>'
    // +'</showDataEffect>'
    // +'</Area2DSeries>'
    // +'<Area2DSeries labelPosition="up" yField="P3"   displayName="伤员流出">'
    // +'<showDataEffect>'
    // +'<SeriesInterpolate/>'
    // +'</showDataEffect>'
    // +'</Area2DSeries>'
    + '</series>'
    + '<annotationElements>'
    + '<AxisMarker>'
    + '</AxisMarker>'
    + '</annotationElements>'
    + '<annotationElements>'
    + '<CrossRangeZoomer enableZooming="false" horizontalLabelFormatter="{numfmt}"/>'
    + '</annotationElements>'
    + '</RealTimeChart>'
    + '<HttpServiceRepeater url="http://127.0.0.1/process3Data.php" target="{chart}" interval="1" method="get"/>'
    + '<Style>'
    + '.chartStyle{fontSize:11;color:#ffffff;}'
    + '</Style>'
    + '</KoolChart>';

// Use an array variable for Dataset.
KoolChart.registerTheme(KoolChart.themes);

function KoolChartChangeTheme(theme) {
    document.getElementById("grid5").setTheme(theme);
}

function ChageData() {
    var chartData =
        [
            {"type": "药品", "goods": Math.ceil(Math.random()*20), "income": Math.ceil(Math.random()*20),},
            {"type": "医疗物品", "goods": Math.ceil(Math.random()*20), "income": Math.ceil(Math.random()*20),},
            {"type": "医护人员", "goods": Math.ceil(Math.random()*20), "income": Math.ceil(Math.random()*20),},
            {"type": "医疗器械", "goods": Math.ceil(Math.random()*20), "income": Math.ceil(Math.random()*20),},
        ];
    var chartData1 = [
        {"Month": "轻伤伤员", "Profit": Math.ceil(Math.random()*1000)},
        {"Month": "危重伤员", "Profit": Math.ceil(Math.random()*1000)},
        {"Month": "中伤伤员", "Profit": Math.ceil(Math.random()*1000)},
        {"Month": "重伤伤员", "Profit": Math.ceil(Math.random()*1000)},
    ];
    var chartData2 = [
        {"Month": "轻伤救治率", "Vancouver": (Math.random()*100).toFixed(2)},
        {"Month": "重伤救治率", "Vancouver": (Math.random()*100).toFixed(2)},
        {"Month": "中伤救治率", "Vancouver": (Math.random()*100).toFixed(2)},
        {"Month": "平均等待时长", "Vancouver": (Math.random()*100).toFixed(2)},
        {"Month": "平均救治时长", "Vancouver": (Math.random()*100).toFixed(2)},
    ];
    var chartData3 = [
        {"Month": "血常规", "Profit": Math.ceil(Math.random()*1000)},
        {"Month": "CT", "Profit": Math.ceil(Math.random()*1000)},
        {"Month": "胸透", "Profit": Math.ceil(Math.random()*1000)},
        {"Month": "B超", "Profit": Math.ceil(Math.random()*1000)},
        {"Month": "手术室", "Profit": Math.ceil(Math.random()*1000)},
    ];
    var chartData4 =
        [
            {"Month": "待后送", "Cost": Math.ceil(Math.random()*200), "Profit": 0},
            {"Month": "已后送", "Cost": Math.ceil(Math.random()*850), "Profit": 0},
            {"Month": "待分类", "Profit": Math.ceil(Math.random()*1000)},
            {"Month": "已分类", "Profit": Math.ceil(Math.random()*1000)},
        ]
    document.getElementById("grid").setData(chartData);
    document.getElementById("grid1").setData(chartData1);
    document.getElementById("grid2").setData(chartData2);
    document.getElementById("grid3").setData(chartData3);
    document.getElementById("grid4").setData(chartData4);
}

