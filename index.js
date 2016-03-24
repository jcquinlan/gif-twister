$(document).ready(function(){


var width = $('#wrapper').width();
var height = $('#wrapper').height();

var img_array = [];

// Meat of the application because the API call is async
function getGif(search){
    reset();
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            copyGif(4, JSON.parse(xmlHttp.responseText).data[createRandom()].images.downsized.url);
            flipGif();
            pushImgArray();
        }

    }
}

function reset(){
    // Resets the wrapper to fill with next gif
    img_array = [];
    $('#wrapper').empty();
}

//copy the gif the number of times that the user wants, and adjust width
function copyGif(col, src){
    for( var i =0 ; i < col; i++ ){
        var test_img = document.createElement('img');
        test_img.src = src;
        test_img.width = $('#wrapper').width()/col;

        img_array.push(test_img);
    }
}

function flipGif(){
    for(var i = 0; i < img_array.length; i++){
        if( i % 2 !== 0 ){
            img_array[i].style.transform = 'scaleX(-1)';
        }
    }
}

function pushImgArray(){
    for(var i = 0; i < 4; i++ ){
        img_array.forEach(function(node){
            if( i % 1 == 0 ){
                node.style.transform = node.style.transform + ' rotatex(180deg)';
            }
            $('#wrapper').append(node.cloneNode());
        });
    }
}

function createRandom(){
    return Math.floor(Math.random()*25);
}

$('#search-field').bind("enterKey",function(e){
    var search = $('#search-field').val().trim();
    if(search){ getGif(search); $('#search-field').val('') }
});

$('#search-field').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

}); //End the document redy jQuery function
