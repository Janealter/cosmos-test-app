import items from '../data/carousel-items';

export const getItems = () => getRandomItems(items);

function getRandomItems (items) {
  const array = [];
  const previousIndices = [];
  for (let i = 0; i < 4; i++) {
    const getRandomIndex = () => Math.floor(Math.random() * items.length);
    let itemIndex = getRandomIndex();
    while (previousIndices.some(index => index === itemIndex)) {
      itemIndex = getRandomIndex();
    }
    previousIndices.push(itemIndex);
    array.push(items[itemIndex]);
  }
  return array;
}
