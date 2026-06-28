import Header from "@/components/alqabas/Header";
import FeaturedArticles from "@/components/alqabas/FeaturedArticles";
import SideWidget from "@/components/alqabas/SideWidget";
import Footer from "@/components/alqabas/Footer";

export default function Home() {
  return (
    <div className="page_pageContainer__fY2h2 homePage_homePage__ea0MG">
      <Header />
      <main>
        {/* Featured / Top Stories */}
        <FeaturedArticles />

        {/* Highlighted Video Section */}
        <section
          className="max-w-7xl mx-auto px-4 py-8"
          style={{
            backgroundImage: "url('https://dqnxlhsgmg1ih.cloudfront.net/section/1752419692900_wMUXm_large.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "300px",
          }}
        >
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors">
                <svg width="40" height="40" viewBox="0 0 80 80" fill="none">
                  <path d="M57.5 40C57.501 40.4244 57.3922 40.8419 57.1841 41.2118C56.976 41.5817 56.6758 41.8914 56.3125 42.1109L33.8 55.8828C33.4204 56.1152 32.9857 56.2421 32.5407 56.2503C32.0958 56.2586 31.6566 56.1479 31.2688 55.9297C30.8845 55.7149 30.5645 55.4016 30.3415 55.0221C30.1185 54.6426 30.0006 54.2105 30 53.7703V26.2297C30.0006 25.7895 30.1185 25.3574 30.3415 24.9779C30.5645 24.5984 30.8845 24.2851 31.2688 24.0703C31.6566 23.8521 32.0958 23.7414 32.5407 23.7497C32.9857 23.7579 33.4204 23.8848 33.8 24.1172L56.3125 37.8891C56.6758 38.1086 56.976 38.4183 57.1841 38.7882C57.3922 39.1581 57.501 39.5756 57.5 40Z" fill="white" />
                </svg>
              </div>
              <p className="text-white text-lg font-bold">فيديو مميز</p>
            </div>
          </div>
        </section>

        {/* Article Grid + Side Widget */}
        <SideWidget />

        {/* Newsletter / Subscription Section */}
        <section className="bg-[#EFF3F5] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <svg width="80" height="26" viewBox="0 0 685 221" fill="none" className="flex-shrink-0">
                  <path d="M374.3102,132.4761 L374.3102,58.2721 L331.4342,93.9291 C334.8772,100.6241 334.7242,106.0871 334.7242,111.6571 L334.7142,132.4761 L327.2572,132.4761 L349.8472,156.2761 L354.8222,78.5501 L359.7992,156.2761 L382.7582,132.4761 L374.3102,132.4761 Z" fill="#005C9C" />
                  <path d="M486.865,132.4761 L486.865,120.3401 C486.865,106.7731 492.4,96.1511 508.564,96.1511 L517.228,96.1601 L517.231,132.4761 L486.865,132.4761 Z M590.169,74.1991 L590.169,132.4761 L556.824,132.4761 L556.824,58.8831 L513.782,58.8831 C471.291,58.8831 447.824,80.4771 447.824,120.7221 L447.824,132.4761 L385.512,132.4761 L366.459,163.0581 L410.374,157.6681 L374.912,169.6351 L629.751,169.6351 L629.751,1.0761 L584.952,42.3791 C588.706,50.2451 590.169,58.2891 590.169,74.1991 L590.169,74.1991 Z" fill="#005C9C" />
                  <path d="M324.5255,132.4761 L264.7265,132.4761 L264.7265,53.3931 L221.8525,89.0491 C225.2955,95.7451 225.1415,101.2081 225.1415,106.7771 L225.1315,132.4761 L201.1865,132.4761 L201.1865,58.2721 L158.2945,93.9291 C161.7375,100.6241 161.5845,106.0871 161.5845,111.6571 L161.5915,132.4761 L137.6455,132.4761 L137.6445,63.1511 L94.7555,98.8081 C98.1985,105.5031 98.0465,110.9671 98.0465,116.5341 L98.0435,135.7831 C98.0055,164.7111 86.7495,182.8211 60.1935,182.8211 C16.5245,182.8211 7.3965,120.4381 47.0365,85.4411 C20.0325,93.4971 0.3375,118.5101 0.3375,148.1321 C0.3375,184.2651 27.1685,213.5581 67.3225,213.5581 C103.3785,213.5581 126.7875,195.2241 135.2675,169.6351 L334.7335,169.6351 L299.2715,157.6681 L343.1855,163.0581 L324.5255,132.4761 Z" fill="#005C9C" />
                  <path d="M640.4118,41.7585 C644.1658,49.6245 645.6278,57.6685 645.6278,73.5785 L645.7188,179.1955 C670.5058,165.7345 684.7618,141.1205 684.7618,100.4295 L684.7618,0.8695 L640.4118,41.7585 Z" fill="#005C9C" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-[#005C9C]">النشرة البريدية</h3>
                  <p className="text-sm text-gray-600">اشترك لتصلك أهم الأخبار يومياً</p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="flex-1 md:w-64 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#005C9C]"
                />
                <button className="bg-[#005C9C] text-white px-6 py-2 rounded-md text-sm hover:bg-[#004d82] transition-colors whitespace-nowrap">
                  اشتراك
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}