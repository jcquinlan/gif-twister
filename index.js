$(document).ready(function(){

    var img_array = [];

    // Meat of the application because the API call is async, so all he functionality
    // is in the callback
    function getGif(search){
        reset();
        var url = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);

        // request callback
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                copyGif(getColumns(), JSON.parse(xmlHttp.responseText).data[createRandom()].images.downsized.url);
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

    // Returns the number of columns that he user has chosen
    function getColumns(){
        return $('[name="columns"]').val();
    }

    //copy the gif the number of times that the user wants, and adjust width
    function copyGif(col, src){
        for( var i = 0 ; i < col; i++ ){
            var test_img = document.createElement('img');
            test_img.src = src;
            test_img.width = $('#wrapper').width()/col;

            // add copied node to the array so it can be pushed to document later
            img_array.push(test_img);
        }
    }

    // cycle through the array and flip each image
    function flipGif(){
        for(var i = 0; i < img_array.length; i++){
            if( i % 2 !== 0 ){
                img_array[i].style.transform = 'scaleX(-1)';
            }
        }
    }

    // This function actually pushes the gifs to the document
    function pushImgArray(){
        for(var i = 0; i < 4; i++ ){
            img_array.forEach(function(node){
                // flip everyother row of images
                if( i % 1 == 0 ){
                    node.style.transform = node.style.transform + ' rotatex(180deg)';
                }
                $('#wrapper').append(node.cloneNode());
            });
        }
    }

    // Generate random number 0 - 24 that picks gif out of response JSON
    function createRandom(){
        return Math.floor(Math.random()*25);
    }

    // There jQuery event handlers cover the form submission with the enter key
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

}); //End the document ready jQuery function
