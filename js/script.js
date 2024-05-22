/*  --------------------------------------------------------------------------------------------------------------------
 * Função para adicionar evento de toque em elementos da página.
 * Se o tempo entre dois toques for menor que 300ms, copia o atributo "alt" do elemento para a área de transferência.
 * --------------------------------------------------------------------------------------------------------------------- */

let lastTapTime = 0;

document.addEventListener('touchstart', event => {
  // Obtém o tempo atual
  const currentTime = Date.now();
  // Verifica se o tempo desde o último toque é menor que 300ms
  if (currentTime - lastTapTime < 300) {
    // Obtém o elemento tocado
    const touchedElement = event.target;
    // Chama a função para copiar o texto alternativo para a área de transferência
    copyAltToClipboard(touchedElement);
  }
  // Atualiza o tempo do último toque
  lastTapTime = currentTime;
});

/*  --------------------------------------------------------------------------------------------------------------------
 * Função para copiar o atributo "alt" de um elemento para a área de transferência.
 * @param {HTMLElement} element O elemento do qual o atributo "alt" será copiado.
 * --------------------------------------------------------------------------------------------------------------------- */

const copyAltToClipboard = async element => {
  // Verifica se o elemento possui a classe 'code'
  if (element.classList.contains('code')) {
    // Obtém o texto alternativo do elemento
    const altText = element.getAttribute('alt');
    // Verifica se o texto alternativo existe e se o navegador suporta a área de transferência
    if (altText && navigator.clipboard) {
      try {
        // Copia o texto alternativo para a área de transferência
        await navigator.clipboard.writeText(altText);
        // Exibe um modal de confirmação de cópia
        $('#copyModal').modal('show');
        // Esconde o modal após 2 segundos
        setTimeout(() => $('#copyModal').modal('hide'), 2000);
      } catch (err) {
        console.error('Algo deu errado! Código de erro:', err);
      }
    }
  }
};

/*  --------------------------------------------------------------------------------------------------------------------
 * Função assíncrona auto-invocada para carregar imagens e inicializar o swiper.
 * --------------------------------------------------------------------------------------------------------------------- */

(async () => {
  try {
    // Faz uma requisição assíncrona para obter os dados das imagens de um arquivo JSON
    const { images } = await (await fetch('json/swipe.json')).json();
    // Insere as imagens no swiper
    document.querySelector('.swiper-wrapper').innerHTML = images.map(({ src, alt, title }) =>
      `<div class="swiper-slide"><img src="${src}" alt="${alt}" title="${title}" class="code" /></div>`
    ).join('');
    
    // Inicializa o swiper com as configurações desejadas
    new Swiper('.cardSwiper', {
      effect: 'cards',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
    });
  } catch (error) {
    console.error('Erro ao buscar JSON:', error);
  }
})();
