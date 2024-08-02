import React from "react";
import {render} from "@testing-library/react-native"
import Card_button from "../../../src/components/Card_button";


  

  describe("card_button", ()=> {
    test('Card button renders correctly', () => {
       render(<Card_button name="Press me" addCart={() => { } } testID={undefined} />);
    });
  })