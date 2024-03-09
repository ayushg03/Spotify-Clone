import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import './Home.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MusicCard from '../components/card/MusicCard';
import MusicCardList from '../components/card/MusicCardList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilteredTracks, selectTracks } from '../store/trackSlice';

function Home() {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState('None');
  const [currentPage, setCurrentPage] = useState(1);
  const [tracks, setTracks] = useState([]);
  const tracksPerPage = 18;

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage whenever search or filter params change
    fetchData(0); // Pass offset as 0 to fetch fresh data
  }, [searchQuery, selectedMarkets, selectedPopularity]); // Fetch fresh data when search or filter params change

  const fetchData = (offset) => {
    console.log(offset);
    dispatch(fetchFilteredTracks({ query: searchQuery, markets: selectedMarkets, popularity: selectedPopularity, offset: offset }))
      .then((response) => {
        if (response.payload) {
          if (offset === 0) {
            // If offset is 0, set tracks with new data
            setTracks(response.payload);
          } else {
            // If offset is greater than 0, append new data to existing tracks
            setTracks(prevTracks => [...prevTracks, ...response.payload]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
    fetchData(currentPage * tracksPerPage); // Pass the new offset to fetch more data
  };

  return (
    <div className='container'>
      <Box className='box1'>
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMarkets={selectedMarkets}
          setSelectedMarkets={setSelectedMarkets}
          selectedPopularity={selectedPopularity}
          setSelectedPopularity={setSelectedPopularity}
        />
      </Box>
      <Box className='box2'>
        <Box className='box3'>
          <Typography className='text'>Good evening</Typography>
          <Button className='toggle' onClick={toggleViewMode} variant="outlined">
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </Button>
        </Box>
        {viewMode === 'grid' ? (
          <Grid container spacing={2}>
            {tracks.map((track, index) => (
              <Grid key={index}>
                <MusicCard
                  title={track.album.name}
                  subtitle={track.album.artists[0]?.name}
                  image={track.album.images[0]?.url}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} className="gridContainer">
            {tracks.map((track, index) => (
              <Grid key={index}>
                <MusicCardList
                  title={track.album.name}
                  subtitle={track.album.artists[0]?.name}
                  image={track.album.images[0]?.url}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Box className="loadMoreContainer">
        <Button variant="contained" className="loadMoreButton" onClick={handleLoadMore}>
  Load More
</Button>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default Home;
