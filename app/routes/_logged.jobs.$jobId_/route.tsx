import {
  Typography,
  Card,
  Space,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  List,
  Modal,
} from 'antd'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function JobDetailsPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()

  const [jobNotes, setJobNotes] = useState<Prisma.JobNoteGetPayload<{}>[]>([])
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedJobSheet, setSelectedJobSheet] = useState<any>(null)

  const {
    data: job,
    isLoading,
    refetch,
  } = Api.job.findUnique.useQuery({
    where: { id: jobId },
    include: {
      customer: true,
      product: true,
      status: true,
      jobSheets: true,
      jobSchedules: true,
      jobNotes: { include: { user: true } },
    },
  })

  const { data: jobSheet, refetch: refetchJobSheet } = Api.jobSheet.findUnique.useQuery(
    { where: { id: selectedJobSheet?.id } },
    { enabled: !!selectedJobSheet }
  )

  const { data: statuses } = Api.jobStatus.findMany.useQuery()

  const { mutateAsync: updateJob } = Api.job.update.useMutation()
  const { mutateAsync: createJobNote } = Api.jobNote.create.useMutation()
  const { mutateAsync: createJobSchedule } = Api.jobSchedule.create.useMutation()
  const { mutateAsync: updateJobSheet } = Api.jobSheet.update.useMutation()
  const { mutateAsync: deleteJobSheet } = Api.jobSheet.delete.useMutation()

  const handleStatusUpdate = async (newStatus: string) => {
    if (job) {
      await updateJob({
        where: { id: job.id },
        data: { statusId: newStatus },
      })
      refetch()
    }
  }

  const handleAddNote = async (values: { note: string }) => {
    if (job && user) {
      const newNote = await createJobNote({
        data: {
          note: values.note,
          jobId: job.id,
          userId: user.id,
        },
      })
      setJobNotes([...jobNotes, newNote])
      form.resetFields()
    }
  }

  const handleScheduleJob = async (values: {
    date: dayjs.Dayjs
    time: dayjs.Dayjs
  }) => {
    if (job && user) {
      await createJobSchedule({
        data: {
          scheduledDate: values.date.format('YYYY-MM-DD'),
          scheduledTime: values.time.format('HH:mm'),
          jobId: job.id,
          userId: user.id,
        },
      })
      refetch()
    }
  }

  const handleEditJobSheet = (sheet: any) => {
    setSelectedJobSheet(sheet)
    editForm.setFieldsValue(sheet)
    setIsEditModalVisible(true)
  }

  const handleUpdateJobSheet = async (values: any) => {
    if (selectedJobSheet) {
      await updateJobSheet({
        where: { id: selectedJobSheet.id },
        data: values,
      })
      setIsEditModalVisible(false)
      refetch()
      refetchJobSheet()
    }
  }

  const handleDeleteJobSheet = async (sheetId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this job sheet?',
      onOk: async () => {
        await deleteJobSheet({ where: { id: sheetId } })
        refetch()
      },
    })
  }

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  if (!job) {
    return <PageLayout layout="full-width">Job not found</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}
      >
        <Title level={2}>
          <i className="las la-clipboard-list"></i> Job Details
        </Title>
        <Paragraph>
          View and manage detailed information about this job.
        </Paragraph>

        <Card title="Job Information">
          <Space direction="vertical">
            <Text strong>Customer: </Text>
            <Text>{job.customer?.name}</Text>
            <Text strong>Product: </Text>
            <Text>{job.product?.name}</Text>
            <Text strong>Current Status: </Text>
            <Text>{job.status?.name}</Text>
          </Space>
        </Card>

        <Card title="Update Job Status">
          <Select
            style={{ width: 200 }}
            placeholder="Select new status"
            onChange={handleStatusUpdate}
            value={job.statusId || undefined}
          >
            {statuses?.map(status => (
              <Select.Option key={status.id} value={status.id}>
                {status.name}
              </Select.Option>
            ))}
          </Select>
        </Card>

        <Card title="Job Sheets">
          <List
            dataSource={job.jobSheets}
            renderItem={sheet => (
              <List.Item
                actions={[
                  <Button onClick={() => handleEditJobSheet(sheet)}>Edit</Button>,
                  <Button danger onClick={() => handleDeleteJobSheet(sheet.id)}>Delete</Button>
                ]}
              >
                <Space direction="vertical">
                  <Text strong>Sheet URL: </Text>
                  <a href={sheet.sheetUrl || '#'} target="_blank" rel="noopener noreferrer">
                    <i className="las la-file-alt"></i> Job Sheet
                  </a>
                  <Text strong>Details: </Text>
                  <Text>{sheet.details}</Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        <Card title="Job Schedule">
          {job.jobSchedules?.map(schedule => (
            <Text key={schedule.id}>
              Scheduled for: {schedule.scheduledDate} at{' '}
              {schedule.scheduledTime}
            </Text>
          ))}
          <Form
            onFinish={handleScheduleJob}
            layout="inline"
            style={{ marginTop: 16 }}
          >
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="time"
              rules={[{ required: true, message: 'Please select a time' }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Schedule Job
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title="Job Notes">
          <List
            dataSource={job.jobNotes}
            renderItem={note => (
              <List.Item>
                <Space direction="vertical">
                  <Text>{note.note}</Text>
                  <Text type="secondary">
                    By {note.user?.name} on{' '}
                    {dayjs(note.createdAt).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </Space>
              </List.Item>
            )}
          />
          <Form form={form} onFinish={handleAddNote} style={{ marginTop: 16 }}>
            <Form.Item
              name="note"
              rules={[{ required: true, message: 'Please enter a note' }]}
            >
              <Input.TextArea rows={4} placeholder="Add a new note" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Note
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Button onClick={() => navigate('/jobs')}>
          <i className="las la-arrow-left"></i> Back to Jobs
        </Button>
      </Space>

      <Modal
        title="Edit Job Sheet"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} onFinish={handleUpdateJobSheet} layout="vertical">
          <Form.Item
            name="sheetUrl"
            label="Sheet URL"
            rules={[{ required: true, message: 'Please enter the sheet URL' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="details"
            label="Details"
            rules={[{ required: true, message: 'Please enter the details' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Job Sheet
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
