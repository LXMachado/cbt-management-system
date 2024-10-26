import React from 'react';
import { Typography } from 'antd';
import { PageLayout } from '@/designSystem';
import { ErrorBoundary } from '@/designSystem/core/ErrorBoundary';

const { Title } = Typography;

export default function Team() {
  return (
    <PageLayout layout="full-width">
      <ErrorBoundary>
        <Title level={2}>Team</Title>
        <p>This is a placeholder for the Team page content.</p>
      </ErrorBoundary>
    </PageLayout>
  );
}
