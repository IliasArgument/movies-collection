import React,{ useState, useEffect } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import './Trending.scss';
import axios from 'axios';

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=26ba5e77849587dbd7df199727859189&page=${page}`);
        setContent(data.results);
    }
    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line 
    },[page])

    return (
        <div>
        <span className="pageTitle">Trending today</span>
           <div className="trending">
        {
            content && content.map(trend => (
                <SingleContent 
                key={trend.id} 
                id={trend.id} 
                poster={trend.poster_path}
                title={trend.title || trend.name}
                date={trend.first_air_date || trend.release_date}
                media_type={trend.media_type}
                vote_average={trend.vote_average}
                />
            ))
        }
           </div>
           <CustomPagination setPage={setPage}/>
        </div>
    );
}

export default Trending;