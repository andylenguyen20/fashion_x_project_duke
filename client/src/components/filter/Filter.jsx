import * as React from "react"
import "./Filter.css"
import {
  Button, 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Card, CardHeader, CardBody,
  FormGroup, Input, Modal, ModalBody, ModalFooter
} from 'reactstrap';

import category_data from './category_data.json';

class Filter extends React.Component {
  constructor(props) {
    super(props)
    var user = localStorage.getItem("token");
    console.log(user);
    this.toggleCategory = this.toggleCategory.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.Categories = this.Categories.bind(this)
    this.CategoryItems = this.CategoryItems.bind(this)
    this.state = {
      showCategories: true,
      cat: category_data,
      dropdownOpen: false
    }
  }

  toggleCategory() {
    this.setState({
      showCategories: !this.state.showCategories
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
    console.log(this.state.dropdownOpen);
  }

  CategoryItems(props) {
    var categoryItems = []
    for (var i = 0; i < props.values.length ; i++) {
      categoryItems.push(
        (<div className = 'filter-category'><Input type="checkbox" name="radio2" />{' '} {props.values[i]} </div>)
      );
    } return (<CardBody className = 'filter-category'> <FormGroup check> {categoryItems}  </FormGroup></CardBody>);
  }

  Categories(props) {
    var categories = [];
    for (var k in props.data) {
      categories.push(
        <div className = 'filter-align'>
          <Card>
            <CardHeader className = 'filter-title'> {k} </CardHeader>
            <this.CategoryItems values={props.data[k]}/>   
          </Card>
        </div>
      );
    } return (<div> {categories} </div>);
  }

  render() {
    return (
      <div>
        

        <div className = "web-filter">
          {this.state.showCategories && 
            <this.Categories data={this.state.cat} visible={false}/>
          }
        
        
        </div>


    


      </div>
    )
  }  
}
export default Filter