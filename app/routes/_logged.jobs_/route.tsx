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
  Tabs,
  DatePicker,
  Space,
  Row,
  Col,
  Tooltip
} from 'antd'
const { Title, Text } = Typography
const { TabPane } = Tabs
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import JobSheetPDF from './JobSheetPDF'
import { JobSheetTooltips } from './JobSheetTooltips'

export default function JobManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [rollerBlindForm] = Form.useForm()
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
      rollerBlindForm.resetFields()
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

  const handleRollerBlindSubmit = async (values) => {
    try {
      const formattedJobSheet = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      }
      setPreviewData(formattedJobSheet)
    } catch (error) {
      message.error('Failed to create job sheet')
    }
  }

  const handleConfirmJobSheet = async () => {
    try {
      await createJobSheet({
        data: {
          ...previewData,
          category: 'rollerBlinds',
        },
      })
      message.success('New roller blind job sheet created')
      setPreviewData(null)
      rollerBlindForm.resetFields()
    } catch (error) {
      message.error('Failed to save job sheet')
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
          <Form form={rollerBlindForm} onFinish={handleRollerBlindSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Tooltip title={JobSheetTooltips.customerName}>
                  <Form.Item
                    name="customerName"
                    label="NAME"
                    rules={[{ required: true, message: 'Please enter customer name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title={JobSheetTooltips.salesRep}>
                  <Form.Item
                    name="salesRep"
                    label="REP"
                    rules={[{ required: true, message: 'Please enter sales rep name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title={JobSheetTooltips.date}>
                  <Form.Item
                    name="date"
                    label="DATE"
                    rules={[{ required: true, message: 'Please select a date' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Tooltip title={JobSheetTooltips.roomNumber}>
                  <Form.Item
                    name="roomNumber"
                    label="ROOM"
                    rules={[{ required: true, message: 'Please enter room number' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={4}>
                <Tooltip title={JobSheetTooltips.tube}>
                  <Form.Item
                    name="tube"
                    label="TUBE"
                    rules={[{ required: true, message: 'Please enter tube' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={4}>
                <Tooltip title={JobSheetTooltips.width}>
                  <Form.Item
                    name="width"
                    label="WIDTH"
                    rules={[{ required: true, message: 'Please enter width' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={4}>
                <Tooltip title={JobSheetTooltips.drop}>
                  <Form.Item
                    name="drop"
                    label="DROP"
                    rules={[{ required: true, message: 'Please enter drop' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={4}>
                <Tooltip title={JobSheetTooltips.fixing}>
                  <Form.Item
                    name="fixing"
                    label="FIXING"
                    rules={[{ required: true, message: 'Please enter fixing' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={4}>
                <Tooltip title={JobSheetTooltips.baseFinish}>
                  <Form.Item
                    name="baseFinish"
                    label="BASE FINISH"
                    rules={[{ required: true, message: 'Please enter base finish' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Tooltip title={JobSheetTooltips.rollType}>
                  <Form.Item
                    name="rollType"
                    label="ROLL TYPE"
                    rules={[{ required: true, message: 'Please enter roll type' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={6}>
                <Tooltip title={JobSheetTooltips.fabric}>
                  <Form.Item
                    name="fabric"
                    label="FABRIC"
                    rules={[{ required: true, message: 'Please enter fabric' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={6}>
                <Tooltip title={JobSheetTooltips.bracketType}>
                  <Form.Item
                    name="bracketType"
                    label="BRACKET"
                    rules={[{ required: true, message: 'Please enter bracket type' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={6}>
                <Tooltip title={JobSheetTooltips.controlType}>
                  <Form.Item
                    name="controlType"
                    label="CONTROL TYPE"
                    rules={[{ required: true, message: 'Please enter control type' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Tooltip title={JobSheetTooltips.controlSide}>
                  <Form.Item
                    name="controlSide"
                    label="CONTROL SIDE"
                    rules={[{ required: true, message: 'Please select control side' }]}
                  >
                    <Select>
                      <Select.Option value="left">Left</Select.Option>
                      <Select.Option value="right">Right</Select.Option>
                    </Select>
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title={JobSheetTooltips.controlColour}>
                  <Form.Item
                    name="controlColour"
                    label="CONTROL COLOUR"
                    rules={[{ required: true, message: 'Please enter control colour' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title={JobSheetTooltips.chainLength}>
                  <Form.Item
                    name="chainLength"
                    label="CHAIN LENGTH"
                    rules={[{ required: true, message: 'Please enter chain length' }]}
                  >
                    <Input />
                  </Form.Item>
                </Tooltip>
              </Col>
            </Row>
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
