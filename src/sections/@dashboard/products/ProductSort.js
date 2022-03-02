import { useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'kawaii', label: '可爱' },
  { value: 'nice', label: '好图' },
  { value: 'r18', label: 'R18' },
  { value: 'ero', label: '涩涩' },
  { value: 'ikemen', label: '池面' },
  { value: 'kusa', label: '生草' }
];

const CATE_MAP = {
  kawaii:'可爱',
  nice:'好图',
  r18:'R18',
  ero:'涩涩',
  ikemen:'池面',
  kusa:'生草'
}

export default function ShopProductSort({
  curCate,
  onChangeCate
}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        加入分类:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {CATE_MAP[curCate]}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === 'newest'}
            onClick={()=>{
              onChangeCate(option.value);
              handleClose();
            }}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
