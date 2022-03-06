import axios from 'axios';

import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/Iconify';
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


function KeySetting({i,desc,sta, tri}){
  return (
    <Button
    color="inherit"
    onClick={tri}
    endIcon={<Iconify icon={'eva:color-picker-outline'} />}
  >
    {desc}：&nbsp;
    <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
      {sta}
    </Typography>
  </Button>
  )
}

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

  const judgePicture = (pid, ispass) => {
    if (ispass) {
      axios.post(`${baseUrl}pending/${pid}?typ=${cate}`).then(resp => renew());
    }
    else {
      axios.delete(`${baseUrl}pending/${pid}`).then(resp => renew());
    }
  };

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

  function passFirst(typ) {
    axios.post(`${baseUrl}pending/${setuList[0].id}?typ=${typ}`).then(renew);
  }
  function deleteFirst() {
    axios.delete(`${baseUrl}pending/${setuList[0].id}`).then(renew);
  }

  const [keycode, setKeyCode] = useState('AFK');

  const keyDefault = ['KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL', 'Space'];

  // const keyStates = [...Array(keyDefault.length)].map((_, index) => {
  const keyStates = keyDefault.map((s, index) => {
    return useState(s);
  });

  // const [keyMap, setKeyMap] = useState();
  const keyReal = ['kawaii', 'nice', 'r18', 'ero', 'ikemen', 'kusa', 'delete']
  const keyDesc = ['可爱', '好图', 'R18', '涩涩', '池面', '生草', '丢弃']
  // const keyFuncs = { 
  //   kawaii: '可爱',
  //   nice: '好图',
  //   r18: 'R18',
  //   ero: '涩涩',
  //   ikemen: '池面',
  //   kusa: '生草' 
  // };


  return (
    <Page title="审图 | Minimal-UI" onKeyDown={(e) => {
      setKeyCode(e.code);
      console.log(e.code);
      var idx = keyStates.findIndex((elem,_,__)=>elem[0]===e.code);
      console.log('idx:',idx);
      if(idx>=0)
      {
        console.log('hit:',keyDesc[idx]);
        if(idx==keyStates.length-1)
          deleteFirst();
        else passFirst(keyReal[idx]);
      }
    }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {keycode}
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {keyStates.map(
              (_,i) => (<KeySetting key={i} i={i} desc={keyDesc[i]} sta={keyStates[i][0]} tri={()=>keyStates[i][1](prompt("设置键位为：", keyStates[i][0]))}/>))
            }
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

        <ProductList products={setuList} onJudge={judgePicture} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
