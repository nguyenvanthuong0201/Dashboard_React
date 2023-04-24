import React from 'react'

const useDeviceDetect = () => {
  const [width, setWidth] = React.useState(window.innerWidth)
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return width <= 768
}

export default useDeviceDetect