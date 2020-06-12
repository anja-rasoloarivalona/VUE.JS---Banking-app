const state = {
  expensesList: [
    {
      name: 'Food & Drinks',
      i18: 'food&Drinks',
      iconName: 'utensils',
      color: '#E62E3D',
      subcategory: [
        {
          name: 'Bar & Coffee',
          i18: 'bar&Coffee',
          iconName: 'glass-martini-alt'
        },
        {
          name: 'Fast Food',
          i18: 'fastFood',
          iconName: 'hamburger'
        },
        {
          name: 'Groceries',
          i18: 'groceries',
          iconName: 'shopping-bag'
        },
        {
          name: 'Restaurant',
          i18: 'restaurant',
          iconName: 'store'
        }
      ]
    },
    {
      name: 'Shopping',
      i18: 'shopping',
      iconName: 'shopping-cart',
      color: '#64B5F6',
      subcategory: [
        {
          name: 'Baby & Children',
          i18: 'baby&Children',
          iconName: 'baby-carriage'
        },
        {
          name: 'Clothes & Shoes',
          i18: 'clothes&Shoes',
          iconName: 'tshirt'
        },
        {
          name: 'Electronic & accessories',
          i18: 'electronic&Accessories',
          iconName: 'laptop'
        },
        {
          name: 'Flowers & Garden',
          i18: 'flowers&Garden',
          iconName: 'seedling'
        },
        {
          name: 'Gift',
          i18: 'gift',
          iconName: 'gift'
        },
        {
          name: 'Health & Beauty',
          i18: 'health&Beauty',
          iconName: 'dove'
        }
      ]
    },
    {
      name: 'Housing',
      i18: 'housing',
      iconName: 'home',
      color: '#EE9E1E',
      subcategory: [
        {
          name: 'Home Insurance',
          i18: 'homeInsurance',
          iconName: 'house-damage'
        },
        {
          name: 'Maintenance & Repairs',
          i18: 'maintenance&Repairs',
          iconName: 'hammer'
        },
        {
          name: 'Rent',
          i18: 'rent',
          iconName: 'key'
        },
        {
          name: 'Mortgage Loan',
          i18: 'mortgageLoan',
          iconName: 'money-check-alt'
        },
        {
          name: 'Energy & Public services',
          i18: 'energy&PublicServices',
          iconName: 'lightbulb'
        },
        {
          name: 'Hotel & Airbnb',
          i18: 'hotel&Airbnb',
          iconName: 'hotel'
        },
        {
          name: 'Furniture & Equipment',
          i18: 'furniture&Equipment',
          iconName: 'couch'
        }
      ]
    },
    {
      name: 'Transport',
      i18: 'transport',
      iconName: 'bus-alt',
      color: '#B0BFC6',
      subcategory: [
        {
          name: 'Public transportation',
          i18: 'publicTransportation',
          iconName: 'subway'
        },
        {
          name: 'Taxi',
          i18: 'taxi',
          iconName: 'taxi'
        },
        {
          name: 'Plane',
          i18: 'plane',
          iconName: 'plane'
        },
        {
          name: 'Train',
          i18: 'train',
          iconName: 'train'
        },
        {
          name: 'Car rental',
          i18: 'carRental',
          iconName: 'house-damage'
        }
      ]
    },
    {
      name: 'Vehicle',
      i18: 'vehicle',
      iconName: 'car-alt',
      color: '#CD9713',
      subcategory: [
        {
          name: 'Vehicle insurance',
          i18: 'vehicleInsurance',
          iconName: 'file-invoice-dollar'
        },
        {
          name: 'Fuel',
          i18: 'fuel',
          iconName: 'gas-pump'
        },
        {
          name: 'Vehicle maintenance',
          i18: 'vehicleMaintenance',
          iconName: 'wrench'
        },
        {
          name: 'Credit lease',
          i18: 'crediLease',
          iconName: 'coins'
        }
      ]
    },
    {
      name: 'Leisure',
      i18: 'leisure',
      iconName: 'users',
      color: '#AB46BC',
      subcategory: [
        {
          name: 'Alcohol & Tobacco',
          i18: 'alcohol&Tobacco',
          iconName: 'cocktail'
        },
        {
          name: 'Culture',
          i18: 'culture',
          iconName: 'book'
        },
        {
          name: 'Sporting events',
          i18: 'sportingEvents',
          iconName: 'running'
        },
        {
          name: 'Shows',
          i18: 'shows',
          iconName: 'file-invoice-dollar'
        },
        {
          name: 'Donations',
          i18: 'donations',
          iconName: 'hand-holding-usd'
        },
        {
          name: 'Gymn',
          i18: 'gymn',
          iconName: 'dumbbell'
        }
      ]
    },
    {
      name: 'Multimedia',
      i18: 'multimedia',
      iconName: 'tv',
      color: '#2346A2',
      subcategory: [
        {
          name: 'Internet',
          i18: 'internet',
          iconName: 'wifi'
        },
        {
          name: 'Mobile Phone',
          i18: 'mobilePhone',
          iconName: 'mobile-alt'
        },
        {
          name: 'Movie Streaming',
          i18: 'movieStreaming',
          iconName: 'tv'
        },
        {
          name: 'Music Streaming',
          i18: 'musicStreaming',
          iconName: 'music'
        }
      ]
    },
    {
      name: 'Investment',
      i18: 'investment',
      iconName: 'chart-line',
      color: '#E73F7A',
      subcategory: [
        {
          name: 'Education',
          i18: 'education',
          iconName: 'user-graduate'
        },
        {
          name: 'Real Estate',
          i18: 'realEstate',
          iconName: 'building'
        },
        {
          name: 'Vehicles & Personal belongings',
          i18: 'vehicles&PersonnalBelongings',
          iconName: 'truck-pickup'
        },
        {
          name: 'Financial investment',
          i18: 'financialInvestment',
          iconName: 'chart-bar'
        }
      ]
    },
    {
      name: 'Health',
      i18: 'health',
      iconName: 'first-aid',
      color: '#6BDD16',
      subcategory: [
        {
          name: 'Health insurance',
          i18: 'healthInsurance',
          iconName: 'file-medical'
        },
        {
          name: 'Medicines',
          i18: 'medicines',
          iconName: 'prescription-bottle'
        },
        {
          name: 'Consulting fees',
          i18: 'consultingFees',
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
