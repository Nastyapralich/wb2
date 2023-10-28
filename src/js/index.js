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
  cardTextWrapLeft.append(price,delivery, itemName, description);
  cardTextWrapRight.append(sale, oldPrice);
  cardText.append(cardTextWrapLeft, cardTextWrapRight);
  cardItem.append(cardImg,cardText,  btn);

  const wrap = document.querySelector('.catalog-wrapper');
  wrap.append(cardItem)
  btn.addEventListener('click', function() {
    setLS(nameProd, description, priceProd, imgSrc);
    showCartFromLocalStorage();
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


  function showCartFromLocalStorage() {
const cards = localStorage.getItem('cards');
const cartC = document.createElement("div");
cartC.className = "cart-container";
const button = document.createElement("button");
button.innerHTML = "Закрыть корзину";
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
cartItem.append(itemImg, priceItem, titleItem, deleteItem);



// const Sum1 = document.createElement('span');
// Sum1.className = 'sum';
// Sum1.innerHTML = '';


cartC.append(cartItem, button);
const wrap = document.getElementsByClassName("catalog-wrapper")[0];
wrap.appendChild(cartC);
deleteIt(deleteItem, cardItem);
button.addEventListener("click", function () {
    cartC.remove();
    console.log("Корзина закрыта");
  });  
      });


    }
  }

function deleteIt(button, cardItem){
button.addEventListener('click', () =>{
button.parentElement.remove(cardItem);
let price = button.parentElement.price;
console.log(price);
let cards = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];

}
)
}


// krestik.addEventListener('click', () => {
//   krestik.parentElement.remove(list_item);
//   let id = krestik.parentElement.id;
//   console.log(id);
//   let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
//   console.log(todos);
//   todos.forEach((task, index) => {

//     if (id == task.id) {
//       todos.splice(index, index + 1);
//       localStorage.setItem("todos", JSON.stringify(todos));
//       list_item.classList.toggle("checked");
//       updateAllCount();
//       updateCompletedCount();
//     }