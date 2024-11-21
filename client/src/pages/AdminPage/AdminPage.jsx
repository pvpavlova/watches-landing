import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Flex,
  Text,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const AdminPage = ({ logoutHandler }) => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
  });
  const [image, setImage] = useState(null); // Для хранения файла изображения
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Сохраняем выбранный файл
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const data = new FormData(); // Используем FormData для отправки файлов
    data.append("name", formData.name);
    data.append("body", formData.body);
    if (image) {
      data.append("img", image); // Добавляем файл изображения
    }

    try {
      const response = await axiosInstance.post("/api/admin/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
      toast({
        title: "Карточка добавлена",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFormData({ name: "", body: "" });
      setImage(null); // Сбрасываем файл
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Ошибка добавления карточки"
      );
      toast({
        title: "Ошибка",
        description:
          error.response?.data?.message || "Не удалось добавить карточку",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    await logoutHandler(); // Вызываем logoutHandler
    navigate("/"); // Переадресация на главную страницу
  };

  return (
    <Box maxW="800px" mx="auto" mt="40px">
      <Flex justifyContent="space-between" alignItems="center" mb="6">
        <Heading as="h1" size="lg">
          Админ Панель
        </Heading>
        <Button colorScheme="red" onClick={handleLogout}>
          Выйти
        </Button>
      </Flex>
      <Text fontSize="xl" mb="4" fontWeight="bold">
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
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Обработчик выбора файла
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
