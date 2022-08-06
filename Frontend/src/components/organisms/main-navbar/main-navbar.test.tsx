import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MainNavbar } from './main-navbar'
import { faker } from '@faker-js/faker'
import { Image } from '@/components/atoms'
import { mediaQueryMock } from '@/mocks/media-query'
import { resizeWindow } from '@/mocks/resize-window'

const renderedComponent = () => {
  return render(
    <MainNavbar
      menuItems={[
        { label: 'Example item 1', onClick: () => ({}) },
        { label: 'Example item 2', onClick: () => ({}) },
      ]}
      logo={<Image src={faker.image.image()} width={100} height={50} title="logo" />}
    />,
  )
}

describe('MainNavbar', () => {
  it('when the screen size is desktop, the logo must be rendered and the hamburguer menu must not be rendered', async () => {
    // Given
    mediaQueryMock('desktop')
    resizeWindow('desktop')

    const { container } = renderedComponent()

    // When
    const renderedLogo = container.querySelector('img[title="logo"]')
    const renderedDropdownHamburgerComponent = screen.queryByTestId('DropdownHamburger')

    // Then
    expect(renderedLogo).toBeInTheDocument()
    expect(renderedDropdownHamburgerComponent).toBeNull()
  })

  it('when the screen size is mobile, the hamburguer menu and the logo must be rendered', async () => {
    // Given
    mediaQueryMock('mobile')
    resizeWindow('mobile')
    const { container } = renderedComponent()

    // When
    const renderedDropdownHamburgerComponent = screen.getByTestId('DropdownHamburger')
    const renderedLogo = container.querySelector('img[title="logo"]')

    // Then
    await waitFor(() => {
      expect(renderedDropdownHamburgerComponent).toBeInTheDocument()
      expect(renderedLogo).toBeInTheDocument()
    })
  })
})
