import React from 'react'
import TestUtils from 'react-dom/test-utils'

import { wrapStatelessComponent } from 'test/utils'
import StyleableFileInput from 'src/FileInput/StyleableFileInput'

describe('<StylableFileInput />', () => {
    const WrappedStyleableFileInput = wrapStatelessComponent(StyleableFileInput)

    it('renders the underlying input type="file" element', () => {
        const StyleableFileInputComponent =
            TestUtils.renderIntoDocument(<WrappedStyleableFileInput>click me</WrappedStyleableFileInput>)

        expect(TestUtils.findRenderedDOMComponentWithTag(StyleableFileInputComponent, 'input'))
            .toBeTruthy()
    })

    it('passes standard attributes to the underlying file input', () => {
        const StyleableFileInputComponent =
            TestUtils.renderIntoDocument(
                <WrappedStyleableFileInput multiple name='test'>
                    click me
                </WrappedStyleableFileInput>
            )

        const fileInput = TestUtils.findRenderedDOMComponentWithTag(StyleableFileInputComponent, 'input')
        expect(fileInput.hasAttribute('multiple')).toBeTruthy()
        expect(fileInput.getAttribute('name')).toBe('test')
    })
})
