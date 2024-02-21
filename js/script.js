let lastTapTime = 0;

document.addEventListener('touchstart', event => {
  const currentTime = Date.now();
  if (currentTime - lastTapTime < 300) {
    const touchedElement = event.target;
    copyAltToClipboard(touchedElement);
  }
  lastTapTime = currentTime;
});

const copyAltToClipboard = async element => {
  if (element.classList.contains('code')) {
    const altText = element.getAttribute('alt');
    if (altText && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(altText);
        $('#copyModal').modal('show');
        setTimeout(() => $('#copyModal').modal('hide'), 2000);
      } catch (err) {
        console.error('Something went wrong! Error code: ', err);
      }
    }
  }
};

(async () => {
  try {
    const { images } = await (await fetch('json/swipe.json')).json();
    document.querySelector('.swiper-wrapper').innerHTML = images.map(({ src, alt }) =>
      `<div class="swiper-slide"><img src="${src}" alt="${alt}" class="code" /></div>`
    ).join('');

    new Swiper('.cardSwiper', {
      effect: 'cards',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
    });
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
})();