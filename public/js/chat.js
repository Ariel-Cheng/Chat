//var a = 3;
//$(".chat03_content li").mouseover(function () {
//    $(this).addClass("hover").siblings().removeClass("hover")
//}).mouseout(function () {
//    $(this).removeClass("hover").siblings().removeClass("hover")
//}),
//
//$(".chat03_content li").dblclick(function () {
//        var b=$(this).index()+1;
//        a=b;
//        $(".chat01_content").scrollTop(0),
//            $(this).addClass("choosed").siblings().removeClass("choosed"),
//            $(".dialog .head span").text($(this).children(".chat03_name").text()),
//            $(".mes" + b).show().siblings().hide()
//}),

$(document).ready(function () {
    //获取从上一个页面传过来的参数
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }

    var user = GetQueryString("username");
    $('#userID').html(user);

    //document.getElementById('userID').innerHTML = GetQueryString("username");

    $('.search-icon').click(function () {

    });


    //双击弹出对话框,适用于现在还有未来创建的元素

    var a = 3;
    $(".chat03_content ul").on("mouseover", "li", function () {
        $(this).addClass("hover").siblings().removeClass("hover");
    });
    $(".chat03_content ul").on("mouseout", "li", function () {
        $(this).removeClass("hover").siblings().removeClass("hover");
    });
    $(".chat03_content ul").on("double click", "li", function () {
        var b = $(this).index() + 1;
        a = b;
        $(".chat01_content").scrollTop(0),
            $(this).addClass("choosed").siblings().removeClass("choosed"),
            $(".dialog .head span").text($(this).children(".chat03_name").text()),
            $(".dialog .head span").attr("username", $(this).children(".chat03_name").attr("username")),
            $(".mes" + b).show().siblings().hide();
    });


    //消息框发送消息

    $(".dialog-footer .send").click(function () {
        var e = new Date;
        f = "";
        f += e.getFullYear() + "-";
        f += e.getMonth() + 1 + "-";
        f += e.getDate() + "  ";
        f += e.getHours() + ":";
        f += e.getMinutes() + ":";
        f += e.getSeconds();
        var g = $("#textarea").val();


        if (null != g && "" != g) {
            var dialogfriendname = $(".dialog .head span").attr("username");
            $.ajax({
                url: '/send',
                type: 'post',
                data: {
                    to:dialogfriendname,
                    msg: filterXSS(g)
                } ,
                success: function () {
                    var i = "<div class='message'>" + "<div class='wrap-text'>" + "<h5 >" + user + "</h5>" + "<div>" + filterXSS(g) + "<div class='arrow'>" + "</div>" + "</div>" + "</div>" + "<div class='wrap-ri'>" + "<div ><span>" + f + "</span></div>" + "</div>" + "<div style='clear:both;'></div>" + "</div>";
                    $(".mes" + a).append(i);

                },
                error: function () {
                    alert("消息发送失败！");
                }
            });
        } else {
            alert('请输入内容');
        }

        $(".dialog-content").scrollTop($(".mes" + a).height());
        $("#textarea").val("");
    });


//显示好友列表
    var FriendlistArr = new Array();

    function getfriendslist() {
        var temp = "";
        $.ajax({
            url: '/getFriendList',
            type: 'post',
            success: function (mes) {
                var str = eval(mes);
                if (str.friends.length > 0) {//返回有数据
                    for (var i = 0; i < str.friends.length; i++) {//循环json，生成需要的标签
                        temp += "<li ><lable class='online'></lable><a  class='chat03_name' username=" + str.friends[i].username + " >" + str.friends[i].nickname + "</a></li>";
                        FriendlistArr[i] = new Array();
                        FriendlistArr[i][0] = str.friends[i].nickname;
                        FriendlistArr[i][1] = str.friends[i].username;
                    }
                    $(".chat03_content ul").html("");
                    $(".chat03_content ul").append(temp); //追加新的
                }
                else {
                    $(".chat03_content ul").html(" <font color='#999'>欢迎使用DirectChat，快点添加好友，开心聊天吧</font>"); //无数据时的提示
                }
            }
        })
    }

    getfriendslist();//页面加载完就执行一次


//添加好友
    $(".search-icon").click(function () {
        var frName = $(".search-input").val();
        if (frName == "" || frName == null) {
            alert('请填写好友的账号');
        } else {
            $.ajax({
                url: '/addFriend',
                type: 'POST',
                data: 'friend=' + frName,
                success: function () {
                    getfriendslist();
                },
                error: function () {
                    alert("此用户不存在或已存在用户列表");
                }
            })
        }
        $(".search-input").val("");
    });


//接收消息
    function getmessage() {

        if (FriendlistArr != null && "" != FriendlistArr) {//返回有数据

            for (var i = 0; i < FriendlistArr[0].length; i++) {
                (function (j, nickname, username) {
                    $.ajax({
                        url: '/get',
                        type: 'POST',
                        data: 'to=' + username,
                        async: true,
                        success: function (h) {
                            //var h = eval(ms);
                            if (h.msg.length > 0) {
                                $(".chat03_content li").eq(j).css({'color': '#F8C301'});

                                if ($("#lu").text() == nickname) {
                                    var f = "";
                                    for (var k = 0; k < h.msg.length; k++) {
                                        f += "<div class='message'><div class='wrap-text'><h5 >" + username + "</h5><div>" + filterXSS(h.msg[k].msg) + "<div class='arrow'>" + "</div>" + "</div>" + "</div>" + "<div class='wrap-ri'>" + "<div ><span>" + h.msg[k].time + "</span></div>" + "</div>" + "<div style='clear:both;'></div>" + "</div>";
                                    }
                                    $(".mes" + a).append(f);
                                    $(".chat03_content ul").children().eq(j).css({'color': 'black'});
                                    $(".dialog-content").scrollTop($(".mes" + a).height());
                                }
                            }

                        }
                    })
                }(i, FriendlistArr[i][0], FriendlistArr[i][1]))
            }
        }
        else {
            $(".chat03_content ul").html(" <font color='#999'>欢迎使用DirectChat，快点添加好友，开心聊天吧</font>"); //无数据时的提示
        }
        setTimeout(getmessage, 3000);
    }

    getmessage(); //首次立即加载
    //window.setInterval(getmessage,3000); //循环执行！！


    //实现聊天窗口的拖拽
    var left, top, $this;
    $(document).delegate('.dialog .head', 'mousedown', function (e) {
        left = e.clientX, top = e.clientY, $this = $(this).css('cursor', 'move');
        this.setCapture ? (
            this.setCapture(),
                this.onmousemove = function (ev) {
                    mouseMove(ev || event);
                },
                this.onmouseup = mouseUp
        ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
    });
    function mouseMove(e) {
        var target = $this.parents('.dialog');
        var l = Math.max((e.clientX - left + Number(target.css('margin-left').replace(/px$/, '')) || 0), -target.position().left);
        var t = Math.max((e.clientY - top + Number(target.css('margin-top').replace(/px$/, '')) || 0), -target.position().top);
        l = Math.min(l, $(window).width() - target.width() - target.position().left);
        t = Math.min(t, $(window).height() - target.height() - target.position().top);
        left = e.clientX;
        top = e.clientY;
        target.css({'margin-left': l, 'margin-top': t});
    }

    function mouseUp(e) {
        var el = $this.css('cursor', 'default').get(0);
        el.releaseCapture ?
            (
                el.releaseCapture(),
                    el.onmousemove = el.onmouseup = null
            ) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
    }

});