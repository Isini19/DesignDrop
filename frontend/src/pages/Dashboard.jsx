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
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        if (user.role === "ADMIN") {
          const [pendingRes, allRes] = await Promise.all([
            getPendingListings(),
            getListings(),
          ]);
          setPendingListings(pendingRes.data);
          setAllListings(allRes.data);
        } else if (user.role === "DESIGNER" || user.role === "COMPANY") {
          const res = await getSellerListings(user.email);
          setMyListings(res.data);
        } else {
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
        <h2 className="dashboard-title">
          {user?.role === "ADMIN" ? "Admin Dashboard" : `Welcome back!`}
        </h2>
        <span className="dashboard-role-badge">{user?.role}</span>
      </div>

      {loading && <p className="dashboard-loading">Loading...</p>}

      {/* Admin stats cards */}
      {user?.role === "ADMIN" && !loading && (
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-number">{allListings.length}</div>
            <div className="dashboard-stat-label">Total Listings</div>
          </div>
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-number">{pendingListings.length}</div>
            <div className="dashboard-stat-label">Pending Review</div>
          </div>
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-number">{allListings.filter(l => l.listingType === 'DESIGN').length}</div>
            <div className="dashboard-stat-label">Design Listings</div>
          </div>
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-number">{allListings.filter(l => l.listingType === 'STOCK').length}</div>
            <div className="dashboard-stat-label">Stock Listings</div>
          </div>
        </div>
      )}

      {/* Admin — pending listings */}
      {user?.role === "ADMIN" && (
        <div>
          <h3 className="dashboard-section-title">
            Pending Approval ({pendingListings.length})
          </h3>
          {pendingListings.length === 0 ? (
            <p className="dashboard-empty">✓ No pending listings — all clear!</p>
          ) : (
            pendingListings.map((listing) => (
              <div key={listing.listingId} className="dashboard-listing-item">
                <div className="dashboard-listing-info">
                  <p className="dashboard-listing-title">{listing.title}</p>
                  <p className="dashboard-listing-meta">
                    {listing.listingType} — LKR {listing.price?.toLocaleString()}
                  </p>
                  <p className="dashboard-listing-meta">{listing.description}</p>
                </div>
                <div className="dashboard-actions">
                  <button onClick={() => handleApprove(listing.listingId)} className="approve-button">
                    ✓ Approve
                  </button>
                  <button onClick={() => handleReject(listing.listingId)} className="reject-button">
                    ✗ Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Seller — their listings */}
      {(user?.role === "DESIGNER" || user?.role === "COMPANY") && (
        <div>
          <div className="dashboard-section-header">
            <h3 className="dashboard-section-title">My Listings ({myListings.length})</h3>
            <button onClick={() => navigate("/create-listing")} className="dashboard-create-button">
              + New Listing
            </button>
          </div>
          {myListings.length === 0 ? (
            <p className="dashboard-empty">No listings yet. Create your first one!</p>
          ) : (
            myListings.map((listing) => (
              <div key={listing.listingId} className="dashboard-listing-item">
                <div className="dashboard-listing-info">
                  <p className="dashboard-listing-title">{listing.title}</p>
                  <p className="dashboard-listing-meta">
                    {listing.listingType} — LKR {listing.price?.toLocaleString()}
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

      {/* Customer — browse listings */}
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
                  <p className="dashboard-listing-meta">LKR {listing.price?.toLocaleString()}</p>
                </div>
                <button className="approve-button" onClick={() => navigate("/")}>
                  View →
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;