import { Logo } from '@/designSystem/layouts/NavigationLayout/components/Logo'
import { Flex, Typography } from 'antd'

const { Text, Title } = Typography

type Props = {
  title?: string
  description?: string
}

export const AppHeader: React.FC<Props> = ({ title = 'AC&B', description }) => {
  return (
    <Flex align="center" justify="space-between">
      <Flex align="center" gap={16}>
        <Logo />
        <Flex vertical>
          <Title level={3} style={{ margin: 0 }}>
            {title}
          </Title>
          {description && <Text type="secondary">{description}</Text>}
        </Flex>
      </Flex>
    </Flex>
  )
}
