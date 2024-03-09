import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './MusicCard.css';

function MusicCard({ title, subtitle, image }) {
  return (
    <Card className="card">
      <CardMedia
        className="media"
        image={image}
        title={title}
      >
        <div className="overlay"></div>
        <div className="play-icon">
          <PlayCircleIcon style={{color: '#3fbd64', fontSize: '50px'  }}/>
        </div>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" className="title">
          {title}
        </Typography>
        <Typography variant="body2"  className="subtitle">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MusicCard
