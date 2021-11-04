$(document).ready(function() {
  let nav = `
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-warning bg-gradient p-md-5 p-sm-4 p-3 fs-4">
    <div class="container-fluid px-xl-5">
      <a class="navbar-brand mx-0" href="./index.html"><img src="./assets/logo.png" style="width:180px;"/></a>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav mx-auto">
          <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
          <a class="nav-link" href="./pages/ovopedia.html">Ovopedia</a>
          <a class="nav-link" href="./pages/quemSomos.html">Quem Somos</a>
          <a class="nav-link" href="./pages/faleConosco.html">Fale Conosco</a>
        </div>
        <div class="navbar-nav">
          <a class="nav-link" href="./pages/carrinho.html"><img src="./assets/carrinho.svg"/></a>
        </div>
      </div>
    </div>
  </nav>
`

  $('header').append(nav)
  $('a.active').removeClass('active');
  $('a[href="' + location.pathname + '"]').addClass('active');
})



