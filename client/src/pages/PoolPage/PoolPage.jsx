import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { Box, Input, Button, Text } from '@chakra-ui/react';

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="#738595"
      height="70vh"
      padding="20px"
    >
      <Text fontSize="2xl" fontFamily={"Montserrat"}  mb="6" textAlign="center">
          Пришлите эскиз, и мы с любовью создадим для вас часы, которые будут вам по душе.
        </Text>
      <Box
       borderColor="gray.300"
                bg="linear-gradient(to bottom right, #738595, #1E2022)"
        p="6"
        borderRadius="lg"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
        width="100%"
        maxWidth="500px"
        marginTop="50px"
      >
       
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Input
            type="text"
            name="userName"
            placeholder="Имя"
            onChange={handleChange}
            value={formData.userName}
            mb="4"
            required
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.500' }}
                    bg="white"
          />
          <Input
            type="email"
            name="userEmail"
            placeholder="Email"
            onChange={handleChange}
            value={formData.userEmail}
            mb="4"
            required
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.500' }}
            bg="white"
          />
          <Input
            type="tel"
            name="userPhone"
            placeholder="Телефон"
            onChange={handleChange}
            value={formData.userPhone}
            mb="4"
            required
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.500' }}
            bg="white"
            _focus={{ borderColor: 'blue.500' }}
          />
          <Input
            type="file"
            name="userImg"
            onChange={handleFileChange}
            required
            mb="4"
            borderRadius="md"
            bg="white"
            borderColor="gray.300"
          />
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt="4"
            bg="#002238"
            borderRadius="md"
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.98)' }}
          >
            Отправить
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default PoolPage;