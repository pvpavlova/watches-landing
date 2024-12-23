import React, { useState, useEffect } from "react";
import { Box, Image, Text, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axiosInstance from "../../services/axiosInstance";

const GalleryPage = () => {
  const [images, setImages] = useState([]); // Состояние для карточек
  const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущей карточки
  const [loading, setLoading] = useState(true); // Состояние загрузки

  // Функция загрузки карточек
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/card");
      const updatedImages = response.data.map((card) => ({
        ...card,
        img: `http://localhost:3000/images/${card.img}`, // Путь к изображениям
      }));
      setImages(updatedImages);
    } catch (error) {
      console.error("Ошибка загрузки карточек:", error);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем карточки при первом рендере
  useEffect(() => {
    fetchImages();
  }, []);

  // Функции переключения
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  // Получение списка 5 карточек для отображения
  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + images.length) % images.length; // Циклический индекс
      visibleImages.push(images[index]);
    }
    return visibleImages;
  };

  // Расчёт позиции карточки
  const calculatePosition = (index) => {
    const offset = index - 2; // Центральная карточка имеет offset = 0
    return offset * 350; // Расстояние между карточками
  };

  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh" bg="gray.100">
        <Text fontSize="xl" fontWeight="bold">
          Загрузка карточек...
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      width="100%"
      height="100vh" // Задаем высоту страницы
      overflow="hidden"
      position="relative"
      bg="gray.200"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/* Задний фон */}
      <Box
        position="relative"
        width="80%" // Ширина бежевого фона
        height="80%" // Высота бежевого фона
        bg="linear-gradient(to bottom, #f7ebe8, #f2d7c9)" // Бежевый фон с градиентом
        borderRadius="20px"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* Галерея карточек */}
        <Flex justify="center" align="center" position="relative" height="100%">
          {getVisibleImages().map((image, index) => {
            const position = calculatePosition(index);
            const isCenter = index === 2; // Центральная карточка — это третья в списке

            return (
              <motion.div
                key={image.id}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${position}px)`, // Позиция карточки
                  transform: "translateX(-50%)",
                  width: "300px",
                  height: "450px",
                  zIndex: isCenter ? 10 : 5, // Центральная карточка выше
                }}
                initial={{
                  scale: 0.9,
                  opacity: 0.4, // Новая карточка сразу принимает вид боковой
                }}
                animate={{
                  scale: isCenter ? 1.2 : 0.9, // Увеличиваем центральную карточку
                  opacity: isCenter ? 1 : 0.4, // Боковые карточки прозрачнее
                }}
                transition={{
                  duration: 0.5, // Плавность движения
                  ease: "easeInOut",
                }}
              >
                <Flex
                  direction="column"
                  align="center"
                  boxShadow="lg"
                  borderRadius="md"
                  overflow="hidden"
                  bg="white"
                  p={4}
                >
                  {/* Изображение карточки */}
                  <Image
                    src={image.img}
                    alt={image.name}
                    objectFit="cover"
                    borderRadius="md"
                    width="100%"
                    height="100%"
                    _hover={{
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  {/* Название карточки */}
                  <Text mt={2} fontSize="lg" fontWeight="bold" color="gray.700">
                    {image.name || "Без названия"}
                  </Text>
                  {/* Описание карточки */}
                  <Text mt={1} fontSize="sm" color="gray.500">
                    {image.body || "Описание отсутствует"}
                  </Text>
                </Flex>
              </motion.div>
            );
          })}
        </Flex>

        {/* Кнопки управления */}
        <Flex
          position="absolute"
          bottom="20px"
          right="20px"
          zIndex="10"
          gap="10px"
        >
          <Button
            onClick={handlePrev}
            bg="blue.500"
            color="white"
            size="lg"
            borderRadius="full"
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)"
            _hover={{ bg: "blue.400", transform: "scale(1.1)" }}
            _active={{ bg: "blue.600" }}
            isDisabled={images.length === 0}
          >
            {"◀"}
          </Button>
          <Button
            onClick={handleNext}
            bg="blue.500"
            color="white"
            size="lg"
            borderRadius="full"
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)"
            _hover={{ bg: "blue.400", transform: "scale(1.1)" }}
            _active={{ bg: "blue.600" }}
            isDisabled={images.length === 0}
          >
            {"▶"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default GalleryPage;
