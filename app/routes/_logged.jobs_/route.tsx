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
  Space,
  Upload
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useNavigate } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { UploadOutlined } from '@ant-design/icons'

export default function JobManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fileList, setFileList] = useState([])
  const navigate = useNavigate()
  const { mutateAsync: upload } = useUploadPublic()

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

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    try {
      const result = await upload({ file });
      onSuccess(result, file);
    } catch (err) {
      onError(err);
    }
  };

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };

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
          <Upload
            customRequest={handleUpload}
            onChange={handleChange}
            fileList={fileList}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload Job Sheet Image</Button>
          </Upload>
          {fileList.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <Title level={4}>Uploaded Job Sheets:</Title>
              {fileList.map((file, index) => (
                <div key={index}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
