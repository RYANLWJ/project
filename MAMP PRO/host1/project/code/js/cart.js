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


    // NOTE 获取数据库相应的数据
    var $p = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            url: '../api/droptocart.php',
            dataType: 'json',
            success: function (str) {
                resolve(str);
            }
        })



    })

    $p.then(function (str) {
        console.log(str)
        create(str); //渲染
        tolPrice() //件数增减,以及价格计算

    })




    function create(str) {
        var newarr = str.orderdata;
        var $res = newarr.map(item => {
            return `
            <li class="item clearfix">
            <dt class="fl choose">
                <input type="checkbox" name="user" class="check">
            </dt>
            <dd class="fl main-pic">
                <a href="###">
                    <img src="${item.img}" alt="">
                </a>
            </dd>
            <dd class="fl name">
                    <a>${item.goodsname}</a>
                </dd>
            <dd class="fl size">
                <span>${item.size}</span>
            </dd>
            <dd class="fl price">
                <span class="currprice">${item.currprive}</span>
                <span class="origprice">${item.origprice}</span>
            </dd>
            <dd class="fl qty">
                <a class="dec" href="###">-</a>
                <input type="text" name="user" id="quan-input" value="${item.quan}">
                <a href="###" class="add">+</a>
            </dd>
            <dd class="fl total">
                <span>${item.total}</span>
            </dd>
            <dd class="fl fav">
                <a href="###">移入收藏夹</a>
                <a href="###">删除</a>
            </dd>
           
         </li>  
            
            `
        }).join('');


        $('#order-wrap').html($res);
    }

    function tolPrice() {

        console.log($('#order-wrap .currprice').html().substring(1))
        var $price = $('#order-wrap .currprice').html().substring(1); //切割掉¥这个符号
        var $qty = $('#quan-input').val()
        var $pcs = 0; //件数初始值
        $('.pcs').html('已选择' + $pcs + '件商品');
        $('#order-wrap .add').on('click', function () {

            var $price = $(this).parent().siblings().find('.currprice').html().substring(1); //切割掉¥这个符号
            var $qty = $(this).siblings('input').val();
            if ($qty >= 1) {
                $qty++;
                console.log($(this).siblings('input').val())
                $(this).siblings('input').val($qty);
                var $tol = $price * $qty;
                console.log($tol);
                $tol = $tol.toFixed(2);
                $(this)
                    .parent()
                    .siblings('.total')
                    .find('span')
                    .html($tol); //显示总价
                finalPrice();

            } else {
                alert('数量最少为1')
            }


        })



        $('#order-wrap .dec').click(function () {
            var $price = $(this).parent().siblings().find('.currprice').html().substring(1); //切割掉¥这个符号
            var $qty = $(this).siblings('input').val();

            if ($qty > 1) {
                $qty--;
                console.log($(this).siblings('input').val())
                $(this).siblings('input').val($qty);
                var $tol = $price * $qty;
                console.log($tol);
                $tol = $tol.toFixed(2);
                $(this)
                    .parent()
                    .siblings('.total')
                    .find('span')
                    .html($tol); //显示总价
                finalPrice();

            } else {
                alert('数量最少为1')
            }


        })

        // NOTE 底部提交订单的数据显示

        function finalPrice() {
            var item_length = $('#order-wrap .item').size();
            var final_price = 0;

            for (var $i = 0; $i < item_length; $i++) {
                final_price += $('#order-wrap .item')
                    .eq($i)
                    .find('.total')
                    .find('span')
                    .html() * 1; //转换成数字类型
            }
            console.log(final_price);
            $('#check-out-wrap .final-price').html('¥' + final_price); //所有商品总价

            console.log(item_length)

            //   NOTE 全选反选功能 (关键点,全选框按键,单选框按键,单选框条数) -N
            $('#order-wrap .check').click(function () {
                var $pcs = 0; //件数初始值
                if ($(this).prop('checked')) { //判断当前选框是否被选中,如果选中了则添加一个自定义属性记录
                    $(this).attr('data', 'chosen');
                } else {
                    $(this).attr('data', ''); //否则,取消这个自定义属性
                }

                $pcs = $(".check[data='chosen']").size(); //获取自定义属性相同的个数(用在检测有多少个被选择),注意格式,有双引号在里面;
                console.log($pcs)
                $('.pcs').html('已选择' + $pcs + '件商品');
                for (var $i = 0; $i < item_length; $i++) {
                    if (!$('#order-wrap .item')
                        .eq($i)
                        .find('.check')
                        .prop('checked')
                    ) {


                        $('.select-all').prop('checked', false);

                        return;
                    }

                }
                $('.select-all').prop('checked', 'checked');



            })
            $('.select-all').click(function () {
                console.log(item_length)
                for (var $i = 0; $i < item_length; $i++) {
                    if (!$('#order-wrap .item') //如果发现有没勾选的,就全部勾选,并终结之后要执行的语句
                        .eq($i)
                        .find('.check')
                        .prop('checked')
                    ) {

                        $('#order-wrap .item')
                            .find('.check')
                            .prop('checked', 'checked')
                            .attr('data', 'chosen');
                        $pcs = $(".check[data='chosen']").size();
                        $('.pcs').html('已选择' + $pcs + '件商品');
                        $('.select-all').not($(this)).prop('checked', 'checked');
                        return;
                    }
                }
                $('#order-wrap .item')
                    .find('.check')
                    .prop('checked', false)
                    .attr('data', '');
                $pcs = $(".check[data='chosen']").size();
                $('.pcs').html('已选择' + $pcs + '件商品');
                $('.select-all').not($(this)).prop('checked', false);


            })




        }
        finalPrice();
































    }


























})