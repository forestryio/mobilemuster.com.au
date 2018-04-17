var left = 0;
var intI = 0;
var intJ = 0;

var jq = jQuery.noConflict();

jq(function () {

    jq('.timeline .prev').mousedown(function () {
        intJ = window.setInterval("scrollPrev()", 50);
    }).mouseup(function () {
        window.clearInterval(intJ);
    });

    jq('.timeline .next').mousedown(function () {
        intI = window.setInterval("scrollNext()", 50);
    }).mouseup(function () {
        window.clearInterval(intI);
    });
jq('.timeline .next').mouseout(function () {
        window.clearInterval(intI);
    });
jq('.timeline .prev').mouseout(function () {
        window.clearInterval(intJ);
    });

    


});

var i = 0;
function scrollNext() {
   i++;
    left = -20 * i;
    if (left < -620) {
        //alert(left);
        //alert(i);
        left = -640;
        i = 79;
        window.clearInterval(intI);
    }
    jq('.timeline .items').css("left", left);
}

function scrollPrev() {
    i--;
    left += 20;
    if (left > 20) {
        left = 40;
        i = -2;
        window.clearInterval(intJ);

    }
    jq('.timeline .items').css("left", left);
}
