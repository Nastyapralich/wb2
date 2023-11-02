//избранное
const likeC = document.querySelector('.like-list');

function showLikesFromLocalStorage() { 

likeC.innerHTML = '';
const likes = localStorage.getItem('likes');
if(likes){
    const likeItems = JSON.parse(likes);
    
//     if(likeItems.length == 0){
//         likeC.innerHTML = `<p>Нет товар в Избранном</p>`;
//     }
// } else{
    likeItems.forEach(element => {
        const likeItem = document.createElement('div');
        likeItem.className = 'like-item';
        likeItem.id = element.id;
        const likeImg = document.createElement('img');
        likeImg.src = element.img;

        const likeTitle = document.createElement('span');
        likeTitle.className = 'like-title';
        likeTitle.innerHTML = `${element.title}`;
        likeItem.append(likeImg, likeTitle);
       
        likeC.append(likeItem);
       
    });
}
 }

 showLikesFromLocalStorage();
