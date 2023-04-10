import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './css/Home.css'

const Home = () => {
  const [info, setInfo] = useState([])
  
  const [token, setToken] = useState('')

  const [AdminInfo, setAdminInfo] = useState([])
  const [Admintoken, setAdminToken] = useState('')

  const getAdminInfo = async(token) =>{
    const res = await axios.get('/api/info', {
      headers:{Authorization: token}
    })
    console.log(res);
    setAdminInfo(res.data)
  }

  const reportClick = () => {
    alert('Sent to concerned Authorities')
  }

  useEffect(() =>{
    const Admintoken = localStorage.getItem('tokenstore')
    setAdminToken(Admintoken)
    console.log(Admintoken);
    if(Admintoken) {
      getAdminInfo(Admintoken)
    }
  }, [])

  const getInfo = async(token) =>{
    const res = await axios.get('/api/info/yourSubmissions', {
      headers:{Authorization: token}
    })
    console.log(res);
    setInfo(res.data)
  }

  useEffect(() =>{
    const token = localStorage.getItem('tokenstore')
    setToken(token)
    console.log(token);
    if(token) {
      getInfo(token)
    }
  }, [])

  function dateFormat(date) {
    const date1 = date.substring(0, 4);
    const date2 = date.substring(5, 7);
    const date3 = date.substring(8, 10);

    return `${date3}/${date2}/${date1}`;
  }



  if(info.length !== 0 && (info[0].name).localeCompare('admin') === 0){
    return <div class='cards'>
    {AdminInfo.map(inf => (
      <article class="information [ card ]">
          <h2 class="title">{inf.title}</h2>
          <p class="info">{inf.content}</p>
          <h4 class="title">{dateFormat(inf.date.slice(0, 10))}</h4>
          <h4 class="title">Submitted by: {inf.name}</h4>
          <button class="button-ml">
            <span>Check for False Alarms!</span>
          </button>
          <button class="button" onClick={reportClick}>
            <span>Send to Authorities</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
            </svg>
          </button>
        </article>


    ))}
       
    </div>
   
  }
  else {
    return <div class='cards'>
      {
        info.map(inf => (
          
        <article class="information [ card ]">
          <h2 class="title">{inf.title}</h2>
          <p class="info">{inf.content}</p>
          <h4 class="title">{dateFormat(inf.date.slice(0, 10))}</h4>
        </article>


    ))
      }
    </div>
  
  }

  
}

export default Home