import Link from "next/link";
import { Article } from "@/types/alqabas";

export function ArticleCard({ article, variant = "default" }: { article: Article; variant?: "default" | "compact" | "featured" }) {
  if (variant === "featured") {
    return (
      <Link href={`/article/${article.id}`} className="relative group cursor-pointer overflow-hidden rounded-sm block h-full">
        <div className="relative h-full min-h-[200px] overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 right-0 left-0 p-4">
            <span className="inline-block px-2 py-0.5 text-xs text-white rounded-full mb-1" style={{ background: article.categoryColor }}>
              {article.categoryName}
            </span>
            <h3 className="text-white text-sm font-bold leading-tight line-clamp-2">{article.title}</h3>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/article/${article.id}`} className="flex gap-3 group cursor-pointer">
        <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded-sm">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-medium text-gray-800 leading-snug line-clamp-3 group-hover:text-[#005C9C] transition-colors">{article.title}</h4>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.id}`} className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 group cursor-pointer block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {article.isPremium && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">مميز</span>
        )}
      </div>
      <div className="p-3">
        <span className="inline-block px-2 py-0.5 text-[10px] text-white rounded-full mb-1" style={{ background: article.categoryColor }}>
          {article.categoryName}
        </span>
        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{article.title}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.summary}</p>
      </div>
    </Link>
  );
}

export function ArticleGrid({ articles, variant }: { articles: Article[]; variant?: "default" | "compact" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant={variant} />
      ))}
    </div>
  );
}