import { Flex, Typography } from 'antd'
import React, { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({
  isLabel = false,
  style,
  ...props
}) => {
  const imgSrc = "https://newlogo.example.com/logo.png"

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Primary logo image failed to load. Using fallback.")
    e.currentTarget.src = "https://fallback.example.com/logo.png"
  }

  return (
    <Flex align="center" gap={10}>
      <img
        src={imgSrc}
        {...props}
        alt="Logo"
        style={{
          borderRadius: '5px',
          objectFit: 'contain',
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
