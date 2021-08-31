
window.location.hash = "#defaultpos";
var view = new ViewModel();
var commitFlag = true;
$(function () {
    // view.GetLabUrlByLabID();
    // ko.applyBindings(view);
    console.log(getUrlParam("TopNavID"))
    if (getUrlParam("TopNavID") == "1") {
        // kqyx
        $('#kqyx').show();

    } else if (getUrlParam("TopNavID") == "2") {
        $('#kqcy').show();
        //window.location.href = _websiteName + '/ReportStudent/SLabSource/SExamWeb?TopNavID=8&SourceName=在线预习&SourceUrl=染色工艺预习题.xml';
    } else if (getUrlParam("TopNavID") == "4") {
        // OnlineReport();
        commitFlag = true;
        $('#sybg').show();
    } else if (getUrlParam("TopNavID") == "5") {
        $('#kczlk').show();
    } else if (getUrlParam("TopNavID") == "6") {
        // OpenDis();
        $('#hddy').show();
    } else if (getUrlParam("TopNavID") == "5") {
        $('#introduce2').show();//项目简介
    }
    else {
        window.history.back();
    }

    $('#sybgClose').click(function () {
        window.history.back();
    })
});
function getUrlParam(name) {
    // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    // var r = window.location.search.substr(1).match(reg);  //匹配目标参数   
    // if (r != null) return unescape(r[2]); return null; //返回参数值  
    var part = window.location.search.split('=')[1]
    return part
}
var base = new Base64();
function ViewModel() {
    var self = this;
    self.Url = ko.observable();
    self._ReportType = ko.observable(0);
    //编辑
    self.GetLabUrlByLabID = function () {
        //alert(document.getElementById("SourceUrl").value) 
        $.ajax({
            type: 'post',
            url: _websiteName + '/ReportStudent/SLabSource/GetLabUrlByLabID',
            data: {
                LabID: _CurrentLabID.LabID,
                SourceName: document.getElementById("SourceUrl").value
            },
            success: function (result) {
                self.Url = result.FILEURL;

            }
        });
    };
}
// 下载报告模板
function DownReportTemplate() {
    //获取报告模板
    var url = "";
    $.ajax({
        type: 'post',
        url: _websiteName + '/ReportStudent/SLabSource/GetLabReportUrl',
        data: {
            LabID: _CurrentLabID.LabID
        },
        success: function (result) {
            debugger;
            if (result.IsSuccess) {
                window.location.href = _websiteName + "/Upload/ImportTemplate/" + result.Data;
                //window.open("/Upload/ImportTemplate/" + result.Data);
            } else {
                bootbox.alert(result.Data);
            }
        },
        error: function (data) {
            bootbox.alert(data);
        }
    });
}


//点击上传按钮
function UploadTempFile() {
    $("#importButton").click();
}

//点击打开后显示文件名
function GetFileName() {
    var fileName = $('#importButton').val()
    $("#fileNames").val(fileName.substring(fileName.lastIndexOf("\\") + 1))
}
//保存按钮事件
function SaveTemplete() {
    TempleteValidator();
    $('#UploadForm').data('bootstrapValidator').validate();
    if ($("#UploadForm").data('bootstrapValidator').isValid() == true) {
        if ($('#importButton').val().length < 2) {
            bootbox.alert("请上传实验报告文件");
            return;
        }
        $('body').append("<div id='ajaxInfo' class='loadingLayout'><div class='loading'>正在请求数据,请稍等...</div></div>");
        $.ajaxFileUpload({
            type: "post",
            url: _websiteName + "/ReportStudent/SLabSource/UploadDate",
            secureuri: false,
            fileElementId: ["importButton"],
            data: {
                LabID: _CurrentLabID.LabID,
                UserID: _userInfo.UserID,
                UserName: _userInfo.UserName
            },
            success: function (data, status) {
                data = $.parseJSON(data.getElementsByTagName("body")[0].innerHTML);
                bootbox.alert(data.Data);
                $("#UploadModal").modal("toggle");
                $("#ajaxInfo").remove();
            },
            error: function (data, status, e) {
                data = jQuery.parseJSON(jQuery(data.responseText).text());
                bootbox.alert(data.Data);
                $("#UploadModal").modal("toggle");
                $("#ajaxInfo").remove();
            }
        });
        $("#UploadForm").data('bootstrapValidator').destroy();
        $('#UploadForm').data('bootstrapValidator', null);
    }
}


//导出实验数据
function Export() {
    $('body').append("<div id='ajaxInfo' class='loadingLayout'><div class='loading'>正在请求数据,请稍等...</div></div>");
    $.ajax({
        type: 'post',
        url: _websiteName + '/ReportStudent/SLabSource/ExportLabData',
        data: {
            LabID: _CurrentLabID.LabID,
            UserID: _userInfo.UserID,
            UserName: _userInfo.UserName,
            LabName: _CurrentLabID.LabName
        },
        success: function (result) {
            if (result.IsSuccess) {
                window.location.href = result.Data;
                $("#ajaxInfo").remove();
            }
            else {
                $("#ajaxInfo").remove();
                bootbox.alert(result.Data);
            }
        }
    });
}

//输入验证
function TempleteValidator() {
    $('#UploadForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'fa fa-check',
            invalid: 'fa fa-remove',
            validating: 'fa fa-refresh'
        },
        fields: {
            VERSION: {
                message: '实验数据文件名称无效！',
                validators: {
                    notEmpty: {
                        message: '实验数据文件名称不能为空！'
                    },
                    stringLength: {
                        min: 2,
                        max: 50,
                        message: '实验数据文件名称长度为2-50个字符'
                    }
                }
            }
        },
        removeClass: "form-group"
    });
}

function kqcyt() {
    window.location.href = _websiteName + '/ReportStudent/SLabSource/SExamWeb?TopNavID=8&SourceName=在线预习&SourceUrl=染色工艺预习题.xml';

}
function savebuildOver() {
    $('#savebuild').css({ 'background-color': '#306CA6' })
}
function savebuildOut() {
    $('#savebuild').css({ 'background-color': '#4880E3' })
}
function closeidOver() {
    $('#closeid').css({ 'background-color': '#306CA6' })
}
function closeidOut() {
    $('#closeid').css({ 'background-color': '#4880E3' })
}
//新增点击事件
function OpenDis() {
    LoadDiscuss();

    // LoadUser();
    BuildFuryText();
    $("#TempleteModalLabel").text("在线讨论");
    $("#TempleteModal").modal("toggle");
}
//加载用户列表（当前实验）
function LoadUser() {
    $.ajaxnl({
        type: 'post',
        url: _websiteName + '/ReportStudent/SLabSource/GetUserList',
        data: {
            LabID: _CurrentLabID.LabID
        },
        success: function (result) {
            var htmlstr = "<h3 style=\"margin:0 auto;;font-size:18px;font-weight:bold;\">用户列表</h3><br /><ul class=\"imglist\">";
            for (var i = 0; i < result.length; i++) {
                htmlstr += "<li><img src='" + _websiteName + "/" + result[i].TypeImg + "'>" + result[i].USERNAME + "</li>";
            }
            htmlstr += "</ul>";
            $('#userlist').html(htmlstr);
        }
    }); //结束
}

function LoadDiscuss() {
    $.ajax({
        type: 'post',
        url: _websiteName + '/ReportStudent/SLabSource/LoadDiscuss',
        data: {
            LabID: _CurrentLabID.LabID,
            pageIndex: PageIndex,
            pageSize: PageSize
        },
        success: function (result) {
            if (result.RTNCode <= PageIndex) {
                $("#more").css('display', 'none');
            } else {
                $("#more").css('display', 'block');
            }
            var htmlstr = "<ul class=\"dislist\">";
            for (var i = 0; i < result.Data.length; i++) {
                htmlstr += "<li><img src='" + _websiteName + "/" + result.Data[i].TypeImg + ">&nbsp&nbsp" + result.Data[i].UserName + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + result.Data[i].CreateDateStr + "<div class=\"row\" style=\"width:750px;margin: 15px 50px;\">"
                if (result.Data[i].RecordFilePath) {//<span>" + result.Data[i].CreateDateStr + "</span>
                    var recordSrc = '../../Upload/RecordFiles/' + result.Data[i].RecordFilePath;
                    htmlstr += "<audio style='display:none' controls src='" + _websiteName + recordSrc + "'></audio>";
                    htmlstr += "<input type='button' class='RecordBg' onclick='playBtn(this, this.previousSibling)' />"
                } else {
                    htmlstr += result.Data[i].Content;
                }

                htmlstr += "</div></li>";
            }
            htmlstr += "</ul>";
            //console.log(htmlstr);
            $('#disdiv').html(htmlstr);
            //BuildFuryText();
            var div = document.getElementById("discontent");
            //console.log(div.scrollHeight);

            var divul = document.getElementById("disdiv");
            //console.log(divul.scrollHeight);

            div.scrollTop = divul.scrollHeight + 100;
            //启动计时器
            //time = window.setInterval("LoadMore(1)", 3000);

        }
    });
}

function endPlay() {
    //清除语音播发计时器
    window.clearTimeout(timeuser);
    //启动获取数据计时器
    time = window.setInterval("LoadMore(1)", 3000);
}

function LoadMore(type) {
    LoadUser();
    if (type == "2") {
        PageIndex++;
    }
    $.ajaxnl({
        type: 'post',
        url: _websiteName + '/ReportStudent/SLabSource/LoadDiscuss',
        data: {
            LabID: _CurrentLabID.LabID,
            pageIndex: PageIndex,
            pageSize: PageSize
        },
        success: function (result) {
            var htmlstr = "<ul class=\"dislist\">";
            for (var i = 0; i < result.Data.length; i++) {
                htmlstr += "<li><img src='" + _websiteName + "/" + result.Data[i].TypeImg + "'>&nbsp&nbsp" + result.Data[i].UserName + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + result.Data[i].CreateDateStr + "<div class=\"row\" style=\"width:750px;margin: 15px 50px;\">"
                if (result.Data[i].RecordFilePath) {
                    var recordSrc = '../../Upload/RecordFiles/' + result.Data[i].RecordFilePath;
                    htmlstr += "<audio style='display:none' controls src='" + _websiteName + recordSrc + "'></audio>";
                    htmlstr += "<input type='button' class='RecordBg' onclick='playBtn(this, this.previousSibling)' />"
                } else {
                    htmlstr += result.Data[i].Content;
                }
                htmlstr += "</div></li>";
            }
            htmlstr += "</ul>";
            $('#disdiv').html(htmlstr);
            //BuildFuryText();
        }
    });
}

function UnSendDiscuss() {
    $('.wysiwyg-editor').empty();
}

function SaveReport() {
    if (!commitFlag) {
        return;
    }
    var arrayContent = new Array();
    //实验目的
    var SymdElement = $("#sjztsl_1");
    var parammd = {};
    parammd["Name"] = "sjztsl";
    parammd["Value"] = SymdElement[0].value;
    arrayContent.push(parammd);
    //实验总结
    var SyzjElement = $("#gylc_1");
    var paramzj = {};
    paramzj["Name"] = "gylc";
    paramzj["Value"] = SyzjElement[0].value;
    arrayContent.push(paramzj);

    var SymdElement = $("#cpxg_1");
    var parammd = {};
    parammd["Name"] = "cpxg";
    parammd["Value"] = SymdElement[0].value;
    arrayContent.push(parammd);

    var SymdElement = $("#skt_1");
    var parammd = {};
    parammd["Name"] = "skt";
    parammd["Value"] = SymdElement[0].value;
    arrayContent.push(parammd);

    var data = JSON.stringify(arrayContent);
    $.ajax({
        type: 'post',
        url: _websiteName + '/ReportStudent/SLabSource/SubmitXmlReport',
        data: {
            BGContent: data,
            LabID: _CurrentLabID.LabID,
            UserID: _userInfo.UserID,
            UserName: _userInfo.UserName
        },
        success: function (result) {
            if (result.IsSuccess) {
                bootbox.alert("提交成功！");
            }
            else {
                bootbox.alert(result.Data);
            }
        },
        error: function (data) {
            bootbox.alert(data.Data)
        }
    });
}
function OnlineReport() {
    //解析报告
    $.ajax({
        type: 'post',
        url: _websiteName + '/ReportStudent/SLabSource/GetLabReportContent',
        data: {
            LabID: _CurrentLabID.LabID,
            UserID: _userInfo.UserID,
            UserName: _userInfo.UserName,
            LabName: _CurrentLabID.LabName
        },
        success: function (result) {
            if (result.IsSuccess) {
                $("#onlineReportContainer").show();
                console.log(result);
                $("#sjztsl_1").empty();
                $("#sjztsl_1").text(result.Data.sjztsl);
                $("#gylc_1").empty();
                $("#gylc_1").text(result.Data.gylc);
                $("#cpxg_1").empty();
                $("#cpxg_1").text(result.Data.cpxg);
                $("#skt_1").empty();
                $("#skt_1").text(result.Data.skt);
                $("#py_2").empty();
                $("#py_2").append(result.Data.py);

                $("#ReportUserName").empty();
                $("#ReportUserName").text(_userInfo.UserName);

                $("#ReportUserID").empty();
                $("#ReportUserID").text(_userInfo.UserID);
                BuildFuryText();
                $("#alertTextContainer").hide();
            } else {
                $("#onlineReportContainer").hide();
                commitFlag = false;
                bootbox.alert(result.Data);
                $("#alertTextContainer").empty();
                $("#alertTextContainer").text(result.Data);
                $("#alertTextContainer").show();
            }
        }
    });
}
