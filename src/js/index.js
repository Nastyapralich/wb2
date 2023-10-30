import './slider.js';

//получаю объект с сервера

fetch("https://65367a0fbb226bb85dd2306e.mockapi.io/wildberries")
.then((response) => {return response.json()})
.then((data) => {console.log(data);
data.forEach(element => {
    createCard(element.img, element.price, element.title, element.dateOfDelivery, element.description)
});})


//функция создания элементов 

function createCard(imgSrc, priceProd, nameProd, delDate, description){

  const cardItem = document.createElement('div'); //сама карточка
  cardItem.className = 'card-item';

  const cardImg = document.createElement('div'); //картинка
  cardImg.className = 'card-img';
  const img = document.createElement('img');

  const cardText = document.createElement('div'); //текст под картинкой
  cardText.className = 'card-text';

  const cardTextWrapLeft = document.createElement('div');
  cardTextWrapLeft.className = 'card-text-wrap left'; //левая часть текста
  const itemName = document.createElement('span');
  itemName.className = 'item-name'
const descr = document.createElement('p');
descr.className = 'description'

  const price = document.createElement('span');
  price.className = 'price';
  const delivery = document.createElement('span');
  delivery.className = 'deliveryDate';

  const cardTextWrapRight = document.createElement('div'); // правая часть текста
  cardTextWrapRight.className = 'card-text-wrap right';
  const sale = document.createElement('span');
  sale.className = 'sale';
  const oldPrice = document.createElement('span');
  oldPrice.className = 'new-price';

  const btn = document.createElement('button'); // кнопка в корзину
  btn.classList = 'buy';
  btn.innerHTML = 'В корзину'


 img.src = imgSrc;
 delivery.innerHTML = delDate;
 let saleNumber = 1; //скидка и новая цена
sale.innerHTML = `${saleNumber}% `;
price.innerHTML = `${Number(priceProd - (priceProd * saleNumber / 100))} руб`;
oldPrice.innerHTML = priceProd;
oldPrice.style.textDecoration = 'line-through';
itemName.innerHTML = nameProd;
descr.innerHTML = description

  cardImg.appendChild(img);
  cardTextWrapLeft.append(price,delivery, itemName, descr);
  cardTextWrapRight.append(sale, oldPrice);
  cardText.append(cardTextWrapLeft, cardTextWrapRight);
  cardItem.append(cardImg,cardText,  btn);

  const wrap = document.querySelector('.catalog-wrapper');
  wrap.append(cardItem)
  btn.addEventListener('click', function() {
    setLS(nameProd, description, priceProd, imgSrc);
    showCartFromLocalStorage();
    showCartFromLocalStorage_NEW()
  });

  seeMore(cardImg)
}


//запись в локал сторэдж

function setLS (title, descr,price, img){

const card = {
    'title': title ,
    'description':descr,
    'price': price,
    'img': img
  };

let cards = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
cards.push(card);
  
localStorage.setItem('cards', JSON.stringify(cards));
}

//создание кнопки посмотреть подробнее при наведении на картинку

function seeMore(img){
   
    const btn_details = document.createElement('button');
    btn_details.className = 'none-btn';
    btn_details.innerHTML = 'Подробнее';
    img.append(btn_details);
     img.addEventListener('mouseenter', () => {
        btn_details.className = 'details';
    });
     img.addEventListener('mouseleave', () => {
        btn_details.className = 'none-btn';
    });

    seeCard(btn_details)
      
}

//создание окна с карточкой товара

function seeCard(button){ 
    button.addEventListener('click', () => {
  
      const newCard = document.createElement('div');
      newCard.className = 'card-details';
      const btn_done = document.createElement('button');
      btn_done.className = 'done';
  
      const img = button.parentElement.parentElement.querySelector('img');
      const price = button.parentElement.parentElement.querySelector('.price').innerHTML;
      const title = button.parentElement.parentElement.querySelector('.item-name').innerHTML;
      console.log(price, title);
  
      const imgElement = document.createElement('div');
      imgElement.className = 'imgElement'
      const imgElementContent = document.createElement('img');
      imgElementContent.src = img.src;
      imgElement.append(imgElementContent)
  
  
      const textContainer = document.createElement('div');
      textContainer.className = 'textContainer'
      const priceElement = document.createElement('span');
      priceElement.innerHTML = `Цена ${price}`;
      const titleElement = document.createElement('span');
      titleElement.innerHTML = `Название ${title}`;
  
      textContainer.append(priceElement, titleElement)
  
      newCard.appendChild(imgElement);
      newCard.appendChild(textContainer);
      newCard.appendChild(btn_done);
  
      document.body.appendChild(newCard);
  
      btn_done.addEventListener('click', ()=>{
        document.body.removeChild(newCard)
      })
    });
  }

//посмотреть корзину
  function showCartFromLocalStorage() {
const cartC = document.createElement("div");
cartC.className = "cart-container";
const cards = localStorage.getItem('cards');
      if (cards) {
const cartItems = JSON.parse(cards);
cartItems.forEach(cardItem => {
const cartItem = document.createElement("div");
cartItem.className = "cart-item";
const titleItem = document.createElement("span");
titleItem.className = "cart-item_title";
const deleteItem = document.createElement('span');
deleteItem.className = 'delete-item'
const priceItem = document.createElement("span");
priceItem.className = "cart-item_price";
const itemImg = document.createElement('img');
itemImg.className = 'item-img';
titleItem.innerHTML = `Товар ${cardItem.title}`;
priceItem.innerHTML = `Цена: ${cardItem.price}`;
itemImg.src = cardItem.img;
cartC.append(cartItem);
cartItem.append(itemImg, priceItem, titleItem, deleteItem);
const wrap = document.getElementsByClassName("catalog-wrapper")[0];
wrap.append(cartC);
  removefromLS (deleteItem, cartItem)
 }
 )}

//  const allSum = 0;
//  allSum.innerHTML = ` Общая сумма: ${getSum()}`;
const button = document.createElement("button");
button.innerHTML = "Закрыть корзину";
cartC.append(button);
button.addEventListener("click",  () => {
   button.parentElement.remove(cartC)
    console.log(button.parentElement);
  })
   
   }  
    
  function removefromLS (deleteItem, cartItem){
    deleteItem.addEventListener('click', function (){
      deleteItem.parentElement.remove(cartItem)
        console.log(deleteItem.parentElement.firstChild.src);
        let cards = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
        cards.forEach((card, index) => {
          if(deleteItem.parentElement.firstChild.src == card.img){
            cards.splice(index, index + 1);
            localStorage.setItem("cards", JSON.stringify(cards));
          }
        })
        localStorage.setItem("cards", JSON.stringify(cards));
        // showCartFromLocalStorage();
    });
  }


  //посмотреть корзину при нажатии на корзину в хэдэре

  const cartlogo = document.querySelector('.fa-cart-shopping');
  cartlogo.addEventListener('click', showCartFromLocalStorage)


//поиск по названию и описанию
const input = document.querySelector('input');
input.addEventListener('input', search);

function search() {
  const searchTerm = input.value.toLowerCase();
  const cards = document.querySelectorAll('.card-item');

  cards.forEach(card => {
      const title = card.querySelector('.item-name').textContent.toLowerCase();
      const description = card.querySelector('.description').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}


//общая сумма
function getSum(){
  let cards = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
  let sum = 0;
  cards.forEach((card) => {
    sum += Number(card.price);
    return sum;
  })
}