const articleList = [
  {
    id: 1,
    title: "علماء يدرسون سر طول العمر لدى 3 شقيقات في البرازيل",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D8%B4%D9%82%D9%8A%D9%82%D8%A7%D8%AA222-1782565488947_thumbnail.jpeg",
  },
  {
    id: 2,
    title: "ويليس كاريير.. مخترع التكييف أنقذ البشرية من لهيب الصيف",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/11141-1782547560246_thumbnail.jpeg",
  },
  {
    id: 3,
    title: "رئاسة الأركان: الدفاعات الجوية تتصدى لهجمات صاروخية وطائرات مسيرة معادية",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%B1%D8%A6%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A3%D8%B1%D9%83%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%81%D8%A7%D8%B9%D8%A7%D8%AA-%D8%A7%D9%84%D8%AC%D9%88%D9%8A%D8%A9-%D8%AA%D8%AA%D8%B5%D8%AF%D9%89-%D9%84%D9%87%D8%AC%D9%85%D8%A7%D8%AA-%D8%B5%D8%A7%D8%B1%D9%88%D8%AE%D9%8A%D8%A9-%D9%88%D8%B7%D8%A7%D8%A6%D8%B1%D8%A7%D8%AA-%D9%85%D8%B3%D9%8A%D8%B1%D8%A9-%D9%85%D8%B9%D8%A7%D8%AF%D9%8A%D8%A9-1782605708946_thumbnail.jpeg",
  },
  {
    id: 4,
    title: "ترامب ينشر صورة له وهو يحمل الكرة الأرضية على كتفيه",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/e658caf53468056e-1782581485934_thumbnail.jpeg",
  },
  {
    id: 5,
    title: "أكسيوس: الجيش الأمريكي شن ضربات على إيران رداً على استهداف ناقلة تجارية",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A8%D8%B7%D8%A7%D9%82%D8%A91-copy-2-1782596832784_thumbnail.jpeg",
  },
  {
    id: 6,
    title: "مورينيو: أغلق التلفاز بعد 10 دقائق في بعض مباريات كأس العالم",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/e6d8a71bd11543d08ceabc9ac03e7aaf-1782562087924_thumbnail.jpeg",
  },
  {
    id: 7,
    title: "حساسية الجيرة الإيرانية",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%AD%D8%B3%D8%A7%D8%B3%D9%8A%D8%A9-%D8%A7%D9%84%D8%AC%D9%8A%D8%B1%D8%A9-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A%D8%A9-1782582725448_thumbnail.jpeg",
  },
  {
    id: 8,
    title: "د. نوح باقر: هكذا تحمي رئتيك من مضاعفات حرارة الصيف",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%AF-%D9%86%D9%88%D8%AD-%D8%A8%D8%A7%D9%82%D8%B1-%D9%87%D9%83%D8%B0%D8%A7-%D8%AA%D8%AD%D9%85%D9%8A-%D8%B1%D8%A6%D8%AA%D9%8A%D9%83-%D9%85%D9%86-%D9%85%D8%B6%D8%A7%D8%B9%D9%81%D8%A7%D8%AA-%D8%AD%D8%B1%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B5%D9%8A%D9%81-1782584941273_thumbnail.jpeg",
  },
  {
    id: 9,
    title: "5 تمارين تُرهق الركبتين بعد سن الستين",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/5-%D8%AA%D9%85%D8%A7%D8%B1%D9%8A%D9%86-%D8%AA%D8%B1%D9%87%D9%82-%D8%A7%D9%84%D8%B1%D9%83%D8%A8%D8%AA%D9%8A%D9%86-%D8%A8%D8%B9%D8%AF-%D8%B3%D9%86-%D8%A7%D9%84%D8%B3%D8%AA%D9%8A%D9%86-1782583359445_thumbnail.jpeg",
  },
  {
    id: 10,
    title: "أطعمة ومشروبات تعزز الاسترخاء قبل النوم",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A3%D8%B7%D8%B9%D9%85%D8%A9-%D9%88%D9%85%D8%B4%D8%B1%D9%88%D8%A8%D8%A7%D8%AA-%D8%AA%D8%B9%D8%B2%D8%B2-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%AE%D8%A7%D8%A1-%D9%82%D8%A8%D9%84-%D8%A7%D9%84%D9%86%D9%88%D9%85-1782583104522_thumbnail.jpeg",
  },
];

export default function SideWidget() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area - placeholder for article grid */}
        <div className="lg:col-span-2">
          {/* Article Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articleList.slice(3, 9).map((article) => (
              <div key={article.id} className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Widget - Most Read */}
        <div className="bg-[#EFF3F5] rounded-sm p-4">
          <h3 className="text-lg font-bold text-[#005C9C] mb-4 border-b-2 border-[#005C9C] pb-2">الأكثر قراءة</h3>
          <div className="space-y-3">
            {articleList.slice(0, 5).map((article) => (
              <div key={article.id} className="flex gap-3 group cursor-pointer">
                <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded-sm">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0">
                    <span className="text-[#005C9C] font-bold text-lg leading-none" style={{ textShadow: "0 0 2px white" }}>
                      {String(article.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-gray-800 leading-snug line-clamp-3 group-hover:text-[#005C9C] transition-colors">
                    {article.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}