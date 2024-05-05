import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';
import Shimmer from './Showcase';
import filterData from '../utils/helper';


const RssFeed = ({ url }) => {
  const [feedItems, setFeedItems] = useState([]);
  const [filteredfeedItems, setFilteredFeedItems] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(url);
        console.log(feed?.items)
        setFeedItems(feed.items);
        setFilteredFeedItems(feed.items)
      } catch (error) {
        console.error('Error parsing RSS feed: ', error);
      }
    };

    fetchData();
  }, [url]);

  const extractImageUrl = (contentEncoded) => {
    const match = contentEncoded.match(/<img src="(.*?)"/);
    return match ? match[1] : null;
  }

  if(filteredfeedItems.length === 0 && searchText.length != 0) return (
    <h1>No Natural Disasters Found!</h1>
    );

  return (feedItems.length === 0) ? <Shimmer /> :  (
    <>
    <div className="mx-10 my-8">
      <input type="text" className="p-2 w-6/12 rounded-sm border-2 border-gray-400 mr-8" placeholder="Search" value={searchText} onChange={(e)=>{
    return setSearchText(e.target.value);
      }}/>
      <button className="font-semibold p-2 bg-white text-green-400 border-2 border-green-300 rounded-md w-20 hover:bg-green-500 hover:text-white" onClick={()=>{
                const data = filterData(searchText,feedItems);
                setFilteredFeedItems(data);
            }}>Search</button>
      <a href='/nd'><button className="font-semibold ml-2 p-2 bg-white text-green-400 border-2 border-green-300 rounded-md w-20 hover:bg-green-500 hover:text-white">View all</button></a>
    </div>
      <div className="flex flex-wrap m-2 p-2">
      {filteredfeedItems.map((item, index) => (
                <div key={index} className="w-[350] h-[450] shadow-lg m-2 p-5 hover:bg-blue-gray-900 hover:text-white hover:rounded-sm">
                {item['content:encoded'] && (
                <img src={extractImageUrl(item['content:encoded'])} alt="Feed Image" className="w-[350] h-[200] rounded-sm" />
                )}
                <p className='text-cyan-600 hover:text-red-500 m-3'><a target='_blank' href={item.link}>{item.title}</a></p>
                <p>{item.contentSnippet}</p>
            </div>
      ))}

      </div>
  </>
  );
};

export default RssFeed;

