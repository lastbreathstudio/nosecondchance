$(function() {
    $(".enter").on("click", function() {
        $("body").animate({"scrollTop": window.scrollY+600}, 1000);
        $(".enter").hide();
        return false;
       
    });
});

/////////////sticky navigation
    var sticky = document.getElementById("sticky-nav");
        var offset = $( "#sticky-nav" ).offset();
        $(window).scroll(function() {
            if ( $('body').scrollTop() > offset.top){
                $('#sticky-nav').addClass('fixed');
            } else {
                 $('#sticky-nav').removeClass('fixed');
            }
        });

        /////////////modal window registration
        setTimeout(function(){
            $("#sub").css("z-index", "9999").fadeIn(500);
        },5000);
            $("#x-button").on("click", function(){
                $("#sub").fadeOut(500);
            })
            
/////////timer for release
    function timer(time){//example "march 3, 2016"
    // set the date we're counting down to
    var target_date = new Date(time).getTime();
    // variables for time units
    var days, hours, minutes, seconds; 
    // get tag element
    var countdown = document.getElementById("countdown");
    // update the tag with id "countdown" every 1 second
    var timer = setInterval(function () {
    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;
    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;
     
    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;
     
    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);
    if(seconds<10)
        seconds = '0' + seconds; 
            if(minutes<10)
                minutes = '0' + minutes; 
                    if(hours<10)
                            hours = '0' + hours;                        
    // format countdown string + set tag value
    countdown.innerHTML = "<ul><div id='countNum'><div id='countTitle'>" + days + "</div>DAYS</div>" + "<div id='countNum'><div id='countTitle'>" + hours + "</div>HOURS</div>" + "<div id='countNum'><div id='countTitle'>"
    + minutes + "</div>MINUTES</div>" + "<div id='countNum'><div id='countTitle'>" + seconds + "</div>SECONDS</div></ul>";  
    if(target_date < current_date){
        clearInterval(timer);
        countdown.innerHTML = '';
    }
}, 1000);
};

 //timer("march 3, 2016")


        //hide all the news except first 3 
        $('.post').slice(3).css('display','none');
            $('.more_news').on('click',function(){
                $('.post').slice().css('display','');
                $('.more_news').remove();
        })
        
//smoothscroll
$(function() {
  // This will select everything with the class smoothScroll
  // This should prevent problems with carousel, scrollspy, etc...
  $('.smoothScroll').click(function() {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000); // The number here represents the speed of the scroll in milliseconds
        return false;
      }
  });
});