import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import './MusicCardList.css';

export default function MusicCardList({ title, subtitle, image }) {
  return (
    <Card className="card-list">
      <div className="image-container">
        <CardMedia
          className="avatar1"
          component="img"
          image={image}
          alt={title}
        />
      </div>
      <CardContent className="content">
        <Typography variant="h6" className="title">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="subtitle">
          {subtitle}
        </Typography>
      </CardContent>
      <div className="play-icon1">
        <PlayCircleFilledIcon style={{color: '#3fbd64', fontSize: '50px'  }}/>
      </div>
    </Card>
  );
}
