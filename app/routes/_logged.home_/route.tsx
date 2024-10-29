import React from 'react'
import { Typography, Row, Col, Card, Statistic, Button } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()

  // Fetch recent customers
  const { data: recentCustomers } = Api.customer.findMany.useQuery({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  // Fetch recent jobs
  const { data: recentJobs } = Api.job.findMany.useQuery({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { customer: true, status: true },
  })

  // Fetch total customers count
  const { data: totalCustomers } = Api.customer.count.useQuery({}) as {
    data: number
  }

  // Fetch total jobs count
  const { data: totalJobs } = Api.job.count.useQuery({}) as { data: number }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <Title level={2}>Dashboard</Title>
          </Col>
        </Row>
        <Text>
          Welcome to your operations dashboard. Here's a quick overview of your
          key metrics and recent activities.
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Total Customers"
                value={totalCustomers || 0}
                prefix={<i className="las la-users" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card>
              <Statistic
                title="Total Jobs"
                value={totalJobs || 0}
                prefix={<i className="las la-briefcase" />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} md={12}>
            <Card
              title="Recent Customers"
              extra={
                <Button onClick={() => navigate('/customers')}>View All</Button>
              }
            >
              {recentCustomers?.map(customer => (
                <div key={customer.id} style={{ marginBottom: '8px' }}>
                  <Text strong>{customer.name}</Text>
                  <br />
                  <Text type="secondary">
                    Added: {dayjs(customer.createdAt).format('MMMM D, YYYY')}
                  </Text>
                </div>
              ))}
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title="Recent Jobs"
              extra={
                <Button onClick={() => navigate('/jobs')}>View All</Button>
              }
            >
              {recentJobs?.map(job => (
                <div key={job.id} style={{ marginBottom: '8px' }}>
                  <Text strong>{job.customer?.name}</Text>
                  <br />
                  <Text type="secondary">Status: {job.status?.name}</Text>
                  <br />
                  <Text type="secondary">
                    Created: {dayjs(job.createdAt).format('MMMM D, YYYY')}
                  </Text>
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={8}>
            <Button
              type="primary"
              icon={<i className="las la-user-plus" />}
              onClick={() => navigate('/customers')}
              block
            >
              Create New Customer Profile
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              type="primary"
              icon={<i className="las la-plus-circle" />}
              onClick={() => navigate('/jobs')}
              block
            >
              Create New Job
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              type="primary"
              icon={<i className="las la-users" />}
              onClick={() => navigate('/team')}
              block
            >
              Team
            </Button>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
