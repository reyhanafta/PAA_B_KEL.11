import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate('/');
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container mt-5'>
      <h1 className='title is-3'>Selamat datang, {name}!</h1>
      <table className='table is-danger is-fullwidth mt-3'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className='button is-small is-primary mr-3'>
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)} className='button is-small is-warning'>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className='title is-4 mt-5'>Tiket Bus</h1>
      <table className='table is-primary is-fullwidth mt-3'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Bus</th>
            <th>Harga Tiket</th>
            <th>Tujuan</th>
            <th>Jadwal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>P.O Haryanto</td>
            <td>100.000</td>
            <td>Jakarta</td>
            <td>Senin, 19 Juni 2023</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Mila</td>
            <td>150.000</td>
            <td>Surabaya</td>
            <td>Jumat, 23 Juni 2023</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Bus Trans88</td>
            <td>200.000</td>
            <td>Bandung</td>
            <td>Rabu, 21 Juni 2023</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
