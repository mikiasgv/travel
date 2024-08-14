const mainContainer = document.querySelector(".container");
const slideContainer = document.querySelector(".slide__outer");
const slides = document.querySelectorAll(".slide-container");
const titleContainer = document.querySelector(".title__outer");
const titles = document.querySelectorAll(".title__inner");
const virticalIndicatorDots = document.querySelectorAll(
  ".virtical-indicator__sp"
);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const slideSize = slides.length;

//order of the array matters here
const bgImages = [
  {
    imageSrc: "/images/Addis-ababa.jpg",
    alt: "Addis Ababa",
  },
  {
    imageSrc: "/images/Afar.jpg",
    alt: "Afar",
  },
  {
    imageSrc: "/images/Simien-Mountains.jpg",
    alt: "Simien-Mountains",
  },
  {
    imageSrc: "/images/Debre-libanos.jpg",
    alt: "Debre-libanos",
  },
];

const slideTl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power2.out",
  },
});

class Slider {
  constructor(
    bgImages,
    sliders,
    slideContainer,
    titles,
    titleContainer,
    virticalIndicatorDots
  ) {
    this.current = 0;
    this.virticalIndicatorDots = virticalIndicatorDots;
    this.verticalIndicatorTextElement;
    this.textIndicatorWidth = 0;
    this.bgImagesContainer = bgImages;
    this.bgImageElements;
    this.titles = titles;
    this.titleContainer = titleContainer;
    this.titleContainerHeight =
      this.titleContainer.getBoundingClientRect().height;
    this.sliders = sliders;
    this.spaceBewtweenSlides = 10;
    this.slideContainerWIdth =
      slideContainer.getBoundingClientRect().width + 100;

    this.slideSize = sliders.length;
    this.singleSlideElementWidth = this.slideContainerWIdth / this.slideSize;

    //handle nex and prev buttons
    document
      .querySelectorAll(".slider__btn-switch[data-type]")
      .forEach((btn) => {
        btn.onclick = () => this.handleNextPrevClick(btn.dataset.type);
      });
  }

  initIndicatorText() {
    let verticalIndicatorTextSpan = document.querySelector(
      ".vertical-text__indicator--top"
    );
    this.sliders.forEach((slide, index) => {
      verticalIndicatorTextSpan.innerHTML += `
        <span>0${index + 1}</span>
      `;
    });

    this.verticalIndicatorTextElement = document.querySelectorAll(
      ".vertical-text__indicator--top span"
    );

    this.textIndicatorWidth = document.querySelector(
      ".vertical-text__indicator--top span"
    ).offsetWidth;
  }

  //creating img elements
  createImageElement(src, alt, index) {
    let img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.dataset.order = index;
    img.classList.add("container__image");

    return img;
  }

  //appending background images to the container
  renderBgImages() {
    this.bgImagesContainer.forEach((bgImage, index) => {
      mainContainer.prepend(
        this.createImageElement(bgImage.imageSrc, bgImage.alt, index)
      );
    });

    this.bgImageElements = document.querySelectorAll(".container__image");

    document.querySelector(
      ".vertical-text__indicator--right"
    ).innerHTML = `0${this.slideSize}`;
  }

  //initial page-load animation
  initialPageLoadAnim() {
    slideTl.to(".container", {
      delay: 0,
      duration: 0.1,
      opacity: 1,
      ease: "Power2.easeInOut",
    });
    slideTl.to(".container__image", {
      delay: 0.2,
      duration: 0.2,
      ease: "Power2.easeInOut",
    });
    slideTl.to(".header", {
      delay: 0.1,
      duration: 0.2,
      ease: "Power2.easeInOut",
    });
    slideTl.fromTo(
      ".header__menu *",
      {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
    slideTl.fromTo(
      ".virtical-indicator *",
      {
        x: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "<"
    );
    slideTl.fromTo(
      ".title__outer *",
      {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
      },
      "<"
    );
    slideTl.fromTo(
      ".title__main-action *",
      {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      "<"
    );
    slideTl.fromTo(
      ".slide__outer .slide-container",
      {
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      },
      "<"
    );
    slideTl.fromTo(
      ".slide__indicator",
      {
        x: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "<"
    );
    this.sliders.forEach((slide, index) => {
      slideTl.set(
        slide,
        {
          width: this.singleSlideElementWidth,
          left:
            (this.singleSlideElementWidth + this.spaceBewtweenSlides) * index,
        },
        "<"
      );
    });
    slideTl.set(
      this.sliders[this.current],
      {
        scale: 1.1,
        xPercent: -5,
      },
      "<"
    );
    this.bgImageElements.forEach((img, index) => {
      slideTl.set(
        img,
        {
          autoAlpha: () => {
            return parseInt(img.dataset.order) === 0 ? 1 : 0;
          },
        },
        "<"
      );
    });
    this.titles.forEach((title, index) => {
      slideTl.set(
        title,
        {
          top: () => {
            return index === 0 ? 0 : this.titleContainerHeight;
          },
        },
        "<"
      );
    });
    this.verticalIndicatorTextElement.forEach((vText, index) => {
      slideTl.set(
        vText,
        {
          width: "25px",
          position: "absolute",
          left: () => {
            return index === 0 ? 0 : -this.textIndicatorWidth;
          },
        },
        "<"
      );
    });
    this.virticalIndicatorDots.forEach((vDot, index) => {
      slideTl.set(
        vDot,
        {
          scale: () => {
            return index === 0 ? 1.8 : 1;
          },
          color: () => {
            return index === 0 ? "rgb(10 65 171)" : "rgb(255 255 255 / 20%)";
          },
        },
        "<"
      );
    });
  }

  nextSlideIndex(currentIndex) {
    return currentIndex + 1 === this.slideSize ? 0 : currentIndex + 1;
  }

  handleNextPrevClick(type) {
    // Exit if animation is active
    if (slideTl.isActive()) {
      return;
    }

    //back-ground animation begins here
    slideTl
      .to(this.bgImageElements, {
        duration: 1,
        autoAlpha: 0,
        ease: "expo.inOut",
      })
      .to(
        `.container__image[data-order="${this.nextSlideIndex(this.current)}"]`,
        {
          duration: 1,
          autoAlpha: 1,
          ease: "expo.inOut",
        },
        "<"
      );

    //vertical dot indicator animation begins here
    slideTl
      .fromTo(
        this.virticalIndicatorDots[this.current],
        {
          duration: 1,
          color: "rgb(10 65 171)",
          scale: 1.8,
          ease: "expo.inOut",
        },
        {
          color: "rgb(255 255 255 / 20%)",
          scale: 1,
          ease: "expo.inOut",
        },
        "<"
      )
      .fromTo(
        this.virticalIndicatorDots[this.nextSlideIndex(this.current)],
        {
          duration: 1,
          color: "rgb(255 255 255 / 20%)",
          scale: 1,
          ease: "expo.inOut",
        },
        {
          color: "rgb(10 65 171)",
          scale: 1.8,
          ease: "expo.inOut",
        },
        "<"
      );

    //vertical text indicator animation begins here
    slideTl
      .fromTo(
        this.verticalIndicatorTextElement[this.current],
        {
          duration: 1,
          left: 0,
          ease: "expo.inOut",
        },
        {
          left: this.textIndicatorWidth,
          ease: "expo.inOut",
        },
        "<"
      )
      .fromTo(
        this.verticalIndicatorTextElement[this.nextSlideIndex(this.current)],
        {
          duration: 1,
          left: -this.textIndicatorWidth,
          ease: "expo.inOut",
        },
        {
          left: 0,
          ease: "expo.inOut",
        },
        "<"
      );

    //title animation begins here
    slideTl
      .fromTo(
        this.titles[this.current],
        {
          duration: 1,
          top: 0,
          ease: "expo.inOut",
        },
        {
          top: -this.titleContainerHeight,
          ease: "expo.inOut",
        },
        "<"
      )
      .fromTo(
        this.titles[this.nextSlideIndex(this.current)],
        {
          duration: 1,
          top: this.titleContainerHeight,
          ease: "expo.inOut",
        },
        {
          top: 0,
          ease: "expo.inOut",
        },
        "<"
      );

    //const dir = type === "next" ? 1 : -1;
    //slide animation begins here
    slideTl
      .to(
        this.sliders,
        {
          duration: 1,
          left: (index, element) => {
            let left =
              index === this.current
                ? -250
                : parseInt(element.style.left) -
                  (this.singleSlideElementWidth + this.spaceBewtweenSlides);
            return left;
          },
          opacity: (index, element) => {
            return index === this.current ? 0 : 1;
          },
          ease: "expo.inOut",
          stagger: 0,
        },
        "<"
      )
      .to(
        this.sliders[this.nextSlideIndex(this.current)],
        {
          delay: 0.45,
          scale: 1.1,
          xPercent: -5,
        },
        "<"
      )
      .to(
        this.sliders[this.current],
        {
          delay: 0.4,
          left: (this.singleSlideElementWidth + 10) * (this.slideSize - 1),
          opacity: 0,
          scale: 1,
          xPercent: 0,
          onComplete: () => {
            this.current =
              this.current === this.slideSize - 1 ? 0 : this.current + 1;
          },
        },
        "<"
      );
  }
}

const slider = new Slider(
  bgImages,
  slides,
  slideContainer,
  titles,
  titleContainer,
  virticalIndicatorDots
);
slider.renderBgImages();
slider.initIndicatorText();
slider.initialPageLoadAnim();
