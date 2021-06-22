window.onload = () => {
  const socket = io();
  let user = document.querySelector('#username').innerHTML;
  let userPath = document.querySelector('#username').href;
  let userAvatar = document.querySelector('#avartar').src;
  let onlineList = document.querySelector('#online-list');
  socket.on('connect', function(){  
    socket.emit('user_connect', user, userPath, userAvatar);
    socket.on('userOnline', (users) => {
      onlineList.innerHTML = '';
      for (let i = 0;i < users.length;i++){
        onlineList.innerHTML += `
          <li class="comment d-flex align-items-center">
            <div class="vcard bio">
              <img src="${users[i].avartar}" alt="Image placeholder" class="img-fluid rounded-circle" style="border-radius: 0;width: 3rem;height: 3rem">
            </div>
            <a class="comment-body" href="${users[i].path}">
              ${users[i].name}
            </a>
          </li>
        `;
      } 
    })
  });
  let logOutButton = document.querySelector('#logout');
  logOutButton.onclick = (e) => {
    socket.emit('user_logout', userPath);
  }
}