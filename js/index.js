/* 
    首页
    顶部banner    
*/
window.onload = function () {
    var ban = document.getElementsByClassName('banner')[0];
    var banul = ban.getElementsByClassName('list')[0];
    var banimg = ban.getElementsByClassName('img')[0];
    console.log(banul);

    // 数据嵌套
    var bannerhtml = '';
    var imghtml = '';
    for (var i = 0; i < bannerData.length; i++) {
        bannerhtml += `<li>${bannerData[i].title}</li>`;
        imghtml += `<li><img src="${bannerData[i].src}" alt=""></li>`;

    }
    banul.innerHTML = bannerhtml;
    banimg.innerHTML = imghtml;

    var banlis = banul.getElementsByTagName('li');
    var imglis = banimg.getElementsByTagName('li');
    console.log(banlis);
    banlis[0].className = 'high';
    imglis[0].className = 'active';

    // 轮播图
    var n = 0;
    ban.timer = setInterval(auto, 2000);

    function auto() {
        n++;
        if (n == banlis.length) n = 0;
        for (var i = 0; i < banlis.length; i++) {
            banlis[i].className = '';
            // imglis[i].className = '';
            buffMove(imglis[i], {
                opacity: 0
            });
        }
        banlis[n].className = 'high';
        // imglis[n].className = 'active';
        buffMove(imglis[n], {
            opacity: 1
        });

    }

    // 划上停止
    banul.onmouseenter = function () {
        clearInterval(ban.timer);
    }

    // 划下开始
    banul.onmouseleave = function () {
        ban.timer = setInterval(auto, 2000);
    }

    // 划上每一个切换
    for (var j = 0; j < banlis.length; j++) {
        banlis[j].index = j;
        banlis[j].onmouseenter = function () {
            n = this.index - 1;
            auto();
        }
    }


    // 同步课程
    var online = document.getElementsByClassName('onlineCont');
    var onul = online[0].getElementsByTagName('ul')[0];
    console.log(onul);
    var testul = online[1].getElementsByTagName('ul')[0];
    var goodul = online[2].getElementsByTagName('ul')[0];

    setHtml(lesson.online, onul, false);
    setHtml(lesson.test, testul, true);
    setHtml(lesson.good, goodul, false);


    function setHtml(data, father, isTest) {
        var onhtml = '';
        var r = {};
        if (!isTest) {
            for (var i = 0; i < data.length; i++) {
                r = data[i];
                onhtml += `<li>
                            <a href="./html/videoDetail.html"><div class="top">
                                <span class="rj">${r.cont}</span>
                                <img src="${r.src}" alt="" class="m">
                                <p>${r.num}人在学习</p>
                            </div>
                            <div class="bottom">
                                <div class="left">
                                    <span>${r.title}</span>
                                    <span class="time">${r.time}课时</span>
                                </div>
                                <div class="right">${r.isFree ? '免费学习' : '付费学习'}</div>
                            </div></a>
                        </li>`;
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                r = data[i];
                onhtml += `<li>
                            <div class="top">
                                <span class="rj">${r.cont}</span>
                                <img src="${r.src}" alt="" class="m">
                                <p>
                                    <span>${r.num}人已考试</span>
                                    <span>${r.time}</span>
                                </p>
                            </div>
                            <div class="bottom">
                                <div class="left">
                                    <span>${r.title}</span>
                                </div>
                                <div class="right">去考试</div>
                            </div>
                        </li>`;
            }
        }
        father.innerHTML = onhtml;
    }

    var fix = document.getElementsByClassName('fix')[0];
    console.log(ban.offsetLeft);
    var cw = document.documentElement.clientWidth;
    if (cw > 1270) {
        fix.style.left = ban.offsetLeft + 1200 + 'px';
    } else {
        fix.style.left = auto;
        fix.style.right = 0;
    }

    // 返回顶部
    var top1 = fix.querySelector('.top');
    console.log(top1);
    top1.onclick = function () {
        document.body.timer = setInterval(function () {
            document.documentElement.scrollTop -= 50;
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(document.body.timer);
            }
        }, 1);
    }
}