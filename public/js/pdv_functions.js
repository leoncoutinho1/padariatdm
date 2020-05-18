let cart = [];
let input_qty = document.getElementById('pdv__list__form__qty');
let input_prod = document.getElementById('pdv__list__form__prod');
let dl_prods = document.getElementById("pdv__list__form__dl_prods");
let prodlist = document.getElementById("pdv__list__table__body");
let input_desconto = document.getElementById("pdv__list__sell__desconto");
let input_total = document.getElementById("pdv__list__sell__total");


input_desconto.value = 0.00;
input_total.vallue = 0.00;

async function findProducts(prod) {
  return await fetch(`http://localhost:3000/find/${prod}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch(err => console.log(err));
}

function autoComplete() {
  let timer;

  input_prod.addEventListener('keyup', () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      dl_prods.innerHTML = "";
      if (input_prod.value !== '') {
        findProducts(input_prod.value)
          .then((prods) => {
            prods.forEach(prod => {
              dl_prods.innerHTML += `<option value="${prod.description}" id="${prod.code}"></option>`;
            });
          })
          .catch(err => console.log(err));
      }
    }, 1200);
  });
}

function EnterTab(InputId, Evento) {
  if (Evento.keyCode === 13) {
    Evento.preventDefault();

    if (InputId == "pdv__list__form__qty") {
      input_prod.value = '';
      input_qty.value = '';
    }
    document.getElementById(InputId).focus();
  }
}

function atualizaRelogio() {
  var momentoAtual = new Date();

  var vhora = momentoAtual.getHours();
  var vminuto = momentoAtual.getMinutes();
  var vsegundo = momentoAtual.getSeconds();

  var vdia = momentoAtual.getDate();
  var vmes = momentoAtual.getMonth() + 1;
  var vano = momentoAtual.getFullYear();

  if (vdia < 10) { vdia = "0" + vdia; }
  if (vmes < 10) { vmes = "0" + vmes; }
  if (vhora < 10) { vhora = "0" + vhora; }
  if (vminuto < 10) { vminuto = "0" + vminuto; }
  if (vsegundo < 10) { vsegundo = "0" + vsegundo; }

  dataFormat = vdia + " / " + vmes + " / " + vano;
  horaFormat = vhora + " : " + vminuto + " : " + vsegundo;

  document.getElementById("pdv__data").innerHTML = dataFormat;
  document.getElementById("pdv__hora").innerHTML = horaFormat;

  setTimeout("atualizaRelogio()", 1000);
}

function aplicaDesconto() {
  input_desconto.addEventListener("focusout", () => {
    updateTotal();
  });
}

function updateTotal() {
  let valorInicial = 0;
  let total = cart.reduce((acc, current) => {
    return acc + current.total_value
  }, valorInicial);
  total = total - input_desconto.value;
  total = total.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  input_total.value = `R$ ${total}`;
  input_desconto.value = input_desconto.value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}

function updateCart(item) {
  let cartItemIndex = cart.findIndex(i => {
    return i.code === item.code
  });

  if (cartItemIndex >= 0) {
    cart[cartItemIndex].qty = parseFloat(cart[cartItemIndex].qty) + parseFloat(item.qty);
    cart[cartItemIndex].total_value = parseFloat(cart[cartItemIndex].total_value) + parseFloat(item.total_value);
  } else {
    cart.push(item);
  };

  updateListProd(cart);
}

function updateListProd(cart) {
  prodlist.innerHTML = '';
  cart.forEach((item) => {
    prodlist.innerHTML += `<tr id="${item.id}">
                            <td>${item.qty}</td>
                            <td>${item.description}</td>
                            <td>R$ ${item.unit_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            <td>R$ ${item.total_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          </tr>`;
    updateTotal();
  });
}

function addProd(Evento) {
  if (Evento.keyCode === 13) {
    Evento.preventDefault();
    if (input_qty.value !== '' && input_prod.value !== '') {
      findProducts(input_prod.value)
        .then((prod) => {
          let item = {
            id: cart.length + 1,
            qty: input_qty.value,
            code: prod[0].code,
            description: prod[0].description,
            unit_value: prod[0].price,
            total_value: prod[0].price * input_qty.value
          }
          updateCart(item);
          EnterTab('pdv__list__form__qty', Evento);
        })
        .catch(err => console.log(err));
    }
  }
}


window.onload = atualizaRelogio();
window.onload = autoComplete();
window.onload = aplicaDesconto();
