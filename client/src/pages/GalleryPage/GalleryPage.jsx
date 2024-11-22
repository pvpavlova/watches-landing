import React, { useState, useEffect } from "react";
import { Box, Image, Text, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axiosInstance from "../../services/axiosInstance"; // Ваш инстанс Axios

const GalleryPage = () => {
  const [images, setImages] = useState([]); // Храним карточки, загруженные из API
  const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущей центральной карточки
  const [loading, setLoading] = useState(true); // Индикатор загрузки данных

  // Функция для получения карточек из API
  const fetchImages = async () => {
    try {
      setLoading(true); // Включаем индикатор загрузки
      const response = await axiosInstance.get("/api/card"); // Получаем карточки с сервера
      setImages(response.data); // Сохраняем карточки в состояние
    } catch (error) {
      console.error("Ошибка загрузки карточек:", error);
    } finally {
      setLoading(false); // Отключаем индикатор загрузки
    }
  };

  // Загружаем карточки при первом рендере
  useEffect(() => {
    fetchImages();
  }, []);

  // Обработчики для кнопок переключения
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  // Расчёт позиции карточки
  const calculatePosition = (index) => {
    const offset = (index - currentIndex + images.length) % images.length;
    const centerOffset = offset - Math.floor(images.length / 2);
    return centerOffset * 350; // 350px — расстояние между карточками
  };

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
      overflow="hidden"
      position="relative"
      bg="gray.100"
      py="40px"
    >
      {/* Кнопки управления */}
      <Flex
        justify="space-between"
        align="center"
        position="absolute"
        width="100%"
        top="50%"
      >
        <Button
          onClick={handlePrev}
          position="absolute"
          left="20px"
          colorScheme="blue"
          zIndex="10"
          isDisabled={images.length === 0}
        >
          {"<"}
        </Button>
        <Button
          onClick={handleNext}
          position="absolute"
          right="20px"
          colorScheme="blue"
          zIndex="10"
          isDisabled={images.length === 0}
        >
          {">"}
        </Button>
      </Flex>

      {/* Сами карточки */}
      <Flex justify="center" align="center" position="relative" height="600px">
        {images.map((image, index) => {
          const position = calculatePosition(index);
          const isCenter = position === 0;

          return (
            <motion.div
              key={image.id}
              style={{
                position: "absolute",
                left: `calc(50% + ${position}px)`, // Расчёт позиции каждой карточки
                transform: "translateX(-50%)",
                width: "300px",
                height: "450px",
                zIndex: isCenter ? 10 : 5, // Центральная карточка выше остальных
              }}
              animate={{
                scale: isCenter ? 1.2 : 0.9, // Увеличиваем центральную карточку
                opacity: isCenter ? 1 : 0.6, // Уменьшаем прозрачность у боковых карточек
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
                <Image
                  src={image.img} // Используем поле `img` из базы данных
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
                <Text mt={2} fontSize="lg" fontWeight="bold" color="gray.700">
                  {image.name} {/* Используем поле `name` из базы данных */}
                </Text>
                <Text mt={1} fontSize="sm" color="gray.500">
                  {image.body} {/* Используем поле `body` из базы данных */}
                </Text>
              </Flex>
            </motion.div>
          );
        })}
      </Flex>
    </Box>
  );
};

export default GalleryPage;
