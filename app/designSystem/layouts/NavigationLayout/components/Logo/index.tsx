import { useNavigate } from '@remix-run/react'
import { Flex, Typography } from 'antd'
import React, { ImgHTMLAttributes, useState } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({
  height = 40,
  isLabel = false,
  style,
  ...props
}) => {
  const router = useNavigate()
  const [imgSrc, setImgSrc] = useState("https://example.com/new-logo.png")

  const goTo = (url: string) => {
    router(url)
  }

  const handleImageError = () => {
    console.error("Primary logo image failed to load. Using fallback.")
    setImgSrc("https://i.imgur.com/2dcDGIE.png")
  }

  return (
    <Flex align="center" gap={10} onClick={() => goTo('/home')}>
      <img
        src={imgSrc}
        {...props}
        alt="Logo"
        height={height}
        style={{
          borderRadius: '5px',
          cursor: 'pointer',
          objectFit: 'contain',
          width: 'auto',
          maxHeight: `${height}px`,
          ...style,
        }}
        onError={handleImageError}
      />
      {isLabel && (
        <Typography.Title level={4} style={{ margin: '0px' }}>
          AC B
        </Typography.Title>
      )}
    </Flex>
  )
}
