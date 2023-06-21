import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <section className="hero has-background-primary-dark is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-8-desktop'>
                    <form className='box' onSubmit={Register}>
                    <h1 className='title has-text-centered is-size-2'>REGISTER</h1>
                        <div className='field mt-3'>
                            <label className='label'>Masukkan nama:</label>
                            <div className='controls'>
                                <input type="text" className='input' placeholder='Nama'
                                value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-3'>
                            <label className='label'>Masukkan email:</label>
                            <div className='controls'>
                                <input type="text" className='input' placeholder='email@mail.com' 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-3'>
                            <label className='label'>Masukkan password:</label>
                            <div className='controls'>
                                <input type="password" className='input' placeholder='****'
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-3'>
                            <label className='label'>Konfirmasi password:</label>
                            <div className='controls'>
                                <input type="password" className='input' placeholder='****'
                                value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='field mt-6'>
                            <button className='button is-dark is-fullwidth'>Register</button>
                        </div>
                        <Link to={"/"}>Sudah punya akun ?
                        <p className='has-text-centered'>{msg}</p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Register