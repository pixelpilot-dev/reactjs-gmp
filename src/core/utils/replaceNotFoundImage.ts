import noFoundPicture from '../../assets/images/no-picture.svg';

export const replaceNotFoundImage = (event, style) => {
  const { target } = event;

  target.onerror = null;
  target.src = noFoundPicture;

  if (style) {
    target.parentElement.classList.add(style);
  }
};
