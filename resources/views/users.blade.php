@extends('layouts.app')

@section('content')
<div class="row">
  <div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title mb-4">Users</h3>
        <div class="table-responsive">
          <table id="users_table" class="table center-aligned-table table-striped pt-1 pb-4">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
{{--             <tbody class="users-table">
            @foreach ($users as $user)
              <tr>
                <td></td>
                <td>{{$user->id}}</td>
                <td>{{$user->name}}</td>
                <td>{{$user->username}}</td>
                <td>{{$user->email}}</td>
                <td><a href="#" class="user-status" data-id="{{$user->id}}">{!! ($user->isActive) ? '<label class="badge badge-teal">Active</label>' : '<label class="badge badge-danger">Inactive</label>' !!}</a></td>
                <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td>
              </tr>
            @endforeach
            </tbody> --}}
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalLabel">Update User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <form id="userForm">
      <div class="modal-body">
		  <div class="form-group row">
		    <label for="id" class="col-sm-2 col-form-label">ID</label>
		    <div class="col-sm-10">
		    	<label for="id" id="id" name="id" class="col-form-label font-weight-bold">{{ old('id') }}</label>
		    </div>
		  </div>
		  <div class="form-group row">
		    <label for="name" class="col-sm-2 col-form-label">Name</label>
		    <div class="col-sm-10">
		      <input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}">
		    </div>
		  </div>
		  <div class="form-group row">
		    <label for="username" class="col-sm-2 col-form-label">Username</label>
		    <div class="col-sm-10">
		      <input type="text" class="form-control" id="username" name="username" value="{{ old('username') }}">
		    </div>
		  </div>
		  <div class="form-group row">
		    <label for="email" class="col-sm-2 col-form-label">Email</label>
		    <div class="col-sm-10">
		      <input type="text" class="form-control" id="email" name="email" value="{{ old('email') }}">
		    </div>
		  </div>
		  <div class="form-group row">
		    <label for="status" class="col-sm-2 col-form-label">Status</label>
		    <select class="form-control col-sm-3" id="status" name="status">
		      <option>Active</option>
		      <option>Inactive</option>
		    </select>
		  </div>
		  <div class="form-group row">
		    <label for="password" class="col-sm-2 col-form-label">Password</label>
		    <div class="col-sm-10">
		      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
		    </div>
		  </div>
		  <div class="form-group row">
		  	<label for="password-confirm" class="col-sm-2 col-form-label">Confirm Password</label>
		  	<div class="col-sm-10">
            	<input type="password" class="form-control" id="password-confirm" name="password_confirmation" placeholder="Confirm password">
            </div>
		  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
	</form>
    </div>
  </div>
</div>
@endsection