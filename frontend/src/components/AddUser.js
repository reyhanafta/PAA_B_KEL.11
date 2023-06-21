import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddUser = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const navigate = useNavigate();

const saveUser = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/users',{
            name,
            email,
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="columns mt-5 is-center">
        <div className="column is-half">
            <form onSubmit={saveUser}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={name} 
                            onChange={(e)=> setName(e.target.value)}
                            placeholder='Nama'
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={email} 
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder='Email'/>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser