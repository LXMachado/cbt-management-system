import React from 'react';
import { Form, Input, Select, DatePicker, Tooltip } from 'antd';
import { JobSheetTooltips } from './JobSheetTooltips';

type JobSheetFormProps = {
  name: (string | number)[];
  tooltips: typeof JobSheetTooltips;
};

const JobSheetForm: React.FC<JobSheetFormProps> = ({ name, tooltips }) => {
  return (
    <>
      <Form.Item
        name={[...name, 'customerName']}
        label={
          <Tooltip title={tooltips.customerName}>
            Customer Name
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter customer name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'salesRep']}
        label={
          <Tooltip title={tooltips.salesRep}>
            Sales Rep
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter sales rep name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'date']}
        label={
          <Tooltip title={tooltips.date}>
            Date
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please select a date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={[...name, 'roomNumber']}
        label={
          <Tooltip title={tooltips.roomNumber}>
            Room Number
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter room number' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'tube']}
        label={
          <Tooltip title={tooltips.tube}>
            Tube
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please select tube type' }]}
      >
        <Select>
          <Select.Option value="32mm">32mm</Select.Option>
          <Select.Option value="38mm">38mm</Select.Option>
          <Select.Option value="50mm">50mm</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[...name, 'width']}
        label={
          <Tooltip title={tooltips.width}>
            Width
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter width' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'drop']}
        label={
          <Tooltip title={tooltips.drop}>
            Drop
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter drop' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'fixing']}
        label={
          <Tooltip title={tooltips.fixing}>
            Fixing
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please select fixing type' }]}
      >
        <Select>
          <Select.Option value="ceiling">Ceiling Mount</Select.Option>
          <Select.Option value="wall">Wall Mount</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[...name, 'baseFinish']}
        label={
          <Tooltip title={tooltips.baseFinish}>
            Base Finish
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter base finish' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'rollType']}
        label={
          <Tooltip title={tooltips.rollType}>
            Roll Type
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please select roll type' }]}
      >
        <Select>
          <Select.Option value="standard">Standard Roll</Select.Option>
          <Select.Option value="reverse">Reverse Roll</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[...name, 'fabric']}
        label={
          <Tooltip title={tooltips.fabric}>
            Fabric
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter fabric type' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'bracketType']}
        label={
          <Tooltip title={tooltips.bracketType}>
            Bracket Type
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please select bracket type' }]}
      >
        <Select>
          <Select.Option value="standard">Standard</Select.Option>
          <Select.Option value="extended">Extended</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[...name, 'controlType']}
        label={
          <Tooltip title={tooltips.controlType}>
            Control Type
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please select control type' }]}
      >
        <Select>
          <Select.Option value="chain">Chain</Select.Option>
          <Select.Option value="motorized">Motorized</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[...name, 'controlSide']}
        label={
          <Tooltip title={tooltips.controlSide}>
            Control Side
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please select control side' }]}
      >
        <Select>
          <Select.Option value="left">Left</Select.Option>
          <Select.Option value="right">Right</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[...name, 'controlColour']}
        label={
          <Tooltip title={tooltips.controlColour}>
            Control Colour
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter control colour' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...name, 'chainLength']}
        label={
          <Tooltip title={tooltips.chainLength}>
            Chain Length
          </Tooltip>
        }
        rules={[{ required: true, message: 'Please enter chain length' }]}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default JobSheetForm;
