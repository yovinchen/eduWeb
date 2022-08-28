 // 获取元素
 var form = document.getElementById("form"),
     tel = form.tel,
     pass = form.pass,
     pass2 = form.pass2,
     yanzhen = form.yanzhen,
     yanzhenma = utils.getClass("yanzhenma", form)[0],
     submit = utils.getClass("loginbtn", form)[0];


 // 保存正则验证的规则
 var regObj = {
     tel: /^1\d{10}$/,
     pass: /^\w{6,20}$/
 };


 // 验证所有的输入框是否都验证通过
 var arr = [true, true, true, true];

 // 随机四位验证码
 ;(function () {
     // 返回四位随机字符串
     function randomChar() {
         var char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
         var str = '';
         for (var i = 0; i < 4; i++) {
             str += char[utils.getRandomNumber(0, char.length - 1)];
         }
         return str;
     }

     // 初始化页面
     yanzhenma.innerHTML = randomChar();

     // 点击改变
     yanzhenma.onclick = function () {
         this.innerHTML = randomChar();
     }

 })();


 // 输入框的验证
 tel.onblur = function () {
     var val = this.value;
     var em = utils.next(this);
     if (regObj.tel.test(val)) { //符合规则
         em.innerHTML = "";
         arr[0] = true;
     } else {
         em.innerHTML = "手机格式错误,请重新输入!";
         arr[0] = false;
     }
 }


 pass.onblur = function () {
     var val = this.value;
     var em = utils.next(this);
     if (regObj.pass.test(val)) { //符合规则
         em.innerHTML = "";
         arr[1] = true;
     } else {
         em.innerHTML = "密码格式错误,请重新输入!";
         arr[1] = false;
     }
 }

 pass2.onblur = function () {
     var val = this.value;
     var em = utils.next(this);
     if (val && val === pass.value) {
         em.innerHTML = "";
         arr[2] = true;
     } else {
         em.innerHTML = "密码两次输入不同请验证～";
         arr[2] = false;
     }
 }

 yanzhen.onblur = function () {
     var val = this.value;
     var em = utils.next(utils.next(this));
     if (val.toLowerCase() === utils.next(this).innerHTML.toLowerCase()) {
         em.innerHTML = "";
         arr[3] = true;
     } else {
         em.innerHTML = "验证码输入不正确";
         arr[3] = false;
     }
 }


 form.onsubmit = function (ev) {
     console.log(arr);
     ev = ev || window.event;
     ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;

     // 验证 所有的验证都通过了才发送给服务器
     // 让所有的输入框失去焦点
     tel.focus();
     pass.focus();
     pass2.focus();
     yanzhen.focus();
     yanzhen.blur();


     //针对数组做一些判断  都为真才为真 一个为假即位为假
     var resBool = arr.every(function (val, index) {
         return val;
     });

     if (resBool) { // 所有的验证都通过了返回true
         // 准备传递服务器的参数

         // 准备一个用户
         var obj = {
             tel: tel.value,
             pass: pass.value
         };


         alert("注册成功");
         // 将用户名  密码存储

         // 存储之前先获取  
         // 可能获取到了是一个对象 没有存储 获取到的null
         var myArr = JSON.parse(window.localStorage.getItem("user"));


         if (myArr) {
            myArr.push(obj);
             window.localStorage.setItem("user", JSON.stringify(myArr));
         } else {
             window.localStorage.setItem("user", JSON.stringify([obj]));
         }

         // 跳转到登录
         window.location.href = "./login.html";
     }

 }