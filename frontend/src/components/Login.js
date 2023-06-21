import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login',{
                email: email,
                password: password,
            });
            navigate("/dashboard");
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
                    <form className='box' onSubmit={Auth}>
                    <h1 className='title has-text-centered is-size-2'>LOGIN</h1>
                        <div className='field mt-5'>
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
                        <div className='field mt-6'>
                            <button className='button is-dark is-fullwidth'>Login</button>
                        </div>
                        <Link to={"register"}>Tidak punya akun ?</Link>
                        <p className='has-text-centered'>{msg}</p>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Login