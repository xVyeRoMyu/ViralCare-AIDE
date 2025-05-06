import React from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-8xl mb-4">😷</div>
        <h1 className="text-4xl font-bold mb-4 text-healthcare-700">404</h1>
        <p className="text-xl text-gray-600 mb-2">Halaman yang anda cari tidak ditemukan atau belum dibuat,</p>
		<p className="text-xl text-gray-600 mb-8">kami minta maaf atas ketidaknyamanan ini.</p>
        <Link 
          to="/" 
          className="bg-healthcare-600 text-white px-6 py-3 rounded-lg hover:bg-healthcare-700 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;