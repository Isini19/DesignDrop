import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getListings,
  getPendingListings,
  approveListing,
  rejectListing,
  getSellerListings,
} from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingListings, setPendingListings] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        if (user.role === "ADMIN") {
          // Admin sees pending listings
          const res = await getPendingListings();
          setPendingListings(res.data);
        } else if (user.role === "DESIGNER" || user.role === "COMPANY") {
          // Seller sees their own listings
          const res = await getSellerListings(user.email);
          setMyListings(res.data);
        } else {
          // Customer sees approved listings
          const res = await getListings();
          setMyListings(res.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleApprove = async (id) => {
    await approveListing(id);
    setPendingListings(pendingListings.filter((l) => l.listingId !== id));
  };

  const handleReject = async (id) => {
    await rejectListing(id);
    setPendingListings(pendingListings.filter((l) => l.listingId !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Welcome, {user?.email}</h2>
        <span className="dashboard-role-badge">{user?.role}</span>
      </div>

      {loading && <p className="dashboard-loading">Loading...</p>}

      {/* Admin view — pending listings */}
      {user?.role === "ADMIN" && (
        <div>
          <h3 className="dashboard-section-title">
            Pending Listings ({pendingListings.length})
          </h3>
          {pendingListings.length === 0 ? (
            <p className="dashboard-empty">No pending listings.</p>
          ) : (
            pendingListings.map((listing) => (
              <div key={listing.listingId} className="dashboard-listing-item">
                <div className="dashboard-listing-info">
                  <p className="dashboard-listing-title">{listing.title}</p>
                  <p className="dashboard-listing-meta">
                    {listing.listingType} — LKR {listing.price}
                  </p>
                  <p className="dashboard-listing-meta">
                    {listing.description}
                  </p>
                </div>
                <div className="dashboard-actions">
                  <button
                    onClick={() => handleApprove(listing.listingId)}
                    className="approve-button"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(listing.listingId)}
                    className="reject-button"
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Seller view — their own listings */}
      {(user?.role === "DESIGNER" || user?.role === "COMPANY") && (
        <div>
          <div className="dashboard-section-header">
            <h3 className="dashboard-section-title">My Listings</h3>
            <button
              onClick={() => navigate("/create-listing")}
              className="dashboard-create-button"
            >
              + Create New Listing
            </button>
          </div>
          {myListings.length === 0 ? (
            <p className="dashboard-empty">
              No listings yet. Create your first one!
            </p>
          ) : (
            myListings.map((listing) => (
              <div key={listing.listingId} className="dashboard-listing-item">
                <div className="dashboard-listing-info">
                  <p className="dashboard-listing-title">{listing.title}</p>
                  <p className="dashboard-listing-meta">
                    {listing.listingType} — LKR {listing.price}
                  </p>
                </div>
                <span className={`dashboard-status dashboard-status-${listing.status.toLowerCase()}`}>
                  {listing.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Customer view — browse listings */}
      {user?.role === "CUSTOMER" && (
        <div>
          <h3 className="dashboard-section-title">Browse Listings</h3>
          {myListings.length === 0 ? (
            <p className="dashboard-empty">No listings available.</p>
          ) : (
            myListings.map((listing) => (
              <div key={listing.listingId} className="dashboard-listing-item">
                <div className="dashboard-listing-info">
                  <p className="dashboard-listing-title">{listing.title}</p>
                  <p className="dashboard-listing-meta">
                    LKR {listing.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;