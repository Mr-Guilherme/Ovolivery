//CEP - Validação de Rua, Bairro, Cidade e Estado (através da API ViaCep)
const apresentaDados = (resultado) => {
    for (let campo in resultado) {
        if (document.querySelector("#" + campo)) {
            console.log(campo);
            document.querySelector("#" + campo).value = resultado[campo]
        }
    }
}

function consultaCEP() {
    let cepDigitado = document.getElementById("txCep");

    if (cepDigitado.value == "") {
        cepDigitado.style.border = "1px solid red";
    } else {
        let cepProcurado = cepDigitado.value.replace("-", "");
        console.log(cepProcurado);

        fetch(`https://viacep.com.br/ws/${cepProcurado}/json/`)
            .then(response => {
                response.json()
                    .then(data => console.log(apresentaDados(data)));
            })
            .catch(x => console.log("CEP não encontrado!!"));
    }
}
//Validação de campos formulário
function enviardados() {

    if (document.form1.txNome.value == "" || document.form1.txNome.value.length < 3) {
        alert("Preencha campo Nome corretamente!");
        //propriedade focus setar para o input nome caso não seja preeenchido
        document.form1.txNome.focus();
        //O Return false evita laço de repetição e perda da prorpiedade focus
        return false;
    }

    if (document.form1.txTelefone.value == "" || document.form1.txTelefone.value.length < 10) {
        alert("Preencha campo Telefone corretamente!");
        document.form1.txTelefone.focus();
        return false;
    }
    if (document.form1.txEmail.value == "" || document.form1.txEmail.value.length < 3) {
        alert("Preencha campo E-mail corretamente!");
        document.form1.txEmail.focus();
        return false;
    }
    if (document.form1.txCep.value == "" || document.form1.txCep.value.length < 7) {
        alert("Preencha o  campo CEP corretamente!");
        document.form1.txCep.focus();
        return false;
    }
    if (document.form1.logradouro.value == "" || document.form1.logradouro.value.length < 5) {
        alert("Preencha o campo Endereço corretamente!");
        document.form1.logradouro.focus();
        return false;
    }
    if (document.form1.txNumero.value == "" || document.form1.txNumero.value.length < 2) {
        alert("Preencha o campo Número corretamente!");
        document.form1.txNumero.focus();
    }
    if (document.form1.uf.value == "" || document.form1.uf.value.length < 2) {
        alert("Preencha o campo Estado corretamente!");
        document.form1.uf.focus();
        return false;
    }
    if (document.form1.localidade.value == "" || document.form1.localidade.value.length < 3) {
        alert("Preencha o campo Cidade corretamente!");
        document.form1.localidade.focus();
        return false;
    }

    alert("Cadastro realizado com sucesso!");
    }

