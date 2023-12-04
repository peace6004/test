import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './NewsLetterGeneration.css';
import { stateToHTML } from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';


const originalContent = {
    'promotional': {
        title: 'Atomic AI News Letter #153',
        content: `
        <img src="https://atomicai.xyz/wp-content/uploads/2023/08/%EC%B6%94%EA%B0%80%EC%9A%94%EC%B2%AD_%EA%B0%80%EB%A1%9C%ED%98%95-1.png" alt="Logo Banner" class="newsletter-image" />
          <div class="newsletter-section">
            <h2>Revolutionize Your Workflow with AI</h2>
            <p>Discover how our new AI Assistant can streamline your daily tasks and boost productivity.</p>
            <img src="https://www.palantir.com/assets/xrfr7uokpv1b/4TF81x78iYQqD1IwhIBdt5/cc9f3506607bd520d73d624538445843/Personas.png?quality=70&width=1600" alt="AI Assistant Product" class="newsletter-image" />
          </div>
          <div class="newsletter-section">
            <h3>Key Features</h3>
            <ul>
              <li>Automated scheduling and reminders</li>
              <li>Intelligent email management</li>
              <li>Real-time data analysis</li>
            </ul>
          </div>
          <div class="newsletter-call-to-action">
            <p>Ready to experience the future? <a href="#">Request a Demo Today</a></p>
          </div>
        `,
      },
      
      'editorial': {
        title: 'AI Weekly: Latest Trends in AI Technology',
        content: `
          <div class="newsletter-header">
            <h1>AI Weekly - Week 36</h1>
            <img src="https://dxj7eshgz03ln.cloudfront.net/production/publication/logo/1475/8f402391-cd29-43a4-9695-35d930a59660.png" alt="Editorial Header" class="newsletter-image" />
          </div>
          <div class="newsletter-section">
            <h2>AI Breakthrough in Natural Language Processing</h2>
            <p>Read about the latest advancements in NLP that are changing how machines understand human language.</p>
            <img src="https://media.licdn.com/dms/image/D4D12AQEaMN_DXJZ9sw/article-cover_image-shrink_720_1280/0/1678868158704?e=2147483647&v=beta&t=8uadthLZX-ySXEQVf1EzHps-D6IRsXH2e866wcDQuXA" alt="NLP Breakthrough" class="newsletter-image" />
          </div>
          <div class="newsletter-section">
          <h2>Media Roundup of this Week</h2>
          <ul>
            <li>
              <p>
                <strong>GPT-3 is No Longer the Only Game in Town</strong><br />
                GPT-3 was by far the largest AI model of its kind last year. Now? Not so much.<br />
                <span class="article-date">NOV 6, 2021</span><br />
                <span class="article-author">ANDREY KURENKOV</span>
              </p>
            </li>
            <li>
              <p>
                <strong>How In-Context Learning Emerges</strong><br />
                In-context learning is the most exciting capability exhibited by Large Language Models. How does it work and where does it come from?<br />
                <span class="article-date">JUL 22</span><br />
                <span class="article-author">JACKY LIANG</span>
              </p>
            </li>
            <li>
              <p>
                <strong>The AI Scaling Hypothesis</strong><br />
                How far will this go?<br />
                <span class="article-date">AUG 6, 2022</span><br />
                <span class="article-author">DANIEL BASHIR AND ANDREY KURENKOV</span>
              </p>
            </li>
            <li>
              <p>
                <strong>Decoding the Discussion: In the Senate AI Hearing, Uncertainty Speaks Louder than Consensus</strong><br />
                May's committee hearing showed a remarkable bipartisan consensus on the need to regulate AI. Yet the road ahead presents complex challenges that could…<br />
                <span class="article-date">JUN 24</span><br />
                <span class="article-author">ARCHER AMON</span>
              </p>
            </li>
            <li>
              <p>
                <strong>Job Cuts Due to AI: What to Make of Them?</strong><br />
                Companies do seem to be reacting to ChatGPT and its ilk—and workers are being affected. What does this portend?<br />
                <span class="article-date">JUL 29</span><br />
                <span class="article-author">DANIEL BASHIR</span>
              </p>
            </li>
          </ul>
        </div>
            <h2>Upcoming AI Conferences</h2>
            <p>Don't miss these upcoming events where the leading minds in AI will be sharing their insights.</p>
            <img src="https://ichef.bbci.co.uk/images/ic/1920xn/p0cdj3fw.jpg" alt="AI Conferences" class="newsletter-image" />
          </div>
        `,
      },      
      'informational': {
        title: 'The state of AI in 2023: Generative AI’s breakout year',
        content: `
          <div class="newsletter-header">
          <img src="https://atomicai.xyz/wp-content/uploads/2023/08/%EC%B6%94%EA%B0%80%EC%9A%94%EC%B2%AD_%EA%B0%80%EB%A1%9C%ED%98%95-1.png" alt="Logo Banner" class="newsletter-image" />
            <p>August 1, 2023 | Market Inisght</p>
                     </div>
          <div class="newsletter-section">
            <h2>Explosive Growth of Generative AI</h2>
            <p>The latest annual McKinsey Global Survey on the current state of AI confirms the explosive growth of generative AI (gen AI) tools. Less than a year after many of these tools debuted, one-third of our survey respondents say their organizations are using gen AI regularly in at least one business function. Amid recent advances, AI has risen from a topic relegated to tech employees to a focus of company leaders: nearly one-quarter of surveyed C-suite executives say they are personally using gen AI tools for work...</p>
          </div>
          <div class="newsletter-section">
            <img src="https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai%20in%202023%20generative%20ais%20breakout%20year/svgz_stateofai2023_ex2.svgz?cq=50&cpy=Center" alt="Industry Impact Chart" class="newsletter-image" />
          </div>
          <div class="newsletter-section">
            <h2>Future of AI Adoption</h2>
            <img src=https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai%20in%202023%20generative%20ais%20breakout%20year/svgz_stateofai2023_ex11.svgz?cq=50&cpy=Center" alt="Future AI Adoption Graph" class="newsletter-image" />
            <div class="newsletter-call-to-action">
            <p>Ready to experience the future with Atomic AI? <a href="#">Request a Demo Today</a></p>
          </div>
        `,
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

  const NewsLetterGeneration = () => {
    const [newsletterType, setNewsletterType] = useState('promotional');
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
    
        const newEditorState = htmlToEditorState(originalContent[newsletterType].content);
        setEditableContent({
            title: originalContent[newsletterType].title,
            editorState: newEditorState,
            content: originalContent[newsletterType].content,
            images: originalContent[newsletterType].images || [],
           charts: originalContent[newsletterType].charts || [],
        });
      }, [newsletterType]);
  
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

  
    const handlePublish = () => {
      console.log('Publishing Newsletter...');
      // Implement publishing logic or API call here
    };
  
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
          // If no edits have been made, revert to the original content of the selected news letter type
          const originalContentState = htmlToEditorState(originalContent[newsletterType].content);
          setEditableContent({
            title: originalContent[newsletterType].title,
            editorState: originalContentState,
            content: originalContent[newsletterType].content,
            images: originalContent[newsletterType].images || [],
            charts: originalContent[newsletterType].charts || [],
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

  const renderContent = () => {
    const contentToDisplay = hasEdited ? editableContent : originalContent[newsletterType];
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

  return (
    <div className="newsletter-container">
      <div className="newsletter-type-selector">
        <select value={newsletterType} onChange={e => setNewsletterType(e.target.value)}>
          <option value="promotional">Promotional Newsletter</option>
          <option value="editorial">Editorial Newsletter</option>
          <option value="informational">Informational Newsletter</option>
        </select>
      </div>
      {renderContent()}
    </div>
  );
};

export { NewsLetterGeneration };