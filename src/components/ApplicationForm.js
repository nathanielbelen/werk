import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Textarea,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ApplicationForm({ application, submit, cancel }) {
  const [formData, setFormData] = useState({
    company: application?.company ?? '',
    position: application?.position ?? '',
    url: application?.url ?? '',
    subtitle: application?.subtitle ?? '',
    notes: application?.notes ?? '',
    cover_letter: application?.cover_letter ?? false,
    resume_number: application?.resume_number ?? 1,
    location: application?.location ?? '',
    stage: application?.stage ?? 0,
    status: application?.status ?? 0,
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
    submit(formData)
  }


  const commonProps = {
    formData,
    onChange: handleChange
  };
  return (
    <>

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
          options={{
            0: { text: 'waiting on response' },
            1: { text: 'phone screen' },
            2: { text: 'round 1 interview' },
            3: { text: 'round 2 interview' },
            4: { text: 'round 3 interview' },
            5: { text: 'round 4 interview' }
          }}
          {...commonProps} />
        <ControlledFormField
          type='select'
          label='Status'
          name='status'
          options={{
            '-2': { color: 'gray.100', text: 'assumed rejected' },
            '-1': { color: 'gray.100', text: 'rejected' },
            '0': { color: 'yellow.100', text: 'waiting on response' },
            '1': { color: 'green.100', text: 'interviewing' }
          }}
          {...commonProps} />
        <ControlledFormField type='input' label='Category' name='category' {...commonProps} />
        <Flex justifyContent={'center'} gap={'2'}>
          <Button variant='outline' onClick={cancel}>Cancel</Button>
          <Button type='submit' variant='solid'>Submit</Button>
        </Flex>
      </form>
      <Flex flexGrow={1} alignItems='center' justifyContent='center'></Flex>
    </>
  )
}

const ControlledFormField = ({ label, name, formData, value, options, onChange, isRequired, text, type }) => {
  return (
    <FormControl isRequired={isRequired} mb={2}>
      <FormLabel mb={0}>{label}</FormLabel>
      {type === 'select' && (
        <Select name={name} value={formData[name]} onChange={onChange}>
          {Array.isArray(options)
            ? options.map((option, idx) => (
              <option value={option} key={`${name}_option_${idx}`}>
                {option}
              </option>
            ))
            : Object.entries(options).map(([value, { text }], idx) => (
              <option value={value} key={`${name}_option_${idx}`}>
                {text}
              </option>
            ))}
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

