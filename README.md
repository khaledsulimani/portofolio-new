# Khaled's Enhanced Portfolio

This is a modern, animated portfolio website built with HTML, CSS, and JavaScript featuring smooth animations powered by Anime.js.

## Features

✨ **Enhanced Features Added:**
- **Social Media Links Section** - Connect with your audience
- **Interactive Animations** - Smooth, eye-catching transitions
- **Modern Design** - Glass morphism effects and gradients
- **Responsive Layout** - Works on all devices
- **Enhanced About Section** - With statistics and better layout
- **Improved Skills Section** - Visual grid with icons
- **Contact Form** - With validation and animations
- **Smooth Scrolling** - Navigation with smooth scroll effect
- **Scroll to Top Button** - Easy navigation back to top
- **Typing Effect** - Animated title text

## Customization Guide

### 📱 Social Media Links
Update your social media links in `index.html` in the Social Media Section:

```html
<!-- Replace these URLs with your actual profiles -->
<a href="https://github.com/yourusername" target="_blank" class="social-link">
<a href="https://linkedin.com/in/yourprofile" target="_blank" class="social-link">
<a href="https://twitter.com/yourprofile" target="_blank" class="social-link">
<a href="mailto:your.email@example.com" class="social-link">
<a href="https://instagram.com/yourprofile" target="_blank" class="social-link">
```

### 🎨 Colors and Styling
You can customize the color scheme by modifying the CSS variables. The main accent color is `#ff6347` (tomato), you can change it throughout the `styles.css` file.

### 📊 Statistics
Update your statistics in the About section:
- Years of Experience
- Projects Completed
- Technologies Mastered

### 🛠️ Skills
Add or remove skills in the Skills section. Each skill uses Font Awesome icons.

### 📝 Projects
Add your projects in the Projects section with:
- Project title
- Description
- GitHub link

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Enhanced CSS with new features
├── script-enhanced.js  # Enhanced JavaScript with animations
├── new photo.gif       # Background animation
├── js/
│   └── anime.umd.min.js # Animation library (local copy)
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with modern features
- **JavaScript** - Interactivity
- **Anime.js** - Smooth animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter font)

## Browser Support

This portfolio works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Installation & Usage

1. Download all files to your desired directory
2. Customize the content (see Customization Guide above)
3. Open `index.html` in your web browser
4. For development, use a local server for best experience

## Live Preview

To run locally:
```bash
# If you have Python installed:
python -m http.server 8000

# If you have Node.js installed:
npx serve

# Then open http://localhost:8000 in your browser
```

## Performance Tips

- The background GIF is optimized for web
- All animations are hardware-accelerated
- Images are compressed for fast loading
- CSS and JS are minified for production

## Credits

- **Anime.js** - Animation library
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Original design** - Khaled Sulimani

---

**© 2025 Khaled's Portfolio - Feel free to use this template for your own portfolio!**
