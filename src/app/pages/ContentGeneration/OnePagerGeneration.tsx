import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './OnePagerGeneration.css';
import { stateToHTML } from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';

  const originalContent = {
    'company-overview': {
      title: 'Atomic AI Company Overview',
      content: `
        <div class="company-info">
        <img src="https://atomicai.xyz/wp-content/uploads/2023/08/%EC%B6%94%EA%B0%80%EC%9A%94%EC%B2%AD_%EA%B0%80%EB%A1%9C%ED%98%95-1.png" alt="Atomic AI Logo" class="newsletter-image" />
          <h1>About Our Company</h1>
          <p>AI Innovate Inc. began with a vision to revolutionize the AI landscape. Our mission is to develop AI solutions that empower businesses to unlock new potential!</p>
        </div>
        <div class="section">
          <h2>Our Expertise</h2>
          <p>Since our inception, we've been at the forefront of technological advancement in artificial intelligence. We specialize in creating custom AI solutions tailored to the unique needs of businesses across various industries. Our expertise spans a wide range of applications, including machine learning, natural language processing, and predictive analytics.</p>
        </div>
        <div class="section">
          <h2>Our Achievements</h2>
          <ul>
            <li>Developed state-of-the-art AI algorithms that have significantly improved business efficiencies for over 100 companies.</li>
            <li>Partnered with leading tech firms to advance AI research and implementation.</li>
            <li>Received multiple awards for innovation and excellence in AI technology.</li>
          </ul>
        </div>
        <div class="section">
          <img src="https://slideuplift.com/wp-content/uploads/edd/2022/10/ItemID-6621-Meet-the-Team-10-4x3-1-scaled.jpg" alt="Atomic AI Team" class="newsletter-image" />
          <p>We are committed to providing our clients with exceptional AI solutions that drive growth, efficiency, and innovation. Our approach is client-centered, focusing on delivering customized, scalable, and sustainable AI strategies.</p>
        </div>
        <div class="section">
          <h2>Looking Ahead</h2>
          <p>The future of AI is limitless, and at AI Innovate Inc., we are excited to be a part of this journey. We continue to explore new horizons in AI, constantly pushing the boundaries of what's possible.</p>
        </div>

        <div class="call-to-action">
          <p>Join us in our mission to reshape the business world with advanced AI solutions.</p>
          </div>
      `,
    },
    'use-case': {
      title: 'AI in B2B Sales: Transforming Company A',
      content: `
        <div class="hbs-case-study">
          <p class="authors">Authors: John Doe, Jane Smith</p>
          <p class="date">Publication Date: January 15, 2023</p>
        </div>
    
        <div class="hbs-case-section">
          <h2>Executive Summary</h2>
          <p>Company A, a prominent player in the B2B sales industry, was faced with significant challenges in managing customer data and aligning sales strategies with dynamic market trends. This case study examines how AI Innovate Inc. deployed cutting-edge AI solutions to overcome these challenges, ultimately resulting in substantial business growth.</p>
        </div>
    
        <div class="hbs-case-image">
          <img src="https://cdn.builder.io/api/v1/image/assets%2Fe0438815ba51486bbb6a202747122d4b%2Fb1568c7d117f4044baaab8b8be3c1154" alt="AI Sales Prediction Model" />
          <p class="image-caption">AI Sales Prediction Model</p>
        </div>
    
        <div class="hbs-case-section">
          <h2>Problem Statement</h2>
          <p>Company A's sales team grappled with managing vast amounts of customer data and struggled to adapt their sales strategies in response to evolving market dynamics. Accurate prediction of customer needs and delivering personalized interactions remained elusive.</p>
        </div>
    
        <div class="hbs-case-section">
          <h2>Solution</h2>
          <p>To address these challenges, AI Innovate Inc. implemented an advanced AI-driven solution. By harnessing state-of-the-art algorithms, the AI system analyzed Company A's extensive customer data, forecasted buying patterns, and automated crucial sales processes. This enabled Company A to elevate its sales approach.</p>
        </div>
    
        <div class="hbs-case-image">
          <img src="https://learn.microsoft.com/ko-kr/dynamics365/customerengagement/on-premises/basics/media/crm-ua-basicsguide-sales.png?view=op-9-1" alt="Customer Engagement Dashboard" />
          <p class="image-caption">Customer Engagement Dashboard</p>
        </div>
    
        <div class="hbs-case-section">
          <h2>Results</h2>
          <ul>
            <li>A remarkable 30% increase in sales efficiency was achieved within the first quarter of AI implementation.</li>
            <li>Customer satisfaction surged by 20% due to highly personalized interactions, enhancing brand loyalty.</li>
            <li>Improved forecasting accuracy led to better inventory management, reducing operational costs.</li>
          </ul>
        </div>
    
        <div class="hbs-case-chart">
          <img src="https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai%20in%202023%20generative%20ais%20breakout%20year/svgz_stateofai2023_ex11.svgz?cq=50&cpy=Center" alt="Sales Growth After AI Implementation" />
          <p class="chart-caption">Sales Growth After AI Implementation</p>
        </div>
    
        <div class="hbs-case-chart">
          <img src="https://www.datarevelations.com/wp-content/uploads/2017/05/05_DivergentOverload-e1494458735744.png" alt="Customer Satisfaction Improvement" />
          <p class="chart-caption">Customer Satisfaction Improvement</p>
        </div>
    
        <div class="hbs-case-section">
          <h2>Key Takeaways</h2>
          <p>This case study highlights the transformative power of AI in B2B sales. Company A's experience underscores the importance of leveraging AI to enhance data-driven decision-making, personalize customer interactions, and optimize operational efficiency. As AI continues to evolve, businesses that embrace these technologies are poised for remarkable growth and success.</p>
        </div>
      `,
    },
      'product-service': {
        title: 'Introducing Our New AI Service',
        content: `
          <div class="service-intro">
            <h1>Revolutionizing B2B Sales with Our AI Service</h1>
            <p>We are thrilled to unveil our latest innovation in AI technology – a service specifically designed to transform B2B sales operations.</p>
          </div>
          <!-- Market Trend Analysis Chart -->
          <div class="chart-container">
            <h3>Market Trend Analysis</h3>
            <div class="bar-chart" id="market-trend-chart">
            <div class="bar" style="background-color: orange; height: 60%;">Q1</div>
            <div class="bar" style="background-color: teal; height: 75%;">Q2</div>
            <div class="bar" style="background-color: purple; height: 65%;">Q3</div>
            <div class="bar" style="background-color: grey; height: 80%;">Q4</div>
          </div>
        </div>
          <div class="section">
            <h2>Intelligent Lead Scoring</h2>
            <p>Our AI service uses advanced algorithms to analyze lead data, providing your sales team with accurate, data-driven insights. This feature prioritizes leads based on their likelihood of conversion, ensuring your team focuses on the most promising opportunities.</p>
          </div>
      
          <div class="section">
            <h2>Automated Customer Interactions</h2>
            <p>Streamline customer communication with AI-powered chatbots and email automation. Our service enables personalized and timely interactions with prospects, enhancing engagement and improving response rates.</p>
          </div>
      
          <div class="section">
            <h2>Predictive Sales Analytics</h2>
            <p>Gain foresight into sales trends and customer behavior. Our predictive analytics tools help you anticipate market changes, adjust strategies proactively, and stay ahead of the competition.</p>
          </div>

          <!-- Predictive Analytics Insights Chart -->
          <div class="chart-container">
            <h3>Predictive Analytics Insights</h3>
            <div class="bar-chart" id="sales-analytics-chart">
              <div class="bar" style="height: 70%; background-color: blue;">70%</div>
              <div class="bar" style="height: 50%; background-color: green;">50%</div>
              <div class="bar" style="height: 85%; background-color: red;">85%</div>
            </div>
          </div>
      
          <div class="section">
          <h2>Visualizing the Features</h2>
          <p>Explore the capabilities of our AI service through these graphical representations:</p>
        </div>
        
        `,
        images: [
          { url: 'https://via.placeholder.com/800x150', caption: 'Chatbot Interface' }
        ]
      }
  };
  
  const htmlToEditorState = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  };

  const OnePagerGeneration = () => {
    const [pageType, setPageType] = useState('company-overview');
    const [isEditing, setIsEditing] = useState(false);
    const [hasEdited, setHasEdited] = useState(false);
    const [editableContent, setEditableContent] = useState({
      title: '',
      editorState: EditorState.createEmpty(),
      content: '',
      images: [],
      charts: [],
    });

    useEffect(() => {
      setHasEdited(false);
      setIsEditing(false);
  
      const newEditorState = htmlToEditorState(originalContent[pageType].content);
      setEditableContent({
        title: originalContent[pageType].title,
        editorState: newEditorState,
        content: originalContent[pageType].content,
        images: originalContent[pageType].images || [],
       charts: originalContent[pageType].charts || [],
    });
  }, [pageType]);

  // Handle entering editing mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setHasEdited(true);

    const currentContent = editableContent.editorState.getCurrentContent();
    const newHtml = stateToHTML(currentContent);

    setEditableContent(prev => ({
        ...prev,
        content: newHtml
    }));

    console.log('Saved content:', newHtml);
};

  // Handle publishing the content
  const handlePublish = () => {
    console.log('Publishing One-Pager...');
    // Typically, send data to a backend server
  };

    // Revert to the original content if canceled
    const handleCancel = () => {
      setIsEditing(false);
      if (hasEdited) {
        // If edits have been made and saved, revert to the last saved state
        const savedContentState = htmlToEditorState(editableContent.content);
        setEditableContent(prev => ({
          ...prev,
          editorState: savedContentState
        }));
      } else {
        // If no edits have been made, revert to the original content of the selected page type
        const originalContentState = htmlToEditorState(originalContent[pageType].content);
        setEditableContent({
          title: originalContent[pageType].title,
          editorState: originalContentState,
          content: originalContent[pageType].content,
          images: originalContent[pageType].images || [],
          charts: originalContent[pageType].charts || [],
        });
      }
    };

  // Render images based on image data
  const renderImages = (images) => {
    if (!images) return null;
    return images.map((img, index) => (
      <div key={index}>
        <img src={img.url} alt={img.caption} />
        <p>{img.caption}</p>
      </div>
    ));
  };

  // Render charts based on chart data
  const renderCharts = (charts) => {
    if (!charts) return null;
    return charts.map((chart, index) => (
      <div key={index}>
        <div className="chart-placeholder">{chart.caption}</div>
      </div>
    ));
  };

  // Render the editable content based on editing mode
  const renderOnePagerContent = () => {
    const contentToDisplay = hasEdited ? editableContent : originalContent[pageType];
    if (isEditing) {
      return (
        <div className="content">
          <input
            className="editable-title"
            type="text"
            value={editableContent.title}
            onChange={(e) => setEditableContent({ ...editableContent, title: e.target.value })}
          />
          <div className="editor-container">
            <Editor
              editorState={editableContent.editorState}
              onChange={(newState) => setEditableContent({ ...editableContent, editorState: newState })}
            />
          </div>
          <div className="buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <h1>{contentToDisplay.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: contentToDisplay.content || '' }} />
          {renderImages(contentToDisplay.images)}
          {renderCharts(contentToDisplay.charts)}
          <div className="buttons">
          {hasEdited ? (
            <>
              <button className="edit-button" onClick={handleEdit}>Edit</button>
              <button className="publish-button" onClick={handlePublish}>Publish</button>
            </>
          ) : (
            <>
              <button className="edit-button" onClick={handleEdit}>Edit</button>
              <button className="publish-button" onClick={handlePublish}>Publish</button>
            </>
          )}
        </div>
      </div>
      );
    }
  };

  // Return the component JSX
  return (
    <div className="one-pager-container">
      <div className="page-type-selector">
        <select value={pageType} onChange={(e) => setPageType(e.target.value)}>
          <option value="company-overview">Company Overview</option>
          <option value="use-case">Use Case</option>
          <option value="product-service">Product/Service</option>
        </select>
      </div>
      {renderOnePagerContent()}
    </div>
  );
};

export { OnePagerGeneration };