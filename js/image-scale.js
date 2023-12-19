const MIN_SIZE = 25;
const MAX_SIZE = 100;

const updateScale = (scaleSize) => {
  const scaleValueElement = document.querySelector('.scale__control--value');

  let currentValue = parseInt(scaleValueElement.textContent, 10);

  if(scaleValueElement.textContent === '') {
    currentValue = MAX_SIZE;
  }

  currentValue = currentValue + scaleSize;

  if(currentValue < MIN_SIZE || currentValue > MAX_SIZE) {
    return;
  }

  scaleValueElement.setAttribute('value', `${currentValue}%`);
  scaleValueElement.textContent = currentValue;

  const preview = document.querySelector('.img-upload__preview img');

  preview.style.transform = `scale(${currentValue / MAX_SIZE})`;
};

export {updateScale};
