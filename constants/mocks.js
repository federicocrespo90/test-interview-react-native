const categories = [
  {
    id: 'a',
    slug: 'CATEGORY A',
    imageNormal: require('../assets/icons/a-normal.png'),
    imageSelected: require('../assets/icons/a-selected.png'),
    imageNormalSmall: require('../assets/icons/a-normal-small.png'),
    imageSelectedSmall: require('../assets/icons/a-selected-small.png'),
  },
  {
    id: 'b',
    slug: 'CATEGORY B',
    imageNormal: require('../assets/icons/b-normal.png'),
    imageSelected: require('../assets/icons/b-selected.png'),
    imageNormalSmall: require('../assets/icons/b-normal-small.png'),
    imageSelectedSmall: require('../assets/icons/b-selected-small.png'),
  },
  {
    id: 'c',
    slug: 'CATEGORY C',
    imageNormal: require('../assets/icons/c-normal.png'),
    imageSelected: require('../assets/icons/c-selected.png'),
    imageNormalSmall: require('../assets/icons/c-normal-small.png'),
    imageSelectedSmall: require('../assets/icons/c-selected-small.png'),
  },
  {
    id: 'all',
    slug: 'ALL',
    imageNormal: require('../assets/icons/a-normal.png'),
    imageSelected: require('../assets/icons/a-selected.png'),
    imageNormalSmall: require('../assets/icons/a-normal-small.png'),
    imageSelectedSmall: require('../assets/icons/a-selected-small.png'),
  }
];

const filters = [
  { id: 'all', slug: 'ALL' },
  { id: 'filter1', slug: 'FILTER1' },
  { id: 'filter2', slug: 'FILTER2' },
  { id: 'filter3', slug: 'FILTER3' },
  { id: 'filter4', slug: 'FILTER4' },
];

const recentValues = [
  { id:'1', category: 'a', title: 'Value 1', value: ' 001', active: false, filter: 'filter1' },
  { id:'2', category: 'b', title: 'Value 2', value: '002', active: false, filter: 'filter2' },
  { id:'3', category: 'c', title: 'Value 3', value: '003', active: false, filter: 'filter2' },
  { id:'4', category: 'a', title: 'Value 4', value: '004', active: false, filter: 'filter3' },
  { id:'5', category: 'b', title: 'Value 5', value: '005', active: false, filter: 'filter4' },
];

export {
  categories,
  filters,
  recentValues
};