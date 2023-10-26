import { seeCard } from './index.js';

export function see(img) { // кнопка подробнее при наведении на картинку товара
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

  seeCard(btn_details);
}
