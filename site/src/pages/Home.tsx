import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className="page">
      <div className="topheaderholder">
       <h2 className='pageheader'>Welcome to the Franklin County Government Tracker</h2>
        <p className='pagedesc'>This is a transparent and easy-to-user tool, designed to help residents stay informaed about local government activity across Fraknlin County</p>
        <p>The Franklin County Government Tracker brings together public information from our towns-agendas, minutes, descisions, notices, and upcoming meetings-into one simple, organized
          place. Our goal is to make it easier for community members to follow what's happening, understand local descision making, and stay engaged with inititives that matter. 
        </p>
        <p><b>Start by selecting your town below:</b></p>
      </div>
        
        <Link to={`/towninfo/${1}`} className='towncard' id='franklin'>
          <div className="towntitle" >Franklin</div>
        </Link>
        
        <Link to={`/towninfo/${2}`} className='towncard' id='highgate'>
            <div className="towntitle" >Highgate</div>
        </Link>
        <div className="topheaderholder">
          <div className='pageheader'>What This Tracker Does</div>
          <ul>
            <li>Tracks Meeting Activity</li>
            <li>Improves Trassparency</li>
          </ul>

          <div className='pageheader'>How You Can Get Involved</div>
          <ul>
            <li>Attend local board meetings</li>
            <li>review agendas and minutes</li>
            <li>Follow discussions on topics you care about</li>
          </ul>

          <div className='pageheader'>Our Commitment to Transparency</div>
          <div>Local government descisions shape roads, budgets, services, development, and everyday life in every Franklin County community. We believe public information
            should be easy to access, understand, and navigates.
            <br />
            <br />
            The Franklin County Government Tarcker upports transoparency, participation, and informaed civic engagement by bringing togetheressential public documents and meeting activity in oneclear, accessible
            place. Our goal is to invrease awereness and engagement in a way that tryly serves the people of Franklin County.
            <br />
            <br />
            As the project grows, we hope to expand our coverage to additional towns across the region, to help even more residents stay informed and involved in local government.
          </div>
        </div>
    </div>)
}
export default Home;