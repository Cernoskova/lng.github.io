import $ from 'jquery';
import "materialize-css";

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.carousel').carousel();
    $('#slider-home').slider({height: (window.innerHeight - 160) });
  }); // end of document ready
})($); // end of jQuery name space