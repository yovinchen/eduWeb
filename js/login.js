   // 获取元素
   var form = document.getElementById("form"),
       tel = form.tel,
       pass = form.pass,
       submit = utils.getClass("loginbtn", form)[0];
   em = form.getElementsByTagName("em")[0];


   // 保存正则验证的规则
   var regObj = {
       tel: /^1\d{10}$/,
       pass: /^\w{6,20}$/
   };


   // 验证所有的输入框是否都验证通过
   var arr = [true, true];


   // 输入框的验证
   tel.onblur = function () {
       var val = this.value;
       if (regObj.tel.test(val)) { //符合规则
           em.innerHTML = "";
           arr[0] = true;
       } else {
           em.innerHTML = "您输入的账号或密码不正确";
           arr[0] = false;
       }
   }


   pass.onblur = function () {
       var val = this.value;
       if (regObj.pass.test(val)) { //符合规则
           em.innerHTML = "";
           arr[1] = true;
       } else {
           em.innerHTML = "您输入的账号或密码不正确";
           arr[1] = false;
       }
   }


   form.onsubmit = function () {
       // 验证 所有的验证都通过了才发送给服务器
       // 让所有的输入框失去焦点
       tel.focus();
       pass.focus();
       pass.blur();

       //针对数组做一些判断  都为真才为真 一个为假即位为假
       var resBool = arr.every(function (val, index) {
           return val;
       });

       if (resBool) { // 所有的验证都通过了返回true
           //登录成功到首页
           var userArr = JSON.parse(window.localStorage.getItem("user"));

           if (!userArr) { //本地还没有存储
               alert("还没有注册，请先注册~~~");
               window.location.href = "./register.html";
               return false;
           }

           // 取出数据做比较
           for (var i = 0; i < userArr.length; i++) {
               // 输入的用户名和密码都正确才能登录成功
               if (tel.value === userArr[i].tel && pass.value === userArr[i].pass) {
                   alert("登录成功");
                   window.location.href = "../../index.html";
                   window.localStorage.setItem("id", tel.value);
                   return false;
               }
           }

           // 本地有数据  但是没有当前用户
           alert("当前用户没有注册~~~");
           window.location.href = "./register.html";
       }

       return false;
   }