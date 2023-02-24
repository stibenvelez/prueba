import { useMutation} from 'react-query';
import {  UPDATE_PRODUCT } from '../services/product.services';

const useEditBrand = () => {
  return useMutation(UPDATE_PRODUCT);
}

export default useEditBrand
