const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;


const getAccessToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    return null;
  }
};

export const fetchTracksFromAPI = async (query = 'rock', markets = [], popularity = '', offset=0) => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to fetch access token');
    }
    console.log(offset);
    let popularityFilter = '';
    switch (popularity) {
      case 'High':
        popularityFilter = '&popularity>75';
        break;
      case 'Mid':
        popularityFilter = '&popularity>=50&popularity<=75';
        break;
      case 'Low':
        popularityFilter = '&popularity<50';
        break;
      default:
        // No popularity filter
        break;
    }
  
    const queryParams = new URLSearchParams({
      q: query || 'rock',
      type: 'track',
      market: markets.join(',') || 'IN',
      limit: 18,
      offset: offset,
      // Add other parameters like markets and popularity here if needed
    });
  
    const url = `https://api.spotify.com/v1/search?${queryParams}${popularityFilter}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch tracks from Spotify API');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tracks:', error.message);
      throw error;
    }
  };
  