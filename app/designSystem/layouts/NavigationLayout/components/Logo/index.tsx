import { Flex, Typography } from 'antd'
import React, { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({ isLabel = false, style, ...props }) => {
  // Use the direct image URL by adding .png to the ID
  const imgSrc = 'https://i.imgur.com/mSihrFB.png'

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    console.error('Logo image failed to load.', e)
  }

  return (
    <Flex align="center" gap={10}>
      <img
        src={imgSrc}
        {...props}
        alt="Logo"
        style={{
          objectFit: 'contain',
          maxHeight: '50px', // Set a specific maxHeight to prevent it from becoming too large
          width: 'auto', // Let width adjust proportionally
          ...style, // Merge with any additional styles passed as props
        }}
        onError={handleImageError}
      />
      {isLabel && (
        <Typography.Title level={3} style={{ margin: '0px', fontSize: '24px' }}>
          AC&B
        </Typography.Title>
      )}
    </Flex>
  )
}
