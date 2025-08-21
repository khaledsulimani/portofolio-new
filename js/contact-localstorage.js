// Save contact form messages to localStorage and allow normal form submission (for Formspree)
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        // Get form values
        var name = form.elements['name'].value;
        var email = form.elements['email'].value;
        var subject = form.elements['subject'].value;
        var message = form.elements['message'].value;
        var date = new Date().toLocaleString();
        // Build message object
        var msgObj = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: date
        };
        // Save to localStorage
        var messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        messages.push(msgObj);
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));
        // Allow normal submission to Formspree
    });
});
