// import component
import React, { Component } from 'react';
import { View,Text } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

 
class MultiSelectExample extends Component {
 



  state = {
    selectedItems : []
  };
 

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
 
  render() {
    const { selectedItems } = this.state;
    const items = [{
        id: '1,',
        name: 'Clinical'
      }, {
        id: '2,',
        name: 'Bio-Chemical'
      }, {
        id: '3,',
        name: 'Cytogenetic'
      }, {
        id: '4,',
        name: 'Other'
      }
    ]; 
    return (
      <View style={{ flex: 1,margin :50 }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Basis of diagnosis"
          searchInputPlaceholderText="Basis of diagnosis Search"
          onChangeInput={ (text)=> console.warn(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#e1eded"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#48d22b"
          submitButtonText="select"
        />
       
        <View>
        <Text style = {{height : 120,width:'100%'}}>{this.state.selectedItems}</Text>
        </View>
      </View>
    );
  }
}
export default MultiSelectExample