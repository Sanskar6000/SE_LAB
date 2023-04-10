import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import './css/createInfo.css'

const CreateInfo = () => {
  const [info, setInfo] = useState({
    title: 'title',
    content: 'content',
    date: Date.now()
  })

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const createInfo = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenstore');
      if (token) {
        const { title, date, content } = info;
        const newInfo = {
          title,
          content,
          date
        };
        await axios.post('/api/info', newInfo, {
          headers: { Authorization: token },
        });
        /* Push method is used to push a path in ***History Stack*** 
        Thereby redirecting to the last route added */
        alert("New Information uploaded")
      }
    } catch (error) {
      window.location.href = '/';
    }
  };

  return (
    <div className="create_card">
      <h2>Submit Sightings</h2>
      <form onSubmit={createInfo}>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            className="createEntryInput"
            type="text"
            //Value if for initial value
            value={info.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
          />
        </div>
    
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            className="createEntryInput"
            type="text"
            //Value if for initial value
            value={info.content}
            id="content"
            name="content"
            required
            rows="10"
            onChange={onChangeInput}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>

    
  )
}

export default CreateInfo