const categories = [
  {
    id: 1,
    label: "Furniture",
    icon: "floor-lamp",
    backgroundColor: "primary",
    color: "white",
  },
  {
    id: 2,
    label: "Cars",
    icon: "car",
    backgroundColor: "orange",
    color: "white",
  },
  {
    id: 3,
    label: "Cameras",
    icon: "camera",
    backgroundColor: "yellow",
    color: "white",
  },
  {
    id: 4,
    label: "Games",
    icon: "cards",
    backgroundColor: "green",
    color: "white",
  },
  {
    id: 5,
    label: "Clothing",
    icon: "shoe-heel",
    backgroundColor: "teal",
    color: "white",
  },
  {
    id: 6,
    label: "Sports",
    icon: "basketball",
    backgroundColor: "indigo",
    color: "white",
  },
  {
    id: 7,
    label: "Movies & Music",
    icon: "headphones",
    backgroundColor: "blue",
    color: "white",
  },
  {
    id: 8,
    label: "Books",
    icon: "book-open-variant",
    backgroundColor: "mauve",
    color: "white",
  },
  {
    id: 9,
    label: "Other",
    icon: "application",
    backgroundColor: "grey",
    color: "white",
  },
];

const getCategories = () => categories;

const getCategory = (id) => categories.find((c) => c.id === id);

module.exports = {
  getCategories,
  getCategory,
};
