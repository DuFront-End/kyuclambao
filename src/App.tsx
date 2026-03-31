import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Article from './pages/articles/Article';
import BtsVinhDuLon from './pages/articles/BtsVinhDuLon';
import CayNuocBietNgheLoi from './pages/articles/CayNuocBietNgheLoi';
import DonTetTruongSa from './pages/articles/DonTetTruongSa';
import GreyD from './pages/articles/GreyD';
import HaTrucLinh from './pages/articles/HaTrucLinh';
import HocVanHoaHau from './pages/articles/HocVanHoaHau';
import JukySan from './pages/articles/JukySan';
import KhiQuanChuc from './pages/articles/KhiQuanChuc';
import KhuongLe from './pages/articles/KhuongLe';
import KiNiemViTuong from './pages/articles/KiNiemViTuong';
import PhuongOanh from './pages/articles/PhuongOanh';
import QuachThuPhuong from './pages/articles/QuachThuPhuong';
import QuachThuPhuong2 from './pages/articles/QuachThuPhuong2';
import SaoViet313 from './pages/articles/SaoViet313';

import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/trangchu" element={<HomePage />} />
        <Route path="/trangchu.html" element={<HomePage />} />
        
        <Route path="/article" element={<Article />} />
        <Route path="/article.html" element={<Article />} />
        
        <Route path="/bts-vinh-du-lon" element={<BtsVinhDuLon />} />
        <Route path="/bts-vinh-du-lon.html" element={<BtsVinhDuLon />} />
        
        <Route path="/cay-nuoc-biet-nghe-loi" element={<CayNuocBietNgheLoi />} />
        <Route path="/cay-nuoc-biet-nghe-loi.html" element={<CayNuocBietNgheLoi />} />
        
        <Route path="/don-tet-truong-sa" element={<DonTetTruongSa />} />
        <Route path="/don-tet-truong-sa.html" element={<DonTetTruongSa />} />
        
        <Route path="/grey-d" element={<GreyD />} />
        <Route path="/grey-d.html" element={<GreyD />} />
        
        <Route path="/ha-truc-linh" element={<HaTrucLinh />} />
        <Route path="/ha-truc-linh.html" element={<HaTrucLinh />} />
        
        <Route path="/hoc-van-hoa-hau" element={<HocVanHoaHau />} />
        <Route path="/hoc-van-hoa-hau.html" element={<HocVanHoaHau />} />
        
        <Route path="/juky-san" element={<JukySan />} />
        <Route path="/juky-san.html" element={<JukySan />} />
        
        <Route path="/khi-quan-chuc" element={<KhiQuanChuc />} />
        <Route path="/khi-quan-chuc.html" element={<KhiQuanChuc />} />
        
        <Route path="/khuong-le" element={<KhuongLe />} />
        <Route path="/khuong-le.html" element={<KhuongLe />} />
        
        <Route path="/ki-niem-vi-tuong" element={<KiNiemViTuong />} />
        <Route path="/ki-niem-vi-tuong.html" element={<KiNiemViTuong />} />
        
        <Route path="/phuong-oanh" element={<PhuongOanh />} />
        <Route path="/phuong-oanh.html" element={<PhuongOanh />} />
        
        <Route path="/quach-thu-phuong" element={<QuachThuPhuong />} />
        <Route path="/quach-thu-phuong.html" element={<QuachThuPhuong />} />
        
        <Route path="/quach-thu-phuong-2" element={<QuachThuPhuong2 />} />
        <Route path="/quach-thu-phuong-2.html" element={<QuachThuPhuong2 />} />
        
        <Route path="/sao-viet-313" element={<SaoViet313 />} />
        <Route path="/sao-viet-313.html" element={<SaoViet313 />} />
      </Routes>
    </Router>
  );
}

export default App;
