<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600|Poppins:400,500,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ mix('css/themes.css') }}" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <main>
            <div class="container-scroller">
                @include('partials.nav')
                <div class="container-fluid page-body-wrapper">
                    @include('partials.sidebar')
                    <div class="main-panel">
                        {{-- <div class="loader-wrapper"><div class="loader"></div></div> --}}
                        <div class="content-wrapper">
                            @yield('content')
                        </div>
                        <!-- content-wrapper ends -->
                    @include('partials.footer')
                    </div>
                    <!-- main-panel ends -->
                </div>
                <!-- page-body-wrapper ends -->
            </div>
            <!-- container-scroller -->
        </main>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" async></script>
</body>
</html>
