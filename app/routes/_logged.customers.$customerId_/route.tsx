import React, { useState } from 'react'
import {
  Typography,
  Card,
  List,
  Input,
  Button,
  Space,
  Row,
  Col,
  Spin,
  Form,
  message,
} from 'antd'
import { Prisma } from '@prisma/client'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CustomerDetailsPage() {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const [newMessage, setNewMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isAddingMessage, setIsAddingMessage] = useState(false)
  const [form] = Form.useForm()
  const apiUtils = Api.useUtils()

  const { data: customer, isLoading, refetch } = Api.customer.findUnique.useQuery({
    where: { id: customerId },
    include: { jobs: true, user: true },
  })

  const { data: communicationLogs, refetch: refetchLogs } =
    Api.communicationLog.findMany.useQuery({
      where: { job: { customerId: customerId } },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })

  const { mutateAsync: createCommunicationLog } =
    Api.communicationLog.create.useMutation()

  const { mutateAsync: updateCustomer } = Api.customer.update.useMutation()

  const handleAddMessage = async () => {
    if (newMessage.trim()) {
      setIsAddingMessage(true)
      try {
        if (!customer.jobs[0]?.id) {
          throw new Error('No associated job found for this customer');
        }
        await createCommunicationLog({
          data: {
            message: newMessage,
            jobId: customer.jobs[0]?.id,
          },
        })
        setNewMessage('')
        refetchLogs()
        message.success('Message added to customer communication log')
      } catch (error) {
        console.error('Failed to add message:', error)
        message.error(`Failed to add message. ${error.message || 'Unknown error occurred'}`)
      } finally {
        setIsAddingMessage(false)
      }
    }
  }

  const handleUpdateCustomer = async (values) => {
    try {
      await updateCustomer({
        where: { id: customerId },
        data: values,
      })
      message.success('Customer updated successfully')
      setIsEditing(false)
      refetch()
    } catch (error) {
      message.error('Failed to update customer')
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!customer) {
    return (
      <PageLayout layout="full-width">
        <Title level={2}>Customer not found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={18} lg={16} xl={14}>
          <Title level={2}>Customer Details</Title>
          <Paragraph>
            View and manage customer information, communication history, and
            associated jobs.
          </Paragraph>

          <Card
            title={
              <Space>
                <i className="las la-user"></i> Customer Profile
              </Space>
            }
            style={{ marginBottom: 16 }}
            extra={
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            }
          >
            {isEditing ? (
              <Form
                form={form}
                initialValues={customer}
                onFinish={handleUpdateCustomer}
                layout="vertical"
              >
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
                    Save
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <>
                <Paragraph>
                  <strong>Customer ID:</strong> {customer.id}
                </Paragraph>
                <Paragraph>
                  <strong>Name:</strong> {customer.name}
                </Paragraph>
                <Paragraph>
                  <strong>Email:</strong> {customer.email}
                </Paragraph>
                <Paragraph>
                  <strong>Phone:</strong> {customer.phone}
                </Paragraph>
                <Paragraph>
                  <strong>Address:</strong> {customer.address}
                </Paragraph>
              </>
            )}
          </Card>

          <Card
            title={
              <Space>
                <i className="las la-comments"></i> Communication History
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              dataSource={communicationLogs}
              renderItem={(
                log: Prisma.CommunicationLogGetPayload<{
                  include: { user: true }
                }>,
              ) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${log.user?.name || 'Unknown'} - ${dayjs(
                      log.createdAt,
                    ).format('MMMM D, YYYY h:mm A')}`}
                    description={log.message}
                  />
                </List.Item>
              )}
            />
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input.TextArea
                rows={4}
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a new message..."
              />
              <Button
                type="primary"
                onClick={handleAddMessage}
                disabled={!newMessage.trim() || isAddingMessage}
                loading={isAddingMessage}
              >
                Add Message
              </Button>
            </Space>
          </Card>

          <Card
            title={
              <Space>
                <i className="las la-briefcase"></i> Associated Jobs
              </Space>
            }
          >
            <List
              dataSource={customer.jobs}
              renderItem={job => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      View Details
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={`Job ID: ${job.id}`}
                    description={`Created: ${dayjs(job.createdAt).format(
                      'MMMM D, YYYY',
                    )}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
