import React, {useState, useEffect} from 'react'
import axios from 'axios'



const Home = () => {
  const [info, setInfo] = useState([])
  const [token, setToken] = useState('')

  const getInfo = async(token) =>{
    const res = await axios.get('/api/info', {
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

  return (
    <div>
    {
       info.map(inf => (
        <div className='card'>
        <h4>{inf.title}</h4>
        <div>
          <p>{inf.content}</p>
        </div>
        <p>{inf.date}</p>
        <div className='Footer'>
          {inf.name}
        </div>
      </div>
      ))
    }
      
    </div>
  )
}

export default Home