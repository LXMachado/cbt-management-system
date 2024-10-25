import React, { useState, useCallback } from 'react'
import {
  Typography,
  Input,
  Button,
  Table,
  Modal,
  Form,
  Select,
  message,
  Tabs,
  DatePicker,
  Space,
  Row,
  Col,
  Tooltip,
  Collapse
} from 'antd'
const { Title, Text } = Typography
const { TabPane } = Tabs
const { Panel } = Collapse
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import JobSheetPDF from './JobSheetPDF'
import { JobSheetTooltips } from './JobSheetTooltips'
import JobSheetForm from './JobSheetForm'

export default function JobManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [rollerBlindItems, setRollerBlindItems] = useState([{ id: 1 }])
  const [previewData, setPreviewData] = useState(null)
  const navigate = useNavigate()

  const {
    data: jobs,
    isLoading,
    refetch,
  } = Api.job.findMany.useQuery({
    include: { customer: true, status: true },
  })

  const { data: customers } = Api.customer.findMany.useQuery()
  const { data: jobStatuses } = Api.jobStatus.findMany.useQuery()
  const { mutateAsync: createJob } = Api.job.create.useMutation()
  const { mutateAsync: updateJob } = Api.job.update.useMutation()
  const { mutateAsync: createJobSheet } = Api.jobSheet.create.useMutation()

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
        <a onClick={() => navigate(`/jobs/${text}`)}>{text}</a>
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

  const handleAddItem = useCallback(() => {
    setRollerBlindItems(prev => [...prev, { id: prev.length + 1 }])
  }, [])

  const handleRollerBlindSubmit = async (values) => {
    try {
      const formattedJobSheet = values.rollerBlinds.map(item => ({
        ...item,
        date: item.date.format('YYYY-MM-DD'),
      }))
      setPreviewData(formattedJobSheet)
    } catch (error) {
      message.error('Failed to create job sheet')
    }
  }

  const handleConfirmJobSheet = async () => {
    try {
      await Promise.all(previewData.map(item =>
        createJobSheet({
          data: {
            ...item,
            category: 'rollerBlinds',
          },
        })
      ))
      message.success('New roller blind job sheets created')
      setPreviewData(null)
      setRollerBlindItems([{ id: 1 }])
    } catch (error) {
      message.error('Failed to save job sheets')
    }
  }

  const handlePrintJobSheet = () => {
    window.print()
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

        <Table
          columns={columns}
          dataSource={filteredJobs}
          loading={isLoading}
          rowKey="id"
          style={{ marginTop: '20px' }}
        />

        <div style={{ marginTop: '40px' }}>
          <Title level={3}>ACAB ROLLER BLIND ACMEDA WORKSHEET</Title>
          <Form onFinish={handleRollerBlindSubmit} layout="vertical">
            <Collapse accordion>
              {rollerBlindItems.map((item, index) => (
                <Panel header={`Roller Blind Item ${index + 1}`} key={item.id}>
                  <JobSheetForm
                    name={['rollerBlinds', index]}
                    tooltips={JobSheetTooltips}
                  />
                </Panel>
              ))}
            </Collapse>
            <Form.Item>
              <Button type="dashed" onClick={handleAddItem} block>
                <i className="las la-plus"></i> Add Roller Blind Item
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Preview Job Sheet
              </Button>
            </Form.Item>
          </Form>

          {previewData && (
            <Modal
              title="Preview Job Sheet"
              visible={!!previewData}
              onCancel={() => setPreviewData(null)}
              width={1000}
              footer={[
                <Button key="print" onClick={handlePrintJobSheet}>
                  Print
                </Button>,
                <Button key="confirm" type="primary" onClick={handleConfirmJobSheet}>
                  Confirm and Save
                </Button>,
                <Button key="close" onClick={() => setPreviewData(null)}>
                  Close
                </Button>,
              ]}
            >
              <JobSheetPDF data={previewData} />
            </Modal>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
