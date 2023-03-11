// Load the Google API client library script
(function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://apis.google.com/js/client.js';
  
    // Once the script has loaded, fetch the blog data
    script.onload = function() {
      // Initialize the API client library
      gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest']
      }).then(function() {
        // Fetch the blog data
        gapi.client.blogger.blogs.get({
          blogId: 'BLOG_ID'
        }).then(function(response) {
          // Extract the blog name, image, and description from the response
          var blog = response.result;
          var blogName = blog.name;
          var blogImage = blog.image.url;
          var blogDescription = blog.description;
  
          // Do something with the blog data
          console.log('Blog Name:', blogName);
          console.log('Blog Image:', blogImage);
          console.log('Blog Description:', blogDescription);
        });
      });
    };
  
    // Add the script to the document
    document.head.appendChild(script);
  })();
  