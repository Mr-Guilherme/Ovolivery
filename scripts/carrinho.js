class APIs {
  async viacep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  // googleAgenda() {

  // }
}

class checkoutForm extends APIs {
  constructor() {
    super();
    this.formDOM = {
      form: document.querySelector("#billing"),
      firstName: document.querySelector("#firstName"),
      lastName: document.querySelector("#lastName"),
      email: document.querySelector("#email"),
      zip: document.querySelector("#zip"),
      state: document.querySelector("#state"),
      city: document.querySelector("#city"),
      address: document.querySelector("#address"),
      address2: document.querySelector("#address2"),
      deliveryQuantity: document.querySelector("#delivery-quantity"),
      deliveryDate: document.querySelector("#delivery-date"),
      sameAddress: document.querySelector("#same-address"),
      saveInfo: document.querySelector("#save-info"),
      paymentMethod: document.querySelectorAll('input[name="paymentMethod"]'),
      paymentMoney: document.querySelector("#money"),
      infoCard: document.querySelectorAll(".pay-card"),
      checkoutButton: document.querySelector("#checkout"),
    };

    this.formData = new Object();

    this.mainForm();
  }

  mainForm() {
    this.nameValidation();
    this.cepValidation();
    this.dateValidation();
    this.paymentValidation();

    this.mainValidation();
  }

  mainValidation() {
    const form = this.formDOM.form;

    form.addEventListener('submit', (e) => {
      
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
  
        form.classList.add("was-validated");
      } else {
        e.preventDefault();
        this.dataCollecting();

        this.formDOM.checkoutButton.setAttribute("data-bs-toggle", "modal");
        this.formDOM.checkoutButton.setAttribute("data-bs-target", "#modalDone");
        // this.formDOM.checkoutButton.click();
      }
    });
  }

  nameValidation() {
    let name = this.formDOM.firstName;
    let lastName = this.formDOM.lastName;
    let regexOnlyLetters = /[\d~`'"!@#$%^&()_={}[\]:;,.<>+\/\\?\-]/g;

    name.addEventListener("keyup", (e) =>
      this.isInvalidTest(e, regexOnlyLetters)
    );
    name.addEventListener("change", (e) => {
      e.target.value = e.target.value.trim();
      this.isInvalidTest(e, regexOnlyLetters);
    });

    lastName.addEventListener("keyup", (e) =>
      this.isInvalidTest(e, regexOnlyLetters)
    );
    lastName.addEventListener("change", (e) => {
      e.target.value = e.target.value.trim();
      this.isInvalidTest(e, regexOnlyLetters);
    });
  }

  cepValidation() {
    const cep = this.formDOM.zip;
    cep.maxLength = 9;
    let regexOnlyCep = /(?!\-)\D+/g;

    cep.addEventListener("keyup", (e) => this.isInvalidTest(e, regexOnlyCep));

    cep.addEventListener("change", (e) => {
      cep.value = String(e.target.value).replace(/-/g, "");
      this.cepAutoComplete(cep.value);
    });
  }

  async cepAutoComplete(cep) {
    try {
      this.formDOM.zip.classList.remove("is-invalid");
      this.formDOM.checkoutButton.disabled = false;

      const { uf, localidade, logradouro, complemento } = await this.viacep(
        cep
      );

      if(uf == undefined || localidade == undefined || logradouro == undefined|| complemento == undefined) {
        throw new Error;
      } else {
        this.formDOM.state.value = uf;
        this.formDOM.city.value = localidade;
        this.formDOM.address.value = logradouro;
        this.formDOM.address2.value = complemento;
      }

    } catch (error) {
      this.formDOM.zip.classList.add("is-invalid");
      this.formDOM.checkoutButton.disabled = true;
    }
  }

  isInvalidTest(e, regex) {
    if (regex.test(e.target.value)) {
      e.target.classList.add("is-invalid");
      this.formDOM.checkoutButton.disabled = true;
    } else {
      e.target.classList.remove("is-invalid");
      this.formDOM.checkoutButton.disabled = false;
    }
  }

  dateValidation() {
    this.formDOM.deliveryDate.min = new Date().toISOString().split("T")[0];
  }

  paymentValidation() {
    this.formDOM.paymentMethod.forEach((method) => {
      method.addEventListener("click", () => {
        if (this.formDOM.paymentMoney.checked == true) {
          this.formDOM.infoCard.forEach((info) => (info.disabled = true));
        } else {
          this.formDOM.infoCard.forEach((info) => (info.disabled = false));
        }
      });
    });
  }

  dataCollecting() {
    let inputData = document.querySelectorAll('input.billingForm')
    let dataGetting = Array.from(inputData).reduce((acc, input) => ({...acc, [input.id]: input.value}), {});

    let quantitySelected = document.querySelector('select.billingForm option:checked');
    dataGetting['times'] = quantitySelected.value;
    
    let paymentSelected = document.querySelector('input[name="paymentMethod"]:checked');
    dataGetting['paymentMethod'] = paymentSelected.value;
    
    this.formData = Object.assign({}, dataGetting);
  }

  
}

const form = new checkoutForm();


class Cart extends checkoutForm{
  constructor() {
    super();
    this.itemData = [];
    this.items = new Array();

    this.$cartList = document.querySelector('#cart-list');

    this.mainCart();
  }

  mainCart() {
    this.receiveData();
    this.createItem();
    this.insertItem();
    this.deleteItem();

    this.cancelOrder();
    this.finalizeOrder();
  }

  receiveData() {
    try {
      let data = JSON.parse(window.localStorage.getItem('dataEgg'));
      this.itemData.push(...data);
    } catch (error) {
      this.showEmpty();
    }
    
  }  

  cancelOrder() {
    const cancelButton = document.querySelector('#resetForm');
    cancelButton.addEventListener('click', () => {
      this.formDOM.form.classList.remove('was-validated')
      this.formDOM.form.reset();
      this.itemData.length = 0;
      this.items.length = 0;
      window.localStorage.clear();
      this.updateAmount();
      this.updateTotalPrice();
      this.showEmpty();
    })
  }

  finalizeOrder() {
    const doneButton = document.querySelector('#done');
    doneButton.addEventListener('click', () => {
      window.localStorage.clear();
      this.formDOM.form.submit();
    });
  }

  createItem() {
    if(this.itemData.length === 0) {
      return
    }

    // <input class="border-0" style="width: 25%" type="number" value="0"/>
    for(let data of this.itemData) {
      let item = `
      <li id=${data.id} class="my-item list-group-item d-flex justify-content-between lh-sm pe-0">
        <div class="d-flex justify-content-between flex-fill pe-2 border-3 border-end border-danger">
          <div>
            <h6 class="my-0">${data.name}</h6>
            <small class="text-muted">${data.amount} unidades</small>
          </div>
          <div class="my-auto">
            <div class="text-muted">R$${data.price}</div>
          </div>
        </div>
        <div class="wrapper-delete align-center my-auto px-2">
          <a class="deleteButton" href="#">
            <i class="bi bi-trash-fill text-danger fs-5"></i>
          </a>
        </div>
      </li>
      `
      this.items.push(item);
    }
  }

  deleteItem() {
    let deleteButtons = document.querySelectorAll('.deleteButton');
    
    deleteButtons.forEach(delBtn => {
      // $('.deleteButton').click(() => {
        //   const itemName = $(this).closest('.wrapper-delete').closest('.my-item').attr('id');
        // })
      delBtn.addEventListener('click', (e) => {
        const itemName = e.target.closest('.my-item')
        const element = this.itemData[itemName];
          
        this.$cartList.removeChild(itemName);
        
        let data = JSON.parse(window.localStorage.getItem('dataEgg'));
        window.localStorage.removeItem('dataEgg');

        const index = data.indexOf(element);
        data.splice(index, 1);
        window.localStorage.setItem('dataEgg', JSON.stringify(data));

        this.itemData.splice(index, 1);
        this.updateAmount();
        this.updateTotalPrice();
      })
    })
  }

  insertItem() {
    if(this.items.length === 0) {
      this.showEmpty();
      return;
    }

    for(let item of this.items) {
      this.$cartList.insertAdjacentHTML('beforeend', item);
    }

    this.updateAmount();
    this.updateTotalPrice();
  }

  updateAmount() {
    const $cartLength = document.querySelector('#cart-list-length');
    $cartLength.textContent = ''
    $cartLength.textContent = this.itemData.length;
    // $cartLength.textContent.replace($cartLength.value, this.items.length);
  }

  showEmpty() {
    this.$cartList.innerHTML = '';
    let message = `
      <li id="is-empty" class="list-group-item text-center lh-sm">
          <h6 class="my-0">Seu carrinho está vazio</h6>
      </li>
    `
    this.$cartList.insertAdjacentHTML('beforeend', message);
  }

  updateTotalPrice() {
    const priceList = new Array();

    const $total = document.querySelector('#total-price')
    $total.innerHTML = ''

    for(let item of this.itemData) {
      priceList.push(item.price);
    }

    const value = priceList.reduce((acc, item) => acc + item, 0);
    const result = Number(value).toFixed(2);
    const totalPrice = `R$${result}`
    $total.insertAdjacentHTML('beforeend', totalPrice)
  }
}

const cart = new Cart();