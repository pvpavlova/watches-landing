import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Flex,
  Text,
  Heading,
  Image,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const AdminPage = ({ logoutHandler }) => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [pools, setPools] = useState([]);  // Храним карточки

  const navigate = useNavigate();
  const toast = useToast();

  const fetchPools = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/pools");
      setPools(response.data);
    } catch (error) {
      toast({
        title: "Ошибка загрузки данных",
        description: "Не удалось загрузить карточки",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchPools(); // Загружаем карточки при монтировании компонента
  }, []);

  const handleDownload = (imgPath) => {
    // Создаем ссылку для скачивания
    const link = document.createElement("a");
    link.href = `http://localhost:5173/uploads/${imgPath}`;
    link.download = imgPath; // Указываем имя файла для скачивания
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box maxW="1000px" mx="auto" mt="40px">
      <Flex justifyContent="space-between" alignItems="center" mb="6">
        <Heading as="h1" size="lg">Админ Панель</Heading>
        <Button colorScheme="red" onClick={async () => {
          await logoutHandler();
          navigate("/");
        }}>Выйти</Button>
      </Flex>

      <Text fontSize="xl" mb="4" fontWeight="bold">Добавление новой карточки</Text>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("body", formData.body);
        if (image) {
          data.append("img", image);
        }

        try {
          await axiosInstance.post("/api/admin/add", data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          setFormData({ name: "", body: "" });
          setImage(null);
          fetchPools();
          toast({ title: "Карточка добавлена", status: "success", duration: 3000, isClosable: true });
        } catch (error) {
          toast({ title: "Ошибка", description: "Не удалось добавить карточку", status: "error", duration: 3000, isClosable: true });
        }
      }}>
        <Flex direction="column" gap="4">
          <Input name="name" placeholder="Название" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Textarea name="body" placeholder="Описание" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} />
          <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <Button type="submit" colorScheme="blue">Добавить карточку</Button>
        </Flex>
      </form>

      <Heading as="h2" size="md" mt="8" mb="4">Все заказы пользователей</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing="6">
        {pools.map((pool) => (
          <Box key={pool.id} p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
            <Image
              src={`http://localhost:3000/uploads/${pool.userImg}`}
              alt={pool.userName}
              mb="4"
              borderRadius="lg"
              objectFit="cover"
              maxH="200px"
            />
            <Text fontWeight="bold">{pool.userName}</Text>
            <Text>Email: {pool.userEmail}</Text>
            <Text>Телефон: {pool.userPhone}</Text>
            <Button mt="2" colorScheme="teal" onClick={() => handleDownload(pool.userImg)}>
              Скачать изображение
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminPage;
