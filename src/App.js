import React, { Component, useInsertionEffect } from "react"
import { Container, Row, Col } from "reactstrap";
import CategoryList from "./CategoryList";
import Navi from './Navi';
import ProductList from "./ProductList";

export default class App extends Component { /*class componente cevirdik*/

  state = { currentCategory: "", products:[] }

  componentDidMount(){
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);

  }

  getProducts=categoryId=>{

    let url = "http://localhost:3000/products";
    if(categoryId){
        url+="?categoryId="+categoryId;
    }
    fetch(url)
    .then(response=>response.json())
    .then(data=>this.setState({products:data}));
  }


  render() {
    let productInfo = { title: "ProductList", /*baskaBisey:"bisey"*/ }
    let categoryInfo = { title: "CategoryList" }

    return (
      <div>

        <Container>
          <Row>
            <Navi />
          </Row>
          <Row>
            <Col xs="3">
              {/* categoryList'e bir tane event yolladik, fonksiyon yolladk props ile */}
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo} />
            </Col>
            <Col xs="9">
              <ProductList 
              products = {this.state.products}
              currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={productInfo} 
              />
            </Col>

          </Row>
        </Container>



      </div>
    );
  }
}



