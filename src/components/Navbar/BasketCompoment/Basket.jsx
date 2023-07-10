import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { deleteAllProducts,  } from '../../../redux/actions.js';
import './Basket.scss';

const Basket = () => {

  const dispatch = useDispatch();

  const total = useSelector((state) => state.total);
  const formattedTotal = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total);

  const handleDeleteAllProducts = () => {
    dispatch(deleteAllProducts());
  };

  return (
    <div className="basket-container">
      <div className="basket-content">
        <svg viewBox="0 0 900 1000">
          <path d="M150 850c0-26.667 10-50 30-70s43.333-30 70-30c28 0 51.667 10 71 30s29 43.333 29 70c0 28-9.667 51.667-29 71s-43 29-71 29c-26.667 0-50-9.667-70-29s-30-43-30-71m500 0c0-26.667 10-50 30-70s43.333-30 70-30c28 0 51.667 10 71 30s29 43.333 29 70c0 28-9.667 51.667-29 71s-43 29-71 29c-26.667 0-50-9.667-70-29s-30-43-30-71M328 614c-24 6.667-35.333 14.333-34 23 1.333 8.667 16 13 44 13h562v76c0 13.333-6.667 20-20 20H750 250h-24c-13.333 0-20-6.667-20-20v-76l-10-46-98-454H0V70c0-13.333 6.667-20 20-20h156c13.333 0 20 6.667 20 20v86h704v274c0 14.667-6 23.333-18 26L328 614" />
        </svg>
        <p>Total: {formattedTotal}</p>
      </div>
      {total !== 0 && (
        <div className="delete-all-products" onClick={handleDeleteAllProducts}>
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M64 48 H448 A32 32 0 0 1 480 80 V96 A32 32 0 0 1 448 128 H64 A32 32 0 0 1 32 96 V80 A32 32 0 0 1 64 48 z" />
            <path d="M74.45 160a8 8 0 00-8 8.83l26.31 252.56a1.5 1.5 0 000 .22A48 48 0 00140.45 464h231.09a48 48 0 0047.67-42.39v-.21l26.27-252.57a8 8 0 00-8-8.83zm248.86 180.69a16 16 0 11-22.63 22.62L256 318.63l-44.69 44.68a16 16 0 01-22.63-22.62L233.37 296l-44.69-44.69a16 16 0 0122.63-22.62L256 273.37l44.68-44.68a16 16 0 0122.63 22.62L278.62 296z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Basket;
