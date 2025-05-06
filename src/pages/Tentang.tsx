import React from 'react';
import Layout from '../components/layout/Layout';

const Tentang = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-healthcare-700">Tentang ViralCare AIDE</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-healthcare-600">Visi & Misi</h2>
          <p className="text-gray-700 mb-4">
            ViralCare AIDE adalah asisten virtual berbasis AI yang dirancang untuk memberikan rekomendasi dan informasi tentang pencegahan penyakit menular di masyarakat.
          </p>
          <p className="text-gray-700 mb-4">
            Visi kami adalah menciptakan masyarakat yang lebih sehat dengan memberikan akses informasi kesehatan yang mudah dan terpercaya untuk semua orang.
          </p>
          <p className="text-gray-700">
            Misi kami adalah meningkatkan pengetahuan masyarakat tentang penyakit menular, mendorong pola hidup sehat, dan mendukung pencapaian Tujuan Pembangunan Berkelanjutan (SDGs).
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-healthcare-600">Bagaimana Kami Bekerja</h2>
          <p className="text-gray-700 mb-4">
            ViralCare AIDE menggunakan teknologi AI Gemini 1.5 & Gemini 2.0 Flash untuk memproses pertanyaan Anda dan memberikan informasi yang relevan dan akurat.
          </p>
          <p className="text-gray-700 mb-4">
            Asisten virtual kami dapat membantu Anda dengan:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li className="mb-2">Informasi tentang gejala penyakit menular</li>
            <li className="mb-2">Rekomendasi obat-obatan yang sesuai untuk kondisi kesehatan Anda</li>
            <li className="mb-2">Panduan tentang makanan dan minuman yang sebaiknya dikonsumsi atau dihindari</li>
            <li className="mb-2">Tips pencegahan penyebaran penyakit menular</li>
            <li>Informasi umum seputar kesehatan dan penyakit menular</li>
          </ul>
          <p className="text-gray-700">
            <b>Perlu diingatkan bahwa ViralCare AIDE tidak menggantikan konsultasi dengan profesional kesehatan. Selalu konsultasikan masalah kesehatan serius dengan dokter.</b>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Tentang;