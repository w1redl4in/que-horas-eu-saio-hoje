import { Center, Heading, Text, Input, VStack } from "@chakra-ui/react";
import moment from "moment";
import type { NextPage } from "next";
import React, { useCallback, useState } from "react";
import InputMask from "react-input-mask";

const Home: NextPage = () => {
  const [input, setInput] = useState<string | undefined>(undefined);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (value.length < 5) {
        setInput(undefined);
      }

      if (value.length === 5) {
        setInput(value);
      }
    },
    []
  );

  const handleCalculateTimeToLeave = useCallback(() => {
    const dateOrError = moment(input, "HH:mm")
      .add("9", "hours")
      .add("48", "minutes")
      .format("HH:mm");

    if (dateOrError === "Invalid date") return "Insira uma hora válida";

    return `A hora de sair hoje é: ${dateOrError}`;
  }, [input]);

  const isInputValid = useCallback(() => {
    if (!input) return false;

    return !input.includes("_");
  }, [input]);

  return (
    <Center height="100vh">
      <VStack
        border="1px solid black"
        padding="5rem"
        borderRadius="0.5rem"
        spacing="1rem"
      >
        <Heading>Que horas eu saio hoje?</Heading>
        <Text textAlign="center">
          Hoje é {moment().format("DD/MM/YYYY - HH:mm")}
        </Text>

        <Input
          onChange={handleChange}
          textAlign="center"
          maxW="6rem"
          w="100%"
          as={InputMask}
          mask="**:**"
        />

        {isInputValid() && (
          <Text>
            <strong>{handleCalculateTimeToLeave()}</strong>
          </Text>
        )}
      </VStack>
    </Center>
  );
};

export default Home;
