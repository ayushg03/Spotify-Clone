import React, { useState } from 'react';
import './Header.css';
import { Avatar, Box, IconButton, TextField, Popover, Typography, MenuItem, FormControl, Select, Button, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { NotificationsNoneOutlined } from '@material-ui/icons';

function Header({ searchQuery, setSearchQuery, selectedMarkets, setSelectedMarkets, selectedPopularity, setSelectedPopularity }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarketChange = (event) => {
    setSelectedMarkets(event.target.value);
  };

  const handleApplyFilter = () => {
    handleClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleApplyFilter();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box className='box-main'>
        <Box className='box-search'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            placeholder='What do you want to play?'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  style={{ color: 'white', fontSize: '25px', marginRight: '5px' }}
                />
              ),
              endAdornment: (
                <IconButton onClick={handleClick} style={{ color: 'white' }}>
                  <FilterAltIcon />
                </IconButton>
              ),
            }}
            className='searchBox'
          />
        </Box>
        <Box className='box-user'>
          <NotificationsNoneOutlined className='notify' />
          <Avatar className='avatar'>A</Avatar>
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box
          style={{
            padding: '20px',
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControl style={{ marginBottom: '20px' }}>
            <Typography variant='subtitle1' gutterBottom>
              Market
            </Typography>
            <Select
              labelId='market-label'
              id='market-select'
              multiple
              value={selectedMarkets}
              onChange={handleMarketChange}
              renderValue={(selected) => selected.join(', ')}
              className='custom-select'
            >
              <MenuItem value='US'>
                <Checkbox
                  checked={selectedMarkets.includes('US')}
                  className='chkbox'
                />
                United States
              </MenuItem>
              <MenuItem value='UK'>
                <Checkbox
                  checked={selectedMarkets.includes('UK')}
                  className='chkbox'
                />
                United Kingdom
              </MenuItem>
              <MenuItem value='IN'>
                <Checkbox
                  checked={selectedMarkets.includes('IN')}
                  className='chkbox'
                />
                India
              </MenuItem>
              {/* Add more countries as needed */}
            </Select>
          </FormControl>
          <FormControl style={{ marginBottom: '20px' }}>
            <Typography variant='subtitle1' gutterBottom>
              Popularity
            </Typography>
            <Select
              labelId='popularity-label'
              id='popularity-select'
              value={selectedPopularity}
              onChange={(event) => setSelectedPopularity(event.target.value)}
              className='custom-select'
            >
              <MenuItem value='None'>None</MenuItem>
              <MenuItem value='Mid'>Mid</MenuItem>
              <MenuItem value='Low'>Low</MenuItem>
              <MenuItem value='High'>High</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' className='filter-btn' onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default Header;
