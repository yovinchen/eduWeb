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


    var vd = videoDetail;
    var cd = document.getElementsByClassName('classDetail')[0];
    //    var video = cd.getElementsByTagName('video')[0];
    //    video.poster = vd.poster;
    //    video.src = vd.src;

    var vimg = cd.getElementsByTagName('img')[0];
    vimg.src = vd.poster;

    var rg = cd.getElementsByClassName('right')[0];
    rg.innerHTML = `<p class="title">[${vd.year}] ${vd.title}</p>
            <ul>
                <li>年级科目：${vd.grade}</li>
                <li>课时数量：${vd.time}课时</li>
                <li>开课时间：${vd.duration}</li>
                <li>有效期至：${vd.period}</li>
                <li>距报名截止仅剩</li>
                <li>
                    <span>${vd.day}</span>天
                    <span>${vd.h}</span>时
                    <span>${vd.m}</span>分
                    <span>${vd.s}</span>秒
                </li>
                <li class="price">
                    <span>¥${vd.price}</span>
                    <span class="freeStudy">${vd.isFree ? '免费试学' : '付费学习'}</span>
                </li>
                <li class="sale">
                    <span>¥${vd.singlePrice}单独购买</span>
                     <span>￥${vd.group}拼团</span>
                </li>
            </ul>`;

    var rin = document.getElementsByClassName('introduce')[0];
    rin.innerHTML = `<p>授课师资</p>
    <div class="left">
        <p class="img">
            <img src="" alt="">
        </p>
        <p class="right">
            <span>${vd.teacher}</span>
            <span>${vd.teacherTitle}</span>
        </p>

    </div>
    <div class="right">
        ${vd.introduce}
    </div>`;

    var rt = document.querySelector('.row.title');
    var rspans = rt.querySelectorAll('span');
    var cls = document.querySelectorAll('.classlist');
    rspans[0].onclick = function () {
        this.className = 'active';
        rspans[1].className = '';
        cls[0].className = 'classlist active';
        cls[1].className = 'classlist';
    }
    rspans[1].onclick = function () {
        this.className = 'active';
        rspans[0].className = '';
        cls[1].className = 'classlist active';
        cls[0].className = 'classlist';
    }

    // 渲染课程列表
    var dl = cls[0].getElementsByClassName('content')[0];
    var html = '';
    for (var i = 0; i < classList.length; i++) {
        html += `<div class="detail">
                <p class="title">${classList[i].title}（含${classList[i].num}期）<i class="iconfont icon-down"></i></p>
                <ul class="${i <= 2 ? 'active' : ''}">
                </ul>
            </div>`;
    }
    dl.innerHTML = html;

    var uls = dl.getElementsByTagName('ul');
    for (var i = 0; i < uls.length; i++) {
        var ulhtml = '';
        for (var j = 0; j < classList[i].list.length; j++) {
            ulhtml += `<li>
                    <p>
                        <i class="iconfont icon-bofang"></i>
                        <span>${classList[i].list[j].name}</span>
                    </p>
                    <p>
                    <span>${classList[i].list[j].time}开播</span>
                    <span class="start">播放视频</span></p>
                </li>`;
        }
        uls[i].innerHTML = ulhtml;
    }

    var dlp = dl.getElementsByClassName('title');
    for (var i = 0; i < dlp.length; i++) {
        dlp[i].index = i;
        dlp[i].onclick = function () {
            var pi = this.getElementsByTagName('i')[0];
            if (this.className == 'title') {
                this.className += ' active';
                pi.className = 'iconfont icon-top1';
                uls[this.index].className = 'active';
            } else {
                this.className = 'title';
                pi.className = 'iconfont icon-down';
                uls[this.index].className = '';
            }
        }
    }


    var lis = dl.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseenter = function () {
            var spans = this.getElementsByTagName('p')[1].getElementsByTagName('span');
            spans[0].style.display = 'none';
            spans[1].style.display = 'inline-block';
        }
        lis[i].onmouseleave = function () {
            var spans = this.getElementsByTagName('p')[1].getElementsByTagName('span');
            spans[1].style.display = 'none';
            spans[0].style.display = 'inline-block';
        }
    }

    // 免费试学是否跳转
    var fs = document.getElementsByClassName('freeStudy')[0];
    console.log(fs);
    fs.onclick = function () {
        if (localStorage.login == 'true') {
            location.href = './videoPlay.html';
        } else {
            pos.style.display = 'block';
            document.body.style.overflow = 'hidden';

        }
    }

    // 点击播放视频
    var starts = document.querySelectorAll('.start');
    for (var i = 0; i < starts.length; i++) {
        starts[i].onclick = function () {
            if (localStorage.login == 'true') {
                location.href = './videoPlay.html';
            } else {
                alert('请先登录');
                pos.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    }

    // 点击展开查看全部
    var seeAll = document.querySelector('.seeAll');
    seeAll.onclick = function () {
        if (this.innerHTML == '点击展开查看全部') {
            for (var i = 0; i < dlp.length; i++) {
                var pi = dlp[i].getElementsByTagName('i')[0];
                pi.className = 'iconfont icon-top1';
                uls[i].className = 'active';
            }
            this.innerHTML = '收起查看全部';
        } else {
            for (var i = 0; i < dlp.length; i++) {
                var pi = dlp[i].getElementsByTagName('i')[0];
                pi.className = 'iconfont icon-down';
                uls[i].className = '';
            }
            this.innerHTML = '点击展开查看全部';
        }
    }
}