import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { productData } from "./data";

const App = () => {
  const [loading, setLoading] = useState(productData.loading);
  const [products, setProducts] = useState(productData.pproducts);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
  }, [sort]);

  const handleFilterChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();
    setFilter(inputValue);
    setCurrentPage(1);

    const filteredProducts = productData.pproducts.filter((product) =>
      product.title.toLowerCase().includes(inputValue) ||
      product.description.toLowerCase().includes(inputValue)
    );

    setProducts(filteredProducts);
  };

  const handleSortChange = () => {
    setSort(prevSort => prevSort === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <AppContainer>
      <Header>
        <Title>Anime Merchandise</Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search Products"
            value={filter}
            onChange={handleFilterChange}
          />
          <SearchIcon />
        </SearchContainer>
        <SortButton onClick={handleSortChange}>
          {sort === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </SortButton>
      </Header>

      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <>
          <ProductList>
            {currentProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.title} />
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>${product.price}</ProductPrice>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductList>
          <Pagination>
            {pageNumbers.map((number) => (
              <PageNumber
                key={number}
                onClick={() => handlePageChange(number)}
                active={currentPage === number}
              >
                {number}
              </PageNumber>
            ))}
          </Pagination>
        </>
      )}
    </AppContainer>
  );
};

// Styled components
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    margin-bottom: 15px;
    text-align: center;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 25px;
  padding: 5px 15px;
  flex-grow: 1;
  max-width: 400px;
  margin: 0 20px;

  @media (max-width: 768px) {
    margin: 15px 0;
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #666;
`;

const SortButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #4a90e2;
  margin: 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const PageNumber = styled.button`
  background-color: ${props => props.active ? '#4a90e2' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#357abd' : '#e0e0e0'};
  }
`;

const LoadingMessage = styled.h2`
  text-align: center;
  color: #666;
`;

export default App;