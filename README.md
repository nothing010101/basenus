# 🌌 BASENUS - The Future of DeFi on Base

A stunning crypto website built with pure HTML, CSS, and JavaScript featuring animated Base-themed planet, particle effects, and modern UI design.

## ✨ Features

- **Animated Base Planet** - Rotating planet with glow effects and orbital rings
- **Particle Background** - 100 twinkling stars with smooth movement
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Smooth Animations** - Entrance animations and scroll effects
- **Modern UI** - Glass morphism and gradient effects
- **Copy Contract** - One-click contract address copying
- **Social Links** - Twitter, Telegram, and DexScreener integration
- **Performance Optimized** - Respects reduced motion preferences

## 🚀 Quick Deployment

### Option 1: Static File Hosting
1. Download all files: `index.html`, `styles.css`, `script.js`
2. Upload to any static hosting service:
   - **Netlify**: Drag & drop folder to netlify.com/drop
   - **Vercel**: Import folder or connect to Git
   - **GitHub Pages**: Push to repository and enable Pages
   - **Traditional hosting**: Upload via FTP/cPanel

### Option 2: Local Development
1. Download all files to a folder
2. Open `index.html` in your browser
3. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with live-server)
   npx live-server
   ```

## 📁 File Structure

```
basenus-website/
├── index.html      # Main HTML structure
├── styles.css      # All CSS styles and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🎨 Customization

### Update Contract Address
Edit `script.js` and change the `CONTRACT_ADDRESS`:
```javascript
const CONFIG = {
    CONTRACT_ADDRESS: "YOUR_CONTRACT_ADDRESS_HERE"
};
```

### Modify Social Links
Update the href attributes in `index.html`:
```html
<a href="https://twitter.com/your_handle" target="_blank">
<a href="https://t.me/your_channel" target="_blank">
<a href="https://dexscreener.com/your_token" target="_blank">
```

### Change Colors
Modify CSS variables in `styles.css` for quick color changes:
- Blue colors: `#3b82f6`, `#60a5fa`, `#2563eb`
- Gradient combinations for different effects

### Update Content
Edit text content directly in `index.html`:
- Hero title and subtitle
- Feature descriptions
- Tokenomics values
- Roadmap items

## 🌟 Technical Details

### Performance Features
- **Throttled animations** for smooth performance
- **Intersection Observer** for efficient scroll animations
- **Reduced motion support** for accessibility
- **Tab visibility handling** to pause animations when not visible

### Browser Support
- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Fallbacks**: Clipboard functionality works in older browsers

### Animations
- **CSS Keyframes**: Planet rotation, particle twinkling, glow effects
- **JavaScript**: Particle movement, scroll animations, entrance effects
- **Intersection Observer**: Efficient scroll-triggered animations

## 🔧 Development

### Modifying Animations
- **Planet speed**: Change `animation-duration` in `.planet-core`
- **Particle count**: Modify `PARTICLE_COUNT` in `script.js`
- **Animation delays**: Update `CONFIG.ANIMATION_DELAY` object

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add styles to `styles.css`
3. Optional: Add scroll animations in `script.js`

### Mobile Optimization
The site is fully responsive with:
- **Flexible grid layouts**
- **Scalable typography**
- **Touch-friendly buttons**
- **Optimized animations for mobile**

## 📱 Mobile Features

- **Responsive planet size** - Scales appropriately for mobile screens
- **Touch-optimized buttons** - Proper sizing and spacing
- **Mobile navigation** - Simplified nav for smaller screens
- **Performance optimized** - Reduced particle count on mobile if needed

## 🎯 SEO Ready

- **Semantic HTML** structure
- **Meta descriptions** and titles
- **Open Graph** ready (add meta tags as needed)
- **Clean URLs** with anchor navigation

## 🚀 Deployment Tips

### Netlify Deployment
1. Zip all files
2. Go to netlify.com
3. Drag & drop the zip file
4. Your site is live!

### Vercel Deployment
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

### Custom Domain
- Update social media links to your domain
- Add proper meta tags for sharing
- Consider adding Google Analytics

## 💎 Base Ecosystem Integration

Perfect for:
- **Base Layer 2** projects
- **DeFi protocols** on Base
- **Token launches** and presales
- **Community projects**
- **DAO websites**

## 📞 Support

Built with ❤️ for the Base ecosystem. The website is production-ready and optimized for:
- **Fast loading** times
- **Mobile responsiveness**
- **Accessibility** compliance
- **Modern browser** support

---

**Ready to launch your Base project?** 🚀 This website template provides everything you need for a professional crypto project launch
