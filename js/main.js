let apiUrl = 'https://api.punkapi.com/v2/beers/';
const div = document.getElementById('1');
let beerCount1;
let arrayBeerInOrder = [];
let testAr = [];

function getData () {
  fetch (`${apiUrl}`)
    .then(res => res.json())
    .then(data => getBeer(data));
}
let ig = 0;
function getBeer (data) {
  sessionStorage.beer = JSON.stringify(data);
    for (let i=0; i < data.length; i ++) {
      ig = i;
      let drawBeer = `<div class="col-12 col-sm-4 col-md-4">
        <div class="card-beer">
            <div class="product-img">
              <img src="${data[i].image_url}"/>
            </div>
            <div class="product-content">
              <p class="product-title font-weight-bold">${data[i].name}</p>
              <p>${data[i].tagline}</p>
              <p> <button id="plus" class="btn btn-light">+</button> <button id="minus" class="btn btn-light">-</button></p>
              <p>Count - <span id="count" data-count="${ig}">1</span></p>
              <button data-id="${data[i].id}" href="#" class="btn btn-light" data-toggle="modal" data-target="#exampleModal">Buy</button>
            </div>
            <div class="desc">
              <span>${data[i].description}</span>
            </div>
        </div>`;
      div.insertAdjacentHTML('beforeend', drawBeer);
      }
}

window.onclick = (event) => {
  let beerLocal = JSON.parse( sessionStorage.beer );
  let card = event.target.closest('.col-12');
  let plus = event.target.closest('#plus');
  let minus = event.target.closest('#minus');
  
  if(card) {
    let productId = event.target.getAttribute('data-id');
    for(let i = 0; i < beerLocal.length; i++) {
      if(productId == beerLocal[i].id){
        textOrder();
        beerOrder(beerLocal[i], card); 
      }
    }
  }
  if(plus) sumCount(card, a = 1);
  if(minus) sumCount(card, a = -1);

  
  
}

function sumCount (card, a) {
  let countBeer = parseFloat(card.querySelector('#count').innerHTML);
  if(countBeer > 0) {
      countBeer+=a;
      let countSpan = card.querySelector('#count');
      countSpan.innerHTML = countBeer;
      //beerCount1 = countBeer;
  }
  if(countBeer <= 0) {
    countBeer++;
    let countSpan = card.querySelector('#count');
    countSpan.innerHTML = countBeer;
  }
}

function textOrder () {
  let textOrder = document.getElementById('textOrder');
  if (textOrder.innerHTML === 'Your Shopping Cart is empty') {
    textOrder.innerHTML = '';
  }
}

function beerOrder (beerInOrder, card) {
  let divOrder;
  let textOrder = document.getElementById('textOrder').innerHTML = '';
  if (arrayBeerInOrder.indexOf(beerInOrder.id) === -1) {
    divOrder = document.querySelector('.order');
    let beer = `
        <div id="beer-order" data-id="${beerInOrder.id}">
          <div class="col-6 col-sm-12 col-md-6 otsp">
            <img src="${beerInOrder.image_url}" class="order-img"/>
          </div>
          <div class="col-6 col-sm-12 col-md-6 otsp" data-id="${beerInOrder.id}">
            <p>Name - ${beerInOrder.name}</p>
            <p>Id - ${beerInOrder.id}</p> 
            <p>Tag Line - ${beerInOrder.tagline}</p>
            <p>Volume - ${beerInOrder.boil_volume.value}</p>
            <p>Count - <span id="count" data-count="${ig}">${card.querySelector('#count').innerHTML}</span></p>
            <button class="delete-order btn btn-light" data-id="${beerInOrder.id}">Delete order</button> 
          </div>
        </div>
        `;
    divOrder.insertAdjacentHTML('beforeend', beer);
    arrayBeerInOrder.unshift(beerInOrder.id);

  } else {
      a = document.querySelector('[data-id="' + beerInOrder.id + '"]');
      console.log(a);
      a.remove();
      let divOrder = document.querySelector('.order');
      let beer = `
        <div id="beer-order" data-id="${beerInOrder.id}" class='re'>
          <div class="col-6 col-sm-12 col-md-6 otsp">
            <img src="${beerInOrder.image_url}" class="order-img"/>
          </div>
          <div class="col-6 col-sm-12 col-md-6 otsp" data-id="${beerInOrder.id}">
            <p>Name - ${beerInOrder.name}</p>
            <p>Id - ${beerInOrder.id}</p> 
            <p>Tag Line - ${beerInOrder.tagline}</p>
            <p>Volume - ${beerInOrder.boil_volume.value}</p>
            <p>Count - ${card.querySelector('#count').innerHTML}</p>
            <button class="delete-order btn btn-light" data-id="${beerInOrder.id}">Delete order</button>
          </div>
        </div>`;
      divOrder.insertAdjacentHTML('beforeend', beer);
    }
    let deleteOrder = document.querySelector('.delete-order[data-id="' + beerInOrder.id + '"]');
    //console.log(deleteOrder);
    deleteOrder.onclick = () => {
      //console.log(deleteOrder.closest('#beer-order'));
      deleteOrder.closest('#beer-order').remove();
      if (!divOrder.querySelector('#beer-order')) {
        document.getElementById('textOrder').innerHTML = 'Your Shopping Cart is empty';
      }
    }
    
}
  
getData();
  


