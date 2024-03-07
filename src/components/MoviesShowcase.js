import { ChakraProvider } from "@chakra-ui/react";
import StackedImageAnimation from "./StackedImageAnimation";

function MoviesShowcase () {

  return (
    <ChakraProvider>
      <StackedImageAnimation />
    </ChakraProvider>
  )
}

export default MoviesShowcase;
