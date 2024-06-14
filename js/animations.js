

export function slideTitle(title) {
  title.classList.add('title-slide-in');
}
export function showElement(element) {
  element.classList.add('visible');
  element.classList.remove('hidden');
}
export function hideElement(element) {
  element.classList.add('hidden');
  element.classList.remove('visible');
}
