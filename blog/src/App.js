import React, { useState, useEffect } from 'react';
import "./components/css/style.css";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'AIzaSyAixrPHiqKtHpbBEto7XQPOvJVV8OBoaYM';
        const blogId = '6178294570622619126';
        const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data.items);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='blog-div'>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <img alt={'post-'+post.id} src='https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg'></img>
          <h2 className='title'>{post.title}</h2>
          <div className='content' dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200)+'....' }} />
          <h4 className='date'>📅 {post.published.replace("T", " 🕒 ").replace('-08:00', '')}</h4>
          <div className='.btn-div'>
          <a className='btn' href={'blog/'+post.id}>Read Now</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blog;
