import React, { FC } from 'react';
import { Link, useNavigate } from "react-router-dom";
import formatMoney from "../../helpers/formatMoney";
import { useDispatch, useSelector } from "react-redux";

import Badge from "../ui/Badge";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { disableProductAction } from "../../redux/products/products.action";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { getEnvVariables } from "../../helpers/getEnvVariables";
import { Product } from '../../models';
const { VITE_PUBLIC_URL, VITE_BACKEND_URL } = getEnvVariables();

const ItemProductMobile:FC<any> = ({ productData }) => {

    const {
        idProduct,
        product,
        unitPrice,
        unitCost,
        category,
        commissionPercentage,
        state,
        image,
        brand,
        imageProduct
     } = productData;

    const COLOR_STATE = {
        active: "success",
        inactive: "danger",
    };

    const navigate = useNavigate();

    const handleDesactivate = (id: number) => {
        Swal.fire({
            title: `Estás seguro de eliminar el producto ${product}?`,
            text: "No puedes revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo!",
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire(
                    "Eliminado!",
                    "El producto ha sido eliminado",
                    "success"
                );
            }
        });
    };

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => navigate(`edit-product/${idProduct}`)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = (id:number) => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => handleDesactivate(id)}
            >
                Borrar
            </SwipeAction>
        </TrailingActions>
    );

    return (
      <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions(idProduct)}
        >
          <div className='flex justify-between w-full bg-white border-b shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50'>
            <div className='flex items-center gap-2 px-2 py-2 font-medium text-gray-900 capitalize md:px-6 dark:text-white whitespace-nowrap'>
              <img
                src={
                  imageProduct[0]?.url
                    ? imageProduct[0].url
                    : `${VITE_PUBLIC_URL}/img/products/productDefault.png`
                }
                className='w-12 h-12 rounded-full cursor-pointer'
                onClick={() => navigate(`${idProduct}`)}
              />
              <div className='flex flex-col'>
                <Link to={`${idProduct}`}>
                  <p>{product}</p>
                </Link>
                <p className='text-sm font-normal text-gray-400'>
                  {brand && brand}
                </p>
                <p className='text-sm font-normal text-gray-400'>{category}</p>
              </div>
            </div>
            <div className='px-6 py-2'>
              <div className='flex items-baseline justify-end gap-2'>
                <p className='font-bold text-gray-800'>
                  {formatMoney.format(unitPrice)}
                </p>
              </div>
              <div className='flex items-baseline justify-end gap-2'>
                <p className='text-gray-500 '>{formatMoney.format(unitCost)}</p>
              </div>
              <div className='hidden px-6 py-2 lg:table-cell'>
                {commissionPercentage}%
              </div>
            </div>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    );
};

export default ItemProductMobile;
