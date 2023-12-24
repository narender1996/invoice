import { Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Center
      flexDirection="column"
      gap={2}
      width="100vw"
      height={"100vh"}
      overflow="auto"
    >
      <Button
        colorScheme="blue"
        as={Link}
        to={"/generate-invoice"}
        width="240px"
      >
        Generate Invoice
      </Button>
      <Button colorScheme="blue" as={Link} to={"/generate-coc"} width="240px">
        Generate COC
      </Button>
    </Center>
  );
};

export default Home;
