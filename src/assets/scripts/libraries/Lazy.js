export default class Lazy {
  static wait(images, { delay = 200 } = {}) {
    const imagesLength = images.length;
    const imagesLazed = [];

    return new Promise((resolve, reject) => {
      Array.from(images).forEach(image => {
        const imageCache = new Image();

        imageCache.addEventListener('load', () => {
          image.src = imageCache.src;

          imagesLazed.push(image);

          if (imagesLazed.length >= imagesLength) {
            setTimeout(() => resolve(imagesLazed), delay);
          }
        });

        imageCache.addEventListener('error', err => {
          reject(err, imageCache);
        });

        imageCache.src = image.dataset.src;
      });
    });
  }
}
