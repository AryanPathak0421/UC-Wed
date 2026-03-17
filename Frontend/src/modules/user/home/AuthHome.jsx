import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendors } from '../../../data/vendors';

const AuthHome = () => {
  const navigate = useNavigate();
  const [currentCity] = useState('Indore');
  
  // Get trending vendors (first 10 vendors with isTrending: true)
  const trendingVendors = vendors.filter(vendor => vendor.isTrending).slice(0, 10);
  
  // Get 10 venues for "Venues in your city" section
  const venuesInCity = vendors.filter(vendor => vendor.category === 'venues').slice(0, 10);
  
  // Get 10 budget-friendly vendors (makeup and mehndi)
  const budgetFriendlyVendors = vendors.filter(vendor => 
    vendor.category === 'makeup' || vendor.category === 'mehndi'
  ).slice(0, 10);
  
  // Get 10 editor's choice vendors (photographers and planning-decor)
  const editorsChoiceVendors = vendors.filter(vendor => 
    vendor.category === 'photographers' || vendor.category === 'planning-decor'
  ).slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SECTION 1 - TOP HEADER */}
      <header className="sticky top-0 z-50 px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - City selector */}
          <div className="flex items-center gap-2 cursor-pointer">
            <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">{currentCity}</span>
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* Right side - Action icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        
        {/* SECTION 2 - CATEGORY ICONS ROW */}
        <section>
          <div className="horizontal-scroll-container flex gap-4 overflow-x-auto pb-4 px-2">
            {[
              { name: 'Wedding Venues', icon: 'building' },
              { name: 'Wedding Photographers', icon: 'camera' },
              { name: 'Bridal Makeup Artists', icon: 'palette' },
              { name: 'Wedding Decorators', icon: 'decoration' }
            ].map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group min-w-[70px] flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-200 bg-pink-100">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <span className="text-xs text-center font-medium leading-tight max-w-[70px] text-gray-600">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 - WEDDING PLANNING TOOLS */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Wedding Planning tools
          </h2>
          
          <div className="horizontal-scroll-container flex gap-4 overflow-x-auto pb-4">
            {[
              { title: 'Build your Digital E-invites', subtitle: "Let's get started", bgColor: '#fdf2f8' },
              { title: 'Your shortlisted vendors', subtitle: 'Browse vendors', bgColor: '#fffbeb' },
              { title: 'Your favourites', subtitle: 'Add a favourite', bgColor: '#ecfdf5' }
            ].map((tool, index) => (
              <div
                key={index}
                className="scroll-snap-card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] cursor-pointer group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
              >
                <div 
                  className="rounded-lg p-4 mb-4"
                  style={{ backgroundColor: tool.bgColor }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-3">
                      <h3 className="font-semibold text-sm mb-1 text-gray-900">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {tool.subtitle}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 - VENUES IN YOUR CITY */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Venues in your city
          </h2>
          
          <div className="horizontal-scroll-container flex gap-4 overflow-x-auto pb-4">
            {venuesInCity.map((venue) => (
              <div
                key={venue.id}
                className="scroll-snap-card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] cursor-pointer group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                onClick={() => navigate(`/user/vendor/${venue.id}`)}
              >
                <div className="relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {venue.verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 line-clamp-1">
                    {venue.name}
                  </h3>
                  <p className="text-xs mb-2 flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {venue.location}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">{venue.rating}</span>
                      <span className="text-xs text-gray-500">({venue.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-pink-600">
                        {venue.price}
                      </span>
                      <p className="text-xs text-gray-400">
                        per function
                      </p>
                    </div>
                    <button className="text-xs text-pink-500 hover:text-pink-600 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button 
              onClick={() => navigate('/user/vendors/venues')}
              className="px-8 py-2 border-2 border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
            >
              View all venues
            </button>
          </div>
        </section>

        {/* SECTION 5 - TRENDING VENDORS NEAR YOU */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Trending Vendors Near You
            </h2>
          </div>
          
          {/* Vendors Slider - SMOOTH HORIZONTAL SCROLL */}
          <div className="trending-vendors-container">
            <div className="horizontal-scroll-container flex gap-4 overflow-x-auto pb-2">
              {trendingVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="scroll-snap-card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] cursor-pointer group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                  onClick={() => navigate(`/user/vendor/${vendor.id}`)}
                >
                  <div className="relative">
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {vendor.verified && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900 line-clamp-1">
                      {vendor.name}
                    </h3>
                    
                    <p className="text-xs mb-2 flex items-center gap-1 text-gray-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {vendor.location}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-700">{vendor.rating}</span>
                        <span className="text-xs text-gray-500">({vendor.reviews})</span>
                      </div>
                      
                      <span className="text-xs text-gray-500 capitalize">
                        {vendor.category.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-pink-600">
                          {vendor.price}
                        </span>
                      </div>
                      
                      <button className="text-xs text-pink-500 hover:text-pink-600 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* View all vendors button */}
          <div className="text-center mt-6">
            <button 
              onClick={() => navigate('/user/vendors')}
              className="px-8 py-2 border-2 border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
            >
              View all vendors
            </button>
          </div>
        </section>

        {/* SECTION 6 - BUDGET FRIENDLY PICKS */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Budget Friendly Picks
            </h2>
          </div>
          
          <div className="horizontal-scroll-container flex gap-4 overflow-x-auto pb-2">
            {budgetFriendlyVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="scroll-snap-card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] cursor-pointer group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                onClick={() => navigate(`/user/vendor/${vendor.id}`)}
              >
                <div className="relative">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {vendor.verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 line-clamp-1">
                    {vendor.name}
                  </h3>
                  
                  <p className="text-xs mb-2 flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {vendor.location}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">{vendor.rating}</span>
                      <span className="text-xs text-gray-500">({vendor.reviews})</span>
                    </div>
                    
                    <span className="text-xs text-gray-500 capitalize">
                      {vendor.category.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-pink-600">
                        {vendor.price}
                      </span>
                    </div>
                    
                    <button className="text-xs text-pink-500 hover:text-pink-600 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <button 
              onClick={() => navigate('/user/vendors/makeup')}
              className="px-8 py-2 border-2 border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
            >
              View budget options
            </button>
          </div>
        </section>

        {/* SECTION 7 - EDITOR'S CHOICE */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Editor's Choice
            </h2>
          </div>
          
          <div className="horizontal-scroll-container flex gap-4 overflow-x-auto pb-2">
            {editorsChoiceVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="scroll-snap-card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] cursor-pointer group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                onClick={() => navigate(`/user/vendor/${vendor.id}`)}
              >
                <div className="relative">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {vendor.verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 line-clamp-1">
                    {vendor.name}
                  </h3>
                  
                  <p className="text-xs mb-2 flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {vendor.location}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">{vendor.rating}</span>
                      <span className="text-xs text-gray-500">({vendor.reviews})</span>
                    </div>
                    
                    <span className="text-xs text-gray-500 capitalize">
                      {vendor.category.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-pink-600">
                        {vendor.price}
                      </span>
                    </div>
                    
                    <button className="text-xs text-pink-500 hover:text-pink-600 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <button 
              onClick={() => navigate('/user/vendors/photographers')}
              className="px-8 py-2 border-2 border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
            >
              View editor's picks
            </button>
          </div>
        </section>

      </div>

      {/* SECTION 8 - FLOATING ACTION BUTTON */}
      <button className="fixed bottom-20 right-4 md:bottom-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-105 transition-transform duration-200 bg-pink-500">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
        </svg>
      </button>

      {/* SECTION 9 - BOTTOM NAVIGATION (MOBILE) */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16 px-2">
          {[
            { name: 'For You', active: true },
            { name: 'Venues' },
            { name: 'Vendors' },
            { name: 'Ideas' },
            { name: 'Genie' }
          ].map((tab, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 text-xs transition-all duration-200 rounded-lg ${
                tab.active ? 'text-pink-500 bg-pink-50' : 'text-gray-500'
              }`}
            >
              <svg className={`w-5 h-5 mb-1 ${tab.active ? 'text-pink-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
        {/* Safe area for devices with home indicator */}
        <div className="h-safe-area-inset-bottom bg-white" />
      </nav>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 md:h-8" />
    </div>
  );
};

export default AuthHome;