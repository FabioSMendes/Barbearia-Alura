// Validação de CEP
const cep = document.querySelector('#cep');
const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const message = document.querySelector('#message');
const myForm = document.querySelector('#myForm')
const nomesobrenome = document.querySelector('#nomesobrenome')
const email = document.querySelector('#email')
const senha = document.querySelector('#senha')
const telefone = document.querySelector('#telefone')
const cpf = document.querySelector('#cpf')

cep.addEventListener('focusout', async () => {
    try {
    const onlyNumbers = /^[0-9]+$/;
    const cepValid = /^[0-9]{8}$/;

    if(!onlyNumbers.test(cep.value)  ||  !cepValid.test(cep.value)) {
        throw { cep_error: 'Cep invalido' };
    }

    const response = await fetch (`https://viacep.com.br/ws/${cep.value}/json/`);

    if(!response.ok) {
        throw await response.json();
    }

    const responseCep = await response.json();

    logradouro.value = responseCep.logradouro;
    bairro.value = responseCep.bairro;
    cidade.value = responseCep.localidade;
    estado.value = responseCep.uf;

    } catch (error) {
        if (error?.cep_error){
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = "";
            }, 5000);
        }
        console.log(error)
    }

})

//validação de dados

myForm.addEventListener('focusout', (event) => {
    event.preventDefault();

    //verifica se o nome está fazio
    if (nomesobrenome.value === '') {
    alert("por favor, preencha seu nome");
    return;
}

    // verifica se o nome está fazio e se é válido
    if (email.value === '' || !isEmailValid(email.value)) {
    alert("por favor, preencha seu email");
    return;
    }

    if (!validatePassword(senha.value, 8)) {
        alert ('A senha precisa ter entre 6 e 8 dígitos.');
        return;
    }

});

    // Função que valida e-mail
function isEmailValid(email) {
    //cria uma regex para validar email
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );

    if(emailRegex.test(email)) {
        return true;
    }

    return false;
}

function validatePassword(senha, minDigits) {
    if(senha.lenghth>= minDigits) {
        //senha válida
        return true;
    }

    return false;
}

