import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 350px)', backgroundColor: '#FDFCF7' }}>
        <div className="container text-center py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              
              {/* Graphic/Typographic 404 Element */}
              <div className="mb-4" style={{ position: 'relative' }}>
                <h1 
                  style={{ 
                    fontSize: '8rem', 
                    fontWeight: '900', 
                    color: '#e0e0e0', 
                    lineHeight: '1',
                    marginBottom: '0',
                    textShadow: '4px 4px 0px #fff, 8px 8px 0px rgba(0,0,0,0.05)'
                  }}
                >
                  404
                </h1>
                <div 
                  className="position-absolute w-100" 
                  style={{ top: '50%', left: '0', transform: 'translateY(-50%)' }}
                >
                  <p className="fs-4 fw-bold text-danger mb-0" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>
                    LỖI - KHÔNG TÌM THẤY TRANG
                  </p>
                </div>
              </div>
              
              <h2 className="mb-3">Xin lỗi, trang bạn tìm kiếm không tồn tại!</h2>
              <p className="text-muted mb-4 fs-5">
                Đường dẫn có thể đã bị thay đổi, xóa bỏ, hoặc bạn đã nhập sai địa chỉ URL. 
                Hãy thử kiểm tra lại đường dẫn nhé.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                <button 
                  onClick={() => navigate(-1)} 
                  className="btn btn-outline-secondary px-4 py-2"
                  style={{ borderRadius: '8px', fontWeight: '500' }}
                >
                  <i className="fas fa-arrow-left me-2"></i> Trở về trang trước
                </button>
                
                <Link 
                  to="/" 
                  className="btn btn-danger px-4 py-2"
                  style={{ 
                    borderRadius: '8px', 
                    fontWeight: '500', 
                    background: 'linear-gradient(90deg, #CE1628 0%, #E23330 100%)',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(206, 22, 40, 0.2)'
                  }}
                >
                  <i className="fas fa-home me-2"></i> Về thẳng Trang Chủ
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
