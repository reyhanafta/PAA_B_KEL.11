import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {
    getUserById();
},[]);

const updateUser = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/users/${id}`,{
            name,
            email,
        });
        navigate("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async () =>{
    const response =await axios.get(`http://localhost:5000/users/${id}`)
    setName(response.data.name);
    setEmail(response.data.email);
}

  return (
    
      <><nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className='container mt-5'>
              <h1 className='title is-2 has-text-white-bis mb-5'>Edit Data</h1></div>
          </nav>
          <div className="columns ml-6">
              <div className="column is-two-fifths mt-6">
                  <form onSubmit={updateUser}>
                      <div className="field">
                          <label className="label">Nama</label>
                          <div className="control">
                              <input
                                  type="text"
                                  className="input"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder='Nama' />
                          </div>
                      </div>
                      <div className="field">
                          <label className="label">Email</label>
                          <div className="control">
                              <input
                                  type="text"
                                  className="input"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder='Email' />
                          </div>
                      </div>
                      <div className="field">
                          <button type='submit' className='button is-dark'>
                              Perbarui
                          </button>
                      </div>
                  </form>
              </div>
          </div></>
  )
}

export default EditUser;