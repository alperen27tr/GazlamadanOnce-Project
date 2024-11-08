import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'assets/css/BlogReactions.css';

const BlogReactions = ({ blogId }) => {
  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    laugh: 0,
    thinking: 0,
    sad: 0,
    bored: 0,
  });

  const [userReaction, setUserReaction] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reaction/`);
        const fetchedReactions = response.data;

        const filteredReactions = fetchedReactions.filter(
          (reaction) => reaction.blog === blogId
        );

        const reactionCounts = filteredReactions.reduce((acc, reaction) => {
          const reactionType = reaction.reaction_type;
          acc[reactionType] = (acc[reactionType] || 0) + 1;
          return acc;
        }, {});

        setReactions((prevReactions) => ({
          ...prevReactions,
          ...reactionCounts,
        }));

        const userId = localStorage.getItem("id");
        if (userId) {
          setIsLoggedIn(true);
          const userHasReacted = filteredReactions.some(
            (reaction) => reaction.user === parseInt(userId)
          );

          if (userHasReacted) {
            const userReactionData = filteredReactions.find(
              (reaction) => reaction.user === parseInt(userId)
            );
            setUserReaction(userReactionData.reaction_type);
          }
        }
      } catch (error) {
        console.error("Reactions data could not be fetched!", error);
      }
    };

    if (blogId) {
      fetchReactions();
    }
  }, [blogId]);

  const handleReaction = (reaction) => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      setWarningMessage("Reaksiyon vermek için giriş yapın!"); // Uyarı mesajını ayarla
      return; // Mesajı silmeden çık
    }

    if (userReaction) {
      console.error("User has already reacted!");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/reaction/", {
        user: userId,
        blog: blogId,
        reaction_type: reaction,
      })
      .then(() => {
        setReactions((prevReactions) => ({
          ...prevReactions,
          [reaction]: prevReactions[reaction] + 1,
        }));
        setUserReaction(reaction);
      })
      .catch((error) => {
        console.error("Error saving reaction:", error.response?.data || error.message);
      });
  };

  return (
    <div>
      <h5 className="reaction-title">Bir tepki ver</h5>
      {warningMessage && (
        <div className="warning-message">
          {warningMessage}
        </div>
      )}
      <div className="reaction-container">
        {Object.entries(reactions).map(([name, count]) => (
          <span
            key={name}
            onClick={() => {
              if (isLoggedIn && !userReaction) {
                handleReaction(name);
              } else if (!isLoggedIn) {
                setWarningMessage("Tepki vermek için giriş yapın!");
              }
            }}
            className={userReaction === name ? 'active-emoji' : 'emoji'}
            style={{
              cursor: userReaction ? 'not-allowed' : isLoggedIn ? 'pointer' : 'not-allowed',
            }}
          >
            {name === 'like' && '👍'}
            {name === 'love' && '😍'}
            {name === 'laugh' && '😂'}
            {name === 'thinking' && '🤔'}
            {name === 'sad' && '😢'}
            {name === 'bored' && '😒'} {count}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogReactions;
