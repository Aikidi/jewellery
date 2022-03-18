'use strict';

/**
 * @requires ../../node_modules/swiper/swiper-bundle.min.js
 */

const pageBody = document.querySelector('body');
const accordionItems = document.querySelectorAll('.accordion__item');
const accordionItemsTitles = document.querySelectorAll('.accordion__item-title');

const siteNavToggle = document.querySelector('.site-nav__toggle');
const siteNav = document.querySelector('.site-nav');
siteNav.classList.add('site-nav--closed');

const openMenu = () => {
  siteNav.classList.remove('site-nav--closed');
  siteNav.classList.add('site-nav--opened');
  pageBody.classList.add('block');
};

const closeMenu = () => {
  siteNav.classList.add('site-nav--closed');
  siteNav.classList.remove('site-nav--opened');
  pageBody.classList.remove('block');
};

siteNavToggle.addEventListener('click', function () {
  if (siteNav.classList.contains('site-nav--closed')) {
    openMenu();
  } else {
    closeMenu();
  }
});

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const saveLocalStorage = (dataName, dataContent) => {
  localStorage.setItem(dataName, dataContent);
};

const closeAllItems = () => {
  accordionItems.forEach((item) => {
    item.classList.add('accordion__item--closed');
  });
};

const accordionItemClick = (accordionItemindex) => {
  accordionItems[accordionItemindex].classList.toggle('accordion__item--closed');
};

accordionItemsTitles.forEach((itemTitle, index) => {
  itemTitle.addEventListener('click', () => {
    accordionItemClick(index);
  });
});

closeAllItems();

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closePopup();
  }
};

const openPopup = () => {
  popup.classList.add('popup--open');
  pageBody.classList.add('block');
  document.addEventListener('keydown', onPopupEscKeydown);
  const emailField = popup.querySelector('input[name="email"]');
  emailField.focus();
};

popupCloseButton.addEventListener('blur', ()=> {
  const emailField = popup.querySelector('input[name="email"]');
  emailField.focus();
});

const closePopup = () => {
  if (popup.classList.contains('popup--open')) {
    popup.classList.remove('popup--open');
    pageBody.classList.remove('block');
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const login = document.querySelector('.user-nav__item--login .user-nav__link');

login.addEventListener('click', (evt)=> {
  evt.preventDefault();
  evt.stopPropagation();
  openPopup();
});

popupCloseButton.addEventListener('click', ()=> {
  closePopup();
});

pageBody.addEventListener('click', (evt)=> {
  if (evt.target !== popup && !popup.contains(evt.target)) {
    closePopup();
  }
});

const allInputFields = document.querySelectorAll('input[name="email"]');

allInputFields.forEach((inputfield) => {
  inputfield.addEventListener('keyup', (evt) => {
    saveLocalStorage(evt.target.name, evt.target.value);
  });
});

const focusableElements = 'button, input, textarea, [tabindex]:not([tabindex="-1"])';
const focusableContent = popup.querySelectorAll(focusableElements);

document.addEventListener('keydown', (evt) => {
  if ((evt.key === 'Tab' || evt.code === '9') && (popup.classList.contains('popup--open'))) {
    const TabIndexArray = Array.from({length: focusableContent.length}, (v, k) => k);
    const curTabIndex = Array.prototype.indexOf.call(focusableContent, document.activeElement);
    const nextTabIndex = curTabIndex < 0 ? 0 : TabIndexArray.splice(evt.shiftKey ? -1 : 1).concat(TabIndexArray)[curTabIndex];
    focusableContent[nextTabIndex].focus();
    evt.preventDefault();
    evt.stopPropagation();
  }
});

if (document.querySelector('.swiper--main')) {
  const swiperMain = new window.Swiper('.swiper--main', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    slidesPerView: 2,
    slidesPerGroup: 2,
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      clickable: true,
      renderCustom(swiper, index, total) {
        return (window.matchMedia('(min-width: 0px) and (max-width: 767px)').matches) ?
          '<span class="swiper-pagination-current"> ' + index + ' </span>' + ' of ' + '<span class="swiper-pagination-total"> ' + total + ' </span>'
          :
          Array(total).fill(0).reduce((txt, i, k) => {
            return txt + '<span class="swiper-pagination-bullet ' + ((k + 1) !== index ? '' : 'swiper-pagination-bullet-active') + '">' + (k + 1) + '</span>';
          }, '');
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    on: {
      init() {
        localStorage.setItem('ScreenTypeIsMobile', Number(window.matchMedia('(min-width: 0px) and (max-width: 768px)').matches).toString());
      },
      beforeResize() {
        if (Number(localStorage.getItem('ScreenTypeIsMobile')) !== Number(window.matchMedia('(min-width: 0px) and (max-width: 767px)').matches)) {
          localStorage.setItem('ScreenTypeIsMobile', Number(window.matchMedia('(min-width: 0px) and (max-width: 768px)').matches).toString());
          this.pagination.update();
          this.pagination.render();
        }
      },
    },

    breakpoints: {
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
  });

  swiperMain.init();
}

if (document.querySelector('.swiper--grid')) {
  const filter = document.querySelector('.filter');
  const filterToogle = document.querySelector('.filter__toogle');

  filterToogle.addEventListener('click', () => {
    filter.classList.toggle('filter--closed');
    filterToogle.classList.toggle('filter__toogle--opened');
  });

  const swiperGrid = new window.Swiper('.swiper--grid', {
    spaceBetween: 30,
    slidesPerGroup: 2,
    slidesPerView: 2,
    grid: {
      rows: 6,
      fill: 'row',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet(index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      768: {
        spaceBetween: 30,
        slidesPerGroup: 3,
        slidesPerView: 3,
        grid: {
          rows: 4,
          fill: 'row',
        },
      },
    },
  });

  swiperGrid.init();
}
