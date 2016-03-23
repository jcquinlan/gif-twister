function getWidth() {
  if (self.innerHeight) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}

function getHeight() {
  if (self.innerHeight) {
    return self.innerHeight;
  }

  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  }

  if (document.body) {
    return document.body.clientHeight;
  }
}


var width = $('#wrapper').width();
var height = $('#wrapper').height();

var img_array = [];

var url = 'http://api.giphy.com/v1/gifs/search?q=dogs&api_key=dc6zaTOxFJmzC';

// Meat of the application because the API call is async
function getGif(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            copyGif(6, JSON.parse(xmlHttp.responseText).data[2].images.downsized.url);
            flipGif();
            pushImgArray();
        }

    }
}

// Once the url is returned, update the image element with the new src
function setSrc(src){
    test_img.src = src;
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
            if( i % 2 !== 0 ){
                node.style.transform = node.style.transform + ' rotatex(180deg)';
            }
            $('#wrapper').append(node.cloneNode());
        });
    }
}

// Basically init the entire thing; begin with making API call
getGif();
