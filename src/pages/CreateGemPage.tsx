import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast"
import { Button, Label, Textarea, Input } from '@/components/ui/';
import { useNavigate, Navigate } from 'react-router-dom';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { API_BASE_URL } from "../lib/apiConfig";

const mdParser = new MarkdownIt();



const CreateGemPage: React.FC = () => {
  const isLoggedIn = (localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('access_token') !== null && localStorage.getItem('userId') !== null);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  /*
  const [photo, setPhoto] = useState<File | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!photo || !subject || !description || !location || !category) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    // Here you would handle the form submission, e.g., by sending data to a backend API
    toast({
      title: 'Success',
      description: 'Gem created successfully!',
      variant: 'default',
    });
    navigate('/gems');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Gem</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Photo" className="mb-4" type="file" id="photo" onChange={handlePhotoChange} />
        <Input label="Subject" className="mb-4" type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Textarea label="Description" className="mb-4" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input label="Location" className="mb-4" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Label htmlFor="category">Category</Label>
        <Select className="mb-4" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </Select>
        <Button className="py-2 px-4 bg-primary text-white font-bold w-full rounded hover:bg-primary-dark" type="submit">Create Gem</Button>
      </form>
    </div>
  );*/

  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!subject || !image || !content || !location || !category) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/gem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: subject,
          description: content,
          owner: localStorage.getItem('userId'),
          category,
          image,
          location,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        toast({
          title: 'Error',
          description: text || 'Failed to create gem.',
          variant: 'destructive',
        });
        return;
      }
      const gem = await res.json();
      toast({
        title: 'Success',
        description: 'Gem created successfully!',
        variant: 'default',
      });
      navigate(`/gem/${gem.id}`);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to create gem.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4">
      <Input label="Title" className="w-full text-lg border-2 border-primary rounded-xl p-2 mb-4 shadow focus:ring-2 focus:ring-primary" type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      <Input label="Image (URL)" className="w-full text-lg border-2 border-primary rounded-xl p-2 mb-4 shadow focus:ring-2 focus:ring-primary" type="url" id="image" value={image} onChange={(e) => setImage(e.target.value)} required pattern="https?://.+" />
      <Input label="City" className="w-full text-lg border-2 border-primary rounded-xl p-2 mb-4 shadow focus:ring-2 focus:ring-primary" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <Label htmlFor="category">Category</Label>
      <select className="w-full text-lg border-2 border-primary rounded-xl p-2 mb-4 shadow focus:ring-2 focus:ring-primary" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Select a category</option>
          <option value="Culture">Culture</option>
          <option value="History">History</option>
          <option value="Nature">Nature</option>
          <option value="Shopping">Shopping</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
      </select>

      <MdEditor
        value={content}
        style={{ height: '400px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <Button onClick={(e) => handleSubmit(e)} className="py-2 px-4 bg-primary text-white font-bold w-full rounded hover:bg-primary-dark" type="submit">Create Gem</Button>
      <div id="ezoic-pub-ad-placeholder-114"></div>
    </div>
  );
};

export default CreateGemPage;
