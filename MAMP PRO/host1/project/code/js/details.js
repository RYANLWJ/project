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




    //NOTE 解析id名,获取数据,渲染内容
    var data = decodeURI(location
        .search); //?id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888&color=土豪金
    var id_name = data.slice(1); //获取id
    console.log(id_name);
    var box = getId('box');

    var $p = new Promise(function (resolve) {
        $.ajax({
            type: 'post',
            url: '../api/getdetailsdata.php',
            data: {
                'idname': id_name
            },
            dataType: 'json',
            success: function (str) {
                resolve(str);
                // console.log(str);
                // create(str);
                // selectEffect();//这个选项卡效果不要放在外面,否则会错乱或失效
                // quanCtrl();//数量控制
            }
        })
    })

    $p.then(function (str) {
        console.log(str)
        // var Quan_val = 1;
        create(str); //生成商品数据
        tapCtrl() //图片切换控制
        $(function () {
            $(".example").imagezoomsl();
        }); //放大镜插件
        dropToCart(); //加入购物车功能
        commnentCreate(str)
    })



    //NOTE 图片选项卡功能

    function tapCtrl() {
        $('#sub-pic li').mouseover(function () {
            //if判断小图片是否存在,存在才可以点击选择
            if ($(this)
                .find('img')
                .attr('src')
                .indexOf('jpg') != -1) {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active');

                $('#main-pic li')
                    .eq($(this).index())
                    .show()
                    .siblings()
                    .hide();
            }

        })
    }

    //NOTE 渲染
    function create(str) {
        var newarr = str.data; //获得的json数组
        var res = newarr.map(item => {
            return `
           <div class="goods-show-left fl">
           <ul class="main-pic" id="main-pic">
               <li><img class="example" src="${item.img}" alt=""></li>
               <li><img class="example" src="${item.simg2}" alt=""></li>
               <li><img class="example" src="${item.simg3}" alt=""></li>
               <li><img class="example" src="${item.simg4}" alt=""></li>
               <li><img class="example" src="${item.simg5}" alt=""></li>
           </ul>
           <ul class="sub-pic clearfix" id="sub-pic">
               <li class="fl"><img src="${item.simg1}" alt=""></li>
               <li class="fl"><img src="${item.simg2}" alt=""></li>
               <li class="fl"><img src="${item.simg3}" alt=""></li>
               <li class="fl"><img src="${item.simg4}" alt=""></li>
               <li class="fl"><img src="${item.simg5}" alt=""></li>
           </ul>
           <p class="sub-text">
               <span>温馨提示：</span>图片均为健客对原品的真实拍摄，仅供参考；如遇新包装上市可能存在更新滞后，请以实物为准！
           </p>
           <a class="fav-btn" href="###">
               <em></em>
               收藏商品
           </a>
       </div>
       <div class="goods-show-right fl">

           <h1>${item.goodsname}</h1>
           <p class="sub-tt">${item.content}</p>
           <dl class="app clearfix">
               <dt>【戳我下载APP 立省1000元】
                   <img src="../images/list/promise.jpg" alt="">
               </dt>
           </dl>
           <dl class="name clearfix">
               <dt> 通用名称:</dt>
               <dd>${item.goodsname}</dd>
               <dd><img src="${item.limited}" alt=""></dd>


           </dl>
           <dl class="procode clearfix">
               <dt> 产品编号:</dt>
               <dd>${item.procode}</dd>
           </dl>
           <dl class="apprnum clearfix">
               <dt> 批准文号:</dt>
               <dd>${item.aprrnum}</dd>
           </dl>
           <dl class="rate clearfix">
               <dt> 商品评分:</dt>
               <dd><img src="../images/list/star.jpg" alt=""></dd>
           </dl>
           <dl class="price clearfix">
               <dt> 价格:</dt>
               <dd>${item.currprive}</dd>

           </dl>
           <dl class="cupon clearfix">
               <dt> 优惠券:</dt>
               <dd>
                   <a class="fl" href=""><img src="../images/list/cupon-1.png" alt=""></a>
                   <a class="fl" href=""><img src="../images/list/cupon-2.png" alt=""></a>
                   <a class="fl" href=""><img src="../images/list/cupon-3.png" alt=""></a>
               </dd>

           </dl>
           <dl class="memo clearfix">
               <dt> 用药须知:</dt>
               <dd>请注意：不要与咖啡/可乐一起服用。</dd>
           </dl>
           <dl class="set clearfix">
               <dt> 选择套餐:</dt>
               <dd>
                   <a href="###">一件体验装</a>
               </dd>

           </dl>
           <dl class="size clearfix">
               <dt> 产品规格:</dt>
               <dd>
                   <a href="###">${item.size}</a>
               </dd>

           </dl>
           <dl class="producer clearfix">
               <dt> 生产厂家:</dt>
               <dd>${item.producer}</dd>

           </dl>
           <dl class="quan clearfix">
               <dt> 购买数量:</dt>
               <dd><input type="text" name="user" id="quan-input" value="1"> </dd>
               <dd>
                   <a class="add" href="###"></a>
                   <a class="dec" href="###"></a>

               </dd>
           </dl>
           <dl class="buy clearfix">
               <a class="buy-now-btn" href="###">
               立即购买
              
               </a>
               <a class="cart-btn" href="###">
               加入购物车
               <em class="fly-to-cart"><img src="${item.img}"></em>
               </a>
               <a class="call-btn" href="###"></a>
           </dl>
           <div class="confident">
               <dt>健客承诺</dt>
               <dd>
                   <img src="../images/list/zheng.jpg" alt="">
                   <a href="">正品保证</a>
                   <img src="../images/list/fu.jpg" alt="">
                   <a href="">货到付款 银行汇款/转账 在线支付</a>
               </dd>
           </div>
           <div class="download-code">
               <img src="../images/list/download-code.jpg" alt="">
               <span>扫码下载领1000元</span>
           </div>
       </div>
           `
        }).join('')
        $('#goods-show-wrap').html(res);
    }

    //NOTE 加入购物车功能

    function dropToCart() {
        // FIXME 非空/数量不能是负数/弄成一个点击事件两个功能
        var $val = $('#quan-input').val();
        // 增加件数
        $('#goods-show-wrap .add').click(function () {
            var $val = $('#quan-input').val();
            if ($val >= 1) {
                $val++;
                $('#quan-input').val($val);
            } else {
                alert('数量最少为1')
            }

        })
        // 减少件数
        $('#goods-show-wrap .dec').click(function () {
            var $val = $('#quan-input').val();
            if ($val > 1) {
                $val--;
                $('#quan-input').val($val);
            } else {
                alert('数量最小为1')
            }


        })














        $('#goods-show-wrap .cart-btn').click(function () {
            var $val = $('#quan-input').val(); //加入购物车时拿到当前用户输入的购买件数
            if ($val >= 1) { //确保用户输入的购买数量最少为1件

                if (getCookie('username')) { //登陆了才能点击加入购物车

                    getOrderData(true, 'no'); //渲染最新定订单的数据


                    function flyToCart(){
                        var cart_btn_h = $('#goods-show-wrap .cart-btn').offset().top - $(window).scrollTop();
                        //获取加入购物车按键距离浏览器顶部高度
                        var side_btn_h = $('.check-cart').offset().top - $(window).scrollTop()-60;
                        //获取右侧购物车图片距离浏览器顶部的距离;
                        var cart_btn_w = $('#goods-show-wrap .cart-btn').offset().left;
                        //获取加入购物车按键图标距离屏幕左边距离
                        var side_btn_w = $('.check-cart').offset().left;
                        //获取右侧购物车图标距离屏幕左边距离
                        var dif_h = cart_btn_h-side_btn_h;
                        var dif_w =side_btn_w -cart_btn_w;
                        console.log($('#goods-show-wrap .cart-btn').offset().left)
                        $('#goods-show-wrap .fly-to-cart')
                        .css('display','block')
                        .animate({'opacity':0,'left':dif_w+'px','top':-dif_h+'px'},800,function(){
                            $('#goods-show-wrap .fly-to-cart')
                        .css({'left':'0px','top':'0px','display':'none','opacity':'1'});
                        });
                    }
                    flyToCart();
                
                    
                } else {
                    alert('请登录操作');
                }
            } else {
                alert('数量最低为1')
            }
        })

        function getOrderData(isok, del) {
            var $username = getCookie('username');
            var $p2 = new Promise(function (resolve) {
                $.ajax({
                    type: 'post',
                    url: '../api/droptocart.php',
                    data: {
                        'idname': id_name,
                        'quan': $val,
                        'username': $username,
                        'isok': isok,
                        'del': del,
                    },
                    dataType: 'json',
                    success: function (str) {
                        resolve(str);
                        console.log(confirm);
                    }
                })
            })
            $p2.then(function (str) {
                orderItemsCreate(str); //渲染最新订单数据


                //点击删除,删除此商品



                $(function () {
                    $('#side-items').find('.am-icon-close').add('#doc-confirm-toggle').
                    on('click', function () {
                        $('#my-confirm').modal({
                            relatedTarget: this,
                            onConfirm: function (options) {
                                var $link = $(this.relatedTarget).prev('a');
                                var msg = $link.length ? '你要删除的链接 ID 为 ' + $link.data('id') :
                                    '确定了，但不知道要整哪样';
                                // alert(msg);
                                getOrderData(false, 'yes');
                          
                            },
                            // closeOnConfirm: false,
                            onCancel: function () {
                                // alert('算求，不弄了');
                            }
                        });
                    });
                });

            })
        }

        getOrderData(false, 'no'); //渲染初始订单数据



        function orderItemsCreate(str) {
            var newarr2 = str.currdata;
            console.log(newarr2)
            var res2 = newarr2.map(item => {
                return `
                    <li class="main-pic fl">
                          
                    <a href="###"><img src="${item.img}" alt=""></a>
                
                        </li>
                        <li class="item-details fl">
                            <span>${item.goodsname}</span>
                            <span>${item.size}</span>
                            <span class="currprice">${item.currprive}</span>
                        </li>
                        <li class="item-qty fl">
                            <span class="qty">${item.quan}</span>
                        </li>
                        <li class="del-item fl">
                            <span class="am-icon-close" title="删除商品">X</span>
                        </li>
                    
                    
                    
                    `
            }).join('')

            $('#side-items').html(res2);





            // var $qty = newarr2.quan[0];
            // console.log(newarr2.quan[0])
            // var $pri = newarr2.currprive[0].substring(1);
            // var $sum = $qty * $pri;
            // $('#show-item-wrap .count')
            //     .html('共' + $qty + '件商品'); //共多少件商品

            // $('#show-item-wrap .price')
            //     .html('合计' + $sum + '元'); //合计多少元



        }


    }




    // NOTE 评论区选项卡功能

    $('.tap-ctrl li').click(function(){
        console.log(123333)
        $(this).addClass('active').siblings().removeClass('active');
        $('.content-box li').eq($(this).index()).css('display','block').siblings().css('display','none');
    })

    // NOTE 点击发表评论出现弹窗书写功能

    $('.write-btn a').click(function(){
        $('.shade-input-wrap').show();
    })
    
    $('.shade-input-wrap .close').click(function(){
        $('.shade-input-wrap').hide();
    })
// FIXME 留言板功能还没完成
 $('.shade-input-wrap .submit').click(function(){
        var $con = $('#con').val().trim();
        if (getCookie('username')) {
            var user = getCookie('username');//获取用户名
            if($con){
                $('.shade-input-wrap').hide();
                var $p3 =new Promise(function(resolve){
                    $.ajax({
                        type:'post',
                        url:'../api/getdetailsdata.php',
                        data:{
                            comment:$con,//留言内容
                            idname:id_name,//商品id名
                            usernum:user,//使用者用户名
                        },
                        dataType:'json',
                        success:function(str){
                            resolve(str);
                        }
        
                    })
                    $('#con').val('');//清空上次输入值
                })
    
                $p3.then(function(str){
                    console.log(str)
                    commnentCreate(str);//渲染留言内容
                })
              
            }else{
                alert('内容不能为空');
            }
        } else {
            alert('请登录后再评价哦')
        
    
        }
       
        
    })
    function commnentCreate(str){//生成留言内容
        console.log(str);
        var newarr3 = str.commentdata;
        var res3 = newarr3.map(item=>{
            return `
            <dl class="content-item">
                 <dt class="user-name">
                     <span>${item.user}</span>
                  </dt>
                 <dd class="user-con">
                     <span>${item.comment}</span>
                 </dd>
            </dl>
            `

        }).join('')
        $('.written-content-wrap').html(res3);
    }

  












})