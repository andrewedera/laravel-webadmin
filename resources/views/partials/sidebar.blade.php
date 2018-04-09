<!-- partial:partials/_sidebar.html -->
<nav class="sidebar sidebar-offcanvas" id="sidebar">
  <ul class="nav">
    <li class="nav-item nav-profile">
      <div class="nav-link">
        <div class="profile-image"> <img src="images/user.png" alt="image"/> <span class="online-status online"></span> </div>
        <div class="profile-name">
          <p class="name">{{ Auth::user()->name }}</p>
          <p class="designation">{{ Auth::user()->username }}</p>
          <div class="badge badge-teal mx-auto mt-3">Online</div>
        </div>
      </div>
    </li>
    <li class="nav-item"><a class="nav-link" href="{{ url('/') }}"><img class="menu-icon" src="images/menu_icons/01.png" alt="menu icon"><span class="menu-title">Dashboard</span></a></li>
    <li class="nav-item"><a class="nav-link" href="{{ route('user.index') }}"><i class="mdi mdi-account-multiple-plus mr-2"></i><span class="menu-title">User List</span></a></li>
    <li class="nav-item"><a class="nav-link" href="pages/ui-features/buttons.html"><img class="menu-icon" src="images/menu_icons/03.png" alt="menu icon"><span class="menu-title">Buttons</span></a></li>
    <li class="nav-item purchase-button"><a class="btn d-block btn-lg btn-dark" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a></li>
  </ul>
</nav>
<!-- partial -->

<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
    {{ csrf_field() }}
</form>