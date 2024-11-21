import React, { useState } from 'react';
import { Box, Input, Button, Textarea, Flex, Text } from '@chakra-ui/react';
import axiosInstance from '../../services/axiosInstance';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    body: '',
    img: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.post(
        '/api/admin/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setFormData({ name: '', body: '', img: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка добавления карточки');
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="40px">
      <Text fontSize="2xl" mb="4" fontWeight="bold">
        Добавление новой карточки
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Input
            name="name"
            placeholder="Название"
            value={formData.name}
            onChange={handleChange}
          />
          <Textarea
            name="body"
            placeholder="Описание"
            value={formData.body}
            onChange={handleChange}
          />
          <Input
            name="img"
            placeholder="URL изображения"
            value={formData.img}
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="blue">
            Добавить карточку
          </Button>
        </Flex>
      </form>
      {message && <Text mt="4">{message}</Text>}
    </Box>
  );
};

export default AdminPage;
