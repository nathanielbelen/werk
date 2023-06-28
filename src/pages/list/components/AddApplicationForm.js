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

export default function AddApplicationForm({ handleStop }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    url: "",
    subtitle: "",
    notes: "",
    cover_letter: false,
    resume_number: "",
    location: "",
    stage: "",
    status: "",
    category: ""
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
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
      <ControlledInput label='Company' name='company' {...commonProps} />
      <ControlledInput label='Position' name='position' {...commonProps} />
      <ControlledInput label='URL' name='url' {...commonProps} />
      <ControlledInput label='Subtitle' name='subtitle' {...commonProps} />
      <ControlledTextarea label='Notes' name='notes' {...commonProps} />
      <ControlledCheckbox
        label='Cover Letter'
        name='cover_letter'
        text='Include cover letter'
        {...commonProps} />
      <ControlledSelect
        label='Resume Number'
        name='resume_number'
        options={[1, 2, 3, 4, 5]}
        {...commonProps} />
      <ControlledInput label='Location' name='location' {...commonProps} />
      <ControlledSelect
        label='Stage'
        name='stage'
        options={[1, 2, 3, 4, 5]}
        {...commonProps} />
      <ControlledSelect
        label='Status'
        name='status'
        options={[1, 2, 3, 4, 5]}
        {...commonProps} />
      <ControlledInput label='Category' name='category' {...commonProps} />
      <Flex justifyContent={'center'} gap={'2'}>
        <Button type="submit" variant='solid'>Submit</Button>
        <Button variant='outline' onClick={handleStop}>Cancel</Button>
      </Flex>
    </form>
  )
}

const LabelledFormControl = ({ label, children }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {children}
    </FormControl>
  )
}

const ControlledSelect = ({ label, name, options, formData, onChange }) => {
  return (
    <LabelledFormControl label={label}>
      <Select name={name} value={formData[name]} onChange={onChange}>
        {options.map((option, idx) =>
          <option value={option} key={`${name}_option_${idx}`}>{option}</option>
        )}
      </Select>
    </LabelledFormControl>
  )
}

const ControlledInput = ({ label, name, onChange, formData }) => {
  return (
    <LabelledFormControl label={label}>
      <Input name={name} value={formData[name]} onChange={onChange} />
    </LabelledFormControl>
  )
}

const ControlledCheckbox = ({ label, name, text, onChange, formData }) => {
  return (
    <LabelledFormControl label={label}>
      <Checkbox name={name} checked={formData[name]} onChange={onChange}>
        {text}
      </Checkbox>
    </LabelledFormControl>
  )
}

const ControlledTextarea = ({ label, name, onChange, formData }) => {
  return (
    <LabelledFormControl label={label}>
      <Textarea name={name} value={formData[name]} onChange={onChange} />
    </LabelledFormControl>
  )
}

