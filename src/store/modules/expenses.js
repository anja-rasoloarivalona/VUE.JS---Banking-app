const state = {
  expensesList: {
    'Food & Drinks': {
      i18: 'food&Drinks',
      iconName: 'utensils',
      color: '#059782',
      subcategory: {
        'Bar & Coffee': {
          i18: 'bar&Coffee',
          iconName: 'glass-martini-alt'
        },
        'Fast Food': {
          i18: 'fastFood',
          iconName: 'hamburger'
        },
        Groceries: {
          i18: 'groceries',
          iconName: 'shopping-bag'
        },
        Restaurant: {
          i18: 'restaurant',
          iconName: 'store'
        }
      }
    },
    Shopping: {
      i18: 'shopping',
      iconName: 'shopping-cart',
      color: '#64B5F6',
      subcategory: {
        'Baby & Children': {
          i18: 'baby&Children',
          iconName: 'baby-carriage'
        },
        'Clothes & Shoes': {
          i18: 'clothes&Shoes',
          iconName: 'tshirt'
        },
        'Electronic & accessories': {
          i18: 'electronic&Accessories',
          iconName: 'laptop'
        },
        'Flowers & Garden': {
          i18: 'flowers&Garden',
          iconName: 'seedling'
        },
        Gift: {
          i18: 'gift',
          iconName: 'gift'
        },
        'Health & Beauty': {
          i18: 'health&Beauty',
          iconName: 'dove'
        }
      }
    },
    Housing: {
      i18: 'housing',
      iconName: 'home',
      color: '#3144af',
      subcategory: {
        'Home Insurance': {
          i18: 'homeInsurance',
          iconName: 'house-damage'
        },
        'Maintenance & Repairs': {
          i18: 'maintenance&Repairs',
          iconName: 'hammer'
        },
        Rent: {
          i18: 'rent',
          iconName: 'key'
        },
        'Mortgage Loan': {
          i18: 'mortgageLoan',
          iconName: 'money-check-alt'
        },
        'Energy & Public services': {
          i18: 'energy&PublicServices',
          iconName: 'lightbulb'
        },
        'Hotel & Airbnb': {
          i18: 'hotel&Airbnb',
          iconName: 'hotel'
        },
        'Furniture & Equipment': {
          i18: 'furniture&Equipment',
          iconName: 'couch'
        }

      }
    },
    Transport: {
      i18: 'transport',
      iconName: 'bus-alt',
      color: '#B0BFC6',
      subcategory: {
        'Public transportation': {
          i18: 'publicTransportation',
          iconName: 'subway'
        },
        Taxi: {
          i18: 'taxi',
          iconName: 'taxi'
        },
        Plane: {
          i18: 'plane',
          iconName: 'plane'
        },
        Train: {
          i18: 'train',
          iconName: 'train'
        },
        'Car rental': {
          i18: 'carRental',
          iconName: 'house-damage'
        }
      }
    },
    Vehicle: {
      i18: 'vehicle',
      iconName: 'car-alt',
      color: '#CD9713',
      subcategory: {
        'Vehicle insurance': {
          i18: 'vehicleInsurance',
          iconName: 'file-invoice-dollar'
        },
        Fuel: {
          i18: 'fuel',
          iconName: 'gas-pump'
        },
        'Vehicle maintenance': {
          i18: 'vehicleMaintenance',
          iconName: 'wrench'
        },
        'Credit lease': {
          i18: 'crediLease',
          iconName: 'coins'
        }
      }
    },
    Leisure: {
      i18: 'leisure',
      iconName: 'users',
      color: '#99a1d7',
      subcategory: {
        'Alcohol & Tobacco': {
          i18: 'alcohol&Tobacco',
          iconName: 'cocktail'
        },
        Culture: {
          i18: 'culture',
          iconName: 'book'
        },
        'Sporting events': {
          i18: 'sportingEvents',
          iconName: 'running'
        },
        Shows: {
          i18: 'shows',
          iconName: 'file-invoice-dollar'
        },
        Donations: {
          i18: 'donations',
          iconName: 'hand-holding-usd'
        },
        Gymn: {
          i18: 'gymn',
          iconName: 'dumbbell'
        }
      }
    },
    Multimedia: {
      i18: 'multimedia',
      iconName: 'tv',
      color: '#2346A2',
      subcategory: {
        Internet: {
          i18: 'internet',
          iconName: 'wifi'
        },
        'Mobile Phone': {
          i18: 'mobilePhone',
          iconName: 'mobile-alt'
        },
        'Movie Streaming': {
          i18: 'movieStreaming',
          iconName: 'tv'
        },
        'Music Streaming': {
          i18: 'musicStreaming',
          iconName: 'music'
        }
      }
    },
    Investment: {
      i18: 'investment',
      iconName: 'chart-line',
      color: '#E73F7A',
      subcategory: {
        Education: {
          i18: 'education',
          iconName: 'user-graduate'
        },
        'Real Estate': {
          i18: 'realEstate',
          iconName: 'building'
        },
        'Vehicles & Personal belongings': {
          i18: 'vehicles&PersonnalBelongings',
          iconName: 'truck-pickup'
        },
        'Financial investment': {
          i18: 'financialInvestment',
          iconName: 'chart-bar'
        }
      }
    },
    Health: {
      i18: 'health',
      iconName: 'first-aid',
      color: '#6BDD16',
      subcategory: {
        'Health insurance': {
          i18: 'healthInsurance',
          iconName: 'file-medical'
        },
        Medicines: {
          i18: 'medicines',
          iconName: 'prescription-bottle'
        },
        'Consulting fees': {
          i18: 'consultingFees',
          iconName: 'user-md'
        }
      }
    }
  }
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
