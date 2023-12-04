import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './EmailSequenceGeneration.css';
import { stateToHTML } from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';

// Define a type for email content
interface EmailContent {
  title: string;
  editorState: EditorState;
  isEditing: boolean;
}

const EmailSequenceGeneration = () => {
  const productName = 'AtomicAI';
  const newHireName = 'John Smith';
  const blogTitle = 'Using AI to Enhance Sales';
  const [emailType, setEmailType] = useState('saleoffer');
  const [editableContents, setEditableContents] = useState<EmailContent[]>([]);


// Define email templates for each playbook
const originalEmails = {
  'saleoffer': [
    {
      step: 1,
      title: `Exclusive Offer: Introducing ${productName}`,
      content: `Hello,<br/><br/>We're thrilled to introduce you to our latest innovation, ${productName}. This game-changing product offers unparalleled performance and value. As a valued customer, you're eligible for an exclusive first look and a limited-time launch discount. Don't miss out on this opportunity to enhance your toolkit with ${productName}!<br/><br/>Explore ${productName} now: [Link]<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 2,
      title: `Experience the Benefits of ${productName}`,
      content: `Hi there,<br/><br/>Following our exciting announcement about ${productName}, we'd like to share more about how it can transform your daily workflow. Discover how features like X, Y, and Z can boost your productivity, streamline processes, and drive results. Ready to experience these benefits firsthand? Contact us today for a personalized demo!<br/><br/>Schedule a demo now: [Link]<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 3,
      title: `Last Chance: ${productName} Discount Ending Soon!`,
      content: `Hi again,<br/><br/>This is your final opportunity to take advantage of the special discount on ${productName}. Enhance your performance and stay ahead of the curve with our latest product. Act now to be among the first to benefit from its innovative features. Don't miss out!<br/><br/>Grab your discount now: [Link]<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    }
  ],
  'newhire': [
    {
      step: 1,
      title: `Welcome ${newHireName}! Your Journey Begins`,
      content: `Dear ${newHireName},<br/><br/>Congratulations on joining our team! We're excited to have you as our [Position Title]. Your background in [Industry/Sector] and your skills are exactly what we need to continue our journey towards success. We're here to support you every step of the way.<br/><br/>Welcome aboard!<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 2,
      title: `Discover Our Company and Mission`,
      content: `Hello ${newHireName},<br/><br/>As you settle into your new role, we'd like to introduce you to the heart of our company – our product, [Product Name]. It embodies our mission, values, and the innovative spirit that drives us. Understanding our core product will give you a great head start in your new role.<br/><br/>Learn more about us: [Link]<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 3,
      title: `Embrace Your Role and Achieve Greatness`,
      content: `Hi ${newHireName},<br/><br/>We're thrilled to see you integrating well into our team. Your role as [Position Title] is crucial in helping us achieve our goals. Your contributions will have a significant impact on our journey. We're here to support you every step of the way and can't wait to see the great things we'll accomplish together.<br/><br/>Let's make an impact together!<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    }
  ],
  'blogpost': [
    {
      step: 1,
      title: `Explore Our Latest Blog Post: "${blogTitle}"`,
      content: `Hey there,<br/><br/>We've just published an insightful new post, "${blogTitle}". It delves into the latest AI trends and offers invaluable insights. Dive in and stay ahead of the curve in the ever-evolving world of AI!<br/><br/>Read the blog post: [Link]<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 2,
      title: `Deeper Insights on "${blogTitle}"`,
      content: `Hi again,<br/><br/>Thank you for the fantastic response to our latest blog post, "${blogTitle}". Many of you asked for more information on the topics covered. We've put together a detailed follow-up piece that answers your questions and explores the titles in greater depth. Don't miss it!<br/><br/>Get deeper insights: [Link]<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 3,
      title: `Your Feedback on "${blogTitle}" Matters`,
      content: `Hello,<br/><br/>We're reaching out to gather your thoughts on our recent blog post, "${blogTitle}". Your feedback is invaluable and helps shape our future content. Let us know your insights and the topics you'd like us to cover next!<br/><br/>Share your feedback with us.<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    }
  ],
  'sdroutreach': [
    {
      step: 1,
      title: `Unlock Business Efficiency with ${productName}`,
      content: `Hi there,<br/><br/>Are you looking for ways to boost your business efficiency and productivity? Look no further! We're excited to introduce you to ${productName}, our latest solution designed to streamline your workflow and supercharge your results. It's the perfect tool for achieving consistency and maintaining your brand voice while personalizing interactions at scale.<br/><br/>Let's discuss how ${productName} can fit into your business strategy.<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 2,
      title: `Transform Your Business with ${productName}`,
      content: `Hello again,<br/><br/>Following our previous conversation about ${productName}, I wanted to dive deeper into how it can revolutionize your business. With features like A, B, and C, ${productName} is not just a product; it's a complete business enhancement tool.<br/><br/>Here's how it works:<br/><br/><ul><li><strong>Feature A:</strong> Boost productivity with automation.</li><li><strong>Feature B:</strong> Deliver personalized messages at scale.</li><li><strong>Feature C:</strong> Maintain brand consistency across all interactions.</li></ul><br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    },
    {
      step: 3,
      title: `Final Call to Transform Your Business with ${productName}`,
      content: `Hi there,<br/><br/>This is your last chance to explore how ${productName} can change the game for your business. Don't miss out on this opportunity to lead your industry with the most advanced tools available. Our team is ready to help you schedule a personalized demo and answer any questions you may have. Let's embark on this journey to transform your business together!<br/><br/>Schedule a demo now: [Link]<br/><br/>Best regards,<br/>[Your Name]<br/>CEO, ${productName}<br/>[Your Email]<br/><a href="www.${productName}.com">www.${productName}.com</a>`
    }
  ]  
};

 // Update content based on emailType and currentStep
 useEffect(() => {
  const emailContents = originalEmails[emailType]?.map(email => {
    const blocksFromHtml = htmlToDraft(email.content);
    const contentState = blocksFromHtml ?
      ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap) : 
      ContentState.createFromText('');
    return {
      title: email.title,
      editorState: EditorState.createWithContent(contentState),
      isEditing: false,
    };
  });
  setEditableContents(emailContents || []);
}, [emailType]);

const handleEdit = (index) => {
  const newContents = [...editableContents];
  newContents[index].isEditing = true;
  setEditableContents(newContents);
};

const handleSave = (index) => {
  const newContents = [...editableContents];
  newContents[index].isEditing = false;
  setEditableContents(newContents);
};

const handleCancel = (index) => {
  const originalContent = originalEmails[emailType][index];
  const blocksFromHtml = htmlToDraft(originalContent.content);
  const contentState = blocksFromHtml ?
    ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap) : 
    ContentState.createFromText('');
  const newContents = [...editableContents];
  newContents[index] = {
    ...newContents[index],
    editorState: EditorState.createWithContent(contentState),
    isEditing: false,
  };
  setEditableContents(newContents);
};

const handleEditorChange = (editorState, index) => {
  const newContents = [...editableContents];
  newContents[index].editorState = editorState;
  setEditableContents(newContents);
};

const handleCreateSequence = () => {
  // Implement the logic for creating the email sequence here
  // This function should be called when the user is ready to create the sequence
  // You can use the contents of 'editableContents' to generate the sequence
  // For example, you can convert 'editableContents' to JSON and send it to the server to save the sequence
  // You can also navigate to a different page or perform any other necessary actions
  alert('Email sequence created!');
};

const renderContent = () => editableContents.map((content, index) => (
  <div key={index} className="email-step">
    {content.isEditing ? (
      <>
        <input
          type="text"
          value={content.title}
          onChange={(e) => handleTitleChange(e.target.value, index)}
          className="editable-title"
        />
        <div className="editor-container">
          <Editor
            editorState={content.editorState}
            onChange={(newState) => handleEditorChange(newState, index)}
          />
        </div>
        <div className="buttons">
          <button onClick={() => handleSave(index)}>Save</button>
          <button onClick={() => handleCancel(index)}>Cancel</button>
        </div>
      </>
    ) : (
      <>
        <h2>Step {index + 1}: {content.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: stateToHTML(content.editorState.getCurrentContent()) }} />
        <div className="buttons">
          <button onClick={() => handleEdit(index)}>Edit</button>
        </div>
      </>
    )}
  </div>
));

const handleTitleChange = (newTitle, index) => {
  const newContents = [...editableContents];
  newContents[index].title = newTitle;
  setEditableContents(newContents);
};

return (
  <div className="email-container">
    <div className="email-type-selector">
      <select value={emailType} onChange={(e) => setEmailType(e.target.value)}>
        <option value="saleoffer">Sales Offer</option>
        <option value="newhire">New Hire</option>
        <option value="blogpost">Blog Post</option>
        <option value="sdroutreach">SDR Outreach</option>
      </select>
    </div>
    {renderContent()}
    <div className="create-sequence-button">
        <button onClick={handleCreateSequence}>Create Sequence</button>
      </div>
  </div>
);
};

export { EmailSequenceGeneration };