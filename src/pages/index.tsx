import { Center, Heading, Text, Input, VStack } from "@chakra-ui/react";
import moment from "moment";
import type { NextPage } from "next";
import React, { useCallback, useState } from "react";
import InputMask from "react-input-mask";

const Home: NextPage = () => {
  const [input, setInput] = useState<string>();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (value.length === 5) {
        setInput(value);
      }
    },
    []
  );

  const handleCalculateTimeToLeave = useCallback(() => {
    const value = moment(input, "HH:mm")
      .add("9", "hours")
      .add("48", "minutes")
      .format("HH:mm");

    console.log("horas", value);
  }, [input]);

  return (
    <Center height="100vh">
      <VStack spacing="1rem">
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

        {handleCalculateTimeToLeave()}
      </VStack>
    </Center>
  );
};

export default Home;
