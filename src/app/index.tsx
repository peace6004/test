/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { DataIngestion } from './pages/DataIngestion/DataIngestion';
import { TargetingData } from './pages/DataIngestion/TargetingData';
import { ContentGenerationOptions } from './pages/ContentGeneration/ContentGenerationOptions';
import { EmailSequenceGeneration } from './pages/ContentGeneration/EmailSequenceGeneration';
import { BlogPostGeneration } from './pages/ContentGeneration/BlogPostGeneration';
import { LinkedInPostGeneration } from './pages/ContentGeneration/LinkedInPostGeneration';
import { LandingPageGeneration } from './pages/ContentGeneration/LandingPageGeneration';
import { useTranslation } from 'react-i18next';
import { Login } from './pages/Login/Login';
import { OnePagerGeneration } from './pages/ContentGeneration/OnePagerGeneration';
import { NewsLetterGeneration } from './pages/ContentGeneration/NewsLetterGeneration';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/data-ingestion" element={<DataIngestion />} />
        <Route path="/targeting-data" element={<TargetingData />} />
        <Route
          path="/content-generation"
          element={<ContentGenerationOptions />}
        />
        <Route
          path="/email-sequence-generation"
          element={<EmailSequenceGeneration />}
        />
        <Route path="/blog-post-generation" element={<BlogPostGeneration />} />
        <Route
          path="/linkedin-post-generation"
          element={<LinkedInPostGeneration />}
        />
        <Route
          path="/landing-page-generation"
          element={<LandingPageGeneration />}
        />
        <Route path="/one-pager-generation" element={<OnePagerGeneration />} />
        <Route
          path="/news-letter-generation"
          element={<NewsLetterGeneration />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
