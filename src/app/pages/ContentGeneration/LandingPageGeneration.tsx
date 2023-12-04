import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './LandingPageGeneration.css';
import { stateToHTML } from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';

const htmlToEditorState = (html) => {
  const blocksFromHtml = htmlToDraft(html);
  if (blocksFromHtml) {
    const { contentBlocks, entityMap } = blocksFromHtml;
    return EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap));
  }
  return EditorState.createEmpty();
};

const LandingPageGeneration = () => {
  const [pageType, setPageType] = useState('generic');
  const [isEditing, setIsEditing] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [editableContent, setEditableContent] = useState({
    title: '',
    editorState: EditorState.createEmpty(),
  });

  const originalContent = {
    'industry': {
      title: 'AI for Healthcare',
      editorState: htmlToEditorState(`
      <section class="hero">
      <div class="hero-content">
        <h1>Revolutionizing Healthcare with AI</h1>
        <p>Enhancing patient care with AI-driven solutions</p>
      </div>
      <div class="hero-image">
        <img src="healthcare-hero.jpg" alt="Healthcare Hero" />
      </div>
    </section>
    <section class="benefits">
      <div class="benefits-content">
        <h2>Why Choose Our AI Solutions for Healthcare?</h2>
        <ul>
          <li>
            <div class="benefit-icon">
              <img src="diagnosis-icon.png" alt="Diagnosis Icon" />
            </div>
            <p>Accurate Diagnostics</p>
            <p>Our AI-powered diagnostic tools provide precise and fast diagnoses, enabling healthcare professionals to make informed decisions quickly.</p>
          </li>
          <li>
            <div class="benefit-icon">
              <img src="data-icon.png" alt="Data Icon" />
            </div>
            <p>Patient Data Management</p>
            <p>Efficiently manage patient data with our advanced systems, ensuring secure and organized healthcare records.</p>
          </li>
          <li>
            <div class="benefit-icon">
              <img src="assistant-icon.png" alt="Assistant Icon" />
            </div>
            <p>Virtual Health Assistants</p>
            <p>Our virtual health assistants provide 24/7 support to patients, answering questions and offering personalized health recommendations.</p>
          </li>
        </ul>
      </div>
      <div class="benefits-image">
        <img src="benefits-image.jpg" alt="Benefits Image" />
      </div>
    </section>

    <section class="case-studies">
      <div class="case-studies-content">
        <h2>Explore Our Case Studies</h2>
        <p>Discover how we've transformed healthcare facilities with our innovative solutions.</p>
        <a href="/case-studies" class="cta-button">View Case Studies</a>
      </div>
      <div class="case-studies-image">
        <img src="case-studies-image.jpg" alt="Case Studies Image" />
      </div>
    </section>
  `)
    },
    'webinar': {
      title: 'Join Our Webinar',
      editorState: htmlToEditorState(`
        <section class="hero">
          <div class="hero-content">
            <h1>Impact of AI in Sales Webinar</h1>
            <p>Exploring the impact of AI on sales strategies</p>
          </div>
          <div class="hero-image">
            <img src="webinar-hero.jpg" alt="Webinar Hero" />
          </div>
        </section>
  
        <section class="webinar-details">
          <div class="webinar-details-content">
            <h2>About the Webinar</h2>
            <p>Our AI in Sales webinar will delve into the integration of AI into various business processes, the utilization of AI for advanced data analysis, and success stories of AI implementation across industries.</p>
            <p>This is a unique opportunity to gain valuable insights and interact directly with our AI experts. Register now to secure your spot and explore how AI can revolutionize your business operations.</p>
            <a href="/register" class="cta-button">Register Now</a>
          </div>
          <div class="webinar-details-image">
            <img src="webinar-details-image.jpg" alt="Webinar Details" />
          </div>
        </section>
  
        <section class="speakers">
          <div class="speakers-content">
            <h2>Meet Our Speakers</h2>
            <div class="speaker">
              <img src="speaker1.jpg" alt="Speaker 1" />
              <h3>Dr. Sarah Johnson</h3>
              <p>AI Strategist</p>
            </div>
            <div class="speaker">
              <img src="speaker2.jpg" alt="Speaker 2" />
              <h3>John Smith</h3>
              <p>Data Science Expert</p>
            </div>
            <div class="speaker">
              <img src="speaker3.jpg" alt="Speaker 3" />
              <h3>Lisa Brown</h3>
              <p>Sales Specialist</p>
            </div>
          </div>
        </section>
  
        <section class="agenda">
          <div class="agenda-content">
            <h2>Agenda</h2>
            <ul>
              <li>
                <strong>10:00 AM - 10:30 AM:</strong> Opening Remarks
              </li>
              <li>
                <strong>10:30 AM - 11:30 AM:</strong> Keynote Address by Dr. Sarah Johnson
              </li>
              <li>
                <strong>11:30 AM - 12:30 PM:</strong> Panel Discussion: AI in Sales Strategies
              </li>
              <li>
                <strong>12:30 PM - 01:00 PM:</strong> Q&A Session
              </li>
            </ul>
          </div>
        </section>
  
        <section class="cta">
          <div class="cta-content">
            <h2>Don't Miss Out!</h2>
            <p>Join us for this enlightening webinar and gain insights that can transform your business. Reserve your spot now!</p>
            <a href="/register" class="cta-button">Register Now</a>
          </div>
          <div class="cta-image">
            <img src="cta-image.jpg" alt="Webinar CTA" />
          </div>
        </section>
      `)
    },
    'generic': {
      title: 'Atomic AI Leading the way in innovative Sales AI technology',
      editorState: htmlToEditorState(`
      <section class="hero">
  <div class="hero-content">
    <h1>Welcome to Atomic AI Inc.</h1>
    <p>Leading the way in innovative Sales AI technology</p>
  </div>
  <div class="hero-image">
    <img src="welcome-hero.jpg" alt="Welcome Hero" />
  </div>
</section>
    <section class="about">
      <div class="about-content">
        <h2>About Us</h2>
        <p>At AI Solutions Inc., we are dedicated to developing cutting-edge AI technology that enhances business efficiency, drives innovation, and creates new opportunities.</p>
        <p>From machine learning to natural language processing, our solutions are designed to meet the diverse needs of modern businesses. Explore our range of products and services and see how we can help you leverage the power of AI in your business.</p>
      </div>
      <div class="about-image">
        <img src="about-image.jpg" alt="About Us" />
      </div>
    </section>

    <section class="products">
      <div class="products-content">
        <h2>Our Products</h2>
        <div class="product">
          <img src="product1.jpg" alt="Product 1" />
          <h3>AI Sales Assistant</h3>
          <p>Revolutionize your sales process with our AI-powered sales assistant. Increase efficiency and close deals faster than ever before.</p>
        </div>
        <div class="product">
          <img src="product2.jpg" alt="Product 2" />
          <h3>Data Analytics Suite</h3>
          <p>Unlock the potential of your data with our Data Analytics Suite. Gain valuable insights and make data-driven decisions.</p>
        </div>
        <div class="product">
          <img src="product3.jpg" alt="Product 3" />
          <h3>NLP Language Models</h3>
          <p>Enhance customer interactions and automate support with our NLP Language Models. Improve customer satisfaction and reduce response times.</p>
        </div>
      </div>
    </section>

    <section class="contact">
      <div class="contact-content">
        <h2>Contact Us</h2>
        <p>Have questions or need more information? Don't hesitate to get in touch with our team. We're here to assist you.</p>
        <a href="/contact" class="cta-button">Contact Us</a>
      </div>
      <div class="contact-image">
        <img src="contact-image.jpg" alt="Contact Us" />
      </div>
    </section>
  `)
    }
  };

  useEffect(() => {
    setHasEdited(false);
    setIsEditing(false);
    setEditableContent({
      title: originalContent[pageType].title,
      editorState: originalContent[pageType].editorState
    });
  }, [pageType]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setHasEdited(true);
  };

  const handlePublish = () => {
    console.log('Publishing Landing Page...');
    // Here you would typically send data to a backend server
    // For now, just log to the console
  };

  const renderLandingPageContent = () => {
    if (isEditing) {
      return (
        <div className="content">
          <div className="editor-container">
            <input
              type="text"
              value={editableContent.title}
              onChange={(e) => setEditableContent({ ...editableContent, title: e.target.value })}
            />
            <Editor
              editorState={editableContent.editorState}
              onChange={(newState) => setEditableContent({ ...editableContent, editorState: newState })}
            />
          </div>
        </div>
      );
    } else {
      // Convert EditorState to HTML for display
      const displayHtml = stateToHTML(editableContent.editorState.getCurrentContent());
      return (
        <div>
          <h2>{editableContent.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: displayHtml }} />
        </div>
      );
    }
  };

  return (
    <div className="custom-landing-page">
      <div className="page-type-selector">
        <select
          id="page-selector"
          value={pageType}
          onChange={(e) => setPageType(e.target.value)}
        >
          <option value="generic">General Landing Page</option>
          <option value="industry">Target Industry Landing Page</option>
          <option value="webinar">Webinar/Event Landing Page</option>
        </select>
      </div>      
      <div className="content">
        {renderLandingPageContent()}
      </div>
      <div className="edit-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handlePublish}>Publish</button>
          </>
        )}
      </div>
    </div>
  );
};

export { LandingPageGeneration };