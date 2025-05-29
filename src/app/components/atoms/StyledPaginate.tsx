import styled from "@emotion/styled";
import ReactPaginate from "react-paginate";

export const StyledPaginate = styled(ReactPaginate)`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  gap: 4px;

  li {
    margin: 0;
    background-color: #002147;

    display: flex;
  }

  li.hidden {
    display: none;
  }

  li a {
    padding: 8px;
    border: 1px solid #002147;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    min-height: 40px;
    text-align: center;
    color: white;
    text-decoration: none;
    background-color: #002147;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #fdc800;
      border-color: #fdc800;
      color: white;
    }
  }

  li.previous a,
  li.next a {
    background-color: #002147;
    border: 1px solid #002147;
    color: #002147;
    min-width: 40px;
    min-height: 40px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li.break a {
    background-color: #002147;
    border-color: transparent;
  }

  li.active a {
    background-color: #fdc800;
    border-color: #fdc800;
    color: white;
  }

  li.disabled a {
    color: #6c757d;
    pointer-events: none;
    border-color: #dee2e6;
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
