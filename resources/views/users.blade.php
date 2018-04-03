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
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Active</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody class="users-table">
            @foreach ($users as $user)
              <tr>
                <td></td>
                <td>{{$user->id}}</td>
                <td>{{$user->name}}</td>
                <td>{{$user->username}}</td>
                <td>{{$user->email}}</td>
                <td><a href="#" data-id="{{$user->id}}">{!! ($user->isActive) ? '<label class="badge badge-teal">Active</label>' : '<label class="badge badge-danger">Inactive</label>' !!}</a></td>
                <td><a href="#" class="btn btn-outline-success btn-sm">View Order</a></td>
                <td><a href="#" class="btn btn-outline-danger btn-sm">Cancel</a></td>
              </tr>
            @endforeach
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection