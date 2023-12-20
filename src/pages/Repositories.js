import React, { useState, useEffect } from 'react';
import styles from './Repositories.module.css';

const Repositories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState([]);
  const [sortOption, setSortOption] = useState('stars');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${searchTerm}&sort=${sortOption}`
        );
        const data = await response.json();
        setRepos(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchData();
    }
  }, [searchTerm, sortOption]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.sortContainer}>
        <label>Sort by: </label>
        <select onChange={(e) => setSortOption(e.target.value)} className={styles.select}>
          <option value="stars">Stars</option>
          <option value="watchers">Watchers</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created_at">Created At</option>
          <option value="updated_at">Updated At</option>
        </select>
      </div>
      <div>
        {repos.map((repo) => (
          <div key={repo.id} className={`${styles.repoCard} repo-card`}>
            <img src={repo.owner.avatar_url} alt="Avatar" className={styles.avatar} />
            <div className={styles.repoInfo}>
              <h3 className={styles.repoTitle}>Repo Name: {repo.name}</h3>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Description: {repo.description}</p>
              <p className={styles.repoDetails}>
                <span
                  className={styles.languageDot}
                  style={{ backgroundColor: repo.language ? '#4CAF50' : 'transparent' }}
                ></span>
                <h3>Language:  {repo.language || 'Not specified'}</h3>
               
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repositories;
