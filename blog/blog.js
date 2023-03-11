
  const apiKey = 'AIzaSyAixrPHiqKtHpbBEto7XQPOvJVV8OBoaYM';
  const blogId = '6178294570622619126';
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.items) {
        data.items.forEach(item => {
          const blogTitle = item.title;
          var blogDescription = item.content.replace(/<[^>]+>/g, '');
          if (blogDescription.length > 250){
            blogDescription = blogDescription.substring(0, 249) + "...";
          }
          var blogDate = new Date(item.published).getDate();
          if (blogDate < 10){
            blogDate = '0' + String(blogDate);
          }
          const blogMonth = new Date(item.published).toLocaleString('default', { month: 'short' });
          const blogComments = item.replies.totalItems;
          
          const blogHTML = `
            <article class="blog_item">
              <div class="blog_item_img">
                <a href="#" class="blog_item_date">
                  <h3>${blogDate}</h3>
                  <p>${blogMonth}</p>
                </a>
              </div>
              <div class="blog_details">
                <a class="d-inline-block" href="#">
                  <h2 class="blog-head" style="color: #2d2d2d">${blogTitle}</h2>
                </a>
                <p class='blog-main-description'>${blogDescription}</p>
                <ul class="blog-info-link">
                  <li><a href="#"><i class="fa fa-user"></i></a></li>
                  <li><a href="#"><i class="fa fa-comments"></i>${blogComments} Comments</a></li>
                </ul>
              </div>
            </article>
          `;
          
          document.querySelector('#blog_section').insertAdjacentHTML('beforeend', blogHTML);
        });
        console.log(data.items);
      }
    })
    .catch(error => console.error(error));