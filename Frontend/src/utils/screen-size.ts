export const minimumScreenResolution = {
  desktop: { x: 1280, y: 1024 },
  tablet: { x: 768, y: 1024 },
  mobile: { x: 320, y: 568 },
}

export const screenSize = {
  desktop: `(min-width: ${minimumScreenResolution.desktop.x}px)`,
  mobile: `(max-width: ${minimumScreenResolution.tablet.x - 1}px)`,
  tablet: `(min-width: ${minimumScreenResolution.tablet.x}px)`,
  tabletOrMobile: `(max-width: ${minimumScreenResolution.desktop.x - 1}px)`,
}
