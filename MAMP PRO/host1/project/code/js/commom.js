//NOTE 计算任意数的阶乘
function Jc(a) { //封装函数定义函数名Jc
    var c = 1;
    for (var i = 1; i <= a; i++) {
        c *= i
    }
    return c;
}
//NOTE 生成随机数0-100随机数
function ranNum() {
    var n = parseInt(Math.random() * 100 + 1);
    return n;
}
//NOTE getId
function getId(id) {
    return document.getElementById(id);
}
//NOTE getClassName 用法:注意右边的参数要加引号
function getCn(id, classname) {
    return id.getElementsByClassName(classname);
}
//NOTE getTagname 用法:注意右边的参数要加引号
function getTn(id, tag) {
    return id.getElementsByTagName(tag);
}
//NOTE gSALL获取某个id里的子元素集合
function qSAll(str) {
    return document.querySelectorAll(str);
}
//NOTE 生成随机4位验证码 
function verCode() {

    var Arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v',
        'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    var res = '';
    var out = '';
    for (var i = 0; i < 4; i++) {
        res = parseInt(Math.random() * Arr.length);
        out += Arr[res];
    }
    return out;
}
//NOTE 生成随机渐变色
function ranLinear() {
    var res = '';
    var n1 = '';
    var n2 = '';
    var ang = parseInt(Math.random() * 361);

    for (var i = 0; i < 6; i++) {
        var ran = parseInt(Math.random() * 256);
        if (i < 2) {
            n1 = n1 + ran + ',';
        } else if (i == 2) {
            n1 += ran;
        } else if (i > 2 && i < 5) {
            n2 = n2 + ran + ',';
        } else {
            n2 += ran;
        }
    }
    res = 'linear-gradient(' + ang + 'deg,' + 'rgb(' + n1 + '), rgb(' + n2 + ')';
    return res;
}
//NOTE 计算两个数的加减乘除余
function Caculator(num1, num2, operators) {
    var Num1 = document.getElementById(num1); //获取第一个数
    var Num2 = document.getElementById(num2); //获取第二个数
    var Operators = document.getElementById(operators).value; //获取运算符
    var a = Num1.value * 1;
    var b = Num2.value * 1;
    var res = 0;
    if (Operators == '+') {
        res = a + b;
        return res;
    }
    if (Operators == '-') {
        res = a - b;
        return res;
    }
    if (Operators == '*') {
        res = a * b;
        return res;
    }
    if (Operators == '/') {
        res = a / b;
        return res;
    }
    if (Operators == '%') {
        res = a % b;
        return res;
    }
}
//
/* NOTE 生成dl,dt,dd内容 */
function dLdtdd() {
    var Dt = ['Customer Service', 'Company Info', 'Make money with us']; //每个列表的dt的内容
    var Dd1 = ['Shopping Guide', 'Return Policy', 'FAQ', 'Shipping', 'Contact us']; //列表 1dd内容
    var Dd2 = ['About us', 'Why Buy From Us', 'Privacy & Security Policy', 'Term of Use']; //列表 2dd内容
    var Dd3 = ['Wholesale', 'Points & Coupon,Gifts']; //列表 3dd内容
    var res = ''; //声明res;
    for (var i = 0; i < Dt.length; i++) {

        res += '<dl><dt>' + Dt[i] + '</dt>' //拼接每次dl里的dt的内容 ,累加拼接
        if (i == 0) { //判断i=0 进入循环体,生成相对应dd内容
            for (var j = 0; j < Dd1.length; j++) {
                res += '<dd><a href="#">' + Dd1[j] + '</a></dd>';

            }
        }
        if (i == 1) {
            for (var j = 0; j < Dd2.length; j++) {
                res += '<dd><a href="#">' + Dd2[j] + '</a></dd>';
            }
        }
        if (i == 2) {
            for (var j = 0; j < Dd3.length; j++) {
                res += '<dd><a href="#">' + Dd3[j] + '</a></dd>';
            }

        }
        res += '</dl>';
        console.log(res);

    }
    return res;
}
//NOTE  随机点名 nameArr为名字数组
function ranName(nameArr) {
    res = parseInt(Math.random() * nameArr.length);
    return nameArr[res];

}
//NOTE 随机生成任意范围内的一个数
function ranDomAnyNumInRange(min, max) {
    return parseInt(Math.random() * (max - min + 1)) + min;
}
//NOTE 去掉一个数组里重复的数生成一个新的数组 num----原数组
function iGnored(num) {
    var newnum = [];
    newnum.push(num[0]);

    for (var i = 1; i < num.length; i++) {
        if (newnum.indexOf(num[i]) == -1) {
            newnum.push(num[i]);
        }
    }
    return newnum;
}
//NOTE 排他:直接使用,注意参数名
function clearEffect(btns) { //排他
    for (var j = 0; j < btns.length; j++) { //循环清空样式
        btns[j].style = ''; //清空按钮的样式
    }
}
//NOTE 彩虹渐变色
function rainBow() {
    return 'linear-gradient(90deg,red,orange,yellow,green , #00FFFF ,blue,purple)';
}

//NOTE 十种让人心情变好的颜色美两两混合渐变色
function moodColor() {
    var arr = ['#19CAAD', '#8CC7B5', '#A0EEE1', '#BEE7E9', '# BEEDC7', '#D6D5B7', '#D1BA74', '#E6CEAC', '#ECAD9E', '#F4606C'];
    var newarr = [];
    var n = 0;
    var str = '';
    for (var i = 0; i < 2; i++) {
        n = parseInt(Math.random() * arr.length);
        newarr.push(arr[n])
    }
    str = newarr.join();
    return 'linear-gradient(90deg,' + str + ')';
}
//NOTE 字符串转对象
function strToObj(str) {
    var obj = {};
    var newarr = [];
    var arr = str.split('&'); //以&为分隔符
    arr.forEach(function (item) { //item代表arr里的每一项内容
        newarr = item.split('='); //对于arr里的每一项内容 根据'='来割开放进到新的数组
        obj[newarr[0]] = newarr[1]; //按下标把数组的内容变成对象键名和键值
        /* Object {1: 3}
         ["name", "malin"]
         Object {name: "malin"}
         ["psw", "1234"]
         Object {name: "malin", psw: "1234"} */
    });
    console.log(obj);
    return obj;

};

//NOTE 对象转换成字符串
function objToStr(obj) {
    var html = '';
    //遍历json for in
    for (var key in obj) {
        //key:键名    obj[key] : 键值
        html += key + '=' + obj[key] + '&';
        /* 
        html:33 name=malin&
        html:33 name=malin&psw=1234&
        html:33 name=malin&psw=1234&adr=阳江&
        html:33 name=malin&psw=1234&adr=阳江&gender=男& 
        */
        console.log(html)
    }
    console.log(html)
    //name=malin&psw=1234&
    return html.slice(0, -1); //删除最后一个'&'得到我们需要的样子
}
//NOTE 过滤敏感字
// var val = Text.value; //获取输入数据
function wordsFilter(val) {
    var str = 'fuck,妈蛋,操,法轮功,反清复明,金三胖,去死,MMP';
    var arr = str.split(','); //把上面的字符串变成数组
    // var val = Text.value; //获取输入数据

    arr.forEach(function (item) {
        var reg = new RegExp(item, 'gi');
        val = val.replace(reg, '输入内容已被和谐***');
    });
    return val
}

//NOTE 找第一个孩子  用法:ele放他的父元素名字
function firstChild(ele) {
    if (ele.firstElementChild) {
        //高级浏览器  IE9+
        return ele.firstElementChild;
    } else {
        //低版本  IE8-
        return ele.firstChild;
    }
}

//NOTE 删除亲人节点 用法:list是父元素,btns是按键集合
function delNode(list, btns) {
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            console.log(123);
            var res = confirm('确认删除吗');
            if (res) {
                list.removeChild(this.parentNode)
            }
        }
    }

}
//NOTE 判断复选框里内容是否已经全选
function allCheck(Inputs) {
    var isok = true;
    for (var i = 0; i < Inputs.length; i++) { //循环判断按钮是否已经选择
        if (Inputs[i].checked == false) { //如果没有被选,则返回false给SelAll ,并停止函数
            isok = false;
            break;
        }
    }
    return isok; //如果全部已经选中,则返回true给SelAll 点亮选框;
}

//NOTE 正则
var checkReg = {
    passStrength: function (str) { //验证密码是否满足条件
        var reg = /^[\w_-]{6,16}$/;
        return reg.test(str);
    },
    passStrengthCof: function (str) { //验证密码是否满足条件
        var reg = /^[\w_-]{6,16}$/;
        return reg.test(str);
    },
    mail: function (str) { //验证邮箱的
        var reg = /^[\w-+&%.]+@[\w-+&%.]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    idCard: function (str) { //验证身份证
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(str);
    },
    tel: function (str) { //验证手机号码
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    }
}
//NOTE获取json对象里的键值并放进数组
function getKeyFromObj(Obj, arr) {
    for (key in Obj) {
        arr.push(key);
    }
    return arr;
}
//NOTE 密码强度
function checkStrong(val) {
    var modes = 0;
    if (val.length < 6) return 0;
    if (/\d/.test(val)) modes++; //数字 1
    if (/[a-z]/.test(val)) modes++; //小写 2 
    if (/[A-Z]/.test(val)) modes++; //大写  3
    if (/\W/.test(val)) modes++; //特殊字符 4
    if (val.length > 12) return 4;
    return modes;
}
//NOTE 排它 lis输入'需要排它的合集'
function clearAll(lis) {
    for (var j = 0; j < lis.length; j++) {
        lis[j].className = '';
    }
}
//NOTE 身份证号提取生日
function IdtoBir(str) {
    return str.slice(6, 10) + '-' + str.slice(10, 12) + '-' + str.slice(12, 14);
}



//NOTE 获取样式  
function getstyle(ele, cls) {
    //ele 节点   cls：属性名
    if (getComputedStyle(ele, false)) {
        //在高级浏览器下面
        return getComputedStyle(ele, false)[cls];
    } else {
        //在低版本浏览器 IE8-
        return ele.currentStyle[cls];
    }
}
/*NOTE 
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */
function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = getstyle(obj, key) * 100; //透明度
            } else {
                cur = parseInt(getstyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) {
                fnend(); //调用函数
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}



/* NOTE 轮播图用法:
(爷父孙结构)
id传大盒子id名;
qa传图片数量;
图片名字应该写成lb[qa].jpg命名,自动生成;
cls传激活焦点图样式的class名 */
function sideShow(id, qa, cls) {
    var Wrap = getId(id);
    var Wrap_List = Wrap.firstElementChild;
    var PreBtn = getCn(Wrap, 'prev')[0];
    var NextBtn = getCn(Wrap, 'next')[0];
    var Light = getCn(Wrap, 'light')[0];

    var timmer = setInterval(next, 2000); //设置定时器
    var now = 0;
    var Imghtml = ''; //声明图片渲染变量
    for (var i = 1; i <= qa; i++) { //通过循环生成装在图片的元素 
        Imghtml += '<li><img src="../images/lb' + i + '.jpg" alt=""></li>';
    }
    Wrap_List.innerHTML = Imghtml; //生成图片
    var lis = Wrap_List.children; //获得li的集合
    var iw = lis[0].offsetWidth; //这个获取lis集合里li的元素的宽度需要放在li被渲染出来的后面才能获取


    for (var li of lis) { //全部图先放在右边
        li.style.left = iw + 'px';
    }
    lis[0].style.left = 0; //把第一张放在可视区

    function next() {
        startMove(lis[now], {
            'left': -iw
        });
        now = ++now > lis.length - 1 ? 0 : now; //判断当前是第几张如果是最后一张了,就返回下标0
        lis[now].style.left = iw + 'px'; //前一张滑过之后,让第二张瞬间放到右侧开始,主要是为了实现下一次的循环
        startMove(lis[now], {
            'left': 0
        });
        lightClear();
    }

    function pre() {
        startMove(lis[now], {
            'left': iw
        });
        now = --now <= -1 ? lis.length - 1 : now;
        lis[now].style.left = -iw + 'px'; //把图片瞬间放在最左边
        startMove(lis[now], {
            'left': 0
        })
        lightClear();

    }
    Wrap.onmouseover = function () { //鼠标进入可视区,停止定时器
        clearInterval(timmer);
    }
    Wrap.onmouseout = function () { //鼠标离开可视区,开启定时器
        timmer = setInterval(next, 2000);
    }

    // PreBtn.onclick = function () { //点击上一张
    //     pre();
    //     lightClear();
    // }
    // NextBtn.onclick = function () { //点击下一张
    //     next();
    //     lightClear();
    // }


    var Lighthtml = ''; //准备生成焦点元素
    for (var j = 0; j < lis.length; j++) { //循环生成span
        Lighthtml += ' <span></span>';
    }
    Light.innerHTML = Lighthtml; //渲染焦点元素
    Light.firstElementChild.className = 'active'; //激活第一个焦点(默认)

    function lightClear() { //将焦点元素classname清除
        for (var j = 0; j < lis.length; j++) {
            Light.children[j].className = '';
        }
        Light.children[now].className = cls; //激活当前值的classname *(此处传参,不许引号)
    }




    for (let j = 0; j < Light.children.length; j++) {
        Light.children[j].onmouseenter = function () {
            if (j > now) { //如果点击的下标大于当前的画面下标,则先把当前的画面扫到左边,快速把当前应该出现的画面移到最右边
                startMove(lis[now], {
                    'left': -iw
                });
                lis[j].style.left = iw + 'px';

            } else if (j < now) { //如果点击的下标小于当前的画面下标,则先把当前的画面扫到右边,快速把当前应该出现的画面移到最左边
                startMove(lis[now], {
                    'left': iw
                });
                lis[j].style.left = -iw + 'px';

            }
            startMove(lis[j], {
                'left': 0
            })
            now = j; //把当前焦点下标值赋予给now
            lightClear(); //点亮焦点

        }
    }

    /* 防止多次点击造成过快切换功能 */

    var oldtime = new Date();
    NextBtn.onclick = function () {
        if (new Date() - oldtime >= 800) { //前后间隔时间限制
            next();
            lightClear();
        }
        oldtime = new Date();
    }
    PreBtn.onclick = function () { //点击上一张
        if (new Date() - oldtime >= 800) {
            pre();
            lightClear();
        }
        oldtime = new Date();
    }
}

//ANCHOR  选项卡,用法:提前写好结构,传大盒子的名字3(爷父孙结构)
function tapControl(id, cls) {
    var Wrap = getId(id);
    var BtnWrap = Wrap.children[0]; //找出按钮父元素
    var Btns = BtnWrap.children; //按键集合
    var ConWrap = Wrap.children[1]; //找出内容区父元素
    var Cons = ConWrap.children; //内容区集合
    Cons[0].style.display = 'block'; //让第一个选项框默认显示

    for (let i = 0; i < Btns.length; i++) { //let写法可能会有兼容问题
        Btns[i].onclick = function () {
            clear(); //排他
            Btns[i].className = cls; //点亮当前按钮
            Cons[i].style.display = 'block'; //显示当前内容框
        }
    }

    function clear() {
        for (var j = 0; j < Btns.length; j++) {
            Btns[j].className = '';
            Cons[j].style.display = 'none';
        }
    }
}


//NOTE 侧边广告 sideAd 用法 传id名
function sideAd(id) {
    var Share_Wrap = getId(id);
    var data = { //添加内容
        article: 'cdfhadjklfhqsjkhcjklhwkuhqwekuhjnjkadsncfj'
    };

    var html = `<div class="share-tt"><span>百度分享</span></div>
    <div class="share-content">${data.article}</div>`
    Share_Wrap.innerHTML = html;
    var Share_Tt = getCn(Share_Wrap, 'share-tt')[0];
    var Share_Content = getCn(Share_Wrap, 'share-content')[0];

    Share_Tt.onmouseenter = function () {
        startMove(Share_Wrap, {
            'right': 0
        });
    }
    Share_Wrap.onmouseleave = function () {
        startMove(Share_Wrap, {
            'right': -270
        });

    }

}




//ANCHOR 轮播图2 灵活一点的
function sideShowSmart(id, cls) {
    var Wrap = getId(id);
    var Wrap_List = Wrap.children[0];
    var PreBtn = getCn(Wrap, 'prev')[0];
    var NextBtn = getCn(Wrap, 'next')[0];
    var Light = getCn(Wrap, 'light')[0];

    var timmer = setInterval(next, 2000); //设置定时器
    var now = 0;

    var lis = Wrap_List.children; //获得li的集合
    var iw = lis[0].offsetWidth; //这个获取lis集合里li的元素的宽度需要放在li被渲染出来的后面才能获取


    for (var li of lis) { //全部图先放在右边
        li.style.left = iw + 'px';
    }
    lis[0].style.left = 0; //把第一张放在可视区

    function next() {
        startMove(lis[now], {
            'left': -iw
        });
        now = ++now > lis.length - 1 ? 0 : now; //判断当前是第几张如果是最后一张了,就返回下标0
        lis[now].style.left = iw + 'px'; //前一张滑过之后,让第二张瞬间放到右侧开始,主要是为了实现下一次的循环
        startMove(lis[now], {
            'left': 0
        });
        lightClear();
    }

    function pre() {
        startMove(lis[now], {
            'left': iw
        });
        now = --now <= -1 ? lis.length - 1 : now;
        lis[now].style.left = -iw + 'px'; //把图片瞬间放在最左边
        startMove(lis[now], {
            'left': 0
        })
        lightClear();

    }
    Wrap.onmouseover = function () { //鼠标进入可视区,停止定时器
        clearInterval(timmer);
    }
    Wrap.onmouseout = function () { //鼠标离开可视区,开启定时器
        timmer = setInterval(next, 2000);
    }

    // PreBtn.onclick = function () { //点击上一张
    //     pre();
    //     lightClear();
    // }
    // NextBtn.onclick = function () { //点击下一张
    //     next();
    //     lightClear();
    // }


    var Lighthtml = ''; //准备生成焦点元素
    for (var j = 0; j < lis.length; j++) { //循环生成span
        Lighthtml += ' <span></span>';
    }
    Light.innerHTML = Lighthtml; //渲染焦点元素
    Light.firstElementChild.className = 'active'; //激活第一个焦点(默认)

    function lightClear() { //将焦点元素classname清除
        for (var j = 0; j < lis.length; j++) {
            Light.children[j].className = '';
        }
        Light.children[now].className = cls; //激活当前值的classname *(此处传参,不许引号)
    }




    for (let j = 0; j < Light.children.length; j++) {
        Light.children[j].onmouseenter = function () {
            if (j > now) { //如果点击的下标大于当前的画面下标,则先把当前的画面扫到左边,快速把当前应该出现的画面移到最右边
                startMove(lis[now], {
                    'left': -iw
                });
                lis[j].style.left = iw + 'px';

            } else if (j < now) { //如果点击的下标小于当前的画面下标,则先把当前的画面扫到右边,快速把当前应该出现的画面移到最左边
                startMove(lis[now], {
                    'left': iw
                });
                lis[j].style.left = -iw + 'px';

            }
            startMove(lis[j], {
                'left': 0
            })
            now = j; //把当前焦点下标值赋予给now
            lightClear(); //点亮焦点

        }
    }

    /* 防止多次点击造成过快切换功能 */

    var oldtime = new Date();
    NextBtn.onclick = function () {
        if (new Date() - oldtime >= 800) { //前后间隔时间限制
            next();
            lightClear();
        }
        oldtime = new Date();
    }
    PreBtn.onclick = function () { //点击上一张
        if (new Date() - oldtime >= 800) {
            pre();
            lightClear();
        }
        oldtime = new Date();
    }
}



//NOTE 面对对象版 下拉菜单 注意到时候样式的写法
function DropDownMenu(id) {
    this.Wrap = getId(id)
    this.Wrap.innerHTML = `<input type="button" value="新闻" class='btn'>
                <div class="con">新闻</div>`
    this.Btn = getCn(this.Wrap, 'btn')[0];
    this.Con = getCn(this.Wrap, 'con')[0];
    this.switch_on = true; //设置开关
    this.Con.style.cssText = "width: 200px;height: 0px;transition:all 1s;overflow: hidden;";
    this.init();
}

DropDownMenu.prototype.init = function () {

    this.Btn.onclick = function () {

        if (this.switch_on) { //true
            this.Con.style.height = "200px"; //激活显示样式
            this.Con.style.backgroundImage = ranLinear(); //背景色函数
        } else { //非true

            this.Con.style.height = '0px';
            this.Con.style.backgroundImage = moodColor(); //彩虹色函数
        }
        this.switch_on = !this.switch_on; //true/false/true/false; 每次取反
        // console.log(switch_on)
    }.bind(this); //修正this指向
}

//ajax3
function ajax3(opt) {
    function extend(obj1, obj2) {
        for (var key in obj1) {
            obj2[key] = obj1[key];
        }
    }

    var defaults = {//默认参数
        data: '',
        async: true
    }

    extend(opt, defaults);//使用默认参数

    //1.创建对象
    var xhr = new XMLHttpRequest();

    if (defaults.type.toLowercase() == 'get') {
        defaults.url += '?' + defaults.data;
        xhr.open('get', defaults.url, defaults.async);
        xhr.send(null);
    } else if (defaults.type.toLowercase() == 'post') {
        xhr.open('post', defaults.url, defaults.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defaults.data);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                defaults.success(xhr.responseText);
            } else {
                alert('出错啦，http码是：' + xhr.status);
            }
        }
    }


}




//ajax2
function ajax2(opt) {
    function extend(obj1,obj2) {//配置参数：obj1  默认参数:obj2
        for(var key in obj1) {
            obj2[key] = obj1[key];
            
        }
     
    }
    
    var defaults = {//默认参数
        data : '',
        async : true
    }
    
    extend(opt,defaults);//使用默认参数
    
    //1.创建对象
    var xhr = new XMLHttpRequest();
    //2.发送请求
    if(defaults.type.toLowerCase() == 'get') {
        //get方式
        defaults.url += '?' + defaults.data;
        xhr.open('get',defaults.url,defaults.async);
        xhr.send(null);
    }else if(defaults.type.toLowerCase() == 'post') {
        //post方式
        xhr.open('post',defaults.url,defaults.async);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(defaults.data);
    }
    //3.接收数据
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                //把拿到的数据丢到外面
                defaults.success(xhr.responseText);
            }else {
                alert('出错啦,http码是：' + xhr.status);  
            }
        }
    }
}


// cookie的封装函数
function getCookie(key) {
    var str = document.cookie;
    var arr = str.split('; '); //[name=malin,psw=123456]
    for (var ele of arr) {
        var arr2 = ele.split('='); //[name,malin]
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

function setCookie(key, value, iDay) {
    //key:键名   value：键值    iDay：失效时间
    //		document.cookie = 'name=malin;expires=20190527;path=/';
    var now = new Date();
    now.setDate(now.getDate() + iDay); //iDay:5天后失效， -1：立即失效
    document.cookie = key + '=' + value + ';expires=' + now + ';path=/';
}

function removeCookie(key) {
        setCookie(key,'',-1);//设置成过去的时间
    }








