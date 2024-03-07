import { ChakraProvider } from "@chakra-ui/react";
import StackedImageAnimation from "./StackedImageAnimation";

function Bookshelf () {

  return (
    <ChakraProvider>
      <StackedImageAnimation />
    </ChakraProvider>
  )
}

export default Bookshelf;
