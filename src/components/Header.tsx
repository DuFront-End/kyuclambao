import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDesktopSearch(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="header-custom pb-3 pt-0 pt-lg-3">
          <div className="custom-left d-none d-lg-block">
            <img src="https://baoxuan.vov.vn/_next/static/media/left.a7f0bbbe.svg" alt="" />
          </div>
          <div className="d-lg-none">
            <img src="https://baoxuan.vov.vn/_next/static/media/banner-mobile.ee745d8e.svg" className="w-100" alt="" />
          </div>
          <div className="site-header__content container-fluid px-lg-0 d-flex align-items-center justify-content-between py-3 px-3">
            <div className="m-btn d-lg-none">
              <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenuMobile">
                <i style={{ color: "white" }} className="fal fa-bars fa-lg"></i>
              </a>
            </div>
            <h1 className="logo mb-0 text-center flex-grow-1 flex-lg-grow-0">
              <Link to="/">
                <img src="https://baoxuan.vov.vn/_next/static/media/VOV-White.579d34df.svg" alt="VOV" className="img-fluid d-none d-lg-block" style={{ width: "140px" }} />
                <img src="https://baoxuan.vov.vn/_next/static/media/vov-mobile.5dc7cf72.svg" alt="VOV" className="img-fluid d-lg-none" style={{ width: "120px" }} />
              </Link>
            </h1>
            <div className="m-btn d-lg-none">
              <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenuMobile">
                <i style={{ color: "white" }} className="fal fa-search fa-lg"></i>
              </a>
            </div>
          </div>
          <div className="custom-right d-none d-lg-block">
            <img src="https://baoxuan.vov.vn/_next/static/media/right.705d4cd9.svg" alt="" />
          </div>
          <div className="site-header__deco d-none d-lg-block text-center mt-2">
            <Link to="/">
              <img src="https://baoxuan.vov.vn/_next/static/media/slogan.4e0c75ed.png" alt="Xuân Bính Ngọ 2026" className="img-fluid" style={{ maxWidth: "641px" }} />
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="vov-navbar d-none d-lg-block">
        <div className="container-fluid">
          <ul className="nav justify-content-center">
            <li className="nav-item"><Link className="nav-link" to="/">Đất nước vào xuân</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/">Ký ức làm báo</Link></li>
            <li className="nav-item"><a className="nav-link" href="#">Bên chén trà xuân</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Sắc màu giải trí</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Tết muôn nơi</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Khát vọng Việt</a></li>
            <li className="nav-item d-none d-lg-block"><a className="nav-link" href="#">Cẩm nang Tết</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Tết Around Town</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Chúc xuân</a></li>
            <li className="nav-item"><a className="nav-link" href="#">VOV.VN</a></li>
            <li className="nav-item">
              {!showDesktopSearch ? (
                <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setShowDesktopSearch(true); }}>
                  <i className="fas fa-search"></i>
                </a>
              ) : (
                <form onSubmit={handleSearch} className="d-flex align-items-center" style={{ height: '100%', padding: '0 10px' }}>
                  <input 
                    type="text" 
                    className="form-control form-control-sm me-2" 
                    placeholder="Tìm kiếm..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    onBlur={() => setTimeout(() => setShowDesktopSearch(false), 200)}
                  />
                  <button type="submit" className="btn btn-sm btn-danger"><i className="fas fa-search"></i></button>
                </form>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Offcanvas Mobile Menu */}
      <div style={{ background: "#072438", width: "300px" }} className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasMenuMobile">
        <div className="offcanvas-header border-bottom border-secondary d-flex justify-content-between align-items-center p-3">
          <Link to="/">
            <img src="https://baoxuan.vov.vn/_next/static/media/VOV-White.579d34df.svg" alt="VOV" className="img-fluid" style={{ width: "96px" }} />
          </Link>
          <button type="button" className="border-0" style={{ background: "transparent", border: "none" }} data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path></svg>
          </button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="nav flex-column">
            <li className="nav-item border-bottom border-secondary"><Link className="nav-link px-3 py-3 text-white" to="/">Đất nước vào xuân</Link></li>
            <li className="nav-item border-bottom border-secondary"><Link className="nav-link px-3 py-3 text-white" to="/">Ký ức làm báo</Link></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">Bên chén trà xuân</a></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">Sắc màu giải trí</a></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">Tết muôn nơi</a></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">Khát vọng Việt</a></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">Cẩm nang Tết</a></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">Tết Around Town</a></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">Chúc xuân</a></li>
            <li className="nav-item border-bottom border-secondary"><a className="nav-link px-3 py-3 text-white" href="#">VOV.VN</a></li>
          </ul>
          <div className="p-3 border-top border-secondary">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Từ khóa tìm kiếm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-danger" data-bs-dismiss="offcanvas"><i className="fal fa-search text-white"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
