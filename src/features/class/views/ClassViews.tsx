import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Poppins } from "../../_global/components/Text";
import ClassLayout from "../components/ClassLayout";
import { useCategories } from "../../categories/hooks/useCategories";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { FaSearch, FaTimes } from "react-icons/fa";

export const ClassViews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const { data: categoriesData } = useCategories();
  
  const [searchInput, setSearchInput] = useState(queryParams.search || "");
  const selectedCategory = queryParams.categoryId || "";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedParams = { ...queryParams };
    if (searchInput) {
      updatedParams.search = searchInput;
    } else {
      delete updatedParams.search;
    }
    updatedParams.page = "1"; // reset page
    setSearchParams(updatedParams);
  };

  const handleCategorySelect = (categoryId: string) => {
    const updatedParams = { ...queryParams };
    if (categoryId) {
      updatedParams.categoryId = categoryId;
    } else {
      delete updatedParams.categoryId;
    }
    updatedParams.page = "1";
    setSearchParams(updatedParams);
  };

  const handleLevelSelect = (level: string) => {
    const updatedParams = { ...queryParams };
    if (level) {
      updatedParams.level = level;
    } else {
      delete updatedParams.level;
    }
    updatedParams.page = "1";
    setSearchParams(updatedParams);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters = !!(queryParams.search || queryParams.categoryId || queryParams.level);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* ─── HERO HEADER WITH UNSPLASH IMAGE ───────────────────────── */}
      <div className="relative min-h-[460px] flex items-center justify-center overflow-hidden">
        {/* Unsplash Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80')` }}
        />
        {/* Deep modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f2d]/90 via-[#1a3a5c]/80 to-[#2b6394]/75" />
        
        {/* Decorative blur blobs */}
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-[#f1c857]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-10 w-96 h-96 bg-[#2b6394]/25 rounded-full blur-3xl pointer-events-none" />
        
        {/* Bottom smooth fade to page content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8fafc] to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-5">

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mt-1">
            Jelajahi Kelas &{" "}
            <span className="bg-gradient-to-r from-[#f1c857] to-[#fdd878] bg-clip-text text-transparent">
              Mulai Belajar
            </span>
          </h1>
          
          <Poppins className="text-gray-200 text-sm md:text-base max-w-xl leading-relaxed">
            Tingkatkan keahlian teknismu dengan kelas-kelas pilihan terstruktur yang dirancang langsung oleh praktisi IT berpengalaman.
          </Poppins>

          {/* Search Box inside Hero */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mt-6 relative flex items-center">
            <div className="relative w-full shadow-lg rounded-full overflow-hidden border border-white/10">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari kelas pemrograman, desain, atau jaringan..."
                className="w-full px-6 py-4 pr-12 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f1c857] text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-[#f1c857] to-[#e8b830] text-slate-900 flex items-center justify-center shadow-md hover:scale-[1.05] transition-transform active:scale-95"
              >
                <FaSearch size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ─── FILTERS & CATALOG CONTENT ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        
        {/* Controls Container (Filters & Categories) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm -mt-8 relative z-20 space-y-6">
          
          {/* Categories Horizontal Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                Kategori Kelas
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                >
                  <FaTimes size={10} />
                  Bersihkan Filter
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => handleCategorySelect("")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                  !selectedCategory
                    ? "bg-[#2b6394] text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Semua Kategori
              </button>
              {categoriesData?.data?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#2b6394] text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter Tabs & Search query preview */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">

            {/* Selected query preview */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400">Aktif:</span>
                {queryParams.search && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200">
                    "{queryParams.search}"
                    <FaTimes
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => {
                        setSearchInput("");
                        const updated = { ...queryParams };
                        delete updated.search;
                        setSearchParams(updated);
                      }}
                    />
                  </span>
                )}
                {queryParams.categoryId && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200">
                    Kategori Terpilih
                    <FaTimes
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => handleCategorySelect("")}
                    />
                  </span>
                )}
                {queryParams.level && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200">
                    {queryParams.level}
                    <FaTimes
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => handleLevelSelect("")}
                    />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Class Catalog Grid Layout */}
        <ClassLayout />

      </div>
    </div>
  );
};
