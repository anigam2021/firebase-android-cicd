import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from './';

describe("Validating Splash", () => {
    test("Validate should contain component", () => {
        const component = render(<Splash />)
        const inputNode = component.getByText("Healthy")
        expect(inputNode).toBeDefined()
    })
})