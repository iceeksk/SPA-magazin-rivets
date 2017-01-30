var input;

(function() {
    var information = '',
        xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
            information = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", "package.json", false);
    xmlhttp.send();
    input = JSON.parse(information);
}());

function dataParse(str) {
    var data = str;
    for (var i = 0; i < str.length; i++) {
        for (var y = 0; y < data[i].goods.length; y++) {
            data[i].goods[y].amount = 0;
        }
    }
    return data
};

var inputData = dataParse(input);

var viev = document.getElementById("view");
