const slides = document.querySelectorAll(".hero__slide");
const slideIntervalMs = 1500;

let activeSlideIndex = 0;

if (slides.length > 1) {
  window.setInterval(() => {
    slides[activeSlideIndex].classList.remove("is-active");
    activeSlideIndex = (activeSlideIndex + 1) % slides.length;
    slides[activeSlideIndex].classList.add("is-active");
  }, slideIntervalMs);
}

const scrollToSection = (targetId) => {
  const targetElement =
    targetId === "hero" ? document.querySelector(".hero") : document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const navLinks = document.querySelectorAll(".site-nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    scrollToSection(link.dataset.target);
  });
});

const introCatalogButton = document.querySelector(".intro-card__cta");

if (introCatalogButton) {
  introCatalogButton.addEventListener("click", () => {
    scrollToSection("catalog");
  });
}

const aboutProductsButton = document.querySelector(".product-info-card__button");

if (aboutProductsButton) {
  aboutProductsButton.addEventListener("click", () => {
    scrollToSection("contacts");
  });
}

const modal = document.querySelector("#request-modal");
const productModal = document.querySelector("#sphere-modal");
const modalStatus = document.querySelector("#request-form-status");
const requestForm = document.querySelector("#request-form");
const productModalTitle = document.querySelector(".product-modal__title");
const productModalParagraphs = document.querySelectorAll(".product-modal__text p");
const openModalButtons = [
  document.querySelector(".hero .hero__cta"),
  document.querySelector("#custom-work .idea-section__button"),
  document.querySelector(".idea-section--final .idea-section__button"),
  document.querySelector(".contacts-section__button"),
].filter(Boolean);
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const openProductModalButtons = document.querySelectorAll("[data-product-modal]");
const closeProductModalButtons = document.querySelectorAll("[data-close-product-modal]");
const productSlides = document.querySelectorAll(".product-modal__slide");
const productPrevButton = document.querySelector(".product-modal__arrow--prev");
const productNextButton = document.querySelector(".product-modal__arrow--next");
let activeProductSlideIndex = 0;

const productData = {
  sphere: {
    title: "Шар-сфера<br />из нержавеющей стали",
    paragraphs: [
      "Арт-объект для интерьеров, общественных пространств и многого другого.",
      "Используется как самостоятельный акцент или часть пространственной композиции.",
      "Может быть адаптирован под конкретные размеры, задачи и контекст проекта.",
    ],
    slides: [
      "./assets/catalog/catalog-1.jpg",
      "./assets/catalog/catalog-1-2.jpg",
      "./assets/catalog/catalog-1-3.jpg",
      "./assets/catalog/catalog-1-4.jpg",
      "./assets/catalog/catalog-1-5.jpg",
    ],
  },
  vase: {
    title: "Ваза<br />из нержавеющей стали",
    paragraphs: [
      "Подходит для интерьерных пространств, холлов, офисов и общественных зон.",
      "Используется как самостоятельный акцент или часть композиции.",
      "Доступны различные варианты высоты и индивидуальное изготовление под проект.",
    ],
    slides: [
      "./assets/catalog/catalog-2.jpg",
      "./assets/catalog/catalog-2-2.jpg",
      "./assets/catalog/catalog-2-3.jpg",
      "./assets/catalog/catalog-2-4.jpg",
      "./assets/catalog/catalog-2-5.jpg",
    ],
  },
  pillow: {
    title: "Подушка<br />из нержавеющей стали",
    paragraphs: [
      "Скульптурный арт-объект с зеркальной поверхностью из нержавеющей стали.",
      "Форма создаёт иллюзию мягкого материала, сохраняя прочность и долговечность металла.",
      "Изготавливается в различных размерах под задачу проекта.",
    ],
    slides: [
      "./assets/catalog/catalog-3.jpg",
      "./assets/catalog/catalog-3-2.jpg",
      "./assets/catalog/catalog-3-3.jpg",
      "./assets/catalog/catalog-3-4.jpg",
      "./assets/catalog/catalog-3-5.jpg",
    ],
  },
  table: {
    title: "Стол<br />из нержавеющей стали",
    paragraphs: [
      "Стол с выразительной геометрией основания из нержавейки и стеклянной столешницей.",
      "Подходит для офисов, общественных пространств и частных проектов.",
      "Изготавливается в различных габаритах под задачи проекта.",
    ],
    slides: [
      "./assets/catalog/catalog-4.jpg",
      "./assets/catalog/catalog-4-2.jpg",
      "./assets/catalog/catalog-4-3.jpg",
      "./assets/catalog/catalog-4-4.jpg",
      "./assets/catalog/catalog-4-5.jpg",
    ],
  },
  pouf: {
    title: "Пуф<br />из нержавеющей стали",
    paragraphs: [
      "Арт-объект для интерьеров, общественных пространств и частных проектов.",
      "Пуф из нержавеющей стали, подходит как дополнительное посадочное место или акцентный элемент пространства.",
      "Может быть выполнен в различных размерах, тканях и пропорциях под задачу проекта.",
    ],
    slides: [
      "./assets/catalog/catalog-5.jpg",
      "./assets/catalog/catalog-5-2.jpg",
      "./assets/catalog/catalog-5-3.jpg",
      "./assets/catalog/catalog-5-4.jpg",
      "./assets/catalog/catalog-5-5.jpg",
    ],
  },
  "side-table": {
    title: "Столик<br />из нержавеющей стали",
    paragraphs: [
      "Арт-объект для интерьеров, общественных пространств и частных проектов.",
      "Минималистичная конструкция из нержавеющей стали со стеклянной столешницей.",
      "Может быть изготовлен в различных габаритах и пропорциях под задачи проекта.",
    ],
    slides: [
      "./assets/catalog/catalog-6.jpg",
      "./assets/catalog/catalog-6-2.jpg",
      "./assets/catalog/catalog-6-3.jpg",
      "./assets/catalog/catalog-6-4.jpg",
      "./assets/catalog/catalog-6-5.jpg",
    ],
  },
  chair: {
    title: "Кресло<br />из нержавеющей стали",
    paragraphs: [
      "Современное решение для интерьеров, лаунж-зон и общественных пространств.",
      "Нержавеющий каркас обеспечивает надёжность, а мягкие модули создают уют и комфорт.",
      "Может быть выполнено в разных габаритах, с различными вариантами обивки и отделки.",
    ],
    slides: [
      "./assets/catalog/catalog-7.jpg",
      "./assets/catalog/catalog-7-2.jpg",
      "./assets/catalog/catalog-7-3.jpg",
      "./assets/catalog/catalog-7-4.jpg",
      "./assets/catalog/catalog-7-5.jpg",
    ],
  },
  bench: {
    title: "Скамья<br />из нержавеющей стали",
    paragraphs: [
      "Арт-объект для уличного и внутреннего использования.",
      "Скамья сочетает в себе функциональность и стиль, идеально подходя в любое место.",
      "Может быть адаптирована под конкретные размеры, материалы и проектные решения.",
    ],
    slides: [
      "./assets/catalog/catalog-8.jpg",
      "./assets/catalog/catalog-8-2.jpg",
      "./assets/catalog/catalog-8-3.jpg",
      "./assets/catalog/catalog-8-4.jpg",
      "./assets/catalog/catalog-8-5.jpg",
    ],
  },
  bull: {
    title: "Статуя «Бык»<br />из нержавеющей стали",
    paragraphs: [
      "Размеры: 1630×500×800 мм",
      "Современная скульптура для интерьеров, общественных пространств и галерей.",
      "Выразительная форма с геометрическими гранями создает динамичный визуальный акцент и подчеркивает статус пространства.",
      "Может использоваться как центральный элемент композиции или самостоятельный арт-объект.",
    ],
    slides: [
      "./assets/catalog/catalog-bull.jpg",
      "./assets/catalog/catalog-bull-2.jpg",
      "./assets/catalog/catalog-bull-3.jpg",
      "./assets/catalog/catalog-bull-4.jpg",
      "./assets/catalog/catalog-bull-5.jpg",
    ],
  },
  sofa: {
    title: "Диван<br />из нержавеющей стали",
    paragraphs: [
      "Арт-объект для интерьера, который сочетает стиль и функциональность.",
      "Этот диван идеально подходит для офисных и жилых помещений, комфортный и долговечный.",
      "Может быть адаптирован под конкретные размеры, материалы и проектные решения.",
    ],
    slides: [
      "./assets/catalog/catalog-9.jpg",
      "./assets/catalog/catalog-9-2.jpg",
      "./assets/catalog/catalog-9-3.jpg",
      "./assets/catalog/catalog-9-4.jpg",
      "./assets/catalog/catalog-9-5.jpg",
    ],
  },
};

const openModal = () => {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const renderProductModal = (productKey) => {
  const product = productData[productKey];

  if (!product || !productModalTitle || productModalParagraphs.length < 3) {
    return;
  }

  productModalTitle.innerHTML = product.title;

  productModalParagraphs.forEach((paragraph, index) => {
    paragraph.textContent = product.paragraphs[index] || "";
  });

  productSlides.forEach((slide, index) => {
    slide.style.backgroundImage = `url('${product.slides[index] || product.slides[0]}')`;
    slide.classList.toggle("is-active", index === 0);
  });

  activeProductSlideIndex = 0;
};

const openProductModal = (productKey) => {
  if (!productModal) return;
  renderProductModal(productKey);
  productModal.classList.add("is-open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeProductModal = () => {
  if (!productModal) return;
  productModal.classList.remove("is-open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

openModalButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

openProductModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProductModal(button.dataset.productModal);
  });
});

closeProductModalButtons.forEach((button) => {
  button.addEventListener("click", closeProductModal);
});

const productRequestButton = document.querySelector(".product-modal__cta");

if (productRequestButton) {
  productRequestButton.addEventListener("click", () => {
    closeProductModal();
    openModal();
  });
}

const showProductSlide = (nextIndex) => {
  if (!productSlides.length) return;

  productSlides[activeProductSlideIndex].classList.remove("is-active");
  activeProductSlideIndex = (nextIndex + productSlides.length) % productSlides.length;
  productSlides[activeProductSlideIndex].classList.add("is-active");
};

if (productPrevButton) {
  productPrevButton.addEventListener("click", () => {
    showProductSlide(activeProductSlideIndex - 1);
  });
}

if (productNextButton) {
  productNextButton.addEventListener("click", () => {
    showProductSlide(activeProductSlideIndex + 1);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) {
    closeModal();
  }

  if (event.key === "Escape" && productModal?.classList.contains("is-open")) {
    closeProductModal();
  }
});

if (requestForm) {
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = requestForm.querySelector(".modal-form__submit");
    const formData = new FormData(requestForm);
    const fullName = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const endpoint = (requestForm.dataset.endpoint || "").trim();
    const payload = {
      name: fullName,
      phone,
      email,
      source: "evrotank-art.ru",
    };

    if (modalStatus) {
      modalStatus.textContent = "Отправляем заявку...";
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      if (!endpoint || endpoint.includes("REPLACE_WITH_FUNCTION_ID")) {
        throw new Error("LEAD_ENDPOINT_NOT_CONFIGURED");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Form submit failed");
      }

      const result = await response.json().catch(() => ({}));
      if (result && result.ok === false) {
        throw new Error(String(result.error || "Form submit failed"));
      }

      requestForm.reset();

      if (modalStatus) {
        modalStatus.textContent = "Заявка отправлена. Мы скоро с вами свяжемся.";
      }

      window.setTimeout(() => {
        closeModal();
        if (modalStatus) {
          modalStatus.textContent = "";
        }
      }, 1400);
    } catch (error) {
      if (modalStatus) {
        if (String(error?.message || "").includes("LEAD_ENDPOINT_NOT_CONFIGURED")) {
          modalStatus.textContent = "Форма еще не настроена. Сообщите менеджеру, чтобы подключил почтовый endpoint.";
        } else {
          modalStatus.textContent =
            "Не удалось отправить заявку. Попробуйте еще раз чуть позже.";
        }
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

const mapContainer = document.querySelector("#contacts-map");

if (mapContainer && typeof ymaps !== "undefined") {
  const location = [56.833457, 53.161724];
  ymaps.ready(() => {
    const map = new ymaps.Map("contacts-map", {
      center: location,
      zoom: 17,
      controls: ["zoomControl", "fullscreenControl"],
    });

    const placemark = new ymaps.Placemark(
      location,
      {
        balloonContentHeader: "Завод ЕвроТанк",
        balloonContentBody: "ул. Телегина 41, оф 17",
        hintContent: "Завод ЕвроТанк",
      },
      {
        preset: "islands#redDotIcon",
      }
    );

    map.geoObjects.add(placemark);
    placemark.balloon.open();
    map.behaviors.enable("scrollZoom");
  });
}
