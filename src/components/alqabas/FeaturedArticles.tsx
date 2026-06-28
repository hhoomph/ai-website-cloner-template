import { ShareIcon, PlayIcon } from "./icons";

const articles = [
  {
    id: 1,
    title: "الكويت تدين تكرار الاعتداءات الإيرانية وتؤكد حقها في صون سيادتها",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-%D8%AA%D8%AF%D9%8A%D9%86-%D8%AA%D9%83%D8%B1%D8%A7%D8%B1-%D8%A7%D9%84%D8%A7%D8%B9%D8%AA%D8%AF%D8%A7%D8%A1%D8%A7%D8%AA-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A%D8%A9-%D9%88%D8%AA%D8%A4%D9%83%D8%AF-%D8%AD%D9%82%D9%87%D8%A7-%D9%81%D9%8A-%D8%B5%D9%88%D9%86-%D8%B3%D9%8A%D8%A7%D8%AF%D8%AA%D9%87%D8%A7-1782626697544_large.jpeg",
    category: "محليات",
    categoryColor: "linear-gradient(to left bottom, #0282CB, #4FCFFF)",
    hasVideo: false,
  },
  {
    id: 2,
    title: "رئاسة الأركان: الدفاعات الجوية تتصدى لهجمات صاروخية وطائرات مسيرة معادية",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%B1%D8%A6%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A3%D8%B1%D9%83%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%81%D8%A7%D8%B9%D8%A7%D8%AA-%D8%A7%D9%84%D8%AC%D9%88%D9%8A%D8%A9-%D8%AA%D8%AA%D8%B5%D8%AF%D9%89-%D9%84%D9%87%D8%AC%D9%85%D8%A7%D8%AA-%D8%B5%D8%A7%D8%B1%D9%88%D8%AE%D9%8A%D8%A9-%D9%88%D8%B7%D8%A7%D8%A6%D8%B1%D8%A7%D8%AA-%D9%85%D8%B3%D9%8A%D8%B1%D8%A9-%D9%85%D8%B9%D8%A7%D8%AF%D9%8A%D8%A9-1782605708946_large.jpeg",
    category: "محليات",
    categoryColor: "linear-gradient(to left bottom, #0282CB, #4FCFFF)",
    hasVideo: false,
  },
  {
    id: 3,
    title: "ممثلة الأمين العام للأمم المتحدة لـ القبس: توقيع إطار تعاون إستراتيجي لدعم رؤية الكويت 2035.. قريباً",
    image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D9%85%D9%85%D8%AB%D9%84%D8%A9-%D8%A7%D9%84%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%B9%D8%A7%D9%85-%D9%84%D9%84%D8%A3%D9%85%D9%85-%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9-%D9%84%D9%80-%D8%A7%D9%84%D9%82%D8%A8%D8%B3-%D8%AA%D9%88%D9%82%D9%8A%D8%B9-%D8%A5%D8%B7%D8%A7%D8%B1-%D8%AA%D8%B9%D8%A7%D9%88%D9%86-%D8%A5%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A-%D9%84%D8%AF%D8%B9%D9%85-%D8%B1%D8%A4%D9%8A%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-2035-%D9%82%D8%B1%D9%8A%D8%A8%D8%A7-1782590705028_large.jpeg",
    category: "محليات",
    categoryColor: "linear-gradient(to left bottom, #0282CB, #4FCFFF)",
    hasVideo: false,
  },
];

const featured = {
  title: "الكويت تدين تكرار الاعتداءات الإيرانية وتؤكد حقها في صون سيادتها",
  image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-%D8%AA%D8%AF%D9%8A%D9%86-%D8%AA%D9%83%D8%B1%D8%A7%D8%B1-%D8%A7%D9%84%D8%A7%D8%B9%D8%AA%D8%AF%D8%A7%D8%A1%D8%A7%D8%AA-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A%D8%A9-%D9%88%D8%AA%D8%A4%D9%83%D8%AF-%D8%AD%D9%82%D9%87%D8%A7-%D9%81%D9%8A-%D8%B5%D9%88%D9%86-%D8%B3%D9%8A%D8%A7%D8%AF%D8%AA%D9%87%D8%A7-1782626697544_large.jpeg",
};

export default function FeaturedArticles() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Featured Article (spans 2 cols on desktop) */}
        <div className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-sm">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Content */}
            <div className="absolute bottom-0 right-0 left-0 p-6">
              <span
                className="inline-block px-3 py-1 text-xs text-white rounded-full mb-2"
                style={{ background: "linear-gradient(to left bottom, #0282CB, #4FCFFF)" }}
              >
                محليات
              </span>
              <h2 className="text-white text-xl md:text-2xl font-bold leading-tight">{featured.title}</h2>
            </div>
            {/* Share Button */}
            <div className="absolute top-4 left-4">
              <button className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                <ShareIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Side Articles */}
        <div className="flex flex-col gap-4">
          {articles.slice(0, 2).map((article) => (
            <div key={article.id} className="relative group cursor-pointer overflow-hidden rounded-sm flex-1">
              <div className="relative h-full min-h-[180px] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-4">
                  <span
                    className="inline-block px-2 py-0.5 text-xs text-white rounded-full mb-1"
                    style={{ background: article.categoryColor }}
                  >
                    {article.category}
                  </span>
                  <h3 className="text-white text-sm font-bold leading-tight line-clamp-2">{article.title}</h3>
                </div>
                <div className="absolute top-3 left-3">
                  <button className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors">
                    <ShareIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}