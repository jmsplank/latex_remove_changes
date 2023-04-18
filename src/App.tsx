import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"
import { MainPage } from "./MainPage"

export const App = () => (
  <ChakraProvider theme={theme}>
    <MainPage />
  </ChakraProvider>
)
