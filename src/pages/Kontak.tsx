import React from 'react';
import Layout from '../components/layout/Layout';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Kontak = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-healthcare-700">Kontak Kami</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-xl font-semibold mb-2 text-healthcare-700">Kirim Pesan</h2>
            <p className="text-gray-600 mb-6">
              Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi tim kami.
            </p>
            
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-healthcare-600 text-white px-4 py-2 rounded hover:bg-healthcare-700 transition-colors"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">📍</div>
            <h2 className="text-xl font-semibold mb-4 text-healthcare-700">Informasi Kontak</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">📧</span>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 font-bold">Email</h3>
                  <p className="text-gray-700">support@viralcare-aide.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-3">📱</span>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 font-bold">Telepon</h3>
                  <p className="text-gray-700">+62 123 4567 890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-3">🏢</span>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 font-bold">Alamat</h3>
                  <p className="text-gray-700">
                    Universitas Klabat<br />
                    Manado, Indonesia
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
			  <h3 className="text-lg font-medium mb-4 text-healthcare-700">Ikuti Kami</h3>
			  <div className="flex flex-col space-y-5">
				<a href="#" className="group flex items-center gap-3">
				  <div className="text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-110">
					<FaFacebook size={24} />
				  </div>
				  <span className="text-sm font-medium text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-105">
					Facebook
				  </span>
				</a>
				<a href="#" className="group flex items-center gap-3">
				  <div className="text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-110">
					<FaInstagram size={24} />
				  </div>
				  <span className="text-sm font-medium text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-105">
					Instagram
				  </span>
				</a>
				<a href="#" className="group flex items-center gap-3">
				  <div className="text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-110">
					<FaXTwitter size={24} />
				  </div>
				  <span className="text-sm font-medium text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-105">
					X
				  </span>
				</a>
				<a href="#" className="group flex items-center gap-3">
				  <div className="text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-110">
					<FaYoutube size={24} />
				  </div>
				  <span className="text-sm font-medium text-healthcare-600 group-hover:text-healthcare-800 transition-all duration-200 group-hover:scale-105">
					YouTube
				  </span>
				</a>
			  </div>
			</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Kontak;