import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';

const PoolPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userImg: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, userImg: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('userName', formData.userName);
    data.append('userEmail', formData.userEmail);
    data.append('userPhone', formData.userPhone);
    data.append('userImg', formData.userImg);

    try {
      await axiosInstance.post('/api/pool/submit', data);
      alert('Форма успешно отправлена!');
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="userName" placeholder="Имя" onChange={handleChange} required />
      <input type="email" name="userEmail" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="userPhone" placeholder="Телефон" onChange={handleChange} required />
      <input type="file" name="userImg" onChange={handleFileChange} required />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default PoolPage;
