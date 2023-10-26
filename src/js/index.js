import './slider.js';

// let url = 'https://65367a0fbb226bb85dd2306e.mockapi.io/:endpoint';

fetch('https://65367a0fbb226bb85dd2306e.mockapi.io/wildberries')
  .then(response => response.json())
  .then(data => data.forEach(element => createCard(element.img, element.price, element.dateOfDelivery, element.title)))
 

  function generateSalePercent (){ //скидка от 1 до 30%
  let randomNumber = Math.random();
  let result = Math.floor(randomNumber * (30 - 2 + 1)) + 2;
  return result;
  }

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
  const oldPrice = document.createElement('span');
  oldPrice.className = 'new-price';


  // price.innerHTML = `${priceProd} руб`;
  
  delivery.innerHTML = delDate;

  cardTextWrapLeft.append(price, delivery);


  let saleNumber = generateSalePercent()
  sale.innerHTML =  `${saleNumber}% `;
  price.innerHTML = `${Number(priceProd  - (priceProd * saleNumber / 100))} руб` ;
  oldPrice.innerHTML = priceProd;
  oldPrice.style.textDecoration = 'line-through';

  cardTextWrapRight.append(sale, oldPrice);

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
  addToCart(itemName.innerHTML, priceProd, img, delivery.innerHTML);
});



cardItem.append(cardImg,cardText,cardName, btn);

catalogWrap.append(cardItem);

see(cardImg);
  }
  

  let cards = JSON.parse(localStorage.getItem('cards')) || [];

  function addToCart(title, price, img, deliver) {
    const item = { title, price, img, deliver };
    cards.push(item);
  
    localStorage.setItem('cards', JSON.stringify(cards));
    // alert('Товар добавлен в корзину');
  }



  function see(img){ //при наведении на картинку, появляется кнопка посмотреть подробнее
const btn_details = document.createElement('button');
btn_details.className = 'none-btn';
btn_details.innerHTML = 'Подробнее';
img.append(btn_details);
img.addEventListener('mouseenter', () =>{
  btn_details.className = 'details'
})
img.addEventListener('mouseleave', () => {
  btn_details.className = 'none-btn';
})

seeCard(btn_details)
  }


function seeCard(button){
  // const newCard = document.createElement('div');
  // button.addEventListener('click', () => {
  //    newCard.className = 'card-details';
  // })

  button.addEventListener('click', () => {

    const newCard = document.createElement('div');
    newCard.className = 'card-details';
    newCard.style.width = '500px';
    newCard.style.height = '500px';
    newCard.style.background = 'white';
    newCard.style.position = 'absolute';
    newCard.style.top = '62%';
    newCard.style.left = '38%';
    // newCard.style.transform = 'translate(-50%, -50%)';
    newCard.style.zIndex = '9999';
    newCard.style.border = '2px solid black'


    const done = document.createElement('button');
    done.className = 'done';
    done.innerHTML = 'Закрыть';

  
    const img = button.parentElement.parentElement.querySelector('img');
    const price = button.parentElement.parentElement.querySelector('.price').innerHTML;
    const title = button.parentElement.parentElement.querySelector('.item-name').innerHTML;
    console.log(price, title);

    // Set the image, price, and product name in the new card
    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.style.width = '100px';
imgElement.style.height = '100px'
    const priceElement = document.createElement('span');
    priceElement.textContent = price;
    const titleElement = document.createElement('span');
    titleElement.textContent = title;

    newCard.appendChild(imgElement);
    newCard.appendChild(priceElement);
    newCard.appendChild(titleElement);


    // const par = button.parentElement.parentElement;
    // par.innerHTML
    // console.log(par);

    newCard.appendChild(done);

    document.body.appendChild(newCard);
    done.addEventListener('click', ()=>{
      document.body.removeChild(newCard)
    })
  });

}