$(function () {

  $('.login-form-wrap').on('click', 'a', function () {
    $(this).css('border-color', '#0d8dfd').siblings().css('border-color', 'white');
    console.log($('.form-con-wrap').find('form'));
    $('.form-con-wrap').find('form').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
  })

  // NOTE 验证码显示
  var $verCodeRes = verCode();
  $('#form .ver-code').html($verCodeRes);
  $('#form .ver-code').click(function () {
    $verCodeRes = verCode();
    $('#form .ver-code').html($verCodeRes);
  })

  // NOTE 表单数据

  $('#form input').on('blur', function () {
    var $val = $(this).val().trim();
    var $index = $(this).parent().index();//获取当前点击元素的下标
    if ($val) {
      var $checked = checkReg[keyName[$index]]($val);//进入正则验证,利用下标匹配对应的正则判断函数
      if ($checked) {
        $(this).attr('data-is', 'ok')//如果通过,则添加一个自定义属性来标记以便提交前进行遍历判断
        $(this).parent().find('.info-msg').html('');
        $(this).css('border-color', '#ddd');
      } else {
        $(this).siblings('.info-msg').html('输入错误,请重新输入');
        $(this).siblings('.info-msg').css('color', '#c23')
        $(this).css('border-color', '#c33')
        $(this).attr('data-is', 'no')
      }
    } else {
      $(this).parent().find('.info-msg').html('不能为空');
      $(this).parent().find('.info-msg').css('color', '#c33');
      $(this).css('border-color', '#c33');

    }
  })

  $('#login-btn').click(function () {
    // TODO ...
    if ($('#agree').prop('checked')) {//判断用户是否已经同意法律条款
      for (var i = 0; i < $('#form').find('p').size(); i++) {
        console.log($('#form input').eq(i).attr('data-is'))
        if ($('#form input').eq(i).attr('data-is') == 'no') { //如果循环检测到上面输出有isok false,这里将返回"重新注册"
          console.log($('#form input').eq(i).attr('data-is'))
          alert('请检查输入')
          return;
        }
      }
      // TODO ...
      // alert('ready');
      $.ajax({
        type:'post',
        url:'../api/getuserdata.php',
        data:{'tel_Num':$('#tel-num-input').val()},
        
        success:function(str){
            console.log(str)
            if(str=='alreadyhave'){
                // alert('登陆成功')
                location.href = 'main.html';//跳转到主页
                setCookie('username', $('#tel-num-input').val(), 7);//设置cookie 的用户名
  
            }else{
                alert('用户不存在')
            }
        }
    })




    } else {
      alert('请先阅读并同意健客网使用条款');
    }
  })






  //NOTE 正则判断函数
  var checkReg = {
    tel: function (str) { //验证手机号码
      var reg = /^1[3-9]\d{9}$/;
      return reg.test(str);
    },
    verCodeCk: function (str) { //验证随机数

      if (str == $verCodeRes) {
        return true;
      } else {
        return false;
      }
    },
    msgCk: function (str) { //验证短信
      if (str == $msgCode) {
        return true;
      } else {
        return false;
      }

    }
  }

  var keyName = []; //声明一个数组来存正则数组里的键名
  getKeyFromObj(checkReg, keyName); //遍历json对象获取键名
  console.log(keyName)







  //TODO 点击发送短信验证码
  var $msgCode = '';
  $('#form .msg-code').click(function () {

    var $num = $('#tel-num-input').val().trim();
    var $verCodeInput = $('#ver-code-input').val();
    console.log($num);
    $msgCode = verCode();
    if ($num && $verCodeInput) {
      var $p = new Promise(function (resolve) {
        $.ajax({
          type: 'post',
          url: '../api/msgcodedatalink.php',
          data: {
            'tel_Num': $num,
            'msg_Code': $msgCode
          },
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
        if (str) {
          $(this).html('发送成功');
        } else {
          $(this).html('发送失败');
        }
      })

      timeInterval();
    } else {
      alert('请先输入手机号码和验证码')
    }
  })

  // NOTE 倒计时显示
  function timeInterval() {
    var timeSec = 59;
    var timeStr = '';
    $("#form .msg-code").attr("disabled", "disabled");
    var codeTime = setInterval(function Internal() {
      if (timeSec == 0) {
        $("#form .msg-code").html("发送手机验证码");
        $("#form .msg-code").removeAttr("disabled", "disabled");
        clearInterval(codeTime);
        return;
      }
      timeStr = "(" + timeSec + ")秒后获取手机验证码";
      $("#form .msg-code").html(timeStr);
      timeSec--;
    }, 1000);
  }




})