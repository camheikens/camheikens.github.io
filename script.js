const leftImages = [
  "star.JPG", "Tumb.JPG", "Pigeon.JPG", "earrings.jpeg", "coconut.jpeg", "White temple.jpeg"
];

const rightImages = [
  "Jewellererery.JPG", "IMG_4123.JPG", "fern.JPG", "chiller.JPG", "CameraThumb.JPG"
];

function setupCarousel(containerId, imageList, interval = 4000) {
  const container = document.getElementById(containerId);
  if (!container) return; // exit quietly if this page doesn't have this element

  let current = 0;
  imageList.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    if (i === 0) img.classList.add('active');
    container.appendChild(img);
  });

  const imgs = container.querySelectorAll('img');
  setInterval(() => {
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
  }, interval);
}

setupCarousel('leftImage', leftImages, 4000);
setupCarousel('rightImage', rightImages, 4500);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomizeTicker() {
  const wrapper = document.querySelector('.skills-ticker-wrapper');
  if (!wrapper) return; // exit quietly if this page doesn't have a ticker

  const firstList = wrapper.querySelector('.skills-ticker');
  const secondList = wrapper.querySelectorAll('.skills-ticker')[1];
  if (!firstList || !secondList) return;

  const items = Array.from(firstList.querySelectorAll('li'));
  const shuffled = shuffleArray(items.map(li => li.textContent));

  firstList.innerHTML = shuffled.map(text => `<li>${text}</li>`).join('');
  secondList.innerHTML = shuffled.map(text => `<li>${text}</li>`).join('');
}

randomizeTicker();

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) { // only attach if this page actually has the contact form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xaqrnrpz', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        status.textContent = "Thanks — your message has been sent!";
        status.style.display = 'block';
      } else {
        status.textContent = "Something went wrong. Please try again or email me directly.";
        status.style.display = 'block';
      }
    } catch (error) {
      status.textContent = "Something went wrong. Please try again or email me directly.";
      status.style.display = 'block';
    }
  });
}
function setupDvdBounce() {
  const el = document.getElementById('dvdBounce');
  const flash = document.getElementById('cornerFlash');
  if (!el) return;

  let x = 50;
  let y = 50;
  let dx = 2;
  let dy = 2;

  const colors = ['#ff0055', '#00e5ff', '#ffee00', '#66ff66', '#c400ff', '#ff8800'];
  let colorIndex = 0;

  function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    el.style.filter = `drop-shadow(0 0 8px ${colors[colorIndex]})`;
  }

  function triggerCornerFlash() {
    if (!flash) return;
    flash.classList.add('flash-active');
    setTimeout(() => {
      flash.classList.remove('flash-active');
    }, 2000); // how long the image stays visible before fading out
  }

  function animate() {
    const maxX = window.innerWidth - el.offsetWidth;
    const maxY = window.innerHeight - el.offsetHeight;

    x += dx;
    y += dy;

    let hitX = false;
    let hitY = false;

    if (x <= 0 || x >= maxX) {
      dx = -dx;
      changeColor();
      hitX = true;
    }
    if (y <= 0 || y >= maxY) {
      dy = -dy;
      changeColor();
      hitY = true;
    }

    // true corner hit = both axes bounced on the same frame
    if (hitX && hitY) {
      triggerCornerFlash();
    }

    el.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(animate);
  }

  animate();
}

setupDvdBounce();