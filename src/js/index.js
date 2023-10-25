import './slider.js';

// let url = 'https://65367a0fbb226bb85dd2306e.mockapi.io/:endpoint';

fetch('https://65367a0fbb226bb85dd2306e.mockapi.io/wildberries')
  .then(response => response.json())
  .then(data => data.forEach(element => createCard(element.img, element.price, element.dateOfDelivery, element.title)))
 


  function createCard(imgSrc, priceProd, delDate, nameProd){
 
  const catalogWrap = document.getElementsByClassName('catalog-wrapper')[0];
  const cardItem = document.createElement('div');
  cardItem.className = 'card-item';
  const cardImg = document.createElement('div');
  cardImg.className = 'card-img';
  const img = document.createElement('img');
  
  img.src = imgSrc;

  cardImg.append(img);


  const cardText = document.createElement('div');
  cardText.className = 'card-text';
  const cardTextWrapLeft = document.createElement('div');
  cardTextWrapLeft.className = 'card-text-wrap left';
  const price = document.createElement('span');
  price.className = 'price';
  const delivery = document.createElement('span');
  delivery.className = 'deliveryDate';

  const cardTextWrapRight = document.createElement('div');
  cardTextWrapRight.className = 'card-text-wrap right';
  const sale = document.createElement('span');
  sale.className = 'sale';
  const newPrice = document.createElement('span');
  newPrice.className = 'new-price';


  price.innerHTML = `${priceProd} руб`;
  delivery.innerHTML = delDate;

  cardTextWrapLeft.append(price, delivery);

  sale.innerHTML = `-14%`;
  newPrice.innerHTML = Number(priceProd * 14 / 100);

  cardTextWrapRight.append(sale, newPrice);

  cardText.append(cardTextWrapLeft, cardTextWrapRight);

const cardName = document.createElement('div');
cardName.className = 'card-name';
const itemName = document.createElement('span');
itemName.className = 'item-name';

itemName.innerHTML = nameProd;

cardName.append(itemName);

const btn = document.createElement('button');
btn.classList = 'buy';
btn.innerHTML = 'В корзину';

btn.addEventListener('click', () => {
  addToCart(itemName.innerHTML, priceProd);
});

cardItem.append(cardImg,cardText,cardName, btn);

catalogWrap.append(cardItem);
  }



  let cards = JSON.parse(localStorage.getItem('cards')) || [];

  function addToCart(title, price) {
    const item = { title, price };
    cards.push(item);
  
    localStorage.setItem('cards', JSON.stringify(cards));
    // alert('Товар добавлен в корзину');
  }


  