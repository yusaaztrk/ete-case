import React from "react";
import Search_Bar from "../../../src/components/Search_Bar";
import { render } from "@testing-library/react-native";

describe("search_bar", ()=> {
    test('Card button renders correctly', () => {
       render(<Search_Bar onChangeText={() => {}}></Search_Bar>);
    });
  })