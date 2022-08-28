window.onload = function () {
    // 登陆部分
    var loginbox = document.querySelector('.login');
    var login = loginbox.querySelector('a');
    var user = document.querySelector('.user');
    if (localStorage.login == 'true') {
        user.style.display = 'inline-block';
        loginbox.style.display = 'none';
    }

    var pos = document.querySelector('.pos');
    login.onclick = function () {
        pos.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    var inps = pos.querySelectorAll('input');
    var loginbtn = document.querySelector('.loginbtn');
    var phonereg = /^1[3-9]\d{9}$/;
    var passreg = /(^\d{6,18}$)|(^[a-zA-Z]{6,18}$)/;
    loginbtn.onclick = function () {
        if (phonereg.test(inps[0].value) && passreg.test(inps[1].value)) {
            localStorage.login = true;
            localStorage.phone = inps[0].value;
            localStorage.pass = inps[1].value;
            pos.style.display = 'none';
            document.body.style.overflow = 'scroll';
            user.style.display = 'inline-block';
            loginbox.style.display = 'none';
        } else {
            alert('请输入正确的手机号和密码');
        }
    }

    var close = pos.querySelector('.close');
    close.onclick = function () {
        pos.style.display = 'none';
        document.body.style.overflow = 'scroll';
    }

    // 用户退出菜单
    var out = user.querySelector('.out');
    out.onclick = function () {
        localStorage.login = 'false';
        localStorage.phone = '';
        localStorage.pass = '';
        if (location.href.indexOf('videoPlay') != -1) {
            location.href = '../index.html';
        } else {
            location.reload();
        }
    }


    var lesson = document.getElementsByClassName('lesson')[0];
    var ul = lesson.getElementsByTagName('ul')[0];

    var n = 0; // 页数
    // 渲染初始内容
    // 渲染数据
    var allData = online;

    // 截取数据
    var data = online.slice(n * 12, (n + 1) * 12);
    // 0 12-1   12  24-1
    setHtml(data);

    // 渲染页数
    var pageNum = document.getElementsByClassName('pageNum')[0];
    var numul = pageNum.getElementsByTagName('ul')[0];
    var allNum = Math.ceil(online.length / 12);

    // 页数渲染
    setNum(allNum);

    var numlis = numul.getElementsByTagName('li');

    // 渲染上一个下一个按钮
    var btns = pageNum.getElementsByTagName('button');
    if (allNum > 1) btns[1].className = 'active';
    if (n > 0) btns[0].className = 'active';

    // 筛选学科
    var rows = document.getElementsByClassName('row');
    var objlis = rows[3].getElementsByTagName('li');
    for (var i = 0; i < objlis.length; i++) {
        objlis[i].onclick = function () {
            for (var j = 0; j < objlis.length; j++) {
                objlis[j].getElementsByTagName('a')[0].className = '';
            }
            this.getElementsByTagName('a')[0].className = 'active';
            var attr = this.getAttribute('obj');
            allData = online.filter(function (v, i) {
                return attr == '1' ? 1 : v.subject == attr;
            });
            n = 0;
            allNum = Math.ceil(allData.length / 12);
            data = allData.slice(n * 12, (n + 1) * 12);
            setHtml(data);
            setNum(allNum);
        }
    }

    // 上一页按钮
    btns[0].onclick = function () {
        if (n == 0) return;
        n--;
        data = allData.slice(n * 12, (n + 1) * 12);
        setHtml(data);
        changebtn();
    }

    // 下一页按钮
    btns[1].onclick = function () {
        if (n == allNum - 1) return;
        n++;
        data = allData.slice(n * 12, (n + 1) * 12);
        setHtml(data);
        changebtn();
    }

    // 点击每个页数，改变数据
    for (var j = 0; j < numlis.length; j++) {
        numlis[j].index = j;
        numlis[j].onclick = function () {
            n = this.index;
            data = allData.slice(n * 12, (n + 1) * 12);
            setHtml(data);
            changebtn();
        }
    }

    // 渲染页面函数
    function setHtml(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            html += `<li>
                <a href="./videoDetail.html"><div class="top">
                    <img src="${r.src}" alt="" class="m">
                    <p>${r.num}人在学习</p>
                </div>
                <div class="bottom">
                    <div class="left">
                        <span>${r.title}</span>
                        <span class="time">${r.time}课时</span>
                    </div>
                    <div class="right">免费学习</div>
                </div></a>
            </li>`;
        }
        ul.innerHTML = html;

    }

    // 渲染页数函数
    function setNum(allNum) {
        // 页数渲染
        var numhtml = '';
        for (var i = 1; i <= allNum; i++) {
            numhtml += `<li>${i}</li>`;
        }
        numul.innerHTML = numhtml;
        var numlis = numul.getElementsByTagName('li');
        numlis[0].className = 'active';
    }

    // 改变按钮样式
    function changebtn() {
        allNum - 2 >= n ? btns[1].className = 'active' : btns[1].className = '';
        n > 0 ? btns[0].className = 'active' : btns[0].className = '';
        for (var i = 0; i < numlis.length; i++) {
            numlis[i].className = '';
        }
        numlis[n].className = 'active';
        document.documentElement.scrollTop = 0;
    }
}