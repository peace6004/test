import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTargetData } from '../../../services/dataStorageService'; // Import the data storage service
import './TargetingData.css';

export interface TargetData {
  targetAccounts: string;
  listFromCRM: string;
  targetUrl: string;
  uploadedFile: File | null;
  context: string;
  targetIndustry: string; // New field: Target Industry
  targetJobTitle: string; // New field: Target Job Title
  targetJobFunction: string; // New field: Target Job Function
  companySize: string; // New field: Company Size
}

const TargetingData: React.FC = () => {
  const [targetData, setLocalTargetData] = useState<TargetData>({
    // Use a local state for form data
    targetAccounts: '',
    listFromCRM: '',
    targetUrl: '',
    uploadedFile: null,
    context: '',
    targetIndustry: '',
    targetJobTitle: '',
    targetJobFunction: '',
    companySize: '',
  });

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalTargetData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalTargetData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalTargetData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setLocalTargetData(prevState => ({ ...prevState, uploadedFile: file }));
  };

  const navigate = useNavigate();

  const handleContinue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTargetData(targetData); // Save the target data using dataStorageService
    navigate('/content-generation'); // Navigate to the ContentGenerationOptions page
  };

  return (
    <div className="page-container">
      <div className="branding">
        <img
          src="https://atomicai.xyz/wp-content/uploads/2023/08/%EC%B6%94%EA%B0%80%EC%9A%94%EC%B2%AD_%EA%B0%80%EB%A1%9C%ED%98%95-1.png"
          alt="Atomic AI Logo"
          className="logo"
        />
        <h1>AI Sales Enablement Tool</h1>
      </div>
      <h1>Targeting Information</h1>
      <h2>Connect CRM</h2>
      <div className="crm-button">
        <button type="button" onClick={() => navigate('/salesforce')}>
          Salesforce
        </button>
        <button type="button" onClick={() => navigate('/monday')}>
          Monday.com
        </button>
        <button type="button" onClick={() => navigate('/hubspot')}>
          HubSpot
        </button>
        <button type="button" onClick={() => navigate('/manual-upload')}>
          Manual Excel Upload
        </button>
      </div>
      <form onSubmit={handleContinue}>
        <div className="center-text vertical-center">
          {/* Select Account Dropdown */}
          <label>
            Select Account:
            <select
              name="targetAccounts"
              value={targetData.targetAccounts}
              onChange={handleDropdownChange}
            >
              <option value="">Select Account</option>
              <option value="Acme Inc">Acme Inc</option>
              <option value="Generic Company 1">Generic Company 1</option>
              <option value="Generic Company 2">Generic Company 2</option>
              {/* Add more predefined options as needed */}
            </select>
          </label>
          <div className="center-text"> or </div>
          {/* Select List from CRM Dropdown */}
          <label>
            Select List from CRM:
            <select
              name="listFromCRM"
              value={targetData.listFromCRM}
              onChange={handleDropdownChange}
            >
              <option value="">Select an option</option>
              <option value="SalesForce List">SalesForce List</option>
              <option value="Retail Industry List">Retail Industry List</option>
              {/* Add more predefined options as needed */}
            </select>
          </label>
        </div>
        <div className="center-text">and</div>
        {/* Target URL Input */}
        <label>
          Target URL:
          <input
            type="text"
            name="targetUrl"
            value={targetData.targetUrl}
            onChange={handleInputChange}
          />
        </label>
        {/* Upload File Input */}
        <label>
          Upload File:
          <input type="file" name="uploadedFile" onChange={handleFileChange} />
          <label>
            Target Industry:
            <input
              type="text"
              name="targetIndustry"
              value={targetData.targetIndustry}
              onChange={handleInputChange}
            />
          </label>
          {/* Target Job Title Input */}
          <label>
            Target Job Title:
            <input
              type="text"
              name="targetJobTitle"
              value={targetData.targetJobTitle}
              onChange={handleInputChange}
            />
          </label>
          {/* Target Job Function Input */}
          <label>
            Target Job Function:
            <input
              type="text"
              name="targetJobFunction"
              value={targetData.targetJobFunction}
              onChange={handleInputChange}
            />
          </label>
          {/* Company Size Input */}
          <label>
            Company Size:
            <input
              type="text"
              name="companySize"
              value={targetData.companySize}
              onChange={handleInputChange}
            />
          </label>
        </label>
        {/* Context Textarea */}
        <label>
          Context:
          <textarea
            name="context"
            value={targetData.context}
            onChange={handleTextareaChange}
            rows={4}
          />
        </label>
        <div className="button-container">
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export { TargetingData };
