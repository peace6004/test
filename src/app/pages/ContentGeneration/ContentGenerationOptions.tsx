import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentGenerationOptions.css';
import { setFormData as saveFormData, setTargetData as saveTargetData, getFormData, getTargetData } from '../../../services/dataStorageService';
import { TargetData } from '../DataIngestion/TargetingData';
import { FormData } from '../DataIngestion/DataIngestion';

const ContentGenerationOptions: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [targetData, setTargetData] = useState<TargetData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedFormData = getFormData();
    const storedTargetData = getTargetData();
    setFormData(storedFormData);
    setTargetData(storedTargetData);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (formData) {
      saveFormData(formData);
    }
    if (targetData) {
      saveTargetData(targetData);
    }
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FormData) => {
    if (formData) {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleTargetDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof TargetData) => {
    if (targetData) {
      setTargetData({ ...targetData, [field]: e.target.value });
    }
  };

  return (
    
    <div className="content-options-container">
      <div className="branding">
        <img src="https://atomicai.xyz/wp-content/uploads/2023/08/%EC%B6%94%EA%B0%80%EC%9A%94%EC%B2%AD_%EA%B0%80%EB%A1%9C%ED%98%95-1.png" alt="Atomic AI Logo" className="logo" />
        <h1>AI Sales Enablement Tool</h1>
      </div>
      <h1>Choose Content to Generate</h1>
      {formData && targetData && (
        <div className="input-data-summary">
          {/* Data Ingestion Box */}
          <div className="data-box">
            <h2>Data Ingestion</h2>
            <table>
              <tbody>
                <tr>
                  <td><strong>Company Name:</strong></td>
                  <td>{isEditing ? <input type="text" value={formData.companyName} onChange={(e) => handleFormDataChange(e, 'companyName')} /> : formData.companyName}</td>
                </tr>
                {/* Similar editable fields for the rest of the formData properties */}
                <tr>
                  <td><strong>User Name:</strong></td>
                  <td>{isEditing ? <input type="text" value={formData.userName} onChange={(e) => handleFormDataChange(e, 'userName')} /> : formData.userName}</td>
                </tr>
                <tr>
                  <td><strong>User Title:</strong></td>
                  <td>{isEditing ? <input type="text" value={formData.userTitle} onChange={(e) => handleFormDataChange(e, 'userTitle')} /> : formData.userTitle}</td>
                </tr>
                <tr>
                  <td><strong>Industry:</strong></td>
                  <td>{isEditing ? <input type="text" value={formData.industry} onChange={(e) => handleFormDataChange(e, 'industry')} /> : formData.industry}</td>
                </tr>
                <tr>
                  <td><strong>Product Name:</strong></td>
                  <td>{isEditing ? <input type="text" value={formData.productName} onChange={(e) => handleFormDataChange(e, 'productName')} /> : formData.productName}</td>
                </tr>
                <tr>
                  <td><strong>Value Propositions:</strong></td>
                  <td>
                    {isEditing ? (
                      formData.valuePropositions.map((value, index) => (
                        <input key={index} type="text" value={value} onChange={(e) => {
                          let updatedValuePropositions = [...formData.valuePropositions];
                          updatedValuePropositions[index] = e.target.value;
                          setFormData({ ...formData, valuePropositions: updatedValuePropositions });
                        }} />
                      ))
                    ) : (
                      <ul>
                        {formData.valuePropositions.map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Company Website:</strong></td>
                  <td>{isEditing ? <input type="text" value={formData.companyWebsite} onChange={(e) => handleFormDataChange(e, 'companyWebsite')} /> : formData.companyWebsite}</td>
                </tr>
                <tr>
                  <td><strong>Company Description:</strong></td>
                  <td>{isEditing ? <textarea value={formData.companyDescription} onChange={(e) => handleFormDataChange(e, 'companyDescription')} /> : formData.companyDescription}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Targeting Data Box */}
          <div className="data-box">
            <h2>Targeting Data</h2>
            <table>
              <tbody>
                <tr>
                  <td><strong>List from CRM:</strong></td>
                  <td>{isEditing ? <input type="text" value={targetData.listFromCRM} onChange={(e) => handleTargetDataChange(e, 'listFromCRM')} /> : targetData.listFromCRM}</td>
                </tr>
                <tr>
                  <td><strong>Target Accounts:</strong></td>
                  <td>{isEditing ? <input type="text" value={targetData.targetAccounts} onChange={(e) => handleTargetDataChange(e, 'targetAccounts')} /> : targetData.targetAccounts}</td>
                </tr>
                <tr>
                  <td><strong>Target URL:</strong></td>
                  <td>{isEditing ? <input type="text" value={targetData.targetUrl} onChange={(e) => handleTargetDataChange(e, 'targetUrl')} /> : targetData.targetUrl}</td>
                </tr>
                <tr>
                  <td><strong>Target Industry:</strong></td>
                  <td>{isEditing ? <input type="text" value={targetData.targetIndustry} onChange={(e) => handleTargetDataChange(e, 'targetIndustry')} /> : targetData.targetIndustry}</td>
                </tr>
                <tr>
                  <td><strong>Target Job Title:</strong></td>
                  <td>{isEditing ? <input type="text" value={targetData.targetJobTitle} onChange={(e) => handleTargetDataChange(e, 'targetJobTitle')} /> : targetData.targetJobTitle}</td>
                </tr>
                <tr>
                  <td><strong>Target Job Function:</strong></td>
                  <td>{isEditing ? <input type="text" value={targetData.targetJobFunction} onChange={(e) => handleTargetDataChange(e, 'targetJobFunction')} /> : targetData.targetJobFunction}</td>
                </tr>
                <tr>
                  <td><strong>Company Size:</strong></td>
                  <td>{isEditing ? <input type="text" value={targetData.companySize} onChange={(e) => handleTargetDataChange(e, 'companySize')} /> : targetData.companySize}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

<div className="edit-save-buttons">
      {isEditing ? (
        <button className="save-button" onClick={handleSave}>Save</button>
      ) : (
        <button className="edit-button" onClick={handleEdit}>Edit</button>
      )}
      </div>
      <div className="content-buttons">
      <div className="content-button">
        <a href="/landing-page-generation">
          <button className="content-button-big">Generate<br />Landing Page</button>
        </a>
      </div>
      <div className="content-button">
        <a href="/blog-post-generation">
          <button className="content-button-big">Generate<br />Blog Post</button>
        </a>
      </div>
      <div className="content-button">
        <a href="/one-pager-generation">
          <button className="content-button-big">Generate<br />One Pager</button>
        </a>
      </div>
      <div className="content-button">
        <a href="/news-letter-generation">
          <button className="content-button-big">Generate<br />News Letter</button>
        </a>
        </div>
      <div className="content-button">
        <a href="/linkedin-post-generation">
          <button className="content-button-big">Generate<br />LinkedIn Campaign</button>
        </a>
      </div>
      <div className="content-button">
        <a href="/email-sequence-generation">
          <button className="content-button-big">Generate<br />Email Campaign</button>
        </a>
      </div>
    </div>
  </div>
);}

export { ContentGenerationOptions };