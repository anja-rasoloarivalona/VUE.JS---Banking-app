const state = {
  expensesList: [
    {
      name: 'Food and Drinks',
      iconName: 'utensils',
      color: '#E62E3D',
      subcategory: [
        {
          name: 'Bar, coffee',
          iconName: 'glass-martini-alt'
        },
        {
          name: 'Fast Food',
          iconName: 'hamburger'
        },
        {
          name: 'Groceries',
          iconName: 'shopping-bag'
        },
        {
          name: 'Restaurant',
          iconName: 'store'
        }
      ]
    },
    {
      name: 'Shopping',
      iconName: 'shopping-cart',
      color: '#64B5F6',
      subcategory: [
        {
          name: "Baby's needs",
          iconName: 'baby-carriage'
        },
        {
          name: 'Clothes & Shoes',
          iconName: 'tshirt'
        },
        {
          name: 'Electronic & accessories',
          iconName: 'laptop'
        },
        {
          name: 'Flowers',
          iconName: 'seedling'
        },
        {
          name: 'Gift',
          iconName: 'gift'
        },
        {
          name: 'Health and Beauty',
          iconName: 'dove'
        }
      ]
    },
    {
      name: 'Housing',
      iconName: 'home',
      color: '#EE9E1E',
      subcategory: [
        {
          name: 'Home Insurance',
          iconName: 'house-damage'
        },
        {
          name: 'Maintenance, repairs',
          iconName: 'hammer'
        },
        {
          name: 'Rent',
          iconName: 'key'
        },
        {
          name: 'Mortgage Loan',
          iconName: 'money-check-alt'
        },
        {
          name: 'Energy, public services',
          iconName: 'lightbulb'
        },
        {
          name: 'Hotel room, Airbnb',
          iconName: 'hotel'
        },
        {
          name: 'Equipment, furniture',
          iconName: 'couch'
        }
      ]
    },
    {
      name: 'Transport',
      iconName: 'bus-alt',
      color: '#B0BFC6',
      subcategory: [
        {
          name: 'Public transportation',
          iconName: 'subway'
        },
        {
          name: 'Taxi',
          iconName: 'taxi'
        },
        {
          name: 'Plane',
          iconName: 'plane'
        },
        {
          name: 'Train',
          iconName: 'train'
        },
        {
          name: 'Car rental',
          iconName: 'house-damage'
        }
      ]
    },
    {
      name: 'Vehicle',
      iconName: 'car-alt',
      color: '#CD9713',
      subcategory: [
        {
          name: 'Vehicle insurance',
          iconName: 'file-invoice-dollar'
        },
        {
          name: 'Fuel',
          iconName: 'gas-pump'
        },
        {
          name: 'Vehicle maintenance',
          iconName: 'wrench'
        },
        {
          name: 'Credit lease',
          iconName: 'coins'
        }
      ]
    },
    {
      name: 'Leisure',
      iconName: 'users',
      color: '#AB46BC',
      subcategory: [
        {
          name: 'Alcohol, tobacco',
          iconName: 'cocktail'
        },
        {
          name: 'Culture',
          iconName: 'book'
        },
        {
          name: 'Sporting events',
          iconName: 'running'
        },
        {
          name: 'Shows',
          iconName: 'file-invoice-dollar'
        },
        {
          name: 'Donations',
          iconName: 'hand-holding-usd'
        },
        {
          name: 'Gymn',
          iconName: 'dumbbell'
        }
      ]
    },
    {
      name: 'Multimedia',
      iconName: 'tv',
      color: '#2346A2',
      subcategory: [
        {
          name: 'Internet',
          iconName: 'wifi'
        },
        {
          name: 'Mobile',
          iconName: 'mobile-alt'
        },
        {
          name: 'Movie Streaming',
          iconName: 'tv'
        },
        {
          name: 'Music Streaming',
          iconName: 'music'
        }
      ]
    },
    {
      name: 'Investment',
      iconName: 'chart-line',
      color: '#E73F7A',
      subcategory: [
        {
          name: 'Education',
          iconName: 'user-graduate'
        },
        {
          name: 'Realt Estate',
          iconName: 'building'
        },
        {
          name: 'Vehicles, personal belongings',
          iconName: 'truck-pickup'
        },
        {
          name: 'Financial investment',
          iconName: 'chart-bar'
        }
      ]
    },
    {
      name: 'Health',
      iconName: 'first-aid',
      color: '#6BDD16',
      subcategory: [
        {
          name: 'Health insurance',
          iconName: 'file-medical'
        },
        {
          name: 'Medicines',
          iconName: 'prescription-bottle'
        },
        {
          name: 'Consulting fees',
          iconName: 'user-md'
        }
      ]
    }
  ]
}

const getters = {
  expensesList: state => {
    return state.expensesList
  }
}

export default {
  state,
  getters
}
