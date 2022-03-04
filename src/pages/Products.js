import axios from 'axios';

import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../sections/@dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
// ----------------------------------------------------------------------

const baseUrl = 'http://localhost:11001/';

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const [shouldIGet, setshouldIGet] = useState(true);

  const [cate, setCate] = useState('kawaii');

  const chCate = (newCate) => {
    setCate(newCate);
  };

  const [setuList, setSetu] = useState([]);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const renew = () => {
    setshouldIGet(true);
    getSetu();
  };

  const judgePicture = (pid, ispass) => {
    if (ispass) {
      axios.post(`${baseUrl}pending/${pid}?typ=${cate}`).then(resp => renew());
    }
    else {
      axios.delete(`${baseUrl}pending/${pid}`).then(resp => renew());
    }
    
  };



  const getSetu = () => {
    if (shouldIGet) {
      setshouldIGet(false);
      axios.get(`${baseUrl}pendinglist`).then(resp => {
        console.log(resp.data);
        setSetu(resp.data.map((setu) => ({
            id: setu._id,
            cover: `${baseUrl}bin/${setu._id}`,
            name: setu.title,
            price: 233,
            priceSale: 114,
            colors: ['#00ABDD', '#FFE433'],
            status: ''
          })
        ));

        console.log(Object.values(resp.data));
      });
    }
  };
  useEffect(
    () => {
      getSetu();
    }
  );
  getSetu();

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="审图 | Minimal-UI">
      <Container>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography> */}

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort
              curCate={cate}
              onChangeCate={chCate}
            />
          </Stack>
        </Stack>

        <ProductList products={setuList} onJudge={judgePicture}/>
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
