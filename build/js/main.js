'use strict';

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
  const swiperMain = new Swiper('.swiper--main', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    slidesPerView: 2,
    slidesPerGroup: 2,
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      clickable: true,
      renderCustom: function (swiper, index, total) {
        let text = '';
        if (window.matchMedia('(min-width: 0px) and (max-width: 767px)').matches) {
          text = '<span class="swiper-pagination-current"> ' + index + ' </span>' + ' of ' + '<span class="swiper-pagination-total"> ' + total + ' </span>';
        } else {
          for (let i = 1; i <= total; i++) {
            text += '<span class="swiper-pagination-bullet ' + (i !== index ? '' : 'swiper-pagination-bullet-active') + '">' + i + '</span>';
          }
        }
        return text;
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    on: {
      init: function () {
        localStorage.setItem('ScreenTypeIsMobile', Number(window.matchMedia('(min-width: 0px) and (max-width: 768px)').matches).toString());
      },
      beforeResize: function () {
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

  const swiperGrid = new Swiper('.swiper--grid', {
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
      renderBullet: function (index, className) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGFnZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5jb25zdCBhY2NvcmRpb25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25fX2l0ZW0nKTtcbmNvbnN0IGFjY29yZGlvbkl0ZW1zVGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbS10aXRsZScpO1xuXG5jb25zdCBzaXRlTmF2VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtbmF2X190b2dnbGUnKTtcbmNvbnN0IHNpdGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1uYXYnKTtcbnNpdGVOYXYuY2xhc3NMaXN0LmFkZCgnc2l0ZS1uYXYtLWNsb3NlZCcpO1xuXG5jb25zdCBvcGVuTWVudSA9ICgpID0+IHtcbiAgc2l0ZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdzaXRlLW5hdi0tY2xvc2VkJyk7XG4gIHNpdGVOYXYuY2xhc3NMaXN0LmFkZCgnc2l0ZS1uYXYtLW9wZW5lZCcpO1xuICBwYWdlQm9keS5jbGFzc0xpc3QuYWRkKCdibG9jaycpO1xufTtcblxuY29uc3QgY2xvc2VNZW51ID0gKCkgPT4ge1xuICBzaXRlTmF2LmNsYXNzTGlzdC5hZGQoJ3NpdGUtbmF2LS1jbG9zZWQnKTtcbiAgc2l0ZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdzaXRlLW5hdi0tb3BlbmVkJyk7XG4gIHBhZ2VCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2NrJyk7XG59O1xuXG5zaXRlTmF2VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBpZiAoc2l0ZU5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ3NpdGUtbmF2LS1jbG9zZWQnKSkge1xuICAgIG9wZW5NZW51KCk7XG4gIH0gZWxzZSB7XG4gICAgY2xvc2VNZW51KCk7XG4gIH1cbn0pO1xuXG5jb25zdCBpc0VzY0V2ZW50ID0gKGV2dCkgPT4ge1xuICByZXR1cm4gZXZ0LmtleSA9PT0gKCdFc2NhcGUnIHx8ICdFc2MnKTtcbn07XG5cbmNvbnN0IHNhdmVMb2NhbFN0b3JhZ2UgPSAoZGF0YU5hbWUsIGRhdGFDb250ZW50KSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGRhdGFOYW1lLCBkYXRhQ29udGVudCk7XG59O1xuXG5jb25zdCBjbG9zZUFsbEl0ZW1zID0gKCkgPT4ge1xuICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY2NvcmRpb25fX2l0ZW0tLWNsb3NlZCcpO1xuICB9KTtcbn07XG5cbmNvbnN0IGFjY29yZGlvbkl0ZW1DbGljayA9IChhY2NvcmRpb25JdGVtaW5kZXgpID0+IHtcbiAgYWNjb3JkaW9uSXRlbXNbYWNjb3JkaW9uSXRlbWluZGV4XS5jbGFzc0xpc3QudG9nZ2xlKCdhY2NvcmRpb25fX2l0ZW0tLWNsb3NlZCcpO1xufTtcblxuYWNjb3JkaW9uSXRlbXNUaXRsZXMuZm9yRWFjaCgoaXRlbVRpdGxlLCBpbmRleCkgPT4ge1xuICBpdGVtVGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYWNjb3JkaW9uSXRlbUNsaWNrKGluZGV4KTtcbiAgfSk7XG59KTtcblxuY2xvc2VBbGxJdGVtcygpO1xuXG5jb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpO1xuY29uc3QgcG9wdXBDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UtYnV0dG9uJyk7XG5cbmNvbnN0IG9uUG9wdXBFc2NLZXlkb3duID0gKGV2dCkgPT4ge1xuICBpZiAoaXNFc2NFdmVudChldnQpKSB7XG4gICAgY2xvc2VQb3B1cCgpO1xuICB9XG59O1xuXG5jb25zdCBvcGVuUG9wdXAgPSAoKSA9PiB7XG4gIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLS1vcGVuJyk7XG4gIHBhZ2VCb2R5LmNsYXNzTGlzdC5hZGQoJ2Jsb2NrJyk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblBvcHVwRXNjS2V5ZG93bik7XG4gIGNvbnN0IGVtYWlsRmllbGQgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKTtcbiAgZW1haWxGaWVsZC5mb2N1cygpO1xufTtcblxucG9wdXBDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCk9PiB7XG4gIGNvbnN0IGVtYWlsRmllbGQgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKTtcbiAgZW1haWxGaWVsZC5mb2N1cygpO1xufSk7XG5cbmNvbnN0IGNsb3NlUG9wdXAgPSAoKSA9PiB7XG4gIGlmIChwb3B1cC5jbGFzc0xpc3QuY29udGFpbnMoJ3BvcHVwLS1vcGVuJykpIHtcbiAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cC0tb3BlbicpO1xuICAgIHBhZ2VCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2NrJyk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uUG9wdXBFc2NLZXlkb3duKTtcbiAgfVxufTtcblxuY29uc3QgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1uYXZfX2l0ZW0tLWxvZ2luIC51c2VyLW5hdl9fbGluaycpO1xuXG5sb2dpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpPT4ge1xuICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICBvcGVuUG9wdXAoKTtcbn0pO1xuXG5wb3B1cENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gIGNsb3NlUG9wdXAoKTtcbn0pO1xuXG5wYWdlQm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpPT4ge1xuICBpZiAoZXZ0LnRhcmdldCAhPT0gcG9wdXAgJiYgIXBvcHVwLmNvbnRhaW5zKGV2dC50YXJnZXQpKSB7XG4gICAgY2xvc2VQb3B1cCgpO1xuICB9XG59KTtcblxuY29uc3QgYWxsSW5wdXRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKTtcblxuYWxsSW5wdXRGaWVsZHMuZm9yRWFjaCgoaW5wdXRmaWVsZCkgPT4ge1xuICBpbnB1dGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2dCkgPT4ge1xuICAgIHNhdmVMb2NhbFN0b3JhZ2UoZXZ0LnRhcmdldC5uYW1lLCBldnQudGFyZ2V0LnZhbHVlKTtcbiAgfSk7XG59KTtcblxuY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSAnYnV0dG9uLCBpbnB1dCwgdGV4dGFyZWEsIFt0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSc7XG5jb25zdCBmb2N1c2FibGVDb250ZW50ID0gcG9wdXAucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50cyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZ0KSA9PiB7XG4gIGlmICgoZXZ0LmtleSA9PT0gJ1RhYicgfHwgZXZ0LmNvZGUgPT09ICc5JykgJiYgKHBvcHVwLmNsYXNzTGlzdC5jb250YWlucygncG9wdXAtLW9wZW4nKSkpIHtcbiAgICBjb25zdCBUYWJJbmRleEFycmF5ID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiBmb2N1c2FibGVDb250ZW50Lmxlbmd0aH0sICh2LCBrKSA9PiBrKTtcbiAgICBjb25zdCBjdXJUYWJJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZm9jdXNhYmxlQ29udGVudCwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgY29uc3QgbmV4dFRhYkluZGV4ID0gY3VyVGFiSW5kZXggPCAwID8gMCA6IFRhYkluZGV4QXJyYXkuc3BsaWNlKGV2dC5zaGlmdEtleSA/IC0xIDogMSkuY29uY2F0KFRhYkluZGV4QXJyYXkpW2N1clRhYkluZGV4XTtcbiAgICBmb2N1c2FibGVDb250ZW50W25leHRUYWJJbmRleF0uZm9jdXMoKTtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn0pO1xuXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci0tbWFpbicpKSB7XG4gIGNvbnN0IHN3aXBlck1haW4gPSBuZXcgU3dpcGVyKCcuc3dpcGVyLS1tYWluJywge1xuICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgIGxvb3A6IHRydWUsXG4gICAgc3BhY2VCZXR3ZWVuOiAzMCxcbiAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgIHR5cGU6ICdjdXN0b20nLFxuICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgcmVuZGVyQ3VzdG9tOiBmdW5jdGlvbiAoc3dpcGVyLCBpbmRleCwgdG90YWwpIHtcbiAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgdGV4dCA9ICc8c3BhbiBjbGFzcz1cInN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnRcIj4gJyArIGluZGV4ICsgJyA8L3NwYW4+JyArICcgb2YgJyArICc8c3BhbiBjbGFzcz1cInN3aXBlci1wYWdpbmF0aW9uLXRvdGFsXCI+ICcgKyB0b3RhbCArICcgPC9zcGFuPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWw7IGkrKykge1xuICAgICAgICAgICAgdGV4dCArPSAnPHNwYW4gY2xhc3M9XCJzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQgJyArIChpICE9PSBpbmRleCA/ICcnIDogJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKSArICdcIj4nICsgaSArICc8L3NwYW4+JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxuICAgIH0sXG5cbiAgICBvbjoge1xuICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnU2NyZWVuVHlwZUlzTW9iaWxlJywgTnVtYmVyKHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjhweCknKS5tYXRjaGVzKS50b1N0cmluZygpKTtcbiAgICAgIH0sXG4gICAgICBiZWZvcmVSZXNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnU2NyZWVuVHlwZUlzTW9iaWxlJykpICE9PSBOdW1iZXIod2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDBweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KScpLm1hdGNoZXMpKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1NjcmVlblR5cGVJc01vYmlsZScsIE51bWJlcih3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogMHB4KSBhbmQgKG1heC13aWR0aDogNzY4cHgpJykubWF0Y2hlcykudG9TdHJpbmcoKSk7XG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgIHRoaXMucGFnaW5hdGlvbi5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDEwMjQ6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDQsXG4gICAgICB9LFxuICAgICAgNzY4OiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBzd2lwZXJNYWluLmluaXQoKTtcbn1cblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItLWdyaWQnKSkge1xuICBjb25zdCBmaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJyk7XG4gIGNvbnN0IGZpbHRlclRvb2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXJfX3Rvb2dsZScpO1xuXG4gIGZpbHRlclRvb2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBmaWx0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZmlsdGVyLS1jbG9zZWQnKTtcbiAgICBmaWx0ZXJUb29nbGUuY2xhc3NMaXN0LnRvZ2dsZSgnZmlsdGVyX190b29nbGUtLW9wZW5lZCcpO1xuICB9KTtcblxuICBjb25zdCBzd2lwZXJHcmlkID0gbmV3IFN3aXBlcignLnN3aXBlci0tZ3JpZCcsIHtcbiAgICBzcGFjZUJldHdlZW46IDMwLFxuICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgZ3JpZDoge1xuICAgICAgcm93czogNixcbiAgICAgIGZpbGw6ICdyb3cnLFxuICAgIH0sXG5cbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICByZW5kZXJCdWxsZXQ6IGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiPicgKyAoaW5kZXggKyAxKSArICc8L3NwYW4+JztcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxuICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXG4gICAgfSxcblxuICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICA3Njg6IHtcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICByb3dzOiA0LFxuICAgICAgICAgIGZpbGw6ICdyb3cnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBzd2lwZXJHcmlkLmluaXQoKTtcbn1cbiJdLCJmaWxlIjoibWFpbi5qcyJ9
