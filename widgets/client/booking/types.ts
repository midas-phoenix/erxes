import { IProductCategory } from '../types';

export interface IStyle {
  itemShape?: string;
  widgetColor: string;
  productAvailable: string;

  textAvailable: string;
  baseFont?: string;

  line?: string;
  columns?: string;
  rows?: string;
  margin?: string;
}

export interface ICategoryTree {
  _id: string;
  name: string;
  description: string;
  parentId: string;
  type: string;
  status?: string;
  count: string;
}

export interface IBookingData {
  name: string;
  description: string;
  userFilters?: string[];
  image?: any;

  productCategoryId: string;
  style: IStyle;

  categoryTree: ICategoryTree[];
  navigationText: string;
  bookingFormText: string;

  mainProductCategory: IProductCategory;
}

export interface IFieldDataWithText {
  text: string;
  value: string;
}
