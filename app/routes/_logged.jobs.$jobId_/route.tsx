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

  const { mutateAsync: deleteJobItem } = Api.jobItem.delete.useMutation()
  const { mutateAsync: createJobItem } = Api.jobItem.create.useMutation()

  const [jobNotes, setJobNotes] = useState<Array<Prisma.JobNoteGetPayload<{ include: { user: true } }>>>([])
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [isItemModalVisible, setIsItemModalVisible] = useState(false)
  const [selectedJobSheet, setSelectedJobSheet] = useState<{ id: string; sheetUrl: string } | null>(null)

  const {
    data: job,
    isLoading,
    refetch,
  } = Api.job.findUnique.useQuery({
    where: { id: jobId },
    include: {
      customer: true,
      jobItems: {
        include: { product: true }
      },
      status: true,
      jobSheets: true,
      jobSchedules: true,
      jobNotes: {
        include: { user: true }
      }
    },
  })

  const { data: jobSheet, refetch: refetchJobSheet } = Api.jobSheet.findUnique.useQuery(
    { where: { id: selectedJobSheet?.id } },
    { enabled: !!selectedJobSheet }
  )

  const { data: statuses } = Api.jobStatus.findMany.useQuery()
  const { data: products } = Api.product.findMany.useQuery()

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

  const handleEditJobSheet = (sheet: Prisma.JobSheetGetPayload<Record<string, never>>) => {
    setSelectedJobSheet(sheet)
    editForm.setFieldsValue(sheet)
    setIsEditModalVisible(true)
  }

  const handleUpdateJobSheet = async (values: Prisma.JobSheetUpdateInput) => {
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
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong>Customer: </Text>
            <Text>{job?.customer?.name}</Text>
            <Text strong>Items: </Text>
            <List
              dataSource={job?.jobItems}
              renderItem={(item: Prisma.JobItemGetPayload<{ include: { product: true } }>) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button 
                      key="delete" 
                      danger 
                      onClick={() => {
                        deleteJobItem({ where: { id: item.id } }).then(() => refetch());
                      }}
                    >
                      Delete
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={`${item.quantity}x ${item.product.name}`}
                    description={item.product.description}
                  />
                </List.Item>
              )}
            />
            <Button type="primary" onClick={() => setIsItemModalVisible(true)}>
              Add Item
            </Button>
            <Text strong>Current Status: </Text>
            <Text>{job?.status?.name}</Text>
          </Space>
        </Card>

        <Card title="Update Job Status">
          <Select
            style={{ width: 200 }}
            placeholder="Select new status"
            onChange={handleStatusUpdate}
            value={job?.statusId || undefined}
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
          dataSource={job?.jobSheets || []}
          renderItem={(sheet: Prisma.JobSheetGetPayload<{}>) => (
              <List.Item
                key={sheet.id}
                actions={[
                  <Button key="edit" onClick={() => handleEditJobSheet(sheet)}>Edit</Button>,
                  <Button key="delete" danger onClick={() => handleDeleteJobSheet(sheet.id)}>Delete</Button>
                ]}
              >
                <Space direction="vertical">
                  <Text strong>Sheet URL: </Text>
                  <a href={sheet.sheetUrl || '#'} target="_blank" rel="noopener noreferrer">
                    <i className="las la-file-alt"></i> Job Sheet
                  </a>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        <Card title="Job Schedule">
          {job?.jobSchedules?.map(schedule => (
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
            dataSource={job?.jobNotes}
            renderItem={(note: Prisma.JobNoteGetPayload<{ include: { user: true } }>) => (
              <List.Item key={note.id}>
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
        open={isEditModalVisible}
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

      <Modal
        title="Select Product"
        open={isProductModalVisible}
        onCancel={() => setIsProductModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={products}
          renderItem={(product) => (
            <List.Item key={product.id}
              actions={[
                <Button
                  type="primary"
                  onClick={async () => {
                    await updateJob({
                      where: { id: job.id },
                      data: { productId: product.id },
                    });
                    setIsProductModalVisible(false);
                    refetch();
                  }}
                >
                  Select
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={product.name}
                description={product.description}
              />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title="Add Item"
        open={isItemModalVisible}
        onCancel={() => setIsItemModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={(values) => {
            createJobItem({
              data: {
                jobId: job.id,
                productId: values.productId,
                quantity: values.quantity,
              },
            });
            setIsItemModalVisible(false);
            refetch();
          }}
        >
          <Form.Item
            name="productId"
            label="Product"
            rules={[{ required: true, message: 'Please select a product' }]}
          >
            <Select>
              {products?.map((product) => (
                <Select.Option key={product.id} value={product.id}>
                  {product.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
