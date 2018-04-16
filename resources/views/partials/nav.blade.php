<!-- Navigation -->
<nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
  <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
    <a class="navbar-brand brand-logo" href="{{ url('/') }}"><img src="images/logo.svg" alt="logo"/></a>
    <a class="navbar-brand brand-logo-mini" href="{{ url('/') }}"><img src="images/logo-mini.svg" alt="logo"/></a>
  </div>
  <div class="navbar-menu-wrapper d-flex align-items-center">
    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
      <span class="icon-menu"></span>
    </button>
    <ul class="navbar-nav navbar-nav-right mr-5">
    	<li class="nav-item dropdown">
    		<a class="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <i class="mdi mdi-email-variant"></i>
              <span class="count">7</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
				<div class="dropdown-item">
					<p class="mb-0 font-weight-normal float-left">You have 7 captchas available</p>
				</div>
        	</div>
    	</li>
    </ul>
  </div>
</nav>
<!-- Navigation -->