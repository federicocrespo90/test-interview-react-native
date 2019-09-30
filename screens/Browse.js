import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView } from 'react-native'
import { Card, Button, Block, Input, Text } from '../components';
import { theme, mocks } from '../constants';
import Bell from '../assets/icons/bell.png';
import Logo from '../assets/logo-small.png';
import Help from '../assets/icons/help.png';
import YourPortfolio from '../assets/your-portfolio.png';
import RecentValues from '../assets/recent-values.png';
import ANormalSmall from '../assets/icons/a-normal-small.png';
import ASelectedSmall from '../assets/icons/a-selected-small.png';
import BNormalSmall from '../assets/icons/b-normal-small.png';
import BSelectedSmall from '../assets/icons/b-selected-small.png';
import CNormalSmall from '../assets/icons/c-normal-small.png';
import CSelectedSmall from '../assets/icons/c-selected-small.png';
import SearchSelected from '../assets/icons/search-selected.png';
import SearchNormal from '../assets/icons/search-normal.png';

const { width } = Dimensions.get('window');

class Browse extends Component {
  state = {
    active: 'Products',
    recentValues: [],
    showSearch: false,
    category: 'all',
    categoryIcon: mocks.categories[0].imageNormal,
    categories: [],
    filter: 'all',
    filters: [],
    filterResults: [],
    searchResults: []
  };

  componentDidMount = () => {
    this.setState({
      recentValues: this.props.recentValues,
      categories: this.props.categories,
      filters: this.props.filters,
      filterResults: this.props.recentValues,
      searchResults: this.props.recentValues
    });
  }

  handleSearchInput = () => {
    this.setState({ showSearch: !this.state.showSearch });
  }

  handleTabStyles = (element, type, block) => {
    if (block) {
      switch(type) {

        case 'category':
        return (this.state.category === element) &&
        styles.tabSelected
        || (this.state.category !== element) &&
        styles.tabBlock;
  
        case 'filter':
        return (this.state.filter === element) &&
        styles.tabSelected
        || (this.state.filter !== element) &&
        styles.tabBlock;
      }
    } else {
      switch(type) {

        case 'category':
        return (this.state.category === element) &&
        styles.tabSelected
        || (this.state.category !== element) &&
        styles.tabText;
  
        case 'filter':
        return (this.state.filter === element) &&
        styles.tabSelected
        || (this.state.filter !== element) &&
        styles.tabText;
      }
    }
  }

  handleCurrentTabCategory = category => {
    this.state.categories.map(item => {
      if (category === item.id) {
        this.setState({
          category: category,
          categoryIcon: item.imageNormal
        });
      }
    });
  }

  setFilters = filter => {
    this.state.filters.map(item => {
      if (filter === item.id) {
        this.setState({
          filter: filter
        });
      }
    });
  }

  handleCurrentTabFilter = filter => {
    this.setFilters(filter);
    let filterString = filter.trim().toLowerCase();
    let filterResults = this.state.recentValues;

    if (filterString.length > 0 && filter !== 'all') {
      filterResults = filterResults.filter(item => {
        return item.filter.toLowerCase().match( filterString );
      });
    }
    this.setState({
      filterResults: filterResults,
      searchResults: filterResults
    });
  }

  cleanActives = () => {
    this.setState(state => {
      const recentValues = state.recentValues.map((item) => {
          return item.active = false ;
      });
      return (
        recentValues
      );
    });
  }

  handleList = index => {
    this.cleanActives();
    this.setState(state => {
      const recentValues = state.recentValues.map((item, j) => {
        if (j === index) {
          return item.active = true ;
        } else {
          return item;
        }
      });
      return (
        recentValues
      );
    });
  }

  handleListStyles = (type, index) => {
    switch(type) {

      case 'list':
      return (this.state.recentValues[index].active) &&
      styles.buttonListSelected
      || (!this.state.recentValues[index].active) &&
      styles.buttonList;

      case 'option':
      return (this.state.recentValues[index].active) &&
      styles.buttonOptionSelected
      || (!this.state.recentValues[index].active) &&
      styles.buttonOption

      case 'value':
      return (this.state.recentValues[index].active) &&
      styles.buttonValueSelected
      || (!this.state.recentValues[index].active) &&
      styles.buttonValue;
    }
  }

  handleCategoryImages = (category, index) => {
    const isActive = this.state.recentValues[index].active;
    let result = {};
    switch(category) {
      case 'a':
      result = isActive ? ASelectedSmall : ANormalSmall;
      break;
      case 'b':
      result = isActive ? BSelectedSmall : BNormalSmall;
      break;
      case 'c':
      result = isActive ? CSelectedSmall :CNormalSmall;
      break;
    }
    return result;
  }

  handleSearchInputChange = text => {
    /** 
    * @Match results
    * Displays matched results
    */
    let searchResults = this.state.filterResults;
    let searchString = text ? text.trim().toLowerCase() : null;
    if (searchString && searchString.length > 0) {
      searchResults = searchResults.filter(item => {
        return item.title.toLowerCase().match( searchString );
      });
    }
    this.setState({
      searchResults: searchResults
    });
  }

  render() {
    const { navigation } = this.props;
    const { categories, categoryIcon, filters, showSearch, searchResults } = this.state;

    return (
      <Block>
        <Block flex={false} row center middle space="between" style={styles.header}>
          <Image
              style={styles.icons}
              source={Help}
          />
          <Image
              style={{marginRight: '4%'}}
              source={Logo}
          />
          <Button onPress={() => navigation.navigate('Settings')}>
            <Image
              source={Bell}
            />
          </Button>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >
        <Card shadow styles={styles.card}>
          <Block flex={false} row>
            <Image
              source={YourPortfolio}
            />
          </Block>
          <Block flex={false} row style={styles.mainValueContent}>
            <Image
              style={{marginTop: '3%'}}
              source={categoryIcon}
            />
            <Text size={72} style={styles.mainValue}>
              3,700.25
            </Text>
          </Block>
          <Block flex={false} center middle row style={styles.tabBlock}>
            { categories !== [] &&
              categories.map((item) => (
                <Button key={item.id} onPress={() => this.handleCurrentTabCategory(item.id)}
                style={ this.handleTabStyles(item.id, 'category', true) }>
                  <Text center size={12}
                    style={ this.handleTabStyles(item.id, 'category', false) }>
                    { item.slug + '      ' }
                  </Text>
                </Button>
            ))}
          </Block>
        </Card>
        <Card shadow styles={styles.card}>
          { showSearch && 
          <Block flex={false} row>
            <Input
              onChangeText={text => this.handleSearchInputChange(text)}
              label="Search Value..."
              style={styles.input}
            />
            <Image
              style={styles.searchSelected}
              source={SearchSelected}
            />
          </Block>
          || ( !showSearch && 
          <Block flex={false} row>
            <Image
              style={styles.recentValues}
              source={RecentValues}
            />
            <Button style={styles.searchNormal} onPress={() =>  this.handleSearchInput()}>
              <Image
                source={SearchNormal}
              />
            </Button>
          </Block>
          )}
          <Block flex={false} center middle row style={styles.tabBlock}>
            { filters !== [] &&
              filters.map((item)=> (
                <Button key={item.id} onPress={() => this.handleCurrentTabFilter(item.id)}
                style={this.handleTabStyles(item.id, 'filter', true) }>
                  <Text center size={12} 
                    style={ this.handleTabStyles(item.id, 'filter', false) }>
                    { item.slug + '      ' }
                  </Text>
                </Button>
              ))}
          </Block>
        </Card>
          {searchResults !== [] && searchResults.map((item, index) => (
            <Card key={item.id} shadow style={styles.card} style={this.handleListStyles('list', index)}>
              <Block key={item.id} flex={false} row style={this.handleListStyles('list', index)}>
                <Button onPress={() => this.handleList(index)}>
                  <Block flex={false} row style={styles.buttonContent}>
                    <Image
                      style={styles.buttonImage}
                      source={this.handleCategoryImages(item.category, index)}
                    />
                    <Text size={18} style={this.handleListStyles('option', index)}>
                      { item.title && item.title }
                    </Text>
                    <Text size={18} style={this.handleListStyles('value', index)}>
                      { item.value && item.value }
                    </Text>
                  </Block>
                </Button>
              </Block>
            </Card>
          ))}
        </ScrollView>
      </Block>
    )
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  recentValues: mocks.recentValues,
  categories: mocks.categories,
  filters: mocks.filters,
}

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  tabs: {
    borderBottomColor: theme.colors.grayLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  card: {
  },
  mainValueContent: {
  },
  mainValue: {
    fontFamily: theme.font.family,
    color: theme.colors.blue,
  },
  tabBlock: {
    backgroundColor: theme.colors.grayLight,
    height: 40,
    borderRadius: 30,
  },
  tabText: {
    color: theme.colors.blue,
    justifyContent: 'space-between'
  },
  tabSelected: {
    color: theme.colors.white,
    backgroundColor: theme.colors.blue,
    borderRadius: 30,
    paddingLeft: 6,
    paddingRight: 6
  },
  searchNormal: {
    marginLeft: '50%'
  },
  searchSelected: {
    marginLeft: '63%',
    marginTop: '15%'
  },  
  recentValues: {
    marginTop: '6%'
  },
  input: {
    borderRadius: 5,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '320%'
  },
  buttonList: {
    borderRadius: 0,
    width: '100%',
  },
  buttonListSelected: {
    backgroundColor: theme.colors.blue,
    borderRadius: 0,
    width: '100%',
  },
  buttonImage: {
    marginLeft: '3%',
    marginBottom: '18%'
  },
  buttonOption: {
    fontFamily: theme.font.family,
    color: theme.colors.grayIntense,
    marginLeft: '2%',
    marginRight: '52%',
    marginTop: '1%'
  },
  buttonValue: {
    fontFamily: theme.font.family,
    paddingRight: '1%',
    color: theme.colors.grayIntense,
    marginTop: '1%'
  },
  buttonOptionSelected: {
    fontFamily: theme.font.family,
    color: theme.colors.white,
    marginLeft: '2%',
    marginRight: '52%',
    marginTop: '1%'
  },
  buttonValueSelected: {
    fontFamily: theme.font.family,
    paddingRight: '1%',
    color: theme.colors.white,
    marginTop: '1%'
  },
  buttonContent: {
    marginTop: '17%'
  }
})
