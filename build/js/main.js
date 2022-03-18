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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAcmVxdWlyZXMgLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zd2lwZXItYnVuZGxlLm1pbi5qc1xuICovXG5cbmNvbnN0IHBhZ2VCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuY29uc3QgYWNjb3JkaW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJyk7XG5jb25zdCBhY2NvcmRpb25JdGVtc1RpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25fX2l0ZW0tdGl0bGUnKTtcblxuY29uc3Qgc2l0ZU5hdlRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLW5hdl9fdG9nZ2xlJyk7XG5jb25zdCBzaXRlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtbmF2Jyk7XG5zaXRlTmF2LmNsYXNzTGlzdC5hZGQoJ3NpdGUtbmF2LS1jbG9zZWQnKTtcblxuY29uc3Qgb3Blbk1lbnUgPSAoKSA9PiB7XG4gIHNpdGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2l0ZS1uYXYtLWNsb3NlZCcpO1xuICBzaXRlTmF2LmNsYXNzTGlzdC5hZGQoJ3NpdGUtbmF2LS1vcGVuZWQnKTtcbiAgcGFnZUJvZHkuY2xhc3NMaXN0LmFkZCgnYmxvY2snKTtcbn07XG5cbmNvbnN0IGNsb3NlTWVudSA9ICgpID0+IHtcbiAgc2l0ZU5hdi5jbGFzc0xpc3QuYWRkKCdzaXRlLW5hdi0tY2xvc2VkJyk7XG4gIHNpdGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2l0ZS1uYXYtLW9wZW5lZCcpO1xuICBwYWdlQm9keS5jbGFzc0xpc3QucmVtb3ZlKCdibG9jaycpO1xufTtcblxuc2l0ZU5hdlRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHNpdGVOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaXRlLW5hdi0tY2xvc2VkJykpIHtcbiAgICBvcGVuTWVudSgpO1xuICB9IGVsc2Uge1xuICAgIGNsb3NlTWVudSgpO1xuICB9XG59KTtcblxuY29uc3QgaXNFc2NFdmVudCA9IChldnQpID0+IHtcbiAgcmV0dXJuIGV2dC5rZXkgPT09ICgnRXNjYXBlJyB8fCAnRXNjJyk7XG59O1xuXG5jb25zdCBzYXZlTG9jYWxTdG9yYWdlID0gKGRhdGFOYW1lLCBkYXRhQ29udGVudCkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShkYXRhTmFtZSwgZGF0YUNvbnRlbnQpO1xufTtcblxuY29uc3QgY2xvc2VBbGxJdGVtcyA9ICgpID0+IHtcbiAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWNjb3JkaW9uX19pdGVtLS1jbG9zZWQnKTtcbiAgfSk7XG59O1xuXG5jb25zdCBhY2NvcmRpb25JdGVtQ2xpY2sgPSAoYWNjb3JkaW9uSXRlbWluZGV4KSA9PiB7XG4gIGFjY29yZGlvbkl0ZW1zW2FjY29yZGlvbkl0ZW1pbmRleF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWNjb3JkaW9uX19pdGVtLS1jbG9zZWQnKTtcbn07XG5cbmFjY29yZGlvbkl0ZW1zVGl0bGVzLmZvckVhY2goKGl0ZW1UaXRsZSwgaW5kZXgpID0+IHtcbiAgaXRlbVRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGFjY29yZGlvbkl0ZW1DbGljayhpbmRleCk7XG4gIH0pO1xufSk7XG5cbmNsb3NlQWxsSXRlbXMoKTtcblxuY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcbmNvbnN0IHBvcHVwQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlLWJ1dHRvbicpO1xuXG5jb25zdCBvblBvcHVwRXNjS2V5ZG93biA9IChldnQpID0+IHtcbiAgaWYgKGlzRXNjRXZlbnQoZXZ0KSkge1xuICAgIGNsb3NlUG9wdXAoKTtcbiAgfVxufTtcblxuY29uc3Qgb3BlblBvcHVwID0gKCkgPT4ge1xuICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cC0tb3BlbicpO1xuICBwYWdlQm9keS5jbGFzc0xpc3QuYWRkKCdibG9jaycpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25Qb3B1cEVzY0tleWRvd24pO1xuICBjb25zdCBlbWFpbEZpZWxkID0gcG9wdXAucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVtYWlsXCJdJyk7XG4gIGVtYWlsRmllbGQuZm9jdXMoKTtcbn07XG5cbnBvcHVwQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpPT4ge1xuICBjb25zdCBlbWFpbEZpZWxkID0gcG9wdXAucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVtYWlsXCJdJyk7XG4gIGVtYWlsRmllbGQuZm9jdXMoKTtcbn0pO1xuXG5jb25zdCBjbG9zZVBvcHVwID0gKCkgPT4ge1xuICBpZiAocG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3B1cC0tb3BlbicpKSB7XG4gICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXAtLW9wZW4nKTtcbiAgICBwYWdlQm9keS5jbGFzc0xpc3QucmVtb3ZlKCdibG9jaycpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblBvcHVwRXNjS2V5ZG93bik7XG4gIH1cbn07XG5cbmNvbnN0IGxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbmF2X19pdGVtLS1sb2dpbiAudXNlci1uYXZfX2xpbmsnKTtcblxubG9naW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KT0+IHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgb3BlblBvcHVwKCk7XG59KTtcblxucG9wdXBDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xuICBjbG9zZVBvcHVwKCk7XG59KTtcblxucGFnZUJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KT0+IHtcbiAgaWYgKGV2dC50YXJnZXQgIT09IHBvcHVwICYmICFwb3B1cC5jb250YWlucyhldnQudGFyZ2V0KSkge1xuICAgIGNsb3NlUG9wdXAoKTtcbiAgfVxufSk7XG5cbmNvbnN0IGFsbElucHV0RmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cImVtYWlsXCJdJyk7XG5cbmFsbElucHV0RmllbGRzLmZvckVhY2goKGlucHV0ZmllbGQpID0+IHtcbiAgaW5wdXRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldnQpID0+IHtcbiAgICBzYXZlTG9jYWxTdG9yYWdlKGV2dC50YXJnZXQubmFtZSwgZXZ0LnRhcmdldC52YWx1ZSk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gJ2J1dHRvbiwgaW5wdXQsIHRleHRhcmVhLCBbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknO1xuY29uc3QgZm9jdXNhYmxlQ29udGVudCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHMpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2dCkgPT4ge1xuICBpZiAoKGV2dC5rZXkgPT09ICdUYWInIHx8IGV2dC5jb2RlID09PSAnOScpICYmIChwb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ3BvcHVwLS1vcGVuJykpKSB7XG4gICAgY29uc3QgVGFiSW5kZXhBcnJheSA9IEFycmF5LmZyb20oe2xlbmd0aDogZm9jdXNhYmxlQ29udGVudC5sZW5ndGh9LCAodiwgaykgPT4gayk7XG4gICAgY29uc3QgY3VyVGFiSW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGZvY3VzYWJsZUNvbnRlbnQsIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnN0IG5leHRUYWJJbmRleCA9IGN1clRhYkluZGV4IDwgMCA/IDAgOiBUYWJJbmRleEFycmF5LnNwbGljZShldnQuc2hpZnRLZXkgPyAtMSA6IDEpLmNvbmNhdChUYWJJbmRleEFycmF5KVtjdXJUYWJJbmRleF07XG4gICAgZm9jdXNhYmxlQ29udGVudFtuZXh0VGFiSW5kZXhdLmZvY3VzKCk7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59KTtcblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItLW1haW4nKSkge1xuICBjb25zdCBzd2lwZXJNYWluID0gbmV3IHdpbmRvdy5Td2lwZXIoJy5zd2lwZXItLW1haW4nLCB7XG4gICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBzcGFjZUJldHdlZW46IDMwLFxuICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgc2xpZGVzUGVyR3JvdXA6IDIsXG4gICAgcGFnaW5hdGlvbjoge1xuICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgdHlwZTogJ2N1c3RvbScsXG4gICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICByZW5kZXJDdXN0b20oc3dpcGVyLCBpbmRleCwgdG90YWwpIHtcbiAgICAgICAgcmV0dXJuICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogMHB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpJykubWF0Y2hlcykgP1xuICAgICAgICAgICc8c3BhbiBjbGFzcz1cInN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnRcIj4gJyArIGluZGV4ICsgJyA8L3NwYW4+JyArICcgb2YgJyArICc8c3BhbiBjbGFzcz1cInN3aXBlci1wYWdpbmF0aW9uLXRvdGFsXCI+ICcgKyB0b3RhbCArICcgPC9zcGFuPidcbiAgICAgICAgICA6XG4gICAgICAgICAgQXJyYXkodG90YWwpLmZpbGwoMCkucmVkdWNlKCh0eHQsIGksIGspID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0eHQgKyAnPHNwYW4gY2xhc3M9XCJzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQgJyArICgoayArIDEpICE9PSBpbmRleCA/ICcnIDogJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKSArICdcIj4nICsgKGsgKyAxKSArICc8L3NwYW4+JztcbiAgICAgICAgICB9LCAnJyk7XG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG5cbiAgICBvbjoge1xuICAgICAgaW5pdCgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1NjcmVlblR5cGVJc01vYmlsZScsIE51bWJlcih3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogMHB4KSBhbmQgKG1heC13aWR0aDogNzY4cHgpJykubWF0Y2hlcykudG9TdHJpbmcoKSk7XG4gICAgICB9LFxuICAgICAgYmVmb3JlUmVzaXplKCkge1xuICAgICAgICBpZiAoTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdTY3JlZW5UeXBlSXNNb2JpbGUnKSkgIT09IE51bWJlcih3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogMHB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpJykubWF0Y2hlcykpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnU2NyZWVuVHlwZUlzTW9iaWxlJywgTnVtYmVyKHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjhweCknKS5tYXRjaGVzKS50b1N0cmluZygpKTtcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBicmVha3BvaW50czoge1xuICAgICAgMTAyNDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICBzbGlkZXNQZXJHcm91cDogNCxcbiAgICAgIH0sXG4gICAgICA3Njg6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIHN3aXBlck1haW4uaW5pdCgpO1xufVxuXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci0tZ3JpZCcpKSB7XG4gIGNvbnN0IGZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXInKTtcbiAgY29uc3QgZmlsdGVyVG9vZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlcl9fdG9vZ2xlJyk7XG5cbiAgZmlsdGVyVG9vZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGZpbHRlci5jbGFzc0xpc3QudG9nZ2xlKCdmaWx0ZXItLWNsb3NlZCcpO1xuICAgIGZpbHRlclRvb2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdmaWx0ZXJfX3Rvb2dsZS0tb3BlbmVkJyk7XG4gIH0pO1xuXG4gIGNvbnN0IHN3aXBlckdyaWQgPSBuZXcgd2luZG93LlN3aXBlcignLnN3aXBlci0tZ3JpZCcsIHtcbiAgICBzcGFjZUJldHdlZW46IDMwLFxuICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgZ3JpZDoge1xuICAgICAgcm93czogNixcbiAgICAgIGZpbGw6ICdyb3cnLFxuICAgIH0sXG5cbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICByZW5kZXJCdWxsZXQoaW5kZXgsIGNsYXNzTmFtZSkge1xuICAgICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIj4nICsgKGluZGV4ICsgMSkgKyAnPC9zcGFuPic7XG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG5cbiAgICBicmVha3BvaW50czoge1xuICAgICAgNzY4OiB7XG4gICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICBncmlkOiB7XG4gICAgICAgICAgcm93czogNCxcbiAgICAgICAgICBmaWxsOiAncm93JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgc3dpcGVyR3JpZC5pbml0KCk7XG59XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
