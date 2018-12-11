import * as React from "react"
import "./mobile.css"
import {
  Button, 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Card, CardHeader, CardBody,
  FormGroup, Input, Modal, ModalBody, ModalFooter
} from 'reactstrap';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


class Filter extends React.Component {
  constructor(props) {
    super(props)
    var user = localStorage.getItem("token");
    console.log(user);
    this.toggle = this.toggle.bind(this);
    this.toggleCategory = this.toggleCategory.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.changeSliderValue = this.changeSliderValue.bind(this)
    this.state = {
      dropdownOpen: false,
      modal: false,
      maxPrice: 50
    }
  }

  changeSliderValue(value){
      this.setState({
        maxPrice: value
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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


  render() {
    return (
      <div>
        <div className = "d-none" id = "mobile-filter">
          <Button onClick={this.toggle} className = "filter-button"> Filter For Your Body </Button>
        </div>


        <Modal id= "FilterModal" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <div>
                Price: Under ${this.state.maxPrice}
                <Slider step={5} defaultValue={50} onChange={this.changeSliderValue}/>
            </div>
            
          </ModalBody>
          <ModalFooter>
            <Button className = "apply-changes-button" onClick={this.toggle}>Apply Changes</Button>
          </ModalFooter>
        </Modal>


      </div>
    )
  }  
}
export default Filter