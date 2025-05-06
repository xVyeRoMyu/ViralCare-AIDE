import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const Penyakit = () => {
  const [currentPandemicIndex, setCurrentPandemicIndex] = useState(0);
  const [hoveredPandemic, setHoveredPandemic] = useState(null);

  const diseases = [
    {
      name: "COVID-19",
      emoji: "🦠",
      symptoms: "Demam, batuk kering, kelelahan, kehilangan indra penciuman dan perasa",
      prevention: "Vaksinasi, menjaga jarak, memakai masker, sering mencuci tangan"
    },
    {
      name: "Influenza",
      emoji: "🤧",
      symptoms: "Demam tinggi, sakit tenggorokan, nyeri otot, batuk, kelelahan",
      prevention: "Vaksinasi tahunan, mencuci tangan, menghindari kontak dengan orang sakit"
    },
    {
      name: "Demam Berdarah",
      emoji: "🦟",
      symptoms: "Demam tinggi, nyeri otot dan sendi, ruam, pendarahan ringan",
      prevention: "Menghilangkan genangan air, menggunakan kelambu, memakai repellent"
    },
    {
      name: "Tuberculosis",
      emoji: "🫁",
      symptoms: "Batuk berkepanjangan, batuk darah, nyeri dada, penurunan berat badan",
      prevention: "Vaksinasi BCG, ventilasi baik, deteksi dini dan pengobatan tepat"
    },
    {
      name: "Cacar Air",
      emoji: "😰",
      symptoms: "Ruam merah gatal, lecet kecil berisi cairan, demam, kelelahan",
      prevention: "Vaksinasi varicella, menghindari kontak dengan orang terinfeksi"
    },
    {
      name: "Diare",
      emoji: "🚽",
      symptoms: "Tinja encer, kram perut, mual, muntah, demam ringan",
      prevention: "Cuci tangan, konsumsi air bersih, makanan yang dimasak dengan benar"
    },
    {
      name: "Malaria",
      emoji: "🩸",
      symptoms: "Demam tinggi, menggigil, sakit kepala, mual, nyeri otot",
      prevention: "Kelambu berinsektisida, repellent, profilaksis untuk traveler"
    },
    {
      name: "Hepatitis B",
      emoji: "🟡",
      symptoms: "Kelelahan, mual, sakit perut, kulit kuning, urin gelap",
      prevention: "Vaksinasi, hindari berbagi jarum, hubungan seks aman"
    },
    {
      name: "Campak",
      emoji: "🤒",
      symptoms: "Demam tinggi, batuk, pilek, mata merah, ruam kulit",
      prevention: "Vaksinasi MMR, isolasi penderita, kebersihan tangan"
    },
    {
      name: "Kolera",
      emoji: "💦",
      symptoms: "Diare berat, dehidrasi, muntah, kram otot",
      prevention: "Air bersih, sanitasi baik, vaksin oral, masak makanan matang"
    },
    {
      name: "Polio",
      emoji: "🦵",
      symptoms: "Demam, kelelahan, muntah, nyeri otot, kelumpuhan",
      prevention: "Vaksinasi IPV/OPV, kebersihan tangan, sanitasi baik"
    },
    {
      name: "HIV/AIDS",
      emoji: "🩹",
      symptoms: "Demam berkepanjangan, penurunan berat badan, infeksi oportunistik",
      prevention: "Penggunaan kondom, tidak berbagi jarum, PrEP untuk risiko tinggi"
    },
    {
      name: "Ebola",
      emoji: "🧪",
      symptoms: "Demam mendadak, lemah, nyeri otot, sakit kepala, perdarahan",
      prevention: "Hindari kontak dengan pasien/benda terkontaminasi, karantina ketat"
    },
    {
      name: "Zika",
      emoji: "🦟",
      symptoms: "Demam ringan, ruam, nyeri sendi, konjungtivitis",
      prevention: "Kontrol nyamuk, repellent, hindari daerah endemik saat hamil"
    },
    {
      name: "SARS",
      emoji: "😷",
      symptoms: "Demam tinggi, batuk kering, sesak napas, sakit kepala",
      prevention: "Kebersihan tangan, masker, isolasi penderita, ventilasi baik"
    }
  ];

  const pandemics = [
    {
      year: "1347-1351",
      name: "Black Death",
      deaths: "75-200 juta",
      description: "Wabah pes yang menyebar melalui kutu tikus, menghancurkan 30-60% populasi Eropa",
      link: "https://www.who.int/news-room/fact-sheets/detail/plague"
    },
    {
      year: "1918-1920",
      name: "Flu Spanyol",
      deaths: "50-100 juta",
      description: "Pandemi influenza H1N1 yang menyebar secara global setelah Perang Dunia I",
      link: "https://www.cdc.gov/flu/pandemic-resources/1918-commemoration/1918-pandemic-history.htm"
    },
    {
      year: "1957-1958",
      name: "Flu Asia",
      deaths: "1-4 juta",
      description: "Pandemi influenza H2N2 yang berasal dari Singapura",
      link: "https://www.cdc.gov/flu/pandemic-resources/1957-1958-pandemic.html"
    },
    {
      year: "1968-1969",
      name: "Flu Hong Kong",
      deaths: "1-4 juta",
      description: "Pandemi influenza H3N2 yang menjadi strain flu musiman dominan",
      link: "https://www.cdc.gov/flu/pandemic-resources/1968-pandemic.html"
    },
    {
      year: "2002-2004",
      name: "SARS",
      deaths: "774",
      description: "Wabah coronavirus pertama abad 21 dengan tingkat kematian ~10%",
      link: "https://www.who.int/health-topics/severe-acute-respiratory-syndrome"
    },
    {
      year: "2009-2010",
      name: "Flu Babi",
      deaths: "150-575 ribu",
      description: "Pandemi influenza H1N1 yang berasal dari Meksiko",
      link: "https://www.cdc.gov/flu/pandemic-resources/2009-h1n1-pandemic.html"
    },
    {
      year: "2014-2016",
      name: "Ebola",
      deaths: "11,325",
      description: "Wabah Ebola terbesar di Afrika Barat dengan tingkat kematian ~40%",
      link: "https://www.who.int/emergencies/situations/ebola-outbreak-2014-2016"
    },
    {
      year: "2019-Sekarang",
      name: "COVID-19",
      deaths: "6.9 juta+",
      description: "Pandemi coronavirus global dengan dampak kesehatan dan ekonomi besar",
      link: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
    }
  ];

  const handleNext = () => {
    if (currentPandemicIndex < pandemics.length - 4) {
      setCurrentPandemicIndex(currentPandemicIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentPandemicIndex > 0) {
      setCurrentPandemicIndex(currentPandemicIndex - 1);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 border-b-2 border-blue-500 pb-3 mb-8">
          🦠 Info Penyakit Menular
        </h1>
        <p className="text-center italic text-gray-600 mb-10 text-lg">
          Berikut adalah informasi tentang beberapa penyakit menular umum, gejalanya, dan cara pencegahannya.
          Untuk informasi lebih detail, silakan konsultasikan dengan asisten virtual kami atau profesional kesehatan.
        </p>
        
        {/* Diseases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {diseases.map((disease, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{disease.emoji}</span>
                <h2 className="text-xl font-semibold text-healthcare-700">{disease.name}</h2>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Gejala</h3>
                <p className="mt-1 text-gray-700">{disease.symptoms}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pencegahan</h3>
                <p className="mt-1 text-gray-700">{disease.prevention}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Pandemic Roadmap */}
        <div>
          <h2 className="text-2xl font-bold text-healthcare-700 border-b-2 border-healthcare-500 pb-4 text-center">
            Sejarah Pandemi Mematikan
          </h2>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              disabled={currentPandemicIndex === 0}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-healthcare-600 text-white flex items-center justify-center ${currentPandemicIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-healthcare-700'}`}
            >
              &lt;
            </button>
            
            <button 
              onClick={handleNext}
              disabled={currentPandemicIndex >= pandemics.length - 4}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-healthcare-600 text-white flex items-center justify-center ${currentPandemicIndex >= pandemics.length - 4 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-healthcare-700'}`}
            >
              &gt;
            </button>

            {/* Timeline Container */}
            <div className="flex overflow-hidden py-12 ml-20"> {/* Added vertical padding */}
              <div 
                className="flex -space-x-20 transition-transform duration-500 ease-in-out" /* Increased horizontal spacing */
                style={{ 
                  transform: `translateX(-${currentPandemicIndex * 320}px)`, /* Adjusted for wider spacing */
                  minHeight: '300px' /* Added minimum height */
                }}
              >
                {pandemics.map((pandemic, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-80 relative" /* Increased width */
                    onMouseEnter={() => setHoveredPandemic(index)}
                    onMouseLeave={() => setHoveredPandemic(null)}
                  >
                    <div className="relative h-[300px]">
					  {/* Vertical line */}
					  <div className="absolute h-10 w-1 bg-healthcare-600 left-1/2 transform -translate-x-1/2 -bottom-16" />

					  {/* Timeline Dot + Text */}
					  <div
						className="absolute left-1/2 transform -translate-x-1/2"
						style={{ bottom: `calc(-10px)` }}
					  >
						<div className="w-14 h-14 rounded-full bg-healthcare-600 border-4 border-white flex items-center justify-center mx-auto">
						  <span className="text-white font-bold text-lg">{index + 1}</span>
						</div>
						<div className="text-center mt-4">
						  <h3 className="font-semibold text-lg text-healthcare-800">
							{pandemic.name}
						  </h3>
						  <p className="text-md text-gray-600 mt-1">{pandemic.year}</p>
						</div>
					  </div>
					</div>


                    {/* Detailed Info on Hover */}
					{hoveredPandemic === index && (
					  <div className="absolute z-20 -top-10 transform -translate-x-1/2 w-80 bg-white p-6 rounded-lg shadow-xl border border-gray-200 animate-popup">
						<p className="text-md text-gray-700">{pandemic.description}</p>
						<p className="text-md font-medium text-red-600 mt-3">
						  Kematian: {pandemic.deaths}
						</p>
						<a 
						  href={pandemic.link} 
						  target="_blank" 
						  rel="noopener noreferrer"
						  className="inline-block mt-4 px-4 py-2 bg-healthcare-100 text-healthcare-700 rounded-md text-md hover:bg-healthcare-200 transition-colors"
						>
						  Pelajari Lebih Lanjut
						</a>
					  </div>
					)}

                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Base Line */}
            <div className="h-1 bg-healthcare-500 mx-14 rounded-full"></div> {/* Thicker line */}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-healthcare-100 rounded-lg border border-healthcare-700">
          <h2 className="text-2xl font-semibold mb-4 text-healthcare-700">Memerlukan Informasi Lebih Lanjut?</h2>
          <p className="text-gray-700 mb-4">
            Jika Anda mencari informasi tentang penyakit menular lainnya atau ingin mengetahui lebih detail, 
            jangan ragu untuk bertanya kepada asisten virtual kami dengan mengklik ikon dokter di pojok kanan bawah layar.
          </p>
          <p className="text-gray-700">
            Kami siap membantu Anda dengan informasi terkait penyakit menular, gejala, pengobatan, dan pencegahannya.
          </p>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-popup {
          animation: popup 0.3s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
};

export default Penyakit;