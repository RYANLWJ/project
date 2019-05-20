$(function () {
    // NOTE 首先定义Accordion对象：
    // multiple的作用是用来控制是否能展开多个列表（这里传入false，每次就只能展开一个，展开另外一个就收起前面展开的）

    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var links = this.el.find('.link');
        //下面这个就是传入到函数里面的数据data
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    };

    // 为手风琴Accordion添加下拉菜单事件：

    Accordion.prototype.dropdown = function (e) {

        //所以在这里e.data就相当于{el: this.el, multiple: this.multiple}
        //那么e.data.el就是取得其中的值了this.el。

        var $el = e.data.el;
        $this = $(this);
        $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        /* $el.find('.submenu')这个选择器取到了id为accordion元素下面的所有class为submenu的ul，
        但是这里只要展开当前你点击的li下面的ul。而不需要其他的展开。
        所以用到了.not($next).就是非当前点击中的其他li下面的ul都隐藏。
        上面的参数multiple就是用来判断执不执行这句代码*/

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }
    };

    // 然后可以通过下面语句调用手风琴下拉菜单：
    var accordion = new Accordion($('#accordion'), false);
    $('.submenu li').click(function () {
        $(this).addClass('current').siblings('li').removeClass('current');
    });
});



$(function () {



     //NOTE 顶部用户信息提示
     if(getCookie('username')){
        var $username=getCookie('username');
        console.log($username)
       $('#welcome .login-inf').html($username+'欢迎您');
       $('#welcome .login-inf').attr("disabled",true).css("pointer-events","none");  ;
    }else{
        console.log(123)
        $('#welcome .login-inf').html('请登录选购哦');
        $('#welcome .login-inf').attr('disabled','').css("pointer-events","auto");;

    }















 //NOTE 请求数据
    var num = 8; //每页显示多少item
    var ipage = 0; //第几页
    var pages = 0;
    var page = 1;
    var type = ''; //排序类型
    var order = ''; //正序还是倒序

   
    function init(ipage) {
        var p = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                url: '../api/getgoodslist.php',
                data: {
                    'page': ipage,
                    'num': num,
                    'type': type,
                    'order': order
                },
                dataType: 'json',
                success: function (str) {
                    resolve(str);
                }

            })
        })


        p.then(function (str) {
            // pages = Math.ceil(arr.total / arr.num);
            pages = Math.ceil(str.total / str.num);
            var total=str.total;//总条数
            create(str); //渲染列表
            toDetails(); //跳转到详情页
            rankEffect();//排序功能


            $('.total-show')
                .html('共' + str.total + '条'); //显示总页数
            $('.quan-show')
            .html(page+'/'+pages);//显示当前页码/总页数

            $('.paging').paging({//分页功能
                totalPage: pages,
                totalSize: str.total,
                callback: function (num) {
                    init(num);
                }
            })
            $('#go').click(function(ev){
                var $page_input=$('#page-input').val().trim();
                if($page_input && $page_input<=pages && $page_input >=1){
                    init($page_input);
                }else{
                    alert('请输入有效页码');
                    
                }
               ev.stopPropagation();//阻止冒泡
            })
        })
    }

    init(1);//生成默认第一页


    function rankEffect() {
        var isok = true;
        document.onclick = ev => {
            console.log(pages)
            //   console.log(ev.target.className=='fr pre-btn')

            if (ev.target.className == 'pbtn') {
                page = ev.target.innerHTML;
                init(page);
            }

            if (ev.target.className == 'fr pre-btn' && page > 1) {
                page--;
                init(page);
            }
            if (ev.target.className == 'fr next-btn' && page < pages) {
                console.log(123222)
                page++;
                init(page);

            }
            if (ev.target.className == 'fl price-rk') {
                console.log(12222)
                type = 'currprive'; //根据价格进行排序
                if (isok) {
                    order = 'ASC';
                    console.log(isok)

                } else {
                    console.log(isok)
                    order = 'DESC';

                }
                isok = !isok;
                init(1);
            }
            if (ev.target.className == 'fl com-rk') {
                type = ''; //根据综合进行排序
                order = 'ASC';
                init(1);
            }
            if (ev.target.className == 'fl quan-rk') {
                type = 'sale'; //根据销量进行排序
                order = 'ASC';
                init(1);
            }
            if (ev.target.className == 'fl time-rk') {
                type = 'time'; //根据上架时间进行排序
                order = 'DESC';
                init(1);
            }

        }

      
  
    };


    function create(str) { //渲染列表数据
        var newarr = str.data;
        var res = newarr.map(item => {
            return `
            <dl class="goods-wrap fl" data-id="${item.id}">
            <dt class="img">
                <img src="${item.img}" alt="">
            </dt>

            <dd class="price">
                <span>${item.currprive}</span>
                <span>${item.origprice}</span>
            </dd>
            <dd class="into">
                <img src="${item.limited}" alt="">
                <span>
                ${item.content}
                </span>
            </dd>
            <dd class="detail">
                <a href="###">查看详情</a>
            </dd>
        </dl>
            
            `
        }).join('');
        $('#list-show').html(res);
    }


    function toDetails() { //点击列表项跳转到详情页
        $('#list-show .goods-wrap')
            .click(function () {
                var dataId = $(this).attr('data-id');
                console.log(dataId)
                location.href = 'details.html?' + dataId;
            })
    }






})