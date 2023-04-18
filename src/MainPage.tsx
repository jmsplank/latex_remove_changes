import {
    Button,
    Container,
    Flex,
    Heading,
    Textarea,
    VStack,
    useClipboard
} from "@chakra-ui/react"
import * as React from "react"
import { applyChangesToAll } from "./matches"

export const MainPage = () => {
    let [input, setInput] = React.useState<string>('')
    let [output, setOutput] = React.useState<string>('')
    const { onCopy, value, setValue, hasCopied } = useClipboard("");

    let handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value)
    }

    let handleSubmit = () => {
        var output: string = applyChangesToAll(input);
        setOutput(output);
        setValue(output);
    }

    return (
        <Container maxW='container.xl'>
            <br />
            <Heading>Approve Changes</Heading>
            <br />
            <Flex direction="row">
                <VStack w='full' p={4}>
                    <Textarea id="input" placeholder="Input" h='lg' value={input} onChange={handleInputChange} />
                    <Button w='full' onClick={handleSubmit}>Approve all changes</Button>
                </VStack>
                <VStack w='full' p={4}>
                    <Textarea id="output" placeholder="Output" h='lg' value={output} />
                    <Button w='full' onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
                </VStack>
            </Flex>
        </Container>
    )
}