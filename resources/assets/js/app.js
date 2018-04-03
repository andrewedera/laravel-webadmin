
/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

require('./bootstrap');
require('datatables.net-bs4');
require('datatables.net-fixedheader');
require('datatables.net-responsive');
require('datatables.net-rowgroup');
require('datatables.net-select');

(function($) {
  'use strict';
  $(function() {
    $('#users_table').DataTable({
      select: true,
      fixedHeader: true,
      responsive: true,
      columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        },{
            orderable: false,
            targets:   6
        },{
            orderable: false,
            targets:   7
        }],
        select: {
            style:    'multi',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]]
    });

    $(".users-table").on("click", "a", function(e){
      var id = $(this).data('id');
      var token = $('meta[name="csrf-token"]').attr('content');
      e.preventDefault();
      $.ajax({
          url : 'user/' + id,
          type: 'POST',
          data: { 'id': id, '_token': token, '_method': 'PUT' },
          error: function (data) {
              console.log('Error:', data);
          }
      });
    });

    var sidebar = $('.sidebar');

    //Add active class to nav-link based on url dynamically
    //Active class can be hard coded directly in html file also as required
    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.nav li a', sidebar).each(function() {
      var $this = $(this);
      if (current === "") {
        //for root url
        if ($this.attr('href').indexOf("index.html") !== -1) {
          $(this).parents('.nav-item').last().addClass('active');
          if ($(this).parents('.sub-menu').length) {
            $(this).closest('.collapse').addClass('show');
            $(this).addClass('active');
          }
        }
      } else {
        //for other url
        if ($this.attr('href').indexOf(current) !== -1) {
          $(this).parents('.nav-item').last().addClass('active');
          if ($(this).parents('.sub-menu').length) {
            $(this).closest('.collapse').addClass('show');
            $(this).addClass('active');
          }
        }
      }
    })

    //Close other submenu in sidebar on opening any

    sidebar.on('show.bs.collapse', '.collapse', function() {
      sidebar.find('.collapse.show').collapse('hide');
    });


    //Change sidebar and content-wrapper height
    applyStyles();

    function applyStyles() {
      //Applying perfect scrollbar
      if ($('.scroll-container').length) {
        const ScrollContainer = new PerfectScrollbar('.scroll-container');
      }
    }

    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

    $(".purchace-popup .popup-dismiss").on("click",function(){
    	$(".purchace-popup").slideToggle();
    });

    $('[data-toggle="offcanvas"]').on("click", function() {
		$('.sidebar-offcanvas').toggleClass('active')
	});
  });
})(jQuery);