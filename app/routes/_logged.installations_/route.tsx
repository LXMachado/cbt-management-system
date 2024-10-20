import React, { useState } from 'react'
import { Typography, List, Card, Progress, Modal, Input, message } from 'antd'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function InstallationTrackingPage() {
  const navigate = useNavigate()
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [selectedInstallation, setSelectedInstallation] = useState(null)
  const [progressUpdate, setProgressUpdate] = useState(0)

  const {
    data: installations,
    isLoading,
    refetch,
  } = Api.installation.findMany.useQuery({
    include: { job: { include: { customer: true, product: true } } },
  })

  const { mutateAsync: updateInstallation } =
    Api.installation.update.useMutation()

  const handleUpdateProgress = async () => {
    if (selectedInstallation) {
      try {
        await updateInstallation({
          where: { id: selectedInstallation.id },
          data: {
            completed: progressUpdate === 100,
            notes: `Progress updated to ${progressUpdate}%`,
          },
        })
        message.success('Installation progress updated successfully')
        refetch()
        setUpdateModalVisible(false)
      } catch (error) {
        message.error('Failed to update installation progress')
      }
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tools"></i> Installation Tracking
        </Title>
        <Paragraph>
          Monitor ongoing installations and update their progress to keep
          stakeholders informed.
        </Paragraph>

        {isLoading ? (
          <Text>Loading installations...</Text>
        ) : (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
            dataSource={installations}
            renderItem={installation => (
              <List.Item>
                <Card
                  title={`Installation for ${
                    installation.job?.customer?.name || 'Unknown Customer'
                  }`}
                  extra={
                    <a onClick={() => navigate(`/jobs/${installation.jobId}`)}>
                      View Job
                    </a>
                  }
                  hoverable
                >
                  <Paragraph>
                    <strong>Product:</strong>{' '}
                    {installation.job?.product?.name || 'N/A'}
                  </Paragraph>
                  <Paragraph>
                    <strong>Date:</strong>{' '}
                    {dayjs(installation.installationDate).format(
                      'MMMM D, YYYY',
                    )}
                  </Paragraph>
                  <Paragraph>
                    <strong>Status:</strong>{' '}
                    {installation.completed ? 'Completed' : 'In Progress'}
                  </Paragraph>
                  <Progress
                    percent={installation.completed ? 100 : 50}
                    status={installation.completed ? 'success' : 'active'}
                  />
                  <div style={{ marginTop: '16px' }}>
                    <a
                      onClick={() => {
                        setSelectedInstallation(installation)
                        setProgressUpdate(installation.completed ? 100 : 50)
                        setUpdateModalVisible(true)
                      }}
                    >
                      Update Progress
                    </a>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}

        <Modal
          title="Update Installation Progress"
          visible={updateModalVisible}
          onOk={handleUpdateProgress}
          onCancel={() => setUpdateModalVisible(false)}
        >
          <Input
            type="number"
            min={0}
            max={100}
            value={progressUpdate}
            onChange={e => setProgressUpdate(parseInt(e.target.value))}
            addonAfter="%"
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
