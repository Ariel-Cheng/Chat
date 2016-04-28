$(function(){

    $("#goRegister").click(
            function(){
                window.location='/signup';
            }
    )
    $("#submit").click(
        function(){
            var username=document.getElementById("username");
            var password=document.getElementById("password");
            if(username.value==""){
                alert("请输入用户名...");
                username.focus();
                return;
            }
            if(password.value==""){
                alert("请输入密码...");
                password.focus();
                return;
            }
            else{
                $.ajax({
                    url:'/login',
                    type: 'post',
                    data:'username='+username.value+'&password='+password.value+'',
                    success:function(msg){
                        // 这里定义的是一个回调函数，也就是服务端数据回来之后我该怎么处理的函数
                        var data=eval(msg);
                        if(data.status[0]== 0){
                            document.getElementById("msg").innerHTML='<span style="color:red;font-size:14px">'+
                                data+'...<a href="/login" style="color:blue;font-size:14px" >请重新登录</a></span>';
                        }else{
                            var adr='/?username='+username.value;
                            window.location.href=adr;
                            //document.form.submit();
                        }
                    },
                    error:function(){
                        alert("登录验证失败...请重新登录...");
                    }
                });
            }
        }
    )


})