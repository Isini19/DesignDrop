import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getListings, getPendingListings, approveListing, rejectListing } from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [pendingListings, setPendingListings] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === "ADMIN") {
          // Admin sees pending listings
          const res = await getPendingListings();
          setPendingListings(res.data);
        } else {
          // Others see approved listings for now
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
      <h2 className="dashboard-title">
        Welcome, {user?.email}
      </h2>
      <p className="dashboard-role">Role: {user?.role}</p>

      {loading && <p>Loading...</p>}

      {/* Admin view */}
      {user?.role === "ADMIN" && (
        <div>
          <h3 className="dashboard-section-title">Pending Listings</h3>
          {pendingListings.length === 0 ? (
            <p className="dashboard-empty">No pending listings.</p>
          ) : (
            pendingListings.map((listing) => (
              <div key={listing.listingId} className="dashboard-listing-item">
                <div>
                  <p className="dashboard-listing-title">{listing.title}</p>
                  <p className="dashboard-listing-price">LKR {listing.price}</p>
                </div>
                <div className="dashboard-actions">
                  <button
                    onClick={() => handleApprove(listing.listingId)}
                    className="approve-button"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(listing.listingId)}
                    className="reject-button"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Designer/Customer/Company view */}
      {user?.role !== "ADMIN" && (
        <div>
          <h3 className="dashboard-section-title">Browse Listings</h3>
          {myListings.length === 0 ? (
            <p className="dashboard-empty">No listings available.</p>
          ) : (
            myListings.map((listing) => (
              <div key={listing.listingId} className="dashboard-listing-item">
                <p className="dashboard-listing-title">{listing.title}</p>
                <p className="dashboard-listing-price">LKR {listing.price}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;