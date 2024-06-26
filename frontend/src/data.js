import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Christopher',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'Kartik',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
    products: [
      {
        _id: '1',
        name: 'Sea Anemone',
        category: 'Shirts',
        image: '/images/SeaAnemone.jpeg',
        price: 120,
        countInStock: 10,
        brand: 'Hot Topic',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        _id: '2',
        name: 'Metallica Ride the lightning',
        category: 'Shirts',
        image: '/images/lightning_metallica.jpeg',
        price: 100,
        countInStock: 20,
        brand: 'Metallica',
        rating: 4.0,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        _id: '3',
        name: 'Nirvana',
        category: 'Shirts',
        image: '/images/nirvana.jpeg',
        price: 220,
        countInStock: 0,
        brand: 'Nirvana',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product',
      },
      {
        _id: '4',
        name: 'American Eagle Blue Jeans',
        category: 'Pants',
        image: '/images/jeans.jpeg',
        price: 78,
        countInStock: 15,
        brand: 'American Eagle',
        rating: 4.5,
        numReviews: 14,
        description: 'high quality product',
      },
      {
        _id: '5',
        name: 'American Eagle Black Jeans',
        category: 'Pants',
        image: '/images/jeans3.jpeg',
        price: 65,
        countInStock: 5,
        brand: 'American Eagle',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        _id: '6',
        name: 'American Eagle Dark Blue Jeans',
        category: 'Pants',
        image: '/images/jeans2.jpeg',
        price: 139,
        countInStock: 12,
        brand: 'American Eagle',
        rating: 4.5,
        numReviews: 15,
        description: 'high quality product',
      },
    ],
  };
  export default data;