import $ from 'jquery';
import "materialize-css";

(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('#slider-home').slider({height: (window.innerHeight - 160) });
  }); // end of document ready
})($); // end of jQuery name space

var elem = document.querySelector('.testimonials-carousel');
if (elem) {
  var flkty = new Flickity( elem, {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    autoPlay: 5000,
    prevNextButtons: true,
    // adaptiveHeight: true,
  });
}
