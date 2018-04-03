@extends('layouts.app')

@section('content')
<div class="row">
  <div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-4">Orders</h5>
        <div class="table-responsive">
          <table class="table center-aligned-table table-striped">
            <thead>
              <tr>
                <th class="border-bottom-0">Name</th>
                <th class="border-bottom-0">Username</th>
                <th class="border-bottom-0">Email</th>
                <th class="border-bottom-0">Active</th>
                <th class="border-bottom-0"></th>
                <th class="border-bottom-0"></th>
              </tr>
            </thead>
            <tbody>
            @foreach ($users as $user)
              <tr>
                <td>{{$user->name}}</td>
                <td>{{$user->username}}</td>
                <td>{{$user->email}}</td>
                <td>{{ ($user->isActive) ? '<label class="badge badge-teal">Active</label>' : '<label class="badge badge-danger">Inactive</label>' }}</td>
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