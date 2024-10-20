import { useState } from 'react'
import { Typography, Input, List, Card, Row, Col, Button, Modal, Form, message } from 'antd'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Prisma.ProductGetPayload<{}> | null>(null)
  const [form] = Form.useForm()

  const { data: products, isLoading, refetch } = Api.product.findMany.useQuery({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
  })

  const createProduct = Api.product.create.useMutation()
  const updateProduct = Api.product.update.useMutation()
  const deleteProduct = Api.product.delete.useMutation()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const showModal = (product?: Prisma.ProductGetPayload<{}>) => {
    setEditingProduct(product || null)
    form.setFieldsValue(product || {})
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingProduct) {
        await updateProduct.mutateAsync({
          where: { id: editingProduct.id },
          data: values,
        })
        message.success('Product updated successfully')
      } else {
        await createProduct.mutateAsync({ data: values })
        message.success('Product created successfully')
      }
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('An error occurred. Please try again.')
    }
  }

  const handleDelete = async (product: Prisma.ProductGetPayload<{}>) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await deleteProduct.mutateAsync({ where: { id: product.id } })
          message.success('Product deleted successfully')
          refetch()
        } catch (error) {
          message.error('An error occurred while deleting the product')
        }
      },
    })
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Product Catalog</Title>
        <Text>View and search for available curtain and blind products.</Text>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '24px' }}>
          <Input.Search
            placeholder="Search products"
            onSearch={handleSearch}
            style={{ width: '300px' }}
            allowClear
          />
          <Button type="primary" onClick={() => showModal()}>Create Product</Button>
        </div>

        {isLoading ? (
          <Text>Loading products...</Text>
        ) : (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={products}
            renderItem={(product: Prisma.ProductGetPayload<{}>) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f0f2f5',
                      }}
                    >
                      <i
                        className="las la-curtain"
                        style={{ fontSize: '64px', color: '#1890ff' }}
                      ></i>
                    </div>
                  }
                  actions={[
                    <Button onClick={() => showModal(product)}>Update</Button>,
                    <Button danger onClick={() => handleDelete(product)}>Delete</Button>,
                  ]}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <Row>
                        <Col span={24}>
                          <Text ellipsis>{product.description}</Text>
                        </Col>
                      </Row>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        )}

        <Modal
          title={editingProduct ? "Edit Product" : "Create Product"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please input the product name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input the product description!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
