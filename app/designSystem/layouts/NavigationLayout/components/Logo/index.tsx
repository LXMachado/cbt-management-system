import { Flex, Typography } from 'antd'
import React, { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  isLabel?: boolean
}

export const Logo: React.FC<Props> = ({ isLabel = false, style, ...props }) => {
  const imgSrc = 'https://imgur.com/mSihrFB'

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    console.error('Logo image failed to load.', e)
  }

  return (
    <Flex align="center" gap={10}>
      <img
        src={'https://imgur.com/mSihrFB'}
        {...props}
        alt="Logo"
        style={{ objectFit: 'contain', height: '100%', width: 'auto' }}
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
