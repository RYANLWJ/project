$(function () {

    //NOTE 顶部用户信息提示
    if (getCookie('username')) {
        var $username = getCookie('username');
        console.log($username)
        $('#welcome .login-inf').html($username + '欢迎您');
        $('#welcome .login-inf').attr("disabled", true).css("pointer-events", "none");;
    } else {
        console.log(123)
        $('#welcome .login-inf').html('请登录选购哦');
        $('#welcome .login-inf').attr('disabled', '').css("pointer-events", "auto");;

    }







    //NOTE 请求数据
    $(function () {
        var $p = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                url: '../api/getmaindata.php',
                dataType: 'json',
                success: function (str) {
                    resolve(str)
                    console.log(str)
                }
            })
        })

        $p.then(function (str) {
            var arr = str; //返回的json数组
            var list1 = new HotWrapShow('hot-one-list', arr, 0, 4);
            var list2 = new HotWrapShow('hot-two-list', arr, 4, 8);
            var list3 = new HotWrapShow('hot-three-list', arr, 8, 12);
            var list4 = new HotWrapShow('hot-four-list', arr, 12, 16);
            var floor_1_list = new FloorWrapShow('floor-one-list', arr, 16, 35);
            var floor_2_list = new FloorWrapShow('floor-two-list', arr, 35, 55);
            var floor_3_list = new FloorWrapShow('floor-three-list', arr, 54, 79);
            var floor_4_list = new FloorWrapShow('floor-four-list', arr, 73, 98);
            var floor_5_list = new FloorWrapShow('floor-five-list', arr, 92, 117);
            var floor_6_list = new FloorWrapShow('floor-six-list', arr, 111, 136);
            $('<dt class="tt">1F 家庭常备</dt>').insertBefore($('#jianke').find('.floor-item').eq(0));
            $('<dt class="tt">2F 专科用药</dt>').insertBefore($('#jianke').find('.floor-item').eq(1));
            $('<dt class="tt">3F 男性专区</dt>').insertBefore($('#jianke').find('.floor-item').eq(2));
            $('<dt class="tt">4F 老年专区</dt>').insertBefore($('#jianke').find('.floor-item').eq(3));
            $('<dt class="tt">5F 营养滋补</dt>').insertBefore($('#jianke').find('.floor-item').eq(4));
            $('<dt class="tt">6F 医疗器械</dt>').insertBefore($('#jianke').find('.floor-item').eq(5));
        })

    })

    HotWrapShow = function (id, arr, a, b) {
        this.wrap = getId(id);
        this.newarr = arr.slice(a, b);
        //截取部分所需数据
        this.init();
    }

    HotWrapShow.prototype.init = function () {
        this.res = this.newarr.map(function (item) {
            return `<dd class="sub-tiem">
                    <div>
                        <img src="${item.img}" alt="">
                    </div>
                    <ul>
                        <li>${item.hottitle}</li>
                        <li>${item.hotsub}</li>
                    </ul>
                     </dd>`
        }).join('')
        // console.log(res)
        this.wrap.innerHTML = this.res;
    }

    FloorWrapShow = function (id, arr, a, b) {
        this.wrap = getId(id);
        this.newarr = arr.slice(a, b)
        //截取部分所需数据
        this.init();
    }

    FloorWrapShow.prototype.init = function () {
        this.arr_logo1 = this.newarr.slice(0, 1);
        this.arr_logo1_items = this.newarr.slice(1, 5);
        this.arr_logo1_imgs = this.newarr.slice(5, 9);
        this.arr_logo2 = this.newarr.slice(9, 10);
        this.arr_logo2_items = this.newarr.slice(10, 12);
        this.arr_ctr_cons = this.newarr.slice(12, 16);
        this.arr_right_cons = this.newarr.slice(16, 19);

        this.res_1 = this.arr_logo1.map(item => {
            return `
                <dd class="sub-left-wrap fl">
                <ul class="logo-p1 fl">
                <img src="${item.img}" alt="">
                <div class="con-p1">
            `
        }).join('')

        this.res_2 = this.arr_logo1_items.map(item => {
            return `
            <a class="fl" href="">${item.hottitle}</a>
            `
        }).join('')

        this.res_3 = this.arr_logo1_imgs.map(item => {
            return `<a class="fl" href="">
            <img src="${item.img}" alt=""></a>
            `
        }).join('')

        this.res_4 = this.arr_logo2.map(item => {
            return `
                    </div>
                 </ul>
                <ul class="logo-p2 fl">
                <img src="${item.img}" alt="">
                <div class="con-p2">
            
            `
        }).join('')

        this.res_5 = this.arr_logo2_items.map(item => {
            return `
            <a href="">${item.hottitle}</a>
            
            `
        }).join('')

        this.res_6 = ' </div></ul></dd><dd class="sub-ctr-wrap fl">'

        this.res_7 = this.arr_ctr_cons.map(item => {
            return `
            <a href="" class="fl">
                <span>${item.hottitle}</span>
                <div><img src="${item.img}" alt=""></div>
            </a>
            `
        }).join('')

        this.res_8 = '</dd><dd class="sub-right-wrap fl">';

        this.res_9 = this.arr_right_cons.map(item => {
            return `
            <a href="">
                <span>${item.hottitle}</span>
                <div><img src="${item.img}" alt=""></div>
            </a>
            `
        }).join('')

        this.res_10 = '</dd>';
        this.res = this.res_1 + this.res_2 + this.res_3 +
            this.res_4 + this.res_5 + this.res_6 + this.res_7 + this.res_8 +
            this.res_9 + this.res_10;
        this.wrap.innerHTML = this.res;
    }


    //NOTE 顶部轮播文字功能

    $(function () {
        var $count = 17;
        var timmerTop = setInterval(move, 2000);
        var $ih = $('.autotext').height() //文字盒子高度
        var $length = $('.autotext').size() //文字盒子个数

        function move() {
            $('#play-tt').find('.autotext').animate({
                'top': -$count + 'px'
            }, 300)
            $count = $count + $ih;
            $count = $count >= $ih * $length ? 0 : $count;
        }
    })





    //NOTE 底部友情链接选项卡功能


    console.log($('#friend-link-wrap .btn'));


    $('#friend-link-wrap .btn').mouseover(function () {
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
        $(this)
            .siblings()
            .find('a')
            .css('color', 'black');
        $(this)
            .children()
            .css('color', '#0691f9');
        $('#friend-link-wrap')
            .find('.con')
            .eq($(this).index())
            .show()
            .siblings()
            .hide();

    });

    $('#health-pro-wrap .btn').mouseover(function () {
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
        $(this)
            .siblings()
            .find('a')
            .css('color', 'black');
        $(this)
            .children()
            .css('color', '#0691f9');
        $('#health-pro-wrap')
            .find('.con')
            .eq($(this).index())
            .show()
            .siblings()
            .hide();
    });















    //NOTE banner轮播图

    var $num = 0; //控制层级变化
    console.log($('#side-show .layer').size());

    function sideShow() {
        // console.log($num)
        $('#side-show .layer')
            .eq($num)
            .css('z-index', $num + 1)
            .animate({
                'opacity': '1'
            }, 400)
            .siblings('.layer')
            .css({
                'z-index': '0',
                'opacity': '0.6'
            });

        $('#side-show .dot-wrap')
            .eq($num)
            .addClass('active') //显示焦点
            .parent()
            .siblings()
            .find('.dot-wrap')
            .removeClass('active') //隐藏焦点


        $num = ++$num < $('#side-show .layer').size() ? $num : 0;

    }
    var timmer = setInterval(sideShow, 2500);

    $('#side-show').on('mouseover', function () {
        clearInterval(timmer); //鼠标滑入轮播图时清除定时器
        $(this)
            .find('.pre-btn,.nxt-btn')
            .addClass('active');
    })
    $('#side-show').mouseout(function () {
        timmer = setInterval(sideShow, 2500); //鼠标移出轮播图时,激活定时器
        $(this)
            .find('.pre-btn,.nxt-btn')
            .removeClass('active');


    })

    $('#side-show .focus-bar')
        .find('a')
        .hover(function () {
            $num = $(this).index();
            $('#side-show .layer')
                .eq($num)
                .css('z-index', $num + 1)
                .animate({
                    'opacity': '1'
                }, 400)
                .siblings('.layer')
                .css({
                    'z-index': '0',
                    'opacity': '0.6'
                });
            $(this)
                .find('.dot-wrap')
                .addClass('active')
                .parent()
                .siblings()
                .find('.dot-wrap')
                .removeClass('active');



        }, function () {
            $('#side-show')
                .find('.dot-wrap')
                .removeClass('active')
        })


    $('#side-show .nxt-btn') //点击显示下一张
        .click(function () {
            sideShow();
        })

    $('#side-show .pre-btn') //点击显示下一张
        .click(function () {

            $('#side-show .layer')
                .eq($num)
                .css('z-index', $num + 1)
                .animate({
                    'opacity': '1'
                }, 400)
                .siblings('.layer')
                .css({
                    'z-index': '0',
                    'opacity': '0.6'
                });

            $('#side-show .dot-wrap')
                .eq($num)
                .addClass('active') //显示焦点
                .parent()
                .siblings()
                .find('.dot-wrap')
                .removeClass('active') //隐藏焦点
            $num = --$num < 0 ? $('#side-show .layer').size() : $num;
        })



    // NOTE 底部右侧轮播图

    $(function () {
        var myApi2 = new Myapi();
        myApi2.JSON.lagout($('.J_banner2'), 3000, 10);

    })


    // NOTE 右侧回到顶部特效跟动作

    $(function () {
        $('#back-to-top .top-btn').mouseover(function () {
            $('#back-to-top .code-img').animate({
                'right': '-1px'
            }, 200)
            return false;
        })
        $('#back-to-top .opacity-cover').mouseout(function () {
            console.log($(this))
            $('#back-to-top .code-img')
                .animate({
                    'right': '-400px'
                }, 200)
            return false;
        })




        $(window).scroll(function () {

            if ($(window).scrollTop() >= 1200) {
                console.log(1234)
                $("#back-to-top .to-top-action").fadeIn(300); // 开始淡入
            } else {
                $("#back-to-top .to-top-action").stop(true, true).fadeOut(300); // 如果小于等于 200 淡出
            }
        });
        $("#back-to-top .to-top-action").click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 200);
            return false;
        })
    })


    // NOTE 左侧导航栏
    $(function () {
        console.log($('#menu .box').find('.hide'));
        $('#menu .items')
            .find('li')
            .mouseover(function () {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
                    .children()
                    .find('a')
                    .removeClass('move');


                $(this).find('a').addClass('move');

                $('#menu .box')
                    .find('.hide')
                    .eq($(this)
                        .index())
                    .show()
                    .siblings()
                    .hide();

            })

        $('#side-show,h1')//鼠标从内容区移入轮播图时隐藏内容和导航特效恢复正常
            .on('mouseover', function () {
                $('#menu .hide')
                    .hide();
                $('#menu .items')
                    .find('li')
                    .removeClass('active')
                    .children()
                    .find('a')
                    .removeClass('move');
            })
        $('#side-show ,.main').on('mouseout', function () {
            $('#menu .items')
                .find('li')
                .removeClass('active')
                .children()
                .find('a')
                .removeClass('move');
            $('#menu .box')
                .find('.hide')
                .hide();

            return false;

        })


    })


    //NOTE 左侧二级导航内容渲染
$(function(){
    var arr = [{
        dtData: '肝胆用药',
        ddData: ['肝胆用药', '肝硬化', '肝胆囊', '胆结石', '脂肪肝']
    },
    {
        dtData:'推荐产品',
        ddData:['恩甘定','贝双定','代订','双环醇片','美能','润众','贺普丁','雷易得','博路定']
    },
    {
        dtData:'推荐产品',
        ddData:['恩甘定','贝双定','代订','双环醇片','美能','润众','贺普丁','雷易得','博路定']
    }
   
]

var content = arr.map(item=>{
    return`
            <dl class="main-title">
            <dt>${item.dtData}</dt>
            <dd>
            ${item.ddData.map(item=>{
                return `
                <a href="###">${item}</a>
                `
            }).join('')}
            </dd>
            </dl>
    `
}).join('')

    $('.hide').html(content);
})
 





   














})