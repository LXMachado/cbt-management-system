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
} from 'antd'
const { Title, Text } = Typography
const { TabPane } = Tabs
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function JobManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isJobSheetModalVisible, setIsJobSheetModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [jobSheetForm] = Form.useForm()
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
  const { data: jobSheets, refetch: refetchJobSheets } = Api.jobSheet.findMany.useQuery()

  const { mutateAsync: createJob } = Api.job.create.useMutation()
  const { mutateAsync: updateJob } = Api.job.update.useMutation()
  const { mutateAsync: createJobSheet } = Api.jobSheet.create.useMutation()
  const { mutateAsync: updateJobSheet } = Api.jobSheet.update.useMutation()
  const { mutateAsync: deleteJobSheet } = Api.jobSheet.delete.useMutation()

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
      form.resetFields()
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

  const [activeTab, setActiveTab] = useState('curtains')
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [selectedJobSheet, setSelectedJobSheet] = useState(null)

  const handleCreateJobSheet = () => {
    setIsJobSheetModalVisible(true)
  }

  const handleJobSheetSubmit = async (values) => {
    try {
      const formattedJobSheet = generateFormattedJobSheet(values)
      await createJobSheet({
        data: {
          ...formattedJobSheet,
          category: activeTab,
        },
      })
      message.success(`New ${activeTab} job sheet created`)
      setIsJobSheetModalVisible(false)
      jobSheetForm.resetFields()
      refetchJobSheets()
    } catch (error) {
      message.error('Failed to create job sheet')
    }
  }

  const generateFormattedJobSheet = (values) => {
    // Implement the formatting logic here
    return {
      ...values,
      formattedContent: JSON.stringify(values), // This is a placeholder, implement actual formatting
    }
  }

  const handleViewJobSheet = (jobSheet) => {
    setSelectedJobSheet(jobSheet)
    setIsViewModalVisible(true)
  }

  const handlePrintJobSheet = () => {
    window.print()
  }

  const handleSaveJobSheet = () => {
    // Implement PDF saving logic here
    message.success('Job sheet saved as PDF')
  }

  const handleEditJobSheet = async (id, values) => {
    try {
      await updateJobSheet({
        where: { id },
        data: values,
      })
      message.success('Job sheet updated successfully')
      refetchJobSheets()
    } catch (error) {
      message.error('Failed to update job sheet')
    }
  }

  const handleDeleteJobSheet = async (id) => {
    try {
      await deleteJobSheet({
        where: { id },
      })
      message.success('Job sheet deleted successfully')
      refetchJobSheets()
    } catch (error) {
      message.error('Failed to delete job sheet')
    }
  }

  const jobSheetColumns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Job ID',
      dataIndex: 'jobId',
      key: 'jobId',
    },
    {
      title: 'Sales Rep',
      dataIndex: 'salesRep',
      key: 'salesRep',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleViewJobSheet(record)}>View</Button>
          <Button onClick={() => handleEditJobSheet(record.id, record)}>Edit</Button>
          <Button danger onClick={() => handleDeleteJobSheet(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ]

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
          <Title level={3}>Job Sheets</Title>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Curtains" key="curtains">
              <Button onClick={handleCreateJobSheet} style={{ marginBottom: '20px' }}>
                Create Curtain Job Sheet
              </Button>
              <Table
                columns={jobSheetColumns}
                dataSource={jobSheets?.filter(sheet => sheet.category === 'curtains')}
                rowKey="id"
              />
            </TabPane>
            <TabPane tab="Blinds" key="blinds">
              <Button onClick={handleCreateJobSheet} style={{ marginBottom: '20px' }}>
                Create Blind Job Sheet
              </Button>
              <Table
                columns={jobSheetColumns}
                dataSource={jobSheets?.filter(sheet => sheet.category === 'blinds')}
                rowKey="id"
              />
            </TabPane>
            <TabPane tab="Tracks" key="tracks">
              <Button onClick={handleCreateJobSheet} style={{ marginBottom: '20px' }}>
                Create Track Job Sheet
              </Button>
              <Table
                columns={jobSheetColumns}
                dataSource={jobSheets?.filter(sheet => sheet.category === 'tracks')}
                rowKey="id"
              />
            </TabPane>
            <TabPane tab="Roller Blinds" key="rollerBlinds">
              <Button onClick={handleCreateJobSheet} style={{ marginBottom: '20px' }}>
                Create Roller Blind Job Sheet
              </Button>
              <Table
                columns={jobSheetColumns}
                dataSource={jobSheets?.filter(sheet => sheet.category === 'rollerBlinds')}
                rowKey="id"
              />
            </TabPane>
          </Tabs>
        </div>

        <Modal
          title="Create New Job"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateJob} layout="vertical">
            <Form.Item
              name="customerId"
              label="Customer"
              rules={[{ required: true, message: 'Please select a customer' }]}
            >
              <Select>
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
              rules={[
                { required: true, message: 'Please select an initial status' },
              ]}
            >
              <Select>
                {jobStatuses?.map(status => (
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

        <Modal
          title={`Create New ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Job Sheet`}
          visible={isJobSheetModalVisible}
          onCancel={() => setIsJobSheetModalVisible(false)}
          footer={null}
        >
          <Form form={jobSheetForm} onFinish={handleJobSheetSubmit} layout="vertical">
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true, message: 'Please enter customer name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="jobId"
              label="Job ID"
              rules={[{ required: true, message: 'Please enter job ID' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="salesRep"
              label="Sales Rep"
              rules={[{ required: true, message: 'Please enter sales rep name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            {activeTab === 'rollerBlinds' && (
              <>
                <Form.Item name="room" label="Room" rules={[{ required: true, message: 'Please enter room' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please enter type' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="tube" label="Tube" rules={[{ required: true, message: 'Please enter tube' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="width" label="Width" rules={[{ required: true, message: 'Please enter width' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="drop" label="Drop" rules={[{ required: true, message: 'Please enter drop' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="fixing" label="Fixing" rules={[{ required: true, message: 'Please enter fixing' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="baseFinish" label="Base Finish" rules={[{ required: true, message: 'Please enter base finish' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="rollType" label="Roll Type" rules={[{ required: true, message: 'Please enter roll type' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="fabric" label="Fabric" rules={[{ required: true, message: 'Please enter fabric' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="bracketType" label="Bracket Type" rules={[{ required: true, message: 'Please enter bracket type' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="controlType" label="Control Type" rules={[{ required: true, message: 'Please enter control type' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="controlSide" label="Control Side" rules={[{ required: true, message: 'Please select control side' }]}>
                  <Select>
                    <Select.Option value="left">Left</Select.Option>
                    <Select.Option value="right">Right</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="controlColour" label="Control Colour" rules={[{ required: true, message: 'Please enter control colour' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="chainLength" label="Chain Length" rules={[{ required: true, message: 'Please enter chain length' }]}>
                  <Input />
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Job Sheet
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="View Job Sheet"
          visible={isViewModalVisible}
          onCancel={() => setIsViewModalVisible(false)}
          footer={[
            <Button key="print" onClick={handlePrintJobSheet}>
              Print
            </Button>,
            <Button key="save" onClick={handleSaveJobSheet}>
              Save as PDF
            </Button>,
            <Button key="close" onClick={() => setIsViewModalVisible(false)}>
              Close
            </Button>,
          ]}
        >
          {selectedJobSheet && (
            <div>
              <p><strong>Customer Name:</strong> {selectedJobSheet.customerName}</p>
              <p><strong>Job ID:</strong> {selectedJobSheet.jobId}</p>
              <p><strong>Sales Rep:</strong> {selectedJobSheet.salesRep}</p>
              <p><strong>Date:</strong> {dayjs(selectedJobSheet.date).format('YYYY-MM-DD')}</p>
              {selectedJobSheet.category === 'rollerBlinds' && (
                <>
                  <p><strong>Room:</strong> {selectedJobSheet.room}</p>
                  <p><strong>Type:</strong> {selectedJobSheet.type}</p>
                  <p><strong>Tube:</strong> {selectedJobSheet.tube}</p>
                  <p><strong>Width:</strong> {selectedJobSheet.width}</p>
                  <p><strong>Drop:</strong> {selectedJobSheet.drop}</p>
                  <p><strong>Fixing:</strong> {selectedJobSheet.fixing}</p>
                  <p><strong>Base Finish:</strong> {selectedJobSheet.baseFinish}</p>
                  <p><strong>Roll Type:</strong> {selectedJobSheet.rollType}</p>
                  <p><strong>Fabric:</strong> {selectedJobSheet.fabric}</p>
                  <p><strong>Bracket Type:</strong> {selectedJobSheet.bracketType}</p>
                  <p><strong>Control Type:</strong> {selectedJobSheet.controlType}</p>
                  <p><strong>Control Side:</strong> {selectedJobSheet.controlSide}</p>
                  <p><strong>Control Colour:</strong> {selectedJobSheet.controlColour}</p>
                  <p><strong>Chain Length:</strong> {selectedJobSheet.chainLength}</p>
                </>
              )}
            </div>
          )}
        </Modal>
      </div>
    </PageLayout>
  )
}
