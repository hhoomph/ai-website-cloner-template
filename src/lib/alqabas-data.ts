import { Article, Category, Author, GalleryItem, Podcast, IssueDay } from "@/types/alqabas";

// ===================== CATEGORIES =====================
export const categories: Category[] = [
  { id: 22, name: "محليات", slug: "local", color: "#0282CB", gradient: "linear-gradient(to left bottom, #0282CB, #4FCFFF)", description: "أخبار الكويت المحلية" },
  { id: 17, name: "كتاب وآراء", slug: "opinion", color: "#0158A3", gradient: "linear-gradient(to left bottom, #0158A3, #4EA5F0)", description: "كتاب وآراء المحللين والكتاب" },
  { id: 25, name: "أمن ومحاكم", slug: "security-courts", color: "#DF1148", gradient: "linear-gradient(to left bottom, #DF1148, #FF5E95)", description: "أخبار الأمن والمحاكم" },
  { id: 3, name: "اقتصاد", slug: "economy", color: "#0158A3", gradient: "linear-gradient(to left bottom, #0158A3, #4EA5F0)", description: "أخبار الاقتصاد والأعمال" },
  { id: 10, name: "القبس الدولي", slug: "international", color: "#0282CB", gradient: "linear-gradient(to left bottom, #0282CB, #4FCFFF)", description: "أخبار العالم الدولي" },
  { id: 64662, name: "لايت", slug: "lifestyle", color: "#0282CB", gradient: "linear-gradient(to left bottom, #0282CB, #4FCFFF)", description: "منوعات وثقافة وفن" },
  { id: 64759, name: "القبس الثقافي", slug: "cultural", color: "#0282CB", gradient: "linear-gradient(to left bottom, #0282CB, #4FCFFF)", description: "ثقافة وفنون وأدب" },
  { id: 7, name: "رياضة", slug: "sports", color: "#0282CB", gradient: "linear-gradient(to left bottom, #0282CB, #4FCFFF)", description: "أخبار الرياضة" },
  { id: 64746, name: "بودكاست", slug: "podcast", color: "#0158A3", gradient: "linear-gradient(to left bottom, #0158A3, #4EA5F0)", description: "البودكاست" },
];

// ===================== AUTHORS =====================
export const authors: Author[] = [
  { id: 1, name: "وليد عبداللطيف النصف", avatar: "", title: "رئيس التحرير", bio: "رئيس تحرير جريدة القبس", articleCount: 245 },
  { id: 2, name: "عبدالله غازي المضف", avatar: "", title: "نائب رئيس التحرير", bio: "نائب رئيس تحرير جريدة القبس", articleCount: 189 },
  { id: 3, name: "د. نوح باقر", avatar: "", title: "كاتب", bio: "كاتب في الشؤون الصحية", articleCount: 67 },
  { id: 4, name: "محمد السعيد", avatar: "", title: "صحفي", bio: "صحفي متخصص في الشؤون المحلية", articleCount: 112 },
  { id: 5, name: "فهد الظفيري", avatar: "", title: "كاتب", bio: "كاتب في الشؤون السياسية", articleCount: 89 },
];

// ===================== ARTICLES =====================
const articleData: Omit<Article, "categoryName" | "categoryColor">[] = [
  // Category 22 - Local (محليات)
  { id: 1001, title: "الكويت تدين تكرار الاعتداءات الإيرانية وتؤكد حقها في صون سيادتها", summary: "أعلنت وزارة الخارجية الكويتية إدانتها الشديدة لتكرار الاعتداءات الإيرانية على السيادة الكويتية.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-%D8%AA%D8%AF%D9%8A%D9%86-%D8%AA%D9%83%D8%B1%D8%A7%D8%B1-%D8%A7%D9%84%D8%A7%D8%B9%D8%AA%D8%AF%D8%A7%D8%A1%D8%A7%D8%AA-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A%D8%A9-%D9%88%D8%AA%D8%A4%D9%83%D8%AF-%D8%AD%D9%82%D9%87%D8%A7-%D9%81%D9%8A-%D8%B5%D9%88%D9%86-%D8%B3%D9%8A%D8%A7%D8%AF%D8%AA%D9%87%D8%A7-1782626697544_large.jpeg", categoryId: 22, authorId: 1, authorName: "وليد عبداللطيف النصف", publishedAt: "2026-06-28", isFeatured: true, views: 15234 },
  { id: 1002, title: "رئاسة الأركان: الدفاعات الجوية تتصدى لهجمات صاروخية وطائرات مسيرة معادية", summary: "أعلنت رئاسة الأركان الكويتية أن الدفاعات الجوية تصدت لهجمات صاروخية وطائرات مسيرة.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%B1%D8%A6%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A3%D8%B1%D9%83%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%81%D8%A7%D8%B9%D8%A7%D8%AA-%D8%A7%D9%84%D8%AC%D9%88%D9%8A%D8%A9-%D8%AA%D8%AA%D8%B5%D8%AF%D9%89-%D9%84%D9%87%D8%AC%D9%85%D8%A7%D8%AA-%D8%B5%D8%A7%D8%B1%D9%88%D8%AE%D9%8A%D8%A9-%D9%88%D8%B7%D8%A7%D8%A6%D8%B1%D8%A7%D8%AA-%D9%85%D8%B3%D9%8A%D8%B1%D8%A9-%D9%85%D8%B9%D8%A7%D8%AF%D9%8A%D8%A9-1782605708946_large.jpeg", categoryId: 22, authorId: 2, authorName: "عبدالله غازي المضف", publishedAt: "2026-06-28", isFeatured: true, views: 12456 },
  { id: 1003, title: "ممثلة الأمين العام للأمم المتحدة لـ القبس: توقيع إطار تعاون إستراتيجي لدعم رؤية الكويت 2035", summary: "أعلنت ممثلة الأمين العام للأمم المتحدة عن توقيع إطار تعاون استراتيجي لدعم رؤية الكويت 2035.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D9%85%D9%85%D8%AB%D9%84%D8%A9-%D8%A7%D9%84%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%B9%D8%A7%D9%85-%D9%84%D9%84%D8%A3%D9%85%D9%85-%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9-%D9%84%D9%80-%D8%A7%D9%84%D9%82%D8%A8%D8%B3-%D8%AA%D9%88%D9%82%D9%8A%D8%B9-%D8%A5%D8%B7%D8%A7%D8%B1-%D8%AA%D8%B9%D8%A7%D9%88%D9%86-%D8%A5%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A-%D9%84%D8%AF%D8%B9%D9%85-%D8%B1%D8%A4%D9%8A%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-2035-%D9%82%D8%B1%D9%8A%D8%A8%D8%A7-1782590705028_large.jpeg", categoryId: 22, authorId: 1, publishedAt: "2026-06-28", isFeatured: true, views: 9834 },
  { id: 1004, title: "وزير الداخلية يوجه بتعزيز الإجراءات الأمنية في المنافذ الحدودية", summary: "وجه وزير الداخلية بتعزيز الإجراءات الأمنية في جميع المنافذ الحدودية للبلاد.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%B1%D8%A6%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A3%D8%B1%D9%83%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%81%D8%A7%D8%B9%D8%A7%D8%AA-%D8%A7%D9%84%D8%AC%D9%88%D9%8A%D8%A9-%D8%AA%D8%AA%D8%B5%D8%AF%D9%89-%D9%84%D9%87%D8%AC%D9%85%D8%A7%D8%AA-%D8%B5%D8%A7%D8%B1%D9%88%D8%AE%D9%8A%D8%A9-%D9%88%D8%B7%D8%A7%D8%A6%D8%B1%D8%A7%D8%AA-%D9%85%D8%B3%D9%8A%D8%B1%D8%A9-%D9%85%D8%B9%D8%A7%D8%AF%D9%8A%D8%A9-1782605708946_thumbnail.jpeg", categoryId: 22, authorId: 4, publishedAt: "2026-06-28", views: 7234 },
  { id: 1005, title: "البلدية تعلن مشروع تطوير الساحل الشمالي", summary: "أعلنت بلدية الكويت عن مشروع تطوير شامل للساحل الشمالي بتكلفة تقديرية.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D8%B4%D9%82%D9%8A%D9%82%D8%A7%D8%AA222-1782565488947_thumbnail.jpeg", categoryId: 22, authorId: 4, publishedAt: "2026-06-27", views: 5432 },

  // Category 17 - Opinion (كتاب وآراء)
  { id: 2001, title: "حساسية الجيرة الإيرانية", summary: "تحليل للعلاقات الكويتية الإيرانية والتحديات الراهنة في المنطقة.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%AD%D8%B3%D8%A7%D8%B3%D9%8A%D8%A9-%D8%A7%D9%84%D8%AC%D9%8A%D8%B1%D8%A9-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A%D8%A9-1782582725448_thumbnail.jpeg", categoryId: 17, authorId: 5, authorName: "فهد الظفيري", publishedAt: "2026-06-28", views: 8765 },
  { id: 2002, title: "د. نوح باقر: هكذا تحمي رئتيك من مضاعفات حرارة الصيف", summary: "نصائح طبية مهمة للوقاية من مضاعفات حرارة الصيف على الجهاز التنفسي.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%AF-%D9%86%D9%88%D8%AD-%D8%A8%D8%A7%D9%82%D8%B1-%D9%87%D9%83%D8%B0%D8%A7-%D8%AA%D8%AD%D9%85%D9%8A-%D8%B1%D8%A6%D8%AA%D9%8A%D9%83-%D9%85%D9%86-%D9%85%D8%B6%D8%A7%D8%B9%D9%81%D8%A7%D8%AA-%D8%AD%D8%B1%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B5%D9%8A%D9%81-1782584941273_thumbnail.jpeg", categoryId: 17, authorId: 3, authorName: "د. نوح باقر", publishedAt: "2026-06-28", views: 6543 },
  { id: 2003, title: "ترامب ينشر صورة له وهو يحمل الكرة الأرضية على كتفيه", summary: "الرئيس الأمريكي السابق ترامب ينشر صورة رمزية جديدة على منصته للتواصل الاجتماعي.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/e658caf53468056e-1782581485934_thumbnail.jpeg", categoryId: 17, publishedAt: "2026-06-27", views: 11234 },

  // Category 25 - Security/Courts
  { id: 3001, title: "محكمة الجنايات تصدر حكمها في قضية الرشوة الكبرى", summary: "أصدرت محكمة الجنايات حكمها في قضية الرشوة الكبرى التي هزت الرأي العام.", image: "https://dqnxlhsgmg1ih.cloudfront.net/section/1699095335228_UZBRS_large.jpeg", categoryId: 25, publishedAt: "2026-06-28", views: 9876 },
  { id: 3002, title: "الإدارة العامة للمرور تطلق حملة سلامتك", summary: "أطلقت الإدارة العامة للمرور حملة توعوية جديدة تحت شعار سلامتك.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%B1%D8%A6%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A3%D8%B1%D9%83%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%81%D8%A7%D8%B9%D8%A7%D8%AA-%D8%A7%D9%84%D8%AC%D9%88%D9%8A%D8%A9-%D8%AA%D8%AA%D8%B5%D8%AF%D9%89-%D9%84%D9%87%D8%AC%D9%85%D8%A7%D8%AA-%D8%B5%D8%A7%D8%B1%D9%88%D8%AE%D9%8A%D8%A9-%D9%88%D8%B7%D8%A7%D8%A6%D8%B1%D8%A7%D8%AA-%D9%85%D8%B3%D9%8A%D8%B1%D8%A9-%D9%85%D8%B9%D8%A7%D8%AF%D9%8A%D8%A9-1782605708946_thumbnail.jpeg", categoryId: 25, publishedAt: "2026-06-27", views: 4321 },

  // Category 3 - Economy
  { id: 4001, title: "النفط الكويتي يتجاوز 85 دولاراً للبرميل", summary: "ارتفعت أسعار النفط الكويتي لتتجاوز 85 دولاراً للبرميل وسط طلب عالمي متزايد.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-%D8%AA%D8%AF%D9%8A%D9%86-%D8%AA%D9%83%D8%B1%D8%A7%D8%B1-%D8%A7%D9%84%D8%A7%D8%B9%D8%AA%D8%AF%D8%A7%D8%A1%D8%A7%D8%AA-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A%D8%A9-%D9%88%D8%AA%D8%A4%D9%83%D8%AF-%D8%AD%D9%82%D9%87%D8%A7-%D9%81%D9%8A-%D8%B5%D9%88%D9%86-%D8%B3%D9%8A%D8%A7%D8%AF%D8%AA%D9%87%D8%A7-1782626697544_large.jpeg", categoryId: 3, publishedAt: "2026-06-28", views: 7654 },
  { id: 4002, title: "الكويت تستضيف مؤتمر الاستثمار الخليجي", summary: "تستضيف الكويت مؤتمر الاستثمار الخليجي بمشاركة واسعة من رجال الأعمال.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D9%85%D9%85%D8%AB%D9%84%D8%A9-%D8%A7%D9%84%D8%A3%D9%85%D9%8A%D9%86-%D8%A7%D9%84%D8%B9%D8%A7%D9%85-%D9%84%D9%84%D8%A3%D9%85%D9%85-%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9-%D9%84%D9%80-%D8%A7%D9%84%D9%82%D8%A8%D8%B3-%D8%AA%D9%88%D9%82%D9%8A%D8%B9-%D8%A5%D8%B7%D8%A7%D8%B1-%D8%AA%D8%B9%D8%A7%D9%88%D9%86-%D8%A5%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A-%D9%84%D8%AF%D8%B9%D9%85-%D8%B1%D8%A4%D9%8A%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-2035-%D9%82%D8%B1%D9%8A%D8%A8%D8%A7-1782590705028_large.jpeg", categoryId: 3, publishedAt: "2026-06-27", views: 5432 },

  // Category 10 - International
  { id: 5001, title: "أكسيوس: الجيش الأمريكي شن ضربات على إيران رداً على استهداف ناقلة تجارية", summary: "أفاد موقع أكسيوس بأن الجيش الأمريكي شن ضربات على أهداف إيرانية رداً على استهداف ناقلة تجارية في الخليج.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A8%D8%B7%D8%A7%D9%82%D8%A91-copy-2-1782596832784_thumbnail.jpeg", categoryId: 10, publishedAt: "2026-06-28", isPremium: true, views: 21345 },
  { id: 5002, title: "مورينيو: أغلق التلفاز بعد 10 دقائق في بعض مباريات كأس العالم", summary: "صرح المدرب البرتغالي جوزيه مورينيو بأنه يغلق التلفاز بعد 10 دقائق من بعض مباريات كأس العالم.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/e6d8a71bd11543d08ceabc9ac03e7aaf-1782562087924_thumbnail.jpeg", categoryId: 10, publishedAt: "2026-06-27", views: 8765 },

  // Category 64662 - Lifestyle
  { id: 6001, title: "5 تمارين تُرهق الركبتين بعد سن الستين", summary: "تعرف على 5 تمارين يجب تجنبها بعد سن الستين للحفاظ على صحة الركبتين.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/5-%D8%AA%D9%85%D8%A7%D8%B1%D9%8A%D9%86-%D8%AA%D8%B1%D9%87%D9%82-%D8%A7%D9%84%D8%B1%D9%83%D8%A8%D8%AA%D9%8A%D9%86-%D8%A8%D8%B9%D8%AF-%D8%B3%D9%86-%D8%A7%D9%84%D8%B3%D8%AA%D9%8A%D9%86-1782583359445_thumbnail.jpeg", categoryId: 64662, publishedAt: "2026-06-28", views: 12345 },
  { id: 6002, title: "أطعمة ومشروبات تعزز الاسترخاء قبل النوم", summary: "قائمة بأفضل الأطعمة والمشروبات التي تساعد على الاسترخاء وتحسين جودة النوم.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A3%D8%B7%D8%B9%D9%85%D8%A9-%D9%88%D9%85%D8%B4%D8%B1%D9%88%D8%A8%D8%A7%D8%AA-%D8%AA%D8%B9%D8%B2%D8%B2-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%AE%D8%A7%D8%A1-%D9%82%D8%A8%D9%84-%D8%A7%D9%84%D9%86%D9%88%D9%85-1782583104522_thumbnail.jpeg", categoryId: 64662, publishedAt: "2026-06-27", views: 9876 },
  { id: 6003, title: "علماء يدرسون سر طول العمر لدى 3 شقيقات في البرازيل", summary: "علماء يدرسون حالة 3 شقيقات في البرازيل تجاوزن المائة عام لفهم سر طول العمر.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D8%B4%D9%82%D9%8A%D9%82%D8%A7%D8%AA222-1782565488947_thumbnail.jpeg", categoryId: 64662, publishedAt: "2026-06-26", views: 7654 },
  { id: 6004, title: "ويليس كاريير.. مخترع التكييف أنقذ البشرية من لهيب الصيف", summary: "قصة مخترع جهاز التكييف الذي غير حياة البشرية وأنقذ الملايين من حرارة الصيف.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/11141-1782547560246_thumbnail.jpeg", categoryId: 64662, publishedAt: "2026-06-26", views: 6543 },

  // Category 7 - Sports
  { id: 7001, title: "الكويت تفوز على السعودية في خليجي 26", summary: "منتخب الكويت لكرة القدم يفوز على نظيره السعودي في بطولة خليجي 26.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D8%B4%D9%82%D9%8A%D9%82%D8%A7%D8%AA222-1782565488947_thumbnail.jpeg", categoryId: 7, publishedAt: "2026-06-28", views: 15678 },
  { id: 7002, title: "نادي الكويت يعلن تعاقده مع مدرب جديد", summary: "أعلن نادي الكويت الرياضي تعاقده مع مدرب جديد لقيادة الفريق في الموسم المقبل.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/e6d8a71bd11543d08ceabc9ac03e7aaf-1782562087924_thumbnail.jpeg", categoryId: 7, publishedAt: "2026-06-27", views: 6543 },
  { id: 7003, title: "الكويت تستعد لاستضافة البطولة العربية لألعاب القوى", summary: "الكويت تستعد لاستضافة البطولة العربية لألعاب القوى في نسختها الجديدة.", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%AF-%D9%86%D9%88%D8%AD-%D8%A8%D8%A7%D9%82%D8%B1-%D9%87%D9%83%D8%B0%D8%A7-%D8%AA%D8%AD%D9%85%D9%8A-%D8%B1%D8%A6%D8%AA%D9%8A%D9%83-%D9%85%D9%86-%D9%85%D8%B6%D8%A7%D8%B9%D9%81%D8%A7%D8%AA-%D8%AD%D8%B1%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B5%D9%8A%D9%81-1782584941273_thumbnail.jpeg", categoryId: 7, publishedAt: "2026-06-26", views: 4321 },
];

// ===================== DATA HELPERS =====================
function enrichArticles(articles: Omit<Article, "categoryName" | "categoryColor">[]): Article[] {
  return articles.map((a) => {
    const cat = categories.find((c) => c.id === a.categoryId);
    return {
      ...a,
      categoryName: cat?.name || "غير مصنف",
      categoryColor: cat?.gradient || "#0158A3",
      content: generateContent(a),
    };
  });
}

function generateContent(article: Omit<Article, "categoryName" | "categoryColor">): string {
  return `
    <p>${article.summary}</p>
    <p>تشهد الساحة المحلية تطورات متسارعة في هذا الشأن، حيث أكدت المصادر الرسمية أن الجهات المعنية تتابع الموقف عن كثب واتخذت الإجراءات اللازمة.</p>
    <p>وقالت المصادر إن الكويت تؤكد دائماً على أهمية الحوار والطرق الدبلوماسية في حل الخلافات، مع الاحتفاظ بحقها في الدفاع عن سيادتها وأمنها الوطني وفقاً للقانون الدولي.</p>
    <p>من جانبه، أشاد المراقبون بالجهود التي تبذلها الجهات المختصة في متابعة هذا الملف المهم، مؤكدين أن الكويت كانت وما زالت مثالاً يحتذى به في المنطقة في التعامل مع مثل هذه المواقف بحكمة واقتدار.</p>
    <p>يذكر أن هذه التطورات تأتي في إطار التوترات الإقليمية المستمرة، والتي تتطلب موقفاً موحداً من الدول العربية للحفاظ على أمن واستقرار المنطقة.</p>
  `;
}

export const articles: Article[] = enrichArticles(articleData);

// ===================== GALLERY =====================
export const galleries: GalleryItem[] = [
  { id: 1, title: "معرض الصور: الكويت في الليل", image: "https://dqnxlhsgmg1ih.cloudfront.net/section/1752419692900_wMUXm_large.jpeg", description: "صور بانورامية للمعالم الكويتية في الليل", date: "2026-06-28" },
  { id: 2, title: "معرض صور: افتتاح معرض الكتاب", image: "https://dqnxlhsgmg1ih.cloudfront.net/section/1699095335228_UZBRS_large.jpeg", description: "صور من افتتاح معرض الكويت الدولي للكتاب", date: "2026-06-27" },
  { id: 3, title: "معرض: الرياضة الكويتية", image: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D8%B4%D9%82%D9%8A%D9%82%D8%A7%D8%AA222-1782565488947_thumbnail.jpeg", description: "أبرز اللقطات الرياضية", date: "2026-06-26" },
];

// ===================== PODCASTS =====================
export const podcasts: Podcast[] = [
  { id: 1, title: "بودكاست القبس - الأخبار اليومية", description: "نشرة الأخبار اليومية من جريدة القبس", coverImage: "https://dqnxlhsgmg1ih.cloudfront.net/section/1699095335228_UZBRS_large.jpeg", audioUrl: "/audio/podcast1.mp3", duration: "15:30", date: "2026-06-28", host: "محمد السعيد" },
  { id: 2, title: "حوار الأسبوع مع وليد النصف", description: "حوار خاص مع رئيس التحرير حول أبرز القضايا", coverImage: "https://dqnxlhsgmg1ih.cloudfront.net/storage/attachments/5967/%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA-%D8%AA%D8%AF%D9%8A%D9%86-%D8%AA%D9%83%D8%B1%D8%A7%D8%B1-%D8%A7%D9%84%D8%A7%D8%B9%D8%AA%D8%AF%D8%A7%D8%A1%D8%A7%D8%AA-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A%D8%A9-%D9%88%D8%AA%D8%A4%D9%83%D8%AF-%D8%AD%D9%82%D9%87%D8%A7-%D9%81%D9%8A-%D8%B5%D9%88%D9%86-%D8%B3%D9%8A%D8%A7%D8%AF%D8%AA%D9%87%D8%A7-1782626697544_large.jpeg", audioUrl: "/audio/podcast2.mp3", duration: "42:15", date: "2026-06-27", host: "وليد عبداللطيف النصف" },
];

// ===================== ISSUES =====================
export const issues: IssueDay[] = [
  { date: "2026-06-28", title: "عدد اليوم", pdfUrl: "https://www.alqabas.com/pdf/2026-06-28.pdf" },
  { date: "2026-06-27", title: "عدد أمس", pdfUrl: "https://www.alqabas.com/pdf/2026-06-27.pdf" },
  { date: "2026-06-26", title: "عدد السبت", pdfUrl: "https://www.alqabas.com/pdf/2026-06-26.pdf" },
];

// ===================== API FUNCTIONS =====================
export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.isFeatured).slice(0, 6);
}

export function getMostReadArticles(limit = 10): Article[] {
  return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
}

export function getArticlesByCategory(categoryId: number): Article[] {
  return articles.filter((a) => a.categoryId === categoryId);
}

export function getArticlesByAuthor(authorId: number): Article[] {
  return articles.filter((a) => a.authorId === authorId);
}

export function getArticle(id: number): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getCategory(id: number): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAuthor(id: number): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) => a.title.includes(q) || a.summary.includes(q) || a.categoryName.includes(q) || a.authorName?.includes(q)
  );
}

export function getRecentArticles(limit = 20): Article[] {
  return [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);
}

export function getPremiumArticles(): Article[] {
  return articles.filter((a) => a.isPremium);
}