// JavaScript to handle content availability based on release dates

document.addEventListener('DOMContentLoaded', function() {
  // Get current date
  const currentDate = new Date();
  
  // Format date as YYYY-MM-DD for comparison
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  
  // Find all chapter links
  const contentLinks = document.querySelectorAll('.chapter-link');
  
  // Process each link
  contentLinks.forEach(function(linkElement) {
    // Get the availability date from data attribute
    const availableDate = linkElement.getAttribute('data-available');
    
    // Find the anchor element inside the chapter link
    const anchorElement = linkElement.querySelector('a');
    
    if (anchorElement && availableDate) {
      // Check if the current date is before the available date
      if (formattedCurrentDate < availableDate) {
        // Store the original href
        const originalHref = anchorElement.getAttribute('href');
        anchorElement.setAttribute('data-original-href', originalHref);
        
        // Disable the link
        anchorElement.setAttribute('href', 'javascript:void(0)');
        anchorElement.style.color = '#999';
        anchorElement.style.cursor = 'not-allowed';
        anchorElement.style.textDecoration = 'none';
        
        // Add a title attribute for tooltip
        anchorElement.setAttribute('title', 'This content will be available from ' + 
          new Date(availableDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }));
        
        // Add a click event to show a message
        anchorElement.addEventListener('click', function(event) {
          event.preventDefault();
          alert('This content will be available from ' + 
            new Date(availableDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }));
        });
      } else {
        // Content is available - ensure it's styled properly
        anchorElement.style.color = '';
        anchorElement.style.cursor = 'pointer';
      }
    }
  });
});
