import PropTypes from 'prop-types';
import { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../../components/Label';
import ColorPreview from '../../../components/ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product, onJudge }) {
  const { name, cover, price, colors, status, priceSale } = product;


  const [onhover, setonhover] = useState(false);
  const [sx, setsx] = useState(
    {
      position: 'relative'
    }
  );

  return (
    <Card>
      <Link target="_blank" to={`//localhost:11001/bin/${product.id}`} color="inherit" underline="hover" component={RouterLink}
       onMouseEnter={() => {
        setsx({
          width: 560,
          height: 'auto',
          position: 'absolute'
        });
        setonhover(true);
      }} onMouseLeave={() => {
        setsx({
          position: 'relative'
        }); setonhover(false);
      }}>
        <Box sx={{
          pt: '100%',
          position: 'relative'
        }}>
          <ProductImgStyle sx={onhover ? sx : {}} alt={name} src={cover} />
        </Box>
      </Link>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link target="_blank" to={`//www.pixiv.net/artworks/${product.id}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Button
          color="inherit"
          onClick={() => { onJudge(product.id, true); }}
        >Pass</Button>

        <Button
          color="inherit"
          onClick={() => { onJudge(product.id, false); }}
        >Refuse</Button>


      </Stack>
    </Card>
  );
}
