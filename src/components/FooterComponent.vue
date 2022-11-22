<template>

    <footer class="footer font-small text-center">
    <div class="row">

        <div class="col-sm-12 col-md-12 copyright">

            <p class="copy">Copyright © {{ new Date().getFullYear() }} - iZone</p>

        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-12 admin">
            <router-link to="/adminlogin"><p class="admin-link">Admin</p></router-link>
        </div>
    </div>
  </footer>

</template>


