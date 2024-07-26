import React from "react";
import {render,fireEvent} from "@testing-library/react-native"
import Favorite_button from "../../../src/components/Favorite_button";

describe("favorite_button", ()=> {
    test("Favorite button render correctly",()=>{
        render(<Favorite_button isFavorite={false} onPress={() => {}}></Favorite_button>)
    })
      test("renders correctly when isFavorite is true", () => {
        const { getByTestId } = render(<Favorite_button isFavorite={true} onPress={() => {}} />);
        expect(getByTestId('favorite-button')).toBeTruthy();
      });
    
})