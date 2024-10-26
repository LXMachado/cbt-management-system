import React, { useState } from 'react';
import { Typography, Card, List, Button, Modal, Form, Input, Select, message } from 'antd';
import { Api } from '@/core/trpc';
import { PageLayout } from '@/designSystem';

const { Title } = Typography;

const teamRoles = ['Admin', 'Sales', 'Blind Manufacturing', 'Curtain Manufacturing', 'Installers', 'Scheduling'];

export default function Team() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form] = Form.useForm();

  const { data: teamMembers, isLoading, refetch } = Api.teamMember.findMany.useQuery();
  const { mutateAsync: createTeamMember } = Api.teamMember.create.useMutation();
  const { mutateAsync: updateTeamMember } = Api.teamMember.update.useMutation();
  const { mutateAsync: deleteTeamMember } = Api.teamMember.delete.useMutation();

  const showModal = (member = null) => {
    setEditingMember(member);
    form.setFieldsValue(member || {});
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingMember) {
        await updateTeamMember({ where: { id: editingMember.id }, data: values });
        message.success('Team member updated successfully');
      } else {
        await createTeamMember({ data: values });
        message.success('Team member added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      refetch();
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = (member) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this team member?',
      onOk: async () => {
        try {
          await deleteTeamMember({ where: { id: member.id } });
          message.success('Team member deleted successfully');
          refetch();
        } catch (error) {
          message.error('An error occurred while deleting the team member');
        }
      },
    });
  };

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Team Management</Title>
        <Button type="primary" onClick={() => showModal()} style={{ marginBottom: '20px' }}>
          Add Team Member
        </Button>

        {teamRoles.map((role) => (
          <Card title={role} key={role} style={{ marginBottom: '20px' }}>
            <List
              loading={isLoading}
              dataSource={teamMembers?.filter((member) => member.role === role)}
              renderItem={(member) => (
                <List.Item
                  actions={[
                    <Button onClick={() => showModal(member)}>Edit</Button>,
                    <Button danger onClick={() => handleDelete(member)}>Delete</Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={member.name}
                    description={`Email: ${member.email}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        ))}

        <Modal
          title={editingMember ? "Edit Team Member" : "Add Team Member"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select>
                {teamRoles.map((role) => (
                  <Select.Option key={role} value={role}>{role}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  );
}