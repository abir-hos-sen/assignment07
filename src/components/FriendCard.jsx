import { Link } from 'react-router-dom';

function FriendCard({ friend }) {
  const statusColors = {
    'overdue': '#ef4444',
    'almost due': '#f59e0b',
    'on-track': '#10b981',
  };

  return (
    <Link to={`/friend/${friend.id}`} className="friend-card-link">
      <div className="friend-card">
        {/* Friend Picture */}
        <div className="friend-image">
          <img src={friend.picture} alt={friend.name} />
        </div>

        {/* Friend Info */}
        <div className="friend-info">
          <h3>{friend.name}</h3>
          <p className="days-since">
            📅 {friend.days_since_contact} days ago
          </p>

          {/* Tags */}
          <div className="tags">
            {friend.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>

          {/* Status Badge */}
          <div
            className="status-badge"
            style={{ backgroundColor: statusColors[friend.status] }}
          >
            {friend.status}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FriendCard;