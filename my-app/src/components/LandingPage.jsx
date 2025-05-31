import React, { useEffect, useState } from "react";
import { FaRocket, FaStar, FaGlobe, FaBolt, FaPlay, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SpaceLanding = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
        }
      `}</style>

      <div style={{ 
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Stars Background */}
        <div style={{ 
          position: "fixed", 
          inset: 0, 
          pointerEvents: "none",
          background: "linear-gradient(to bottom, black, #0f172a, black)",
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

        {/* Floating Orbs */}
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

        <div style={{ position: "relative", zIndex: 2 }}>
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
              marginLeft: "12px"
            }}>
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

            {/* Launch Button */}
            <button 
              onClick={() => navigate('/autocomplete')}
              style={{ 
                background: "linear-gradient(135deg, #9333ea, #4f46e5)",
                padding: "12px 24px",
                borderRadius: "8px",
                color: "white",
                border: "1px solid rgba(147, 51, 234, 0.3)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)",
                fontSize: "16px",
                fontWeight: "500",
                marginRight: "12px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(147, 51, 234, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(147, 51, 234, 0.3)";
              }}
            >
              <FaRocket style={{ fontSize: "16px" }} />
              Launch App
            </button>
          </nav>

          {/* Hero Section */}
          <section style={{ 
            textAlign: "center", 
            padding: "180px 24px 100px 24px", 
            position: "relative", 
            zIndex: 10 
          }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(15,23,42,0.5)",
                padding: "8px 16px", borderRadius: "9999px", marginBottom: "24px", backdropFilter: "blur(4px)"
              }} className="animate-glow">
                <FaRocket style={{ color: "#c084fc" }} />
                <span style={{ color: "#c084fc" }}>Next Generation Space Travel</span>
              </div>

              <h1 style={{
                fontSize: "64px", fontWeight: "bold",
                background: "linear-gradient(to right, white, #e2e8f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "24px"
              }}>
                Journey to the<br /><span style={{ animation: "pulse 2s infinite" }}>Stars</span>
              </h1>

              

              <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                
                
                
                <button 
                onClick={() => navigate('/autocomplete')}
                style={{ 
                  background: "linear-gradient(135deg, #9333ea, #4f46e5)",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  color: "white",
                  border: "1px solid rgba(147, 51, 234, 0.3)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)",
                  fontSize: "16px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 0 25px rgba(147, 51, 234, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(147, 51, 234, 0.3)";
                }}
              >
                <FaRocket style={{ fontSize: "18px" }} />
                Launch AutoSearch
              </button>
              </div>
            </div>
          </section>

          {/* Features Section with Images */}
          <section style={{ padding: "100px 24px", zIndex: 10, position: "relative" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{
                fontSize: "40px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #e2e8f0, #cbd5e1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "24px"
              }}>
                Explore the Universe
              </h2>
              <p style={{ fontSize: "18px", color: "#cbd5e1", marginBottom: "48px" }}>
                 Glow like a supernova with AstralBlush - beauty that’s written in the stars.
              </p>

              <div style={{ 
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "32px",
                padding: "0 16px"
              }}>
                {[
                  {
                    image: "/sun-fireball-solar-flare-sunlight-87611.jpeg",
                    alt: "Solar Flare"
                  },
                  {
                    image: "/full-moon-moon-bright-sky-47367.jpeg",
                    alt: "Full Moon"
                  },
                  {
                    image: "/earth-blue-planet-globe-planet-41953.jpeg",
                    alt: "Earth from Space"
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(15, 23, 42, 0.6)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid rgba(147, 51, 234, 0.3)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                      aspectRatio: "1",
                    }}
                    className="search-container"
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(147, 51, 234, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      <img
                        src={item.image}
                        alt={item.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SpaceLanding;
