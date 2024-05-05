import React from 'react';
import RssFeed from './RssFeedSection';

export const News = () => {
  return (
    <div>
      <RssFeed url="https://www.downtoearth.org.in/rss/natural-disasters" />
    </div>
  );
};

export const Climate = () => {
  return (
    <div>
      <RssFeed url="https://www.downtoearth.org.in/rss/climate-change" />
    </div>
  );
};



