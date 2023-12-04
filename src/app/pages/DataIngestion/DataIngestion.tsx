import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './DataIngestion.css';
import { setFormData as saveFormData } from '../../../services/dataStorageService'; // Renamed the import to avoid conflict

export interface FormData {
  companyName: string;
  userName: string;
  userTitle: string;
  industry: string;
  productName: string;
  valuePropositions: string[];
  companyWebsite: string;
  companyDescription: string;
}

const DataIngestion: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ // Specify the type for formData
    companyName: '',
    userName: '',
    userTitle: '',
    industry: '',
    productName: '',
    valuePropositions: ['', '', ''],
    companyWebsite: '',
    companyDescription: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('valueProposition-')) {
      const index = parseInt(name.split('-')[1], 10);
      const newValuePropositions = [...formData.valuePropositions];
      newValuePropositions[index] = value;
      setFormData({ ...formData, valuePropositions: newValuePropositions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveFormData(formData); // Use the renamed function to save formData
    navigate('/targeting-data'); // Navigate to the next page
  };

  return (
    <div className="container">
      <div className="branding">
        <img src="https://atomicai.xyz/wp-content/uploads/2023/08/%EC%B6%94%EA%B0%80%EC%9A%94%EC%B2%AD_%EA%B0%80%EB%A1%9C%ED%98%95-1.png" alt="Atomic AI Logo" className="logo" />
        <h1>AI Sales Enablement Tool</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Business Profile Setup</h1>
        <div className="form-row">
          <label>
            Company Name:
            <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Atomic AI Inc."/>
          </label>
          <label>
            Industry:
            <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} placeholder="B2B SaaS"/>
          </label>
        </div>
        <h2>Company Description</h2>
        <label>
          Explain what your company does:
        </label>
        <div className="form-row" >
          <textarea
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleInputChange}
            rows={4} // Set the number of rows to 4
            placeholder="Atomic AI uses cutting-edge AI to enhance sales processes by generating scalable and customizable sales content."
          />
        </div>

        <label>
          Company Website/Product Page:
          <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleInputChange} placeholder="www.AtomicAI.xyz" />
        </label>

        <h2>User Information</h2>
        <div className="form-row">
          <label>
            User Name:
            <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="Sean Kwon"/>
          </label>
          <label>
            User Title:
            <input type="text" name="userTitle" value={formData.userTitle} onChange={handleInputChange} placeholder="CEO"/>
          </label>
        </div>

        <h2>Product Information</h2>
        <div className="form-row">
          <label>
            Product Name:
            <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} placeholder="Atomic SalesAI" />
          </label>
        </div>

        <h2>Value Propositions</h2>
        {formData.valuePropositions.map((value, index) => (
          <div className="form-row" key={index}>
            <label>
              Core Value Proposition {index + 1}:
              <input
                type="text"
                name={`valueProposition-${index}`}
                value={value}
                onChange={handleInputChange}
                placeholder="Personalized and Scalalbe Sales Content"
              />
            </label>
          </div>
        ))}
        
        <h2>Content Library</h2>
        <label>
          Upload Marketing Material, Sales Deck, or other .pdf:
          <input type="file" onChange={handleFileChange} />
        </label>

        <div className="button-container">
          <button type="submit">Start!</button>
        </div>
      </form>
    </div>
  );
};

export { DataIngestion };