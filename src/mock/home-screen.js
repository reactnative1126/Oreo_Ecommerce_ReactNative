import { productListTypes, productListLayout } from 'src/config/product';

export const home1 = [
  {
    id: '1',
    name: 'Slideshow',
    boxed: false,
    style: {
      container: {
        marginButton: 26,
      },
    },
    data: [
      {
        image: 'https://cdn.rnlab.io/uploads/2019/08/06022038/slideshow1%403x.jpg',
        heading: { text: { en: '60% OFF', ar: '60 ٪ من' }, color: '#e60023' },
        sub: { text: { en: 'New', ar: 'الجديد' }, color: '#000' },
        title: { text: { en: 'Sweater', ar: 'سترة' }, color: '#000' },
      },
      {
        image: 'https://cdn.rnlab.io/uploads/2019/08/06022045/slideshow3%403x.jpg',
        heading: { text: { en: '60% OFF', ar: '60 ٪ من' }, color: '#e60023' },
        sub: { text: { en: 'New', ar: 'الجديد' }, color: '#000' },
        title: { text: { en: 'Sweater', ar: 'سترة' }, color: '#000' },
      },
      {
        image: 'https://cdn.rnlab.io/uploads/2019/08/06022032/slideshow2%403x.jpg',
        heading: { text: { en: '60% OFF', ar: '60 ٪ من' }, color: '#fbbd08' },
        sub: { text: { en: 'New', ar: 'الجديد' }, color: '#f2711c' },
        title: { text: { en: 'Clothing', ar: 'ملابس' }, color: '#f2711c' },
      },
    ],
  },
  {
    id: '2',
    name: 'CategoryList',
    boxed: true,
    style: {
      container: {
        marginBottom: 26,
      },
      styleImage: {
        width: 109,
        height: 109,
        borderRadius: 8,
        marginBottom: 10,
      },
      styleName: {
        paddingVertical: 10,
        textAlign: 'center',
      },
    },
    title: {
      en: 'Categories',
      ar: 'الاقسام',
    },
    showName: false,
  },
  {
    id: '3',
    name: 'CategoryList',
    boxed: true,
    style: {
      container: {
        marginBottom: 26,
      },
      styleImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
      },
      styleName: {
        paddingVertical: 5,
        textAlign: 'center',
      },
    },
    title: {
      en: 'Categories',
      ar: 'الاقسام',
    },
    showName: true,
  },
  {
    id: '4',
    name: 'ProductList',
    per_page: 8,
    boxed: true,
    type: productListTypes.latest,
    title: {
      text: {
        en: 'New Arivals',
        ar: 'القادمون الجدد',
      },
      enable: true,
    },
  },
  {
    id: '5',
    name: 'ProductList',
    per_page: 8,
    boxed: true,
    type: productListTypes.best_sales,
    layout: productListLayout.slide,
    title: {
      text: {
        en: 'Best Seller',
        ar: 'الأكثر مبيعا',
      },
      enable: true,
    },
  },
  {
    id: '55',
    name: 'ProductList',
    per_page: 8,
    boxed: true,
    type: productListTypes.best_sales,
    layout: productListLayout.gird,
    title: {
      text: {
        en: 'Best Seller',
        ar: 'الأكثر مبيعا',
      },
      enable: false,
    },
  },
  {
    id: '6',
    name: 'BannerImage',
    boxed: true,
    style: {
      marginBottom: 65,
    },
    data: [
      {
        image: 'https://cdn.rnlab.io/uploads/2019/08/06011044/banner01.png',
        action: '',
        width: 455,
        height: 256,
        style: { borderRadius: 4 },
      },
    ],
  },
  {
    id: '7',
    name: 'BannerImage',
    boxed: false,
    style: {
      marginBottom: 65,
    },
    data: [
      {
        image: 'https://cdn.rnlab.io/uploads/2019/08/06013343/bannerBag%403x.png',
        action: '',
        width: 188,
        height: 270,
        style: { borderRadius: 0 },
      },
      {
        image: 'https://cdn.rnlab.io/uploads/2019/08/06013338/bannerFlashSale%403x.png',
        action: '',
        width: 188,
        height: 270,
        style: { borderRadius: 0 },
      },
    ],
  },
];
