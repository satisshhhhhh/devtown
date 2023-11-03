import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "./search-icon-light.png";
import { productData } from "./data";

const App = () => {
  const [loading, setLoading] = useState(productData.loading);
  const [pproducts, setPproducts] = useState(productData.pproducts);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    if (sort === "asc") {
      setPproducts(pproducts.sort((a, b) => b.price - a.price));
    } else {
      setPproducts(pproducts.sort((a, b) => a.price - b.price));
    }
  }, [sort]);

  // const handleFilterChange = (e) => {
  //   const inputValue = e.target.value;
  //   setFilter(inputValue);
  // };

  const handleFilterChange = (e) => {
    const inputValue = e.target.value;
    setFilter(inputValue);

    // Filter products based on the input value as the user types
    const filteredProducts = productData.pproducts.filter((product) => {
      const words = product.title.split(" ");
      const match = words.some((word) =>
        word.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      return match;
    });

    // Update the filtered products in the state
    setPproducts(filteredProducts);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredProducts = pproducts.filter((product) => {
    const words = product.title.split(" ");
    const match = words.some((word) =>
      word.toLowerCase().startsWith(filter.toLowerCase())
    );
    return match;
  });

  const Container = styled.div`
    height: 60px;
    background-color: black;
  `;

  const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: center;
  `;

  const SearchContainer = styled.div`
    display: flex;
    justify-cotent: center;
    align-items: center;
    border: 1px solid lightgrey;
    color: white;
    padding: 5px;
    width: 60%;
  `;

  const Input = styled.input`
    border: none;
    background: transparent;
    color: white;
    pading: 15px;
    width: 94%;
    font-size: 23px;
  `;

  const ProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 25px;
    margin: 32px 0;
  `;

  // const Product = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   background-color: #f9f9f9;
  //   padding: 16px;
  //   border-radius: 8px;
  //   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  //   transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  //   &:hover {
  //     box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
  //       0 10px 10px rgba(0, 0, 0, 0.22);
  //   }
  // `;

  const Product = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    max-width: 300px;
    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  `;

  const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
  `;

  // const ProductImage = styled.img`
  //   width: 100%;
  //   height: auto;
  //   object-fit: cover;
  // `;

  const ProductImageContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: 1fr;
    gap: 16px;
  `;

  const ProductImage = styled.img`
    width: 80%;
    height: 90%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
  `;

  const ProductTitle = styled.h2`
    font-size: 24px;
    margin: 16px 0;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const ProductDescription = styled.p`
    font-size: 16px;
    margin: 8px 0;
  `;

  const ProductPrice = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin: 8px 0;
  `;

  return (
    <>
      <div className="App">
        <Container>
          <Wrapper>
            <SearchContainer>
              <Input
                type="text"
                placeholder="Search Products"
                value={filter}
                onChange={handleFilterChange}
              />
              <img src={SearchIcon} style={{ width: "30px" }} />
            </SearchContainer>
            <select value={sort} onChange={handleSortChange}>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </Wrapper>
        </Container>
        <h1 style={{ marginTop: "15px", textAlign: "center" }}>
          The below products are coming from data.js
        </h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <ProductList>
            {filteredProducts.map((product) => (
              <Product key={product.id}>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductImageContainer>
                  <ProductImage src={product.image} />
                </ProductImageContainer>
                <ProductInfo>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>Price: {product.price}</ProductPrice>
                </ProductInfo>
              </Product>
            ))}
          </ProductList>
        )}
      </div>
    </>
  );
};

export default App;
