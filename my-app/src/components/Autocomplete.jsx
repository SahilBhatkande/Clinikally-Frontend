import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { FaRocket, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Autocomplete = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  // Debounced fetch function
  const fetchSuggestions = useCallback(
    debounce(async (searchQuery, skipValue) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skipValue}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setSuggestions(data.products || []);
      } catch (err) {
        setError('Error fetching suggestions. Please try again.');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSkip(0);
    fetchSuggestions(value, 0);
  };

  const handleNextPage = () => {
    const newSkip = skip + limit;
    setSkip(newSkip);
    fetchSuggestions(query, newSkip);
  };

  const handlePrevPage = () => {
    const newSkip = Math.max(0, skip - limit);
    setSkip(newSkip);
    fetchSuggestions(query, newSkip);
  };

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(71, 85, 105, 0.3); }
          50% { box-shadow: 0 0 30px rgba(71, 85, 105, 0.5); }
        }
        @keyframes searchGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
        }
        .animate-twinkle { animation: twinkle infinite ease-in-out 2s; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .search-container { animation: searchGlow 3s ease-in-out infinite; }
        
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: linear-gradient(to bottom, black, #0f172a, black);
          overflow-x: hidden;
        }
      `}</style>

      <div style={{ 
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom, black, #0f172a, black)"
      }}>
        {/* Navigation */}
        <nav style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          position: "fixed",
          top: 20,
          left: 20,
          right: 20,
          zIndex: 50
        }}>
          {/* Logo */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            marginLeft: "12px",
            cursor: "pointer"
          }} onClick={() => navigate('/')}>
            <div style={{ 
              width: "40px", 
              height: "40px", 
              background: "linear-gradient(135deg, #9333ea, #4f46e5)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)"
            }}>
              <FaRocket style={{ color: "white", fontSize: "20px" }} />
            </div>
            <span style={{ 
              fontSize: "24px", 
              fontWeight: "bold",
              background: "linear-gradient(to right, white, #e2e8f0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              NovaHue
            </span>
          </div>
        </nav>

        <div style={{ 
          position: "fixed", 
          inset: 0, 
          pointerEvents: "none",
          zIndex: 0
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="animate-twinkle"
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <FaStar style={{ width: "4px", height: "4px", color: "white", opacity: 0.7 }} />
            </div>
          ))}
        </div>

        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <div
            className="animate-float"
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "9999px",
              backgroundColor: "rgba(100,116,139,0.1)",
              filter: "blur(100px)",
              left: "10%",
              top: "20%"
            }}
          />
          <div
            className="animate-float"
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "9999px",
              backgroundColor: "rgba(71,85,105,0.1)",
              filter: "blur(80px)",
              right: "10%",
              top: "60%"
            }}
          />
        </div>

        {/* Main Content */}
        <div style={{ 
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{ 
            width: "100%",
            maxWidth: "600px",
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(16px)",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid rgba(147, 51, 234, 0.3)",
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)"
          }}>
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <h1 style={{ 
                fontSize: "32px",
                fontWeight: "bold",
                color: "white",
                marginBottom: "16px",
                background: "linear-gradient(to right, white, #e2e8f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                <FaRocket style={{ display: "inline", marginRight: "12px" }} />
                Cosmic Search
              </h1>
              <p style={{ color: "#cbd5e1", fontSize: "16px" }}>
                Explore the products in catalog
              </p>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(8px)",
              borderRadius: "9999px",
              border: "1px solid rgba(147, 51, 234, 0.3)",
              padding: "12px 24px",
              marginBottom: "24px",
              boxShadow: "0 0 15px rgba(147, 51, 234, 0.2)"
            }} className="search-container">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search the cosmos..."
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  outline: "none",
                  width: "100%",
                  fontSize: "16px"
                }}
              />
            </div>

            {isLoading && (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}>
                <FaRocket className="animate-float" style={{ fontSize: "24px", display: "inline" }} />
                <p>Searching the cosmos...</p>
              </div>
            )}

            {error && (
              <div style={{ textAlign: "center", color: "#ef4444", padding: "20px" }}>
                {error}
              </div>
            )}

            {suggestions.length > 0 && (
              <div style={{
                background: "rgba(15, 23, 42, 0.4)",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(147, 51, 234, 0.2)"
              }}>
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      padding: "16px",
                      borderBottom: "1px solid rgba(147, 51, 234, 0.2)",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(147, 51, 234, 0.2)";
                      e.currentTarget.style.transform = "translateX(10px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {product.title}
                  </div>
                ))}

                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  padding: "16px",
                  borderTop: "1px solid rgba(147, 51, 234, 0.2)"
                }}>
                  <button
                    onClick={handlePrevPage}
                    disabled={skip === 0}
                    style={{
                      background: skip === 0 ? "rgba(71, 85, 105, 0.3)" : "linear-gradient(135deg, #9333ea, #4f46e5)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: skip === 0 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                      opacity: skip === 0 ? 0.5 : 1,
                      border: "1px solid rgba(147, 51, 234, 0.3)"
                    }}
                    onMouseOver={(e) => {
                      if (!skip === 0) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.3)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!skip === 0) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    <FaChevronLeft /> Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={suggestions.length < limit}
                    style={{
                      background: suggestions.length < limit ? "rgba(71, 85, 105, 0.3)" : "linear-gradient(135deg, #9333ea, #4f46e5)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: suggestions.length < limit ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                      opacity: suggestions.length < limit ? 0.5 : 1,
                      border: "1px solid rgba(147, 51, 234, 0.3)"
                    }}
                    onMouseOver={(e) => {
                      if (suggestions.length >= limit) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.3)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (suggestions.length >= limit) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    Next <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Autocomplete; 