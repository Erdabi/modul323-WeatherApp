const initModel = {
  location: '', // old was description now its location
  temp: 0, //old was calories now its temp
  low: 0,
  high: 0,
  showForm: false,
  nextId: 3,
  editId: null,
  locations: [{ //old was meals now ist table
    id: 1,
    location: 'China', 
    temp: 20,
    low: 3,
    high: 5
  }],
};

export default initModel;