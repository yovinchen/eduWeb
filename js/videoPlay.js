window.onload = function () {

    // 登陆部分
    localStorage.login = 'true';
    localStorage.phone = '13222221111';
    localStorage.pass = '123456';

    var loginbox = document.querySelector('.login');
    var user = document.querySelector('.user');
    if (localStorage.login == 'true') {
        user.style.display = 'inline-block';
        loginbox.style.display = 'none';
    }

    // 用户退出菜单
    var out = user.querySelector('.out');
    out.onclick = function(){
        localStorage.login = 'false';
        localStorage.phone = '';
        localStorage.pass = '';
        if(location.href.indexOf('videoPlay') != -1){
            location.href = '../index.html';
        } else {
            location.reload();
        }
    }


    var vd = videoDetail;
    var cd = document.getElementsByClassName('classDetail')[0];
    var video = cd.getElementsByTagName('video')[0];
    video.poster = vd.poster;
    video.src = vd.src;

    var rg = cd.getElementsByClassName('right')[0];
    // 右侧盒子内容
    var contents = rg.getElementsByClassName('content');
    var html = '';
    for (var i = 0; i < classList.length; i++) {
        var data = classList[i];
        html += `<div class="list">
                <p class="title">${data.title}（含${data.num}期）</p>
                <ul class="list">
                </ul>
            </div>`;
    }
    contents[0].innerHTML = html;
    var contuls = contents[0].getElementsByTagName('ul');
    for (var i = 0; i < contuls.length; i++) {
        html = '';
        for (var j = 0; j < classList[i].list.length; j++) {
            html += `<li class="${i==0 && j==0 ? 'active': ''}" src="${classList[i].list[j].src}">
                        <span>${classList[i].list[j].name}</span>
                        <i class="iconfont icon-bofang"></i>
                    </li>`;
        }
        contuls[i].innerHTML = html;
    }

    // 点击li切换播放
    var contlis = contents[0].getElementsByTagName('li');
    for (var i = 0; i < contlis.length; i++) {
        contlis[i].onclick = function () {
            video.src = this.getAttribute('src');
            video.play();
            for (var j = 0; j < contlis.length; j++) {
                contlis[j].className = '';
            }
            this.className = 'active';
        }
    }

    // 渲染评论
    var commentul = contents[1].getElementsByClassName('comment')[0];
    setComment();
    function setComment() {
        html = '';
        for (var i = 0; i < commentList.length; i++) {
            html += `<li>
        <p>
            <img src="${commentList[i].src}" alt="">
            <span>${commentList[i].name}</span>
            <span>${commentList[i].time}</span>
        </p>
        <p>${commentList[i].content}</p>
    </li>`;
        }
        commentul.innerHTML = html;
    }

    var spants = rg.getElementsByClassName('top')[0].getElementsByTagName('span');
    console.log(spants);
    spants[0].onclick = function () {
        this.className = 'active';
        spants[1].className = '';
        contents[0].className = 'content active';
        contents[1].className = 'content';

    }
    spants[1].onclick = function () {
        this.className = 'active';
        spants[0].className = '';
        contents[1].className = 'content active';
        contents[0].className = 'content';
    }

    // 发表评论
    var push = rg.getElementsByClassName('push')[0];
    var txt = rg.getElementsByClassName('txt')[0];
    push.onclick = function () {
        console.log(txt.value);
        var obj = {
            name: localStorage.phone,
            src: '../img/login/wx.png',
            content: txt.value,
            time: new Date().getHours() + ':' + new Date().getSeconds()
        };
        commentList.unshift(obj);
        setComment();
    }

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
                        <span class="title">${classList[i].list[j].name}</span>
                        ${classList[i].list[j].isStudy ? '<span class="hasStudy">已学完</span>' : ''}
                    </p>
                    <p>
                    ${!classList[i].list[j].isStudy ? `<span>${classList[i].list[j].time}开播</span><span class="start">播放视频</span></p>` : `<span>${classList[i].list[j].classTime}</span>`}
                    
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
            if (spans.length > 1) {
                spans[0].style.display = 'none';
                spans[1].style.display = 'inline-block';
            }

        }
        lis[i].onmouseleave = function () {
            var spans = this.getElementsByTagName('p')[1].getElementsByTagName('span');
            if (spans.length > 1) {
                spans[1].style.display = 'none';
                spans[0].style.display = 'inline-block';
            }

        }
    }

    // 点击播放视频
    var starts = document.querySelectorAll('.start');
    for (var i = 0; i < starts.length; i++) {
        starts[i].onclick = function () {
            alert('下一个页面');
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

    // 点击播放
    var btni = video.nextElementSibling;
    btni.onclick = function(){
        if(video.pause){
            video.play();
            this.style.display = 'none';
        }
    }
    video.onpause = function(){
        btni.style.display = 'block';
    }
    video.onplay = function(){
        btni.style.display = 'none';
    }
}