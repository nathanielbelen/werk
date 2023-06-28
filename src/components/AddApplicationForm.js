import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function AddApplicationForm({ handleStop, application }) {
  const [formData, setFormData] = useState({
    company: application?.company ?? '',
    position: application?.position ?? '',
    url: application?.url ?? '',
    subtitle: application?.subtitle ?? '',
    notes: application?.notes ?? '',
    cover_letter: application?.cover_letter ?? false,
    resume_number: application?.resume_number ?? '',
    location: application?.location ?? '',
    stage: application?.stage ?? '',
    status: application?.status ?? '',
    category: application?.category ?? ''
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const commonProps = {
    formData,
    onChange: handleChange
  };
  return (
    <form onSubmit={handleSubmit}>
      <ControlledFormField type='input' label='Company' name='company' {...commonProps} isRequired />
      <ControlledFormField type='input' label='Position' name='position' {...commonProps} isRequired />
      <ControlledFormField type='input' label='URL' name='url' {...commonProps} />
      <ControlledFormField type='input' label='Subtitle' name='subtitle' {...commonProps} />
      <ControlledFormField type='textarea' label='Notes' name='notes' {...commonProps} />
      <ControlledFormField
        type='checkbox'
        label='Cover Letter'
        name='cover_letter'
        text='Include cover letter'
        {...commonProps} />
      <ControlledFormField
        type='select'
        label='Resume Number'
        name='resume_number'
        options={[1, 2, 3, 4, 5]}
        {...commonProps} />
      <ControlledFormField type='input' label='Location' name='location' {...commonProps} />
      <ControlledFormField
        type='select'
        label='Stage'
        name='stage'
        options={[1, 2, 3, 4, 5]}
        {...commonProps} />
      <ControlledFormField
        type='select'
        label='Status'
        name='status'
        options={[1, 2, 3, 4, 5]}
        {...commonProps} />
      <ControlledFormField type='input' label='Category' name='category' {...commonProps} />
      <Flex justifyContent={'center'} gap={'2'}>
        <Button type='submit' variant='solid'>Submit</Button>
        <Button variant='outline' onClick={handleStop}>Cancel</Button>
      </Flex>
    </form>
  )
}

const ControlledFormField = ({ label, name, formData, value, options, onChange, isRequired, text, type }) => {
  return (
    <FormControl isRequired={isRequired} mb={2}>
      <FormLabel mb={0}>{label}</FormLabel>
      {type === 'select' && (
        <Select name={name} value={formData[name]} onChange={onChange}>
          {options.map((option, idx) =>
            <option value={option} key={`${name}_option_${idx}`}>{option}</option>
          )}
        </Select>
      )}
      {type === 'input' && (
        <Input name={name} value={formData[name]} onChange={onChange} />
      )}
      {type === 'checkbox' && (
        <Checkbox name={name} checked={formData[name]} onChange={onChange}>
          {text}
        </Checkbox>
      )}
      {type === 'textarea' && (
        <Textarea name={name} value={formData[name]} onChange={onChange} />
      )}
    </FormControl>
  );
};

