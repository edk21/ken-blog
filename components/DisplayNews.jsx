import React from 'react'
import axios from "axios"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {api} from "../pages/api/comments"

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const DisplayNews = () => {

    const [news, setNews] = React.useState([])
  
    //const api = process.env.NEXT_PUBLIC_NEWS_URL;

    React.useEffect(() => {
        const loadNews = async () => {
            const response = await axios.get(api);

            setNews(response.data.articles);
        };
        loadNews();
    }, []);
   
    const customLeftArrow = (
    <div className="absolute -left-1 text-center py-0 -mx-0 cursor-pointer bg-blue-600 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="absolute  -right-1 text-center py-0 cursor-pointer bg-blue-600 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );

  const countTitle = 50;
  const countDesc = 100;

    return (
        <div className="bg-white shadow-lg rounded-lg py-8 px-4 mb-4">
            <h3 className="text-xl mb-4 font-semibold border-b pb-4">
              News  
            </h3>
            <Carousel 
                infinite={true} 
                responsive={responsive} 
                autoPlay={true}
                autoPlaySpeed={8000}
                transitionDuration={5000}
                itemClass="px-4"
                customLeftArrow={customLeftArrow} 
                customRightArrow={customRightArrow}
            >
                {news && news.map((item, i) =>{
                    return(
                        <div key={i}>
                            <h6 className="mb-2 -pt-5">
                                {item.title.slice(0, countTitle) + (item.title.length > countTitle ? "..." : "")}
                            </h6>
                            <a href={item.url} target="_blank">
                                <img 
                                    src={item.urlToImage}
                                    alt={item.title}
                                    className=" h-40 w-full object-cover
                                    mb-2 rounded cursor-pointer"
                                />
                            </a>
                                <a href={item.url} target="_blank" className="mt-5 text-sm text-blue-500 hover:text-blue-700 hover:underline font-semibold transition duration-800 ease-in-out hover:tracking-wide">
                                    {item.author}:
                                </a>
                            <p className="mt-2"> 
                                {item.description.slice(0, countDesc) + (item.description.length > countDesc ? "..." : "")}
                            </p>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default DisplayNews
