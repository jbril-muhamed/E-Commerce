import { useEffect, useState } from 'react';
import { getHeroBanners, getFooterBanners, getFeaturedProducts, getProducts } from '../api';
import HeroBanner from '../components/HeroBanner';
import FooterBanner from '../components/FooterBanner';
import Product from '../components/Product';
import Footer from '../components/Footer';

const Home = () => {
  const [heroBanners, setHeroBanners] = useState([]);
  const [footerBanners, setFooterBanners] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, footerRes, featuredRes, allRes] = await Promise.all([
          getHeroBanners(),
          getFooterBanners(),
          getFeaturedProducts(),
          getProducts(),
        ]);
        setHeroBanners(heroRes.data);
        setFooterBanners(footerRes.data);
        setFeaturedProducts(featuredRes.data);
        setAllProducts(allRes.data);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner banners={heroBanners} />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-2">
            Best Selling Products
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Explore our most popular picks
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Footer Banner */}
      <FooterBanner banners={footerBanners} />

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No products found.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
