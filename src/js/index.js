import './slider.js';

// let url = 'https://65367a0fbb226bb85dd2306e.mockapi.io/:endpoint';

fetch('https://65367a0fbb226bb85dd2306e.mockapi.io/wildberries')
  .then(response => response.json())
  .then(data => data.forEach(element => createCard(element.img)))
 


  function createCard(imgSrc){
 
  const catalogWrap = document.getElementsByClassName('catalog-wrapper')[0];
  const cardItem = document.createElement('div');
  cardItem.className = 'card-item';
  const cardImg = document.createElement('div');
  cardImg.className = 'card-img';
  const img = document.createElement('img');
  
  img.src = imgSrc;

cardImg.append(img);
cardItem.append(cardImg);
catalogWrap.append(cardItem)

  }

  console.log(1);