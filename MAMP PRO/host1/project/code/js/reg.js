$(function () {
    var $tel_num = $('#tel'),
        $password1 = $('#set-psw'),
        $password2 = $('#ver-psw'),
        $ver_code = $('#ver-code-input'),
        $msg_code = $('#msg-code-input');


     $('#form input').attr('data-is','no');

    $('#form').on('blur', 'input', function () {
        var $val = ($(this).val().trim());
        var $index = $(this).parent().index();
        console.log($(this))
        if ($val) {
            var $checked = checkReg[keyName[$index]]($val);
            console.log($checked)
            if (!$checked) {
                $(this).siblings('.info-msg').html('输入错误,请重新输入');
                $(this).css('border-color', '#c33')
                $(this).attr('data-is','no')
            } else {
                $(this).siblings('.info-msg').html('恭喜您,输入正确').css('color','green');
                $(this).css('border-color', '#ddd')
                $(this).attr('data-is','ok')
            }
        }else{
            $(this).siblings('.info-msg').html('内容不能为空哦');
            $(this).css('border-color', '#c33')
        }
    })


    $('#reg-btn').click(function(){
        $number =$('#tel').val();
        $password =$('#set-psw').val();

        console.log($number,$password)
        if($('#agree').prop('checked')){
        for(var i = 0; i < $('#form').find('p').size()-2; i++) {
            console.log($('#form input').eq(i).attr('data-is'))
            if ($('#form input').eq(i).attr('data-is')=='no') { //如果循环检测到上面输出有isok false,这里将返回"重新注册"
                console.log($('#form input').eq(i).attr('data-is'))
                            alert('请检查并重新注册')
                            return;
                        }
        }
        // alert('注册成功')
        $.ajax({
            type:'post',
            url:'../api/getuserdata.php',
            data:{'tel_Num':$number,'psw_code':$password},
            
            success:function(str){
                console.log(str)
                if(str=='finished'){
                    alert('恭喜您,注册成功')
                }else{
                    alert('您已注册过了哦')
                }
            }
        })
    }else{
        alert('请先阅读并同意注册条款')
    }
       
    })
 




    //TODO 点击发送短信验证码
    var $msgCode = '';
    $('#form .get-msg-code').click(function () {

        var $num = $('#tel').val().trim();
        console.log($num);
        $msgCode = verCode();
        if($num&&$ver_code.val()){
        var $p = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                url: '../api/msgcodedatalink.php',
                data: { 'tel_Num': $num, 'msg_Code': $msgCode },
                dataType: 'json',
                success: function (str) {
                    resolve(str)
                    console.log(str)
                }
            })
        })


        $p.then(function (resolve) {
            //TODO 待完成
            console.log(str)
            if(str){
                $(this).html('发送成功');
            }else{
                $(this).html('发送失败');
            }
        })

        timeInterval();
    }else{
        alert('请先输入手机号码和验证码')
    }
    })

    // NOTE 倒计时显示
    function timeInterval(){
          var timeSec = 59;
          var timeStr = '';
        $("#form .get-msg-code").attr("disabled","disabled");
          var codeTime = setInterval(function Internal(){
            if (timeSec == 0){
              $("#form .get-msg-code").html("发送手机验证码");
              $("#form .get-msg-code").removeAttr("disabled","disabled");
              clearInterval(codeTime);
              return;
            }
            timeStr = "("+timeSec+")秒后获取手机验证码";
            $("#form .get-msg-code").html(timeStr);
            timeSec--;
          },1000);
        }

   



    //NOTE 点击更换验证码

    var $verCodeRes = verCode();
    $('#form .ver-code').html($verCodeRes);
    $('#form .chgbtn').click(function () {
        $verCodeRes = verCode();
        $('#form .ver-code').html($verCodeRes);
    })




    //NOTE 正则判断函数
    var checkReg = {
        tel: function (str) { //验证手机号码
            var reg = /^1[3-9]\d{9}$/;
            return reg.test(str);
        },
        verCodeCk: function (str) {//验证随机数

            if (str == $verCodeRes) {
                return true;
            } else {
                return false;
            }
        },
        msgCk: function (str) {//验证短信
            if (str == $msgCode) {
                return true;
            } else {
                return false;
            }

        },
        passStrength: function (str) { //验证密码是否满足条件
            var reg = /^[\w_-]{6,16}$/;
            return reg.test(str);
        },
        pswMatchCk: function (str) {//验证两次是否一样
            if (str == $password1.val()) {
                return true;
            } else {
                return false;
            }

        }
    }

    var keyName = []; //声明一个数组来存正则数组里的键名
    getKeyFromObj(checkReg, keyName); //遍历json对象获取键名
    console.log(keyName)

})