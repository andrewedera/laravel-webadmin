
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
require('sweetalert');

(function($) {
  'use strict';
  $(function() {
    $('#users_table').DataTable({
      ajax: {
        url: "/api/getUsers",
        dataSrc: ''
      },
      columns: [
        { defaultContent: '' },
        { data: 'id' },
        { data: 'username' },
        { data: 'name' },
        { data: 'email' },
        { data: null },
        { data: 'id' },
        { data: 'id' }
      ],
      select: true,
      fixedHeader: true,
      responsive: true,
      columnDefs: [ {
            orderable: false,
            searchable: false,
            className: 'select-checkbox',
            targets:   0
        },{
            targets:   5,
            render: function(data, type, row, meta){
              var status = (data.isActive) ? '<label class="badge badge-teal">Active</label>' : '<label class="badge badge-danger">Inactive</label>';
              return '<a href="#" class="user-status" data-id="'+data.id+'">'+status+'</a>';
            }
        },{
            orderable: false,
            targets:   6,
            render: function(data){
              return '<a href="#" data-userID="'+data+'" class="user-edit p-1 btn btn-outline-primary"><i class="mdi mdi-lead-pencil m-0"></i></a>';
            }
        },{
            orderable: false,
            targets:   7,
            render: function(data){
              return '<a href="#" data-userID="'+data+'" class="user-cancel p-1 btn btn-outline-danger"><i class="mdi mdi-delete m-0"></i></a>';
            }
      }],
      select: {
          style:    'multi',
          selector: 'td:first-child'
      },
      order: [[ 1, 'asc' ]]
    });
    //https://www.gyrocode.com/articles/jquery-datatables-how-to-add-a-checkbox-column/
    $("#users_table").on("click", "a.user-status", function(e){
      e.preventDefault();
      $('#user-form').attr('action', '/user/' + $(this).data('id'));
      $('#user-form input[name="_status"]').val('true');
      $('#user-form').submit();
    });

    $("#users_table").on("click", "a.user-cancel", function(e){
      e.preventDefault();
      var userID = $(this).data('userid');
      deleteUser(userID);
    });

    function deleteUser(userID) {
        swal({
          title: "Are you sure",
          text: "you want to delete this User?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
          // showCancelButton: true,
          // closeOnConfirm: false,
          // showLoaderOnConfirm: true,
          // confirmButtonText: "Yes, delete it!",
          // confirmButtonColor: "#ec6c62"
        })
        .then((willDelete) => {
          if (willDelete) {
            $.ajax({
              url: "/user/" + userID,
              type: "POST",
              data: {
                '_method': 'DELETE'
              },
            })
            .done(function(data) {
              sweetAlert({
                title: "Deleted!",
                text: "Record Deleted Successfully!",
                type: "success"
              },
              function() {
                window.location.reload(true);
              });
            })
            .error(function(data) {
                swal("Oops", "Something went wrong!", "error");
            });
          }
        });
    }

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