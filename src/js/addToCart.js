import { cards } from './index.js';

export function addToCart(title, price, img, deliver) {
  const item = { title, price, img, deliver };
  cards.push(item);

  localStorage.setItem('cards', JSON.stringify(cards));
  // alert('Товар добавлен в корзину');
}
