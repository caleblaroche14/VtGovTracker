import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className="page">
       <h2 className='pageheader'>Welcome to the Town Information Portal</h2>
        <p>Select a town to view more information:</p>
        <Link to={`/towninfo/${1}`} className='towncard' id='franklin'>
          <div className="towntitle" >Franklin, VT</div>
        </Link>
        
        <Link to={`/towninfo/${2}`} className='towncard' id='highgate'>
            <div className="towntitle" >Highgate, VT</div>
          </Link>
    </div>)
}
export default Home;