function wordChange(){

    var count = 0;
    var numbers = ['.1','.2','.3','.4','.5']; //the span class names
        $.each(numbers, function(i,num){
           setTimeout(function(){
               $(num).fadeIn(1000,"linear").delay(5000);//Fades and out, timing is key
               $(num).fadeOut(1000,"linear");
               
               /*check if at end of array to repeat*/
               if ((numbers.length-1) == count){
                console.log("end")
                setTimeout(function(){
                    wordChange();
                },7001); 
                   
            }
                count ++;
           }, i * 7001);//add the delay, time has to be all other delays + 1

    });
}
//wordChange();



$(function(){
    
    var slideTime = 1500; //movement time
    var stop = 5000;//time stopped on a slide
    var currentSlide = 1;
    
    //Dom Cache
    var $locationBox = $('.location-box');
    var $slider = $locationBox.find('.slider');
    var $slide = $slider.find('.slide');
    
    //setInterval
    setInterval(function(){
        $slider.animate({'margin-left': '-=715'},slideTime,function(){
            currentSlide++;
            if(currentSlide === $slide.length){
                //console.warn("End");//debug
                currentSlide = 1;
                $slider.css('margin-left',0); //sets last image to first.
            }
        });
    },stop);//End of interval
    
});

$(function(){
    
    var $house = $('.house');
    var $video = $house.find('.video');//find the element
    
    $house.on('mouseenter',function(){//on mouse enter play video
        var current = this.id - 1; // pushes the value back one for the array
        console.log(current); //debug
        $video.get(current).play();
        
    });
    $house.on('mouseleave',function(){//on mouse leave pause.
        var current = this.id - 1;
        console.log(current); 
        $video.get(current).pause();
        $video.get(current).currentTime = 0; //sets video back to 0
    });
    
});

function infoScroll(){//moves the info section down
    var $sidebar   = $(".house-info"), 
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 150;

    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 50
            });
        }
    });
};

$(function(){ //gets the slider to move
    
    var $thumbs = $(".thumbs");
    var move = -150;
    var move2 = 150;
    var slidepos = 0;
    var slideNum = 0;
    var pics = $(".thumbs img").length;
    
    $(".arrow-prev").hide();
    
    
    
    $(".arrow-next").click(function(){
        slideNum++;
        arrowToggle();
        //console.warn("Click");
        $(".thumbs").animate({
            marginLeft: move * slideNum
        });
        slidepos = move * slideNum;
        console.warn(slidepos);
    });
    $(".arrow-prev").click(function(){
        slideNum--;
        arrowToggle();
        console.warn("prev");
        $(".thumbs").animate({
            marginLeft: slidepos + move2
        });
        slidepos = slidepos + move2;
    });
    
    function arrowToggle() {
        console.info("Test");
        if(slideNum == 0){
            console.warn("Zero");
            $(".arrow-prev").hide();
        }else{
            console.warn(slideNum);
            $(".arrow-prev").show();
        }
        
        if(slideNum == pics / 2){ //needs to be half 
            console.warn("Zero");
            $(".arrow-next").hide();
        }else{
            console.warn(slideNum);
            $(".arrow-next").show();
        }
        
        }
});


$(function(){//when clicked an thumb image, it changes the big pic
    
    var image = $(".thumbs img");
    
    image.click(function(){
        var name = $(this).attr('src');
        console.log("pressed")
        $(".house-gallary > img").attr("src",name);
    });
    
});


/*----------COMMENTS---------*/
// utility functions for localstorage
    function setObject(key, value) {
    window.localStorage.setItem(key,
    JSON.stringify(value));
};
    function getObject(key) {
    var storage = window.localStorage;
    var value = storage.getItem(key);
    return value && JSON.parse(value);
};
    function clearStorage() {
    // removes everything placed in localstorage
    window.localStorage.clear();
};

function clearboth(){
    $("#namebox").val('');
    $("#comment").val(''); 
    console.log("clear");
};

function saveComment(){
    var ctext = $('#comment').val();
    var cname = $('#namebox').val();
    var $comments = $('.comments');
    var prevComments = $comments.html();
   
    if(cname === ''){
        cname = 'Anon';
    }
    
    //alert('saveComment ....  cname= ' + cname + ' ctext = ' + ctext);
    var curComment = '<p><span> '+ cname +':</span><br>' +ctext+ '</p><hr>';
    //$('#cmtlist').empty();
    $comments.append(curComment);
    
    console.info(prevComments);
    
    var cmtlist = curComment + prevComments;
    
    setObject('totCmts', cmtlist);
    
    clearboth();
    
};
function fetchComments(){
    var $comments = $('.comments');
    var inlist=getObject('totCmts');
        if(inlist === null){
            inlist='';
        }
    //display the comments
    $comments.empty();
    $comments.append(inlist);
    console.log(inlist);
};

$(function(){
    fetchComments();
});
