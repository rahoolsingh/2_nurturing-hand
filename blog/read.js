var queryString = window.location.search;
var queryArray = queryString.split("?");

console.log(queryArray[1]);

const apiKey = 'AIzaSyAixrPHiqKtHpbBEto7XQPOvJVV8OBoaYM';
const blogId = '6178294570622619126';
const postId = queryArray[1];
const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data) {
        const blogTitle = data.title;
        var blogDescription = data.content.replace(/<[^>]+>/g, '');
        if (blogDescription.length > 250){
          blogDescription = blogDescription.substring(0, 249) + "...";
        }
        var blogDate = new Date(data.published).getDate();
        if (blogDate < 10){
          blogDate = '0' + String(blogDate);
        }
        const blogMonth = new Date(data.published).toLocaleString('default', { month: 'short' });
        var blogYear = new Date(data.published).getFullYear();
        const blogAuthor = data.author.displayName;
        
        const blogHTML = `

        <div class="blog_details">
            <p class="excert">${data.content}</p>
        </div>
        `;

        const blogDetail = `
            <ol class="blog-info-link mt-3 mb-4" style="color: white; list-style: none;">
              <li><i class="fa fa-user"></i>${blogAuthor}</li>
              <li><i class="fa fa-calendar"></i>${blogDate} ${blogMonth}, ${blogYear}</li>
            </ol>
        </div>
        `;
        
        document.querySelector('#page-name').textContent = blogTitle;
        document.querySelector('#page-details').textContent = '';
        document.querySelector('#post-section').insertAdjacentHTML('beforeend', blogHTML);
        document.querySelector('#page-details').insertAdjacentHTML('beforeend', blogDetail);
        document.title = blogTitle + " - Blog | Nurturing Hand | NGO";
    }
  })
  .catch(error => {
    console.error(error);
    document.write('Something went wrong: Unable to process your request');
  });