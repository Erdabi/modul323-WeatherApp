const initModel = {
  location: '', // old was description now its location
  temp: 0, //old was calories now its temp
  showForm: false,
  nextId: 3,
  editId: null,
  meals: [{
    id: 1,
    location: 'Breakfast 🥣',
    temp: 420,
    low: 3,
    high: 5
  },
  {
    id: 2,
    location: 'China',
    temp: 20,
    low: 3,
    high: 5
  }],
};

export default initModel;