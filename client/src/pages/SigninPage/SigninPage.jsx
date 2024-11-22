import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Heading,
} from '@chakra-ui/react';

export default function SigninPage({ loginHandler }) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    hashpass: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container maxW="sm" mt="8" p="6" boxShadow="md" borderRadius="lg" bg="white">
      <Heading as="h1" size="lg" textAlign="center" mb="6">
        Вход
      </Heading>
      <form onSubmit={(e) => loginHandler(e, formData, navigate)}>
        <FormControl id="email" mb="4" isRequired>
          <FormLabel>Ваш Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="password" mb="6" isRequired>
          <FormLabel>Ваш пароль</FormLabel>
          <InputGroup>
            <Input
              type={showPass ? 'text' : 'password'}
              name="hashpass"
              placeholder="Введите ваш пароль"
              value={formData.hashpass}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button
                variant="link"
                onClick={() => setShowPass((prev) => !prev)}
                fontSize="sm"
                colorScheme="blue"
              >
                {showPass ? 'Скрыть' : 'Показать'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          variant="solid"
          colorScheme="blue"
          type="submit"
          size="lg"
          width="full"
        >
          Войти
        </Button>
      </form>
    </Container>
  );
}
