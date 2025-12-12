import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div>
       
        <Link to={`/towninfo/${1}`} className='towncard' id='franklin'>
          <div className="towntitle" >Franklin, VT</div>
        </Link>
    </div>)
}
export default Home;