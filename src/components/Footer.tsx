import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer mt-0" id="site-footer">
      <div className="container-fluid position-relative py-4">
        <div className="custom-left d-none d-xxl-block">
          <img className="position-absolute" src="https://baoxuan.vov.vn/_next/static/media/left-footer.c98d66a6.svg" alt="" style={{ left: 0, bottom: 0 }} />
        </div>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 ">
              <h2 className="logo ">
                <Link to="/">
                  <img src="https://baoxuan.vov.vn/_next/static/media/VOV-White.579d34df.svg" alt="BÁO ĐIỆN TỬ VOV" className="img-fluid d-block mx-auto" style={{ maxWidth: "200px" }} />
                </Link>
              </h2>
            </div>
          </div>
          <div className="row align-items-center text-white footer-info mt-4">
            <div className="col-12 col-lg-6 mb-4 mb-md-0 text-center text-lg-end">
              <p className="mb-2">Tổng Biên tập: NGÔ THIỆU PHONG</p>
              <p className="mb-2">Phó Tổng Biên tập: Phạm Công Hân, Đặng Thị Khanh, Giang Trung Sơn, Nguyễn Tuyết Yến</p>
              <p className="mb-0">Cơ quan chủ quản: ĐÀI TIẾNG NÓI VIỆT NAM</p>
            </div>
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <p className="mb-2">Trụ sở: 37 Bà Triệu, Cửa Nam, Hà Nội, Việt Nam</p>
              <p className="mb-2">Điện thoại: 84-24-22105148, 84-24-39785691</p>
              <p className="mb-2">Thư điện tử: baodientuvov@vov.vn</p>
            </div>
          </div>
        </div>
        <div className="custom-right d-none d-xxl-block">
          <img className="position-absolute" src="https://baoxuan.vov.vn/_next/static/media/right-footer.87f46fe3.svg" alt="" style={{ right: 0, bottom: 0 }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
