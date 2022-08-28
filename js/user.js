~ function () {
    var login = utils.getClass("login")[0],
        user = utils.getClass("user")[0],
        out = utils.getClass("out",user)[0];
    var resBool = localStorage.getItem("id");
    if (resBool) {
        login.style.display = "none";
        user.style.display = "inline-block";
    }

    out.onclick = function(){
            localStorage.removeItem("id");
            login.style.display = "inline-block";
            user.style.display = "none";
    }
}();