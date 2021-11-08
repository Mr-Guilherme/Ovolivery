class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" />
    <div class="container-fluid bg-warning bg-gradient px-0 px-lg-5">
      <footer class="px-5 pt-5">
        <div class="row">
          <div class="col-12 text-center mb-4 col-md-5 mb-md-0 text-md-start col-lg-7">
            <img src="../assets/logo.svg" style="width:150px;" class="mb-3"/>
            <ul class="nav flex-column">
              <li class="nav-item mb-2"><a href="../index.html" class="nav-link p-0 text-muted">Home</a></li>
              <li class="nav-item mb-2"><a href="ovopedia.html" class="nav-link p-0 text-muted">Ovopedia</a></li>
              <li class="nav-item mb-2"><a href="quemSomos.html" class="nav-link p-0 text-muted">Quem Somos</a></li>
              <li class="nav-item mb-2"><a href="faleConosco.html" class="nav-link p-0 text-muted">Fale Conosco</a></li>
            </ul>
          </div>
    
          <div class="col-12 text-center col-md-7 text-md-start col-lg-5">
            <form method="get" action="../file/LANCHES-RÁPIDOS-E-SAUDÁVEIS.pdf" target="_blank">
              <h5>Coloque seu email para baixar um ebook grátis!</h5>
              <p>Ebook com receitas e informações nutricionais.</p>
                <div class="d-flex w-100 gap-2">
                  <input required id="newsletter1" type="email" class="form-control" placeholder="Endereço de Email">
                  <button type="submit" class="btn btn-primary" type="button">Baixar</button>
                </div>
            </form>
          </div>
        </div>
    
        <div class="d-flex justify-content-between py-4 mt-4 border-top">
          <p>© 2021 Ovolivery, Inc. Todos os direitos reservados.</p>
          <ul class="list-unstyled d-flex">
            <li class="ms-3"><a class="link-dark" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/facebook.png"/></a></li>
            <li class="ms-3"><a class="link-dark" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png"/></a></li>
            <li class="ms-3"><a class="link-dark" href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/twitter--v1.png"/></a></li>
          </ul>
        </div>
      </footer>
    </div>
    `
  }
}

window.customElements.define("footer-email", Footer);