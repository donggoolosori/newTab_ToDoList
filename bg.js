const body = document.querySelector("body");

const IMG_NUM = 4;

function paintImage(imgNum) {
  const image = new Image();
  image.src = `./image/${imgNum}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}
function init() {
  const randomNum = Math.ceil(Math.random() * IMG_NUM);
  paintImage(randomNum);
}

init();
