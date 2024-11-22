import React, { useState, useEffect } from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axiosInstance from "../../services/axiosInstance";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/card");
      const updatedImages = response.data.map((card) => ({
        ...card,
        img: `http://localhost:3000/images/${card.img}`,
      }));
      setImages(updatedImages);
    } catch (error) {
      console.error("Ошибка загрузки карточек:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + images.length) % images.length;
      visibleImages.push(images[index]);
    }
    return visibleImages;
  };

  const calculatePosition = (index) => {
    const offset = index - 2;
    return offset * 220;
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
      height="70vh"
      overflow="hidden"
      position="relative"
      bg="#738595"
      display="flex"
      justifyContent="center"
    >
      <Box
        position="relative"
        width="95%"
        height="80%"
        bg="linear-gradient(to bottom right, #738595, #1E2022)"
        borderRadius="20px"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="absolute"
          left="5%"
          top="50%"
          transform="translateY(-50%)"
          width="20%"
          padding="20px"
          textAlign="left"
          fontFamily="'Cursive', 'Georgia', serif"
          fontSize="1.5rem"
          color="#738595"
          zIndex="20"
          backgroundColor="#1E2022"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        >
          <Text
            style={{
              fontFamily: "Montserrat",
              color: "#e4e4e4",
            }}
          >
            <blockquote>
              <em>
                В мире нет ничего совершенно ошибочного — даже сломанные часы
                дважды в сутки показывают точное время.
              </em><br /> <br />
              <cite>— Джейсон Стейтем</cite>
            </blockquote>
          </Text>
        </Box>

        <Flex justify="center" align="center" position="relative" height="100%">
          {getVisibleImages().map((image, index) => {
            const position = calculatePosition(index);
            const isCenter = index === 2;

            return (
              <motion.div
                key={image.id}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${position}px)`,
                  transform: "translateX(-50%)",
                  width: "200px",
                  height: "280px",
                  zIndex: isCenter ? 10 : 5,
                }}
                initial={{
                  scale: 0.9,
                  opacity: 0.4,
                }}
                animate={{
                  scale: isCenter ? 1.2 : 0.9,
                  opacity: isCenter ? 1 : 0.4,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                onClick={() => {
                  // При клике на карточку меняем текущий индекс
                  setCurrentIndex(index + currentIndex - 2);
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
                  <Text mt={2} fontSize="lg" fontWeight="bold" color="gray.700">
                    {image.name || "Без названия"}
                  </Text>
                  <Text mt={1} fontSize="sm" color="gray.500">
                    {image.body || "Описание отсутствует"}
                  </Text>
                </Flex>
              </motion.div>
            );
          })}
        </Flex>

        {/* Стрелки для переключения карточек */}
        <Flex
          position="absolute"
          top="50%"
          left="10px"
          transform="translateY(-50%)"
          zIndex="10"
          gap="10px"
          direction="column"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/60/60775.png"
            alt="Left Arrow"
            boxSize="40px"
            cursor="pointer"
            onClick={handlePrev}
            _hover={{ transform: "scale(1.1)", transition: "transform 0.2s" }}
          />
        </Flex>

        <Flex
          position="absolute"
          top="50%"
          right="10px"
          transform="translateY(-50%)"
          zIndex="10"
          gap="10px"
          direction="column"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/60/60758.png"
            alt="Right Arrow"
            boxSize="40px"
            cursor="pointer"
            onClick={handleNext}
            _hover={{ transform: "scale(1.1)", transition: "transform 0.2s" }}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default GalleryPage;
