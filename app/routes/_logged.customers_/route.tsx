import React, { useState } from 'react'
import {
  Typography,
  Input,
  Button,
  Table,
  Space,
  Modal,
  Form,
  message,
} from 'antd'
import { Prisma, Customer } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CustomerProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const {
    data: customers,
    isLoading,
    refetch,
  } = Api.customer.findMany.useQuery({})
  const { mutateAsync: createCustomer } = Api.customer.create.useMutation()
  const { mutateAsync: deleteCustomer } = Api.customer.delete.useMutation()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const filteredCustomers = customers?.filter(
    customer =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateCustomer = async (values: any) => {
    try {
      await createCustomer({ data: values })
      message.success('Customer created successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create customer')
    }
  }


  const handleDeleteCustomer = async (id: string) => {
    try {
      await deleteCustomer({ where: { id } })
      message.success('Customer deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete customer')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Customer) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/customers/${record.id}`)}>
            View
          </Button>
          <Button onClick={() => navigate(`/customers/${record.id}`)}>
            Update
          </Button>
          <Button danger onClick={() => handleDeleteCustomer(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Customer Profiles</Title>
        <Text>Manage and browse customer information</Text>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Input.Search
            placeholder="Search by name or job ID"
            onSearch={handleSearch}
            style={{ width: 300 }}
            allowClear
          />
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            <i className="las la-plus"></i> Create New Customer
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          loading={isLoading}
          style={{ marginTop: '20px' }}
        />

        <Modal
          title="Create New Customer"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateCustomer} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Customer
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
