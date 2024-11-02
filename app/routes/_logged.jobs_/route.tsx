import React, { useState } from 'react'
import {
  Typography,
  Input,
  Button,
  Table,
  Modal,
  Form,
  Select,
  message,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useNavigate } from '@remix-run/react'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function JobManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigate = useNavigate()

  const {
    data: jobs,
    isLoading,
    refetch,
  } = Api.job.findMany.useQuery({
    include: { customer: true, status: true },
  })

  const [customerSearchText, setCustomerSearchText] = useState('')
  const { data: customers } = Api.customer.findMany.useQuery({
    where: {
      name: {
        contains: customerSearchText,
        mode: 'insensitive'
      }
    }
  })
  const { data: jobStatuses } = Api.jobStatus.findMany.useQuery()
  const { mutateAsync: createJob } = Api.job.create.useMutation()
  const { mutateAsync: updateJob } = Api.job.update.useMutation()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const filteredJobs = jobs?.filter(
    job =>
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const columns = [
    {
      title: 'Job ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (
        <Button type="link" onClick={() => navigate(`/jobs/${text}`)} onKeyPress={(e) => e.key === 'Enter' && navigate(`/jobs/${text}`)}>{text}</Button>
      ),
    },
    {
      title: 'Customer',
      dataIndex: ['customer', 'name'],
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: ['status', 'name'],
      key: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Button onClick={() => handleUpdateStatus(record)}>
          Update Status
        </Button>
      ),
    },
  ]

  const handleCreateJob = async (values: any) => {
    try {
      await createJob({
        data: {
          customerId: values.customerId,
          statusId: values.statusId,
        },
      })
      message.success('Job created successfully')
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      message.error('Failed to create job')
    }
  }

  const [updateStatusForm] = Form.useForm()

  const handleUpdateStatus = (job: any) => {
    Modal.info({
      title: 'Update Job Status',
      content: (
        <Form form={updateStatusForm}>
          <Form.Item
            name="statusId"
            label="New Status"
            rules={[{ required: true, message: 'Please select a new status' }]}
          >
            <Select>
              {jobStatuses?.map(status => (
                <Select.Option key={status.id} value={status.id}>
                  {status.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ),
      okText: 'Update',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const values = await updateStatusForm.validateFields()
          await updateJob({
            where: { id: job.id },
            data: { statusId: values.statusId },
          })
          message.success('Job status updated successfully')
          refetch()
          Modal.destroyAll()
        } catch (error) {
          message.error('Failed to update job status')
        }
      },
      onCancel: () => {
        Modal.destroyAll()
      },
    })
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-tasks"></i> Job Management
        </Title>
        <Text>View, create, and manage jobs for your customers.</Text>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Input.Search
            placeholder="Search by Job ID or Customer Name"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            <i className="las la-plus"></i> Create New Job
          </Button>
        </div>

        <Modal
          title="Create New Job"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleCreateJob}>
            <Form.Item
              name="customerId"
              label="Customer"
              rules={[{ required: true, message: 'Please select a customer' }]}
            >
              <Select
                showSearch
                filterOption={false}
                onSearch={(value) => setCustomerSearchText(value)}
                placeholder="Type to search customers"
              >
                {customers?.map(customer => (
                  <Select.Option key={customer.id} value={customer.id}>
                    {customer.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="statusId"
              label="Initial Status"
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select>
                {jobStatuses?.filter((status, index, self) => 
                  index === self.findIndex(s => s.name === status.name)
                ).map(status => (
                  <Select.Option key={status.id} value={status.id}>
                    {status.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Job
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table
          columns={columns}
          dataSource={filteredJobs}
          loading={isLoading}
          rowKey="id"
          style={{ marginTop: '20px' }}
        />
      </div>
    </PageLayout>
  )
}
