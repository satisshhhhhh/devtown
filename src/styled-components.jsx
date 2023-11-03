import styled from "styled-components";

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 16px;
  margin: 32px 0;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const ProductTitle = styled.h2`
  font-size: 24px;
  margin: 16px 0;
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  margin: 8px 0;
`;

export const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
`;
