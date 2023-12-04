import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './BlogPostGeneration.css';
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

const BlogPostGeneration = () => {
  const [pageType, setPageType] = useState('press-release');
  const [isEditing, setIsEditing] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [editableContent, setEditableContent] = useState({
    title: '',
    editorState: EditorState.createEmpty(),
  });

  const originalContent = {
    'press-release': {
      title: 'Exciting News from Our Company',
      editorState: htmlToEditorState(`
      <h1 class="press-release-title">Atomic AI Raises $30M to Revolutionize AI Sales</h1>
      
      <p class="press-release-date">November 30, 2023</p>
      
      <img src="company-logo.png" alt="Company Logo" class="press-release-logo" />
      
      <p class="press-release-intro">We are thrilled to announce that we have secured $30 million in funding to drive innovation in the AI sales industry. This milestone marks a new chapter in our journey to revolutionize the way businesses approach AI-powered sales strategies.</p>
      
      <p class="press-release-quote">
        "This funding will be instrumental in scaling our operations, enhancing our product offerings, and expanding our global reach. It opens up exciting opportunities for collaboration and innovation in AI technologies."
      </p>
      
      <p class="press-release-details">Here are some key highlights of this exciting development:</p>
      
      <ul class="press-release-highlights">
        <li>Secured a $30 million funding round led by prominent investors.</li>
        <li>Plans to expand our presence to new international markets.</li>
        <li>Investment to accelerate research and development of cutting-edge AI solutions for sales.</li>
      </ul>
      <p class="press-release-conclusion">We are incredibly excited about the future and the opportunities that lie ahead. This significant funding will propel us to new heights and allow us to continue pushing the boundaries of AI technology in the sales domain. Stay tuned for more updates as we embark on this thrilling journey together.</p>
      
      <p class="press-release-signature">John Doe</p>
      <p class="press-release-signature">CEO, Atomic AI</p>
    `)
  },
  'top-5-ai': {
    title: 'AI Content Creation Tools: Top 5 Companies to Watch in 2023',
    editorState: htmlToEditorState(`
      <h3 class="blog-post-subtitle">What is AI Content Creation?</h3>
      <p class="blog-post-description">AI content creation involves the use of artificial intelligence technologies to automatically generate written, visual, or audio content, spanning articles, translations, images, videos, music, and more. Through advanced algorithms and models, AI can mimic human creativity and language skills, producing content that appears human-crafted. This technology finds applications in text generation, language translation, content summarization, image and video creation, music composition, data visualization, content personalization, and even chatbots and virtual assistants. While AI content creation offers efficiency and quality benefits, it also raises ethical concerns, necessitating responsible usage to address issues like plagiarism, misinformation, and malicious content generation.</p>
      <h3 class="blog-post-subtitle">1. Atomic AI</h3>
      <div class="generative-image"></div>
      <p class="blog-post-description">Best for sales and marketing content creation</p>
      <p class="blog-post-description">Atomic AI is a leading AI-powered platform that specializes in creating personalized, engaging sales and marketing content. Its standout features include:</p>
      <ul class="blog-post-features">
        <li>Advanced content personalization</li>
        <li>Effective keyword optimization</li>
        <li>Engagement analytics</li>
      </ul>
      <p class="blog-post-limitations">Limitations: Atomic AI may have a learning curve for beginners, and it requires a subscription.</p>
      <p class="blog-post-price">Price: Subscription plans start at $49 per month.</p>

      <h3 class="blog-post-subtitle">2. ClickUp</h3>
      <p class="blog-post-description">Best for marketing project management and AI content writing assistance</p>
      <p class="blog-post-description">ClickUp is an all-in-one project management software that offers hundreds of customizable features to give individuals and teams the flexibility and tools they need to work smarter and boost productivity. Its notable features include:</p>
      <ul class="blog-post-features">
        <li>Task management and collaboration tools</li>
        <li>AI-driven content writing assistance</li>
        <li>Integration with popular marketing tools</li>
      </ul>
      <p class="blog-post-limitations">Limitations: ClickUp's extensive features may be overwhelming for smaller teams, and it may require training for full utilization.</p>
      <p class="blog-post-price">Price: Free plan available, premium plans start at $5 per user per month.</p>

      <h3 class="blog-post-subtitle">3. WriterBot</h3>
      <p class="blog-post-description">Best for generating blog posts and articles</p>
      <p class="blog-post-description">WriterBot is an AI-driven content generator that excels in producing high-quality blog posts and articles. Its standout features include:</p>
      <ul class="blog-post-features">
        <li>Natural language generation</li>
        <li>Topic research and suggestions</li>
        <li>Grammar and plagiarism checks</li>
      </ul>
      <p class="blog-post-limitations">Limitations: WriterBot may have limitations in generating highly technical or specialized content.</p>
      <p class="blog-post-price">Price: Pricing starts at $29 per month.</p>

      <h3 class="blog-post-subtitle">4. ContentGenius</h3>
      <p class="blog-post-description">Best for content optimization and SEO</p>
      <p class="blog-post-description">ContentGenius is a comprehensive AI tool for optimizing content for search engines. Its standout features include:</p>
      <ul class="blog-post-features">
        <li>Keyword analysis and optimization</li>
        <li>Competitor content analysis</li>
        <li>Content performance tracking</li>
      </ul>
      <p class="blog-post-limitations">Limitations: ContentGenius may be less suitable for content creation from scratch.</p>
      <p class="blog-post-price">Price: Plans start at $39 per month.</p>

      <h3 class="blog-post-subtitle">5. CopyCraft</h3>
      <p class="blog-post-description">Best for generating marketing copy and product descriptions</p>
      <p class="blog-post-description">CopyCraft is a specialized AI tool for crafting persuasive marketing copy and product descriptions. Its standout features include:</p>
      <ul class="blog-post-features">
        <li>Copywriting templates and frameworks</li>
        <li>A/B testing for copy performance</li>
        <li>E-commerce integration</li>
      </ul>
      <p class="blog-post-limitations">Limitations: CopyCraft may have limitations when it comes to creative storytelling or long-form content.</p>
      <p class="blog-post-price">Price: Subscription plans start at $35 per month.</p>

      <h2 class="blog-post-subtitle">Supercharge Your Content Creation Process with Atomic AI</h2>
      <p>Content creation is a critical part of your marketing strategy. Good content can make or break a successful marketing campaign. Among these top AI content creation tools, Atomic AI stands out as the ideal choice for sales and marketing content creation. It empowers businesses to create personalized, engaging content and can significantly enhance your marketing efforts.</p>

      <p>AI content creation tools can save you time and ensure consistency in the content you produce. AI-generated content can be just as effective as human-written content for your brand, especially when you have tools like Atomic AI, WriterBot, ContentGenius, CopyCraft, and ClickUp AI at your disposal. Choose the right AI tool that aligns with your content needs and take control of the content creation process.</p>

      <p>By incorporating these AI content creation tools into your workflow, you can save valuable time and resources, allowing your team to focus on creative ideation and strategic planning. So, don't hesitate to explore these tools and see how they can supercharge your content creation process. For personalized, engaging sales and marketing content, give Atomic AI a try!</p>

      <p class="blog-post-author">Author: Sean Kwon</p>
      <p class="blog-post-author-description">Sean Kwon is a content specialist. He specializes in writing information-rich pieces on digital and content marketing.</p>
    `)
  },
  'generic': {
    title: 'How to Use AI to Be More Creative',
    editorState: htmlToEditorState(`
      <p>Welcome to our blog post on how you can utilize AI to boost your creativity. Creativity is a powerful force that drives innovation, problem-solving, and self-expression. Whether you're an artist, a writer, a business professional, or someone looking to tap into their creative potential, AI can be a valuable tool to enhance and amplify your creativity.</p>
      <div class="generative-image"></div>
      <p>AI has come a long way in recent years, and its applications are increasingly diverse. While it might seem counterintuitive to some, AI can be a catalyst for creativity rather than a hindrance. Here are some ways AI can fuel your creative journey:</p>
  
      <ul>
        <li><strong>Idea Generation:</strong> AI-powered idea generators can provide you with fresh concepts and inspiration for your projects. By inputting a few keywords or parameters, AI can generate a multitude of ideas that you can build upon.</li>
  
        <li><strong>Content Creation:</strong> AI-driven content generators can assist writers, bloggers, and content creators by suggesting ideas, generating articles, or even creating poetry. This allows you to focus on refining and shaping the content, rather than starting from scratch.</li>
  
        <li><strong>Artistic Assistance:</strong> AI tools like deep learning algorithms and neural networks can assist artists by generating art, creating music, or even helping in the design process. These tools provide a collaborative and innovative approach to art creation.</li>
  
        <li><strong>Data-Driven Insights:</strong> AI can analyze vast amounts of data to identify trends, patterns, and insights that can inspire new ideas or guide decision-making. This data-driven creativity can be particularly valuable in marketing and business strategy.</li>
  
        <li><strong>Personalized Recommendations:</strong> AI-driven recommendation engines, like those used by streaming platforms and e-commerce websites, can introduce you to new books, movies, music, and art that align with your tastes, expanding your creative horizons.</li>
      </ul>
  
      <p>While AI can be a fantastic creative partner, it's essential to approach its use thoughtfully:</p>
  
      <ul>
        <li><strong>Embrace Collaboration:</strong> Use AI as a collaborator, not a replacement. Combine AI-generated ideas with your creative input to produce unique and compelling work.</li>
  
        <li><strong>Experiment and Explore:</strong> Don't be afraid to experiment with different AI tools and platforms. Explore their capabilities to find what resonates best with your creative process.</li>
  
        <li><strong>Learn and Adapt:</strong> Stay updated on the latest AI advancements in your field. AI technology is constantly evolving, and being aware of its capabilities can help you harness its potential effectively.</li>
  
        <li><strong>Maintain Your Unique Voice:</strong> While AI can help streamline the creative process, ensure your unique voice and perspective shine through in your work.</li>
  
        <li><strong>Ethical Considerations:</strong> Be mindful of ethical concerns related to AI-generated content and copyright. Always attribute AI-generated content as appropriate.</li>
      </ul>
      <div class="generative-image"></div>
      <p>AI is not here to replace human creativity but to amplify and enhance it. By integrating AI into your creative process, you can access new ideas, insights, and possibilities that can take your creativity to new heights. Embrace AI as a valuable tool in your creative toolkit, and watch your imagination soar.</p>
  
      <p>Remember, creativity knows no bounds, and with AI as your creative companion, the possibilities are endless.</p>
    `)
  }
  };

  useEffect(() => {
    setHasEdited(false);
    setIsEditing(false);
    setEditableContent({
      title: originalContent[pageType].title,
      editorState: originalContent[pageType].editorState,
    });
  }, [pageType]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setHasEdited(true);

    const currentContent = editableContent.editorState.getCurrentContent();
    const newHtml = stateToHTML(currentContent);

    setEditableContent((prev) => ({
      ...prev,
      content: newHtml,
    }));

    console.log('Saved content:', newHtml);
  };

  const handlePublish = () => {
    console.log('Publishing One-Pager...');
    // Typically, send data to a backend server
  };

  const renderImages = (images) => {
    return images.map((img, index) => (
      <div key={index} className="generative-image">
        <img src={img.url} alt={img.caption} />
        <p>{img.caption}</p>
      </div>
    ));
  };

  const renderCharts = (charts) => {
    return charts.map((chart, index) => (
      <div key={index} className="chart-placeholder">
        {chart.caption}
      </div>
    ));
  };

  const renderBlogPostContent = () => {
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
    <div className="blog-post-container">
      <div className="page-type-selector">
        <select value={pageType} onChange={(e) => setPageType(e.target.value)}>
          <option value="press-release">Press Release</option>
          <option value="top-5-ai">Top 5 AI Companies</option>
          <option value="generic">Generic</option>
        </select>
      </div>
      <div className="content">
      {renderBlogPostContent()}
      </div>
      <div className="edit-buttons">
      {isEditing ? (
          <>
            <button className="save-button" onClick={handleSave}>              Save
            </button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="publish-button" onClick={handlePublish}>
              Publish
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { BlogPostGeneration };