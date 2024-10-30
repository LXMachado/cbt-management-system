import { Utility } from '@/core/helpers/utility'
import { MenuOutlined } from '@ant-design/icons'
import { useNavigate } from '@remix-run/react'
import { Avatar, Flex, Menu, Tag } from 'antd'
import { useUserContext } from '~/core/context'
import { useDesignSystem } from '~/designSystem/provider'
import { Theme } from '~/designSystem/theme/theme'
import { NavigationItem } from '../../types'

import { Logo } from '../Logo'

interface Props {
  keySelected?: string
  items: NavigationItem[]
}

export const Mobilebar: React.FC<Props> = ({ keySelected, items }) => {
  const router = useNavigate()

  const { user, checkRole } = useUserContext()
  const { isMobile } = useDesignSystem()

  if (!isMobile) {
    return <></>
  }

  // Ensure that user.name exists
  if (user && !user.name) {
    console.warn('User is defined but does not have a name.')
  }

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{
          backgroundColor: Theme.components?.Layout?.headerBg || '#fff', // Provide fallback value for background color
          borderBottom: '1px solid #ccc', // Replace with a static border value if Theme does not have headerBorderBottom
          padding: '0 8px', // Replacing className="px-2" with inline style
        }}
      >
        <Flex>
          {user && (
            <Flex>
              <Avatar
                src={'https://imgur.com/mSihrFB.png'}
                alt={user.name}
                size="small"
                onClick={() => router('/profile')}
                style={{ cursor: 'pointer' }}
              >
                {Utility.stringToInitials(user.name)}
              </Avatar>
            </Flex>
          )}

          <Logo height={40} />
        </Flex>

        <Flex align="center">
          {checkRole('ADMIN') && (
            <Tag color="red" bordered={false}>
              Admin
            </Tag>
          )}

          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={keySelected ? [keySelected] : []}
            style={{ width: 46 }}
            overflowedIndicator={<MenuOutlined />}
          />
        </Flex>
      </Flex>
    </>
  )
}
