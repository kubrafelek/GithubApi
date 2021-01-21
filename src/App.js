import {useState} from 'react';
import axios from 'axios';
import RepoDetails from './RepoDetails';
import './App.css';

function App() {

  const [orgsname, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);
  
  function handleSubmit(e){
    e.preventDefault();
    searchRepos();
  };

  function searchRepos(){
    setLoading(true);
    axios({
      method:"get",
      url:`https://api.github.com/orgs/${orgsname}/repos`,
    }).then(res => {
      setLoading(false);
      setRepos(res.data);
    });
  }

  function renderRepo(repo){
    return(
      <div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className="repo-name">
            {repo.name}
        
            <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: .5,
                borderColor : '#000000'
            }}/>
        </h2>
      </div>
      
    );
  }

  function getDetails(repoName){
    setDetailsLoading(true);
    axios({
      method:"get",
      url:`https://api.github.com/repos/${orgsname}/${repoName}`,
    }).then(res => {
      setDetailsLoading(false);
      setDetails(res.data);
    });
  }

  return (
   <div className="page">
     <div className="landing-page-container">
      <div className="left-side">
        <form className="form">
          <input 
            className="input"
            value={orgsname}
            placeholder="Enter Organization Name"
            onChange={e => setUsername(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}> {loading ? "Searching..." : "Search"}</button>
        </form>
        
        <div className="result-container">
          {repos.map(renderRepo)}
        </div>
      </div>

      <RepoDetails details={details} loading={detailsLoading} />

     </div>
   </div>
  );
}

export default App;
