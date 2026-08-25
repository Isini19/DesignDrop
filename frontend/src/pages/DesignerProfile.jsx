import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";
import ListingCard from "../components/ListingCard";
import "../styles/DesignerProfile.css";

function DesignerProfile() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(email);
        setProfile(response.data);
      } catch (err) {
        setError("Profile not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [email]);

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return null;

  return (
    <div className="profile-container">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="profile-back">
        ← Back
      </button>

      {/* Profile header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {email.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1 className="profile-email">{profile.email}</h1>
          <span className="profile-role-badge">{profile.role}</span>
          <p className="profile-listings-count">
            {profile.listings?.length} approved listings
          </p>
        </div>
      </div>

      {/* Listings grid */}
      <div className="profile-listings-section">
        <h2 className="profile-section-title">Designs by this seller</h2>
        {profile.listings?.length === 0 ? (
          <p className="profile-empty">No approved listings yet.</p>
        ) : (
          <div className="profile-grid">
            {profile.listings?.map((listing) => (
              <ListingCard key={listing.listingId} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DesignerProfile;