import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    name: '',
    quantity: '',
    destination: ''
  });

  useEffect(() => {
    // Fetch ticket data from the server using the ID
    getTicket();
  }, []);

  const getTicket = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tickets/${id}`);
      setTicket(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value
    }));
  };

  const updateTicket = async () => {
    try {
      await axios.put(`http://localhost:5000/tickets/${id}`, ticket);
      navigate('/dashboard'); // Redirect back to the dashboard after updating
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Edit Ticket</h1>
      <form>
        <div className="field">
          <label className="label">Nama Bus</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={ticket.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Jumlah Tiket</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="quantity"
              value={ticket.quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Tujuan</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="destination"
              value={ticket.destination}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="button" className="button is-primary" onClick={updateTicket}>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
