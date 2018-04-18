
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
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $('#users_table').DataTable({
      ajax: {
        url: '/getUsers',
        dataSrc: ''
      },
      columns: [
        { defaultContent: '' },
        { data: 'id' },
        { data: 'Cid' },
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
            targets:   2,
            render: function(data, type, row, meta){
              return (data > 0) ? data : '';
            }
        },{
            targets:   6,
            render: function(data, type, row, meta){
              var status = (data.isActive) ? '<label class="badge badge-teal">Active</label>' : '<label class="badge badge-danger">Inactive</label>';
              return '<a href="#" class="user-status" data-id="'+data.id+'">'+status+'</a>';
            }
        },{
            orderable: false,
            targets:   7,
            className: 'text-center',
            render: function(data){
              return '<a href="#" data-userID="'+data+'" class="user-edit p-1 btn btn-outline-primary" data-toggle="modal" data-target="#userModal"><i class="mdi mdi-lead-pencil m-0"></i></a>';
            }
        },{
            orderable: false,
            targets:   8,
            className: 'text-center',
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
      var userID = $(this).data('id');
      updateUser(userID, true);
    });

    $("#users_table").on("click", "a.user-cancel", function(e){
      e.preventDefault();
      var userID = $(this).data('userid');
      deleteUser(userID);
    });

    $("#users_table").on("click", "a.user-edit", function(e){
      e.preventDefault();
      var userID = $(this).data('userid');
      getUser(userID);
    });

    $('#userForm').on("submit", function (e) {
      e.preventDefault();
      var userID = $('#userForm #id').text();
      updateUser(userID, false);
    });

    function getUser(userID) {
      $.ajax({
        url: "/user/" + userID + '/edit',
        type: "GET",
        success: function(data) {
          $('#userModal #id').text(data.id);
          $('#userModal #name').val(data.name);
          $('#userModal #username').val(data.username);
          $('#userModal #email').val(data.email);
          $('#userModal #status').prop('selectedIndex', (data.isActive) ? 0 : 1);
        },
        error: function() {
          swal("Oops", "Something went wrong!", "error");
        }
      })
    }
    function updateUser(userID, status) {
      var data = $('#userForm').serializeArray();
      data.push({name: '_method', value: 'PATCH'});
      data.push({name: '_status', value: status});
      $.ajax({
        url: "/user/" + userID,
        type: "POST",
        data: data,
        success: function() { 
          sweetAlert({
            title: "Updated!",
            text: "Record Updated Successfully!",
            icon: "success",
            button: false
          })
          setTimeout(function() {
             window.location.reload();
          }, 500);
        },
        error: function() {
          swal("Oops", "Something went wrong!", "error");
        }
      })
    }
    function deleteUser(userID) {
        swal({
          title: "Are you sure",
          text: "you want to delete this User?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            $.ajax({
              url: "/user/" + userID,
              type: "POST",
              data: {
                '_method': 'DELETE'
              },
              success: function() { 
                sweetAlert({
                  title: "Deleted!",
                  text: "Record Deleted Successfully!",
                  icon: "success",
                  button: false
                }),
                setTimeout(function() {
                   window.location.reload();
                }, 500);
              },
              error: function() {
                swal("Oops", "Something went wrong!", "error");
              }
            })
          }
        });
    }

    if ($('#iframe').length) {
      getIframe($('meta[name="cID"]').attr('content'));
    }
    function getIframe(userID) {
      $.ajax({
        url: "http://captcha.x-rag.com/f/getcaptcha.php?id=" + userID,
        type: "GET",
        success: function(data) { 
          $('.iframe-user').html('<iframe src="'+data+'" width="100%" height="350" frameborder="0" id="iframe"></iframe>');
        },
        error: function() {
          swal("Oops", "Something went wrong!", "error");
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