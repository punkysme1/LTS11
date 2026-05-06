/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ManuscriptDetail from './pages/ManuscriptDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Guestbook from './pages/Guestbook';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/katalog/:id" element={<ManuscriptDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/buku-tamu" element={<Guestbook />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/donasi" element={<Donation />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}
