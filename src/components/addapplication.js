import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import { SmallAddIcon } from '@chakra-ui/icons'

export default function AddApplication() {

  // company, position, url, subtitle, notes, cover_letter, resume_number, location, stage, status, category

  const [adding, setAdding] = useState(false);
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

  if (adding) {
    return (
      <Flex
        borderRadius="lg"
        minHeight="100px"
        flexDirection={'column'}
        shadow='xs'
        borderStyle="none"
        marginBottom="4"
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box width='100%' p={10} mt={4}>
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

            <Button type="submit" mt={4}>
              Submit
            </Button>
          </form>
        </Box>
        <Flex justifyContent={'center'} gap={'2'}>
          <Button variant='solid'>Submit</Button>
          <Button variant='outline' onClick={() => { setAdding(false); }}>Cancel</Button>
        </Flex>
      </Flex>
    )
  }

  return (<Flex
    as={Button}
    flexDirection={'column'}
    borderRadius="lg"
    width="100%"
    minHeight="100px"
    shadow='xs'
    borderStyle="none"
    marginBottom="4"
    alignItems={'center'}
    justifyContent={'center'}
    onClick={() => { setAdding(true); }}
  >
    <SmallAddIcon />
  </Flex>)
}