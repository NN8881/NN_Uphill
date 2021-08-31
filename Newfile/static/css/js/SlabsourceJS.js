var time;
var timeuser;
var RoleType = ko.observable(_CurrentRoleType.RoleType);
var PageIndex = 1;
var PageSize = ko.observable(_enviroment.PageSize);
var _isSupportOnline = ko.observable(_userInfo._isSupportOnline);
var _isSupportPJ = ko.observable(_userInfo._isSupportPJ);
var base = new Base64();
$(document).ready(function () {
    // $.ajax({
    //     type: 'post',
    //     url: _websiteName + '/ReportStudent/SLabSource/GetLabSource',
    //     data: {
    //         LabID: _CurrentLabID.LabID
    //     },
    //     success: function (result) {
    //         var isHasStartLab = false;
    //         for (var i = 0; i < result.length; i++) {
    //             if (result[i].SourceName != "实验指导书下载") {
    //                 if (result[i].SourceName == "开始实验") {
    //                     isHasStartLab = true;
    //                     $("#source_ul").append("<li id='li" + (i + 1) + "' class='@(ViewData[\"TopNav\"].ToString()' == '" + (i + 1) + "' ? \"topNavActive\" : \"\")><a href=\"" + _websiteName + "/ReportStudent/SLabSource/SLabWeb?TopNavID=" + (i + 1)
    //                         + "&SourceName=" + result[i].SourceName + "\">" + result[i].SourceName + "</a><hr style=\"height: 1px; border: none; border-top: 1px solid white; margin: 0px auto\" /></li>");
    //                 } else if (result[i].SourceName == "在线预习") {
    //                     $("#source_ul").append("<li id='li" + (i + 1) + "' class='@(ViewData[\"TopNav\"].ToString()' == '" + (i + 1) + "' ? \"topNavActive\" : \"\")><a href=\"" + _websiteName + "/ReportStudent/SLabSource/SExamWeb?TopNavID=" + (i + 1)
    //                         + "&SourceName=" + result[i].SourceName + "&SourceUrl=" + result[i].SourceUrl + "\">" + result[i].SourceName + "</a><hr style=\"height: 1px; border: none; border-top: 1px solid white; margin: 0px auto\" /></li>");
    //                 } else {
    //                     $("#source_ul").append("<li id='li" + (i + 1) + "' class='@(ViewData[\"TopNav\"].ToString()' == '" + (i + 1) + "' ? \"topNavActive\" : \"\")><a href=\"" + _websiteName + "/ReportStudent/SLabSource/SLabSource?TopNavID=" + (i + 1)
    //                         + "&SourceName=" + result[i].SourceName + "\">" + result[i].SourceName + "</a><hr style=\"height: 1px; border: none; border-top: 1px solid white; margin: 0px auto\" /></li>");

    //                 }
    //             } else {
    //                 $("#source_ul").append("<li id='li" + (i + 1) + "' class='@(ViewData[\"TopNav\"].ToString()' == '" + (i + 1) + "' ? \"topNavActive\" : \"\")><a href=\"" + _websiteName + "/ReportStudent/SLabSource/SLabDown?TopNavID=" + (i + 1) + "&SourceName=" + result[i].SourceName + "\">"
    //                     + result[i].SourceName + "</a><hr style=\"height: 1px; border: none; border-top: 1px solid white; margin: 0px auto\" /></li>");

    //             }
    //         }
    //         if (isHasStartLab) {
    //             if (_isSupportPJ() == '1') {
    //                 $("#source_ul").append("<li id='li21' class='@(ViewData[\"TopNav\"].ToString()' == '21' ? \"topNavActive\" : \"\")><a href=\"" + _websiteName + "/ReportStudent/SLabSource/SEvaluation\">"
    //                     + "  教学评价</a><hr style=\"height: 1px; border: none; border-top: 1px solid white; margin: 0px auto\" />"
    //                     + " </li><li ><div class=\"linear\"></div> </li>");
    //             }
    //         } else {
    //             $("#source_ul").append("<li id='li20' class='@(ViewData[\"TopNav\"].ToString()' == '20' ? \"topNavActive\" : \"\")><a href=\"" + _websiteName + "/ReportStudent/SLabSource/SSYKS\">"
    //                 + "开始实验</a><hr style=\"height: 1px; border: none; border-top: 1px solid white; margin: 0px auto\" />"
    //                 + "</li>");
    //             if (_isSupportPJ() == '1') {
    //                 $("#source_ul").append("<li id='li21' class='@(ViewData[\"TopNav\"].ToString()' == '21' ? \"topNavActive\" : \"\")><a href=\"" + _websiteName + "/ReportStudent/SLabSource/SEvaluation\">"
    //                     + "  教学评价</a><hr style=\"height: 1px; border: none; border-top: 1px solid white; margin: 0px auto\" />"
    //                     + " </li><li ><div class=\"linear\"></div> </li>");
    //             }
    //         }

    //         //设置当前活动菜单
    //         var TopNavID = document.getElementById("TopNavID").value;
    //         $("#source_ul li").each(function (index, li) {
    //             li.className = "noactive";
    //         });
    //         $("#first_li").removeClass("noactive").addClass('defaultli');
    //         $("#li" + TopNavID).removeClass("noactive").addClass('topNavActive');

    //         if (_isSupportOnline() == '1') {
    //             $(".disdiv").css('display', 'block');
    //         } else {
    //             $(".disdiv").css('display', 'none');
    //         }

    //     }
    // });

});

//新增点击事件
function OpenDis() {
    LoadDiscuss();
    LoadUser();
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

            var htmlstr = "<ul class=\"dislist\" style='margin-top: 18px;'>";
            for (var i = 0; i < result.Data.length; i++) {
                var date = result.Data[i].CreateDateStr.replace(/\//g, '-');
                htmlstr += "<li id='li_" + result.Data[i].DiscussID + "'><img src='" + _websiteName + "/" + result.Data[i].TypeImg + "'>&nbsp&nbsp&nbsp&nbsp<span style='font-size:16px;font-weight:bold'>用户名：" + result.Data[i].UserID + "</span>&nbsp&nbsp&nbsp&nbsp<span style='font-size:16px;font-weight:bold;'>姓名：" + result.Data[i].UserName + "</span><span class='sendDate' style='float:right;font-size:16px; color:#808080;   margin-top: 15px;'>" + date + "</span><div class=\"row\" style='width:750px;margin: -21px 58px;margin-top: -12px;margin-bottom: 20px;'><span style='color:#4880E3;font-size: 16px;'>提问：</span>"
                if (result.Data[i].RecordFilePath) {
                    var recordSrc = '../../Upload/RecordFiles/' + result.Data[i].RecordFilePath;
                    htmlstr += "<audio style='display:none' controls src='" + _websiteName + recordSrc + "'></audio>";
                    htmlstr += "<input type='button' class='RecordBg' onclick='playBtn(this, this.previousSibling)' />"
                } else {
                    htmlstr += '<span style="font-size:16px;">' + result.Data[i].Content + '</span>';
                }
                htmlstr += "</div><div class='replyContainer' id='replyShow_" + result.Data[i].DiscussID + "'><img class='replyImg' src='/Content/img/reply.png'/><div onclick='ShowReply(" + result.Data[i].DiscussID + ",\"" + result.Data[i].UserID + "\")' class='replyBtn ShowReplyBtn'>回复(" + result.Data[i].ReplyCount + ")</div></div><div class='replyContainer' style='display:none;' id='replyHide_" + result.Data[i].DiscussID + "'><img class='replyImg' src='/Content/img/flod.png' /><div onclick='HideReply(" + result.Data[i].DiscussID + ")' class='replyBtn'>收起回复</div></div>";
                htmlstr += "<hr style='border-top:1px dashed #e6e6e6;'/></li>";
                $('.sendDate').text(result.Data[i].UserName.replace(/\//g, '-'));
            }
            htmlstr += "</ul>";
            $('#allCounts').text(result.RTNCode);
            $('#getIndex').text(PageIndex)
            //console.log(htmlstr);
            $('#disdiv').html(htmlstr);

        }
    });
}

function LoadMore(type) {
    //LoadUser();
    if (type == "2") {
        PageIndex++;
    }
    $('#getIndex').text(PageIndex);
    $.ajaxnl({
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
                var date = result.Data[i].CreateDateStr.replace(/\//g, '-');
                htmlstr += "<li id='li_" + result.Data[i].DiscussID + "'><img src='" + _websiteName + "/" + result.Data[i].TypeImg + "'>&nbsp&nbsp&nbsp&nbsp<span style='font-weight: bold;font-size:16px'>用户名：" + result.Data[i].UserID + "</span>&nbsp&nbsp&nbsp&nbsp<span style='font-weight: bold;font-size:16px'>姓名：" + result.Data[i].UserName + "</span><span class='sendDate' style='float:right;font-size:16px; color:#808080;   margin-top: 15px;'>" + date + "</span><div class=\"row\" style='width:750px;margin: -21px 58px;margin-top: -12px;margin-bottom: 20px;'><span style='color:#4880E3;font-size: 16px;'>提问：</span>"
                if (result.Data[i].RecordFilePath) {
                    var recordSrc = '../../Upload/RecordFiles/' + result.Data[i].RecordFilePath;
                    htmlstr += "<audio style='display:none' controls src='" + _websiteName + recordSrc + "'></audio>";
                    htmlstr += "<input type='button' class='RecordBg' onclick='playBtn(this, this.previousSibling)' />"
                } else {
                    htmlstr += '<span style="font-size:16px;">' + result.Data[i].Content + '</span>';
                }
                htmlstr += "</div><div class='replyContainer' id='replyShow_" + result.Data[i].DiscussID + "'><img class='replyImg' src='/Content/img/reply.png'/><div onclick='ShowReply(" + result.Data[i].DiscussID + ",\"" + result.Data[i].UserID + "\")' class='replyBtn ShowReplyBtn'>回复(" + result.Data[i].ReplyCount + ")</div></div><div class='replyContainer' style='display:none;' id='replyHide_" + result.Data[i].DiscussID + "'><img class='replyImg' src='/Content/img/flod.png'/><div onclick='HideReply(" + result.Data[i].DiscussID + ")' class='replyBtn'>收起回复</div></div>";
                htmlstr += "<hr style='border-top:1px dashed #e6e6e6;'/></li>";
            }
            htmlstr += "</ul>";

            $('#disdiv').html(htmlstr);
            //BuildFuryText();
        }
    });
}



//关闭在线讨论窗口，关闭计时器
function CloseDis() {
    window.clearInterval(time);
    window.clearTimeout(timeuser);
    PageIndex = 1;
}
//发言  str.replace(/<[^>]+>/g,"");
function SendDiscuss() {
    if ($("#disArea").val() == "") {
        bootbox.alert("发送内容不能为空，请重新输入！");
        return false;
    } else {
        $.ajax({
            type: 'post',
            url: _websiteName + '/ReportStudent/SLabSource/AddDiscuss',
            data: {
                UserID: _userInfo.UserID,
                UserName: _userInfo.UserName,
                LabID: _CurrentLabID.LabID,
                Content: $("#disArea").val(),
                UserRole: RoleType
            },
            success: function (result) {
                console.log(result);
                if (result.IsSuccess) {
                    $(".wysiwyg-editor").empty();
                    var div = document.getElementById("discontent");
                    var divul = document.getElementById("disdiv");
                    div.scrollTop = divul.scrollHeight + 60;
                    BuildFuryText();
                    LoadDiscuss();
                } else {
                    bootbox.alert(result.Data);
                }
            }
        });
    }
}

function DeleteDis(data) {
    bootbox.confirm({
        buttons: {
            confirm: {
                label: '确认',
                className: 'btn btn-LightGreen'
            },
            cancel: {
                label: '取消',
                className: 'btn btn-LightGreen'
            }
        },
        message: '您确认删除选定的记录吗？',
        callback: function (result) {
            if (result) {
                $.ajax({
                    type: 'post',
                    url: _websiteName + '/ReportStudent/SLabSource/DeleteDis',
                    data: {
                        DiscussID: data.DiscussID
                    },
                    success: function (result) {
                        bootbox.alert(result.Data);
                        if (result.IsSuccess) {
                            view.LoadDiscuss();
                        }
                    }
                });

            }
        },
        title: "删除提示"
    });
}

function playBtn(obj1, obj2) {
    //清除计时器
    window.clearInterval(time);
    var btns = $(".RecordBg");
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    }
    obj1.className = "RecordPlayingBg";

    obj2.play();
    //启动计时器
    timeuser = window.setTimeout("endPlay()", obj2.duration * 1000);
}

function endPlay() {
    //清除语音播发计时器
    window.clearTimeout(timeuser);
    //启动获取数据计时器
    time = window.setInterval("LoadMore(1)", 3000);
}

function savebuildOver() {
    $('#update').css({ 'background-color': '#306CA6' })
}
function savebuildOut() {
    $('#update').css({ 'background-color': '#4880E3' })
}
function closeidOver() {
    $('#cencal').css({ 'background-color': '#306CA6' })
}
function closeidOut() {
    $('#cencal').css({ 'background-color': '#4880E3' })
}

var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
function ShowReply(DiscussID, ReceiveUserID) {
    $("#replyShow_" + DiscussID).hide();
    $("#replyHide_" + DiscussID).show();
    var replyContentHtml = $("#replyContentHtml").html();
    var ReplyLiID = "ReplyLiID_" + DiscussID;
    var after = replyContentHtml.replace(reg, function (node, key) {
        return {
            'ReplyLiID': ReplyLiID,
            "DiscussID": DiscussID,
            "ReceiveUserID": ReceiveUserID
        }[key];
    });
    $("#li_" + DiscussID).after(after);
    BuildFuryText();
    $.ajax({
        url: _websiteName + '/ReportStudent/SLabSource/GetReplyByParentID',
        type: 'post',
        data: {
            ParentID: DiscussID
        },
        success: function (res) {
            if (res.IsSuccess) {
                for (var i = 0; i < res.Data.length; i++) {
                    var replyHisContent = $("#replyHisContent").html();
                    var replyListHtml = replyHisContent.replace(reg, function (node, key) {
                        return {
                            'UserName': res.Data[i].UserName,
                            'ReplyDate': res.Data[i].ReplyDate,
                            'Content': res.Data[i].Content,
                            'ReceiveUserName': res.Data[i].ReceiveUserName,
                            'ReplyDiscussContainerID': "ReplyLiID_" + res.Data[i].ParentID + "_" + res.Data[i].DiscussID,
                            'UserID': res.Data[i].UserID,
                            'ParentID': res.Data[i].ParentID,
                            'ReplyDiscussID': res.Data[i].DiscussID,
                            'ParentReceiveUserID': ReceiveUserID,
                            'ReceiveUserID': res.Data[i].ReceiveUserID
                        }[key];
                    })
                    $("#" + ReplyLiID + " #hisReply").append(replyListHtml);

                    //更新当前层回复条数
                    $("#li_" + DiscussID + " .ShowReplyBtn").html("回复(" + res.Data.length + ")");
                }
            }
        }
    })
}

function HideReply(DiscussID) {
    $("#replyShow_" + DiscussID).show();
    $("#replyHide_" + DiscussID).hide();
    var ReplyLiID = "ReplyLiID_" + DiscussID;
    $("#" + ReplyLiID).remove();
}

function ReplyFunction(DiscussID, ReceiveUserID) {
    var val = $("#ReplyLiID_" + DiscussID + " #answer").val();
    if (val == "") {
        bootbox.alert("发送内容不能为空，请重新输入！");
        return false;
    } else {
        $.ajax({
            type: 'post',
            url: _websiteName + '/ReportStudent/SLabSource/AddReply',
            data: {
                UserID: _userInfo.UserID,
                UserName: _userInfo.UserName,
                LabID: _CurrentLabID.LabID,
                Content: val,
                UserRole: RoleType,
                ReceiveUserID: ReceiveUserID,
                ParentID: DiscussID
            },
            success: function (result) {
                if (result.IsSuccess) {
                    $(".wysiwyg-editor").empty();
                    BuildFuryText();

                    //刷新当前层
                    $("#ReplyLiID_" + DiscussID).remove();
                    ShowReply(DiscussID, ReceiveUserID);
                } else {
                    // bootbox.alert(result.Data);
                }
            }
        });
    }
}

//回复个人输入框，提交按钮显示
function ShowReplyToThisPersin(ReplyDiscussID, ParentID, ReceiveUserID, ParentReceiveUserID) {
    $(".ReplyAreaContainer").remove();

    var replyHtml = $("#ReplyToPersonHtml").html();
    replyHtml = replyHtml.replace(reg, function (node, key) {
        return {
            'ReplyDiscussID': ReplyDiscussID,
            "ParentID": ParentID,
            "ReceiveUserID": ReceiveUserID,
            "ParentReceiveUserID": ParentReceiveUserID
        }[key];
    });

    //当前模块添加输入框和提交按钮
    $("#ReplyLiID_" + ParentID + "_" + ReplyDiscussID).append(replyHtml);
    BuildFuryText();
}

//回复个人提交
function ReplyToPersonCommit(ParentID, ReceiveUserID, ParentReceiveUserID) {
    var Content = $(".ReplyAreaContainer .editorClass").val();
    if (Content == "") {
        bootbox.alert("发送内容不能为空，请重新输入！");
        return false;
    } else {
        $.ajax({
            type: 'post',
            url: _websiteName + '/ReportStudent/SLabSource/AddReply',
            data: {
                UserID: _userInfo.UserID,
                UserName: _userInfo.UserName,
                LabID: _CurrentLabID.LabID,
                Content: Content,
                UserRole: RoleType,
                ReceiveUserID: ReceiveUserID,
                ParentID: ParentID
            },
            success: function (result) {
                if (result.IsSuccess) {
                    $(".wysiwyg-editor").empty();
                    BuildFuryText();

                    //刷新当前层
                    $("#ReplyLiID_" + ParentID).remove();
                    ShowReply(ParentID, ParentReceiveUserID);
                } else {
                    bootbox.alert(result.Data);
                }
            }
        });
    }
}


