function type(target) {
    return Object.prototype.toString.call(target);
}

function ajax(url, obj, fn) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fn(xmlhttp.responseText, obj);
        }
    }

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}
window.onload = function() {
        var mydiv = document.getElementById('mydiv');
        mydiv.onclick = function() {
            ajax('./JsOO.js', mydiv, (data, obj) => {
                obj.innerHTML = data;
            });
        }
    } //ajax模板
