import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { articles } from '../data/articles';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) || 
      article.description.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <Layout>
      <section className="category-page pt-3" style={{ minHeight: 'calc(100vh - 400px)' }}>
        <div className="container-xxl">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-12">
              
              <div className="custom-article mb-4">
                <div className="row g-0">
                  <div className="col-12 col-md-10">
                    <h2 className="px-4 py-2">
                       <span style={{ fontSize: '24px' }}>
                         Kết quả tìm kiếm: "{query}" ({results.length})
                       </span>
                    </h2>
                  </div>
                  <div className="col-12 col-md-2 position-relative">
                    <div className="triangle-wrap"></div>
                    <div className="w-100 h-100" style={{ background: '#f6ebd1', borderRadius: '16px 16px 0 0' }}></div>
                  </div>
                </div>
                
                <div className="views-element-container p-4" style={{ backgroundColor: '#F8F1E1', borderRadius: '0 16px 16px 16px' }}>
                  {results.length > 0 ? (
                    results.map((article, index) => (
                      <article key={index} className="row g-2 align-items-center article-item">
                        <div className="col-7 col-md-8 order-2 order-md-1">
                          <Link to={article.link} style={{ textDecoration: 'none' }}>
                            <h5>{article.title}</h5>
                          </Link>
                          <p className="mb-0 description">{article.description}</p>
                        </div>
                        <div className="col-5 col-md-4 order-1 order-md-2">
                          <Link to={article.link}>
                            <img src={article.imageUrl} className="img-fluid w-100" style={{ borderRadius: '16px' }} alt={article.title} />
                          </Link>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <i className="far fa-search fa-3x mb-3 text-muted"></i>
                      <h4 className="text-muted">Không tìm thấy bài viết nào phù hợp với từ khóa "{query}".</h4>
                      <p>Vui lòng thử lại với từ khóa khác.</p>
                      <Link to="/" className="btn btn-danger mt-3">Quay về trang chủ</Link>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;
