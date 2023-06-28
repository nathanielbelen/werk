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
import { useState } from 'react';

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

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Company</FormLabel>
        <Input name="company" value={formData.company} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Position</FormLabel>
        <Input name="position" value={formData.position} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>URL</FormLabel>
        <Input name="url" value={formData.url} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Subtitle</FormLabel>
        <Input name="subtitle" value={formData.subtitle} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Notes</FormLabel>
        <Textarea name="notes" value={formData.notes} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Cover Letter</FormLabel>
        <Checkbox name="cover_letter" checked={formData.cover_letter} onChange={handleChange}>
          Include cover letter
        </Checkbox>
      </FormControl>

      <FormControl>
        <FormLabel>Resume Number</FormLabel>
        <Select name="resume_number" value={formData.resume_number} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input name="location" value={formData.location} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Stage</FormLabel>
        <Select name="stage" value={formData.stage} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Status</FormLabel>
        <Select name="status" value={formData.status} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Input name="category" value={formData.category} onChange={handleChange} />
      </FormControl>

      <Flex justifyContent={'center'} gap={'2'}>
        <Button variant='solid'>Submit</Button>
        <Button variant='outline' onClick={handleStop}>Cancel</Button>
      </Flex>
    </form>
  )
}

const ControlledSelect = ({ label, name, onChange, options }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select name={name} value={formData[name]} onChange={onChange}>
        {options.map((option, idx) => {
          <option value={option}>option</option>
        })}
      </Select>
    </FormControl>
  )
}

const ControlledInput = ({ label, name, onChange }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input name={name} value={formData[name]} onChange={onChange} />
    </FormControl>
  )
}